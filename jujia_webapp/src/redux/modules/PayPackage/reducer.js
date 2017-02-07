/**
 * Created by Administrator on 2016/6/21.
 */
import {combineReducers} from "redux";
import * as types from "./constant";
import update from "react/lib/update";

/**
 * 支付请求
 * @param state
 * @param action
 * @returns {{}}
 */
function payPackage(state = {}, action) {
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

/**
 * 获取支付信息
 * @param state
 * @param action
 * @returns {{}}
 */
function getPayInfo(state = {}, action) {
    switch (action.type) {
        case types.GET_PAY_INFO_REQUEST:
            return update(state, {
                isLoading: {$set: true}
            });
        case types.GET_PAY_INFO_SUCCESS:
            return update(state, {
                info: {$set: action.body.info},
                lastFetched: {$set: action.lastFetched},
                isLoading: {$set: false}
            });
        case types.FINISH_PAY_FAILURE:
            return update(state, {
                error: {$set: action.error}
            });
        default:
            return state;
    }
}

/**
 * 完成支付
 * @param state
 * @param action
 * @returns {{}}
 */
function finishPay(state = {}, action) {
    switch (action.type) {
        case types.FINISH_PAY_REQUEST:
            return update(state, {
                isLoading: {$set: true}
            });
        case types.FINISH_PAY_SUCCESS:
            return update(state, {
                info: {$set: action.body.info},
                lastFetched: {$set: action.lastFetched},
                isLoading: {$set: false}
            });
        case types.FINISH_PAY_FAILURE:
            return update(state, {
                error: {$set: action.error}
            });
        default:
            return state;
    }
}

/**
 * 获取购物车
 * @param state
 * @param action
 * @returns {{}}
 */
function getShoppingCar(state = {}, action) {
    switch (action.type) {
        case types.GET_SHOPPING_CAR_REQUEST:
            return update(state, {
                isLoading: {$set: true}
            });
        case types.GET_SHOPPING_CAR_SUCCESS:
            return update(state, {
                info: {$set: action.body.info},
                lastFetched: {$set: action.lastFetched},
                isLoading: {$set: false}
            });
        case types.GET_SHOPPING_CAR_FAILURE:
            return update(state, {
                error: {$set: action.error}
            });
        default:
            return state;
    }
}

/**
 * 获取用户余额
 * @param state
 * @param action
 * @returns {{}}
 */
function getWalletBalance(state = {}, action) {
    switch (action.type) {
        case types.GET_WALLET_BALANCE_REQUEST:
            return update(state, {
                isLoading: {$set: true}
            });
        case types.GET_WALLET_BALANCE_SUCCESS:
            return update(state, {
                info: {$set: action.body.info},
                lastFetched: {$set: action.lastFetched},
                isLoading: {$set: false}
            });
        case types.GET_WALLET_BALANCE_FAILURE:
            return update(state, {
                error: {$set: action.error}
            });
        default:
            return state;
    }
}

/**
 * 移除商品
 * @param state
 * @param action
 * @returns {{}}
 */
function deleteByCar(state = {}, action) {
    switch (action.type) {
        case types.DELETE_BY_CAR_REQUEST:
            return update(state, {
                isLoading: {$set: true}
            });
        case types.DELETE_BY_CAR_SUCCESS:
            return update(state, {
                info: {$set: action.body.info},
                lastFetched: {$set: action.lastFetched},
                isLoading: {$set: false}
            });
        case types.DELETE_BY_CAR_FAILURE:
            return update(state, {
                error: {$set: action.error}
            });
        default:
            return state;
    }

}
const PayPackageReducer = combineReducers(
    {
        payPackage,
        getPayInfo,
        finishPay,
        getShoppingCar,
        getWalletBalance
    }
);

export default PayPackageReducer;
