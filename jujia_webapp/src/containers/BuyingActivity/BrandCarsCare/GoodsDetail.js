/**
 * Created by Administrator on 2016/7/26.
 */
import React, { Component, PropTypes } from 'react';
import TextField from "material-ui/TextField";
import Styles from './BranderCarsCare.scss';
import Common from "../../../utils/Common";
import WeiXin from "../../../utils/WeiXin";
import CarnoKeyBoard from '../../../components/CarnoKeyBoard/CarnoKeyBoard'
import { bindActionCreators } from 'redux';
import goodsdetail1 from './images/goodsdetail1.png';
import goodsdetail2 from './images/goodsdetail2.png';
import goodsdetail3 from './images/goodsdetail3.png';
import goodsdetail4 from './images/goodsdetail4.png';
import goodsdetail5 from './images/goodsdetail5.png';
import goodsdetail6 from './images/goodsdetail6.png';
import inputBag from './images/inputBag.png';
import Cookies from "js-cookie";
import BaseComponent from "../../../components/BaseComponent/BaseComponent";
import {connect} from 'react-redux';
import *as BrandCarsCareAction from'../../../redux/modules/BuyingActivity/BrandCarsCare/action';
import Snackbarx from "../../../components/Snackbarx/Snackbarx";
import Loader from "../../../components/Loader/Loader";

@connect(
    state=>({}),
    BrandCarsCareAction
)

