import React, { Component, PropTypes } from 'react';
//import { connect } from 'react-redux';
import { Link } from 'react-router';
import AppBar from 'material-ui/AppBar';
//import RaisedButton from 'material-ui/RaisedButton';
import BottomTab from '../../components/BottomTab/BottomTab';
import { largeButton, largeButtonLable } from '../config/muiConfig';
import home1 from './image/home1.png';
import home2 from "./image/home2.png";
import Styles from './home.scss';
//import * as LoginActions from '../../redux/modules/Login/action';
//import Login from "../Login/Login";
//import * as BaseComponentActions from '../../redux/modules/BaseComponent/action';
import BaseComponent from "../../components/BaseComponent/BaseComponent";
import ReactGestures from "react-gestures";
import Common from "../../utils/Common";
import * as UserActions from "../../redux/modules/User/action";
import { connect } from 'react-redux';
//import removePhoneScroll from "../../utils/RemovePhoneScroll";

@connect(
    state => ({}),
    UserActions
)

export default class Home extends Component {
    static propTypes = {};
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    state = {
        isShow:false,
        openEvaluate: false,
        evaludateOrderid: 0,
        styleBg1: Styles.defaultShow,
        styleBg2: Styles.defaultHide,
        imgHeight: {},
        winHeight: {}
    };


    constructor(props) {
        super(props);
        this.onTouchMove = ::this.onTouchMove;
        //removePhoneScroll();
    }

    /**
     * 组件加载之前调用
     */
    componentWillMount() {
        this.getPromptInfo();
    }

    /**
     * 组件注销时调用
     */
    componentWillUnmount() {
        if(this.refs.main) {
            this.refs.main.removeEventListener("touchmove", function (e) {
                e.preventDefault();
            })
        }
    }

    /**
     * 组件加载完成时调用
     */
    componentDidMount() {
        const bottomH = 48;
        const winH = document.body.clientHeight;
        this.setState({
            winHeight: `${winH}px`
        });

        this.setState({
            imgHeight: `${winH - bottomH}px`
        });
        setTimeout(()=>this.setState({
            imgHeight: (document.body.clientHeight - bottomH),
            winHeight: document.body.clientHeight
        }), 100);
    }

    onTouchMove(e) {
        e.preventDefault();
    }

    getUsers() {

    }

    /**
     * 获取配置提示信息
     */
    getPromptInfo() {
        this.props.getPromptInfo("home").then(res=> {
            if (res.body.status) {
                this.setState({isShow:true});
                this.addPromptLog(res.body.data.id);
                if(this.refs.main) {
                    this.refs.main.addEventListener("touchmove", function (e) {
                        e.preventDefault();
                    });
                }
            } else {
                this.context.router.push("/selectService");
            }
        })
    }

    /**
     * 添加配置提示信息日志
     * @param id
     */
    addPromptLog(id) {
        this.props.editPromptLog(id);
    }

    handleDown(e) {
        e.stopPropagation();
        e.preventDefault();
        if (this.state.styleBg1 != Styles.upHide) {
            this.state.styleBg1 = Styles.upHide;
            this.setState({styleBg1: Styles.upHide});
            this.setState({styleBg2: Styles.upShow});
        }
    }

    handleUp(e) {
        e.stopPropagation();
        e.preventDefault();
        if (this.state.styleBg1 != Styles.downShow) {
            this.state.styleBg1 = Styles.downShow;
            setTimeout(()=> {
                this.setState({styleBg1: Styles.downShow});
                this.setState({styleBg2: Styles.downHide});
            }, 0);
        }
    }

    render() {
        var homeContainer = [];
        const buttonStyle = Object.assign({}, largeButton, {
            position: 'absolute',
            bottom: '70px'
        });
        const mainStyle = {
            height: this.state.winHeight
        };
        if (this.state.isShow) {
            homeContainer = <ReactGestures
                onSwipeDown={(e)=>{
                        this.handleDown(e)
                    }}
                onSwipeUp={(e)=>{
                        this.handleUp(e)
                    }}

            >
                <div className={Styles.main} ref="main" style={mainStyle}>
                    <div className={this.state.styleBg1} onTouchMove={this.onTouchMove}>
                        <img src={home1} style={{height:this.state.imgHeight}} className="img-block"/>
                    </div>
                    <div className={this.state.styleBg2}>
                        <img src={home2} style={{height:this.state.imgHeight}} className="img-block"/>
                    </div>
                    <Link
                        style={buttonStyle}
                        className={Styles.order}
                        to="/selectService"
                    >
                        预约服务
                    </Link>

                    <BottomTab />
                </div>
            </ReactGestures>
        }
        return (
            <BaseComponent>
                {homeContainer}
            </BaseComponent>
        )

    }

}
