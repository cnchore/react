import React, { Component, PropTypes } from 'react';
import Styles from "./Tabs.scss";

export class Tabs extends React.Component {
    static propTypes = {

    };

    state = {
        lineStytle: {},
        selectedIndex: -1
    };

    constructor(props) {
        super(props);
    }


    handleChange(index){
        this.setState({
            selectedIndex: index
        });

        if(this.props.onChange){
            this.props.onChange(index);
        }

    }

    render () {
        this.state.selectedIndex = this.props.selectedIndex;
        console.log("tabs index: "   + this.props.selectedIndex);
        let left  =(100/this.props.children.length * this.state.selectedIndex ).toString() + "%";
        let width  =(100/this.props.children.length).toString() + "%";
        let children = this.props.children.map((tab,index)=>{
            return React.cloneElement(tab, {style: {width:width, color:(this.state.selectedIndex == index? "#c33":"#666")}, index: index, onChange: (index)=>this.handleChange(index)},{key:index})
        });

        let lineStyle={
            left: left,
            width:width,
        };

        return (

            <div>
                <div className={Styles.tabs}>
                    {
                        children
                    }
                </div>
                <div className={Styles.lineContainer}>
                    <div className={Styles.line} style={lineStyle}></div>
                </div>
            </div>
        )
    }
}

export default Tabs;

