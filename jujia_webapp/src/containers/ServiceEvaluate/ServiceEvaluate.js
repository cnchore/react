import React, { Component, PropTypes } from 'react';
import EvalStar from "../../components/EvalStar/EvalStar";
import EvalLabel from "../../components/EvalLabel/EvalLabel";
import TextField from "material-ui/TextField";
import Styles from "./ServiceEvaluate.scss";
import Divider from "material-ui/Divider";
import {List,ListItem} from "material-ui/List";
import Avatar from 'material-ui/Avatar';
import finish from "../../../images/haveFinish.png"
import RaisedButton from "material-ui/RaisedButton";
import {red500,fullWhite,grey300} from "material-ui/styles/colors";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import ensureVisible from "../../utils/EnsureVisible";
import ServiceItem from '../OrderDetail/ServiceItem';

import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as ServiceEvaluateActions from "../../redux/modules/ServiceEvaluate/action";
import Common from "../../utils/Common";
import Loader from "../../components/Loader/Loader";
import Snackbarx from "../../components/Snackbarx/Snackbarx";
import BaseComponent from "../../components/BaseComponent/BaseComponent";

@connect(
    state=>({
        getOrderInfoStaet: state.getOrderInfo,
        addEvaluateState: state.addEvaluate
    }),
    ServiceEvaluateActions
)
class ServiceEvaluate extends Component {
    static propTypes = {};
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    state = {
        msg: {show: false, msg: ""},
        point: 4,
        remark: "",
        service: [],
        open: false
    };

    checkStar(point) {
        ::this.setState({point: point});
    };

    handleClose() {
        this.setState({open: false});
    }

    handleSubmit() {
        this.setState({open: false});
    }

    handleReWork() {
        window.location.href = "tel://400-186-2266";
        //this.setState({open:true});
    }

    /**
     * 提交评价
     */
    handleEval() {
        var labels = Common.getEvaluate(this.state.labels);
        this.props.addEvaluate(this.state.orderid, this.state.point, labels + "。输入评价：" + this.state.remark).then(res=> {
            if (res.body.status) {
                if(this.props.location.query.returnUrl){
                this.context.router.push(this.props.location.query.returnUrl);
                }else{
                this.context.router.push("/orderlist");
                }
            } else {
                this.showMsg(res.body.msg);
            }
        });
    }

    scroll(target) {
        addScrollIfIOS(target);
    }

    constructor(props) {
        super(props);
    }

    /**
     * 组件加载时自动执行
     */
    componentWillMount() {
        console.log("ServiceEvaluate组件加载时自动执行!!!");
        this.loadOrderInfo();
    }

    /**
     * 加载订单信息
     */
    loadOrderInfo() {
        this.setState({showLoading: true});
        var orderid = Common.getParameterByName("orderid");
        this.setState({orderid: orderid});
        this.props.getOrderInfo(orderid).then(res=> {
            console.log(res);
            if (res.body.status) {
                this.setState({service: res.body.data.service});
                var self = this;
                setTimeout(function () {
                    self.setState({showLoading: false});
                }, 1000);
            }
        });
    }

    /**
     * 获取标签内容
     */
    getLabels(list) {
        this.setState({labels: list});
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

    render() {
        var buttonStyle = {
            width: "100%"
        };
        const actions = [
            <FlatButton
                label="算了"
                onTouchTap={::this.handleClose}
            />,
            <FlatButton
                label="提交"
                onTouchTap={::this.handleSubmit}
            />

        ];
        return (
            <BaseComponent>
            <div className={Styles.main}>
                <Loader show={this.state.showLoading}/>
                <div className={Styles.finish}>
                    <List>
                        <ListItem
                            leftIcon={<Avatar src={finish} className={Styles.finishIcon}style={{height:'50px',width:'50px',top:'3px',backgroundRepeat: 'no-repeat',backgroundSize: '100% 100%'
}} />}
                            primaryText="服务已完成"
                            secondaryText="感谢您选择畅途居家养车"
                        />
                    </List>
                </div>
                <ServiceItem info={this.state.service}/>
                <div className={Styles.evalMain}>
                    <div className={Styles.title}>服务评价</div>
                    <EvalStar checkedCount={this.state.point} onChecked={::this.checkStar}/>
                    <EvalLabel point={this.state.point} getLabels={this.getLabels.bind(this)}/>
                    <div className={Styles.remark}>
                        <TextField
                            value={this.state.remark}
                            onChange={(e)=>this.setState({remark:e.target.value})}
                            fullWidth={true}
                            hintText="写点评论"
                            onFocus={(e)=>ensureVisible(e.target,this)}
                            multiLine={true}
                            rows={1}
                            rowsMax={4}
                        />
                    </div>
                </div>
                <div className={Styles.footer}>
                    <div className={Styles.buttons}>
                        <RaisedButton
                            label="提 交 评 价"
                            backgroundColor={red500}
                            labelColor={fullWhite}
                            style={buttonStyle}
                            fullWidth={true}
                            onTouchTap={::this.handleEval}
                        />

                    </div>
                    <div className={Styles.buttons}>
                        <RaisedButton
                            label="联 系 客 服"
                            labelColor={grey300}
                            fullWidth={true}
                            style={buttonStyle}
                            onTouchTap={::this.handleReWork}
                        />

                        <Dialog
                            title="要求返工"
                            actions={actions}
                            modal={false}
                            open={this.state.open}
                            onRequestClose={this.handleClose}
                        >
                            提交申请后，客服会尽快与您联系返工事宜。
                        </Dialog>
                    </div>
                </div>
                <Snackbarx
                    open={this.state.msg.show}
                    message={this.state.msg.msg}
                    autoHideDuration={3000}
                    onRequestClose={()=>this.handleMsgClose()}
                />
            </div>
            </BaseComponent>
        )
    }
}

export default ServiceEvaluate;
