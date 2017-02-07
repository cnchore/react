import React,{Component,PropTypes} from "react";
import Styles from "./Order.scss";
import Dialog from "material-ui/Dialog";
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";
import Loader from "../../components/Loader/Loader";
import WeiXin from "../../utils/WeiXin";
import Snackbarx from "../../components/Snackbarx/Snackbarx";

class Pay extends Component {
    state = {
        confirm: {
            title: "",
            open: false,
            actions: [],
            msg: ""
        },
        msg: {show: false, msg: ""},
        showLoading: false,

    };

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };


    constructor(props) {
        super(props);
    };

    handleMsgClose() {
        var msg = this.state.msg;
        msg.show = false;
        this.setState({msg});
    }

    showMsg(text) {
        var msg = this.state.msg;
        msg.show = true;
        msg.msg = text;
        this.setState({msg});
    }

    validate() {
        var order = this.props.order;
        var msg = "";
        if (!order.phone || order.phone.length != 11) {
            msg = "请输入11位的手机号！";
        } else if (!order.carnum || (order.carnum.indexOf("无牌") < 0 && order.carnum.length != 7)) {
            msg = "请输入7位的车牌号！";
        } else if (!order.parkspotid && !order.parkname) {
            msg = "请输入停车位！";
        }
        if (msg) {
            this.showMsg(msg);
        }
        return !msg;
    }

    getPpids() {
        var ppidArr = [];
        ppidArr.push(this.props.data.mainPro.ppid);
        this.props.data.childPros.forEach(x=> {
            if (x.isSelected && x.ppid) {
                ppidArr.push(x.ppid);
            }
        });
        this.props.data.supplyPros.forEach(x=> {
            if (x.isSelected && x.ppid) {
                ppidArr.push(x.ppid);
            }
        });
        return ppidArr.join();
    }


    pay() {
        if (!this.validate()) {
            return false;
        }
        this.setState({showLoading: true});
        var ppids = this.getPpids();
        var phone = this.props.order.phone;
        var carnum = this.props.order.carnum.indexOf("无牌") > -1 ? this.props.order.noneCarnum : this.props.order.carnum;
        var parkspotid = this.props.order.parkspotid;
        var remark = this.props.order.remark;
        var ocids = this.props.order.ocids.join();
        if (!ocids) {
            ocids = "0";
        }
        var areaid = this.props.order.areaid;
        var stationid=this.props.order.stationid;
        var busi_type=this.props.order.busi_type;
        var car_transfer_type=this.props.order.car_transfer_type;
        var priority_level=this.props.order.priority_level;
        var paytype = this.props.order.paytype;
        var mainProid = this.props.data.mainPro.proid;
        if (this.props.selectedArea) {
            areaid = this.props.selectedArea.areaid | 0;
        }
        var parkspotname = this.props.order.parkname;
        var is_take_tomorrow  = this.props.order.is_take_tomorrow?"1":"0";
        this.props.createOrder(mainProid, ppids, phone, carnum, parkspotid, remark, paytype, ocids, areaid,stationid,busi_type,car_transfer_type,priority_level, parkspotname,is_take_tomorrow).then((res)=> {
            this.parsePayBack(res);
        });
    }

    parsePayBack(res) {
        var self=this;
        if (!res.body.status) {
            switch (res.body.state) {
                case 3:
                    this.setState({showLoading: false});
                var confirm = this.state.confirm;
                confirm.msg = "余额不足，是否用微信支付？";
                confirm.actions = [
                    <FlatButton
                        label="支付"
                        primary={true}
                        onTouchTap={()=>{
                            confirm.open = false;
                            confirm.msg = "";
                            confirm.actions = [];
                            this.setState({confirm});
                            var order = this.props.order;
                            var paytype = "12";
                            order.orderid = res.body.data.orderid;
                            this.setState({showLoading: true});
                            var ocids = order.ocids.join() ;
                            if(!ocids){
                                ocids = "0";
                            }
                            this.props.pay(order.orderid,paytype,ocids).then((res)=>{
                                this.setState({showLoading: false});
                                this.parsePayBack(res);
                            });
                        }}
                    />,
                    <FlatButton
                        label="取消"
                        primary={true}
                        onTouchTap={()=>{
                            confirm.open = false;
                            confirm.msg = "";
                            confirm.actions = [];
                            this.setState({confirm});
                            this.setState({showLoading:false});
                        }}
                    />
                ];
                confirm.open = true;
                this.setState({confirm});
                break;
            case 5:
                WeiXin.pay(res.body.data.prepay_id).then(()=> {
                this.setState({showLoading: false});
                if (this.props.hasKey) {
                    this.context.router.push("/savekey?orderid=" + res.body.data.orderid  +"&from=order");
                } else {
                    this.context.router.push("/waitService?orderid=" + res.body.data.orderid + "&from=order");
                }
            }, ()=> {
                this.setState({showLoading: false});
            });
            break;
        default:
            this.showMsg(res.body.msg);
            this.setState({showLoading: false});
        break;
            }

        } else {
            if (res.body.state == 4) {
                this.setState({showLoading: false});
                if (this.props.hasKey) {
                    this.context.router.push("/savekey?orderid=" + res.body.data.orderid + "&from=order");

                } else {
                    this.context.router.push("/waitService?orderid=" + res.body.data.orderid +"&from=order");
                }
            }
        }
    }


    render() {
        const {order}=this.props;
        var fininshTime=[];
        if(order.busi_type=="1"){
            fininshTime.push( <span className={Styles.payLeftSecondary}
                                    style={order.estFinishTime?{display:"inline-block" }: {display:"none"}}>
                            (预计{order.estFinishTime}前完工)
                        </span>)
        }
        return (
            <div ref="paySection" className={Styles.pay}>
                <Loader show={this.state.showLoading}/>
                <div className={Styles.payLeft}>

                    <p >
                        <span className={Styles.payLeftPrimary}>
                            总<span className="spacing1"></span>价：{order.totalAmount.toFixed(2)}元
                        </span>
                        <span className={Styles.payLeftSecondary}>
                            (优惠：￥{order.totalPreferential.toFixed(2)})
                        </span>
                    </p>
                    <p>
                        <span className={Styles.payLeftPrimary}>
                            总耗时：{order.totalMinute}分钟
                        </span>
                        {fininshTime}
                    </p>
                </div>
                <div className={Styles.payRight}>
                    <div className={Styles.payButton}>
                        <RaisedButton ref="pay" label="支   付" className={Styles.payButton} labelColor={"#D32F2F"}
                            onTouchTap={()=>this.pay()}/>
                    </div>
                </div>
                <Snackbarx
                    open={this.state.msg.show}
                    message={this.state.msg.msg}
                    autoHideDuration={4000}
                    onRequestClose={()=>this.handleMsgClose()}
                />
                <Dialog
                    title={this.state.confirm.title}
                    actions={this.state.confirm.actions}
                    modal={true}
                    open={this.state.confirm.open}
                >
                    {this.state.confirm.msg}
                </Dialog>

            </div>

        );
    }
}

export default Pay;

