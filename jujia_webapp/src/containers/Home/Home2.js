/**
 * Created by Administrator on 2016/9/1.
 */
import React, { Component, PropTypes } from 'react';
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import { Link } from 'react-router';
import BottomTab from '../../components/BottomTab/BottomTab';
import BaseComponent from "../../components/BaseComponent/BaseComponent";
import ImageGallery from 'react-image-gallery';
import Slider from 'react-slick';
import bottomBag from './image/bottomBag.png';
import maintain from './image/maintain.png';
import repair from './image/repair.png';
import washCar from  './image/washCar.png';
import service1 from './image/service1.png';
import service2 from './image/service2.png';
import service3 from './image/service3.png';
import service4 from './image/service4.png';
import service5 from './image/service5.png';
import service6 from './image/service6.png';
import banner1 from './image/banner1.png';
import banner2 from './image/banner2.png';
import banner3 from './image/banner3.png';
import homeTips from '../../components/UpdataTips/images/homeTips.png'
import styles from './Home2.scss';
import "../../../node_modules/react-image-gallery/src/image-gallery.scss";
import {connect} from 'react-redux';
import Common from "../../utils/Common";
import *as HomeAction from'../../redux/modules/Home/action';
import HomeWashTips from  '../../components/UpdataTips/HomeWashTips'

@connect(
    state=>({}),
    HomeAction
)

