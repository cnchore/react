/**
 * Created by jianxuanbing on 2016/5/31 0031.
 */
import React, {Component, PropTypes} from "react";
import stateImg from './images/tishi.png';
import styles from './WaitState.scss';

class WaitState extends Component {
	state = {
	}
	constructor(props) {
		super(props);
	}

	render() {
		var stateName="";		        
		if(this.props.isNoCabinetOrder){
            stateName="订单已确认，请您保持电话畅通。";
        }
        if(this.props.isUserTakeCar){
            stateName="订单已确定，您可在预计开始时间前15分钟移车到水洗站，避免服务延时！";
        }
		if(this.props.isTechTake){
			stateName="订单已确定，等待技师取取钥匙"
		}
		
		return (
			<div className={styles.content}>
				<img src={stateImg} />
				<span>{stateName}</span>
			</div>
		);
	}
}
WaitState.propTypes = {
    isNoCabinetOrder:PropTypes.bool,
	isUserTakeCar:PropTypes.bool
};
WaitState.contextTypes = {
	router: React.PropTypes.object.isRequired
};
export default WaitState;