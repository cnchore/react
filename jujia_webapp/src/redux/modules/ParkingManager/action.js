import * as types from './constant';

export function action() {
    return {

    }
}
/**
 * 获取停车点列表
 */
export function getParkList(){
    return {
        types:[types.GET_PARK_LIST_REQUEST,types.GET_PARK_LIST_SUCCESS,types.GET_PARK_LIST_FAILURE],
        method:"get",
        path:"/api/dis/parkspot/GetParkspotInfoList"
    }
}
/**
 * 删除停车点
 */
export function delPark(parkId){
    return {
        types:[types.DEL_PARK_REQUEST,types.DEL_PARK_SUCCESS,types.DEL_PARK_FAILURE],
        method:"post",
        path:"/api/co/r_owner_parkspot/DeleteParkspotByParkId",
        query:{parkId}
    }
}