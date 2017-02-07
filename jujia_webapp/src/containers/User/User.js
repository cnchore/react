import React, { Component, PropTypes } from 'react';
import BottomTab from '../../components/BottomTab/BottomTab';
/*按钮标签组件*/
import {List,ListItem} from 'material-ui/List';
/*列表组件*/
import Divider from 'material-ui/Divider';
/*分割线组件*/
import Avatar from 'material-ui/Avatar';
/*图标参考该地址:https://design.google.com/icons/*/
import MapsCar from 'material-ui/svg-icons/maps/directions-car';
/*车图标*/
import CommunicationLocationOn from 'material-ui/svg-icons/communication/location-on';
/*位置图标*/
import NavigationRigth from 'material-ui/svg-icons/navigation/chevron-right';
/*右箭头图标*/
import Call from 'material-ui/svg-icons/social/person';
/*电话图标*/
//import Call from 'material-ui/svg-icons/communication/call';/*电话图标*/
import car from './images/car.png'
import customservice from  './images/customservice.png'
import location from './images/location.png'
import active from './images/active.png'
import bg from './images/geren_bg.png';
/*背景图片*/
import styles from './user.scss';
/*样式文件*/
import * as UserActions from "../../redux/modules/User/action";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Loader from "../../components/Loader/Loader";
import BaseComponent from "../../components/BaseComponent/BaseComponent";
import  UpdateTips from "./UpdateTips";

