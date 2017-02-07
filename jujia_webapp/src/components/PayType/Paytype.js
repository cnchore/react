/**
 * Created by Administrator on 2016/7/11.
 */
import React,{Component,PropTypes} from "react";
import Styles from "./PayType.scss";
class Paytype extends Component {
    state = {
        open: false,
        value: "",
        anchorOrigin: {"horizontal": "middle", "vertical": "center"},
        targetOrigin: {"horizontal": "middle", "vertical": "center"}
    };

    constructor(props) {
        super(props);
    };

    handleRequestClose(e) {
        e.stopPropagation();
        e.preventDefault();
        this.setState({open: false});
    }

    handleOpen(e) {
        e.preventDefault();
        this.setState({open: true, anchorEl: e.target});
    }

    handlePay(paytype) {
        this.props.onChange(paytype);
        this.setState({open: false});
    }


    render() {
        const paperStyle = {
            height: 50,
            width: "100%",
            alignItems: "center"
        };

        const {hasCoupon,value,totalAmount} = this.props;
        var paytypeText = "";
        if (hasCoupon) {
            paytypeText = "优惠券"
        }
        if (value == "1") {
            paytypeText += (paytypeText ? "," : "");
            paytypeText += "余额支付";
        } else if (value == "2") {
            paytypeText += (paytypeText ? "," : "");
            paytypeText += "微信支付";
        } else if (value == "12") {
            paytypeText += (paytypeText ? "," : "");
            paytypeText += "余额支付,微信支付";
        }
        if(value=="balance"){
            paytypeText += (paytypeText ? "," : "");
            paytypeText += "余额支付";
        }else if(value=="balanceAnWx"){
            paytypeText += (paytypeText ? "," : "");
            paytypeText += "微信支付";
        }
        return (
            <div className={Styles.PayType}>
                <div className={Styles.orderField} ref="field" onTouchTap={(e)=>this.handleOpen(e)}>
                    {paytypeText}
                </div>
                <div className={this.state.open?Styles.payWayVisible:Styles.payWayHidden} onTouchTap={::this.handleRequestClose}>
                    <div className={this.state.open?Styles.visible:Styles.hidden}>
                        <div className={Styles.choosePayWrapper}>
                            <div className={Styles.splitLine}></div>
                            <span className={Styles.choosePay}>请选择支付方式</span>
                            <div className={Styles.splitLine}></div>
                        </div>
                        <div className={Styles.wxPay} onTouchTap={()=>this.handlePay(2)}>微信支付</div>
                        <div className={Styles.balancePay} onTouchTap={()=>this.handlePay(1)}>余额支付</div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Paytype;
