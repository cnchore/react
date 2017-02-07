import React, { Component, PropTypes } from 'react';
import styles from './TimeBaseItem.scss';
import classnames from 'classnames';

class TimeBaseItem extends Component {
    render() {
        const {active,stepNum,stepName,stepLength,stepTime,hasCabinet}=this.props;
        const circleClass = classnames({
            [styles.active]: active,
            [styles.circle]: true
        });
        let takeKeyTips=[];
        if(hasCabinet){
            takeKeyTips=<p className={active?styles.activeFont+" "+ styles.takeKeyTips:""}>(技师将提前十五分钟致电取钥匙!)</p>
        }
        return (
            <div className={styles.timeBaseItem}>
                <div className={styles.box}>
                    <div className={circleClass}>{stepNum}</div>
                    <div className={styles.stepWrap}>
                        <span className={active?styles.activeFont:""}>{stepName}</span>
                        <span className={active?styles.activeFont:""}>{stepTime}</span>
                        {takeKeyTips}
                    </div>
                </div>
                {stepLength !== stepNum && <div className={styles.line}><span>|</span></div>}
            </div>
        );
    }
}

TimeBaseItem.propTypes = {
    active: PropTypes.bool,
    stepNum: PropTypes.number.isRequired,
    stepName: PropTypes.string.isRequired,
    stepLength: PropTypes.number,
    stepTime: PropTypes.string,
    hasCabinet: PropTypes.bool
};
export default TimeBaseItem;
