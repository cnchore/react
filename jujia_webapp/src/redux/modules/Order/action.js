import * as types from '../../common/constant';

export function getMainProInfo(proid) {
    return {
        types:[types.REQUEST,types.SUCCESS,types.FAILURE],
        method:"get",
        path:"/api/order/order/getMainProInfo",
        query: {proid}
    }
}
export function getOwnerInfo(carnum){
    return {
        types: [types.REQUEST, types.SUCCESS, types.FAILURE],
        method: "get",
        path: "/api/order/order/getOwnerInfo",
        query: {carnum}
    }
}
export function getAllParkspot(keyWord){
    return{
        types: [types.REQUEST, types.SUCCESS, types.FAILURE],
        method: "get",
        path: "/api/order/order/getAllParkspot",
        query: {keyWord}
    }
}

export function getParkspotByOrder2(keyWord){
    return{
        types: [types.REQUEST, types.SUCCESS, types.FAILURE],
        method: "get",
        path: "/api/order/order/getParkspotByOrder2",
        query: {keyWord}
    }
}

export function getProPpid(mainProid,parkid,areaid,carnum){
    return{
        types: [types.REQUEST, types.SUCCESS, types.FAILURE],
        method: "get",
        path: "/api/order/order/getProPpid",
        query: {mainProid,parkid,areaid,carnum}
    }
}


export function createOrder(mainproid,ppids,phone,carnum, parkspotid,remark,paytype,ocids,areaid,stationid,busi_type,car_transfer_type,priority_level, parkspotname,is_take_tomorrow){
    return{
        types: [types.REQUEST, types.SUCCESS, types.FAILURE],
        method: "post",
        path: "/api/order/order/createNewOrderForWxV4",
        query: {mainproid,ppids,phone,carnum, parkspotid,remark,paytype,ocids,areaid,stationid,busi_type,car_transfer_type,priority_level, parkspotname,is_take_tomorrow},
        payload: {mainproid,ppids,phone,carnum, parkspotid,remark,paytype,ocids,areaid,stationid,busi_type,car_transfer_type,priority_level,parkspotname,is_take_tomorrow}
    }
}
export function pay(orderid,paytype,ocids){
    return {
        types: [types.REQUEST, types.SUCCESS, types.FAILURE],
        method: "get",
        path: "/api/order/order/getPayOrderForWx",
        query: {orderid,paytype,ocids}
    }
}
export function getOrderInfo(orderid){
    return {
        types: [types.REQUEST, types.SUCCESS, types.FAILURE],
        method: "get",
        path: "/api/order/order/getUnPayOrderInfoForWxV4",
        query: {orderid}
    }
}
export function getEstFinishtime(ppids,areaid,busi_type){
    return {
        types: [types.REQUEST, types.SUCCESS, types.FAILURE],
        method: "get",
        path: "/api/order/order/getEstFinishtime",
        query: {ppids,areaid,busi_type}
    }
}
export function getFrequentUsedParkspot(){
    return {
        types: [types.REQUEST, types.SUCCESS, types.FAILURE],
        method: "get",
        path: "/api/order/order/getFrequentUsedParkspot",
        query: {}
    }
}
export function getCarnumParkspot(carnum){
    return {
        types: [types.REQUEST, types.SUCCESS, types.FAILURE],
        method: "get",
        path: "/api/order/order/getCarnumParkspot",
        query: {carnum}
    }
}
export function getUnfinishOrder(){
    return {
        types: [types.REQUEST, types.SUCCESS, types.FAILURE],
        method: "get",
        path: "/api/order/order/getUnfinishOrder",
        query: {}
    }
}
export function getUnevaluateOrder(){
    return {
        types: [types.REQUEST, types.SUCCESS, types.FAILURE],
        method: "get",
        path: "/api/order/order/getUnevaluateOrder",
        query: {}
    }
}

export function getAssociatedStation(areaid){
    return{
       types:[types.REQUEST,types.SUCCESS,types.FAILURE],
        method:"get",
        path:"/api/dis/station/GetAssociatedStationV4",
        query:{areaid}
    }
}

export function getOrderCount(stationid){
    return{
        types:[types.REQUEST,types.SUCCESS,types.FAILURE],
        method:"get",
        path:"/api/order/order/GetOrderCountByStationV4",
        query:{stationid}
    }
}

/**
 * 获取配置提示信息
 * @param home
 * @returns {{types: *[], method: string, path: string, query: {home: *}}}
 */
export function getPromptInfo(name) {
    return {
        types: [types.REQUEST, types.SUCCESS, types.FAILURE],
        method: 'get',
        path: '/api/config/prompt_config/GetPromptInfo',
        query: {name}
    }
}

/**
 * 添加配置提示信息日志
 * @param prompt_id
 * @returns {{types: *[], method: string, path: string, query: {prompt_id: *}}}
 */
export function editPromptLog(prompt_id){
    return{
        types:[types.REQUEST,types.SUCCESS,types.FAILURE],
        method:'post',
        path:'/api/config/prompt_log/EditLog',
        query:{prompt_id}
    }
}


