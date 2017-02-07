/**
 * Created by Administrator on 2016/7/8.
 */
import React, {Component, PropTypes} from "react";
import styles from './KeyBoxImg.scss';

class KeyBoxImg extends Component{
    state={};
    constructor(props) {
        super(props);
    }
    handlerState(e){
        e.stopPropagation();
        e.preventDefault();
        let isOpen=!this.props.isOpen;
        this.props.zoomPicture(isOpen,this.props.index);
    }
    render(){
        return(
            <div className={styles.news} onTouchTap={(e)=>::this.handlerState(e)}>
                <div className={styles.txt}>{this.props.txt}</div>
                <img src={this.props.url} className={styles.smallImg} />
            </div>
        );
    }
}
KeyBoxImg.propTypes={
    isOpen:PropTypes.bool,
    txt:PropTypes.string,
    url:PropTypes.string,
    index:PropTypes.number
};
export default KeyBoxImg;
