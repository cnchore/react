/**
 * Created by Administrator on 2016/7/6.
 */
import React, { Component, PropTypes } from 'react';

class FiftyYuanRule extends Component {

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
                <p><b>活动商品:</b>漆面修复体验券</p>
                <p><b>商品兑换时间:</b>2016年6月25日 至 2016年7月31日</p>
                <p><b>商品兑换地址：</b>仅限畅途居家养车.凤凰城门店（东凌广场后新东城商业街64~72号,东凌广场直入100米即到）</p>
                <p><b>参与规则：</b></p>
                <p>1、用户到【畅途居家养车】微信公众号中参与活动。</p>
                <p>2、在线支付购买漆面修复体验券。</p>
                <p>3、凭体验券去畅途居家养车.凤凰城门店使用。</p>
                <p>4、每用户最多只能购买使用一张体验券。</p>
                <p>5、同一微信号、手机号码、车牌号均视为同一用户。</p>
                <p>6、如用户重复购买不予兑换，且不做退款和补偿。</p>
                <p>7、畅途保留法律范围内对活动的解释权。</p>
                <p><b>商品使用规则：</b></p>
                <p>1、凭体验券到店使用。</p>
                <p>2、需提前24小时电话预约，预约电话为020-2982-5820。</p>
            </div>
        )
    }

}

export default FiftyYuanRule;

