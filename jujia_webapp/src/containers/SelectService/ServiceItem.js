import React, {Component, PropTypes} from "react";
import Paper from "material-ui/Paper";
import Styles from "./SelectService.scss";
import Dialog from "material-ui/Dialog";
import Common from "../../utils/Common";

class ServiceItem extends Component {
    static propTypes = {};

    state = {
        open: false,
    };

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
    }

    setOpen(e) {
        e.preventDefault();
        e.stopPropagation();
        this.setState({open: true});
        return false;
    }

    setClose() {
        this.setState({open: false});
    }

    goTo() {
        this.context.router.push("/home2");
    }

    order(e, proid) {
        var item = this.props.item;
        let type = item.busi_type;
        let group = item.pro_group_category;
        let proName = item.proname;
        e.preventDefault();
        e.stopPropagation();
        console.log(proid);
        if (proName == "微镀晶洗车套餐") {
            this.context.router.push("/buyPackage");
            return
        }
        if (group == "wash") {
            if (type == 1) {
                this.context.router.push("/order?proid=" + proid);
            }
            if (type == 2) {
                this.context.router.push("/orderStation?proid=" + proid);
            }
            return
        }
        this.context.router.push("/orderPhone?cateName=" + item.proname + "&type=" + group)
    }

    gotoUrl(e, url) {
        e.stopPropagation();
        e.preventDefault();
        this.context.router.push(url);
    }

    render() {
        const {item} = this.props;
        let busiType = item.busi_type;
        // let image = require("../../static/images/" + this.props.item.thumbnail_name);
        let image = "./images/selectService/" + this.props.item.thumbnail_name;
        let storekey;
        let hasCoupon;
        let priceContent;
        let show_server_desc = [];
        let show_server_point = [];
        let detailContents = [];
        let detailShow = [];
        var server_point = [];
        var server_desc = [];
        var spread = [];
        if (item.server_point) {
            server_point = item.server_point.split("，");
        }
        if (item.server_desc) {
            server_desc = item.server_desc.split("；");
        }
        //server_desc.splice(server_desc.length - 1);
        //console.log(item.is_storekey);
        if (item.is_storekey) {
            storekey = <i className={"icon iconfont " +Styles.key}>&#xe60e;</i>
        }
        if (item.owner_couponid > 0) {
            hasCoupon = <p className={Styles.hasCoupon}>有券可用</p>
        }
        server_point.map((element, i)=> {
            return show_server_point.push(<div key={++i+ "point"} className={Styles.server_desc_content}><i
                className={"icon iconfont " +Styles.servericon}>&#xe610;</i><span
                className={Styles.server_desc}>{element}</span></div>);
        });
        server_desc.map((element, i)=> {
            return show_server_desc.push(<div key={++i+ "desc"} className={Styles.server_desc_content}><i
                className={"icon iconfont " +Styles.servericon}>&#xe610;</i><span
                className={Styles.server_desc}>{element}</span></div>);
        });

        if (item.coupon_amount || item.promotionPrice) {
            var originPrice = <div className={Styles.proprice}><span
                className={Styles.priceSign}>￥</span>{item.originPrice}</div>
        }

        var curPrice = item.originPrice;
        if (item.promotionPrice) {
            curPrice = item.promotionPrice;
        }
        //curPrice = curPrice - item.coupon_amount;
        // 浮点相减避免出现多位小数
        curPrice = Common.decNum(curPrice, item.coupon_amount);

        if (curPrice < 0)curPrice = 0;
        var currentPrice = <div className={Styles.price}><span className={Styles.priceSign}>￥</span>{curPrice}</div>

        if (item.pro_group_category == "wash") {
            if (item.promotionPrice) {
                priceContent = <div className={Styles.priceConetnt}>
                    <span className={Styles._extendPrice}>推广价:</span>
                    <span className={Styles.extendPrice}><span className={Styles.priceSign}>￥</span>{curPrice}</span>
                </div>
            } else {
                priceContent = <div className={Styles.priceConetnt}>
                    {currentPrice}
                    {originPrice}
                </div>
            }
        }

        if (item.busi_type == 1) {
            detailShow.push(<label className={Styles.pronameWrap}><span className={Styles.proname}
                                                                        onTouchTap={(e)=>this.setOpen(e)}>{item.proname}</span>
                <div className={Styles.detail}
                     onTouchTap={(e)=>this.setOpen(e)}>详情
                </div>
            </label>)
        } else {
            detailShow.push(<label className={Styles.pronameWrap}><span className={Styles.proname}>{item.proname}</span>
            </label>)
        }

        if (item.proname == "微镀晶内外洗" ) {
              spread = <div className={Styles.spread} onTouchTap={(e)=>{this.gotoUrl(e,"/buyPackage")}}>
                <i className={"icon iconfont "+Styles.fire}>&#xe625;</i><span className={Styles.content}>59元洗车卡，内外洗仅需25元/次</span>
                <span className={Styles.buy}>购买套餐<i className={"icon iconfont " +Styles.arrow}>&#xe628;</i></span>
            </div>
        }
        if(item.proname == "釉蜡内外洗"){
            spread = <div className={Styles.spread} onTouchTap={(e)=>{this.gotoUrl(e,"/buyPackage")}}>
                <i className={"icon iconfont "+Styles.fire}>&#xe625;</i><span className={Styles.content}>59元洗车消毒卡，送3次内外洗</span>
                <span className={Styles.buy}>购买套餐<i className={"icon iconfont " +Styles.arrow}>&#xe628;</i></span>
            </div>
        }
        if (this.state.open) {
            detailContents.push(
                <Dialog
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
            )
        }
        return (
            <Paper zDepth={1}>
                <div className={Styles.paper} onTouchTap={(e)=>this.order(e,item.proid)}>
                    <div className={Styles.thumbnail}>
                        <img src={image} className="img-block"/>
                    </div>
                    <div className={Styles.content}>
                        {detailShow}
                        <div onTouchTap={(e)=>this.order(e,item.proid)}>
                            {priceContent}
                            <p>
                                <span className={Styles.taketime}>{item.needtime}分钟</span>
                                {storekey}
                            </p>
                            <p className={Styles.desc}>{item.prodescribe}</p>
                            {hasCoupon}
                        </div>
                    </div>
                </div>
                {spread}
                {detailContents}
            </Paper>
        )
    }

}

export default ServiceItem;
