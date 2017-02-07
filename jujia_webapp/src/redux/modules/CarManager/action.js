import * as types from './constant';

export function action() {
    return {

    }
}
/**
 * [getCarList 获取车列表]
 * @return {[type]} [description]
 */
export function getCarList(){
    return {
        types:[types.GET_CAR_LIST_REQUEST,types.GET_CAR_LIST_SUCCESS,types.GET_CAR_LIST_FAILURE],
        method:"get",
        path:"/api/co/car/GetCarInfoList"
    }
}
/**
 * [delCar 删除车信息]
 * @param  {[type]} carid  [车ID]
 * @return {[type]}        [description]
 */
export function delCar(carid,carnum){
    return {
        types:[types.DEL_CAR_REQUEST,types.DEL_CAR_SUCCESS,types.DEL_CAR_FAILURE],
        method:"post",
        path:"/api/co/car/DeleteByCarId",        
        query:{carid}
    }
}