/**
 * Created by Administrator on 2016/6/18.
 */
import React, {Component, PropTypes} from 'react';
import styles from './RechargeItem.scss';
class RechargeItem extends Component {
    constructor(props) {
        super(props);
    }

    /**
     * 改变充值选项
     */
    handlerState() {
        let isSelect=!this.props.isSelect;
        this.props.changeTodoState(this.props.index, isSelect,this.props.configid);
    }

    render() {
        const {recharge, giveMoney}=this.props;
        if (this.props.isSelect) {
            return (<div className={styles.priceBox+" "+styles.active} onTouchTap={::this.handlerState}>
                <div className={styles.recharge}>{recharge}元</div>
                <div className={styles.giveMoney}>赠送：{giveMoney}元</div>
            </div>)
        }else{
            return (<div className={styles.priceBox} onTouchTap={::this.handlerState}>
                <div className={styles.recharge}>{recharge}元</div>
                <div className={styles.giveMoney}>赠送：{giveMoney}元</div>
            </div>)
        }
    }
}

RechargeItem.propTypes = {
    recharge: PropTypes.number,
    giveMoney: PropTypes.number
};
export default RechargeItem
