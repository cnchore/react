/**
 * Created by Administrator on 2016/7/30.
 */
import {combineReducers} from "redux";
import * as types from "./constant";
import update from "react/lib/update";

function getRemainPromotionNum(state = {}, action){
    switch(action.type){
        case types.GET_NUM_REQUEST:
            return update(state,{
                isLoading:{$set: true}
            });
        case types.GET_NUM_REQUEST:
            return update(state,{
                info:{$set:action.body.info} ,
                lastFetched:{$set:action.lastFetched},
                isLoading: {$set:false}
            });
        case types.GET_NUM_SUCCESS:
            return update(state,{
                error: {$set:action.error}
            });
        default:
            return state;
    }
}

/**
* 是否验证手机号码
* @param state
* @param action
* @returns {{}}
*/
function haveCheckPhone(state = {}, action) {
    switch (action.type) {
        case types.HAVE_CHECK_PHONE_REQUEST:
            return update(state, {
                isLoading: {$set: true}
            });
        case types.HAVE_CHECK_PHONE_SUCCESS:
            return update(state, {
                info: {$set: action.body.info},
                lastFetched: {$set: action.lastFetched},
                isLoading: {$set: false}
            });
        case types.HAVE_CHECK_PHONE_FAILURE:
            return update(state, {
                error: {$set: action.error}
            });
        default:
            return state;
    }
}

function getPromotionInfo(state = {}, action){
    switch(action.type){
        case types.GET_PROMOTION_INFO_REQUEST:
            return update(state,{
                isLoading:{$set: true}
            });
        case types.GET_PROMOTION_INFO_SUCCESS:
            return update(state,{
                info:{$set:action.body.info} ,
                lastFetched:{$set:action.lastFetched},
                isLoading: {$set:false}
            });
        case types.GET_PROMOTION_INFO_FAILURE:
            return update(state,{
                error: {$set:action.error}
            });
        default:
            return state;
    }
}

function getOwnerInfo(){
    switch(action.type){
        case types.GET_OWNER_INFO_REQUEST:
            return update(state,{
                isLoading:{$set: true}
            });
        case types.GET_OWNER_INFO_SUCCESS:
            return update(state,{
                info:{$set:action.body.info} ,
                lastFetched:{$set:action.lastFetched},
                isLoading: {$set:false}
            });
        case types.GET_OWNER_INFO_FAILURE:
            return update(state,{
                error: {$set:action.error}
            });
        default:
            return state;
    }
}

function addPromotionBuyLog(state = {}, action){
    switch(action.type){
        case types.ADD_BUY_LOG_REQUEST:
            return update(state,{
                isLoading:{$set: true}
            });
        case types.ADD_BUY_LOG_SUCCESS:
            return update(state,{
                info:{$set:action.body.info} ,
                lastFetched:{$set:action.lastFetched},
                isLoading: {$set:false}
            });
        case types.ADD_BUY_LOG_FAILURE:
            return update(state,{
                error: {$set:action.error}
            });
        default:
            return state;
    }
}

function addLog(state = {}, action){
    switch(action.type){
        case types.ADD_LOG_REQUEST:
            return update(state,{
                isLoading:{$set: true}
            });
        case types.ADD_LOG_SUCCESS:
            return update(state,{
                info:{$set:action.body.info} ,
                lastFetched:{$set:action.lastFetched},
                isLoading: {$set:false}
            });
        case types.ADD_LOG_FAILURE:
            return update(state,{
                error: {$set:action.error}
            });
        default:
            return state;
    }
}

function getPayInfo(state = {}, action) {
    switch (action.type) {
        case types.GET_PAY_INFO_REQUEST:
            return update(state, {
                isLoading: {$set: true}
            });
        case types.GET_PAY_INFO_SUCCESS:
            return update(state, {
                info: {$set: action.body.info},
                lastFetched: {$set: action.lastFetched},
                isLoading: {$set: false}
            });
        case types.FINISH_PAY_FAILURE:
            return update(state, {
                error: {$set: action.error}
            });
        default:
            return state;
    }
}

/**
 * 完成支付
 * @param state
 * @param action
 * @returns {{}}
 */
function finishPay(state = {}, action) {
    switch (action.type) {
        case types.FINISH_PAY_REQUEST:
            return update(state, {
                isLoading: {$set: true}
            });
        case types.FINISH_PAY_SUCCESS:
            return update(state, {
                info: {$set: action.body.info},
                lastFetched: {$set: action.lastFetched},
                isLoading: {$set: false}
            });
        case types.FINISH_PAY_FAILURE:
            return update(state, {
                error: {$set: action.error}
            });
        default:
            return state;
    }
}

const brandCarsCareReducer = combineReducers(
    {
        haveCheckPhone,
        getRemainPromotionNum,
        getPromotionInfo,
        getOwnerInfo,
        addPromotionBuyLog,
        addLog,
        getPayInfo,
        finishPay
    }
);
export default brandCarsCareReducer;
