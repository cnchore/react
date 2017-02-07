/**
 * Created by Administrator on 2016/7/15.
 */

import {combineReducers} from "redux";
import * as types from "./constant";
import update from "react/lib/update";

function getAlarmInfo(state = {}, action) {
    switch (action.type) {
        case types.GET_PACKAGE_LIST_REQUEST:
            return update(state, {
                isLoading: {$set: true}
            });
        case types.GET_PACKAGE_LIST_SUCCESS:
            return update(state, {
                info: {$set: action.body.info},
                lastFetched: {$set: action.lastFetched},
                isLoading: {$set: false}
            });
        case types.GET_PACKAGE_LIST_FAILURE:
            return update(state, {
                error: {$set: action.error}
            });
        default:
            return state;
    }
}

const bottomTabReducer = combineReducers(
    {
       getAlarmInfo
    }
);

export default bottomTabReducer;
