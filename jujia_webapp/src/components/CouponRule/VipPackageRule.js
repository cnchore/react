/**
 * Created by Administrator on 2016/7/6.
 */
import React, { Component, PropTypes } from 'react';

class VipPackageRule extends Component {

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={{background: '#fff',lineHeight: '150%',padding: '2rem'}}>
                <p style={{textAlign:'center'}}><b>100元保养工时券使用规则</b></p>
                <p>1、需在购买之日起30天内使用；</p>
                <p>2、仅限【畅途居家养车.凤凰城门店】使用，一次性消费抵扣，不设找零（东凌广场后新东城商业街64~72号,东凌广场直入100米即到）</p>
            </div>
        )
    }

}

export default VipPackageRule;

