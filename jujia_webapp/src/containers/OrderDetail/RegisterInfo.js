/**
 * Created by jianxuanbing on 2016/6/1 0001.
 */
import React, {Component, PropTypes} from "react";
import styles from './RegisterInfo.scss';

class RegisterInfo extends Component {
	state = {}

	constructor(props) {
		super(props);
	}

	render() {
		var hide={
			display:"none"
		};

		return ( 
			<div className={styles.registerInfo}>
				<div className={styles.title}>登记信息</div>
				<div className={styles.content}>
					<li>
						<div className={styles.left}>手机</div>
						<div className={styles.right}>{this.props.info.phone}</div>
					</li>
					<li>
						<div className={styles.left}>车牌</div>
						<div className={styles.right}>{this.props.info.carnum}</div>
					</li>
					<li style={this.props.info.isShowPark?null:hide}>
						<div className={styles.left}>停车点</div>
						<div className={styles.right}>{this.props.info.parking}</div>
					</li>
					<li style={this.props.info.isShowStation?null:hide}>
						<div className={styles.left}>地库站</div>
						<div className={styles.right}>{this.props.info.address}</div>
					</li>
				</div>
			</div>
		);
	}
}

RegisterInfo.propTypes = {
	info:PropTypes.object.isRequired
};

export default RegisterInfo;
