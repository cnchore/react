import * as types from './constant';
import * as commTypes from "../../common/constant";

export function action() {
    return {

    }
}
/**
 * 获取订单信息
 */
export function getOrderInfo(orderid){
    return{
        types:[commTypes.REQUEST,commTypes.SUCCESS,commTypes.FAILURE],
        method:"get",
        path:"/api/order/order/GetOrderInfoV4",
        query:{orderid}
    }
}
/**
 * 获取取消订单原因配置
 */
export function getCancelOrderConfig(){
    return{
        types:[commTypes.REQUEST,commTypes.SUCCESS,commTypes.FAILURE],
        method:"get",
        path:"/api/order/business_config/GetOrderConfig",        
    }
}
/**
 * 取消订单
 */
export function cancelOrder(orderid){
    return{
        types:[commTypes.REQUEST,commTypes.SUCCESS,commTypes.FAILURE],
        method:"post",
        path:"/api/order/order/EditOrderCancel",
        query:{orderid}
    }
}
/**
 * 订单退款
 */
export function refundForOrder(orderid){
    return{
        types:[commTypes.REQUEST,commTypes.SUCCESS,commTypes.FAILURE],
        method:"post",
        path:"/api/order/order/RefundForOrder",
        query:{orderid}
    }
}
/**
 * 添加取消订单原因
 */
export function addCancelOrderReason(orderid,obcIds){
    return{
        types:[commTypes.REQUEST,commTypes.SUCCESS,commTypes.FAILURE],
        method:"post",
        path:"/api/order/business_config_details/EditDetails",
        query:{orderid,obcIds}
    }
}
/**
 * 获取实时订单信息
 */
export function getRealTimeOrderInfo(orderid){
    return{
        types:[commTypes.REQUEST,commTypes.SUCCESS,commTypes.FAILURE],
        method:"get",
        path:"/api/order/order/GetRealTimeOrderInfo",
        query:{orderid}
    }
}