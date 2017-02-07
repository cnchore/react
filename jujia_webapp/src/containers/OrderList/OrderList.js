import React, { Component, PropTypes } from 'react';
import BottomTab from '../../components/BottomTab/BottomTab';
/*按钮标签组件*/
import OrderItem from './OrderItem';
import styles from "./OrderList.scss";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as OrderListActions from "../../redux/modules/OrderList/action";
import Common from "../../utils/Common";
import Loader from "../../components/Loader/Loader";
import BaseComponent from "../../components/BaseComponent/BaseComponent";

@connect(
    state=>({
        getOrderListState: state.getOrderList,
        getCancelOrderConfigState: state.getCancelOrderConfig,
        cancelOrderState: state.cancelOrder,
        refundForOrderState: state.refundForOrder,
        addCancelOrderReasonState: state.addCancelOrderReason
    }),
    OrderListActions
)

class OrderList extends Component {
    static propTypes = {};

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    state = {
        orderList: [],
        page: 1,
        pageSize: 20,
        total: 0,
        data: []
    };

    constructor(props) {
        super(props);
        this.handleScroll = ::this.handleScroll;
    }

    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);

    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }

    goToUrl() {
        this.removeScroll();
    }

    removeScroll() {
        console.log("移除事件");
        //window.removeEventListener("scroll",this.handleScroll);
        console.log("移除事件监听")
    }

    /**
     * [gotoUrl 跳转地址]
     * @param  {[type]} url [请求地址]
     * @return {[type]}     [description]
     */
    gotoUrl(e, url) {
        e.preventDefault();
        e.stopPropagation();
        this.context.router.push(url);
    }

    handleScroll(event) {
        const {page,total,pageSize}=this.state;
        /*console.log(window.innerHeight);
         console.log(document.body.scrollTop);
         console.log(document.body.scrollHeight);*/
        if (document.body.scrollTop >= (document.body.scrollHeight - window.innerHeight)) {
            console.log(page + "," + pageSize + "," + total);
            if (page * pageSize < total) {
                let curPage = page + 1;
                this.setState({page: curPage});
                console.log(this.state);
                this.loadOrderListData();
            }
        }
    }

    componentWillMount() {
        console.log("OrderList组件加载时执行!!!");
        this.loadOrderListData();
    }

    /**
     * 加载订单列表数据
     */
    loadOrderListData() {
        this.setState({showLoading: true});
        const {page,pageSize,data}=this.state;
        this.props.getOrderList(page, pageSize).then(res=> {
            if (res.body.status) {
                this.setState({total: res.body.data.total});
                console.log(data);
                var list = this.filterOrderData(res.body.data.rows, data);
                this.renderOrderList(list);
                console.log(list);
                this.setState({data: list});
                var self = this;
                setTimeout(function () {
                    self.setState({showLoading: false});
                }, 1000);
            }
        });
    }

    /**
     * 渲染订单列表
     * @param data
     */
    renderOrderList(data) {
        var self = this;
        if (data.length > 0) {
            data.map(function (order, i) {
                self.setState(function () {
                    self.state.orderList.push(<OrderItem
                        key={i}
                        orderId={order.orderid}
                        createTime={order.createTime}
                        carnum={order.carnum}
                        orderState={order.orderState}
                        products={order.products}
                        keyState={order.keyState}
                        payState={order.payState}
                        busiType={order.busiType}
                        getCancelOrderConfig={self.props.getCancelOrderConfig}
                        cancelOrder={self.props.cancelOrder}
                        refundForOrder={self.props.refundForOrder}
                        addCancelOrderReason={self.props.addCancelOrderReason}
                        goToUrl={self.goToUrl.bind(self)}
                        showLoad={self.showLoad.bind(self)}
                        hideLoad={self.hideLoad.bind(self)}
                    />)
                })
            })
        } else {
            self.setState(
                function () {
                    self.state.orderList.push(<div className={styles.noOrderWrap}>
                        <div><i className={"icon iconfont "+styles.orderIcon}>&#xe61a;</i></div>
                        <div className={styles.buyOrderWrap}><span className={styles.noOrder}>未查询到订单,</span><a
                            className={styles.goOrder} onTouchTap={(e)=>{self.gotoUrl(e,"/selectService")}}>去下单</a></div>
                    </div>)

                })
        }

    }

    /**
     * 显示加载中
     */
    showLoad() {
        this.setState({showLoading: true});
    }

    /**
     * 隐藏加载中
     */
    hideLoad() {
        this.setState({showLoading: false});
    }

    /**
     * 过滤订单数据
     */
    filterOrderData(data, curData) {
        data.map(function (item) {
            var temp = {};
            temp.orderid = item.orderid;
            temp.createTime = Common.formatDateDT(item.createtime).format("yyyy-MM-dd");
            temp.carnum = item.carnum;
            temp.orderState = item.state;
            temp.payState = item.payState;
            temp.products = item.pronames;
            temp.keyState = Common.getKeyState(item.keytype, item.ifusing, item.state, item.cellid);
            temp.busiType=item.busi_type;
            curData.push(temp);
        });
        return curData;
    }

    render() {
        var orderList = this.state.orderList;
        var self = this;
        const {getCancelOrderConfig,cancelOrder,refundForOrder,addCancelOrderReason}=this.props;

        return (
            <BaseComponent>
            <div className={styles.orderList}>
                <Loader show={this.state.showLoading}/>
                <div className={styles.itemPanel}>
                    {orderList}
                </div>
                <BottomTab />
            </div>
    </BaseComponent>
        )
    }
}

export default OrderList;
