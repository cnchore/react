/**
 * Created by Administrator on 2016/8/23.
 */

import *as types from './constant'

export function resetPhone(openid,phone,vcode){
    return{
        types:[types.CHECK_PHONE_REQUEST,types.CHECK_PHONE_SUCCESS,types.CHECK_PHONE_FAILURE],
        method:"get",
        path:"/api/bas/user/resetPhone",
        query:{openid,phone,vcode}
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
 * 活动是否结束
 * @returns {{types: *[], method: string, path: string}}
 */
export function  activeIsEnd(){
    return{
        types:[types.ACTIVE_IS_END_REQUEST,types.ACTIVE_IS_END_SUCCESS,types.ACTIVE_IS_END_FAILURE],
        method:"get",
        path:"/api/cpn/promotion/CheckHasPullingNewPromotionExpired"
    }
}


/**
 *获取验证码
 * @param phone
 * @param openid
 * @returns {{types: *[], method: string, path: string, query: {phone: *, openid: *}}}
 */
export function getVcode(phone,openid){
    return{
        types:[types.GET_V_CODE_REQUEST,types.GET_V_CODE_SUCCESS,types.CHECK_PHONE_FAILURE],
        method:"get",
        path:"/api/bas/user/getvcode",
        query:{phone,openid}
    }
}

/**
 *验证码进行验证
 * @param openid
 * @param phone
 * @param vcode
 * @returns {{types: *[], method: string, path: string, query: {openid: *, phone: *, vcode: *}}}
 */
export function checkPhone(openid,phone,vcode){
    return{
        types:[types.CHECK_PHONE_REQUEST,types.CHECK_PHONE_SUCCESS,types.GET_V_CODE_FAILURE],
        method:"get",
        path:"/api/bas/user/checkPhone",
        query:{openid,phone,vcode}
    }
}

/**
 * 注册新用户
 * @param openid
 * @param userid
 * @returns {{types: *[], method: string, path: string, query: {openid: *, userid: *}}}
 */
export function registerWithPullingUser(openid,userid){
    return{
        types:[types.REGISTERED_USER_REQUEST,types.REGISTERED_USER_SUCCESS,types.REGISTERED_USER_FAILURE],
        method:"get",
        path:"/api/bas/user/registerWithPullingUser",
        query:{openid,userid}
    }
}
