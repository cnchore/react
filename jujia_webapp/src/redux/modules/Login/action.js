import * as types from './constant';
export function getVecode(mobile) {
    return {
        types: [types.GET_VECODE_REQUEST, types.GET_VECODE_SUCCESS, types.GET_VECODE_FAILURE],
        method: 'get',
        path: 'vercode/getVercode',
        query: { mobile }
    }
}

export function checkVecode(mobile, vercode) {
    return {
        types: [types.CHECK_VECODE_REQUEST, types.CHECK_VECODE_SUCCESS, types.CHECK_VECODE_FAILURE],
        method: 'get',
        path: 'vercode/checkVercode',
        query: { mobile, vercode }
    }
}

export function registerUser(mobile, a, c) {
    return {
        types: [types.REGESTER_USER_REQUEST, types.REGESTER_USER_SUCCESS, types.REGESTER_USER_FAILURE],
        method: 'post',
        path: 'member/regist',
        payload: { mobile, a, c }
    }
}

export function login(username,userpwd,type){
    return{
        types: [types.REGESTER_USER_REQUEST, types.LOGIN_SUCCESS, types.REGESTER_USER_FAILURE],
        method: 'get',
        path:'/api/bas/user/login',
        query:{username,userpwd,type}
    };
}
