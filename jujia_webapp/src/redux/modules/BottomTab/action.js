/**
 * Created by Administrator on 2016/7/15.
 */
import *as types from './constant';
export function getAlarmInfo(){
    return{
        types:[types.GET_ALARM_INFO_REQUEST,types.GET_ALARM_INFO_SUCCESS,types.GET_ALARM_INFO_FAILURE],
        method:"get",
        path:"/api/co/owner/getalarminfo"
    }
}
