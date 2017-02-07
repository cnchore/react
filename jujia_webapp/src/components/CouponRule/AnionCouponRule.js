/**
 * Created by Administrator on 2016/7/28.
 */
/**
 * Created by Administrator on 2016/7/6.
 */
import React, { Component, PropTypes } from 'react';

class AnionCouponRule extends Component {

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
                <p>1.凭此券到畅途凤凰城门店立享负离子消毒一次，无需额外费用；</p>
                <p>2.此券不可抵用居家上门负离子消毒服务，仅限到凤凰城门店体验；</p>
                <p>3.每个车牌仅限使用一次，同一车牌、手机号码、微信号均视为同一用户；</p>
                <p>4.畅途保留法律范围内对活动的解释权。
                    畅途凤凰城门店地址：东凌广场后新东城商业街64-72号（东凌广场路口直入100米）
                    联系方式：020-29825820</p>
            </div>
        )
    }
}

export default AnionCouponRule;

