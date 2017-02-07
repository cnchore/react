import * as types from './constant';

export function action() {
    return {

    }
}
/**
 * 获取优惠券列表
 */
export function getCouponList(){
    return{
        types:[types.GET_COUPON_LIST_REQUEST,types.GET_COUPON_LIST_SUCCESS,types.GET_COUPON_LIST_FAILURE],
        method:"get",
        path:"/api/cpn/owner_coupon/GetCouponList"
    }
}