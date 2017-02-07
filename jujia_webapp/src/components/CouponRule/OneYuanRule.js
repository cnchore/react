/**
 * Created by Administrator on 2016/7/6.
 */
import React, { Component, PropTypes } from 'react';

class OneYuanRule extends Component {

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={{background: '#fff',lineHeight: '150%',padding: '2rem'}}>
                <h1 style={{textAlign:'center'}}>活动规则</h1>
                <p><b>活动时间:</b>2016年6月16日-2016年6月26日</p>
                <p><b>活动商品:</b>米其林雨刮、德国马勒空调格、德国马勒机油格、美孚银装1号(1L)59元特卖券 </p>
                <p><b>商品兑换时间:</b>即日起 至 2016年7月20日</p>
                <p><b>商品兑换地址：</b>仅限畅途居家养车.凤凰城门店（东凌广场后新东城商业街64~72号,东凌广场直入100米即到）</p>
                <p><b>参与规则：</b></p>
                <p>1、用户到畅途居家养车活动地点扫描二维码参与活动购买优惠券。</p>
                <p>2、购买成功后，登录【畅途居家养车】公众号，在【我的】-【我的优惠券】中查看兑换券</p>
                <p>3、凭兑换券去畅途居家养车.凤凰城门店兑换商品。</p>
                <p>4、每用户最多只能购买使用一套商品，一套商品包含米其林雨刮（1副）、德国马勒空调格（1个）、德国马勒机油格（1个）3选1，美孚银装1号(1L)59元特卖券4张。</p>
                <p>5、同一微信号、手机号码、车牌号均视为同一用户。</p>
                <p>6、如用户重复购买不予兑换，且不做退款和补偿。</p>
                <p>7、畅途保留法律范围内对活动的解释权。</p>
                <p><b>商品兑换规则：</b></p>
                <p>1、米其林雨刮券：凭此券到店领取商品，可享工时费10元更换雨刮（工时费原价：30元/副）</p>
                <p>2、机油格优惠券：凭此券及传单抵用券到店领取商品，更换可享工时费优惠。</p>
                <p>3、空调格优惠券：凭此券及传单抵用券到店领取商品，更换可享工时费优惠。</p>
                <p>4、59元特卖券：</p>
                <p style={{textIndent:'20px'}}>a、凭此券到店以59元价格购买美孚银装1号(1L)。</p>
                <p style={{textIndent:'20px'}}>b、每1L装美孚银装1号仅限一张抵用券。</p>
                <p style={{textIndent:'20px'}}>c、凭此券及传单抵用券到店更换可享工时费优惠。</p>
            </div>
        )
    }

}

export default OneYuanRule;
