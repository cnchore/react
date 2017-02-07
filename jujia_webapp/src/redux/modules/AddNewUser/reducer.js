/**
 * Created by Administrator on 2016/8/23.
 */

import { combineReducers } from 'redux';
import * as types from './constant';
import update from 'react/lib/update';

/**
 * 验证手机
 * @param state
 * @param action
 * @returns {{}}
 */
function resetPhone(state = {}, action) {
    switch (action.type) {
        case types.RESET_PHONE_REQUEST:
            return update(state, {
                isLoading: {$set: true}
            });
        case types.RESET_PHONE_SUCCESS:
            return update(state, {
                info: {$set: action.body.info},
                lastFetched: {$set: action.lastFetched},
                isLoading: {$set: false}
            });
        case types.RESET_PHONE_FAILURE:
            return update(state, {
                error: {$set: action.error}
            });
        default:
            return state;
    }
}
/**
 * 是否验证手机号码
 * @param state
 * @param action
 * @returns {{}}
 */
function haveCheckPhone(state = {}, action) {
    switch (action.type) {
        case types.HAVE_CHECK_PHONE_REQUEST:
            return update(state, {
                isLoading: {$set: true}
            });
        case types.HAVE_CHECK_PHONE_SUCCESS:
            return update(state, {
                info: {$set: action.body.info},
                lastFetched: {$set: action.lastFetched},
                isLoading: {$set: false}
            });
        case types.HAVE_CHECK_PHONE_FAILURE:
            return update(state, {
                error: {$set: action.error}
            });
        default:
            return state;
    }
}

/**
 * 活动是否结束
 * @param state
 * @param action
 * @returns {{}}
 */
function activeIsEnd(state = {}, action) {
    switch (action.type) {
        case types.ACTIVE_IS_END_REQUEST:
            return update(state, {
                isLoading: {$set: true}
            });
        case types.ACTIVE_IS_END_SUCCESS:
            return update(state, {
                info: {$set: action.body.info},
                lastFetched: {$set: action.lastFetched},
                isLoading: {$set: false}
            });
        case types.ACTIVE_IS_END_FAILURE:
            return update(state, {
                error: {$set: action.error}
            });
        default:
            return state;
    }
}

/**
 * 获取验证码
 * @param state
 * @param action
 * @returns {{}}
 */
function getVcode(state = {}, action) {
    switch (action.type) {
        case types.GET_V_CODE_REQUEST:
            return update(state, {
                isLoading: {$set: true}
            });
        case types.GET_V_CODE_SUCCESS:
            return update(state, {
                info: {$set: action.body.info},
                lastFetched: {$set: action.lastFetched},
                isLoading: {$set: false}
            });
        case types.GET_V_CODE_FAILURE:
            return update(state, {
                error: {$set: action.error}
            });
        default:
            return state;
    }
}

/**
 * 验证手机号码
 * @param state
 * @param action
 * @returns {{}}
 */
function checkPhone(state = {}, action) {
    switch (action.type) {
        case types.CHECK_PHONE_REQUEST:
            return update(state, {
                isLoading: {$set: true}
            });
        case types.CHECK_PHONE_SUCCESS:
            return update(state, {
                info: {$set: action.body.info},
                lastFetched: {$set: action.lastFetched},
                isLoading: {$set: false}
            });
        case types.CHECK_PHONE_FAILURE:
            return update(state, {
                error: {$set: action.error}
            });
        default:
            return state;
    }

}

/**
 * 注册新用户
 * @param state
 * @param action
 * @returns {{}}
 */
function registerWithPullingUser(state={},action) {
    switch (action.type) {
        case types.REGISTERED_USER_REQUEST:
            return update(state, {
                isLoading: {$set: true}
            });
        case types.REGISTERED_USER_SUCCESS:
            return update(state, {
                info: {$set: action.body.info},
                lastFetched: {$set: action.lastFetched},
                isLoading: {$set: false}
            });
        case types.REGISTERED_USER_FAILURE:
            return update(state, {
                error: {$set: action.error}
            });
        default:
            return state;
    }
}

const addNewUserReducer = combineReducers(
    {
        resetPhone,
        activeIsEnd,
        haveCheckPhone,
        getVcode,
        checkPhone,
        registerWithPullingUser
    }
);

export default addNewUserReducer;
