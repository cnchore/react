import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import http from "../../utils/httpClient";
import Cookies from "js-cookie";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import {red500} from "material-ui/styles/colors";
import Loader from "../../components/Loader/Loader";


class BaseComponent extends Component {
    state = {
        showLoading:false,
        openEvaluate:false,
        evaludateOrderid: 0
    };

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    getInitialState(){

    }
    constructor(props) {
        super(props);
        this.initOwnerInfo();
    }
    initOwnerInfo(){
        // Cookies.set("openid","ok82kxA6akxZsJyyRYUbOAlWbJ-M");
        Cookies.set("openid","ok82kxHxSF_F7bh91NCVbiCnSrKg");
        //Cookies.set("openid","ok82kxKyCiaheDhNxh-bYshhVM1Y");
        // Cookies.set("openid","ok82kxAnWVa4jhBOqOC3lNf0mRGg");
        var openid = Cookies.get("openid");
        var otherid = Cookies.get("otherid");
        if(!openid){
            window.location = "http://test.jujia.ctauto.cn/api/oauths/wxoauth/getWx?curl=" + window.encodeURIComponent(window.location.href);
        }
        //if(openid && !otherid){
        if(openid){
            this.login(openid);
        }else{
            this.getUnevaluateOrder();
        }
    }

    login(openid){
        http.get("/api/bas/user/LoginByOpenidAndPromotionid",{openid}).then((res)=>{
            console.log(res);
            this.getUnevaluateOrder();
        });
        return;

    }

    getUnevaluateOrder(){
        http.get("/api/order/order/getUnevaluateOrder").then((res)=>{
            if(res.status && res.data && res.data.orderid){
                this.setState({
                    openEvaluate:true,
                    evaludateOrderid: res.data.orderid
                })
            }
        });
    }

    getChildRender(){
        return "";
    }

    handleEvaluate(){
        var returnUrl = "";
        if(document.location.href.indexOf("order")> 0)
            returnUrl = "/orderlist";
        else 
            returnUrl = "/home2";

            this.context.router.push("/serviceEvaluate?orderid=" + this.state.evaludateOrderid + "&returnUrl=" + returnUrl);
    }



    render() {
        const actions = [
            <FlatButton
                label="去评价"
                onTouchTap={::this.handleEvaluate}
                labelStyle={{
                    color:"#cc3333"
                }
                }
            />

        ];
        return(
            <div>
                <Loader show={this.state.showLoading}/>
                {
                    this.getChildRender()
                }
                <Dialog
                    title="订单评价"
                    actions={actions}
                    modal={false}
                    open={this.state.openEvaluate}
                >
                    感谢您使用居家养车服务！期待您在微信为技师服务评价、点赞、吐槽。
                </Dialog>

            </div>
        )
    }

}

export default BaseComponent;
