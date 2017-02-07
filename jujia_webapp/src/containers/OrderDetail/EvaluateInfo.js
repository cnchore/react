/**
 * Created by jianxuanbing on 2016/6/1 0001.
 */
import React, {Component, PropTypes} from "react";
import styles from './EvaluateInfo.scss';
import start from './images/xing.png';

class EvaluateInfo extends Component{
	state={};

	constructor(props){
		super(props);
	}

	render(){
		var startList=[];
		for(var i=0;i<this.props.info.score;i++){
			startList.push(<img key={i} src={start} />);
		}
		return (
			<div className={styles.evaluateInfo}>
				<div className={styles.title}>我的评价</div>
				<div className={styles.content}>
					<li>
						<div className={styles.left}>星级</div>
						<div className={styles.right}>
							{startList}
						</div>
					</li>
					<li>
						<div className={styles.left}>标签</div>
						<div className={styles.right}>{this.props.info.labels}</div>
					</li>
					<li>
						<div className={styles.left}>评语</div>
						<div className={styles.right}>{this.props.info.text}</div>
					</li>
				</div>
			</div>
		);
	}
}

EvaluateInfo.propTypes={
	info:PropTypes.object.isRequired
};

export default EvaluateInfo;
