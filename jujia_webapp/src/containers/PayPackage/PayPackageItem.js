/**
 * Created by Administrator on 2016/6/21.
 */
import React, {Component, PropTypes} from 'react';
import styles from './PayPackageItem.scss';

class PayPackageItem extends Component {
    static propTypes = {};

    constructor(props) {
        super(props);
    }

    /**
     * 移除商品
     * @param e
     */
    deleteBtnClick(e) {
        e.stopPropagation();
        e.preventDefault();
        this.props.deleteNum(this.props.shopping_carid);
    }

    render() {
        const {othername, price}=this.props;
        return (
            <div className={styles.packageMoneyContent}>
                <div className={styles.packageName}>{othername}</div>
                <div className={styles.money}>¥{price}<i className={"icon iconfont "+styles.deleteBtn}  onTouchTap={::this.deleteBtnClick} > &#xe617;</i></div>
            </div>
        )
    }
}

PayPackageItem.propTypes = {
    othername: PropTypes.string,
    price: PropTypes.number
}

export default PayPackageItem
