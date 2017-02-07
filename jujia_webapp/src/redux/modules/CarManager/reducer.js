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
 * [getCarList 获取车列表]
 * @param  {Object} state  [description]
 * @param  {[type]} action [description]
 * @return {[type]}        [description]
 */
export function getCarList(state={},action){
    switch(action.type){
        case types.GET_CAR_LIST_SUCCESS:
            return update(state,{
                info:{$set:action.body.info},
                lastFetched:{$set:action.lastFetched},
                isLoading:{$set:false}
            });
        default:
            return;
    }
}
/**
 * [delCar 删除车信息]
 * @param  {Object} state  [description]
 * @param  {[type]} action [description]
 * @return {[type]}        [description]
 */
export function delCar(state={},action){
    switch(action.type){
        case types.DEL_CAR_SUCCESS:
            return update(state,{
                    info:{$set:action.body.info},
                    lastFetched:{$set:action.lastFetched},
                    isLoading:{$set:false}
                });
        default:
            return;
    }
}