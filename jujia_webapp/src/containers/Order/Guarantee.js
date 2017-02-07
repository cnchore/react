import React,{Component,PropTypes} from "react";
import Styles from "./Order.scss";

class Guarantee  extends Component{
    state = {
   };

    constructor(props){
        super(props);
    };

    render(){
            return(
                <div ref="guarantee" className={Styles.guarantee}>
                        <div className={Styles.content}>
                            <div className={Styles.item}>
                                <div className={Styles.icon}>
                                <i className="icon iconfont">&#xe60a;</i>
                                </div>
                                <div className={Styles.label}>
                                随时取消
                                </div>
                            </div>
                            <div className={Styles.item}>
                                <div className={Styles.icon}>
                                <i className="icon iconfont">&#xe604;</i>
                                </div>
                                <div className={Styles.label}>
                                中途取车
                                </div>
                            </div>
                            <div className={Styles.item}>
                                <div className={Styles.icon}>
                                <i className="icon iconfont">&#xe603;</i>
                                </div>
                                <div className={Styles.label}>
                                无条件返工
                                </div>
                            </div>
                        </div>
                    </div>
                );
    }
}

export default Guarantee;

