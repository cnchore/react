/**
 * Created by Administrator on 2016/7/30.
 */

import *as types from './constant'

/**
 * 获取活动剩余名额
 * @param promotionid
 * @returns {{types: *[], method: string, path: string, query: {promotionid: *}}}
 */
export function getRemainPromotionNum(promotionid) {
    return {
        types: [types.GET_NUM_REQUEST, types.GET_NUM_SUCCESS, types.GET_NUM_FAILURE],
        method: "get",
        path: "/api/cpn/promotion/GetRemainPromotionNum",
        query: {promotionid}
    }
}

/**
 * 用户是否已验证手机
 * @returns {{types: *[], method: string, path: string}}
 */
export function haveCheckPhone(){
    return{
        types:[types.HAVE_CHECK_PHONE_REQUEST,types.HAVE_CHECK_PHONE_SUCCESS,types.HAVE_CHECK_PHONE_FAILURE],
        method:"get",
        path:"/api/bas/user/checkHasUserPhoneValid"
    }
}

/**
 * 获取活动信息
 * @param configName
 * @returns {{types: *[], method: string, path: string, query: {configName: *}}}
 */
export function getPromotionInfo(configName) {
    return {
        types: [types.GET_PROMOTION_INFO_REQUEST, types.GET_PROMOTION_INFO_SUCCESS, types.GET_PROMOTION_INFO_FAILURE],
        method: "get",
        path: "/api/cpn/promotion/GetPromotionInfo",
        query: {configName}
    }
}

/**
 * 获取用户信息
 * @param carnum
 * @returns {{types: *[], method: string, path: string, query: {carnum: *}}}
 */
export function getOwnerInfo() {
    return{
        types: [types.GET_OWNER_INFO_REQUEST, types.GET_OWNER_INFO_SUCCESS, types.GET_OWNER_INFO_FAILURE],
        method: "get",
        path: "/api/cpn/promotion/GetPromotionUserInfo",
        query:{}
    }
}


/**
 * 添加活动购买记录
 * @param promotionid
 * @param id
 * @param refType
 * @param carnum
 * @param phone
 * @returns {{types: *[], method: string, path: string, query: {promotionid: *, id: *, refType: *, carnum: *, phone: *}}}
 */
export function addPromotionBuyLog(promotionid, id, refType, carnum, phone) {
    return {
        types: [types.ADD_BUY_LOG_REQUEST, types.ADD_BUY_LOG_SUCCESS, types.ADD_BUY_LOG_FAILURE],
        method: "get",
        path: "/api/cpn/promotion/AddPromotionBuyLog",
        query: {promotionid, id, refType, carnum, phone}
    }
}

/**
 * 添加日志
 * @param paylogid
 * @returns {{types: *[], method: string, path: string, query: {paylogid: *}}}
 */
export function addLog(paylogid) {
    return {
        types: [types.ADD_LOG_REQUEST, types.ADD_LOG_SUCCESS, types.ADD_LOG_FAILURE],
        method: "get",
        path: "/api/cpn/package_buy_origin_log/EditVipPackageLog",
        query: {paylogid}
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
export function getPayInfo(openid, showpayid, paytype) {
    return {
        types: [types.GET_PAY_INFO_REQUEST, types.GET_PAY_INFO_SUCCESS, types.GET_PAY_INFO_FAILURE],
        method: "post",
        path: "/api/cpn/shopping_car/GetShopCartPayInfo",
        query: {openid, showpayid, paytype}
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
