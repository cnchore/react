import React, { Component, PropTypes } from 'react';
import {List,ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import park from './images/tingchedian.png';
import del from './images/shanchu.png';
import Parking from './images/stop1.png'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import styles from './ParkingManager.scss';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as ParkingManagerActions from "../../redux/modules/ParkingManager/action";
import Common from "../../utils/Common";
import Loader from "../../components/Loader/Loader";
import BaseComponent from "../../components/BaseComponent/BaseComponent";

@connect(
    state=>({
        getParkListState:state.getParkList,
        delParkState:state.delPark
    }),
    ParkingManagerActions
)
class ParkingManager extends Component {

    state = {
        open:false,
        delId:0,
        parkingList:[]
    };

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };
    /**
     * 打开面板
     */
    handleOpen(parkid){
        this.setState({delId:parkid});
        this.setState({open:true});
    }
    /**
     * 关闭面板
     */
    handleClose(){
        this.setState({delId:0});
        this.setState({open:false});
    }

    constructor(props) {
        super(props);
        this.handleOpen=::this.handleOpen;
        this.handleClose=::this.handleClose;
    }

    /**
     * 组件加载时自动执行
     */
    componentWillMount(){
        console.log("ParkingManager组件加载时执行!!!");
        this.initData();
    }

    /**
     * 初始化数据
     */
    initData(){
        this.setState({showLoading:true});
        this.props.getParkList().then(res=>{
            if(res.body.status){
                var data=this.filterAreaData(res.body.data);
                this.renderPakingList(data);
                //this.setState({items:data});
                var self=this;
				setTimeout(function(){
					self.setState({showLoading:false});
				},1000);
            }
        });
    };
    /**
     * 过滤区域数据
     */
    filterAreaData(data){
        var list=[];
        data.forEach(function(item){
            var temp={};
            temp.id=item.parkid;
            temp.name="";
            if(item.areaid>0){
                temp.name=Common.filterArea(item.areaName);
            }else{
                temp.name=item.viname+","+item.floor+","+Common.filterArea(item.parkname);
            }
            list.push(temp);
        });
        return list;
    }

    /**
     * [gotoUrl 跳转地址]
     * @param  {[type]} url [请求地址]
     * @return {[type]}     [description]
     */
    gotoUrl(e, url) {
        e.preventDefault();
        e.stopPropagation();
        this.context.router.push(url);
    }

    renderPakingList(data){
        var listItem=[];
        var self=this;
        var delStyles={
            borderRadius: '0 !important',
            backgroundColor: 'white !important',
            height: '20px',
            width: '20px',
            top:20,
            backgroundSize: '16px 20px !important',
            backgroundPosition: '50% 50% !important',
            backgroundRepeat: 'no-repeat !important'
        };
        data.map(function (item,i){
            listItem.push(<ListItem key={i} primaryText={item.name} className={styles.item} leftAvatar={<Avatar src={park} />} rightAvatar={<Avatar src={del} style={delStyles} className={
                styles.backgroundImage
            } onTouchTap={self.handleOpen.bind(this,item.id)} />}  />)
        });
        if(data.length>0){
            this.setState({
                parkingList:<div className={styles.parkingManager}>
                    <List className={styles.list}>
                        {listItem}
                    </List>
                </div>
            })
        }else{
            this.setState({
                parkingList:<div className={styles.noParkingWrap}>
                    <div><img src={Parking} className={styles.parkingIcon}/></div>
                    <div className={styles.noParking}><span >尚未下过单,无停车点记录,</span>
                        <a className={styles.goOrder} onTouchTap={(e)=>{self.gotoUrl(e,"/selectService")}}>去下单!</a>
                    </div>
                </div>
            })
        }
    }
    /**
     * 删除停车点
     */
    delPark(){
        const{ delId }=this.state;
        this.props.delPark(delId).then(res=>{
            console.log("删除停车点!!!");
            if(res.body.status){
                this.initData();
            }
            this.handleClose();
        })
    }

    render() {

        const action=[
            <FlatButton label="取消" primary={true} onTouchTap={this.handleClose}/>,
            <FlatButton label="确定" primary={true} keyboardFocused={true} onTouchTap={::this.delPark}/>
        ];
        return(
            <BaseComponent>
                <Loader show={this.state.showLoading}/>
                {this.state.parkingList}
                <Dialog
                    title="删除停车点"
                    actions={action}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}>
                    是否确认删除该停车点呢！
                </Dialog>
            </BaseComponent>
        )
    }
}

export default ParkingManager;
