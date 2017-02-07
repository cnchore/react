/**
 * Created by jianxuanbing on 2016/6/1 0001.
 */
import React, {Component, PropTypes} from "react";
import styles from './News.scss';

class News extends Component{
    state={};
    constructor(props) {
		super(props);
	}
    handlerState(e){
        e.stopPropagation();
        e.preventDefault();
        let isOpen=!this.props.isOpen;
        this.props.zoomPicture(this.props.index,isOpen);
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
News.propTypes={
    isOpen:PropTypes.bool,
    txt:PropTypes.string,
    url:PropTypes.string,
    index:PropTypes.number
};
export default News;
