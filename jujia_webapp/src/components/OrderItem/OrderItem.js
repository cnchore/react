import React, {Component, PropTypes} from "react";
import Checkbox from 'material-ui/Checkbox';
import Styles from "./OrderItem.scss";
import Dialog from "material-ui/Dialog";

class OrderItem extends Component {
    static propTypes = {};

    state = {
        open: false,
        isChecked: false
    };

    constructor(props) {
        super(props);
    };

    setOpen(e) {
        e.preventDefault();
        e.stopPropagation();
        this.setState({open: true});
        return false;
    }

    setClose() {
        this.setState({open: false});
    }

    onCheck() {
        if (this.props.unable) {
            return;
        }
        var isChecked = !this.state.isChecked;
        this.setState({isChecked: isChecked});
        this.props.item.isSelected = isChecked;
        if (this.props.onCheck) {
            this.props.onCheck(isChecked);
        }
    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
        //this.setState({isChecked: this.props.item.isSelected});
    }


    render() {
        const {item, hideCheckBox, onCheck, showPrice,unable} = this.props;
        this.state.isChecked = item.isSelected;
        var checkbox;
        var detail;
        var detailContent;
        var currentPrice;
        var proname;
        var taketime;
        var show_server_desc = [];
        var show_server_point = [];
        if (item.server_point) {
            var server_point = item.server_point.split("，");
            server_point.map((element,i)=> {
                return show_server_point.push(<div key={ ++i + "point"} className={Styles.server_desc_content}><i
                    className={"icon iconfont " +Styles.servericon}>&#xe610;</i><span
                    className={Styles.server_desc}>{element}</span></div>);
            });
        }
        if (item.server_desc) {
            var server_desc = item.server_desc.split("；");
            server_desc.map((element,i)=> {
                return show_server_desc.push(<div key={++i + "desc"} className={Styles.server_desc_content}><i
                    className={"icon iconfont " +Styles.servericon}>&#xe610;</i><span
                    className={Styles.server_desc}>{element}</span></div>);
            });
        }

        if (!hideCheckBox&&unable) {
            if(item.busi_type==1){
                detail = <span className={Styles.detail} onTouchTap={(e)=>this.setOpen(e)}>详情</span>
            }
            detailContent = <Dialog
                modal={false}
                open={this.state.open}
                onRequestClose={::this.setClose}
                autoDetectWindowHeight={false}
                bodyStyle={{overflow:'visible',position:'relative'}}

            >
                <i className={"icon iconfont " +Styles.closeBtn} onTouchTap={::this.setClose}> &#xe627;</i>
                <div className={Styles.iconBag}></div>
                <div className={Styles.detailContent}>
                    <div className={Styles.proname}>{item.proname}</div>
                    <i className={"icon iconfont " +Styles.iconTip}>&#xe611;</i><span
                    className={Styles.tipTitle}>服务项目</span>
                    <div>
                        {show_server_desc}
                    </div>
                    <br/>
                    <i className={"icon iconfont "+Styles.iconTip}>&#xe615;</i><span
                    className={Styles.tipTitle}>服务亮点</span>
                    <div>
                        {show_server_point}
                    </div>
                </div>
            </Dialog>
        }

        if (item.isSelected) {
            checkbox = <span className={Styles.checked}>
                            <i className={"icon iconfont "+Styles.iconChoose} > &#xe612;</i>
                      </span>;
            currentPrice = <div className={Styles.currentPrice}>￥ {item.currentPrice}</div>
        } else {
            checkbox = <span className={Styles.unchecked}>
                            <i className={"icon iconfont "+Styles.iconChoose} > &#xe613;</i>
                      </span>;
            if (showPrice) {
                currentPrice = <div className={Styles.currentPrice}>￥ {item.currentPrice}</div>
            } else {
                currentPrice = <div className={Styles.hidePrice}>￥ {item.currentPrice}</div>
            }
        }

        if (hideCheckBox) {
            checkbox = "";
            currentPrice = <div className={Styles.hidePrice}>￥ {item.currentPrice}</div>
            proname = <span className={Styles.hideName}>
                            {item.proname}
                        </span>
            taketime = <p className={Styles._taketime}>{item.needtime} 分钟</p>
        }
        else {
            proname = <span className={Styles.label}>
                            {item.proname}
                        </span>
            taketime = <p className={Styles.taketime}>{item.needtime} 分钟</p>
        }
        if (item.owner_couponid) {
            var coupon = <span className={Styles.coupon}>券</span>
        }

        if (item.proprice != item.currentPrice) {
            var proprice =
                <div className={Styles.proprice}>￥{item.proprice}</div>
        }

        return (
            <div>
                <div className={Styles.orderItem} onTouchTap={()=>{
                            this.onCheck();
                        }}>
                    <div className={Styles.name}>
                        <label className={Styles.check}>
                            {checkbox}
                            {proname}
                            {detail}
                            {coupon}
                        </label>
                    </div>
                    {taketime}
                    <div className={Styles.priceConetnt}>
                        {currentPrice}
                        {proprice}
                    </div>
                </div>
                {detailContent}
            </div>
        );
    }
}
export default OrderItem;
