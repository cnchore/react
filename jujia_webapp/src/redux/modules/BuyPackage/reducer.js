/**
 * Created by Administrator on 2016/6/20.
 */
import {combineReducers} from "redux";
import * as types from "./constant";
import update from "react/lib/update";

function getPackageList(state = {}, action) {
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

function addToShoppingCar(state = {}, action) {
    switch (action.type) {
        case types.ADD_TO_SHOPPING_CAR_REQUEST:
            return update(state, {
                isLoading: {$set: true}
            });
        case types.ADD_TO_SHOPPING_CAR_SUCCESS:
            return update(state, {
                info: {$set: action.body.info},
                lastFetched: {$set: action.lastFetched},
                isLoading: {$set: false}
            });
        case types.ADD_TO_SHOPPING_CAR_FAILURE:
            return update(state, {
                error: {$set: action.error}
            });
        default:
            return state;
    }
}

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

const buyPackageReducer = combineReducers(
    {
        getPackageList,
        getShoppingCar,
        addToShoppingCar,
        deleteByCar
    }
);

export default buyPackageReducer;
