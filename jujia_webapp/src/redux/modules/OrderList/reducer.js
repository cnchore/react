import {combineReducers} from "redux";
import * as types from "./constant";
import update from "react/lib/update";
import * as commTypes from "../../common/constant";

export const initialState = {};

export default function (state = initialState, action) {
    switch (action.type) {
        case 'condition':
            return state;
        default:
            return state;
    }
}
/**
 * 获取订单列表
 */
export function getOrderList(state={},action){
    switch(action.type){
        case types.GET_ORDER_LIST_SUCCESS:
            return update(state,{
                    info:{$set:action.body.info},
                    lastFetched:{$set:action.lastFetched},
                    isLoading:{$set:false}
                });
        default:
            return state;
    }
}
/**
 * 获取取消订单原因配置
 */
export function getCancelOrderConfig(state={},action){
    switch(action.type){
        case commTypes.SUCCESS:
            return update(state,{
                    info:{$set:action.body.info},
                    lastFetched:{$set:action.lastFetched},
                    isLoading:{$set:false}
                });
        default:
            return state;
    }
}
/**
 * 取消订单
 */
export function cancelOrder(state={},action){
    switch(action.type){
        case commTypes.SUCCESS:
            return update(state,{
                    info:{$set:action.body.info},
                    lastFetched:{$set:action.lastFetched},
                    isLoading:{$set:false}
                });
        default:
            return state;
    }
}
/**
 * 订单退款
 */
export function refundForOrder(state={},action){
    switch(action.type){
        case commTypes.SUCCESS:
            return update(state,{
                    info:{$set:action.body.info},
                    lastFetched:{$set:action.lastFetched},
                    isLoading:{$set:false}
                });
        default:
            return state;
    }
}
/**
 * 添加取消订单原因
 */
export function addCancelOrderReason(state={},action){
    switch(action.type){
        case commTypes.SUCCESS:
            return update(state,{
                    info:{$set:action.body.info},
                    lastFetched:{$set:action.lastFetched},
                    isLoading:{$set:false}
                });
        default:
            return state;
    }
}