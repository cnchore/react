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
 * 获取停车点列表
 */
export function getParkList(state={},action){
    switch(action.type){
        case types.GET_PARK_LIST_SUCCESS:
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
 * 删除停车点
 */
export function delPark(state={},action){
    switch(action.type){
        case types.DEL_PARK_SUCCESS:
            return update(state,{
                    info:{$set:action.body.info},
                    lastFetched:{$set:action.lastFetched},
                    isLoading:{$set:false}
                });
        default:
            return state;
    }
}