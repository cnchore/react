/**
 * Created by Administrator on 2016/7/25.
 */
import React, { Component, PropTypes } from 'react';
import styles from './BranderCarsCare.scss';
import GoodsItem from './GoodsItem';
import leaveNum from './images/leaveNum.png'
import titleBag from './images/titleBag.png';
import  goods1 from './images/goods1.png';
import  goods2 from './images/goods2.png';
import  goods3 from './images/goods3.png';
import  goods4 from './images/goods4.png';
import  goods5 from './images/goods5.png';
import  goods6 from './images/goods6.png';
import {connect} from 'react-redux';
import BaseComponent from "../../../components/BaseComponent/BaseComponent";
import *as BrandCarsCareAction from'../../../redux/modules/BuyingActivity/BrandCarsCare/action';
import Snackbarx from "../../../components/Snackbarx/Snackbarx";


@connect(
    state=>({}),
    BrandCarsCareAction
)
export default class BrandCarsCare extends Component {
    static propTypes = {};
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    /**
     * 创建初始的默认参数
     * @type {{items: *[]}}
     */
    state = {
        isEnd: 0,
        msg: {show: false, msg: ""},
        leaveNum: null,
        items: []
    };

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.getPromotionInfo();
    }

    getPromotionInfo() {
        this.props.getPromotionInfo("bigUpkeepPromotion").then(res=> {
            this.initPromotionList(res.body.data.coupons);
            this.setState({leaveNum: res.body.data.remain});
            if (!res.body.status) {
                if (res.body.code == -1) {
                    this.setState({isEnd: -1});
                }
                if (res.body.code == -2) {
                    this.setState({isEnd: -2});
                }
                this.showMsg(res.body.msg);
            }
        })
    }

    initPromotionList(datas) {
        var tempList = [];
        datas.forEach(function (data) {
            var temp = {};
            if (data.proname.indexOf("美孚金装") > -1) {
                temp.imgSrc = goods1;
                temp.type = 1;
            }
            if (data.proname.indexOf("美孚银装") > -1) {
                temp.imgSrc = goods2;
                temp.type = 2;
            }
            if (data.proname.indexOf("嘉实多极") > -1) {
                temp.imgSrc = goods3;
                temp.type = 3;
            }
            if (data.proname.indexOf("嘉实多磁") > -1) {
                temp.imgSrc = goods4;
                temp.type = 4;
            }
            if (data.proname.indexOf("壳牌灰壳") > -1) {
                temp.imgSrc = goods5;
                temp.type = 5;
            }
            if (data.proname.indexOf("壳牌蓝壳") > -1) {
                temp.imgSrc = goods6;
                temp.type = 6;
            }
            temp.couponid = data.couponid;
            temp.promotionid = data.promotionid;
            tempList.push(temp);
        });
        this.setState({items: tempList});
    }


    /**
     * 初始化商品列表
     * @returns {*}
     */
    initGoodsList() {
        return (
            this.state.items.map((item, i)=> (
                    <GoodsItem
                        type={item.type}
                        src={item.imgSrc}
                        couponid={item.couponid}
                        promotionid={item.promotionid}
                        key={i}
                        isEnd={this.state.isEnd}
                    />
                )
            )
        )
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
        return (
            <BaseComponent>
                <div className={styles.BrandCarsCare}>
                    <div className={styles.headerWrapper}>
                        <img src={titleBag} className={styles.titleBag}/>
                        <div className={styles.leaveNumWrap}>
                            <img src={leaveNum} className={styles.leaveNumIcon}/>
                        <span className={styles.leaveNum}>
                            仅剩<span>{this.state.leaveNum}</span>份
                        </span>
                        </div>
                    </div>
                    <div className={styles.goodsList}>
                        {::this.initGoodsList()}
                    </div>
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
