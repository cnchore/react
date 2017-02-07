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
import styles from './takeKey.scss';
/*导入样式*/
import keyCabinetImg from './images/tu.png';
import FontIcon from 'material-ui/FontIcon';
/*导入字体图标*/

import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as TakeKeyActions from "../../redux/modules/TakeKey/action";
import Common from "../../utils/Common";
import Loader from "../../components/Loader/Loader";
import BaseComponent from "../../components/BaseComponent/BaseComponent";
import KeyBoxImg from './KeyBoxImg';
import ZoomPicture from '../../components/ZoomPicture/ZoomPicture'

@connect(
    state=>({
        getOrderInfoState: state.getOrderInfo,
        getKeyCodeState: state.getKeyCode,
        getNewKeysCodeState: state.getNewKeysCode
    }),
    TakeKeyActions
)
class TakeKey extends Component {
    static propTypes = {};
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };
    state = {
        keyCabinets: [],
        imgUrl: "",
        orderState: 0,
        isOpen:false
    };

    /**
     * [goToIndex 返回首页]
     * @return {[type]} [description]
     */
    goToIndex() {
        this.context.router.push('/home2');
    }

    constructor(props) {
        super(props);
    }

    /**
     * 组件加载时自动执行
     */
    componentWillMount() {
        console.log("TakeKey组件加载时执行!!!");
        this.loadOrderInfo();
    }

    /**
     * 加载订单信息
     */
    loadOrderInfo() {
        this.setState({showLoading: true});
        var orderid = Common.getParameterByName("orderid");
        this.setState({orderid: orderid});
        this.props.getOrderInfo(orderid, "5,6,7,9,10").then(res=> {
            console.log(res);
            this.initOrderInfo(res.body[0], orderid);
            this.autoLoadNewKeyCode();
        });
    }

    /**
     * 初始化订单信息
     */
    initOrderInfo(data, orderid) {
        var keyCabinets = [];
        var temp = {};
        temp.name = data.kcaddress;
        keyCabinets.push(temp);
        this.setState({keyCabinets: keyCabinets, orderState: data.state});
        this.setState({imgUrl: "http://jujia.ctauto.cn/attachments/2016-03/42dd3224-c890-49d2-889b-302469c13ea9.png"});
        this.loadKeyCode(data.cellid, 2, orderid);
    }

    /**
     * 加载钥匙码
     */
    loadKeyCode(cellid, keytype, orderid) {
        this.props.getKeyCode(cellid, keytype, orderid).then(res=> {
            console.log(res);
            var qrString = res.body.data + orderid;
            this.setState({qrCode: qrString});
            var self = this;
            setTimeout(function () {
                self.setState({showLoading: false});
            }, 1000);
        });
    }

    /**
     * 自动加载最新钥匙码(轮询)
     */
    autoLoadNewKeyCode() {
        var self = this;
        var setGetState = setInterval(function () {
            self.props.getNewKeysCode(2, self.state.orderid).then(res=> {
                console.log(res);
                if (res.body.data) {
                    if (res.body.data.ifusing == 1) {
                        clearInterval(setGetState);
                        setGetState = null;
                        if (self.state.orderState == 9) {
                            self.context.router.push('/serviceEvaluate?orderid=' + self.state.orderid);
                        } else {
                            self.context.router.push('/orderList');
                        }
                    }
                }
            });
        }, 10000);
    }

    goToOrderDetail() {
        this.context.router.push('/orderDetail?orderid='+this.state.orderid);
    }

    zoomPicture(isOpen) {
        this.setState(
            {
                isOpen: isOpen
            }
        )
    }

    render() {
        var self=this;
        const {qrCode,imgUrl}=this.state;
        var keyCabinets = [];
        var lastKeyCabinet = null;
        this.state.keyCabinets.map(function (keyCabinet, i) {
            if (keyCabinet.name !== lastKeyCabinet) {
                keyCabinets.push(<ListItem key={i}
                                           style={{marginLeft:'-60px'}}
                                           leftAvatar={<KeyBoxImg url={imgUrl} className={styles.leftIcon} index={1}  zoomPicture={self.zoomPicture.bind(self)}/>}
                                           primaryText={"离您最近的钥匙柜"}
                                           secondaryText={<p><span className={styles.content}>{keyCabinet.name}</span><br/><i className="icon iconfont">&#xe620;</i><span className={styles.end}>点击放大</span></p>}
                                           secondaryTextLines={2} className={styles.title}/>);
                keyCabinets.push(<Divider inset={true} className={styles.line}/>);
            }
            lastKeyCabinet = keyCabinet.name;
        });
        return (
            <BaseComponent>
                <div className={styles.takeKeyBg}>
                    <Loader show={this.state.showLoading}/>
                    <Stepper currentStep={5}/>
                    <div className={styles.qrcode}>
                        <div>凭此二维码到钥匙柜取回钥匙</div>
                        <QRCode size={200} value={qrCode}/>
                        <div>开柜二维码</div>
                        <div className={styles.goHome} onTouchTap={()=>this.goToOrderDetail()}>查看订单详情</div>
                    </div>
                    <Divider inset={true} className={styles.line}/>
                    <List className={styles.list}>
                        {keyCabinets}
                    </List>
                    <ZoomPicture
                        src={imgUrl}
                        isOpen={this.state.isOpen}
                    />
                </div>
            </BaseComponent>
        )
    }
}

export default TakeKey;
