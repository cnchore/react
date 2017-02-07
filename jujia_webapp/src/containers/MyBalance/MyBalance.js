/**
 * Created by Administrator on 2016/6/17.
 */
import React, {Component, PropTypes} from 'react';
import styles from './MyBalance.scss';
import BottomTab from '../../components/BottomTab/BottomTab';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import *as MyBalanceActions from'../../redux/modules/MyBalance/action';
import Common from "../../utils/Common";
import Loader from "../../components/Loader/Loader";
import Snackbarx from "../../components/Snackbarx/Snackbarx";
import BaseComponent from "../../components/BaseComponent/BaseComponent";

@connect(
    state=>({}),
    MyBalanceActions
)

class MyBalance extends Component {

    static propTypes = {};
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    /**
     * 定义通用的参数
     * @type {{msg: {show: boolean, msg: string}, showLoading: boolean, items: Array}}
     */
    state = {
        msg: {show: false, msg: ""},
        showLoading: true,
        items: []
    };

    constructor(props) {
        super(props);

        //this.state = {data:[]};
    }

    /**
     * 组件加载时调用
     */
    componentWillMount() {
        this.getMyBalance();
        this.rechargeSuccess();
    }

    /**
     * 充值成功后显示提示消息
     */
    rechargeSuccess() {
        var from = Common.getParameterByName("from");
        if (from === "recharge") {
            this.showMsg("充值成功");
        }
    }

    /**
     * 获取余额
     */
    getMyBalance() {
        this.props.getMyBalance().then(res=> {
            console.log(res);
            this.setState({items: res.body.data, showLoading: false});
        });
    }

    /**
     * 显示即将到期的余额
     * @returns {XML}
     */
    balancePromotionGiven() {
        var balance_promotion_given = this.state.items.balance_promotion_given;
        if (balance_promotion_given > 0) {
            return (
                <div className={styles.balance_promotion_given}>{balance_promotion_given}元余额即将到期</div>
            )
        }
    }

    /**
     * 跳转路径
     * @param e
     * @param url
     */
    gotoUrl(e, url) {
        e.preventDefault();
        e.stopPropagation();
        this.context.router.push({
            pathname: url,
            query: {a: 1}
        });
    }

    /**
     * 提示消息
     * @param text
     */
    showMsg(text) {
        var self = this;
        var msg = this.state.msg;
        msg.show = true;
        msg.msg = text;
        this.setState({msg});
        setTimeout(function () {
            self.handleMsgClose();
        }, 3000)
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
        var _item = this.state.items;
        var totalBalance = (_item.balance_recharge + _item.balance_recharge_given + _item.balance_promotion_given).toFixed(2);
        var total_recharge_amount = _item.total_recharge_amount;
        var total_promotion_given_amount = _item.total_recharge_given_amount + _item.total_promotion_given_amount;
        return (
            <BaseComponent>
                <div className={styles.MyBalance}>
                    <Loader show={this.state.showLoading}/>
                    <div className={styles.allBalanceContent}>
                        <div className={styles.balanceDetails} onTouchTap={(e)=>{this.gotoUrl(e,'/balanceDetails')}}>
                            收支明细
                        </div>
                        <div className={styles.ch_allBalance}>总金额(元)</div>
                        <div className={styles.allBalance}>{isNaN(totalBalance) ? "" : totalBalance}</div>
                        {::this.balancePromotionGiven()}
                        <div className={styles.cumulativeContent}>
                            <div className={styles.cumulativeRecharge}><span
                                className={styles.ch_cumulative}>累计充值：</span><span
                                className={styles.cumulative}>{total_recharge_amount}</span></div>
                            <div className={styles.cumulativeGiveMoney}><span
                                className={styles.ch_cumulative}>累计赠送：</span><span
                                className={styles.cumulative}> {isNaN(total_promotion_given_amount) ? "" : total_promotion_given_amount}</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.goRecharge} onTouchTap={(e)=>{this.gotoUrl(e,'/recharge')}}>去充值</div>
                    <a href="tel:4001862266" className={styles.servicePhone}>
                        <div className={styles.phoneIconWrap}>
                            <i className={"icon iconfont "+styles.phoneIcon}>&#xe618;</i>
                        </div>
                        <span className={styles.contactService}>联系客服</span>
                    </a>
                    <BottomTab />
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
export default MyBalance;
