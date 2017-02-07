/**
 * Created by Administrator on 2016/7/7.
 */
import React, {Component, PropTypes} from "react";
import styles from './ZoomPicture.scss';

class ZoomPicture extends Component {
    state = {
        open: false,
        winClickEvent: ()=> {
            let isOpen=!this.props.isOpen;
            if(this.props.zoomPicture){
                this.props.zoomPicture(this.props.index,isOpen);
            }
            this.setState({
                open: false
            });
            window.document.removeEventListener("touchstart", this.state.winClickEvent);
        }
    };

    /*constructor(props) {
        super(props);
        if (this.props.isOpen) {
            this.state.open=true;
            setTimeout(()=>window.document.addEventListener("mousedown", this.state.winClickEvent), 500);
        }
    }*/
    componentWillReceiveProps(nextProps){
        if (nextProps.open !== this.props.isOpen && nextProps.isOpen) {
            this.setState({
                open: true
            });
            window.document.addEventListener("touchstart", this.state.winClickEvent)
        }
    }

    render() {
        return (
            <div className={this.state.open?styles.visible:styles.hidden}>
                <img src={this.props.src}className={styles.imgAnimation}/>
            </div>
        )
    }
}

ZoomPicture.propTypes = {
    isOpen: PropTypes.bool,
    text: PropTypes.string,
    src: PropTypes.string
};

export default ZoomPicture;