@connect(
    state => ({}),
    UserActions
)
class User extends Component {
    static propTypes = {};
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };
    state = {
        tipOpen: false,
        data: {},
        isShowTip:false,
        topTipText:"为了您的账号安全，请验证您的手机号码！",
        changInterval:{}
    };

    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(props) {
        
    }

    /**
     * 组件加载时自动执行
     */
    componentWillMount() {
        console.log("User组件加载时执行!!!");
        this.getUserInfo();
        this.getVersionInfo();
    }
    /**
     * 组件移除时执行
     */
    componentWillUnmount(){
        clearInterval(this.state.changInterval);
    }

    /**
     * 组件加载完毕后自动执行
     */
    componentDidMount() {
        //console.log("自动加载装逼模式!!!");
    }

    /**
     * [gotoUrl 跳转地址]
     * @param  {[type]} url [请求地址]
     * @return {[type]}     [description]
     */
    gotoUrl(url) {
        this.context.router.push(url);
    }

    /**
     * 获取用户信息
     */
    getUserInfo() {
        this.setState({showLoading: true});
        this.props.getUserInfo().then(res=> {
            if (res.body.status) {
                this.setState({data: res.body.data});
                var self = this;
                setTimeout(function () {
                    self.setState({showLoading: false});
                }, 1000);                           
                if(res.body.data.isPhoneValid==0){
                    this.setState({isShowTip:true});
                    this.textChange();
                }                
            }
        });
    }

    getVersionInfo(){
        this.props.getVersionInfo().then(res=>{
            if(res.body.status){
                this.setState({tipOpen:true});
            }
        })
    }

    changeTipsOpen(){
        this.setState({tipOpen:false});
        this.props.editVersionLog();          
    }

    textChange(){
        var self=this;
        var temp=setInterval(function(){            
            if(self.state.topTipText=="为了您的账号安全，请验证您的手机号码！"){                
                self.setState({topTipText:"验证手机号码，领取<span>300元大礼包</span>！赶快验证吧！"});
            }else{                
                self.setState({topTipText:"为了您的账号安全，请验证您的手机号码！"})
            }            
        },3000);
        this.setState({changInterval:temp});
    }

    createHtml(value){
        return{
            __html:value
        };
    };

    closeTips(){
        this.setState({isShowTip:false});
        clearInterval(this.state.changInterval);
    }

    render() {
        var bgStyle = {
            background: "url(" + bg + ") no-repeat",
            backgroundSize: '100% 100%'
        };
        var carStyles = {
            borderRadius: '0 !important',
            backgroundColor: 'white !important',
            height: '18px',
            width: '23px',
            backgroundSize: '23px !important',
            backgroundPosition: '50% 50% !important',
            backgroundRepeat: 'no-repeat !important'
        };
        var locationStyles = {
            borderRadius: '0 !important',
            backgroundColor: 'white !important',
            height: '24px',
            width: '18px',
            backgroundSize: '16px 20px !important',
            backgroundPosition: '50% 50% !important',
            backgroundRepeat: 'no-repeat !important'
        };
        var serviceStyles = {
            borderRadius: '0 !important',
            backgroundColor: 'white !important',
            height: '24px',
            width: '21px',
            backgroundSize: '16px 20px !important',
            backgroundPosition: '50% 50% !important',
            backgroundRepeat: 'no-repeat !important'
        };

        var activeStyles = {
            borderRadius: '0 !important',
            backgroundColor: 'white !important',
            height: '23px',
            width: '23px',
            backgroundSize: '16px 20px !important',
            backgroundPosition: '50% 50% !important',
            backgroundRepeat: 'no-repeat !important'
        };
        var tipStyle={
            display:this.state.isShowTip?"block":"none"
        };
        return (
            <BaseComponent>
                <div className={styles.topTip} style={tipStyle}>
                    <div className={styles.content} dangerouslySetInnerHTML={this.createHtml(this.state.topTipText)} onTouchTap={::this.gotoUrl.bind(this,"/addNewUSer")}>                        
                    </div>
                    <div className={styles.menu} onTouchTap={::this.closeTips}>
                        <i className={"icon iconfont"}>&#xe60f;</i>
                    </div>
                </div>
                <div className={styles.userBg}>
                    <Loader show={this.state.showLoading}/>
                    <div className={styles.header} style={bgStyle}>
                        <div className={styles.left}>
                            <img className={styles.avatar} src={this.state.data.url}/>
                        </div>
                        <div className={styles.right}>
                            <li className={styles.nickName}>
                                {this.state.data.owname}
                            </li>
                            <li className={styles.phone}>
                                手机：{this.state.data.phone}  <span onTouchTap={::this.gotoUrl.bind(this,this.state.data.isPhoneValid==1?"/modifyPhone":"/addNewUSer")} className={styles.check}>【{this.state.data.isPhoneValid==1?"修改绑定":"验证手机"}】</span>
                            </li>
                        </div>
                    </div>

                    <div className={styles.capital}>
                        <div className={styles.left} onTouchTap={::this.gotoUrl.bind(this,'/MyBalance')}>
                            <a>
                                <div>
                                    ￥<span className={styles.font}>{this.state.data.balance}</span>
                                </div>
                                <div className={styles.label}>我的余额</div>
                            </a>
                        </div>
                        <div className={styles.right} onTouchTap={::this.gotoUrl.bind(this,'/myCoupon')}>
                            <a>
                                <div>
                                    <span
                                        className={styles.font}>{this.state.data.couponCount > 0 ? this.state.data.couponCount + "张" : "暂无"}</span>
                                </div>
                                <div className={styles.label}>我的优惠券</div>
                            </a>
                        </div>
                    </div>
                    <div className={styles.menuList}>
                        <List className={styles.list}>
                            <ListItem primaryText="我的爱车" leftIcon={<Avatar src={car}  style={carStyles} className={
                                styles.backgroundImage
                            }/>}
                                      rightIcon={<NavigationRigth />}
                                      onTouchTap={::this.gotoUrl.bind(this,'/carManager')}/>
                            <Divider inset={true} className={styles.left}/>
                            <ListItem primaryText="我的停车点" leftIcon={<Avatar src={location} style={locationStyles} className={
                                styles.backgroundImage
                            }/>}
                                      rightIcon={<NavigationRigth />}
                                      onTouchTap={::this.gotoUrl.bind(this,'/parkingManager')}/>
                            <Divider inset={true} className={styles.left}/>
                            <ListItem primaryText="我的客服" leftIcon={<Avatar src={customservice} style={serviceStyles} className={
                                styles.backgroundImage
                            }/>}
                                      rightIcon={<NavigationRigth />}
                                      onTouchTap={::this.gotoUrl.bind(this,'/myCustomService')}/>
                            <Divider inset={true} className={styles.left}/>
                        </List>
                    </div>

                    <BottomTab />
                    <UpdateTips
                        tipOpen={this.state.tipOpen}
                        changeTipsOpen={this.changeTipsOpen.bind(this)}
                    />
                </div>
            </BaseComponent>
        );
    };
}

export default User;
