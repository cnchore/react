import React, { Component, PropTypes } from 'react';
import OrderState from './OrderState';
import ServiceItem from './ServiceItem';
import RegisterInfo from './RegisterInfo';
import OrderInfo from './OrderInfo';
import EvaluateInfo from './EvaluateInfo';
import CarProblem from './CarProblem';
import OrderBtn from './OrderBtn';
import styles from './OrderDetail.scss';
import one from './images/1.jpg';

import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as OrderDetailActions from "../../redux/modules/OrderDetail/action";
import Common from "../../utils/Common";
import Loader from "../../components/Loader/Loader"; 
import BaseComponent from "../../components/BaseComponent/BaseComponent";

@connect(
	state=>({
		getOrderInfoState:state.getOrderInfo,
		getEvaluateInfoState:state.getEvaluateInfo,
		getCarProblemState:state.getCarProblem,
		getCancelOrderConfigState:state.getCancelOrderConfig,
		cancelOrderState:state.cancelOrder,
		refundForOrderState:state.refundForOrder,
		addCancelOrderReasonState:state.addCancelOrderReason
	}),
	OrderDetailActions
)
class OrderDetail extends Component {

	state = {
        filterArea: Common.filterArea,
		service:[],
		regInfo:{},
		orderInfo:{},
		evalInfo:{
			/*score:5,
			labels:"洗得很干净 | 速度超级快 | 师傅很细心",
			text:"棒棒哒一百分棒棒哒一百分棒棒哒一百分棒棒哒一百分棒棒哒一百分棒棒哒一百分棒棒哒一百分棒棒哒一百分棒棒哒一百分棒棒哒一百分棒棒哒一百分棒棒哒一百分棒棒哒一百分棒棒哒一百分棒棒哒一百分棒棒哒一百分棒棒哒一百分棒棒哒一百分棒棒哒一百分棒棒哒一百分棒棒哒一百分棒棒哒一百分棒棒哒一百分棒棒哒一百分棒棒哒一百分棒棒哒一百分棒棒哒一百分棒棒哒一百分"*/
		},
		problemInfo:{
			/*imgs:[
				{txt:"789",url:one},
				{txt:"456",url:one},
				{txt:"123",url:one},
			],
			phone:"13610142496",
			tips:"经技师施工前检查，您的车存在图片所示的问题，施工已暂停。如需继续施工，请您联系站长确定。"*/
		},
		orderState:0,
		keyState:0,
		busiType:1
	};

    constructor(props) {
        super(props);
    }
	/**
	 * 组件加载时自动执行
	 */
	componentWillMount(){
		console.log("OrderDetail组件加载时执行!!!");
		this.loadOrderInfo();
	}
	/**
	 * 加载订单详情信息
	 */
	loadOrderInfo(){
		this.setState({showLoading:true});
		var orderid=Common.getParameterByName("orderid");
		this.setState({orderid:orderid});
		console.log(orderid);
		this.props.getOrderInfo(orderid).then(res=>{
			console.log(res.body);
			if(res.body.status){
				this.setState({service:res.body.data.service});
				this.initState(res.body.data.orderInfo);
				this.initRegInfo(res.body.data.orderInfo);
				this.initOrderInfo(res.body.data.orderInfo);
				if(res.body.data.orderInfo.state==8&&res.body.data.orderInfo.problem_state==3){
					this.loadCarProblem();
				}
				if(res.body.data.orderInfo.state==10){
					this.loadEvaluate();
				}
				var self=this;
				setTimeout(function(){
					self.setState({showLoading:false});
				},1000);
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
		temp.address=data.address; 
        temp.isShowStation=false;
        temp.isShowPark=true;
		 if(data.car_transfer_type==1&&data.busi_type==2){                       
            temp.isShowPark=true;
            temp.isShowStation=true;
        }
        if(data.car_transfer_type==2&&data.busi_type==2){			
            temp.isShowPark=false;
            temp.isShowStation=true;                        
        }				
		this.setState({regInfo:temp});
	}
	/**
	 * 初始化订单信息
	 */
	initOrderInfo(data){
		var temp={};
		temp.orderid=data.orderid;
		temp.createTime=Common.formatDateDT(data.createtime).format("yyyy-MM-dd");
		temp.price=data.totalprice;
		temp.payType=Common.formatPayType(data.paytypes);
		this.setState({orderInfo:temp});
	}
	/**
	 * 加载车问题信息
	 */
	loadCarProblem(){
		this.props.getCarProblem(this.state.orderid).then(res=>{
			console.log(res);
			if(res.body.status){
				this.initCarProblem(res.body.data);
			}
		});
	}
	
	/**
	 * 加载评价信息
	 */
	loadEvaluate(){
		this.props.getEvaluateInfo(this.state.orderid).then(res=>{
			console.log(res.body);
			if(res.body.status){
				this.initEvaluate(res.body.data);
			}
		});
	}
	/**
	 * 初始化评价信息
	 */
	initEvaluate(data){
		var temp={};
		temp.score=data.satisfy;
		temp.labels=Common.getEvaluateLabels(data.secontent);
		temp.text=Common.getEvaluateContent(data.secontent);		
		this.setState({evalInfo:temp});
	}
	/**
	 * 初始化车问题信息
	 */
	initCarProblem(data){
		var temp={};
		var imgs=[];
		for(var i=0;i<data.problem.length;i++){
			var img={};
			img.txt=data.problem[i].describe;
			img.url="http://test.jujia.ctauto.cn"+data.problem[i].url;
			imgs.push(img);
		}
		temp.imgs=imgs;
		temp.phone=data.stationmasterInfo.phone;
		temp.tips="经技师施工前检查，您的车存在图片所示的问题，施工已暂停。如需继续施工，请您联系站长确定。";
		this.setState({problemInfo:temp});
	}
	/**
	 * 初始化状态
	 */
	initState(data){
		var keyState=Common.getKeyState(data.keytype,data.ifusing,data.state,data.cellid);
		var state=data.state;
		var busiType=data.busi_type;
		this.setState({keyState:keyState,orderState:state,busiType:busiType});
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

    render() {
		var problem={};
		var evaluate={};
		if(!Common.isEmptyObj(this.state.problemInfo)){
			problem=<CarProblem info={this.state.problemInfo} />;
		}else{
			problem="";
		}

		if(!Common.isEmptyObj(this.state.evalInfo)){
			evaluate=<EvaluateInfo info={this.state.evalInfo} />;
		}else{
			evaluate="";
		}
		const {cancelOrder,getCancelOrderConfig,refundForOrder,addCancelOrderReason}=this.props;
		var self=this;
        return(			
            <BaseComponent>
            <div className={styles.orderDetail}>
				<Loader show={this.state.showLoading}/>
				<OrderState state={this.state.orderState} keyState={this.state.keyState} />
				{problem}
				<ServiceItem info={this.state.service} />
				<RegisterInfo info={this.state.regInfo} />
				<OrderInfo info={this.state.orderInfo} />
				{evaluate}
				<div className={styles.tempHeight}></div>
				<div className={styles.bottomBtn}>
					<OrderBtn busiType={this.state.busiType} state={this.state.orderState} keyState={this.state.keyState} cancelOrder={cancelOrder} getCancelOrderConfig={getCancelOrderConfig} refundForOrder={refundForOrder} addCancelOrderReason={addCancelOrderReason} showLoad={self.showLoad.bind(self)} hideLoad={this.hideLoad.bind(this)} />
				</div>				
            </div>
            </BaseComponent>
        )
    }
}

OrderDetail.propTypes={}
export default OrderDetail;
