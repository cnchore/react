import React, { Component, PropTypes } from 'react';
import Styles from "./Tab.scss";

export class Tab extends React.Component {
    static propTypes = {
    };

    state = {
    };

    constructor(props) {
        super(props);
    }

    handleChange(){
        this.props.onChange(this.props.index)
    }


    render () {
        return (
            <div style={this.props.style} className={Styles.tab} onTouchTap={()=>{this.handleChange()}}>
                <div className={Styles.content}>
                    {this.props.label}
                </div>
            </div>
        )
    }
}

export default Tab;

