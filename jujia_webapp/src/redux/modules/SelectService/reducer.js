import { combineReducers } from 'redux';
import * as types from './constant';
import update from 'react/lib/update';


function getMainPros(state = {}, action){
    switch(action.type){
        case types.GET_MAIN_PROPS_REQUEST:
            return update(state,{
                isLoading:{$set: true}
            });
        case types.GET_MAIN_PROPS_SUCCESS:
            return update(state,{
                info:{$set:action.body.info} ,
                lastFetched:{$set:action.lastFetched},
                isLoading: {$set:false}
            });
        case types.GET_MAIN_PROPS_FAILURE:
            return update(state,{
            error: {$set:action.error}
            });
        default:
            return state;
    }
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

const selectServiceReducer = combineReducers(
    {
        getMainPros,
        editVersionLog,
        getPromptInfo
    }
);

export default selectServiceReducer;

