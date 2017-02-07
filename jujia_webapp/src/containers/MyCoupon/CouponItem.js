import React, { Component, PropTypes } from 'react';
import styles from './CouponItem.scss';

class CouponItem extends Component {
    constructor(props) {
        super(props);
    }

    handlerState() {
        let isSelect = !this.props.isSelect;
        this.props.changeTodoState(this.props.index, isSelect);
    }

    render() {
        const {couponId,type,faceValue,title,proname,content,time,code}=this.props;
        var showFaceValue = {};
        var showContent = {};
        var showIcon = {};
        var showCode = {};
        var showCouponName = "";
        if (this.props.isSelect) {
            showIcon = <i className={"icon iconfont "+styles.select+" "+styles.active}>&#xe60c;</i>
        } else {
            showIcon = <i className={"icon iconfont "+styles.select}>&#xe60b;</i>
        }
        if (type == 1) {
            showFaceValue = <div className={styles.faceValue}>¥<span className={styles.money}>{faceValue}</span></div>;
            showContent = "抵用[" + content + "]现金" + faceValue + "元。不可叠加。";
            showCode = "";
        } else if (type == 2) {
            showFaceValue = <div className={styles.faceValue}><span className={styles.unLimit}>{faceValue}</span></div>;
            showContent = "绑定车牌[" + content + "]，有效期内无限次使用";
            showCode = "";
        } else if (type == 3) {
            showFaceValue = <div className={styles.faceValue}><span className={styles.service}>{faceValue}</span></div>;
            showContent = "抵用[" + content + "]服务一次，不可叠加。";
            showCode = "";
        } else if (type == 4) {
            showFaceValue = <div className={styles.faceValue}>¥<span className={styles.money}>{faceValue}</span></div>;
            showCode = <div className={styles.code}>优惠码：<span>{code}</span></div>;
            showContent = "绑定车牌为[" + content + "]，仅限此车牌去凤凰城门店使用。";
            if (title.indexOf("1元抵68元") > -1) {
                showCouponName = "(" + proname + "精保)"
            }
            if (proname.indexOf("喷漆") > -1 || proname.indexOf("维修、机油保养工时费") > -1 || proname.indexOf("四轮调位")>-1) {
                showContent = "使用抵扣项目[" + proname + "]，仅限去凤凰城门店使用。";
            }
            if(proname.indexOf("精致水晶")>-1 || proname.indexOf("精致内外洗")>-1){
                showCode="";
                showContent="使用抵扣项目[" + proname + "]，仅限在凤馨苑地库站使用。";
            }
            if(proname.indexOf("车险")>-1){
                showContent="使用抵扣项目[" + proname + "]，仅限凤凰城门店及地库站使用。";
            }
        }
        return (
            <div className={styles.couponItem} onTouchTap={::this.handlerState}>
                {showFaceValue}
                <div className={styles.title}>{title + showCouponName}</div>
                {showIcon}
                {showCode}
                <div className={styles.content}>
                    {showContent}
                </div>
                <div className={styles.time}>
                    {time}
                </div>
            </div>
        )
    }
}
CouponItem.propTypes = {
    couponId: PropTypes.number,
    type: PropTypes.number,
    faceValue: PropTypes.string,
    proname: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
    time: PropTypes.string,
    code: PropTypes.string
};
export default CouponItem;
