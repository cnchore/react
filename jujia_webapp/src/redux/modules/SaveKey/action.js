import * as types from './constant';
import * as commTypes from "../../common/constant";

export function action() {
    return {

    }
}
/**
 * 获取当前订单信息
 */
export function getOrderInfo(orderid,typeid){
    return{
        types:[commTypes.REQUEST,commTypes.SUCCESS,commTypes.FAILURE],
        method:"get",
        path:"/api/order/order/GetAllByOrderid",
        query:{typeid,orderid}
    }
}
/**
 * 根据当前钥匙柜ID获取其他空闲钥匙柜信息
 */
export function getFreeKeyCabinetList(currKcid){
    return{
        types:[commTypes.REQUEST,commTypes.SUCCESS,commTypes.FAILURE],
        method:"get",
        path:"/api/dis/keycabinet/GetFreeKeyCabinet",
        query:{currKcid} 
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