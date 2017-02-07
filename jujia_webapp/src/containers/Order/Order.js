import React, { Component, PropTypes } from "react";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";
import Checkbox from 'material-ui/Checkbox';
import FontIcon from "material-ui/FontIcon";
import OrderItem from "../../components/OrderItem/OrderItem";
import Styles from "./Order.scss";
import Stepper from "../../components/Stepper/Stepper";
import {red500, yellow500, blue500} from 'material-ui/styles/colors';
// import SvgIconNav from "material-ui/svg-icons";
import ParkSpot from "./ParkSpot";
import ParkSpot2 from "./ParkSpot2";
import CarnoKeyBoard from '../../components/CarnoKeyBoard/CarnoKeyBoard'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as OrderActions from '../../redux/modules/Order/action';
import Cookies from "js-cookie";
import Loader from "../../components/Loader/Loader";
import Common from "../../utils/Common";
import Paytype from "../../components/PayType/PayType";
import Guarantee from "./Guarantee";
import Pay  from "./Pay";
import Snackbarx from "../../components/Snackbarx/Snackbarx";
import BaseComponent from "../../components/BaseComponent/BaseComponent";
import getUserAgent from '../../utils/GetUserAgent';


const keyboardText = {
    level1: '粤京津泸鲁冀云辽黑湘皖新苏浙赣鄂桂甘晋蒙陕吉闽贵青藏川宁琼豫渝台港澳',
    level2: '1234567890港QWERTYUP澳ASDFGHJKLZXCVBNM'
}
@connect(
    state => ({}),
    OrderActions
)


class Order extends Component {
    state = {
        tips:{tipsId:null,show:false,title:"",content:""},
        msg: {show: false, msg: ""},
        remarkRows: 1,
        hasKey: false,
        storeKey: false,
        showLoading: true,
        mainSections: [/*{
         name: "stepper",
         display: "block",
         originY: 0
         },*/ {
            name: "mainPro",
            display: "block",
            originY: 0
        }, {
            name: "otherPro",
            display: "block",
            originY: 0
        }, {
            name: "phone",
            display: "flex",
            originY: 0
        }, {
            name: "carnum",
            display: "flex",
            originY: 0
        }, {
            name: "parkspot",
            display: "flex",
            originY: 0
        }, {
            name: "remark",
            display: "flex",
            originY: 0
        }, {
            name: "paytype",
            display: "flex",
            originY: 0
        }],
        windowInnerHeight: 0,
        timer: null,
        keyboardOpen: false,
        inputValue: '',
        inputBgStyle: false,
        remarkStyle: false,
        data: {
            mainPro: {},
            childPros: [],
            supplyPros: []
        },
        order: {
            busi_type: "1",
            car_transfer_type: 0,
            priority_level: 20,
            paytype: "2",
            carnum: "",
            phone: "",
            parkspotid: "",
            parkspotname: "",
            remark: "",
            haveRegister: false,
            totalAmount: 0,
            totalMinute: 0,
            totalPreferential: 0,
            estFinishTime: "",
            ocids: [],
            areaid: 0,
            stationid: 0,
        },
        owner: {},
        selectedArea: {}
    };

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    static propTypes = {};

    inputTap(e) {
        e.preventDefault();
        this.focusOn("carnum");
        //this.refs.inputCarnum.input.focus();
        this.state.order.oldCarnum = this.state.order.carnum;
        this.setState({
            keyboardOpen: true
        });
    }

    press(inputValue) {
        var order = this.state.order;
        order.carnum = inputValue.replace('·', '');
        this.setState({order: order})
    }

    inputBlur(e) {
        this.setState({
            keyboardOpen: false
        });

        this.lostFocusOn("carnum");
        e.preventDefault();
    }

    done(e) {
        e.preventDefault();
        e.stopPropagation();
        this.setState({
            keyboardOpen: false
        })
        this.lostFocusOn("carnum");
        if (this.state.order.carnum != this.state.order.oldCarnum) {
            this.getCarnumParkspot(this.state.order.carnum);
        }

    }

