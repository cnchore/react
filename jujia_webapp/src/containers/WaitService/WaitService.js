import React, { Component, PropTypes } from 'react';
import Stepper from '../../components/Stepper/Stepper';//导入进度条
import styles from './WaitService.scss';
import ServiceState from './ServiceState';
import ServiceItem from '../OrderDetail/ServiceItem';
import RegisterInfo from '../OrderDetail/RegisterInfo';
import ServiceTimeBase from './ServiceTimeBase';
import Dialog from 'material-ui/Dialog';

import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as WaitServiceActions from "../../redux/modules/WaitService/action";
import Common from "../../utils/Common";
import Loader from "../../components/Loader/Loader";
import Snackbarx from "../../components/Snackbarx/Snackbarx";
import BaseComponent from "../../components/BaseComponent/BaseComponent";

import WaitState from "./WaitState";

import tishiImg from "./images/tishi.png";

@connect(
    state=>({
        getOrderInfoState:state.getOrderInfo,
		getCancelOrderConfigState:state.getCancelOrderConfig,
		cancelOrderState:state.cancelOrder,
		refundForOrderState:state.refundForOrder,
		addCancelOrderReasonState:state.addCancelOrderReason,
        getRealTimeOrderInfoState:state.getRealTimeOrderInfo
    }),
    WaitServiceActions
)
class WaitService extends Component {
    static propTypes = {

    };

