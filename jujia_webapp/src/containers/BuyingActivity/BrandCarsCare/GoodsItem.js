/**
 * Created by Administrator on 2016/7/25.
 */
import React, { Component, PropTypes } from 'react';
import styles from './BranderCarsCare.scss';

class GoodsItem extends Component {
    static propTypes = {};
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };
    state = {};

    /**
     * 注册点击详情事件
     * @param e
     * @param type
     */
    handerClick(e, type, couponid, promotionid, isEnd) {
        e.preventDefault();
        e.stopPropagation();
        var url = window.location.href;
        var getPramater = url.substring((url.indexOf("?")) + 1);
        if ((url.indexOf("?")) > 0) {
            this.context.router.push("/goodsDetail?type=" + type + "&couponid=" + couponid + "&_promotionid=" + promotionid + "&isEnd=" + isEnd + "&" + getPramater);
        } else {
            this.context.router.push("/goodsDetail?type=" + type + "&couponid=" + couponid + "&_promotionid=" + promotionid + "&isEnd=" + isEnd);
        }
    }

    render() {
        const {type,src,couponid,promotionid,isEnd}=this.props;
        const _style = {
            background: "url(" + src + ") no-repeat",
            backgroundSize: "100% 100%"
        };
        return (
            <div className={styles.goodsContent} style={_style}>
                <div className={styles.detailBtn}
                     onTouchTap={(e)=>{this.handerClick(e,type,couponid,promotionid,isEnd)}}>了解详情
                </div>
            </div>
        )
    }
}

GoodsItem.propTypes = {
    type: PropTypes.number,
    src: PropTypes.string,
    couponid: PropTypes.number,
    promotionid: PropTypes.number,
    isEnd: PropTypes.number
};

export default GoodsItem;
