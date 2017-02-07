/**
 * Created by jianxuanbing on 2016/6/1 0001.
 */
import React, {Component, PropTypes} from "react";
import styles from './RegisterInfo.scss';

class OrderInfo extends Component {
	state = {}

	constructor(props) {
		super(props);
	}

	render() {		
		return ( 
			<div className={styles.registerInfo}>
				<div className={styles.title}>订单信息</div>
				<div className={styles.content}>
					<li>
						<div className={styles.left}>订单编号</div>
						<div className={styles.right}>{this.props.info.orderid}</div>
					</li>
					<li>
						<div className={styles.left}>下单时间</div>
						<div className={styles.right}>{this.props.info.createTime}</div>
					</li>
					<li>
						<div className={styles.left}>订单价格</div>
						<div className={styles.right}>¥{this.props.info.price}</div>
					</li>
					<li>
						<div className={styles.left}>支付方式</div>
						<div className={styles.right}>{this.props.info.payType}</div>
					</li>
				</div>
			</div>
		);
	}
}

OrderInfo.propTypes = {
	info:PropTypes.object.isRequired
};

export default OrderInfo;
