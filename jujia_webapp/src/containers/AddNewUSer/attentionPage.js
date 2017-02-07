/**
 * Created by Administrator on 2016/8/26.
 */
import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import QRcode from './images/QRcode.png'
import Cookies from "js-cookie";
import *as AddNewUserAction from'../../redux/modules/AddNewUser/action';
import BaseComponent from "../../components/BaseComponent/BaseComponent";
import Common from "../../utils/Common";

@connect(
    state=>({}),
    AddNewUserAction
)

class AttentionPage extends Component {
    componentDidMount(){
        this.initBackData();
    }
    constructor(props) {
        super(props);
    }

    initBackData() {
        var openid=Cookies.get("openid");
        var userid = Common.getParameterByName("pushUserid");
        this.props.registerWithPullingUser(openid,userid);
    }

    render() {
        return (
            <BaseComponent>
                <div>
                    <img src={QRcode} style={{width:"100%",marginBottom:"-10px"}}/>
                </div>
            </BaseComponent>
        )
    }
}

export default AttentionPage
