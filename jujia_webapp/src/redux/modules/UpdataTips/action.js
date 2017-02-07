/**
 * Created by Administrator on 2016/9/12.
 */
import * as types from './constant';
/**
 * 获取版本信息
 * @returns {{types: *[], method: string, path: string}}
 */
export function getVersionInfo() {
    return {
        types: [types.GET_VERSIONINFO_REQUEST, types.GET_VERSIONINFO_SUCCESS, types.GET_VERSIONINFO_FAILURE],
        method: 'get',
        path: '/api/version/upgrade/GetVersionInfo'
    }
}

/**
 * 添加版本日志
 * @returns {{types: *[], method: string, path: string}}
 */
export function editVersionLog() {
    return {
        types: [types.GET_VERSIONINFO_REQUEST, types.GET_VERSIONINFO_SUCCESS, types.GET_VERSIONINFO_FAILURE],
        method: 'post',
        path: '/api/version/prompt_log/EditPromptLog'
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

/**
 * 添加配置提示信息日志
 * @param prompt_id
 * @returns {{types: *[], method: string, path: string, query: {prompt_id: *}}}
 */
export function editPromptLog(prompt_id){
    return{
        types:[types.EDIT_PROMPTLOG_REQUEST,types.EDIT_PROMPTLOG_SUCCESS,types.EDIT_PROMPTLOG_FAILURE],
        method:'post',
        path:'/api/config/prompt_log/EditLog',
        query:{prompt_id}
    }
}
