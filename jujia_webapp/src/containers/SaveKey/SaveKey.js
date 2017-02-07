import React, { Component, PropTypes } from 'react';
/*导入React*/
import { Link } from 'react-router';
/*导入路由*/
import QRCode from 'qrcode.react';
/*导入二维码*/
import Stepper from '../../components/Stepper/Stepper';
/*导入进度条*/
import {List,ListItem} from 'material-ui/List';
/*导入列表*/
import Divider from 'material-ui/Divider';
/*导入分割线*/
import Avatar from 'material-ui/Avatar';
/*导入头像*/
import styles from './saveKey.scss';
/*导入样式*/
import keyCabinetImg from './images/tu.png';
import FontIcon from 'material-ui/FontIcon';
/*导入字体图标*/

import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as SaveKeyActions from "../../redux/modules/SaveKey/action";
import Common from "../../utils/Common";
import Loader from "../../components/Loader/Loader";
import Snackbarx from "../../components/Snackbarx/Snackbarx";
import BaseComponent from "../../components/BaseComponent/BaseComponent";
import KeyBoxImg from './KeyBoxImg';
import ZoomPicture from '../../components/ZoomPicture/ZoomPicture'

@connect(
    state=>({
        getOrderInfoState: state.getOrderInfo,
        getFreeKeyCabinetList: state.getFreeKeyCabinetList,
        getNewKeysCodeState: state.getNewKeysCode
    }),
    SaveKeyActions
)
class SaveKey extends Component {
    static propTypes = {};
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    state = {
        msg: {show: false, msg: ""},
        keyCabinets: [],
        isHide: false,
        imgUrl: "",
        show: {},
        qrCode: "",
        isOpen:false
    };

    /**
     * [getMoreKeyCabinet 获取更多钥匙柜]
     * @return {[type]} [description]
     */
    getMoreKeyCabinet() {
        this.setState({isHide: true, showLoading: true});
        this.loadOtherKeyCabinet();
    }

    /**
     * [goToIndex 前往订单详情]
     * @return {[type]} [description]
     */
    goToOrderDetail() {
        this.context.router.push('/orderDetail?orderid='+this.state.orderid);
    }

    constructor(props) {
        super(props);

    }

    /**
     * 组件加载时自动执行
     */
    componentWillMount() {
        this.loadOrderInfo();
        console.log("SaveKey组件加载时执行!!!");
    }

    componentDidMount() {

    }

    /**
     * 加载订单信息
     */
    loadOrderInfo() {
        this.setState({showLoading: true});
        var orderid = Common.getParameterByName("orderid");
        var from = Common.getParameterByName("from");
        if (from === "order") {
            this.showMsg("支付成功");
        }
        this.setState({orderid: orderid});
        this.props.getOrderInfo(orderid, 1).then(res=> {
            console.log(res.body);
            this.initOrderInfo(res.body, orderid);
            this.autoLoadNewKeyCode();
        })
    }

    /**
     * 初始化订单信息
     */
    initOrderInfo(data, orderid) {
        var qrString = data.keycode + orderid;
        this.setState({qrCode: qrString});
        this.setState({kcid: data.orderinfo.kcid});
        var keyCabinets = [];
        var temp = {};
        temp.name = data.orderinfo.kcaddress;
        keyCabinets.push(temp);
        this.setState({keyCabinets: keyCabinets});
        this.setState({imgUrl: "http://jujia.ctauto.cn" + data.orderinfo.url})
        var self = this;
        setTimeout(function () {
            self.setState({showLoading: false});
        }, 1000);
    }

    /**
     * 加载其他钥匙柜
     */
    loadOtherKeyCabinet() {
        const {kcid}=this.state;
        this.props.getFreeKeyCabinetList(kcid).then(res=> {
            if (res.body.status) {
                this.initOtherKeyCabinet(res.body.data);
            }
        })
    }

    /**
     * 初始化其他钥匙柜信息
     */
    initOtherKeyCabinet(data) {
        var list = this.state.keyCabinets;
        for (var i = 0; i < data.length; i++) {
            var temp = {};
            temp.name = data[i].kcaddress;
            list.push(temp);
        }
        this.setState({keyCabinets: list});
        var self = this;
        setTimeout(function () {
            self.setState({showLoading: false});
        }, 1000);
    }

    /**
     * 自动加载最新钥匙码(轮询)
     */
    autoLoadNewKeyCode() {
        var self = this;
        var setGetState = setInterval(function () {
            self.props.getNewKeysCode(1, self.state.orderid).then(res=> {
                console.log(res);
                if (res.body.data) {
                    if (res.body.data.ifusing == 1) {
                        clearInterval(setGetState);
                        setGetState = null;
                        self.context.router.push('/waitService?orderid=' + self.state.orderid);
                    }
                }
            });
        }, 10000);
    }

    /**
     * 提示消息
     * @param text
     */
    showMsg(text) {
        var msg = this.state.msg;
        msg.show = true;
        msg.msg = text;
        this.setState({msg});
    }

    handleMsgClose() {
        var msg = this.state.msg;
        msg.show = false;
        this.setState({msg});
    }

    zoomPicture(isOpen) {
        this.setState(
            {
                isOpen:isOpen
            }
        )
    }

    render() {
        const {isHide,imgUrl}=this.state;
        var keyCabinets = [];
        var lastKeyCabinet = null;
        var self=this;
        this.state.keyCabinets.map(function (keyCabinet, i) {
            if (keyCabinet.name !== lastKeyCabinet) {
                keyCabinets.push(<ListItem key={i}
                                           style={{marginLeft:'-60px'}}
                                           leftAvatar={<KeyBoxImg url={imgUrl} className={styles.leftIcon} index={1}  zoomPicture={self.zoomPicture.bind(self)}/>}
                                           primaryText={"离您最近的钥匙柜"}
                                           secondaryText={<p><span className={styles.content}>{keyCabinet.name}</span><br/><i className="icon iconfont">&#xe620;</i><span className={styles.end}>点击放大</span></p>}
                                           secondaryTextLines={2} className={styles.title}/>);
                keyCabinets.push(<Divider key={"divider" + i} inset={true} className={styles.line}/>);
            }
            lastKeyCabinet = keyCabinet.name;
        });
        return (
            <BaseComponent>
                <div className={styles.saveBg}>
                    <Loader show={this.state.showLoading}/>
                    <Stepper currentStep={1} currentStep={2} currentStep={3}/>
                    <div className={styles.qrcode}>
                        <div className={styles.qrcodeMessage}>凭此二维码到钥匙柜存放车钥匙以便及时为您的爱车服务</div>
                        <QRCode size={180} value={this.state.qrCode}/>
                        <div>开柜二维码</div>
                        <div className={styles.goHome} onTouchTap={()=>this.goToOrderDetail()}>查看订单详情</div>
                    </div>
                    <Divider inset={true} className={styles.line}/>
                    <List className={styles.list}>
                        {keyCabinets}
                    </List>
                    <div className={isHide?styles.hide:styles.otherKeyCabinet}
                         onTouchTap={()=>this.getMoreKeyCabinet()}>
                        附近其他钥匙柜<i class="material-icons">﹀</i>
                    </div>
                    <Snackbarx
                        open={this.state.msg.show}
                        message={this.state.msg.msg}
                        autoHideDuration={3000}
                        onRequestClose={()=>this.handleMsgClose()}
                    />
                    <ZoomPicture
                        src={imgUrl}
                        isOpen={this.state.isOpen}
                    />
                </div>
            </BaseComponent>
        )
    }
}

export default SaveKey;
