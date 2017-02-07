import React, { Component, PropTypes } from 'react';
import StepperItems from './StepperItems';
import styles from './stepper.scss';

const defaultItemsHasKey = {
    items: [{
        itemType:1,
        stepNum: 1,
        stepName: '选择服务'
    },{
        itemType:1,
        stepNum: 2,
        stepName: '登记信息'
    },{
        itemType:1,
        stepNum: 3,
        stepName: '存放钥匙'
    },{
        itemType:1,
        stepNum: 4,
        stepName: '等待服务'
    },{
        itemType:1,
        stepNum: 5,
        stepName: '取回钥匙'
    },]
};
const defaultItems = {
    items: [{
        itemType:2,
        stepNum: 1,
        stepName: '选择服务'
    },{
        itemType:2,
        stepNum: 2,
        stepName: '登记信息'
    },{
        itemType:2,
        stepNum: 3,
        stepName: '等待服务'
    }]
}

class Stepper extends React.Component {
    static propTypes = {
        items: PropTypes.arrayOf(PropTypes.shape({
            stepNum: PropTypes.number.isRequired,
            stepName: PropTypes.string.isRequired
        })),
        currentStep: PropTypes.number.isRequired,
        hasKey: PropTypes.bool
    };

    static defaultProps = {hasKey: true};

    state = {
        items:[]
    }

    isCurrentStep(step,num){
        if(step>=1&&num<=step){
            return true
        }else{
         return false
        }
    };
    constructor(props){
        super(props);
        if(this.props.hasKey){
            this.state = {
                items: defaultItemsHasKey.items
            }
        }else{
            this.state = {
                items: defaultItems.items
            }
        }
    }

    renderStepper() {
        const { currentStep, items } = this.props;
        if(this.props.hasKey){
            this.state.items =  defaultItemsHasKey.items;
        }else{
            this.state.items =  defaultItems.items;
        }

        const stepLength = this.state.items.length

            return this.state.items.map((item, i) =>
            <StepperItems
                stepNum={item.stepNum}
                stepName={item.stepName}
                itemType={item.itemType}
                active={::this.isCurrentStep(currentStep,item.stepNum)}
                stepLength={stepLength}
                key={i}
            />
        )
    }

    render () {
        return (
            <div className={styles.stepper}>
                {::this.renderStepper()}
            </div>
        )
    }
}

export default Stepper;
