/**
 * Created by Administrator on 2016/6/17.
 */
import React, {Component, PropTypes} from 'react';
import styles from './BalanceDetails.scss';
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
) class BalanceDetails extends Component {
    static propTypes = {};

    constructor(props) {
        super(props);
        this.handleScroll=::this.handleScroll;
    }

    /**
     * 定义通用的参数
     * @type {{msg: {show: boolean, msg: string}, page: number, pagesize: number, isSend: boolean, showLoading: boolean, datas: Array, items: Array}}
     */
    state = {
        msg: {show: false, msg: ""},
        page: 1,
        pagesize: 20,
        isSend: false,
        showLoading: true,
        datas: [],
        items: []
    };


    componentWillMount() {
        this.getMyBalance();
        window.removeEventListener("scroll", this.handleScroll);
    }

    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);

    }

    handleScroll(event) {
        const page = this.state.page;
        const pagesize = this.state.pagesize;
        if (document.body.scrollTop >= document.body.scrollHeight - window.innerHeight) {
            console.log(page + "," + pagesize);
            if (!this.state.isSend) {
                let curPage = page + 1;
                this.setState({page: curPage});
                console.log(this.state);
                this.getBalanceDetails();
            }
        }
    }

    /**
     * 获取余额
     */
    getMyBalance() {
        this.props.getMyBalance().then(res=> {
            console.log(res);
            var data = res.body;
            if (data.status) {
                this.setState({items: data.data, showLoading: false});
            } else if (data.status == false) {
                this.showMsg(data.msg);
            } else {
                this.showMsg("有误，请联系管理员！");
            }
        });
        this.getBalanceDetails();
    }

    /**
     * 获取收支明细
     */
    getBalanceDetails() {
        const {page, pagesize}=this.state;
        this.props.getBalanceDetails(page, pagesize).then(res=> {
            console.log(res);
            var data = res.body;
            var state = this.state;
            if (data == null || data["data"] == null || data["data"].length < 1) {
                this.setState({isSend: true});
                return;
            }
            if (data.status) {
                data.data.map(temp=> {
                    state.datas.push(temp);
                });
                this.setState({state});
            } else if (data.status == false) {
                this.showMsg(data.msg);
            }
        });
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
        var listItem = [];
        var datas = this.state.items;
        var totalGiven = datas.total_recharge_given_amount + datas.total_promotion_given_amount;
        var totalRecharge = datas.total_recharge_amount;
        //收支类型(0-充值，1-充值赠送，2-支付，3-提现，4-过期，5-活动赠送,6-取消订单）
        this.state.datas.map((item, i)=> {
            if (item.type == 0) {
                listItem.push(
                    <div className={styles.recordLine}>
                        <div className={styles.ch_expend}>
                            <div className={styles.ch_recharge}>充值</div>
                            <div
                                className={styles.time}>{(Common.formatDateDT(item['createtime'])).format("yyyy-MM-dd")}</div>
                        </div>
                        <div className={styles.expend}>
                            <div className={styles.balance}>余额：{item.total_balance_amount}</div>
                            <div className={styles.recharge}>+{item.amount}</div>
                        </div>
                    </div>
                )
            }
            if (item.type == 1) {
                listItem.push(
                    <div className={styles.recordLine}>
                        <div className={styles.ch_expend}>
                            <div className={styles.ch_recharge}>充值赠送</div>
                            <div
                                className={styles.time}>{(Common.formatDateDT(item['createtime'])).format("yyyy-MM-dd")}</div>
                        </div>
                        <div className={styles.expend}>
                            <div className={styles.balance}>余额：{item.total_balance_amount}</div>
                            <div className={styles.recharge}>+{item.amount}</div>
                        </div>
                    </div>
                )
            }
            if (item.type == 2) {
                listItem.push(
                    <div className={styles.recordLine}>
                        <div className={styles.ch_expend}>
                            <div className={styles.ch_recharge}>支付</div>
                            <div
                                className={styles.time}>{(Common.formatDateDT(item['createtime'])).format("yyyy-MM-dd")}</div>
                        </div>
                        <div className={styles.expend}>
                            <div className={styles.balance}>余额：{item.total_balance_amount}</div>
                            <div className={styles.recharge}>-{item.amount}</div>
                        </div>
                    </div>
                )
            }
            if (item.type == 3) {
                listItem.push(
                    <div className={styles.recordLine}>
                        <div className={styles.ch_expend}>
                            <div className={styles.ch_recharge}>提现</div>
                            <div
                                className={styles.time}>{(Common.formatDateDT(item['createtime'])).format("yyyy-MM-dd")}</div>
                        </div>
                        <div className={styles.expend}>
                            <div className={styles.balance}>余额：{item.total_balance_amount}</div>
                            <div className={styles.recharge}>-{item.amount}</div>
                        </div>
                    </div>
                )
            }
            if (item.type == 4) {
                listItem.push(
                    <div className={styles.recordLine}>
                        <div className={styles.ch_expend}>
                            <div className={styles.ch_recharge}>过期</div>
                            <div
                                className={styles.time}>{(Common.formatDateDT(item['createtime'])).format("yyyy-MM-dd")}</div>
                        </div>
                        <div className={styles.expend}>
                            <div className={styles.balance}>余额：{item.total_balance_amount}</div>
                            <div className={styles.recharge}>-{item.amount}</div>
                        </div>
                    </div>
                )
            }
            if (item.type == 5) {
                listItem.push(
                    <div className={styles.recordLine}>
                        <div className={styles.ch_expend}>
                            <div className={styles.ch_recharge}>活动赠送</div>
                            <div
                                className={styles.time}>{(Common.formatDateDT(item['createtime'])).format("yyyy-MM-dd")}</div>
                        </div>
                        <div className={styles.expend}>
                            <div className={styles.balance}>余额：{item.total_balance_amount}</div>
                            <div className={styles.recharge}>+{item.amount}</div>
                        </div>
                    </div>
                )
            }
            if (item.type == 6) {
                listItem.push(
                    <div className={styles.recordLine}>
                        <div className={styles.ch_expend}>
                            <div className={styles.ch_recharge}>取消订单</div>
                            <div
                                className={styles.time}>{(Common.formatDateDT(item['createtime'])).format("yyyy-MM-dd")}</div>
                        </div>
                        <div className={styles.expend}>
                            <div className={styles.balance}>余额：{item.total_balance_amount}</div>
                            <div className={styles.recharge}>+{item.amount}</div>
                        </div>
                    </div>
                )
            }
            if (item.type == 7) {
                listItem.push(
                    <div className={styles.recordLine}>
                        <div className={styles.ch_expend}>
                            <div className={styles.ch_recharge}>购买优惠券</div>
                            <div
                                className={styles.time}>{(Common.formatDateDT(item['createtime'])).format("yyyy-MM-dd")}</div>
                        </div>
                        <div className={styles.expend}>
                            <div className={styles.balance}>余额：{item.total_balance_amount}</div>
                            <div className={styles.recharge}>-{item.amount}</div>
                        </div>
                    </div>
                )
            }
            if (item.type == 8) {
                listItem.push(
                    <div className={styles.recordLine}>
                        <div className={styles.ch_expend}>
                            <div className={styles.ch_recharge}>取消购买优惠券</div>
                            <div
                                className={styles.time}>{(Common.formatDateDT(item['createtime'])).format("yyyy-MM-dd")}</div>
                        </div>
                        <div className={styles.expend}>
                            <div className={styles.balance}>余额：{item.total_balance_amount}</div>
                            <div className={styles.recharge}>+{item.amount}</div>
                        </div>
                    </div>
                )
            }
        });
        return (
            <BaseComponent>
            <div className={styles.BalanceDetails}>
                <Loader show={this.state.showLoading}/>

                <div className={styles.balanceContent}>
                    <div className={styles.cumulativeRecharge}>
                        <div className={styles.Recharge}>{isNaN(totalRecharge) ? "" : totalRecharge}</div>
                        <div className={styles.ch_cumulative}>累计充值</div>
                    </div>
                    <div className={styles.cumulativeGiveMoney}>
                        <div className={styles.giveMoney}>{isNaN(totalGiven) ? "" : totalGiven}</div>
                        <div className={styles.ch_cumulative}>累计赠送</div >
                    </div>
                </div>
                <div className={styles.listItemContent}>
                    <div className={styles.addheight}></div>
                    {listItem}
                    <div className={styles.addheight}></div>
                </div>
                <BottomTab/>
                <Snackbarx
                    open={this.state.msg.show}
                    message = {this.state.msg.msg}
                    autoHideDuration={3000}
                    onRequestClose = {()=>this.handleMsgClose()}
                    />
            </div>
            </BaseComponent>
        )
    }
}
export default BalanceDetails;
