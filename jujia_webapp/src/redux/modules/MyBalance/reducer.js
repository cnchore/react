/**
 * Created by Administrator on 2016/6/18.
 */
import {combineReducers} from "redux";
import * as types from "./constant";
import update from "react/lib/update";

function getMyBalance(state = {}, action){
    switch(action.type){
        case types.GET_MY_BALANCE_REQUEST:
            return update(state,{
                isLoading:{$set: true}
            });
        case types.GET_MY_BALANCE_SUCCESS:
            return update(state,{
                info:{$set:action.body.info} ,
                lastFetched:{$set:action.lastFetched},
                isLoading: {$set:false}
            });
        case types.GET_MY_BALANCE_FAILURE:
            return update(state,{
                error: {$set:action.error}
            });
        default:
            return state;
    }
}

function getBalanceDetails(state={},action) {
    switch(action.type){
        case types.GET_BALANCE_DETAILS_REQUEST:
            return update(state,{
                isLoading:{$set: true}
            });
        case types.GET_BALANCE_DETAILS_SUCCESS:
            return update(state,{
                info:{$set:action.body.info} ,
                lastFetched:{$set:action.lastFetched},
                isLoading: {$set:false}
            });
        case types.GET_BALANCE_DETAILS_FAILURE:
            return update(state,{
                error: {$set:action.error}
            });
        default:
            return state;
    }
}

const myBalanceReducer = combineReducers(
    {
        getMyBalance,
        getBalanceDetails
    }
);
export default myBalanceReducer;
