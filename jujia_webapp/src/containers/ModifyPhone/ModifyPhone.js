/**
 * Created by Administrator on 2016/8/30.
 */
import React, { Component, PropTypes } from 'react';
import styles from './ModifyPhone.scss';
import Cookies from "js-cookie";
import Snackbarx from "../../components/Snackbarx/Snackbarx";
import {connect} from 'react-redux';
import Common from "../../utils/Common";
import *as AddNewUserAction from'../../redux/modules/AddNewUser/action';
import BaseComponent from "../../components/BaseComponent/BaseComponent";
import Loader from "../../components/Loader/Loader";

@connect(
    state=>({}),
    AddNewUserAction
)

class ModifyPhone extends Component {
    state = {
        showLoading:false,
        btnHtml: "",
        phone: "",
        isEnd: false,
        haveCheck: false,
        btnStatus: true,
        msg: {show: false, msg: ""}
    };

    componentDidMount() {
        this.openid = Cookies.get("openid");
        if (Cookies.get("total") != null && Cookies.get("total") != undefined && Cookies.get("total") != "NaN") {//cookie存在倒计时
            this.timekeeping();
        } else {
            this.setState({btnHtml: "获取验证码"})
        }
    }

    constructor(props){
        super(props);
    }


    /**
     * 时间循环
     */
    timekeeping() {
        var self = this;
        this.setState({
            phone: Cookies.get("phone")
        });
        this.state.btnStatus = false;
        this.refs["getCode"].setAttribute("disabled", true);
        var interval = setInterval(function () {
            var total = Cookies.get("total");
            if (isNaN(total) || total == undefined || total == null) {
                total = 0;
            }
            self.setState({btnHtml: total + "s后重发"});
            total--;
            if (total <= 0) {//剩余倒计时为零，则显示 重新发送，可点击
                //清除定时器
                clearInterval(interval);
                //删除cookie
                total = Cookies.remove("total");
                //显示重新发送
                self.setState({btnHtml: "重新获取"});
                //把发送按钮设置为可点击
                self.refs["getCode"].removeAttribute("disabled");
                self.state.btnStatus = true;
            } else {//剩余倒计时不为零
                //重新写入总倒计时
                Cookies.set("total", total);
            }
        }, 1000)
    }
    getCodeClick(e) {
        e.preventDefault();
        e.stopPropagation();
        window.document.getElementsByTagName("button")[0].focus();
            if (this.checkInputInfo() && this.state.btnStatus) {
                this.setState({showLoading:true});
                this.props.getVcode(this.state.phone, this.openid).then(res=> {
                    this.setState({showLoading:false});
                    if (res.body.status) {
                        console.log(res);
                        this.setState({btnHtml: "已发送"});
                        Cookies.set("total", "60");
                        Cookies.set("phone", this.state.phone);
                        this.timekeeping();
                    } else {
                        this.showMsg(res.body.msg);
                    }
                });
            }
    }

    /**
     * 获取输入手机号码
     * @param e
     */
    handlePhoneChange(e) {
        var phone = e.target.value.replaceAll('-', '');
        console.log(phone);
        this.setState({phone: phone});
    }

    /**
     * 验证手机号码格式是否正确
     * @returns {boolean}
     */
    checkInputInfo() {
        var $phoneNumReg = /^(13[0-9]|14[0-9]|15[0-9]|18[0-9])|17[0-9]\d{8}$/;
        var phone = this.state.phone;
        if (phone.length < 11) {
            this.showMsg("请输入完整的手机号码！");
            this.setState({showLoading:false});
            return false;
        }
        if (!$phoneNumReg.test(phone)) {
            this.showMsg("请输入正确的手机号码！");
            this.setState({showLoading:false});
            return false;
        }
        return true;
    }
    /**
     * 验证手机号码
     * @param e
     */
    bindPhoneTouch(e) {
        e.preventDefault();
        e.stopPropagation();
        this.setState({showLoading:true});
        window.document.getElementsByTagName("button")[0].focus();
        if (this.checkInputInfo()) {
            this.props.resetPhone(this.openid, this.state.phone, this.refs["codeText"].value).then(res=> {
                if (res.body.status) {
                    this.showMsg(res.body.msg);
                    setTimeout(()=>{
                        this.setState({showLoading:false});
                        window.history.back();
                        Cookies.remove("total");
                        Cookies.remove("phone");
                    },2000)
                } else {
                    this.setState({showLoading:false});
                    this.showMsg(res.body.msg);
                }
            })
        }
    }

    /**
     * 提示消息
     * @param text
     */
    showMsg(text) {
        var msg = this.state.msg;
        msg.show = true;
        msg.msg = text;
        this.setState({msg});
    }

    /**
     * 关闭提示消息
     */
    handleMsgClose() {
        var msg = this.state.msg;
        msg.show = false;
        this.setState({msg});
    }
    render() {
        var autofocus="autofocus";
        return (
            <BaseComponent>
                <div className={styles.container}>
                    <Loader show={this.state.showLoading}/>
                    <div className={styles.title}>请输入需要修改的手机号码</div>
                    <div className={styles.importContainer}>
                        <form className={styles.registform}>
                            <input type="tel" maxLength={13} placeholder="手机号码"
                                   onChange={(e)=>{this.handlePhoneChange(e)}}
                                   value={Common.formatPhone(this.state.phone)} autofocus={true}/>
                            <div className={styles.formgroup}>
                                <input className={styles.codeInput} type="tel" maxLength={4} ref="codeText"
                                       placeholder="手机验证码"/>
                                <button ref="getCode" className={styles.getCode}
                                        onTouchTap={(e)=>{this.getCodeClick(e)}}>{this.state.btnHtml}</button>
                            </div>
                        </form>
                    </div>
                    <div className={styles.bindContent}><button className={styles.bindPhone} onTouchTap={::this.bindPhoneTouch}>绑定手机</button></div>
                </div>
                <Snackbarx
                    open={this.state.msg.show}
                    message={this.state.msg.msg}
                    autoHideDuration={3000}
                    onRequestClose={()=>this.handleMsgClose()}
                />
            </BaseComponent>
        )
    }
}

export default ModifyPhone
