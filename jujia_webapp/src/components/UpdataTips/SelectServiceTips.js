/**
 * Created by Administrator on 2016/9/12.
 */
import React, { Component, PropTypes } from 'react';
import confirmBtn from './images/btn.png';
import stationTips from './images/stationTIps.png';
import washingTips from './images/washingTips.png';
import styles from './UpdataTips.scss'

class SelectServiceTips extends Component {
    static propTypes = {};
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    state = {
        stationOpen: false,
        washingOpen: false
    };

    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(){

    }

    stationHanderClose(e) {
        e.stopPropagation();
        e.preventDefault();
        //this.setState({stationOpen: false});
        this.props.stationChangeTipsOpen();
    }

    washingHanderClose(e) {
        e.stopPropagation();
        e.preventDefault();
        //this.setState({stationOpen: false});
        this.props.washingChangeTipsOpen();
    }

    render() {
        //console.log("aaaaaaaaaa",this.props.washingTips||this.props.stationTips);
        return (
            <div className={this.props.washingTips||this.props.stationTips?styles.selectUpdateTips:styles.hidden}>
                <div className={this.props.washingTips?styles.washingContent:styles.hidden}>
                    <div className={styles.arrowContent}>
                        <div className={styles.myOrderWashing}>
                            上门洗车
                        </div>
                        <div className={styles.arrowWrap}>
                            <img src={washingTips} className={styles.arrowTips}/>
                        </div>
                    </div>
                    <div className={styles.BtnContent}>
                        <div className={styles.BtnWrap}>
                            <img src={confirmBtn} className={styles.confirmBtn} onTouchTap={(e)=>this.washingHanderClose(e)}/>
                        </div>
                    </div>
                </div>
                <div className={this.props.stationTips?styles.stationContent:styles.hidden}>
                    <div className={styles.arrowContent}>
                        <div className={styles.myOrderStation}>
                            地库站
                        </div>
                        <div className={styles.arrowWrap}>
                            <img src={stationTips} className={styles.arrowTips}/>
                        </div>
                    </div>
                    <div className={styles.BtnContent}>
                        <div className={styles.BtnWrap}>
                            <img src={confirmBtn} className={styles.confirmBtn} onTouchTap={(e)=>this.stationHanderClose(e)}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

SelectServiceTips.propTypes={
    stationTips:PropTypes.bool,
    washingTips:PropTypes.bool
};

export default SelectServiceTips


