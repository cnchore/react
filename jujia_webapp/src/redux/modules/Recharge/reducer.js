/**
 * Created by Administrator on 2016/6/20.
 */
import {combineReducers} from "redux";
import * as types from "./constant";
import update from "react/lib/update";

/**
 * 获取充值列表
 * @param state
 * @param action
 * @returns {{}}
 */
function recharge(state = {}, action){
    switch(action.type){
        case types.RECHARGE_REQUEST:
            return update(state,{
                isLoading:{$set: true}
            });
        case types.RECHARGE_SUCCESS:
            return update(state,{
                info:{$set:action.body.info} ,
                lastFetched:{$set:action.lastFetched},
                isLoading: {$set:false}
            });
        case types.RECHARGE_FAILURE:
            return update(state,{
                error: {$set:action.error}
            });
        default:
            return state;
    }
}

/**
 * 添加充值
 * @param state
 * @param action
 * @returns {{}}
 */
function addRecharge(state = {}, action){
    switch(action.type){
        case types.ADD_RECHARGE_REQUEST:
            return update(state,{
                isLoading:{$set: true}
            });
        case types.ADD_RECHARGE_SUCCESS:
            return update(state,{
                info:{$set:action.body.info} ,
                lastFetched:{$set:action.lastFetched},
                isLoading: {$set:false}
            });
        case types.ADD_RECHARGE_FAILURE:
            return update(state,{
                error: {$set:action.error}
            });
        default:
            return state;
    }
}

/**
 * 提交充值
 * @param state
 * @param action
 * @returns {{}}
 */
function submitPay(state = {}, action) {
    switch(action.type){
        case types.SUBMIT_WEIXIN_PAY_REQUEST:
            return update(state,{
                isLoading:{$set: true}
            });
        case types.SUBMIT_WEIXIN_PAY_SUCCESS:
            return update(state,{
                info:{$set:action.body.info} ,
                lastFetched:{$set:action.lastFetched},
                isLoading: {$set:false}
            });
        case types.SUBMIT_WEIXIN_PAY_FAILURE:
            return update(state,{
                error: {$set:action.error}
            });
        default:
            return state;
    }

}

/**
 * 提交充值成功
 * @param state
 * @param action
 * @returns {{}}
 */
function submitPaySuccess(state = {}, action) {
    switch(action.type){
        case types.SUBMIT_PAY_SUCCESS_REQUEST:
            return update(state,{
                isLoading:{$set: true}
            });
        case types.SUBMIT_PAY_SUCCESS_SUCCESS:
            return update(state,{
                info:{$set:action.body.info} ,
                lastFetched:{$set:action.lastFetched},
                isLoading: {$set:false}
            });
        case types.SUBMIT_PAY_SUCCESS_FAILURE:
            return update(state,{
                error: {$set:action.error}
            });
        default:
            return state;
    }

}
const rechargeReducer = combineReducers(
    {
        recharge,
        addRecharge,
        submitPay,
        submitPaySuccess
    }
);
export default rechargeReducer;
