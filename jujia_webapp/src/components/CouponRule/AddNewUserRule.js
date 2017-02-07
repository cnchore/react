/**
 * Created by Administrator on 2016/8/27.
 */
import React, { Component, PropTypes } from 'react';
import Common from "../../utils/Common";
class AddNewUserRule extends Component {
    state = {
        couponName: "",
        title: "",
        time: "",
        showOther: false
    };

    componentWillMount() {
        var pronames = Common.getParameterByName("pronames");
        var title = Common.getParameterByName("title");
        this.setState({couponName: pronames, title: title});
        if (pronames.indexOf("四轮调位") > -1) {
            this.setState({time: "1"});
            return
        }
        if (pronames.indexOf("维修") > -1 || pronames.indexOf("喷漆") > -1) {
            this.setState({time: "3"});
            return
        }
        if (pronames.indexOf("车险") > -1) {
            this.setState({time: "12"});
            return
        }
        this.setState({time: "3", showOther: true});
    }

    render() {
        var pronameContent = [];
        var location = [];
        var codeTips = [];
        var proNames = this.state.couponName.split("、");
        pronameContent.push(
            proNames.map((proName)=> {
                return (
                    <li>{proName}</li>
                )
            })
        );
        if (this.state.showOther) {
            location.push(<p><b>使用地点:</b>仅限在凤馨苑地库站使用，目前地库站正在建设中，预计9月15号开业，敬请期待！</p>)
        } else {
            location.push(<div><p><b>门店地址:</b>东凌广场后新东城商业街64-72号（东凌广场路口直入100米）</p>
                <p><b>门店电话:</b><a href="tel:02029825820">020-29825820</a></p></div>);
            codeTips.push(<li>凭优惠码到门店登记使用即可；</li>);
        }
        
        return (
            <div style={{background: '#fff',lineHeight: '150%',padding: '2rem'}}>
                <h1 style={{textAlign:'center'}}>活动规则</h1>
                <p><b>活动商品:</b>{this.state.title}</p>
                <p><b>活动有效期:</b>赠送日起{this.state.time}个月内有效</p>
                {location}
                <p><b>使用项目:</b></p>
                <ol style={{paddingLeft:'2rem'}}>
                    {pronameContent}
                </ol>
                <p><b>使用规则:</b></p>
                <ol style={{paddingLeft:'2rem'}}>
                    <li>每辆车仅限享受一次该红包优惠；</li>
                    <li>同类型优惠券，不可叠加使用；</li>
                    <li>畅途保留法律范围对活动的解释权；</li>
                    {codeTips}
                </ol>
            </div>
        )
    }

}

export default AddNewUserRule
