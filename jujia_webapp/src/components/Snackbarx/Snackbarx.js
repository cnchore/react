import React, { Component, PropTypes } from 'react';
import Styles from "./Snackbarx.scss";

export class Snackbarx extends React.Component {
    static propTypes = {

    };

    state = {
        autoHideDuration: 4000,
        open:false,
        winClickEvent: ()=>{
            window.document.removeEventListener("mousedown", this.state.winClickEvent);
            clearTimeout(this.state.timeout);
            this.setState({
                open: false,
                message:""
            });
            this.props.onRequestClose();

        }
    };
    constructor(props){
        super(props);
        console.log(this.props.open);
        if(this.props.open){
            this.state.open = true;
            this.state.message = this.props.message;
            this.state.autoHideDuration= this.props.autoHideDuration |this.state.autoHideDuration;
            setTimeout(()=>window.document.addEventListener("mousedown", this.state.winClickEvent),500);
            clearTimeout(this.state.timeout);
            this.state.timeout = setTimeout(()=>{
                window.document.removeEventListener("mousedown", this.state.winClickEvent);
                this.setState({
                    open:false,
                    message:""
                });
                this.props.onRequestClose();
            },
            this.state.autoHideDuration)
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.open !== this.props.open && nextProps.open){
            this.state.open = true;
            this.state.message = nextProps.message;

            this.state.autoHideDuration= this.props.autoHideDuration |this.state.autoHideDuration;
            setTimeout(()=>window.document.addEventListener("mousedown", this.state.winClickEvent),500);

            clearTimeout(this.state.timeout);
            this.state.timeout = setTimeout(()=>{
                window.document.removeEventListener("mousedown", this.state.winClickEvent);
                this.setState({
                    open:false,
                    message:""
                });
                this.props.onRequestClose();
            },
             this.state.autoHideDuration)
        }
    };
    render () {
        return (
            <div ref="msg" tabindex="0" className={Styles.main+" " + (this.state.open?Styles.visible:Styles.hidden)}>
                <div className={Styles.content}>
                    <div className={Styles.msg}>
                        <span >{this.state.message}</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default Snackbarx;

