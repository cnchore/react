import * as types from '../../common/constant';

export function login(openid){
    return{
        types: [types.REQUEST,types.SUCCESS,types.FAILURE],
        method: "get",
        path:"/api/bas/user/LoginByOpenidAndPromotionid",
        query:{openid}
    };
}
export function getUnevaluateOrder(){
    return{
        types: [types.REQUEST,types.SUCCESS,types.FAILURE],
        method: "get",
        path:"/api/order/order/getUnevaluateOrder",
        query:{}
    };
}

export function getOpenid(curl){
    return {
        types:[types.REQUEST,types.SUCCESS,types.FAILURE],
        method:"get",
        path:"/api/oauths/wxoauth/getWx",
        query:{
            curl
        }
    }
}

export function checkLogin(){
     return {
        types:[types.REQUEST,types.SUCCESS,types.FAILURE],
        method:"get",
        path:"/api/bas/user/checkLogin",
        query:{
        }
    }

}