    constructor(props) {
        super(props);
        this.getPromptInfo("wash_open_v4");
        let browser = getUserAgent();

        /* 在 iis 服务器做了 url rewrite 解决支付授权问题
         if (browser.isiOS && this.props.location.query.hasreload !="true" ) {
         window.location.href = window.location.href +"&hasreload=true";
         }*/


        if (this.props.location.query.orderid) {
            this.getOrderInfo(this.props.location.query.orderid).then((proidArr)=> {
                var mainProid = proidArr[0];
                this.getMainProInfo(mainProid).then(()=> {
                    if (proidArr.length > 1) {
                        var data = this.state.data;

                        data.supplyPros.map((pro)=> {
                            if (proidArr.findIndex(x=>x == pro.proid) > -1) {
                                pro.isSelected = true;
                                if (pro.putkeys && !this.state.hasKey) {
                                    this.setState({hasKey: true});
                                }
                                if (pro.is_storekey && !this.state.storeKey) {
                                    this.setState({storeKey: true});
                                }
                            }
                        });
                        this.setState({data});
                    }
                    this.parkspotChange(this.state.order.parkspotid, "", this.state.originSelectedArea);
                });
                this.getOwnerInfo(this.props.location.query.carnum || "");
            });
        } else {
            var mainProid = this.props.location.query.proid;
            var proidArr = [];
            proidArr.push(mainProid);
            // 负离子券跳到内外精洗套餐
            if (this.props.location.query.pronames && this.props.location.query.pronames.indexOf("负离子") > -1) {
                mainProid = 26;
                proidArr.splice(0, 0, mainProid);
            }
            this.getMainProInfo(mainProid).then(()=> {
                if (proidArr.length > 1) {
                    var data = this.state.data;

                    data.supplyPros.map((pro)=> {
                        if (proidArr.findIndex(x=>x == pro.proid) > -1) {
                            pro.isSelected = true;
                            if (pro.putkeys && !this.state.hasKey) {
                                this.setState({hasKey: true});
                            }
                            if (pro.is_storekey && !this.state.storeKey) {
                                this.setState({storeKey: true});
                            }
                        }
                    });
                    this.setState({data});
                }

                this.getOwnerInfo(this.props.location.query.carnum || "").then(()=> {
                    this.parkspotChange(this.state.order.parkspotid, "", this.state.originSelectedArea);
                });
            });
        }
    }

    componentDidMount() {
        var input = document.getElementsByTagName("input");
        var textArea = document.getElementsByTagName("textarea");

        function event(e) {
             if (!(e.target.nodeName == "INPUT") && !(e.target.nodeName=="TEXTAREA")) {
                for (var i = 0; i < input.length; i++) {
                    input[i].blur()
                }
                for (var j = 0; j < textArea.length; j++) {
                    textArea[j].blur()
                }
            }
        }

        document.addEventListener("touchend", (e)=>event(e))

    }

    componentWillUnmount() {
    var input = document.getElementsByTagName("input");
    var textArea = document.getElementsByTagName("textarea");
    for (var i = 0; i < input.length; i++) {
        input[i].blur()
    }
    for (var j = 0; j < textArea.length; j++) {
        textArea[j].blur()
    }
}

    getCarnumParkspot = (carnum)=>new Promise((resolve, reject)=> {
        this.setState({showLoading: true});
        this.props.getCarnumParkspot(carnum).then((res)=> {
            var order = this.state.order;
            if (res.body.status) {
                order.areaid = res.body.data.areaid;
                order.parkspotid = res.body.data.parkspotId;
                order.parkspotname = Common.filterArea(res.body.data.parkingspaceName);
                this.setState({order});
            }
            this.parkspotChange(order.parkspotid, order.parkname, this.state.originSelectedArea);
        });
    });

    getOrderInfo = (orderid)=>new Promise((resolve, reject)=> {
        this.props.getOrderInfo(orderid).then((res)=> {
            if (res.body.status) {
                var order = this.state.order;
                var data = res.body.data;
                order.orderid = data.orderid;
                order.carnum = data.carnum || "";
                order.noneCarnum = data.noneCarnum;
                order.phone = data.ownerPhone;
                order.parkspotid = data.parkspotId;
                order.parkspotname = Common.filterArea(data.areaName);
                order.areaid = data.areaid;
                order.totalPreferential = 0;
                this.setState({order});
                resolve(data.proids.split(','));
            } else {
                this.showMsg(res.body.msg);
                //this.setState({showLoading: false});
            }
        });
    });

