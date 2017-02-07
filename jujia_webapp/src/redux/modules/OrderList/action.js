import * as types from './constant';
import * as commTypes from "../../common/constant";

export function action() {
    return {

    }
}
/**
 * 获取订单列表
 */
export function getOrderList(page,pageSize){
    return{
        types:[types.GET_ORDER_LIST_REQUEST,types.GET_ORDER_LIST_SUCCESS,types.GET_ORDER_LIST_FAILURE],
        method:"get",
        path:"/api/order/order/GetOrders",
        query:{page,pageSize}                
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