import * as types from './constant';
import * as commTypes from "../../common/constant";

export function action() {
    return {

    }
}
/**
 * 获取订单信息
 */
export function getOrderInfo(orderid,state){
    return{
        types:[commTypes.REQUEST,commTypes.SUCCESS,commTypes.FAILURE],
        method:"get",
        path:"/api/order/order/GetOrderDetailByOrderid",
        query:{orderid,state}
    }
}
/**
 * 获取钥匙码
 */
export function getKeyCode(cellid,keytype,orderid){
    return{
        types:[commTypes.REQUEST,commTypes.SUCCESS,commTypes.FAILURE],
        method:"get",
        path:"/api/dis/keyscode/GetKeyCodeByCell",
        query:{cellid,keytype,orderid}
    }
}
/**
 * 获取当前最新钥匙码
 */
export function getNewKeysCode(keytype,orderid){
    return{
        types:[commTypes.REQUEST,commTypes.SUCCESS,commTypes.FAILURE],
        method:"get",
        path:"/api/dis/keyscode/GetNewestKeysCode",
        query:{keytype,orderid}
    }
}