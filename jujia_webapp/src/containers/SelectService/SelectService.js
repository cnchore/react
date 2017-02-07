import React, { Component, PropTypes } from "react";
import ServiceItem from "./ServiceItem";
import Styles from "./SelectService.scss";
import Stepper from '../../components/Stepper/Stepper';
import { connect } from 'react-redux';
import {bindActionCreators} from "redux";
import { Link } from 'react-router';
import * as SelectServiceActions from "../../redux/modules/SelectService/action";
import Loader from "../../components/Loader/Loader";
import BaseComponent from "../../components/BaseComponent/BaseComponent";
import BottomTab from '../../components/BottomTab/BottomTab';
import Common from "../../utils/Common";
// import {
//     Tabs, Tab
// } from 'material-ui/Tabs'
import Tabs from "../../components/Tabs/Tabs";
import Tab from "../../components/Tab/Tab";
// import SwipeableViews from 'react-swipeable-views';
import ReactSwipe from 'react-swipe';
import SelectServiceTips from '../../components/UpdataTips/SelectServiceTips'

@connect(
    state=>({}),
    SelectServiceActions
)


class SelectService extends Component {
    static propTypes = {};

    state = {
        bgIsShow: false,
        slIsShow: false,
        openEvaluate: false,
        evaludateOrderid: 0,
        styleBg1: Styles.defaultShow,
        styleBg2: Styles.defaultHide,
        stationTips: false,
        stationTipsId: null,
        washingTips: false,
        washingTipsId: null,
        imgHeight: {},
        winHeight: {},
        showLoading: true,
        data: [],
        slideIndex: 0,
        proCateArr: [
            {index: 0, name: '上门洗车', code: 'wash', busiType: 1},
            {index: 1, name: '地库站', code: 'wash', busiType: 2},
            {index: 2, name: '保养快修', code: 'maintain', busiType: 3},
            {index: 3, name: '漆面修复', code: 'repair', busiType: 3}
        ]
    };

    constructor(props) {
        super(props);
        this.getMainPros();

        //this.onTouchMove = ::this.onTouchMove;
    }

