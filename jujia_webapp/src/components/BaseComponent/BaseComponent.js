import React, { Component, PropTypes } from 'react';
import Cookies from "js-cookie";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import Loader from "../Loader/Loader";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as BaseComponentActions from "../../redux/modules/BaseComponent/action";
import getUserAgent from '../../utils/GetUserAgent';


@connect(
    state=>({

    }),
    BaseComponentActions
)


export class BaseComponent extends React.Component {
    state = {
        showLoading:false,
        openEvaluate:false,
        evaludateOrderid: 0
    };

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.initOwnerInfo();
    }
    initOwnerInfo(){
        //Cookies.set("openid","ok82kxA6akxZsJyyRYUbOAlWbJ-M");
        //Cookies.set("openid","ok82kxHxSF_F7bh91NCVbiCnSrKg");
        // Cookies.set("openid","ok82kxKyCiaheDhNxh-bYshhVM1Y");
        Cookies.set("openid","ok82kxAnWVa4jhBOqOC3lNf0mRGg");
        var openid = Cookies.get("openid");
        var otherid = Cookies.get("otherid");
        if(!openid){
            window.location = "http://test.jujia.ctauto.cn/api/oauths/wxoauth/getWx?curl=" + window.encodeURIComponent(window.location.href);
            //window.location = "http://jujia.ctauto.cn/api/oauths/wxoauth/getWx?curl=" + window.encodeURIComponent(window.location.href);
            //this.props.getOpenid(window.encodeURIComponent(window.location.href))
        }
        if(Cookies.get("reload")){
            Cookies.remove("reload");
            window.document.location.reload(true);
        }
        //if(openid && !otherid ){
            // this.props.login(openid).then((res)=>{
            //     let browser = getUserAgent();
            //     if (browser.isiOS) {
            //         window.document.location.reload(true);
            //     }else{
            //         window.location = "http://test.jujia.ctauto.cn/api/oauths/wxoauth/getResponse?curl=" + window.encodeURIComponent(window.location.href);
            //         //window.location = "http://jujia.ctauto.cn/api/oauths/wxoauth/getResponse?curl=" + window.encodeURIComponent(window.location.href);
            //     }
                // });
        //}else{
            //this.props.login(openid).then((res)=>{
                this.getUnevaluateOrder();
                //});
                //}
    }
    getUnevaluateOrder(){
        var locationHref = window.document.location.href;
        //var reg = new RegExp(/\b(home|user|order)((?!list))\b/gi);
        var reg = new RegExp(/(\b(home|order|orderStation)((?!list))\b)|(\/$)/gi);
        var reg2 = new RegExp(/=\/(\b(home|order|orderStation)((?!list))\b)/gi);
        var showEvaluate = reg.test(locationHref) && !reg2.test(locationHref);

        if(showEvaluate){
            this.props.getUnevaluateOrder().then((res)=>{
                if(res.body.status && res.body.data && res.body.data.orderid){
                    this.setState({
                        openEvaluate:true,
                        evaludateOrderid: res.body.data.orderid
                    })
                }
            });

        }

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
                    this.props.children
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

