import { combineReducers } from 'redux';
import * as types from './constant';
import update from 'react/lib/update';

function getVercode(state = {}, action) {
    switch (action.type) {

        case types.GET_VECODE_REQUEST:
            return update(state, {
                isLoading: { $set: true },
            });

        case types.GET_VECODE_SUCCESS:
            return update(state, {
                data: { $set: action.body },
                lastFetched: { $set: action.lastFetched },
                isLoading: { $set: false },
            });

        case types.GET_VECODE_FAILURE:
            return update(state, {
                error: { $set: action.error },
            });

        default:
            return state
    }
}

function checkVecode(state = {}, action) {
    switch (action.type) {

        case types.CHECK_VECODE_REQUEST:
            return update(state, {
                isLoading: { $set: true },
            });

        case types.CHECK_VECODE_SUCCESS:
            return update(state, {
                isCorrect: { $set: !!action.body.info },
                errorMsg: { $set: action.body.errMsg },
                lastFetched: { $set: action.lastFetched },
                isLoading: { $set: false },
            });

        case types.CHECK_VECODE_FAILURE:
            return update(state, {
                error: { $set: action.error },
            });

        default:
            return state
    }
}

function registerUser(state = {}, action) {
    switch (action.type) {
        case types.REGESTER_USER_REQUEST:
            return update(state, {
                isLoading: { $set: true },
            });

        case types.REGESTER_USER_SUCCESS:
            return update(state, {
                info: { $set: action.body.info },
                lastFetched: { $set: action.lastFetched },
                isLoading: { $set: false },
            });

        case types.REGESTER_USER_FAILURE:
            return update(state, {
                error: { $set: action.error },
            });

        default:
            return state;
    }
}

 function login(state = {}, action){
    switch(action.type){
        case types.LOGIN_SUCCESS:
        return update(state,{
            info:{$set:action.body.info},
            lastFetched:{$set:action.lastFetched},
            isLoading:{$set:false},
        });
        default:
        return state;
    }
 }
/*将多个Reducer合并为一个*/
const LoginRoducer = combineReducers({
    getVercode,
    checkVecode,
    registerUser,
    login
});

export default LoginRoducer;
