import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { red700 } from 'material-ui/styles/colors';
import styles from './bottomTab.scss';
import {connect} from 'react-redux';
import *as BottomTabAction from'../../redux/modules/BottomTab/action';

@connect(
    state=>({}),
    BottomTabAction
)

class BottomTab extends Component {
    static propTypes = {};

    state = {
        lightOpen: false
    };

    componentWillMount() {
        this.getAlarmInfo();
    }

    constructor(props) {
        super(props);
        this.onTouchMove = ::this.onTouchMove;
    }

    onTouchMove(e) {
        e.preventDefault();
    }

    getAlarmInfo() {
        this.props.getAlarmInfo().then(res=> {
            var data = res.body;
            if (data.status) {
                let takeStoreKeyOrderCount = parseInt(data.data.takeStoreKeyOrderCount);
                let unFinishOrderCount = parseInt(data.data.unFinishOrderCount);
                if (takeStoreKeyOrderCount > 0 || unFinishOrderCount > 0) {
                    this.setState({lightOpen: true})
                }
            }
        })
    }

    render() {
        const activeStyle = {
            color: red700
        };
        var lightOpen = this.state.lightOpen;
        return (
            <div className={styles.bottomTab} onTouchMove={this.onTouchMove}>
                <Link className={styles.tab} to="/home2" activeStyle={activeStyle}>
                    <i className="icon iconfont">&#xe623;</i>
                    <span>主页</span>
                </Link>
                <Link className={styles.tab} to="/orderList" activeStyle={activeStyle}>
                    <i className="icon iconfont">&#xe606;</i>
                    <div className={styles.order}>
                        <span>订单</span>
                        <div className={this.state.lightOpen?styles.lightIcon:styles.hidden}></div>
                    </div>
                </Link>
                <Link className={styles.tab} to="/user" activeStyle={activeStyle}>
                    <i className="icon iconfont">&#xe607;</i>
                    <span>我的</span>
                </Link>
            </div>
        )
    }
}

export default BottomTab;
