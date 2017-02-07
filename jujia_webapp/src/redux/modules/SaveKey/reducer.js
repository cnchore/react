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
 * 获取当前订单信息
 */
export function getOrderInfo(state={},action){
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
 * 根据当前钥匙柜ID获取其他空闲钥匙柜信息
 */
export function getFreeKeyCabinetList(state={},action){
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
 * 获取当前最新钥匙码（轮询）
 */
export function getNewKeysCode(state={},action){
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