/**
 * Created by Administrator on 2016/6/21.
 */
import *as types from "./constant";

/**
 * 支付套餐
 * @returns {{types: *[], method: string, path: string}}
 */
export function payPackage() {
    return {
        types: [types.PAY_PACKAGE_REQUEST, types.PAY_PACKAGE_SUCCESS, types.PAY_PACKAGE_FAILURE],
        method: "get",
        path: "/api/cpn/promotion/AddPayLog"
    }
}

/**
 * 获取支付信息
 * @param ownerid
 * @param paytype
 * @param r_openid
 * @param showpayid
 * @returns {{types: *[], method: string, path: string, query: {ownerid: *, paytype: *, r_openid: *, showpayid: *}}}
 */
export function getPayInfo(openid,showpayid,paytype ) {
    return {
        types: [types.GET_PAY_INFO_REQUEST, types.GET_PAY_INFO_SUCCESS, types.GET_PAY_INFO_FAILURE],
        method: "post",
        path: "/api/cpn/shopping_car/GetShopCartPayInfo",
        query: {openid,showpayid,paytype}
    }
}

/**
 * 完成支付
 * @param paylogid
 * @returns {{types: *[], method: string, path: string, query: {paylogid: *}}}
 */
export function finishPay(paylogid) {
    return {
        types: [types.FINISH_PAY_REQUEST, types.FINISH_PAY_SUCCESS, types.FINISH_PAY_FAILURE],
        method: "get",
        path: "/api/cpn/promotion/FinishPay",
        query: {paylogid},
    }
}

/**
 * 获取购物车数据
 * @returns {{types: *[], method: string, path: string}}
 */
export function getShoppingCar() {
    return {
        types: [types.GET_SHOPPING_CAR_REQUEST, types.GET_SHOPPING_CAR_SUCCESS, types.GET_SHOPPING_CAR_FAILURE],
        method: "get",
        path: "/api/cpn/shopping_car/GetShoppingCar"
    }
}

/**
 * 获取用户余额
 * @returns {{types: *[], method: string, path: string}}
 */
export function getWalletBalance() {
    return {
        types: [types.GET_WALLET_BALANCE_REQUEST, types.GET_WALLET_BALANCE_SUCCESS, types.GET_WALLET_BALANCE_FAILURE],
        method: "get",
        path: "/api/wallet/balance/GetWalletBalance"
    }
}

/**
 * 移除商品
 * @returns {{types: *[], method: string, path: string}}
 * @constructor
 */
export function deleteByCar(carId){
    return{
        types:[types.DELETE_BY_CAR_REQUEST,types.DELETE_BY_CAR_SUCCESS,types.DELETE_BY_CAR_FAILURE],
        method:"get",
        path:"/api/cpn/shopping_car/DeleteByCarId",
        query:{carId}
    }
}


