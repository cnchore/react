/**
 * Created by Administrator on 2016/9/13.
 */
import React, { Component, PropTypes } from 'react';

class Banner3 extends Component {
    render() {
        return (
            <div>
                <img src={"./images/home/Convenience.png"}
                     style={{marginBottom:"-10px",width:"100%",background:"#FFF"}}/>
                <a href="/addNewUSer">
                    <div style={{position:"fixed",bottom:"0",textAlign:"center",width:"100%"}}>
                        <img src={"./images/home/Conveniencebtn.png"} style={{width:"80%"}}/>
                    </div>
                </a>
            </div>
        )
    }
}

export default Banner3
