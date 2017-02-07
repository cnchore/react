/**
 * Created by Administrator on 2016/6/17.
 */
import React, {Component, PropTypes} from 'react';
import PayPackageItem from './PayPackageItem';
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import Paytype from "../../components/PayType/PayType";
import styles from "./PayPackage.scss";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import *as BuyPackageAction from'../../redux/modules/PayPackage/action';
import Loader from "../../components/Loader/Loader";
import Cookies from "js-cookie";
import WeiXin from "../../utils/WeiXin";
import Snackbarx from "../../components/Snackbarx/Snackbarx";
import BaseComponent from "../../components/BaseComponent/BaseComponent";


@connect(
    state=>({
        getPayInfoState: state.getPayInfo
    }),
    BuyPackageAction
)
class PayPackage extends Component {
    static propTypes = {};
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };
    state = {
        msg: {show: false, msg: ""},
        showLoading: true,
        items: [],
        balanceInfo: [],
        order: {
            paytype: "balance",
            payid: 0,
            allAmount: 0,
            balance: 0
        }
    };

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log("PayPackage组件加载时执行!!!");
        this.getShoppingCar();
    }

    /**
     * 获取购物车信息
     */
    getShoppingCar() {
        this.props.getShoppingCar().then(res=> {
            if (res.body.status) {
                this.setState({items: res.body.data, showLoading: false});
                this.getWalletBalance();
            } else {
                this.context.router.push("/user");
            }
        })
    }

    /**
     * 获取用户余额
     */
    getWalletBalance() {
        this.props.getWalletBalance().then(res=> {
            if (res.body.status) {
                this.setState({balanceInfo: res.body.data});
                this.initShowPayWay()
            }
        })
    }

    /**
     * 移除商品
     * @param carId
     */
    deleteNum(carId) {
        this.props.deleteByCar(carId).then(res=> {
            console.log(res);
            if (res.body.status) {
                this.setState({datas: res.body.data});
                this.getShoppingCar();
            }
        });
    }

    /**
     * 支付套餐
     */
    payPackage() {
        this.setState({showLoading:true});
        this.props.payPackage().then(res=> {
            if (res.body.status) {
                var state = this.state;
                var openid = Cookies.get("openid");
                var otherid = Cookies.get("otherid");
                var paytype = state.order.paytype;
                var payid = state.order.payid = res.body.data;
                this.setState({state});
                this.getPayInfo(parseInt(payid), openid, paytype);
            }
        });
    }

    /**
     * 获取支付信息
     */
    getPayInfo(showpayid, r_openid, paytype) {
        this.props.getPayInfo(r_openid, showpayid, paytype).then(res=> {
            console.log(res);
            if (res.body.state == 3 || res.body.state == 4) {
                this.setState({showLoading:false});
                return;
            }
            if (res.body.state == 1) {
                var prepay_id = res.body.prepay_id;
                console.log(prepay_id);
                WeiXin.pay(prepay_id).then(()=> {
                    this.finishPay();
                },()=>{
                    this.setState({showLoading:false});
                });
            } else if (res.body.state == 2) {
                this.finishPay();
            } else if (res.body.errmsg) {
                this.setState({showLoading:false});
                this.showMsg(res.body.errmsg);
            } else {
                this.setState({showLoading:false});
                this.showMsg("支付失败");
            }
        })
    }

    /**
     * 完成支付
     */
    finishPay() {
        var self=this;
        this.props.finishPay(this.state.order.payid).then(res=> {
            this.setState({showLoading:false});
            console.log(res);
            if (res.body.status == true) {
                this.showMsg("套餐购买成功");
                setTimeout(function () {
                    self.context.router.push("/myCoupon");
                }, 2000)
            } else {
                this.showMsg("支付失败");
            }
        })
    }

    /**
     * 跳转路由
     * @param e
     * @param url
     */
    gotoUrl(e, url) {
        e.preventDefault();
        e.stopPropagation();
        this.context.router.push(url);
    }

    /**
     * 渲染单条购物列表
     * @returns {Array}
     */
    renderPayList() {
        return this.state.items.map((item, i)=>
            (  <PayPackageItem
                    key={i}
                    index={i}
                    othername={item.othername}
                    price={item.price}
                    shopping_carid={item.shopping_carid}
                    deleteNum={this.deleteNum.bind(this)}
                />
            )
        )
    }

    /**
     * 初始化支付方式
     */
    initShowPayWay() {
        var state = this.state;
        state.items.map(item=> {
            state.order.allAmount += item.price;
        });
        state.order.banlance = state.balanceInfo.balance_recharge + state.balanceInfo.balance_recharge_given;
        if (state.order.banlance < state.order.allAmount) {
            state.order.paytype = "balanceAnWx";
        }
        if (state.order.banlance == 0) {
            state.order.paytype = "balanceAnWx";
        }
        this.setState({state});
    }

    /**
     * 更改支付方式
     * @param value
     */
    handlePaytypeChange(value) {
        var data = this.state;
        if (data.order.banlance >= data.order.allAmount) {
            data.order.paytype = value;
            this.setState({data});
        } else {
            this.showMsg("余额不足，请使用微信支付");
        }
    }

    /**
     * 提示消息
     * @param text
     */
    showMsg(text) {
        var msg = this.state.msg;
        msg.show = true;
        msg.msg = text;
        this.setState({msg});
    }

    /**
     * 关闭提示消息
     */
    handleMsgClose() {
        var msg = this.state.msg;
        msg.show = false;
        this.setState({msg});
    }

    render() {
        var allMoney = 0,
            original = 0;
        this.state.items.map(data=> {
            return allMoney += data.price, original += data.amount;
        });
        var saveMoney = (original - allMoney).toFixed(0);
        return (
            <BaseComponent>
            <div className={styles.PayPackage}>
                <Loader show={this.state.showLoading}/>
                <div className={styles.haveChoose}>已选套餐</div>
                <div className={styles.PayListContent}>
                    {::this.renderPayList()}
                </div>
                <div ref="paytype" className={styles.field}>
                    <label>支付方式</label>
                    <div className={styles.value}>
                        <Paytype id="paytype"
                                 value={this.state.order.paytype}
                                 onChange={::this.handlePaytypeChange}
                        >
                        </Paytype>
                    </div>
                </div>
                <div className={styles.btnWrap}>
                    <div className={styles.moneyWrap}><span className={styles.total}>合计:</span><span
                        className={styles.totalMoney}>￥{allMoney.toFixed(0)}</span><span
                        className={styles.saveMoney}>(优惠:￥{saveMoney})</span></div>
                    <div className={styles.payPackageBtn}onTouchTap={::this.payPackage}>
                        确认支付
                    </div>
                </div>
                <Snackbarx
                    open={this.state.msg.show}
                    message={this.state.msg.msg}
                    autoHideDuration={3000}
                    onRequestClose={()=>this.handleMsgClose()}
                />
            </div>
            </BaseComponent>
        )
    }

}

export default PayPackage;
