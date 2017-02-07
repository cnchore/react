/**
 * Created by Administrator on 2016/7/13.
 */
import React, { Component, PropTypes } from 'react';
import styles from './UpdateTips.scss';
import confirmBtn from './images/confirmBtn.png';
import arrowTips from './images/arrowTips.png';
class UpdateTips extends Component {
    static propTypes = {};
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    state = {
        open: false
    };

    componentWillReceiveProps(){
        this.initUpdateTips();
    }
    constructor(props) {
        super(props);
    }

    handerClose() {
        this.setState({open:false})
        this.props.changeTipsOpen();
    }

    initUpdateTips(){        
        if(this.props.tipOpen){
            this.setState({open:true});
        }
    }
    render() {
        return(
         <div className={this.state.open?styles.UpdateTips:styles.UpdateTipsHidden}>
             <div className={styles.BtnContent}>
                 <div className={styles.BtnWrap}>
                 <img src={confirmBtn} className={styles.confirmBtn} onTouchTap={::this.handerClose}/>
                     </div>
             </div>
             <div className={styles.arrowContent}>
                 <div className={styles.arrowWrap}>
                     <img src={arrowTips} className={styles.arrowTips}/>
                 </div>
                 <div className={styles.myOrder}>
                     <div className={styles.tab}>
                     <i className="icon iconfont">&#xe606;</i>
                     <span>订单</span>
                         </div>
                 </div>
             </div>
         </div>
        )
    }
}
UpdateTips.propTypes = {
    tipOpen: PropTypes.bool
};

export  default UpdateTips;
