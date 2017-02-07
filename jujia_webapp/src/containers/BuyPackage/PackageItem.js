/**
 * Created by Administrator on 2016/6/16.
 */
import React, {Component, PropTypes} from 'react';
import styles from './PackageItem.scss';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';

class PackageItem extends Component {
    static propTypes = {};
    state = {
        couponids: [],
        showDelete: false
    };

    constructor(props) {
        super(props);
    }

    handlerState() {
        let isSelect = !this.props.isSelect;
        this.props.changeTodoState(this.props.index, isSelect);
        console.log(this.props.items);
    }

    /**
     * 注册添加按钮事件
     * @param e
     */
    addBtnClick(e) {
        e.stopPropagation();
        //console.log(this.refs["add"].offsetLeft,this.refs["add"].offsetTop);
        var addDom=this.refs["add"];
        var ofTop=addDom.offsetTop-document.body.scrollTop
        this.props.addNum(this.props.index, this.props.couponId);
        this.props.changeTodoState(this.props.index, true);
        this.props.addCloneNode(addDom.offsetLeft,ofTop);
        //console.log(this.props.num);
    }

    /**
     * 注册减少按钮事件
     * @param e
     */
    deleteBtnClick(e) {
        e.stopPropagation();
        if (this.getCouponIds() > 1) {
            this.props.deleteNum(this.props.index, this.getLastCarId());
        } else if (this.getCouponIds() == 1) {
            this.props.deleteNum(this.props.index, this.getLastCarId());
            this.props.changeTodoState(this.props.index, false);
        }
    }

    /**
     * 获取购物车最后一件商品id
     * @returns {*}
     */
    getLastCarId() {
        var carId = [];
        this.props.datas.map((data)=> {
            if (this.props.couponId == data.otherid) {
                carId.push(data.shopping_carid);
            }
        });
        return carId[carId.length - 1];
    }

    /**
     * 获取购物车商品数量
     * @returns {*|number}
     */
    getCouponIds() {
        var couponids = [];
        this.props.datas.map((data)=> {
            if (this.props.couponId == data.otherid) {
                couponids.push(data.otherid)
            }
        })
        return couponids.length;
    }

    render() {
        const {couponId, type, faceValue, specialValue, title, content, time, datas}=this.props;
        var _content = content.split(",");
        var showContent = [];
        /*var couponids=[];*/
        var carId = [];
        _content.map((i)=> {
            return showContent.push(<div className={styles.content}>{i}</div>);
        });
        /* datas.map((data)=>{
         if(couponId==data.otherid){
         couponids.push(data.otherid)
         carId.push(data.shopping_carid);
         }
         });*/
        var lastCarId = carId[carId.length - 1];
        var showIcon = {};
        if (this.props.isSelect) {
            showIcon = <i className={"icon iconfont "+styles.select+" "+styles.active}>&#xe60c;</i>
        } else {
            showIcon = <i className={"icon iconfont "+styles.select}>&#xe60b;</i>
        }
        return (
            <div className={styles.PackageItem}>
                <div className={styles.nowPrice}>
                    <p className={styles.specialMoney}>¥{specialValue}</p>
                    <p className={styles.money}>¥{faceValue}</p>
                </div>
                <div className={styles.title}>{title}</div>
                <div className={styles.contents}>
                    {showContent}
                </div>
                <div className={styles.btnContent}>
                      <div className={::this.getCouponIds()>0?styles.showDelete:styles.hideDelete}>
                        <div className={styles.deleteBtn} onTouchTap={::this.deleteBtnClick}><i
                            className={"icon iconfont "+styles.deleteIcon}>&#xe626;</i></div>
                        <div className={styles.num}>{::this.getCouponIds()}</div>
                    </div>
                    <div className={styles.addBtn} onTouchTap={::this.addBtnClick}>
                        <i className={"icon iconfont "+styles.addIcon} ref="add">&#xe616;</i></div>
                </div>
                <div className={styles.time}>
                    有效期{time}天
                </div>
            </div>
        )
    }
}
PackageItem.propTypes = {
    couponId: PropTypes.number,
    type: PropTypes.number,
    faceValue: PropTypes.number,
    specialValue: PropTypes.number,
    title: PropTypes.string,
    content: PropTypes.string,
    time: PropTypes.number,
    datas: PropTypes.object,
    items: PropTypes.object
}
export default PackageItem;
