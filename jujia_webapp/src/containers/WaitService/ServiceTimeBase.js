/**
 * Created by jianxuanbing on 2016/6/8 0008.
 */
import React,{Component,PropTypes} from 'react';
import styles from './ServiceTimeBase.scss';
import TimeBaseItem from './TimeBaseItem';

const defaultItems={
    items:[{
        stepNum:1,
        stepName:"预计开始时间",
        stepTime:"",
        hasCabinet:false
    },{
        stepNum:2,
        stepName:"正在服务",
        stepTime:""
    },{
        stepNum:3,
        stepName:"预计完成时间",
        stepTime:""
    }]
};

class ServiceTimeBase extends Component{
    constructor(props){
        super(props);
    }
    static defaultProps=defaultItems;

    isCurrentStep(step,num){
        /*console.log(step);
        console.log(num);
        console.log(step>=1&&num<=step);*/
        if(step>=1&&num<=step){
            return true;
        }else{
            return false;
        }
    }
    renderStepper(){
        const {currentStep,items,startTime,endTime,currentTime,hasCabinet}=this.props;
        const stepLength=items.length;
        items[0].stepTime=startTime;
        items[0].hasCabinet=hasCabinet;
        items[1].stepTime=currentTime?currentTime:"";
        items[2].stepTime=endTime;
        return this.props.items.map((item,i)=>
        <TimeBaseItem
            stepNum={item.stepNum}
            stepName={item.stepName}
            stepTime={item.stepTime}
            active={::this.isCurrentStep(currentStep,item.stepNum)}
            stepLength={stepLength}
            hasCabinet={item.hasCabinet}
            key={i}
        />)
    }
    render(){
        return (
            <div className={styles.timeBase}>
                {::this.renderStepper()}
            </div>
        );
    }
};
ServiceTimeBase.propTypes={
    currentStep:PropTypes.number.isRequired,
    startTime:PropTypes.string.isRequired,
    endTime:PropTypes.string.isRequired,
    currentTime:PropTypes.string,
    hasCabinet:PropTypes.bool,
    items:PropTypes.arrayOf(PropTypes.shape({
        stepNum:PropTypes.number.isRequired,
        stepName:PropTypes.string.isRequired,
        stepTime:PropTypes.string
    }))
};
export default ServiceTimeBase;
