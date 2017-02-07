import {combineReducers} from "redux";
import * as types from "./constant";
import update from "react/lib/update";

/**
 * 获取用户信息
 * @param state
 * @param action
 * @returns {{}}
 */
function getUserInfo(state = {}, action){
    switch(action.type){
        case types.GET_USERINFO_REQUEST:
            return update(state,{
                isLoading:{$set: true}
            });
        case types.GET_USERINFO_SUCCESS:
            return update(state,{
                info:{$set:action.body.info} ,
                lastFetched:{$set:action.lastFetched},
                isLoading: {$set:false}
            });
        case types.GET_USERINFO_FAILURE:
            return update(state,{
                error: {$set:action.error}
            });
        default:
    }
    return state;
}

/**
 * 获取版本信息
 * @param state
 * @param action
 * @returns {{}}
 */
function getVersionInfo(state = {}, action){
    switch(action.type){
        case types.GET_VERSIONINFO_REQUEST:
            return update(state,{
                isLoading:{$set: true}
            });
        case types.GET_VERSIONINFO_SUCCESS:
            return update(state,{
                info:{$set:action.body.info} ,
                lastFetched:{$set:action.lastFetched},
                isLoading: {$set:false}
            });
        case types.GET_VERSIONINFO_FAILURE:
            return update(state,{
                error: {$set:action.error}
            });
        default:
    }
    return state;
}

/**
 * 添加版本日志
 * @param state
 * @param action
 * @returns {{}}
 */
function editVersionLog(state = {}, action){
    switch(action.type){
        case types.EDIT_VERSION_LOG_REQUEST:
            return update(state,{
                isLoading:{$set: true}
            });
        case types.EDIT_VERSION_LOG_SUCCESS:
            return update(state,{
                info:{$set:action.body.info} ,
                lastFetched:{$set:action.lastFetched},
                isLoading: {$set:false}
            });
        case types.EDIT_VERSION_LOG_FAILURE:
            return update(state,{
                error: {$set:action.error}
            });
        default:
    }
    return state;
}

function getPromptInfo(state = {}, action){
    switch(action.type){
        case types.GET_PROMPTINFO_REQUEST:
            return update(state,{
                isLoading:{$set: true}
            });
        case types.GET_PROMPTINFO_SUCCESS:
            return update(state,{
                info:{$set:action.body.info} ,
                lastFetched:{$set:action.lastFetched},
                isLoading: {$set:false}
            });
        case types.GET_PROMPTINFO_FAILURE:
            return update(state,{
                error: {$set:action.error}
            });
        default:
    }
    return state;
}

const userReducer = combineReducers(
    {
        getUserInfo,
        getVersionInfo,
        editVersionLog,
        getPromptInfo
    }
);

export default userReducer;
