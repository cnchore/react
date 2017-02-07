import {combineReducers} from "redux";
import * as types from "./constant";
import update from "react/lib/update";

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
 * 获取用户优惠券列表
 */
export function getCouponList(state={},action){
    switch (action.type) {
        case types.GET_COUPON_LIST_SUCCESS:
            return update(state,{
                info:{$set:action.body.info},
                lastFetched:{$set:action.lastFetched},
                isLoading:{$set:false}
            })     
        default:
            return state;
    }
}