    getOwnerInfo = (carnum)=>new Promise((resolve, reject)=> {
        this.props.getOwnerInfo(carnum).then((res)=> {
            var order = this.state.order;
            var owner = this.state.owner;
            owner = res.body.data;
            if (owner.balance) {
                order.paytype = "1";
            }
            if (!this.props.location.query.orderid) {
                order.phone = owner.ownerPhone;
                order.parkspotid = owner.parkid;
                order.parkspotname = Common.filterArea(owner.areaName);
                order.orderid = owner.orderid;
                order.carnum = owner.carnum || "";
                order.noneCarnum = owner.noneCarnum;
                order.areaid = owner.areaid;
            }
            order.noneCarnum = owner.noneCarnum;
            if (res.body.data.is_phone_valid == 1) {
                order.haveRegister = true;
            }
            this.setState({order, owner});
            resolve();
        });
    });

    getMainProInfo = (proid)=>new Promise((resolve, reject)=> {
        this.props.getMainProInfo(proid).then((res)=> {
            var data = this.state.data;
            data.mainPro = res.body.data.mainPro;
            data.mainPro.isSelected = true;
            data.childPros = res.body.data.childPros;
            data.supplyPros = res.body.data.supplyPros;
            this.parseItemCurrentPrice(data.mainPro);

            data.supplyPros.forEach(pro=> {
                this.parseItemCurrentPrice(pro);
            });

            this.setState({
                data: data,
                hasKey: (data.mainPro.putkeys ? true : false),
                storeKey: (data.mainPro.is_storekey ? true : false)
            });
            this.handleItemCheck(true, data.mainPro);
            resolve();
        })
    });

    getEstFinishtime = (ppids, areaid, busi_type)=>new Promise((resolve, reject)=> {
        if (ppids && areaid) {
            this.props.getEstFinishtime(ppids, areaid, busi_type).then((res)=> {
                if (res.body && res.body.status) {
                    var order = this.state.order;
                    order.estFinishTime = res.body.data;
                    this.setState({order});
                    resolve();
                }
            })
        }
    });

    /**
     * 获取配置提示信息
     * @param name
     */
    getPromptInfo(name) {
        this.props.getPromptInfo(name).then(res=> {
            //console.log(res);
            if (res.body.status) {
                var data=res.body.data;
                var tips=this.state.tips;
                tips.show=true;
                tips.content=data.content;
                tips.tipsId=data.id;
                tips.title=data.title;
                this.setState(tips);
            }
        })
    }

    handlePaytypeChange(value) {
        var order = this.state.order;
        order.paytype = value;
        this.setState({order});
        this.setBlurFocus();
    }

    handlePhoneChange(e) {
        var phone = e.target.value.replaceAll('-', '');
        var order = this.state.order;
        order.phone = phone;
        this.setState({order});
    }

    handleRemarkChange(e) {
        var target = e.target;
        var order = this.state.order;
        order.remark = target.value;
        this.setState({order: order});
        if (target.scrollHeight > target.offsetHeight) {
            this.setState({remarkRows: 100})
        } else {
            this.setState({remarkRows: 1})
        }
        setTimeout(()=> {
            this.refs["bg"].style.top = target.clientHeight + "px";
        }, 200);
    }

    handleMsgClose() {
        var msg = this.state.msg;
        msg.show = false;
        this.setState({msg});
    }

    handleItemCheck(isChecked, item) {
        var order = this.state.order;
        if (isChecked) {
            order.totalAmount += item.currentPrice;
            /*if(item.currentPrice > 0 && item.promotionPrice != undefined){
             order.totalPreferential += item.originPrice - item.promotionPrice;
             }*/
            order.totalPreferential += item.totalPreferential || 0;
            order.totalMinute += item.needtime;
            if (item.owner_couponid) {
                order.ocids.push(item.owner_couponid);
            }
        } else {
            order.totalAmount -= item.currentPrice;
            if (order.totalAmount < 0)order.totalAmount = 0;
            /*if(item.currentPrice > 0 && item.promotionPrice != undefined){
             order.totalPreferential -= item.originPrice - item.promotionPrice;
             }*/
            order.totalPreferential -= item.totalPreferential || 0;
            if (item.owner_couponid) {
                order.ocids.remove(item.owner_couponid);
            }
            order.totalMinute -= item.needtime;
        }

        if (order.totalPreferential < 0)
            order.totalPreferential = 0;


        order.paytype = this.getPaytype(order.totalAmount);

        this.parseHasKey(item);
        this.setState({order});

        if (this.state.order.areaid) {
            var ppids = this.getPpids();
            var order = this.state.order;
            this.getEstFinishtime(ppids, order.areaid, order.busi_type);
        }
    }

