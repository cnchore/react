/**
 * Created by jianxuanbing on 2016/5/30 0030.
 */
import React, {Component, PropTypes} from "react";
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import Snackbarx from "../../components/Snackbarx/Snackbarx";
import styles from "./OrderItem.scss";
import Common from "../../utils/Common";

class OrderItem extends Component {
	state = {
		orderState:"",
		open:false,
		items:[],
		isSelect:false,
		selectId:0,
		msg: {show: false, msg: ""}
	};

	handleOpen(){
		this.initCancelOrderConfigData();
		this.initCancelOrder();
		this.setState({open:true});
	}

	handleClose(){
		this.setState({open:false});
		this.setState({isSelect:false});
	}
	initCancelOrder(){
		var items=this.state.items;
		items.forEach(function(temp){
			temp.selected=false;
		});
		this.setState({items:items});
		this.setState({isSelect:false});
		this.setState({selectId:0});
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

	constructor(props) {
		super(props);
		this.handleOpen = ::this.handleOpen;
		this.handleClose = ::this.handleClose;
	}

	/**
	 * [goToUrl 跳转地址]
	 * @param  {[type]} url [地址]
	 * @return {[type]}     [description]
	 */
	goToUrl(url){
		//this.props.goToUrl();
		this.context.router.push(url);
	}
	/**
	 * [cancelOrder 取消订单]
	 * @return {[type]} [description]
	 */
	cancelOrder(){
		this.handleOpen();
	}
	/**
	 * 确定取消订单
	 */
	confirmCancelOrder(){
		if(!this.state.isSelect){
			return;
		}
		const{selectId}=this.state;
		const{orderId,showLoad,hideLoad}=this.props;
		var self=this;
		showLoad();
		this.props.cancelOrder(orderId).then(res=>{
			console.log(res);
			if(res.body!=null&&res.body.state==1){
				this.props.addCancelOrderReason(orderId,selectId).then(res1=>{
					console.log(res1);
				});
				if(res.body.orderstate&&res.body.orderstate==6){
					this.props.refundForOrder(orderId).then(res2=>{
						console.log(res2);
						if(res2.body!=null&&res2.body.state==1){
							hideLoad();
							self.goToUrl("/orderDetail?orderid="+orderId+" ");
						}
					});
				}else{
					hideLoad();
					self.goToUrl("/orderDetail?orderid="+orderId+" ");
				}
			}else if(res.body!=null&&res.body.state==0){
				this.showMsg(res.body.errmsg);
				hideLoad();
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


	render() {
		var self=this;
		var stateName="";
		var btnList=[];
        var products=[];
		var isFinishOrder=false;
		var isGoToWaitService=false;
		const{orderId,keyState}=this.props;
        this.props.products.split(",").map((element)=>{
            products.push(<div>{element}</div>);
        });		
		switch(this.props.orderState) {
			case 1:
				stateName="已创建";
				break;
			case 2:
				stateName="待付款";
				btnList.push(<div key={0} className={styles.btn} onTouchTap={::this.cancelOrder} >取消订单</div>);
				btnList.push(<div key={1}  className={styles.btn} onTouchTap={::this.goToUrl.bind(this,this.props.busiType==2?"/orderStation?orderid="+orderId:'/order?orderid='+orderId+" ")}>去付款</div> );
				break;
			case 3:
				stateName="未付款，取消订单";
				isFinishOrder=true;
				break;
			case 4:
				if(keyState==0){
					stateName="已付款，待施工";
                    btnList.push(<div key={0} className={styles.btn} onTouchTap={::this.cancelOrder} >取消订单</div>);
					isGoToWaitService=true;
				}else if(keyState==15){
					stateName="已付款，待存钥匙";
					btnList.push(<div key={0}  className={styles.btn} onTouchTap={::this.cancelOrder}>取消订单</div>);
					btnList.push(<div key={1}  className={styles.btn} onTouchTap={::this.goToUrl.bind(this,"/saveKey?orderid="+orderId+" ")}>存钥匙</div> );
				}else if(keyState==11){
					stateName="已存钥匙，待施工";
                    btnList.push(<div key={0} className={styles.btn} onTouchTap={::this.cancelOrder} >取消订单</div>);
					isGoToWaitService=true;
				}
				break;
			case 5:
				stateName="订单已取消";
				isFinishOrder=true;
				btnList.push(<div key={0}  className={styles.btn} onTouchTap={::this.goToUrl.bind(this,'/selectService')}>去下单</div> );
				break;
			case 6:
				stateName="退款中";
				isFinishOrder=true;
				break;
			case 7:
				if(keyState==11){
					stateName="已取消，待取钥匙";
					btnList.push(<div key={0} className={styles.btn} onTouchTap={::this.goToUrl.bind(this,'/takeKey?orderid='+orderId+" ")}>取钥匙</div> );
				}else if(keyState==12){
					stateName="已取消";
				}else{
					stateName="订单已取消";
				}
                btnList.push(<div key={0}  className={styles.btn} onTouchTap={::this.goToUrl.bind(this,'/selectService')}>去下单</div> );
				isFinishOrder=true;
				break;
			case 8:
				if(keyState==14){
					stateName="施工中";
				}
				stateName="施工中";
				btnList.push(<div key={0} className={styles.btn} onTouchTap={::this.goToUrl.bind(this,'/waitService?orderid='+orderId+" ")}>施工进度</div> );
				isGoToWaitService=true;
				break;
			case 9:
				if(keyState==13){
					stateName="待取钥匙";
					btnList.push(<div key={0} className={styles.btn} onTouchTap={::this.goToUrl.bind(this,'/takeKey?orderid='+orderId+" ")}>取钥匙</div> );					
				}else if(keyState==12){
					stateName="待评价";
					btnList.push(<div key={0} className={styles.btn} onTouchTap={::this.goToUrl.bind(this,'/serviceEvaluate?orderid='+orderId+" ")}>去评价</div> );
				}else{
					stateName="待评价";
                    btnList.push(<div key={0} className={styles.btn} onTouchTap={::this.goToUrl.bind(this,'/serviceEvaluate?orderid='+orderId+" ")}>去评价</div> );
				}
				break;
			case 10:
				stateName="已完成";
				btnList.push(<div key={0}  className={styles.btn} onTouchTap={::this.goToUrl.bind(this,'/selectService')} >去下单</div> );
				isFinishOrder=true;
				break;
		}

		var orderStyle={
			"background-color":(isFinishOrder?"#CCCCCC":"#cc3333")
		};
		var lblList=[];
		this.state.items.forEach(function(item,i){
			lblList.push(<span key={i} className={item.selected?styles.active:null} onTouchTap={self.selected.bind(self,item,self.state.items)}>{item.text}</span>)
		});
		const actions=[
		<div>
			<li onTouchTap={this.handleClose}><a>暂不取消</a></li>
			<li onTouchTap={::this.confirmCancelOrder}><a style={self.state.isSelect?{color:"#196FD1"}:{"color":"#ccc"}}>确定取消</a></li>
		</div>
		]
		return (
			<div className={styles.orderItem}>
				<div className={styles.head} style={orderStyle}>
					<span className={styles.left}>订单编号:</span>
					<span>{this.props.orderId}</span>
					<span className={styles.right}>{this.props.createTime}</span>
				</div>
				<div className={styles.context} onTouchTap={::this.goToUrl.bind(this,isGoToWaitService?"/waitService?orderid="+orderId:'/orderDetail?orderid='+orderId+'')}>
					<div>车牌号码：{this.props.carnum}</div>
					<div className={styles.serviceItemWrap}><div className={styles.serviceItem_ch}>服务项目：</div><div className={styles.serviceItem}>{products}</div></div>
					<div>订单状态：<span className={styles.state}>{stateName}</span></div>
				</div>
				<div className={styles.foot}>
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
                        message={this.state.msg.msg}
                        onRequestClose={()=>this.handleMsgClose()}
                    />
			</div>
		);
	}
};
OrderItem.propTypes={
    orderId:PropTypes.number,
    createTime:PropTypes.string,
    carnum:PropTypes.string,
    orderState:PropTypes.number,
    products:PropTypes.string,
    keyState:PropTypes.number
};
OrderItem.contextTypes={
	router:React.PropTypes.object.isRequired
}
export default OrderItem;
