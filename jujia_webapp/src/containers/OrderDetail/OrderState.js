/**
 * Created by jianxuanbing on 2016/5/31 0031.
 */
import React, {Component, PropTypes} from "react";
import stateImg from './images/Y1.png';
import styles from './OrderState.scss';

class OrderState extends Component {
	state = {
	}
	constructor(props) {
		super(props);
	}

	render() {
		var stateName="";
		var keyState=this.props.keyState;
		switch(this.props.state) {
			case 1:
				stateName="";			
				break;
			case 2:
				stateName="等待您付款";
				break;
			case 4:
				if(keyState==15){
					stateName="等待您存钥匙";
				}else{
					stateName="等待服务"
				}
				break;
			case 5:
				stateName="您的订单已取消";
				break;
			case 6:
			case 7:
				if(keyState==11){
					stateName="订单已取消，等待您取钥匙";
				}else{
					stateName="您的订单已取消";					
				}
				break;
			case 8:
				if(this.props.hasProblem){
					stateName="经检查，您的车有问题，暂停施工";
				}else{
					stateName="施工中";
				}
				break;
			case 9:
				if(keyState==13){
					stateName="已完成施工，等待您取钥匙";
				}else{
					stateName="已完成服务";
				}
				break;
			case 10:
				stateName="已完成服务";
				break;
		}
		return (
			<div className={styles.content}>
				<img src={stateImg} />
				<span>{stateName}</span>
			</div>
		);
	}
}
OrderState.propTypes = {
	state: PropTypes.number,
	keyState:PropTypes.number,
	hasProblem:PropTypes.bool
};
OrderState.contextTypes = {
	router: React.PropTypes.object.isRequired
};
export default OrderState;