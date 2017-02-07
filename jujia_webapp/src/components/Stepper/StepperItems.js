import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';
import styles from './stepper.scss';
// var styles = require('./stepper.scss'')

class StepperItems extends Component {
    static propTypes = {
        active: PropTypes.bool,
        stepNum: PropTypes.number.isRequired,
        stepName: PropTypes.string.isRequired,
        stepLength: PropTypes.number,
        itemType: PropTypes.number,
    };

    render() {
        const {active, stepNum, stepName, stepLength, itemType} = this.props;

        const circleClass = classnames({
            [styles.active]: active,
            [styles.circle]: true
        });

        const stepClass = classnames({
            [styles.message]: active
        });
        if (itemType == 1) {
            return (
                <div className={styles.stepperItems}>
                    <div className={circleClass}>
                        <span>{stepNum}</span>
                        {stepLength !== stepNum &&
                        <div className={styles.line}></div>
                        }
                    </div>
                    <p className={styles.text+" "+stepClass+" "}>{stepName}</p>
                </div>
            )
        }
        if(itemType==2){
            return (
                <div className={styles.stepperItems}>
                    <div className={circleClass}>
                        <span>{stepNum}</span>
                        {stepLength !== stepNum &&
                        <div className={styles.anline}></div>
                        }
                    </div>
                    <p className={styles.text+" "+stepClass+" "}>{stepName}</p>
                </div>
            )
        }
    }
}

export default StepperItems;
