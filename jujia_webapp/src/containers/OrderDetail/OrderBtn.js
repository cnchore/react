/**
 * Created by jianxuanbing on 2016/6/1 0001.
 */
import React, {Component, PropTypes} from "react";
import Dialog from 'material-ui/Dialog';
import Snackbarx from "../../components/Snackbarx/Snackbarx";
import styles from './OrderBtn.scss';
import Common from "../../utils/Common";

class OrderBtn extends Component{ 
    state={
        open:false,
		items:[],
		isSelect:false,
		selectId:0,
		msg: {show: false, msg: ""}
    };
    constructor(props) {
		super(props);
		this.handleClose = ::this.handleClose;
		this.handleOpen=::this.handleOpen;
	}
	/**
	 * 组件加载时自动执行
	 */
	componentWillMount(){
		console.log("OrderBtn组件加载时执行!!!");
		var orderid=Common.getParameterByName("orderid");		
		this.setState({orderid:orderid});
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
	 * 打开取消订单面板
	 */
    cancelOrder(){
		console.log("被戳了");
		this.handleOpen();
    }
	/**
	 * 跳转地址
	 */
    goToUrl(url){
        this.context.router.push(url);
    }
	handleOpen(){	
		this.initCancelOrderConfigData();
		this.initCancelOrder();
		this.setState({open:true});
	}
	/**
	 * 关闭弹窗界面
	 */
	handleClose(){
		this.setState({open:false});
		this.setState({isSelect:false});
	}
	/**
	 * 选择取消订单项
	 */
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
	 * 提交取消订单
	 */
    confirmCancelOrder(){
		if(!this.state.isSelect){
			return;
		}
		const{selectId,orderid}=this.state;
		const{showLoad,hideLoad}=this.props;		
		var self=this;		
		showLoad();
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
							hideLoad();
							self.goToUrl("/orderList");							
						}
					});
				}else{
					hideLoad();
					self.goToUrl("/orderList");					
				}
			}else if(res.body!=null&&res.body.state==0){
				this.showMsg(res.body.errmsg);
				hideLoad();
			}
		})
		this.handleClose();
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

    render(){
		const{orderid}=this.state;
        var btnList=[];
        var lblList=[];
        var self=this;
        var keyState=this.props.keyState;
		this.state.items.map(function(item,i){            
			lblList.push(<span key={i} className={item.selected?styles.active:null} onTouchTap={self.selected.bind(self,item,self.state.items)}>{item.text}</span>)
		});
        const actions=[
            <div>
                <li onTouchTap={this.handleClose}><a>暂不取消</a></li>
                <li onTouchTap={::this.confirmCancelOrder}><a style={self.state.isSelect?{color:"#196FD1"}:{"color":"#ccc"}}>确定取消</a></li>
            </div>
		];
        switch(this.props.state) {
			case 1:				
				break;
			case 2:				
                btnList.push(<div key={0} className={styles.unGuide} onTouchTap={::this.cancelOrder}>取消订单</div>);
                btnList.push(<div key={1} className={styles.guide} onTouchTap={::this.goToUrl.bind(this,this.props.busiType==2?"/orderStation?orderid="+orderid:'/order?orderid='+orderid)}>去付款</div>);
				break;
			case 3:								
				break;
			case 4:
				if(keyState==0){
					btnList.push(<div key={0} className={styles.unGuide} onTouchTap={()=>this.cancelOrder()}>取消订单</div>);
                    btnList.push(<div key={1} className={styles.unGuide} onTouchTap={::this.goToUrl.bind(this,'/waitService?orderid='+orderid)}>施工进度</div>);
				}else if(keyState==15){
                    btnList.push(<div key={0} className={styles.unGuide} onTouchTap={::this.cancelOrder}>取消订单</div>);
                    btnList.push(<div key={1} className={styles.guide} onTouchTap={::this.goToUrl.bind(this,'/saveKey?orderid='+orderid)}>存钥匙</div>);
				}else if(keyState==11){
					btnList.push(<div key={0} className={styles.unGuide} onTouchTap={::this.cancelOrder}>取消订单</div>);
                    btnList.push(<div key={1} className={styles.unGuide} onTouchTap={::this.goToUrl.bind(this,'/waitService?orderid='+orderid)}>施工进度</div>);
				}
                
				break;
			case 5:
				btnList.push(<div key={0} className={styles.guide} onTouchTap={::this.goToUrl.bind(this,'/selectService')}>去下单</div>);
				break;
			case 6:								
				break;
			case 7:
				if(keyState==11){					
                    btnList.push(<div key={0} className={styles.unGuide} onTouchTap={::this.goToUrl.bind(this,'/takeKey?orderid='+orderid)}>取钥匙</div>);
				}else if(keyState==12){					
                    btnList.push(<div key={0} className={styles.guide} onTouchTap={::this.goToUrl.bind(this,'/selectService')}>去下单</div>);
				}else{
					btnList.push(<div key={0} className={styles.guide} onTouchTap={::this.goToUrl.bind(this,'/selectService')}>去下单</div>);
				}								
				break;
			case 8:
				if(keyState==14){					
				}				
				btnList.push(<div key={0} className={styles.unGuide} onTouchTap={::this.goToUrl.bind(this,'/waitService?orderid='+orderid)}>施工进度</div>);
				break;
			case 9:
				if(keyState==13){					
					btnList.push(<div key={0} className={styles.unGuide} onTouchTap={::this.goToUrl.bind(this,'/takeKey?orderid='+orderid)}>取钥匙</div>);
				}else if(keyState==14){					
					btnList.push(<div key={0} className={styles.unGuide} onTouchTap={::this.goToUrl.bind(this,'/serviceEvaluate?orderid='+orderid)}>去评价</div>);
				}else{					
					btnList.push(<div key={0} className={styles.unGuide} onTouchTap={::this.goToUrl.bind(this,'/serviceEvaluate?orderid='+orderid)}>去评价</div>);
				}
				break;
			case 10:
				btnList.push(<div key={0} className={styles.guide} onTouchTap={::this.goToUrl.bind(this,'/selectService')}>去下单</div>);
				break;
		}        
        return (
            <div className={styles.btn}>                
                {btnList}
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
}
OrderBtn.propTypes={
    state:PropTypes.number,
    keyState:PropTypes.number
};
OrderBtn.contextTypes={
	router:React.PropTypes.object.isRequired
}
export default OrderBtn;
