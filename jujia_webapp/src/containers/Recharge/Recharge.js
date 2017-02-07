/**
 * Created by Administrator on 2016/6/17.
 */
import React, {Component, PropTypes} from 'react';
import RechargeItem from'./RechargeItem';
import  styles from'./Recharge.scss';
import BottomTab from '../../components/BottomTab/BottomTab';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import *as RechargeAction from'../../redux/modules/Recharge/action';
import WeiXin from "../../utils/WeiXin";
import Loader from "../../components/Loader/Loader";
import Checkbox from 'material-ui/Checkbox';
import Snackbarx from "../../components/Snackbarx/Snackbarx";
import BaseComponent from "../../components/BaseComponent/BaseComponent";

@connect(
    state=>({}),
    RechargeAction
)
class Recharge extends Component {
    static propTypes = {};
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };
    state = {
        msg: {show: false, msg: ""},
        showLoading: true,
        items: [],
        datas: [],
        configid: 0,
        prepay_id: 0,
        rechargeLogId: 0,
        isChecked: true
    };

    constructor(props) {
        super(props);
    }

    /**
     * 组件加载前
     */
    componentWillMount() {
        this.rechargeList();
        //setTimeout(this.initSelect(),2000);
    }

    /**
     * 充值列表
     */
    rechargeList() {
        this.props.recharge().then(res=> {
            console.log(res);
            if (res.body.status) {
                this.setState({items: res.body.data, showLoading: false});
            }
        })
    }

    /**
     * 添加充值
     */
    addRecharge() {
        var configid = this.state.configid;
        var items = this.state.items;
        if (!items[0].isSelect && !items[1].isSelect && !items[2].isSelect) {
            this.showMsg("请选择充值金额");
            return
        }
        if (this.state.isChecked) {
            this.setState({showLoading: true});
            this.state.items.map(item=> {
                if (item.isSelect) {
                    this.props.addRecharge(configid).then(res=> {
                        if (res.body.status) {
                            let data = res.body.data;
                            //this.setState({datas: data});
                            this.submitPay(data);
                        }
                    })
                }
            });
        } else {
            this.showMsg("请同意充值协议");
        }
    }

    /**
     * 提交充值
     * @param rechargeid
     */
    submitPay(rechargeid) {
        this.props.submitPay(rechargeid).then(res=> {
            console.log(res);
            var data = res.body;
            if (data.data != null && data.status == true) {
                this.state.prepay_id = res.body.data;
                WeiXin.pay(data.data).then(()=> {
                    this.setState({showLoading: false});
                    // 给微信服务器去调用后台的 api  进行充值是否成功的验证；
                    //this.submitPaySuccess(rechargeid);
                    this.context.router.push("/myBalance?from=recharge");
                },()=> {
                    this.setState({showLoading: false});
                });
            } else {
                this.setState({showLoading: false});
                this.showMsg(data.msg)
            }
        })
    }

    /**
     * 改变充值选项状态
     * @param index
     * @param isSelect
     * @param configid
     */
    changeTodoState(index, isSelect, configid) {
        this.setState({
            items: this.state.items.map((item, i)=> {
                if (index == i) {
                    item.isSelect = isSelect;
                } else {
                    item.isSelect = false;
                }
                return item;
            }), configid: configid
        });
    }

    /**
     * 提交充值成功
     */
    submitPaySuccess(rechargeLogId) {
        this.props.submitPaySuccess(rechargeLogId).then(res=> {
            var data = res.body;
            if (data != null && data.status == true) {
                this.context.router.push("/myBalance?from=recharge");
            } else if (data != null && data["msg"]) {
                this.showMsg(data["msg"]);
            } else {
                this.showMsg("出现错误,请联系管理员~");
            }
        })
    }

    /**
     * 同意充值选择框
     * @param isChecked
     */
    onCheck(isChecked) {
        if (isChecked) {
            this.setState({isChecked: true});
            console.log(this.state)
        } else {
            this.setState({isChecked: false});
            console.log(this.state)
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
     * 关闭提示
     */
    handleMsgClose() {
        var msg = this.state.msg;
        msg.show = false;
        this.setState({msg});
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
     * 渲染充值列表
     * @returns {*}
     */
    renderChargeList() {
        return this.state.items.map((item, i)=>
            <RechargeItem
                key={i}
                index={i}
                recharge={item.min_recharge_amount}
                giveMoney={item.given_amount}
                isSelect={item.isSelect}
                changeTodoState={this.changeTodoState.bind(this)}
                configid={item.recharge_given_configid}
            />
        )
    }

    render() {

        return (
            <BaseComponent>
                <div className={styles.Recharge}>
                    <Loader show={this.state.showLoading}/>
                    <div className={styles.title}>本次充值，只限使用微信支付</div>
                    <div className={styles.priceListContent}>
                        <div className={styles.priceList}>
                            {::this.renderChargeList()}
                        </div>
                        <div className={styles.payTips}>收款方 广州畅途汽车技术开发有限公司</div>
                    </div>
                    <div className={styles.rechargeBtn } onTouchTap={()=>this.addRecharge()}>充值</div>
                    <div className={styles.rechargeAgreement}>
                        <Checkbox
                            label="同意"
                            defaultChecked={this.state.isChecked}
                            className={styles.checkBox}
                            onCheck={(e,isChecked)=>{this.onCheck(isChecked)}}
                        />
                        <a className={styles.rules} onTouchTap={(e)=>{this.gotoUrl(e,"/rechargeRule")}}>《充值协议》</a>
                    </div>
                    <BottomTab/>
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
export default Recharge;
