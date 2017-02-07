import { combineReducers } from 'redux';
import * as types from '../../common/constant';
import update from 'react/lib/update';


function login(state = {}, action){
    switch(action.type){
        case types.REQUEST:
            return update(state,{
            isLoading: {$set: true},
        });
        case types.SUCCESS:
        return update(state,{
            info:{$set: action.body && action.body.info},
            lastFetched:{$set:action.lastFetched},
            isLoading:{$set:false},
        });
    case types.FAILURE:
        return update(state,{
            error:{$set:action.error},
        });
        default:
        return state;
    }
 }
function getUnevaluateOrder(state = {}, action){
    switch(action.type){
        case types.REQUEST:
            return update(state,{
            isLoading: {$set: true},
        });
        case types.SUCCESS:
        return update(state,{
            info:{$set: action.body && action.body.info},
            lastFetched:{$set:action.lastFetched},
            isLoading:{$set:false},
        });
    case types.FAILURE:
        return update(state,{
            error:{$set:action.error},
        });
        default:
        return state;
    }
 }
function getOpenid(state = {}, action){
    switch(action.type){
        case types.REQUEST:
            return update(state,{
            isLoading: {$set: true},
        });
        case types.SUCCESS:
        return update(state,{
            info:{$set: action.body && action.body.info},
            lastFetched:{$set:action.lastFetched},
            isLoading:{$set:false},
        });
    case types.FAILURE:
        return update(state,{
            error:{$set:action.error},
        });
        default:
        return state;
    }
 }




/*将多个Reducer合并为一个*/
const BaseComponentReducer = combineReducers({
    login,
    getUnevaluateOrder,
    getOpenid
});

export default BaseComponentReducer;