    componentWillMount() {
        this.getPromptInfo();
        this.washGetPromptInfo("wash_v4");
        let cateName = this.props.location.query.cateName;
        for (var i = 0; i < this.state.proCateArr.length; ++i) {
            if (this.state.proCateArr[i].code == cateName) {
                this.state.slideIndex = i;
                break;
            }
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

    /**
     * 获取配置提示信息
     */
    getPromptInfo() {
        this.props.getPromptInfo("home").then(res=> {
            this.setState({showLoading: false, slIsShow: true});
            if (res.body.status) {
                this.setState({bgIsShow: true});
                this.addPromptLog(res.body.data.id);
                if (this.refs.main) {
                    this.refs.main.addEventListener("touchmove", function (e) {
                        e.preventDefault();
                    });
                }
            }
        })
    }

    /**
     * 添加配置提示信息日志
     * @param id
     */
    addPromptLog(id) {
        console.log(id);
        this.props.editPromptLog(id);
    }

    /**
     * 获取配置提示信息
     * @param name
     */
    washGetPromptInfo(name) {
        this.props.getPromptInfo(name).then(res=> {
            console.log(res);
            if (res.body.status) {
                this.setState({washingTips: true, washingTipsId: res.body.data.id})

            }
        })
    }

    stationGetPromptInfo(name) {
        this.props.getPromptInfo(name).then(res=> {
            console.log(res.body);
            if (res.body.status) {
                this.setState({stationTips: true, stationTipsId: res.body.data.id})
            }
        })
    }

    washingChangeTipsOpen() {
        this.setState({washingTips: false});
        console.log(this.state);
        this.addPromptLog(this.state.washingTipsId);
        this.stationGetPromptInfo("station_v4");
        console.log(this.state);
    }

    stationChangeTipsOpen() {
        this.setState({stationTips: false});
        this.addPromptLog(this.state.stationTipsId);
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

    handleSlideChange(index) {
        console.log("change: " + index);
        if (this.state.slideIndex != index) {
            this.state.slideIndex = index;
            this.setState({
                slideIndex: index
            });
            window.scrollTo(0, 0);
            //this.autoHeightTab(index);
            if (this.refs.reactSwipe.getPos() != index) {
                this.refs.reactSwipe.slide(index, 300);
            }
        }
        setTimeout(()=> {
            var clientHeight = this.refs["service" + index].clientHeight;
            document.getElementsByClassName("react-swipe-container ")[0].style.height = clientHeight + "px";
        }, 500)
    }

    //对tab content 计算动态高度
    autoHeightTab(index) {
        var items = this.state.data.filter((item)=> {
            if (item.pro_group_category == this.state.proCateArr[index].code && item.busi_type == this.state.proCateArr[index].busiType) {
                return item;
            }
        });
        document.getElementById("container").style.height = items.length * 120 + "px";
    }

    bookingClick() {
        this.setState({bgIsShow: false});
    }

    getMainPros() {
        this.props.getMainPros().then(res=> {
            this.setState({showLoading: false, data: res.body.data});
            //this.autoHeightTab(this.state.slideIndex);
            setTimeout(()=> {
                var clientHeight = this.refs["service" + this.state.slideIndex].clientHeight;
                document.getElementsByClassName("react-swipe-container ")[0].style.height = clientHeight + "px";
            }, 500)
        });
    }

    render() {
        // change Swipe.js options by query params
        const swipeOptions = {
            startSlide: this.state.slideIndex,
            auto: 0,
            speed: 300,
            continuous: false,
            callback: (index)=> {
                this.handleSlideChange(index);
            },
            transitionEnd(e) {
            }
        };

        return (
            <BaseComponent>
                <Loader show={this.state.showLoading}/>
                <div >
                    <div className={Styles.tabs}>
                        <Tabs selectedIndex={this.state.slideIndex}
                              onChange={::this.handleSlideChange}>
                            {
                                this.state.proCateArr.map((cate)=> {
                                    return <Tab label={cate.name} value={cate.code} busiType={cate.busiType}
                                                key={cate.index}/>
                                })
                            }
                        </Tabs>
                    </div>
                    <div className={Styles.tabs_content}>
                        <ReactSwipe
                            ref="reactSwipe"
                            swipeOptions={swipeOptions}
                            id="container"
                        >
                            <div ref="service0" className={Styles.item}>
                                {
                                    this.state.data.map(function (item) {
                                        if (item && item.pro_group_category == 'wash' && item.busi_type == 1)
                                            return <ServiceItem key={item.proid} item={item}/>
                                    })
                                }
                            </div>
                            <div ref="service1" className={Styles.item}>
                                {
                                    this.state.data.map(function (item) {
                                        if (item && item.pro_group_category == 'wash' && item.busi_type == 2)
                                            return <ServiceItem key={item.proid} item={item}/>
                                    })
                                }
                            </div>
                            <div ref="service2" className={Styles.item}>
                                {
                                    this.state.data.map(function (item) {
                                        if (item && item.pro_group_category == 'maintain')
                                            return <ServiceItem key={item.proid} item={item}/>
                                    })
                                }
                            </div>
                            <div ref="service3" className={Styles.item}>
                                {
                                    this.state.data.map(function (item) {
                                        if (item && item.pro_group_category == 'repair')
                                            return <ServiceItem key={item.proid} item={item}/>
                                    })
                                }
                            </div>
                        </ReactSwipe>
                    </div>
                </div>
                <SelectServiceTips
                    stationTips={this.state.stationTips}
                    washingTips={this.state.washingTips}
                    stationChangeTipsOpen={this.stationChangeTipsOpen.bind(this)}
                    washingChangeTipsOpen={this.washingChangeTipsOpen.bind(this)}
                />
            </BaseComponent>
        )
    }
}

export default SelectService;
