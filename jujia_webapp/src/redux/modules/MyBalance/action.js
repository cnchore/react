/**
 * Created by Administrator on 2016/6/18.
 */
import *as types from './constant';

/**
 * 获取我的余额
 * @returns {{types: *[], method: string, path: string}}
 */
export function getMyBalance(){
    return {
        types: [types.GET_MY_BALANCE_REQUEST,types.GET_MY_BALANCE_SUCCESS,types.GET_MY_BALANCE_FAILURE],
        method: 'get',
        path:'/api/wallet/balance/getBalance'
    }
}

export function getBalanceDetails(page,pagesize) {
    return{
        types:[types.GET_BALANCE_DETAILS_REQUEST,types.GET_BALANCE_DETAILS_SUCCESS,types.GET_BALANCE_DETAILS_FAILURE],
        method: 'post',
        path:'/api/wallet/balance_log/GetBalanceLogByOwnerId',
        query:{page,pagesize}
    }
}