export default class Home2 extends Component {
    static propTypes = {};
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };
    state = {
        homeTipId: null,
        homeTip: false,
        tipOpen: false,
        tipContainer: "",
        showDays: 0,
        days: ""

    };
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.getLastWashDays();
        this.getVersionInfo();
        //this.getPromptInfo();
        //this.getBanner();
    }

    componentDidMount() {
        document.getElementsByClassName("image-gallery-bullets")[0].style.cssText = "bottom:0px";//设置banner图上点的样式
        //var bulletsContainer=document.getElementsByClassName("image-gallery-bullets-container");
        //for(var i=0;i<bulletsContainer.length;i++){
        //    console.log(bulletsContainer[i].style);
        //    bulletsContainer[i].style.boxShadow="none !important";
        //}
    }

    /**
     * 获取最近洗车天数
     */
    getLastWashDays() {
        this.props.getLastWashDays().then(res=> {
            if (res.body.status) {
                var data = res.body.data;
                this.setState({days: data.LastWashDays})
                if (data.LastWashDays > 0) {
                    this.setState({showDays: 1})
                } else {
                    this.setState({showDays: 3})
                }
            } else {
                this.setState({showDays: 2})
            }
        })
    }

    /**
     * 获取版本信息
     */
    getVersionInfo() {
        this.props.getVersionInfo().then(res=> {
            if (res.body.status) {
                this.setState({tipOpen: true, tipContainer: res.body.data.upgrade_content});
            }
        })
    }

    getBanner() {
        this.props.getBanner().then(res=> {
            console.log(res)
        })
    }

    /**
     * 获取配置提示信息
     * @param name
     */
    getPromptInfo(name) {
        this.props.getPromptInfo(name).then(res=> {
            console.log(res);
            if (res.body.status) {
                this.setState({homeTipId: res.body.data.id, homeTip: true})
            }
        })
    }

    /*addPromptLog(){
     this,props.editPromptLog(){}
     }*/

    changeTipsOpen() {
        this.setState({homeTip: false});
        this.props.editPromptLog();//添加配置提示信息
    }

    /**
     * 跳转路由
     * @param e
     * @param url
     */
    gotoUrl(e, url) {
        e.stopPropagation();
        e.preventDefault();
        this.context.router.push(url);
    }

    /**
     * 注册车业办理事件
     * @param e
     */
    businessTouch(e) {
        e.stopPropagation();
        e.preventDefault();
        window.location.href = 'http://banli.cx580.com/QuickQuery/Default.aspx?userType=changtuqiche2016';
    }

    /**
     * 注册更新提示事件
     * @param e
     */
    tipsTouch(e) {
        e.stopPropagation();
        e.preventDefault();
        this.setState({tipOpen: false});
        this.props.editVersionLog();//添加版本信息
        this.getPromptInfo("home_v4");
    }

    /**
     * 构建单独的图片
     * @param item
     * @returns {XML}
     * @private
     */
    _renderItem(item) {

        return (
            <div className='image-gallery-image'>
                <a href={item.url}>
                    <img
                        src={item.original}
                    />
                </a>
            </div>
        )
    }

    render() {
        var showDaysContent = [];
        var versionTipContent = [];
        var homeTipContent = [];
        var tipContainer = [];
        var clonePicContent = [];
        var tipArray = this.state.tipContainer.split("、");
        const images = [
            {
                original: "./images/home/banner1.png",
                renderItem: this._renderItem.bind(this),
                url: "/addNewUSer"

            },
            {
                original: "./images/home/banner2.png",
                renderItem: this._renderItem.bind(this),
                url: "/buyPackage"
            },
            {
                original: "./images/home/banner3.png",
                renderItem: this._renderItem.bind(this),
                url: "/banner3"
            }
        ];
        const scStyle1 = {
            background: "url(" + './images/home/washCar.png' + ") no-repeat",
            backgroundSize: "100% 100%"
        };
        const scStyle2 = {
            background: "url(" + "./images/home/maintain.png" + ") no-repeat",
            backgroundSize: "100% 100%"
        };
        const scStyle3 = {
            background: "url(" + "./images/home/repair.png" + ") no-repeat",
            backgroundSize: "100% 100%"
        };
        const wpStyle1 = {
            background: "url(" + "./images/home/service1.png" + ") no-repeat",
            backgroundSize: "100% 100%"
        };
        const wpStyle2 = {
            background: "url(" + "./images/home/service2.png" + ") no-repeat",
            backgroundSize: "100% 100%"
        };
        const wpStyle3 = {
            background: "url(" + "./images/home/service3.png" + ") no-repeat",
            backgroundSize: "100% 100%"
        };
        const wpStyle4 = {
            background: "url(" + "./images/home/service4.png" + ") no-repeat",
            backgroundSize: "100% 100%"
        };
        const wpStyle5 = {
            background: "url(" + "./images/home/service5.png" + ") no-repeat",
            backgroundSize: "100% 100%"
        };
        const wpStyle6 = {
            background: "url(" + "./images/home/service6.png" + ") no-repeat",
            backgroundSize: "100% 100%"
        };
        tipContainer.push(
            tipArray.map((tipItem)=> {
                return (
                    <li>{tipItem}</li>
                )
            })
        );
        const actions = [
            <FlatButton
                label="知道了"
                onTouchTap={(e)=>{this.tipsTouch(e)}}
                labelStyle={{
                    color:"#cc3333"
                }
                }
            />

        ];
        if (this.state.tipOpen) {
            versionTipContent.push(
                <Dialog
                    title="版本更新"
                    actions={actions}
                    modal={false}
                    open={this.state.tipOpen}>
                    <ol>
                        {tipContainer}
                    </ol>
                </Dialog>)
        }

        if (this.state.homeTip) {
            clonePicContent.push(
                <div className={styles.clonePicContent}>
                    <div className={styles.scPic} style={scStyle1}>
                    </div>
                    <div className={styles.itemName}>
                        洗车美容
                    </div>
                    <div className={styles.arrowContent}>
                        <div className={styles.arrowWrap}>
                            <img src={homeTips} className={styles.arrowTips}/>
                        </div>
                    </div>
                </div>);
            homeTipContent.push(
                <HomeWashTips
                    homeTips={true}
                    changeTipsOpen={this.changeTipsOpen.bind(this)}
                />
            )
        }
        if (this.state.showDays == 1) {
            showDaysContent.push(<div className={styles.lastDay}
                                      onTouchTap={(e)=>{this.gotoUrl(e,'/selectService?cateName=wash')}}>距离上次洗车已<span
                className={styles.days}>{this.state.days}</span>天
            </div>)
        }
        if (this.state.showDays == 2) {
            showDaysContent.push(<div className={styles.lastDay}
                                      onTouchTap={(e)=>{this.gotoUrl(e,'/selectService?cateName=wash')}}>
                您尚未下单洗过车，赶快来体验吧！</div>)
        }
        if (this.state.showDays == 3) {
            showDaysContent.push(<div className={styles.lastDay}
                                      onTouchTap={(e)=>{this.gotoUrl(e,'/selectService?cateName=wash')}}>
                您今天已下过单，继续体验吧！</div>)
        }
        var settings = {
            rtl:true,
            arrows:false,
            autoplay: true,
            speed: 1500,
            vertical: true,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
        }
        return (
            <BaseComponent>
                <div></div>
                <div className={styles.container}>
                    <ImageGallery
                        ref={i => this._imageGallery = i}
                        items={images}
                        lazyLoad={false} //
                        infinite={true}  //
                        slideInterval={3000} //自动播放时间
                        autoPlay={true}   //是否自动播放
                        showBullets={true}  //是否显示
                        showThumbnails={false}  //是否显示缩略图
                        showNav={false}   //是否显示箭头
                    />
                    <div className={styles.serviceWrap}>
                        <div className={styles.titleContent}>
                            <div className={styles.litleIcon}>
                            </div>
                            <span className={styles.title}>热门服务</span>
                        </div>
                        <div className={styles.serviceContent}>
                            <Link className={styles.picContent} to="/selectService?cateName=wash">
                                <div className={styles.scPic} style={scStyle1}>
                                </div>
                                <div className={styles.itemName}>
                                    洗车美容
                                </div>
                            </Link>
                            <Link className={styles.picContent } to="/selectService?cateName=maintain">
                                <div className={styles.scPic} style={scStyle2}>
                                </div>
                                <div className={styles.itemName}>
                                    保养快修
                                </div>
                            </Link>
                            <Link className={styles.picContent} to="/selectService?cateName=repair">
                                <div className={styles.scPic} style={scStyle3}>
                                </div>
                                <div className={styles.itemName}>
                                    漆面修复
                                </div>
                            </Link>
                            {clonePicContent}
                        </div>
                    </div>
                    <div className={styles.wpServiceWrap}>
                        <div className={styles.titleContent}>
                            <div className={styles.litleIcon}>
                            </div>
                            <span className={styles.title}>精选服务</span>
                        </div>
                        <div className={styles.wpServiceContainer}>
                            <div className={styles.wpServiceContent +" "+ styles.wpLine}>
                                <Link className={styles.itemContent} to="/orderPhone?cateName=safety">
                                    <div className={styles.wpPic} style={wpStyle1}>
                                    </div>
                                    <div className={styles.itemName}>
                                        安全检测
                                    </div>
                                </Link>
                                <Link className={styles.itemContent +" "+ styles.itemLine}
                                      to="/orderPhone?cateName=malfunction">
                                    <div className={styles.wpPic} style={wpStyle2}>
                                    </div>
                                    <div className={styles.itemName}>
                                        故障维修
                                    </div>
                                </Link>
                                <Link className={styles.itemContent} to="/orderPhone?cateName=support">
                                    <div className={styles.wpPic} style={wpStyle3}>
                                    </div>
                                    <div className={styles.itemName}>
                                        紧急救援
                                    </div>
                                </Link>
                            </div>
                            <div className={styles.wpServiceContent}>
                                <Link className={styles.itemContent} to="/orderPhone?cateName=assure">
                                    <div className={styles.wpPic} style={wpStyle4}>
                                    </div>
                                    <div className={styles.itemName}>
                                        保险服务
                                    </div>
                                </Link>
                                <div className={styles.itemContent +" "+ styles.itemLine}
                                     onTouchTap={(e)=>{this.businessTouch(e)}}>
                                    <div className={styles.wpPic} style={wpStyle5}>
                                    </div>
                                    <div className={styles.itemName}>
                                        违章查询
                                    </div>
                                </div>
                                <Link className={styles.itemContent} to="/orderPhone?cateName=byCar">
                                    <div className={styles.wpPic} style={wpStyle6}>
                                    </div>
                                    <div className={styles.itemName}>
                                        用品租赁
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <Slider {...settings} className={styles.slider}>
                            <div className={styles.spread} onTouchTap={(e)=>{this.gotoUrl(e,'/buyPackage')}}>洗车套餐更划算,内外洗低至25元/次</div>
                            {showDaysContent}
                        </Slider>
                    </div>
                    <BottomTab/>
                    {versionTipContent}
                    {homeTipContent}
                </div>
            </BaseComponent>
        )
    }
}