class GoodsDetail extends Component {
    static propTypes = {};
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };
    state = {
        haveCheck:false,
        msg: {show: false, msg: ""},
        type: "",
        imgSrc: "",
        couponid: null,
        promotionid: null,
        payid: null,
        carNum: "",
        phone: "",
        timer: null,
        isEnd: false,
        keyboardOpen: false,
        inputBgStyle: false,
        DetailBagStyle: true,
        showLoading: false,
        windowInnerHeight: 0,
        mainSections: [
            {
                name: "phone",
                display: "block",
                originY: 0
            }, {
                name: "carnum",
                display: "block",
                originY: 0
            }
        ]
    };

    /**
     * 组件加载前
     */
    componentWillMount() {
        this.getDetailBag();
        this.getOwnerInfo();
    };

    constructor(props) {
        super(props);
        this.haveCheckPhone();

    }

    /**
     * 获取相应的背景跟参数
     */
    getDetailBag() {
        var type = Common.getParameterByName("type");
        var couponid = Common.getParameterByName("couponid");
        var promotionid = Common.getParameterByName("_promotionid");
        var isEnd = Common.getParameterByName("isEnd");
        this.state.type = type;
        this.state.isEnd = isEnd;
        this.setState({
            couponid: couponid,
            promotionid: promotionid
        });
        if (type == 1) {
            return this.setState({imgSrc: goodsdetail1})
        }
        if (type == 2) {
            return this.setState({imgSrc: goodsdetail2})
        }
        if (type == 3) {
            return this.setState({imgSrc: goodsdetail3})
        }
        if (type == 4) {
            return this.setState({imgSrc: goodsdetail4})
        }
        if (type == 5) {
            return this.setState({imgSrc: goodsdetail5})
        }
        if (type == 6) {
            return this.setState({imgSrc: goodsdetail6})
        }
    }

    /**
     * 获取用户信息
     */
    getOwnerInfo() {
        this.props.getOwnerInfo().then(res=> {
            if (res.body.status) {
                var state = this.state;
                if(res.body.data.carnum){
                    state.carNum = res.body.data.carnum;
                }
                if(res.body.data.phone){
                    state.phone = res.body.data.phone;
                }
                this.setState({state})
            }
        })
    }

    /**
     * 手机是否验证
     */
    haveCheckPhone() {
        this.props.haveCheckPhone().then(res=> {
            if (res.body.status) {
                this.state.haveCheck = true;
            }
        })
    }

    /**
     * 获取输入的手机号码
     * @param e
     */
    handlePhoneChange(e) {
        var phone = e.target.value.replaceAll('-', '');
        this.setState({phone: phone});
    };

    /**
     * 获取输入的车牌号码
     * @param inputValue
     */
    press(inputValue) {
        var carNum = inputValue.replace('·', '');
        this.setState({carNum: carNum})
    }

    /**
     * 聚焦相应的输入框
     * @param refName
     */
    focusOn(refName) {
        switch (refName) {
            case "phone":
                this.refs["bg"].style.top = document.getElementById("phone").clientHeight + 30 + "px";
                break;
            case "carnum":
                this.refs["bg"].style.top = document.getElementById("carnum").clientHeight + 30 + "px";
                break;

        }
        var scrollHeight = window.document.body.scrollTop;
        this.setState({inputBgStyle: true});
        this.setState({DetailBagStyle: false});
        for (var i = 0; i < this.state.mainSections.length; ++i) {
            var elem = this.state.mainSections[i];
            if (elem.name != refName) {
                //elem.display = this.refs[elem.name].style.display;
                this.refs[elem.name].style.display = "none";
                //console.log(this.refs[elem.name].style.display);
            } else if (elem.name == refName) {
                if (refName == "phone" && scrollHeight < 100) {
                    scrollHeight = 200;
                }
                elem.originY = scrollHeight
            }
        }
    };

    /**
     * 移除聚焦
     * @param refName
     */
    lostFocusOn(refName) {
        var foundElem = null;
        for (var i = 0; i < this.state.mainSections.length; ++i) {
            var elem = this.state.mainSections[i];
            if (elem.name != refName) {
                this.refs[elem.name].style.display = elem.display;
            } else if (elem.name == refName) {
                foundElem = elem;
            }
        }
        this.setState({inputBgStyle: false});
        this.setState({DetailBagStyle: true});
        setTimeout(function () {
            window.scrollTo(0, foundElem.originY);
        }, 200)
    };

    eventCheck(e) {
        if (e) { //blur,focus事件触发的
            if (e.type == 'focus') {
                setTimeout(function () {
                    //由于键盘弹出是有动画效果的，要获取完全弹出的窗口高度，使用了计时器

                    this.state.windowInnerHeight = window.innerHeight; //获取弹出android软键盘后的窗口高度

                    this.state.timer = setInterval(function () {
                        this.eventCheck(null);
                    }.bind(this), 100);
                }.bind(this), 500);
            } else {
                clearInterval(this.state.timer);
            }

        } else {
            //计时器执行的，需要判断窗口可视高度，如果改变说明android键盘隐藏了
            if (window.innerHeight > this.state.windowInnerHeight) {
                clearInterval(this.state.timer);
                this.state.windowInnerHeight = window.innerHeight;
                this.setState({inputBgStyle: false});
            } else {
                this.state.windowInnerHeight = window.innerHeight;
            }
        }
    };

    setBlurFocus(num) {
        var input = window.document.getElementsByTagName("input");
        input[num].blur();
        this.setState({inputBgStyle: false});
    }

    inputTap(e) {
        e.preventDefault();
        this.focusOn("carnum");
        this.refs.inputCarnum.input.focus();
        this.setState({
            keyboardOpen: true
        });
    }

    inputBlur(e) {
        this.setState({
            keyboardOpen: false
        });

        this.lostFocusOn("carnum");
        e.preventDefault();
    }

    /**
     * 车牌输入完成后自动关闭键盘
     * @param e
     */
    done(e) {
        e.preventDefault();
        e.stopPropagation();
        this.setState({
            keyboardOpen: false
        });
        this.lostFocusOn("carnum");
    }

    /**
     * 点击背景关闭键盘
     * @param e
     */
    handleBgTouch(e) {
        e.stopPropagation();
        e.preventDefault();
        this.setState({DetailBagStyle: true});
        this.setBlurFocus(1);
        this.lostFocusOn("phone")
    }

    /**
     * 跳转至规则界面
     * @param e
     */
    goToRule(e) {
        e.stopPropagation();
        e.preventDefault();
        this.context.router.push("/brandCarsCareRule?type=" + this.state.type)
    }

    payClick() {
        var promotionid = this.state.promotionid;
        var id = this.state.couponid;
        var refType = 1;
        var carNum = this.state.carNum;
        var phone = this.state.phone;
        if (this.state.isEnd == -1) {
            this.showMsg("活动尚未开始");
            return
        }
        if (this.state.isEnd == -2) {
            this.showMsg("活动已结束");
            return
        }
        if (this.checkInputInfo()) {
            this.props.addPromotionBuyLog(promotionid, id, refType, carNum, phone).then(res=> {
                if (res.body.status) {
                    this.setState({showLoading: true});
                    var payid = this.state.payid = res.body.data;
                    this.addLog(payid);
                } else {
                    this.showMsg(res.body.msg);
                }
            })
        }
    }


    /***
     * 车牌手机号码校验
     * @returns {boolean}
     */
    checkInputInfo() {
        var $carnumReg = /^[\u4e00-\u9fa5]{1}[A-Z]{1}([A-Z_0-9]{5})|[\u4e00-\u9fa5]{1}[A-Z]([A-Z_0-9]{4}[\u6e2f|\u6fb3]{1})$/;
        var $phoneNumReg = /^(13[0-9]|14[0-9]|15[0-9]|18[0-9])|17[0-9]\d{8}$/;
        var carNum = this.state.carNum;
        var phone = this.state.phone;
        if (carNum.length < 7 || phone.length < 11) {
            this.showMsg("请输入完整的车牌和手机号码！");
            return false;
        }
        if (!$carnumReg.test(carNum)) {
            this.showMsg("请输入正确的车牌！");
            return false;
        }
        if (!$phoneNumReg.test(phone)) {
            this.showMsg("请输入正确的手机号码！");
            return false;
        }
        return true;
    }


    addLog(payId) {
        this.props.addLog(payId).then(res=> {
            if (res.body.status) {
                var openid = Cookies.get("openid");
                var paytype = "wx";
                this.getPayInfo(openid, payId, paytype);
            } else {
                this.showMsg(res.body.msg);
            }
        })
    }

    /**
     * 获取支付信息
     */
    getPayInfo(r_openid, showpayid, paytype) {
        this.props.getPayInfo(r_openid, showpayid, paytype).then(res=> {
            if (res.body.state == 3 || res.body.state == 4) {
                this.setState({showLoading: false});
                return;
            }
            if (res.body.state == 1) {
                var prepay_id = res.body.prepay_id;
                console.log(prepay_id);
                WeiXin.pay(prepay_id).then(()=> {
                    this.setState({showLoading: false});
                    this.context.router.push("/myCoupon");
                },()=> {
                    this.setState({showLoading: false});
                });
            } else if (res.body.state == 2) {
                this.setState({showLoading: false});
                this.context.router.push("/myCoupon");
            } else if (res.body.errmsg) {
                this.setState({showLoading: false});
                this.showMsg(res.body.errmsg);
            } else {
                this.setState({showLoading: false});
                this.showMsg("支付失败");
            }
        })
    }

    /**
     * 完成支付
     */
    finishPay() {
        var self = this;
        this.props.finishPay(this.state.payid).then(res=> {
            console.log(res);
            if (res.body.status == true) {
                this.showMsg("购买成功");
                setTimeout(function () {
                    self.context.router.push("/myCoupon");
                }, 2000)
            } else {
                this.showMsg("支付失败");
            }
        })
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
        const _inputBag = {
            background: "url(" + inputBag + ") no-repeat",
            backgroundSize: '100% 100%'
        };
        const keyboardText = {
            level1: '粤京津泸鲁冀云辽黑湘皖新苏浙赣鄂桂甘晋蒙陕吉闽贵青藏川宁琼豫渝台港澳',
            level2: '1234567890港QWERTYUP澳ASDFGHJKLZXCVBNM'
        };

        return (
            <BaseComponent>
                <div className={Styles.GoodsDetail}>
                    <Loader show={this.state.showLoading}/>
                    <div className={this.state.DetailBagStyle?Styles.DetailBag:Styles.hideDetailBag}>
                        <img src={this.state.imgSrc} className={Styles.detailBag}/>
                    </div>
                    <div className={Styles.inputContainer} style={_inputBag}>
                        <div ref="carnum" className={Styles.field}>
                            <label className={Styles.inputTip}>输入车牌号</label>
                            <div className={Styles.value}>
                                <TextField ref="inputCarnum" id="carnum" fullWidth={true}
                                           onTouchTap={(e)=>{this.inputTap(e);}}
                                           value={this.state.carNum.indexOf("无牌")>-1?"无牌":Common.formatCarnum(this.state.carNum)}
                                           maxLength={8}
                                           style={{height:'2.5rem'}}
                                           underlineShow={false}
                                           readOnly/>

                                <CarnoKeyBoard
                                    keyboardOpen={this.state.keyboardOpen}
                                    press={::this.press}
                                    inputBlur={::this.inputBlur}
                                    level1={keyboardText.level1}
                                    level2={keyboardText.level2}
                                    done={::this.done}
                                    carnum={this.state.carNum.indexOf("无牌")>-1?"无牌":this.state.carNum}
                                />
                            </div>
                        </div>
                        <div ref="phone" className={Styles.field} onFocus={()=>this.focusOn("phone")}
                             onBlur={()=>this.lostFocusOn("phone")}
                        >
                            <label className={Styles.inputTip}>输入手机号</label>
                            <div className={Styles.value}>
                                <TextField ref="inputPhone" id="phone" type="tel" fullWidth={true}
                                           onFocus={(e)=>{ this.eventCheck(e)}}
                                           onBlur={()=>this.lostFocusOn("phone")}
                                           value={ Common.formatPhone(this.state.phone)}
                                           onChange={(e)=>{this.handlePhoneChange(e)}}
                                           style={{height:'2.5rem'}}
                                           maxLength={13}
                                           underlineShow={false}
                                           disabled={this.state.haveCheck}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={this.state.DetailBagStyle?Styles.payBtnContainer:Styles.hideDetailBag}>
                        <div className={Styles.payBtn} onTouchTap={::this.payClick}>点击支付一元</div>
                        <div className={Styles.rules} onTouchTap={::this.goToRule}>活动规则</div>
                    </div>
                    <div ref="bg" className={this.state.inputBgStyle?Styles.showInput:Styles.hideInput }
                         onTouchTap={::this.handleBgTouch}></div>
                    <Snackbarx
                        open={this.state.msg.show}
                        message={this.state.msg.msg}
                        autoHideDuration={3000}
                        onRequestClose={()=>this.handleMsgClose()}
                    />
                </div>
            </BaseComponent>
        )
    }
}

export default GoodsDetail;
