/**
 * Created by jianxuanbing on 2016/6/1 0001.
 */
import React, {Component, PropTypes} from "react";
import styles from './ServiceItem.scss';

class ServiceItem extends Component {
	state = {}

	constructor(props) {
		super(props);
	}

	render() {		
		var serviceList=[];
		this.props.info.map(function(item,i){
			serviceList.push(
				<li key={i}>
					<div className={styles.left}>{item.proname}</div>
					<div className={styles.center}>{item.needtime}分钟</div>
					<div className={styles.right}>¥{item.actmoney}</div>
				</li>
			);
		})
		return ( 
			<div className={styles.serviceItem}>
				<div className={styles.title}>已选服务</div>
				<div className={styles.content}>
					{serviceList}
				</div>
			</div>
		);
	}
}

ServiceItem.propTypes = {
	info:PropTypes.array.isRequired
};

export default ServiceItem;