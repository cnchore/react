/**
 * Created by Administrator on 2016/6/20.
 */
import *as types from './constant';

/**
 * 获取充值列表
 * @returns {{types: *[], method: string, path: string}}
 */
export function recharge() {
    return {
        types: [types.RECHARGE_REQUEST, types.RECHARGE_SUCCESS, types.RECHARGE_FAILURE],
        method: "get",
        path: "/api/wallet/recharge_log/GetRechargeGivenConfig"
    }
}

/**
 * 添加充值
 * @param configid
 * @returns {{types: *[], method: string, path: string, query: {configid: *}}}
 */
export function addRecharge(configid) {
    return {
        types: [types.ADD_RECHARGE_REQUEST, types.ADD_RECHARGE_SUCCESS, types.ADD_RECHARGE_FAILURE],
        method: "get",
        path: "/api/wallet/recharge_log/addRecharge",
        query: {configid}
    }
}

/**
 * 提交充值
 * @param rechargeid
 * @returns {{types: *[], method: string, path: string, query: {rechargeid: *}}}
 */
export function submitPay(rechargeid) {
    return {
        types: [types.SUBMIT_WEIXIN_PAY_REQUEST, types.SUBMIT_WEIXIN_PAY_SUCCESS, types.SUBMIT_WEIXIN_PAY_FAILURE],
        method: "post",
        path: "/api/wallet/recharge_log/submitWeixinPay",
        query:{rechargeid}
    }
}

/**
 * 提交充值成功
 * @param rechargeLogId
 * @returns {{types: Array, method: string, path: string, query: {prepay_id: *}}}
 */
export function submitPaySuccess(rechargeLogId) {
    return{
        types:[types.SUBMIT_PAY_SUCCESS_REQUEST,types.SUBMIT_PAY_SUCCESS_SUCCESS,types.SUBMIT_PAY_SUCCESS_FAILURE],
        method:"post",
        path:"/api/wallet/recharge_log/submitPaySuccess",
        query:{rechargeLogId}
    }
}

