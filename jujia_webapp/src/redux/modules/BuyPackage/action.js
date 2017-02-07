/**
 * Created by Administrator on 2016/6/20.
 */
import *as types from './constant';

/**
 * 获取优惠券套餐列表
 * @returns {{types: *[], method: string, path: string}}
 */
export function getPackageList () {
    return{
        types:[types.GET_PACKAGE_LIST_REQUEST,types.GET_PACKAGE_LIST_SUCCESS,types.GET_PACKAGE_LIST_FAILURE],
        method:"get",
        path:"/api/cpn/package/GetPackageList"
    }
}

/**
 * 获取购物车数据
 * @returns {{types: *[], method: string, path: string}}
 */
export function  getShoppingCar() {
    return{
     types:[types.GET_SHOPPING_CAR_REQUEST,types.GET_SHOPPING_CAR_SUCCESS,types.GET_SHOPPING_CAR_FAILURE],
        method:"get",
        path:"/api/cpn/shopping_car/GetShoppingCar"
    }
}

/**
 * 添加商品
 * @param otherId
 * @param type
 * @returns {{types: *[], method: string, path: string, query: {otherId: *, type: *}}}
 * @constructor
 */
export function addToShoppingCar(otherId,type){
    return{
        types:[types.ADD_TO_SHOPPING_CAR_REQUEST,types.ADD_TO_SHOPPING_CAR_SUCCESS,types.ADD_TO_SHOPPING_CAR_FAILURE],
        method:"get",
        path:"/api/cpn/shopping_car/AddToShoppingCar",
        query:{otherId,type}
    }
}

/**
 * 移除商品
 * @returns {{types: *[], method: string, path: string}}
 * @constructor
 */
export function deleteByCar(carId){
    return{
        types:[types.DELETE_BY_CAR_REQUEST,types.DELETE_BY_CAR_SUCCESS,types.DELETE_BY_CAR_FAILURE],
        method:"get",
        path:"/api/cpn/shopping_car/DeleteByCarId",
        query:{carId}
    }
}