    state = {
        setGetState:null,
        msg:{show:false,msg:""},
        open:false,
        isSelect:false,
        items:[],
        service:[],
        regInfo:{},
        isWait:false,
        selectId:0,
        /*isCurrentDayTake:true,*/
        curState:1,
        hasKey:true,
        hasCabinet:true,
        isNoCabinetOrder:false,
        isUserTakeCar:false,
        isTechTake:false,        
        /*startTime:"14:30",
        currentTime:"15:60",
        endTime:"16:00"*/
    };

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };
	initCancelOrder(){
		var items=this.state.items;
		items.forEach(function(temp){
			temp.selected=false;
		});
		this.setState({items:items});
		this.setState({isSelect:false});
		this.setState({selectId:0});
	}
    constructor(props) {
        super(props);
        this.handleOpen = ::this.handleOpen;
		this.handleClose = ::this.handleClose;
    }
    /**
     * 组件加载时自动执行
     */
    componentWillMount(){
        console.log("WaitService组件加载时执行!!!");
        this.loadOrderInfo();
    }
    /**
     * 加载订单信息
     */
    loadOrderInfo(){
        this.setState({showLoading:true});
        var orderid=Common.getParameterByName("orderid");
        var from=Common.getParameterByName("from");
        if (from==="order"){
            this.showMsg("支付成功！");
        }
        this.setState({orderid:orderid});
        this.props.getOrderInfo(orderid).then(res=>{
            console.log(res.body);
            this.setState({showLoading:false});
            if(res.body.status){
                this.setState({service:res.body.data.service});
                this.initRegInfo(res.body.data.orderInfo);
                this.autoGetRealOrderInfo();
                if(!res.body.data.orderInfo.est_starttime){
                    setTimeout(()=>{
                        this.reloadOrderInfo(orderid);
                    },2000);
                }
            }
        });
    }

    reloadOrderInfo(orderid){
        this.props.getOrderInfo(orderid).then(res=>{
            console.log(res.body);
            if(res.body.status){
                this.setState({service:res.body.data.service});
                this.initRegInfo(res.body.data.orderInfo);
                if(!res.body.data.orderInfo.est_starttime){
                    setTimeout(()=>{
                        this.reloadOrderInfo();
                    },2000);
                }

            }
        });

    }

    

    /**
	 * 初始化登记信息
	 */
	initRegInfo(data){
		var temp={};
		temp.phone=data.phone;
		temp.carnum=data.carnum;
		temp.parking=Common.filterArea(data.parkname);
        temp.address="";
        temp.isShowStation=false;
        temp.isShowPark=true;
        if(data.car_transfer_type==1&&data.busi_type==2){
            temp.address=data.address;            
            temp.isShowPark=true;
            temp.isShowStation=true;
        }
        if(data.car_transfer_type==2&&data.busi_type==2){
            temp.isShowPark=false;
            temp.isShowStation=true;
            temp.address=data.address;
            this.setState({isUserTakeCar:true});
        }
        if(data.cellid>0){
            this.setState({hasKey:true});
        }else{
            this.setState({hasKey:false});
        }
        if(data.is_no_cabinet_order==1){
            this.setState({hasCabinet:true});
        }else{
            this.setState({hasCabinet:false});
        }
		this.setState({regInfo:temp});
        if(data.is_take_tomorrow==1){
            this.setState({isCurrentDayTake:false});
        }else{
            this.setState({isCurrentDayTake:true});
            if(data.state==4){
                this.setState({curState:1});
                this.setState({isWait:true});                
            }else if(data.state==8){
                this.setState({curState:2});
                this.setState({currentTime:Common.formatDateDT(data.startTime).format("hh:mm")});
                this.setState({isWait:false});
            }else if(data.state==9){
                this.setState({curState:3});
                this.setState({currentTime:Common.formatDateDT(data.startTime).format("hh:mm")});
                this.setState({isWait:false});
            }
            this.setState({startTime: (data.est_starttime? Common.formatDateDT(data.est_starttime).format("hh:mm"): "获取中...")});
            this.setState({endTime: (data.est_finishtime? Common.formatDateDT(data.est_finishtime).format("hh:mm"): "")});
        }        
        if(data.is_no_cabinet_order==1){
        	this.setState({isNoCabinetOrder:true});
        }else{
        	this.setState({isNoCabinetOrder:false});
        }
        if(data.busi_type==1&&data.is_no_cabinet_order==0&&data.cellid>0){
            this.setState({isTechTake:true});
        } 
        var self=this;
        setTimeout(function(){
            self.setState({showLoading:false});
        },1000);
	}

    cancelOrder(){
        this.handleOpen();
    }
    goToUrl(e,url){
        e.preventDefault();
        e.stopPropagation();
        this.context.router.push(url);
    }
    handleOpen(){
		this.initCancelOrderConfigData();
		this.initCancelOrder();
		this.setState({open:true});
	}

	handleClose(){
		this.setState({open:false});
		this.setState({isSelect:false});
	}

    selected(item,items){
		var self=this;
		items.forEach(function(temp){
			if(item.id==temp.id){
				temp.selected=true;
				self.setState({selectId:temp.id});
			}else{
				temp.selected=false;
			}
		})
		this.setState({items:items});
		this.setState({isSelect:true});
	}
    /**
     * 确认取消订单
     */
    confirmCancelOrder(){
		if(!this.state.isSelect){
			return;
		}
		const{selectId,orderid}=this.state;
		var self=this;
        self.showLoad();
		this.props.cancelOrder(orderid).then(res=>{
			console.log(res);
			if(res.body!=null&&res.body.state==1){
				this.props.addCancelOrderReason(orderid,selectId).then(res1=>{
					console.log(res1);
				});
				if(res.body.orderstate&&res.body.orderstate==6){
					this.props.refundForOrder(orderid).then(res2=>{
						console.log(res2);
						if(res2.body!=null&&res2.body.state==1){
                            self.hideLoad();
							//self.context.router.push("/orderDetail?orderid="+orderid+" ");
						}
					});
				}else{
                    self.hideLoad();
					//self.context.router.push("/orderDetail?orderid="+orderid+" ");
				}
			}else if(res.body!=null&&res.body.state==0){
				this.showMsg(res.body.errmsg);
				self.hideLoad();
			}
		})
		this.handleClose();
	}
    /**
	 * 初始化取消订单原因配置数据
	 */
	initCancelOrderConfigData(){
		if(this.state.items.length>0){
			return;
		}
		this.props.getCancelOrderConfig().then(res=>{
			if(res.body.status){
				var data=this.filterData(res.body.data);
				this.setState({items:data});
			}
		});
	}
	/**
	 * 过滤数据
	 */
	filterData(data){
		let list=[];
		data.map(function(item){
			var temp=item;
			temp.selected=false;
			list.push(temp);
		});
		return list;
	}
    /**
     * 自动获取实时订单信息
     */
    autoGetRealOrderInfo(){
        const{orderid}=this.state;
        var self=this;
        // this.state.setGetState=setInterval(function(){
        //     self.props.getRealTimeOrderInfo(orderid).then(res=>{
        //         console.log(res);
        //         if(res.body.status){
        //             if(res.body.data.state==9||res.body.data.state==7){
        //                 clearInterval(self.state.setGetState);
        //                 self.state.setGetState=null;
        //                 if(res.body.data.cellid==0){
        //                     self.context.router.push("/orderList");
        //                 }else if(res.body.data.cellid>0){
        //                     self.context.router.push("/takeKey?orderid="+orderid);
        //                 }
        //             }
        //         }
        //     });
        // },10000);
        setTimeout(() => {
            self.props.getRealTimeOrderInfo(orderid).then(res => {
                if (res.body.status) {
                    if (window.location.href.indexOf('wait') >= 0) {
                        if (res.body.data.state == 9 || res.body.data.state == 7) {
                            self.state.setGetState = null;
                            if (res.body.data.cellid == 0) {
                                self.context.router.push("/orderList");
                            } else if (res.body.data.cellid > 0) {
                                self.context.router.push("/takeKey?orderid=" + orderid);
                            }

                        } else {
                            self.autoGetRealOrderInfo();
                        }
                    } 
                }
            });
        }, 5000);
    }

    /**
	 * 显示加载中
	 */
	showLoad(){
		console.log("显示加载中")
		this.setState({showLoading:true});
	}
	/**
	 * 隐藏加载中
	 */
	hideLoad(){
		this.setState({showLoading:false});
	}

    /**
     * 提示消息
     * @param text
     */
    showMsg(text) {
        var self=this;
        var msg = this.state.msg;
        msg.show = true;
        msg.msg = text;
        this.setState({msg});
        setTimeout(function(){
            self.handleMsgClose();
        },3000)
    }

    handleMsgClose() {
        var msg = this.state.msg;
        msg.show = false;
        this.setState({msg});
    }

    componentWillUnmount(){
        clearInterval(this.state.setGetState);
    }

    render() {
        var btnList=[];
        var lblList=[];
        var waitOrCurrent={};
        //var noCabinetInfo={};
        var waitState={};
        var self=this;
        if(this.state.isWait){
            btnList.push(<div key={1} className={styles.unGuide} onTouchTap={::this.cancelOrder}>取消订单</div>);
            btnList.push(<div key={0} className={styles.guide} onTouchTap={(e)=>this.goToUrl(e,'/home2')}>返回首页</div>);
        }else{
            btnList.push(<div key={1} className={styles.unGuide}><a href="tel:400-186-2266" className={styles.contactService}>联系客服</a></div>);
            btnList.push(<div key={0} className={styles.guide} onTouchTap={(e)=>this.goToUrl(e,'/home2')}>返回首页</div>);
        }
        this.state.items.map(function(item,i){
			lblList.push(<span key={i} className={item.selected?styles.active:null} onTouchTap={self.selected.bind(self,item,self.state.items)}>{item.text}</span>)
		});
        const actions=[
            <div>
                <li onTouchTap={this.handleClose}><a>暂不取消</a></li>
                <li onTouchTap={::this.confirmCancelOrder}><a style={self.state.isSelect?{color:"#196FD1"}:{"color":"#ccc"}}>确定取消</a></li>
            </div>
		];
        
        if(this.state.isCurrentDayTake){
            waitOrCurrent=<ServiceTimeBase currentStep={this.state.curState} startTime={this.state.startTime} endTime={this.state.endTime} currentTime={this.state.currentTime} service={this.state.service} hasCabinet={this.state.hasCabinet}/>;    
        }else{
            //waitOrCurrent=<ServiceState onTouchTap={()=>this.goToTakeKey()} isWait={this.state.isWait} />;
            waitOrCurrent=null;
        }
        console.log(this.state.isNoCabinetOrder+","+this.state.isUserTakeCar);
        if((this.state.isNoCabinetOrder||this.state.isUserTakeCar)&&this.state.isWait){
            if(this.state.isNoCabinetOrder){
                waitState=<WaitState isNoCabinetOrder={true} isUserTakeCar={false} isTechTake={false} />
            }
            if(this.state.isUserTakeCar){
                waitState=<WaitState isNoCabinetOrder={false} isUserTakeCar={true} isTechTake={false} />
            }
            
        }else if(this.state.isTechTake&&this.state.isWait){
            waitState=<WaitState isNoCabinetOrder={false} isUserTakeCar={false} isTechTake={true} />
        }else{
            waitState=null;
        }

        /*if(this.state.isNoCabinetOrder){
        	noCabinetInfo=<div className={styles.noCabinetContent}><div className={styles.left}><img src={tishiImg}/></div><div className={styles.right}><span>订单已确认，请您保持电话畅通。</span></div></div>;
        }else{
        	noCabinetInfo=null;
        }*/
        return(
            <BaseComponent>
            <div className={styles.waitService}>
                <Loader show={this.state.showLoading}/>                
                {waitState}
                {waitOrCurrent}
                <ServiceItem  info={this.state.service} />
                <RegisterInfo info={this.state.regInfo} />
                <div className={styles.tempHeight}></div>
                <div className={styles.btn}>
                    {btnList}
                </div>
                <Dialog
					title="订单取消原因"
					modal={false}
					open={this.state.open}
					onRequestClose={this.handleClose}
					titleClassName={styles.dialogTitle}
					contentClassName={styles.lblContent}
					actions={actions}
					actionsContainerClassName={styles.lblBtn}>
					<span>请选择标签</span>
					<div className={styles.content}>
					{lblList}
					</div>
				</Dialog>
                <Snackbarx
                    open={this.state.msg.show}
                    message = {this.state.msg.msg}
                    autoHideDuration={3000}
                    onRequestClose = {()=>this.handleMsgClose()}
                />
            </div>
            </BaseComponent>
        )
    }
}

export default WaitService;
