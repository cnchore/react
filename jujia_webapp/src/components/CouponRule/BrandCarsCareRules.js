/**
 * Created by Administrator on 2016/8/1.
 */
import React, { Component, PropTypes } from 'react';
import Common from "../../utils/Common";


class BrandCarsCareRules extends Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    state={
        couponName:""
    };
    constructor(props) {
        super(props);
    }
    componentWillMount(){
        var pronames =Common.getParameterByName("pronames");
        this.setState({couponName:pronames});
       /* if(pronames.indexOf("美孚金装")>-1){

        }
        if(pronames.indexOf("美孚银装")>-1){

        }
        if(pronames.indexOf("嘉实多极")>-1){

        }
        if(pronames.indexOf("嘉实多磁")>-1){

        }
        if(pronames.indexOf("壳牌灰壳")>-1){

        }
        if(pronames.indexOf("壳牌蓝壳")>-1){

        }*/
    }

    render() {
        return (<div style={{background: '#fff',lineHeight: '150%',padding: '2rem'}}>
            <h1 style={{textAlign:'center'}}>活动规则</h1>
            <p><b>活动商品:</b>68元保养抵用券({this.state.couponName}精保)</p>
            <p><b>活动有效期:</b>购买日起三个月内有效</p>
            <p><b>门店地址:</b>东凌广场后新东城商业街64-72号（东凌广场路口直入100米）</p>
            <p><b>门店电话:</b><a href="tel:02029825820">020-29825820</a></p>
            <p><b>套餐包含:</b></p>
            <ol style={{paddingLeft:'2rem'}}>
                <li>{this.state.couponName}机油4L</li>
                <li>机油格一个</li>
                <li>精保工时费</li>
                <li>60项全车安全检测</li>
                <li>免费添加机油(5000公里内)</li>
                <li>免费添加油水(冷却液、助力油、风挡、清洁液)</li>
                <li>免费清洁发动机舱</li>
                <li>免费保养周期提醒</li>
            </ol>
            <p><b>使用规则:</b></p>
            <ol style={{paddingLeft:'2rem'}}>
                <li>此抵用券只用于抵扣“{this.state.couponName}”4升套餐抵扣68元；</li>
                <li>此券仅限到畅途居家养车凤凰城店使用；</li>
                <li>畅途保留法律范围对活动的解释权；</li>
            </ol>
        </div>)
    }
}

export default BrandCarsCareRules;