    parseHasKey() {
        var data = this.state.data;
        if (data.mainPro.is_storekey) {
            this.setState({storeKey: true});
        } else {
            var storeKey = data.childPros.findIndex(x=> x.isSelected && x.is_storekey == 1) > -1
                || data.supplyPros.findIndex(x=>x.isSelected && x.is_storekey == 1) > -1;
            this.setState({storeKey});
        }
        if (data.mainPro.putkeys) {
            this.setState({hasKey: true});
        } else {
            var hasKey = data.childPros.findIndex(x=> x.isSelected && x.putkeys == 1) > -1
                || data.supplyPros.findIndex(x=>x.isSelected && x.putkeys == 1) > -1;
            this.setState({hasKey});
        }
    }

    parseItemCurrentPrice(proItem) {
        // coupontype 0: 现金，1项目，2商品
        if (proItem.coupontype == 1) {
            proItem.currentPrice = 0;
            proItem.totalPreferential = 0;
        } else if (!proItem.coupontype) {
            proItem.totalPreferential = 0;
            // 减优惠券钱
            //proItem.currentPrice -= proItem.coupon_price || 0;
            proItem.currentPrice = Common.decNum(proItem.currentPrice, (proItem.coupon_price || 0));
            if (proItem.currentPrice > 0 && proItem.promotionPrice) {
                proItem.totalPreferential += Common.decNum(proItem.originPrice, proItem.promotionPrice);
                if (proItem.totalPreferential < 0)
                    proItem.totalPreferential = 0;
            }
            if (proItem.currentPrice > 0) {
                //proItem.currentPrice -= proItem.preferential_amount || 0;
                proItem.currentPrice = Common.decNum(proItem.currentPrice, (proItem.preferential_amount || 0));
                proItem.totalPreferential += proItem.preferential_amount || 0;
            }

            if (proItem.currentPrice < 0) {
                proItem.currentPrice = 0;
            }
        }
    }

    getPpids() {
        var ppidArr = [];
        ppidArr.push(this.state.data.mainPro.ppid);
        this.state.data.childPros.forEach(x=> {
            if (x.isSelected && x.ppid) {
                ppidArr.push(x.ppid);
            }
        });
        this.state.data.supplyPros.forEach(x=> {
            if (x.isSelected && x.ppid) {
                ppidArr.push(x.ppid);
            }
        });
        return ppidArr.join();
    }


    reCalTotalAmount() {
        var order = this.state.order;
        var data = this.state.data;
        order.totalAmount = 0;
        order.totalPreferential = 0;
        order.totalMinute = 0;

        order.ocids = [];

        var itemMain = data.mainPro;
        if (itemMain.owner_couponid) {
            order.ocids.push(itemMain.owner_couponid);
        }

        var hasKey = itemMain.putkeys > 0;
        var storeKey = itemMain.is_storekey > 0;

        order.totalAmount += itemMain.currentPrice;
        /*if(itemMain.currentPrice > 0 && itemMain.promotionPrice != undefined){
         order.totalPreferential += itemMain.originPrice - itemMain.promotionPrice;
         }*/
        order.totalPreferential += itemMain.totalPreferential || 0;
        order.totalMinute += itemMain.needtime;

        /*data.childPros.map(item=>{
         if(item.isSelected){
         order.totalAmount += item.currentPrice;
         if(item.currentPrice > 0 && item.promotionPrice != undefined){
         order.totalPreferential += item.originPrice - item.promotionPrice;
         }
         if(item.owner_couponid){
         order.ocids.push(item.owner_couponid);
         }
         order.totalMinute += item.needtime;
         }
         })*/
        data.supplyPros.map(item=> {
            if (item.isSelected) {
                if (item.owner_couponid) {
                    order.ocids.push(item.owner_couponid);
                }
                order.totalAmount += item.currentPrice;
                /*if(item.currentPrice > 0 && item.promotionPrice != undefined){
                 order.totalPreferential += item.originPrice - item.promotionPrice ;
                 }*/

                order.totalPreferential += item.totalPreferential || 0;
                order.totalMinute += item.needtime;
                if (item.putkeys) {
                    hasKey = true;
                }
                if (item.is_storekey) {
                    storeKey = true;
                }
            }
        })
        if (order.totalPreferential < 0) {
            order.totalPreferential = 0;
        }
        order.paytype = this.getPaytype(order.totalAmount);

        this.setState({order, hasKey, storeKey});
    }

