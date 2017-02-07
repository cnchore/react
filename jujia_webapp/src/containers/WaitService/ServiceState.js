/**
 * Created by jianxuanbing on 2016/6/3 0003.
 */
import React, { Component, PropTypes } from 'react';
import styles from './ServiceState.scss';
import deng from './images/deng.png';
import working from './images/shigongzhong.png';

class ServiceState extends Component{ 
    state={
    };
    constructor(props){
        super(props);
    }
   

    render(){
        return (
            <div className={styles.serviceState} onTouchTap={this.props.onTouchTap}>
                <img src={this.props.isWait?deng:working} />
                <div className={styles.title}>{this.props.isWait?"等待服务":"施工中"}</div>
                <div className={styles.desc}>预计完工时间：明早6点前</div>
            </div>
        );
    }    
}
ServiceState.propTypes={
    isWait:PropTypes.bool
};

export default ServiceState;
