import * as types from './constant';

export function getMainPros(){
   return {
        types: [types.GET_MAIN_PROPS_REQUEST,types.GET_MAIN_PROPS_SUCCESS,types.GET_MAIN_PROPS_FAILURE],
        method: "get",
        path:"/api/order/order/getMainProsV4",
   }
}


/**
 * 获取配置提示信息
 * @param home
 * @returns {{types: *[], method: string, path: string, query: {home: *}}}
 */
export function getPromptInfo(name) {
    return {
        types: [types.GET_PROMPTINFO_REQUEST, types.GET_PROMPTINFO_SUCCESS, types.GET_PROMPTINFO_FAILURE],
        method: 'get',
        path: '/api/config/prompt_config/GetPromptInfo',
        query: {name}
    }
}

export function editPromptLog(prompt_id){
    return{
        types:[types.EDIT_PROMPTLOG_REQUEST,types.EDIT_PROMPTLOG_SUCCESS,types.EDIT_PROMPTLOG_FAILURE],
        method:'post',
        path:'/api/config/prompt_log/EditLog',
        query:{prompt_id}
    }
}