    getPaytype(totalAmount) {
        var paytype = "";
        if (totalAmount) {
            if (!this.state.order.paytype) {
                paytype = this.state.owner.balance ? "1" : "2";
            } else {
                paytype = this.state.order.paytype;
            }
            if (totalAmount > this.state.owner.balance && paytype == "1") {
                paytype = "12";
            } else if (totalAmount <= this.state.owner.balance && paytype == "12") {
                paytype = "1";
            }
        }
        return paytype;
    }

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
                this.setBlurFocus();
                // this.refs.pay.focus();
            } else {
                this.state.windowInnerHeight = window.innerHeight;
            }
        }
    };

    // $('#uw_phone, #uw_remark').click(eventCheck); //.blur(eventCheck);
    focusOn(refName) {
        if (this.state.inputBgStyle) {
            return;
        }
        switch (refName) {
            case "remark":
                this.refs["bg"].style.top = document.getElementById("remark").clientHeight + "px";
                break;
            case "phone":
                this.refs["bg"].style.top = document.getElementById("phone").clientHeight + "px";
                break;
            case "carnum":
                this.refs["bg"].style.top = document.getElementById("carnum").clientHeight + "px";
                break;

        }
        var input = this.refs[refName];
        var scrollHeight = window.document.body.scrollTop;
        this.setState({inputBgStyle: true});
        if (refName == "remark") {
            this.setState({remarkStyle: true});
        }
        for (var i = 0; i < this.state.mainSections.length; ++i) {
            var elem = this.state.mainSections[i];
            if (elem.name != refName) {
                elem.display = this.refs[elem.name].style.display;
                this.refs[elem.name].style.display = "none";
            } else if (elem.name == refName) {
                /*if (refName == "phone" && scrollHeight < 100) {
                 scrollHeight = 200;
                 }*/
                elem.originY = scrollHeight
                // break;
            }
            // body...
        }
    };

    lostFocusOn(refName) {
        var foundElem = null;
        for (var i = 0; i < this.state.mainSections.length; ++i) {
            var elem = this.state.mainSections[i];
            if (elem.name != refName) {
                this.refs[elem.name].style.display = elem.display;
            } else if (elem.name == refName) {
                foundElem = elem;
                //break;
            }
        }
        var input = this.refs[refName];
        this.setState({inputBgStyle: false});
        if (foundElem) {
            window.scrollTo(0, foundElem.originY);
        }
    };

    handleBgTouch(e) {
        e.stopPropagation();
        e.preventDefault();
        e.target.focus();
        //this.setBlurFocus();

    }

    showMsg(text) {
        var msg = this.state.msg;
        msg.show = true;
        msg.msg = text;
        this.setState({msg});
    }

    setBlurFocus() {
        var buttons = window.document.getElementsByTagName("button");
        buttons[buttons.length - 1].focus();
    }

    parkspot(isShow) {
        if (isShow) {
            //this.focusOn("parkspot");
        } else {
            //this.lostFocusOn("parkspot");
        }
    }

    // 停车点改变后更新 ppid
    parkspotChange(parkid, parkname, area) {
        this.state.order.parkspotid = parkid || 0;
        this.state.order.parkname = parkname;
        this.state.selectedArea = area;
        var areaid = this.state.selectedArea ? this.state.selectedArea.areaid : this.state.order.areaid;
        //this.state.order.areaid = areaid || 0;
        this.state.order.areaid = areaid || 0;

        // 未选择停车位，不更新 ppid
        if (!this.state.order.parkspotid && !this.state.order.areaid) {
            this.setState({
                showLoading: false
            })
            return;
        }
        var mainProid = this.state.data.mainPro.proid;
        this.props.getProPpid(mainProid, this.state.order.parkspotid, this.state.order.areaid, this.state.order.carnum).then((res)=> {
            this.setState({
                showLoading: false
            })
            var proPpids = res.body.data;
            var data = this.state.data;

            var mainProPpid = proPpids.find(x=>x.proid == data.mainPro.proid);
            if (mainProPpid) {
                data.mainPro.ppid = mainProPpid.ppid;
                data.mainPro.isShow = true;
                data.mainPro.owner_couponid = mainProPpid.owner_couponid;
                data.mainPro.coupontype = mainProPpid.coupontype;
                data.mainPro.coupon_price = mainProPpid.coupon_price;
                data.mainPro.currentPrice = mainProPpid.proprice;
                //data.mainPro.is_storekey = mainProPpid.putkeys;
                data.mainPro.putkeys = mainProPpid.putkeys;
                this.parseItemCurrentPrice(data.mainPro);
            } else {
                data.mainPro.isShow = false;
                data.mainPro.owner_couponid = 0;
                data.mainPro.coupontype = 0;
                data.mainPro.coupon_price = 0;
            }
            data.childPros.forEach(child=> {
                var foundProPpid = proPpids.find(x=>x.proid == child.proid);
                if (foundProPpid) {
                    child.ppid = foundProPpid.ppid;
                    child.isShow = true;
                    //child.owner_couponid = foundProPpid.owner_couponid;
                    //child.coupontype = foundProPpid.coupontype;
                    //child.coupon_price = foundProPpid.coupon_price;
                    child.currentPrice = foundProPpid.proprice;
                    //child.is_storekey = foundProPpid.putkeys;
                    child.putkeys = foundProPpid.putkeys;
                    this.parseItemCurrentPrice(child);
                } else {
                    child.ppid = 0;
                    child.isShow = false;
                    child.isSelected = false;
                    child.owner_couponid = 0;
                    child.coupontype = 0;
                    child.coupon_price = 0;
                }

            });
            data.supplyPros.forEach(supply=> {
                var foundProPpid = proPpids.find(x=>x.proid == supply.proid);
                if (foundProPpid) {
                    supply.ppid = foundProPpid.ppid;
                    supply.isShow = true;
                    supply.owner_couponid = foundProPpid.owner_couponid;
                    supply.coupontype = foundProPpid.coupontype;
                    supply.coupon_price = foundProPpid.coupon_price;
                    supply.currentPrice = foundProPpid.proprice;
                    //supply.is_storekey = foundProPpid.putkeys;
                    supply.putkeys = foundProPpid.putkeys;
                    this.parseItemCurrentPrice(supply);
                } else {
                    supply.ppid = 0;
                    supply.isShow = false;
                    supply.isSelected = false;
                    supply.owner_couponid = 0;
                    supply.coupontype = 0;
                    supply.coupon_price = 0;
                }
            });
            this.setState({data});
            this.reCalTotalAmount();


            if (this.state.order.areaid) {
                var ppids = this.getPpids();
                var order = this.state.order;
                this.getEstFinishtime(ppids, order.areaid, order.busi_type);
            }
        });

    }

    getAbsPoint(e) {
        var x = e.offsetLeft;
        var y = e.offsetTop;
        while (e = e.offsetParent) {
            x += e.offsetLeft;
            y += e.offsetTop;
        }
        return {'x': x, 'y': y};
    };

    gotoUrl(e,url) {
        e.stopPropagation();
        e.preventDefault();
        this.context.router.push(url);
    }

    /**
     * 注册触摸知道了 事件
     * @param e
     */
    tipsTouch(e) {
        e.stopPropagation();
        e.preventDefault();
        this.setState(()=>{
            this.state.tips.show=false;
        });
        this.props.editPromptLog(this.state.tips.tipsId);//添加日志
    }

    render() {
        var tipContent=[];
        var tipContainer=[];
        var tipArray = this.state.tips.content.split("、");
        const iconStyles = {
            marginRight: 24
        };
        const btnStyle = {
            background: "#FFFFFF"
        };
        var supplyItems = [];
        var hasChooseService = [];
        var isShow = false;
        var me = this;
        this.state.data.supplyPros.map(function (item) {
            if (item.isShow) {
                supplyItems.push(<OrderItem key={item.proid} item={item}
                                            onCheck={(isChecked)=>me.handleItemCheck(isChecked, item)}/>);
            }
        });
        this.state.data.childPros.map(function (item) {
            isShow += item.isShow;
        });
        if (isShow) {
            hasChooseService = <div className={Styles.childPro}>
                <div className={Styles.arrowTop}></div>
                {this.state.data.childPros.map(function (item) {
                    return item.isShow ? <OrderItem key={item.proid} item={item} unable={true} hideCheckBox={true}
                    /> : "";
                })}
            </div>
        }
        var urgent = "";
        var showUrgent = false;
        if (showUrgent) {
            urgent = <div ref="urgent" className={Styles.urgent}>
                <div className={Styles.primary}>
                    <div className={Styles.left}>
                        <Checkbox label={"明早6点前不用车"}/>
                    </div>
                    <div className={Styles.right}>
                        <span>减免2元</span>
                    </div>
                </div>
                <p className={Styles.secondary}>
                    建议不赶时间的用户勾选此项，我们确保在明早6点前完工交付。
                </p>

            </div>
        }

        tipContainer.push(
            tipArray.map((tipItem)=> {
                return (
                    <li>{tipItem}</li>
                )
            })
        );

        const actions = [
            <FlatButton
                label="知道了"
                onTouchTap={(e)=>{this.tipsTouch(e)}}
                labelStyle={{
                    color:"#cc3333"
                }
                }
            />

        ];
        if (this.state.tips.show) {
            tipContent.push(
                <Dialog
                    title={this.state.tips.title}
                    actions={actions}
                    modal={false}
                    open={this.state.tips.show}>
                    <ol>
                        {tipContainer}
                    </ol>
                </Dialog>)
        }

        return (
            <BaseComponent>
                <div className={Styles.order} ref="main">
                    <Loader show={this.state.showLoading}/>
                    <div className={Styles.info}>
                        <div ref="phone" className={Styles.field} onFocus={()=>this.focusOn("phone")}
                             onBlur={()=>this.lostFocusOn("phone")}>
                            <label>手<span className="spacing2"></span>机</label>
                            <div className={Styles.value}>
                                <TextField ref="inputPhone" id="phone" type="tel" fullWidth={true}
                                           onFocus={(e)=>{ this.eventCheck(e)}}
                                           value={ Common.formatPhone(this.state.order.phone)}
                                           onChange={(e)=>{this.handlePhoneChange(e)}}
                                           maxLength={13}
                                           inputStyle={{fontSize:"14px",color:"#000"}}
                                           disabled={this.state.order.haveRegister}
                                           underlineDisabledStyle={{
                                           borderStyle:"none none solid",
                                           borderWidth:"1px",
                                            borderBottomColor: "#e0e0e0"
                                           }}
                                />
                            </div>
                            <div className={Styles.modifyPhoneContent}>
                                <div className={Styles.modifyPhone}
                                     style={this.state.order.haveRegister?{display:"block"}:{display:"none"}}
                                     onTouchTap={(e)=>{this.gotoUrl(e,"/modifyPhone")}}
                                >[修改]
                                </div>
                            </div>
                        </div>


                        <div ref="carnum" className={Styles.field}>
                            <label>车<span className="spacing2"></span>牌</label>
                            <div className={Styles.value}>
                                <TextField ref="inputCarnum" id="carnum" fullWidth={true} className={Styles.carnum}
                                           onTouchTap={(e)=>{this.inputTap(e);}}
                                           value={this.state.order.carnum.indexOf("无牌")>-1?"无牌":Common.formatCarnum(this.state.order.carnum)}
                                           inputStyle={{fontSize:"14px",color:"#000"}}
                                           maxLength={8}
                                           disabled={true}
                                           underlineDisabledStyle={{
                                           borderStyle:"none none solid",
                                           borderWidth:"1px",
                                           borderColor: "#e0e0e0"
                                           }}
                                />

                                <CarnoKeyBoard
                                    keyboardOpen={this.state.keyboardOpen}
                                    press={::this.press}
                                    inputBlur={::this.inputBlur}
                                    level1={keyboardText.level1}
                                    level2={keyboardText.level2}
                                    done={::this.done}
                                    carnum={this.state.order.carnum.indexOf("无牌")>-1?"无牌":this.state.order.carnum}
                                />

                            </div>
                        </div>

                        <div ref="parkspot" className={Styles.field}>
                            <label>停<span className="spacing05"></span>车<span className="spacing05"></span>点</label>
                            <div className={Styles.value+" "+Styles.parkSpot}>
                                <ParkSpot2
                                    onParkSpotChange={(parkid,parkname,area)=>this.parkspotChange(parkid,parkname,area)}
                                    onTouchTap={(isShow,e)=>this.parkspot(isShow,e)}
                                    id="parkspot"
                                    parkSpotName={this.state.order.parkspotname}
                                    order={this.state.order}
                                    showMsg={::this.showMsg}
                                />
                            </div>
                        </div>

                        <div ref="remark" className={this.state.remarkStyle?Styles.field:Styles._field}
                             onFocus={::this.focusOn.bind(this,"remark")}
                             onBlur={::this.lostFocusOn.bind(this,"remark")}>
                            <label>留<span className="spacing2"></span>言</label>
                            <div className={Styles.value}>
                                <TextField onFocus={::this.eventCheck} ref="inputRemark" id="remark" fullWidth={true}
                                           multiLine={true}
                                           rows={this.state.remarkRows}
                                           inputStyle={{fontSize:"14px"}}
                                           textareaStyle={{minHeight:"21px"}}
                                           inputStyle={{fontSize:"14px"}}
                                           value={this.state.order.remark}
                                           onChange={(e)=>{this.handleRemarkChange(e)}}
                                />
                            </div>
                        </div>

                        <div ref="paytype" className={Styles.field}>
                            <label>支付方式</label>
                            <div className={Styles.value}>
                                <Paytype id="paytype"
                                         value={this.state.order.paytype}
                                         hasCoupon={this.state.order.ocids.length > 0?true: false}
                                         onChange={::this.handlePaytypeChange}
                                >
                                </Paytype>
                            </div>
                        </div>
                    </div>
                    <div className={Styles.spread} onTouchTap={(e)=>{this.gotoUrl(e,"/buyPackage")}}>
                        <i className={"icon iconfont "+Styles.fire}>&#xe625;</i><span className={Styles.content}>59元洗车消毒卡，送3次内外洗</span> <span className={Styles.buy}>购买套餐<i className={"icon iconfont " +Styles.arrow}>&#xe628;</i></span>
                    </div>
                    <div ref="mainPro" className={Styles.mainPro}>
                        <p className={Styles.chooseItemTitle}>已选服务</p>
                        <OrderItem item={this.state.data.mainPro} unable={true}/>
                        {hasChooseService}
                    </div>
                    <div ref="otherPro" className={Styles.otherPro}>
                        <p className={Styles.itemTitle}>添加其他服务</p>
                        {supplyItems}
                    </div>
                    {urgent}
                    <div
                        className={this.state.storeKey&&this.state.hasKey?Styles.showKeepKeyTips:Styles.hideKeepKeyTips}>
                        <i className={"icon iconfont "+Styles.remindIcon}>&#xe61d;</i>
                        <span className={Styles.tipsNormal}>你所选项目需要车内施工，稍后请</span><span
                        className={Styles.tipsImprotant}>存钥匙</span>
                    </div>
                    <div
                        className={this.state.storeKey&&!this.state.hasKey?Styles.showKeepKeyTips:Styles.hideKeepKeyTips}>
                        <i className={"icon iconfont "+Styles.remindIcon}>&#xe61d;</i>
                        <span className={Styles.tipsNormal}>服务项目需要车内施工，稍后技师将致电</span><span
                        className={Styles.tipsImprotant}>取钥匙</span>
                    </div>

                    <Pay order={this.state.order}
                         selectedArea={this.state.selectedArea}
                         createOrder={::this.props.createOrder}
                         data={this.state.data}
                         pay={::this.props.pay}
                         hasKey={this.state.hasKey}
                    />

                    <div ref="bg" className={this.state.inputBgStyle?Styles.showInput:Styles.hideInput}
                         onTouchTap={::this.handleBgTouch}>
                    </div>
                    {tipContent}
                    <Snackbarx
                        open={this.state.msg.show}
                        message={this.state.msg.msg}
                        onRequestClose={()=>this.handleMsgClose()}
                    />

                </div>
            </BaseComponent>

        )
    }
}

export default Order;
