/**
 * Created by Administrator on 2016/7/6.
 */
import React, { Component, PropTypes } from 'react';

class NovicePackageRule extends Component {

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={{background: '#fff',lineHeight: '150%',padding: '2rem'}}>
                <h1 style={{textAlign: 'center'}}>活动规则</h1>
                <p><b>活动商品:</b>美孚1号（银装）机油1L</p>
                <p><b>商品兑换有效期:</b>：套餐购买日起3个月内有效</p>
                <p><b>商品兑换地址：</b>指定到畅途居家养车凤凰城店领取（地址：东凌广场后新东城商业街64-72号，即东凌广场路口直入100米，联系方式：020-29825820）</p>
                <p><b>参与规则：</b></p>
                <p>1、用户到【畅途居家养车】微信公众号中参与活动。</p>
                <p>2、凭体验券去畅途居家养车.凤凰城门店使用。</p>
                <p>3、同一微信号、手机号码、车牌号均视为同一用户。</p>
                <p>4、如用户重复购买不予兑换，且不做退款和补偿。</p>
                <p>5、畅途保留法律范围内对活动的解释权。</p>
                <p><b>商品使用规则：</b></p>
                <p>1、凭体验券到店使用。</p>
                <p>2、需提前24小时电话预约，预约电话为020-2982-5820。</p>
                <p><b>其他说明：</b></p>
                <p>到店外加250元可享受优惠保养套餐，内含3L美孚1号银装机油、马勒机油格1个、60项全车安全检测1次，免工时费</p>
            </div>
        )
    }

}

export default NovicePackageRule;
