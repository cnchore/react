/**
 * Created by Administrator on 2016/8/26.
 */
import React, { Component, PropTypes } from 'react';
import redBag from './images/openPacketsBag.png';
import redBtnBag from './images/redBtn.png';

class OpenRedPackets extends Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
    }

    goUserClick(e) {
        e.stopPropagation();
        e.preventDefault();
        this.context.router.push("/user");
    }

    render() {
        const style1 = {
            width: "100%",
            marginBottom:"-10px"
        };

        const style3 = {
            background: "url(" + redBtnBag + ") no-repeat",
            backgroundSize: "100% 100%",
            margin:"0 10%",
            bottom:"20%",
            position:"absolute",
            height:"5rem",
            width:"80%"
        };
        return (
            <div style={{position:"relative"}}>
                <img src={redBag} style={style1}/>
                <div style={style3} onTouchTap={(e)=>{this.goUserClick(e)}}></div>
            </div>
        )
    }
}

export  default OpenRedPackets
