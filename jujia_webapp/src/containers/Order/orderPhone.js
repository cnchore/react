/**
 * Created by Administrator on 2016/9/8.
 */
import React, { Component, PropTypes } from 'react';
import styles from './orderPhone.scss';
import {connect} from 'react-redux';
import *as AddNewUserAction from'../../redux/modules/AddNewUser/action';

@connect(
    state=>({}),
    AddNewUserAction
)
class OrderPhone extends Component {
    state = {
        haveCheck: false
    };

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    componentWillMount() {
        if(this.props.location.query.cateName=="byCar"){
            this.haveCheckPhone();
        }
    }

    /**
     * 手机是否验证
     */
    haveCheckPhone() {
        this.props.haveCheckPhone().then(res=> {
            if (res.body.status) {
                this.setState({haveCheck:true})
            }
        })
    }

    gotoUrl(e,url){
        e.stopPropagation();
        e.preventDefault();
        this.context.router.push(url);
    }
    render() {
        var telContent = [];
        var btnImg = [];
        var imSrcContent = [];
        var btnSrc = "";
        var cateName = this.props.location.query.cateName;
        var type = this.props.location.query.type;
        let imSrc = "./images/order/" + cateName + ".png";
        if (this.state.haveCheck) {
              btnSrc = "./images/order/" + cateName + "Reservebtn.png";
        } else {
            btnSrc = "./images/order/" + cateName + "btn.png";
        }
        if (cateName == "常规保养") {
            imSrcContent.push(
                <img src={imSrc} className={styles.bag+" "+styles.routine}/>
            )
        } else if (cateName == "轮胎服务") {
            imSrcContent.push(
                <img src={imSrc} className={styles.bag+" "+styles.tire}/>
            )
        } else if (cateName == "byCar") {
            imSrcContent.push(
                <img src={imSrc} className={styles.bag+" "+styles.byCar}/>
            )
        } else if (cateName == "制动系统") {
            imSrcContent.push(
                <img src={imSrc} className={styles.bag+" "+styles.brake}/>
            )
        } else {
            imSrcContent.push(
                <img src={imSrc} className={styles.bag}/>
            )
        }
        if (type == "repair" || type == "maintain") {
            telContent.push(<a href="tel:020-29825820">
                <div className={styles.btnWrap}>
                    <img src={btnSrc} className={styles.telBtn}/>
                </div>
            </a>)
        }
        if (cateName == "safety" || cateName == "malfunction") {
            telContent.push(
                <a href="tel:020-29825820">
                    <div className={styles.btnWrap}>
                        <img src={btnSrc} className={styles.telBtn}/>
                    </div>
                </a>)
        }
        if (cateName == "assure") {
            telContent.push(
                <a href="tel:13632221609">
                    <div className={styles.btnWrap}>
                        <img src={btnSrc} className={styles.telBtn}/>
                    </div>
                </a>)
        }
        if (cateName == "support") {
            telContent.push(
                <a href="tel:4001862266">
                    <div className={styles.btnWrap}>
                        <img src={btnSrc} className={styles.telBtn}/>
                    </div>
                </a>)
        }
        if (cateName == "byCar") {
            if (this.state.haveCheck) {
                telContent.push(
                    <a href="tel:4001862266">
                        <div className={styles.btnWrap+" "+styles}>
                            <img src={btnSrc} className={styles.telBtn}/>
                        </div>
                    </a>
                )
            } else {
                telContent.push(
                    <div className={styles.btnWrap+" "+styles} onTouchTap={(e)=>{this.gotoUrl(e,"/addNewUser")}}>
                        <img src={btnSrc} className={styles.telBtn}/>
                    </div>
                )
            }
        }

        return (
            <div className={styles.container}>
                {imSrcContent}
                {telContent}
            </div>
        )
    }
}

export default OrderPhone
