/**
 * Created by Administrator on 2016/9/12.
 */
import React, { Component, PropTypes } from 'react';
import confirmBtn from './images/btn.png';
import homeTips from './images/homeTips.png';
import styles from './UpdataTips.scss'

class HomeWashTips extends Component{
    static propTypes = {};
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    state = {
        open: false
    };

    constructor(props) {
        super(props);
    }

    handerClose() {
        this.setState({open:false});
        this.props.changeTipsOpen();
    }

    initUpdateTips(){
        if(this.props.homeTips){
            this.setState({open:true});
        }
    }

    render(){
        return(
            <div className={styles.homeUpdateTips}>
                <div className={styles.BtnContent}>
                    <div className={styles.BtnWrap}>
                        <img src={confirmBtn} className={styles.confirmBtn} onTouchTap={::this.handerClose}/>
                    </div>
                </div>
            </div>
        )
    }
}

HomeWashTips.propTypes={
  homeTips:PropTypes.bool
};

export default HomeWashTips
