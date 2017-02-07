/**
 * Created by Administrator on 2016/8/25.
 */

import React, { Component, PropTypes } from 'react';
import styles from "./AddNewUSer.scss";
import titleBag from "./images/titleBag.png";
import btnBag from "./images/btnBag.png";
import btnWrapBag from "./images/btnWrapBag.png";
import importBag from "./images/importBag.png";
import bottomBag from "./images/bottomBag.png";
import Cookies from "js-cookie";
import Snackbarx from "../../components/Snackbarx/Snackbarx";
import {connect} from 'react-redux';
import *as AddNewUserAction from'../../redux/modules/AddNewUser/action';
import BaseComponent from "../../components/BaseComponent/BaseComponent";
import Common from "../../utils/Common";
import Loader from "../../components/Loader/Loader";
@connect(
    state=>({}),
    AddNewUserAction
)
class AddNewUser extends Component {
    state = {
        showLoading:true,
        btnHtml: "",
        phone: "",
        isEnd: false,
        haveCheck: false,
        btnStatus: true,
        msg: {show: false, msg: ""}
    };

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.activeIsEnd();
    }

    componentDidMount() {
        this.openid = Cookies.get("openid");
        if (Cookies.get("total") != null && Cookies.get("total") != undefined && Cookies.get("total") != "NaN") {//cookie存在倒计时
            this.timekeeping();
        } else {
            this.setState({btnHtml: "获取验证码"})
        }
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

    /**
     * 获取验证码
     * @param e
     */
    getCodeClick(e) {
        e.preventDefault();
        e.stopPropagation();
        window.document.getElementsByTagName("button")[1].focus();
        if(!this.state.isEnd && !this.state.haveCheck){
            if (this.checkInputInfo() && this.state.btnStatus) {
                this.setState({showLoading:true});
                console.log(this.openid);
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
     * 获取输入手机号码
     * @param e
     */
    handlePhoneChange(e) {
        var phone = e.target.value.replaceAll('-', '');
        console.log(phone);
        this.setState({phone: phone});
    }

    /**
     * 手机是否验证
     */
    haveCheckPhone() {
        this.props.haveCheckPhone().then(res=> {
            this.setState({showLoading:false})
            if (res.body.status) {
                this.state.haveCheck = true;
                this.refs["getCode"].setAttribute("disabled", true);
                this.showMsg(res.body.msg);
            }
        })
    }

    /**
     * 活动是否结束
     */
    activeIsEnd() {
        this.props.activeIsEnd().then(res=> {
            if (res.body.status) {
                this.state.isEnd = true;
                this.refs["getCode"].setAttribute("disabled", true);
                this.showMsg(res.body.msg);
            }
            this.haveCheckPhone();
        })
    }

    /**
     * 验证手机号码
     * @param e
     */
    confirmClick(e) {
        e.preventDefault();
        e.stopPropagation();
        this.setState({showLoading:true});
        window.document.getElementsByTagName("button")[1].focus();
        if (this.checkInputInfo()) {
            this.props.checkPhone(this.openid, this.state.phone, this.refs["codeText"].value).then(res=> {
                this.setState({showLoading:false});
                if (res.body.status) {
                    this.context.router.push("/openRedPackets");
                    Cookies.remove("total");
                    Cookies.remove("phone");
                } else {
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
        const style1 = {
            background: "url(" + titleBag + ") no-repeat",
            backgroundSize: "100% 100%",
            width: "100%"
        };
        const style2 = {
            background: "url(" + importBag + ")  no-repeat",
            backgroundSize: "100% 100%",
            width: "100%",
            marginTop: "-10px"
        };
        const style3 = {
            textAlign:"center",
            background: "url(" + btnWrapBag + ")  no-repeat",
            backgroundSize: "100% 100%",
            padding: "10px 0"
        };
        const style4 = {
            margin: "0 auto",
            background: "url(" + btnBag + ") no-repeat",
            backgroundSize: "100% 100%",
            width: "73%",
            height: "5rem"
        };
        const style5 = {
            background: "url(" + bottomBag + ") no-repeat",
            backgroundSize: "100% 100%",
            width: "100%",
            marginBottom: "-10px"
        };
        return (
            <BaseComponent>
                <div className={styles.container}>
                    <Loader show={this.state.showLoading}/>
                    <img src={titleBag} style={style1}/>
                    <div style={style2}>
                        <div className={styles.importContainer}>
                            <form className={styles.registform}>
                                <input type="tel" maxLength={13} placeholder="手机号码"
                                       onChange={(e)=>{this.handlePhoneChange(e)}}
                                       value={Common.formatPhone(this.state.phone)} autofocus= "autofocus"/>
                                <div className={styles.formgroup}>
                                    <input className={styles.codeInput} type="tel" maxLength={4} ref="codeText"
                                           placeholder="手机验证码"/>
                                    <button ref="getCode" className={styles.getCode}
                                            onTouchTap={(e)=>{this.getCodeClick(e)}}>{this.state.btnHtml}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div style={style3}>
                        <button onTouchTap={(e)=>{this.confirmClick(e)}}
                             style={style4}></button>
                    </div>
                    <img src={bottomBag} style={style5}/>
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
export default AddNewUser
