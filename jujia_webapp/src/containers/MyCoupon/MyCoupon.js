import React, { Component, PropTypes } from 'react';
import CounponItem from './CouponItem';
import styles from './MyCoupon.scss';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as MyCouponActions from "../../redux/modules/MyCoupon/action";
import Common from "../../utils/Common";
import Loader from "../../components/Loader/Loader";
import BaseComponent from "../../components/BaseComponent/BaseComponent";

@connect(
    state=>({
        getCouponListState: state.getCouponList
    }),
    MyCouponActions
)
class MyCoupon extends Component {
    static propTypes = {};
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };
    state = {
        couponList: [],
        items: []
    };

    constructor(props) {
        super(props);
    }

    /**
     * 组件加载时自动执行
     */
    componentWillMount() {
        console.log("MyCoupon组件加载时执行!!!");
        this.initCouponList();
    }

    changeTodoState(index, isSelect) {
        this.setState({
            items: this.state.items.map((item, i)=> {
                if (index == i) {
                    item.isSelect = isSelect;

                } else {
                    item.isSelect = false;
                }
                return item;
            })
        });
    }

    /**
     * [gotoUrl 跳转地址]
     * @param  {[type]} url [请求地址]
     * @return {[type]}     [description]
     */
    gotoUrl(e, url) {
        e.preventDefault();
        e.stopPropagation();
        this.context.router.push(url);
    }

    goToUse(e) {
        e.preventDefault();
        e.stopPropagation();
        var proIds = [];
        var proNames = [];
        var _proNames = [];
        var couponName = [];
        var carnum = "";
        var busitype = null;
        this.state.items.forEach(function (item) {
            if (item.isSelect && item.type != 4) {
                proIds.push(item.proid);
                proNames.push(item.proname);
                carnum = item.carnum;
                busitype = item.busitype;
            }
            if (item.isSelect && item.type == 4) {
                proNames.push(item.proname);
                couponName.push(item.title);
                carnum = item.carnum;
            }
        });
        if (proIds.length > 0 && proNames.length > 0) {
            if (busitype == 1) {
                this.context.router.push("/order?proid=" + proIds.join(",") + "&refpage=coupon&pronames=" + proNames.join(",") + "&carnum=" + (carnum || "") + " ");
            }
            if(busitype==2){
                this.context.router.push("/orderStation?proid=" + proIds.join(",") + "&refpage=coupon&pronames=" + proNames.join(",") + "&carnum=" + (carnum || "") + " ");
            }
        } else {

            if (couponName.join(",").indexOf("美孚银装") > -1 && couponName.join(",").indexOf("赠送") > 0) {
                this.context.router.push("/novicePackageRule");
                return;
            }
            if (proNames.join(",").indexOf("雨刮") > 0 || proNames.join(",").indexOf("空调格") > 0 || proNames.join(",").indexOf("机油格") > 0 || proNames.join(",").indexOf("美孚银装") > 0) {
                this.context.router.push("/oneYuanRule");
                return;
            }
            if (proNames.join(",").indexOf("漆面修复") >= 0) {
                this.context.router.push("/fiftyYuanRule");
                return;
            }
            if (proNames.join(",").indexOf("100元保养工时") > -1) {
                this.context.router.push("/vipPackageRule");
                return;
            }
            if (proNames.join(",").indexOf("负离子消毒") > -1) {
                this.context.router.push("/anionCouponRule");
                return;
            }
            if (couponName.join(",").indexOf("1元抵68元") > -1) {
                this.context.router.push("/brandCarsCareRules?pronames=" + proNames.join(","));
                return;
            }
            if (proNames.join(",").indexOf("喷漆") > -1 || proNames.join(",").indexOf("维修、机油保养工时费") > -1 || proNames.join(",").indexOf("四轮调位") > -1 || proNames.join(",").indexOf("车险") > -1 || proNames.join(",").indexOf("精致内外洗") > -1) {
                this.context.router.push("/addNewUserRule?pronames=" + proNames.join(",") + "&title=" + couponName.join(","));
                return;
            }
            if (proNames.join(",").indexOf("精致水晶") > -1) {
                this.context.router.push("/addNewUserRule?pronames=" + proNames.join(",") + "&title=" + couponName.join(","));
                return;
            }
            this.context.router.push("/selectService");
        }
    }

    /**
     * 初始化我的优惠券列表
     */
    initCouponList() {
        this.setState({showLoading: true});
        this.props.getCouponList().then(res=> {
            if (res.body.status) {
                this.handlerCouponData(res.body.data);
            } else {
                this.setState({showLoading: false});
                this.showNoCoupon();
            }
        })
    }

    /**
     * [handlerCouponData 优惠券数据处理]
     * @param  {[type]} data [优惠券集合]
     * @return {[type]}      [description]
     */
    handlerCouponData(data) {
        var tempList = [];
        console.log(data);
        data.forEach(function (item) {
            var temp = {};
            temp.couponid = item.owner_couponid;//用户优惠券ID
            temp.proid = item.proid;//项目ID
            temp.faceValue = "";//
            temp.code = "";//兑换码
            temp.carnum = "";//车牌
            temp.group = item.group;//组
            temp.time = "";//有效时间
            temp.isSelect = false;//是否已选择
            temp.title = "";//优惠券标题
            temp.content = "";//优惠券内容
            temp.type = 0;//优惠券类型,1:现金券,2:包月套餐,3:项目抵用券,4:产品兑换券
            temp.proname = item.proname;//项目名
            temp.busitype = item.busi_type;
            if (item.coupontype == 0) {//现金券
                if (item.coupon_code) {
                    temp.type = 4;
                    temp.content = item.carnum;
                    temp.faceValue = item.amount + "";
                } else {
                    temp.type = 1;
                    temp.content = item.proname;
                    temp.faceValue = item.amount + "";
                }
            } else if (item.coupontype == 1 && item.is_unlimit_usage_count == 1) {//包月套餐
                temp.type = 2;
                temp.faceValue = "无限次";
                temp.content = item.carnum;
            } else if (item.coupontype == 1 && item.is_unlimit_usage_count == 0) {//项目抵用券
                temp.type = 3;
                temp.faceValue = "服务抵用券";
                temp.content = item.proname;
            } else if (item.coupontype == 2) {//产品兑换券
                temp.type = 4;
                temp.content = item.carnum;
                temp.faceValue = item.amount + "";
            }
            temp.title = item.couponname;
            temp.carnum = item.carnum;
            temp.code = Common.formatCouponCode(item.coupon_code);
            temp.time = Common.formatCouponDate(item.starttime, item.endtime, item.available_days);
            tempList.push(temp);
        });
        this.setState({items: tempList});
        var self = this;
        setTimeout(function () {
            self.setState({showLoading: false});
        }, 1000);
        return this.state.items;
    }

    renderCouponList() {
        return this.state.items.map((item, i)=>
            <CounponItem
                key={i}
                index={i}
                couponId={item.couponid}
                type={item.type}
                faceValue={item.faceValue}
                title={item.title}
                content={item.content}
                time={item.time}
                items={this.state.items}
                isSelect={item.isSelect}
                code={item.code}
                proname={item.proname}
                changeTodoState={this.changeTodoState.bind(this)}
            />
        )
    }

    showNoCoupon() {
        this.setState(function () {
                this.state.couponList.push(
                    <div className={styles.noCouponWrap}>
                        <div><i className={"icon iconfont "+styles.couponIcon}>&#xe619;</i></div>
                        <div><span className={styles.noCoupon}>暂未优惠券,</span>
                            <a className={styles.byCoupon} onTouchTap={(e)=>{this.gotoUrl(e,"/buyPackage")}}>请去购买</a>
                        </div>
                    </div>
                )
            }
        )
    }

    render() {
        return (
            <BaseComponent>
                <div className={styles.myCoupon}>
                    <Loader show={this.state.showLoading}/>
                    <div className={styles.couponList}>
                        {this.state.couponList}
                        {::this.renderCouponList()}
                    </div>
                    <div className={styles.bottomMenu}>
                        <div className={styles.buyCoupon} onTouchTap={(e)=>{this.gotoUrl(e,"/buyPackage")}}>购买优惠券</div>
                        <div className={styles.useCoupon} onTouchTap={(e)=>{this.goToUse(e)}}>立即使用</div>
                    </div>
                </div>
            </BaseComponent>
        )
    }
}

export default MyCoupon;
