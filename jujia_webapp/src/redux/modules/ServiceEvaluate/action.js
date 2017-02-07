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
        path:"/api/order/order/GetOrderInfoV3",
        query:{orderid}
    }
}
/**
 * 添加评价信息
 */
export function addEvaluate(orderid,satisfy,secontent){
    return{
        types:[commTypes.REQUEST,commTypes.SUCCESS,commTypes.FAILURE],
        method:"post",
        path:"/api/tec/serviceevaluation/addEvaluated",
        query:{orderid,satisfy,secontent}
    }
}