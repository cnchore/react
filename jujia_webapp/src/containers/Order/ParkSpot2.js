import React, {Component, PropTypes} from "react";
import Paper from "material-ui/Paper";
import Styles from "./Order.scss";
import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";
import TextField from "material-ui/TextField";
import Divider from 'material-ui/Divider';
import Clear from 'material-ui/svg-icons/content/clear';
import ParkSpotHeader2 from "./ParkSpotHeader2";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as OrderActions from '../../redux/modules/Order/action';
import Loader from "../../components/Loader/Loader";
import Common from "../../utils/Common";

const AreaShowingNameConfig = [
        {
            index: 0,
            areaname: "凤凰城",
            areatypes:['060','070'],
            parkspotAreatypes:['060','070']
        },
        {
            index: 1,
            areaname: "凤馨苑",
            areatypes: ['030','040','050','070'],
            parkspotAreatypes: ['030','040','050','070'],
        },
        {
            index: 1,
            areaname: "凤妍苑",
            areatypes: ['030','040','050','060','070'],
            parkspotAreatypes: ['030','040','050','060','070'],
        },
        {
            index: 1,
            areaname: "东门商业街",
            areatypes: ['030','040','050','070'],
            parkspotAreatypes: ['030','040','050','070'],
        },
        {
            index: 1,
            areaname: "东陵广场",
            areatypes: ['030','070'],
            parkspotAreatypes: ['030','070'],
        },



    ];


@connect(
    state => ({
    }),
    OrderActions
)
class ParkSpot2 extends Component{


    constructor(props){
        super(props);

    }

    getFrequentUsedParkspot=()=>new Promise((resolve,reject)=>{
        this.props.getFrequentUsedParkspot().then((res)=>{
            var data = this.state.data;
            data.frequentParkspots = res.body.data;
            this.setState({data});
            resolve();
        });
    });
    getAllParkspot(keywork){
        this.setState({showLoading: true});
        this.props.getAllParkspot(keywork).then((res)=>{
            this.setState({showLoading: false});
             this.handleResp(res.body);
        })
    }
    getParkspotByOrder2(keywork){
        var reqKeyworkd = "{areaname:\""  + keywork  + "\", areaid:\"" +  this.state.selectedArea.areaid+ "\"}";
        this.setState({showLoading: true});
        this.props.getParkspotByOrder2(reqKeyworkd).then((res)=>{
            this.setState({showLoading: false});
            this.handleResp(res.body);
        });
    }


    state = {
        showLoading: false,
        isFirst: true,
        open: false,
        originScroll:0,
        areaTree:[],
        open:false,
        openChild:false,
        drawerClassName:Styles.drawerParkSpotClose,
        drawerChildClassName:Styles.drawerParkSpotClose,
        parkspot:"",
        parkSpotName:"",
        showAreaname: "",
        selectedArea:{areaname:"",areaid:0,parentid:""},
       originSelectedArea:{areaname:"",areaid:0,showName:"",selectedName:""},
        data:{
            topAreas:[
                //{areaname:"云山诗意",showName:"云山诗意",selectedName:"云山诗意", areaid:1,parentid:0},
                //{areaname:"凤凰城",showName:"凤凰城",selectedName:"凤凰城", areaid:2,parentid:0},
            ],
            childAreas:[
                {areaname: "",areaid:-1},
            ],
            frequentParkspots:[]

        }
    };

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    setOpen (e){
        if(e){
            e.preventDefault();
            e.stopPropagation();
        }
        var scrollHeight = window.document.body.scrollTop;
        this.state.originScroll =scrollHeight;
        window.scrollTo(0,0);
        if(!this.state.selectedArea.parentid){
            this.state.selectedArea = this.state.originSelectedArea;
        }
        this.setState({showAreaname: "",parkspot: ""});
        this.props.onTouchTap(true);
        this.setState({open:true})
        this.setState({drawerClassName:Styles.drawerParkSpotOpen});

        this.getFrequentUsedParkspot();
        this.getAllParkspot("");
    };
    setClose(){
        this.setState({open:false,parkspot: "",drawerClassName:Styles.drawerParkSpotClose})
    };
    setOpenChild(){
        this.setState({openChild:true});
        this.setState({drawerChildClassName:Styles.drawerParkSpotOpen});
    }
    setCloseChild(){
        this.setState({drawerChildClassName:Styles.drawerParkSpotClose,openChild:false,parkspot: ""});
    }

    handelFrequentUsedParkspot(resData){
        var data = this.state.data;
    }

    handleResp(resData){
        var data = this.state.data;
        var area = this.state.selectedArea;
        if(area.areaid == 0){
            data.topAreas = resData;
            this.setState({data: data});
        }
        else if(area.parentid == 0){
            data.childAreas = resData;
            this.setState({data});
            this.setOpenChild();
            setTimeout(function(){
                 this.setClose();
            }.bind(this),500);
        }else if(area.hasparkspot){
            data.childAreas = resData || [];
            this.setState({data});
        }else if(!area.parkid){
            data.childAreas = resData;
            this.setState({data});
        }else if(area.parkid){
            if(this.state.originScroll){
                window.scrollTo(0,this.state.originScroll);
                this.state.originScroll= 0;
            }
            var parkSpotName = this.state.showAreaname;
            this.props.order.parkspotname = parkSpotName;
            this.setState({parkSpotName,showAreaname:""});
            this.props.onParkSpotChange(this.state.selectedArea.parkid,"",this.state.selectedArea);
            this.setBlurFocus();
            this.setCloseChild();
        }else{
            data.childAreas = [];
            this.setState({data});
        }

    }

    parseParkspot(parkspotArea){
        var showAreaname = "";
        if(this.state.areaTree.length >0){
            //var configIndex = AreaShowingNameConfig.findIndex(x=>x.areaid== this.state.areaTree[x.index].areaid);
            var foundArr  = AreaShowingNameConfig.filter(x=> this.state.areaTree[x.index] && x.areaname== this.state.areaTree[x.index].areaname);
            //var configIndex = AreaShowingNameConfig.filter(x=>x.areaid== this.state.areaTree[x.index].areaid);

            if(foundArr.length > 0){
                //var config = AreaShowingNameConfig[configIndex];
                var config = foundArr[foundArr.length - 1];
                this.state.areaTree.forEach((x,i)=>{
                    if(config.parkspotAreatypes.findIndex(y=>y == x.areatype)>-1){
                        showAreaname +=x.parkid? x.parkname:  x.areaname;
                    }
                });
                this.state.showAreaname = showAreaname;
            }else{
                this.state.areaTree.forEach((x,i)=>{
                        showAreaname += x.parkid? x.parkname: x.areaname;
                });
            }
        }
        showAreaname += parkspotArea.parkname;
        return showAreaname;

    }

    updateShowAreaname(){
        var area =  this.state.selectedArea;
        var showAreaname = "";
        if(this.state.areaTree.length >0){
            //var configIndex = AreaShowingNameConfig.findIndex(x=>x.areaid == this.state.areaTree[0].areaid);
            var foundArr  = AreaShowingNameConfig.filter(x=> this.state.areaTree[x.index] && x.areaname== this.state.areaTree[x.index].areaname);
            if(foundArr.length > 0){
                var config = foundArr[foundArr.length - 1];
                this.state.areaTree.forEach((x,i)=>{
                    if(i== this.state.areaTree.length - 1){
                        showAreaname += x.parkid?x.parkname: x.areaname;
                    }else if(config.areatypes.findIndex(y=>y == x.areatype )>-1){
                        showAreaname +=x.parkid? x.parkname:  x.areaname;
                    }
                });
                this.state.showAreaname = showAreaname;
            }else{
                this.state.areaTree.forEach((x,i)=>{
                        showAreaname += x.parkid? x.parkname: x.areaname;
                });
            }
        }
        this.state.showAreaname = showAreaname;
        this.setState({showAreaname: showAreaname});

    }


    onAreaSelect(e,area){
        this.props.onTouchTap(false);
        e.preventDefault();
        e.stopPropagation();
        this.state.selectedArea = area;
        this.setState({selectedArea:area});
        if(area.parentid == 0){
            this.state.areaTree = [];
            this.state.areaTree.push(area);
        }else{
            this.state.areaTree.push(area);
        }

        this.updateShowAreaname();
        if(area.hasparkspot || area.parkid || area.areatype == '070'){
            this.handleResp([]);
        }else{
            this.getFrequentUsedParkspot();
            this.getAllParkspot(area.areaid);
        }
    };

    parkSpotChange(event){
        this.getParkspotByOrder2(event.target.value);
    }
    parkNameChange (parkname){
        if(!parkname){
            // 凤妍苑的 parkname 是选填，为了改动少，默认赋 '.' 给 parkname;
            if(this.state.showAreaname
                   && (   this.state.showAreaname.indexOf("凤妍苑")>-1
                       || this.state.showAreaname.indexOf("东门商业") > -1
                       || this.state.showAreaname.indexOf("东陵广场") > -1
                      )) {
                parkname = ".";
            }else{
                this.props.showMsg("请输入停车位！");
                return;
            }
        }

        this.setBlurFocus();
        if(this.state.originScroll){
            window.scrollTo(0,this.state.originScroll);
            this.state.originScroll= 0;
        }
        this.state.showAreaname += parkname;
        var parkSpotName = this.state.showAreaname;
        this.props.order.parkspotname = parkSpotName;
        this.setState({parkSpotName,showAreaname:""});
        this.props.onParkSpotChange(0,parkname,this.state.selectedArea);
        this.setCloseChild();

    }

    frequentParkChange(e,area){
        e.stopPropagation();
        e.preventDefault();
        if(this.state.originScroll){
            window.scrollTo(0,this.state.originScroll);
            this.state.originScroll= 0;
        }
        this.state.selectedArea = area;
        this.state.showAreaname += Common.filterArea(area.long_areaname);
        var parkSpotName = this.state.showAreaname;
        this.props.order.parkspotname = parkSpotName;
        this.setState({parkSpotName,showAreaname:""});
        this.props.onParkSpotChange(area.parkid,"",this.state.selectedArea);
        this.setBlurFocus();
        this.setClose();
    }

    close(e){
      if(this.state.originScroll){
          window.scrollTo(0,this.state.originScroll);
          this.state.originScroll= 0;
      }
        e.preventDefault();
        this.props.onTouchTap(false);
        ::this.setClose();
        this.setBlurFocus();
    }
    back(e){
      if(this.state.originScroll){
          window.scrollTo(0,this.state.originScroll);
          this.state.originScroll= 0;
      }
        e.preventDefault();
        e.stopPropagation();
        this.props.onTouchTap(false);
        ::this.setCloseChild();
        this.setBlurFocus();

    }
    clear(e){
        this.setState({selectedArea: ""});
        this.setOpen();
        setTimeout(function(){
            this.setCloseChild();
        }.bind(this),500);
    }

  setBlurFocus(){
       var buttons =  window.document.getElementsByTagName("button");
       buttons[buttons.length - 1].focus();
    }




    render(){
        const drawerStyle = {
            width:"100%"
        };
        const titleStyle = {
            background:"#f5f5f5",
            //"borderBottom":"1px solid #e4e4e4",
            "textAlign":"center"
        }
        //if(!this.state.parkSpotName){
            this.state.parkSpotName = this.props.parkSpotName;
        //}
        if(this.state.data.frequentParkspots.length > 0){
            var frequentParkspots=
                <div className={Styles.frequentParkTitle}>
                    <span>
                        常用停车位
                    </span>
                </div>
        }

        return(
                <div>
                <Loader show={this.state.showLoading} hideBg = {true}/>
                    <div className={Styles.orderField} onTouchTap={(e)=>{this.setOpen(e)}} >
                        {this.state.parkSpotName}
                    </div>
                    <Drawer
                        containerClassName={this.state.drawerClassName}
                        open = {this.state.open}
                        openSecondary= {true}

                    >
                    <div className = {Styles.headerItem} >
                        <span className={Styles.leftIcon} onTouchTap={::this.close}>
                            <i className="icon iconfont">&#xe609;</i>
                        </span>
                        <div className={Styles.title}>
                            请选择服务区
                        </div>
                    </div>
                    <Divider/>

                    {frequentParkspots}

                    {this.state.data.frequentParkspots.map((area)=>{
                            return <div className={Styles.parentItem} key={area.areaid} onTouchTap = {(e)=>this.frequentParkChange(e,area)}>{Common.filterArea(area.long_areaname)}</div>;
                    })}
                    <Divider  style={ this.state.data.frequentParkspots.length > 0?{
                        height:"4px"
                    }:{

                    }}/>
                    {this.state.data.topAreas.map((area)=>{
                            return <div className={Styles.parentItem} key={area.areaid} onTouchTap = {(e)=>this.onAreaSelect(e,area)}>{area.areaname}</div>;
                    })}
                    </Drawer>
                    <Drawer
                        containerClassName={this.state.drawerChildClassName}
                        open = {this.state.openChild}
                        openSecondary= {true}
                    >
                    <ParkSpotHeader2 showAreaname= {this.state.showAreaname}
                        selectedArea= {this.state.selectedArea}
                        onClear = {::this.clear}
                        parkspot={this.state.parkspot}
                        onBack = {::this.back}
                        onParkSpotChange = {::this.parkSpotChange}
                        onParkNameChange = {::this.parkNameChange}
                        isOpen = {this.state.openChild}
                            />
                        {this.state.data.childAreas.map((area)=>{
                            return <div className={Styles.item} key={area.areaid + (area.parkid?area.parkid:0)} onTouchTap={(e)=>this.onAreaSelect(e,area)}>{area.parkid? this.parseParkspot(area): area.areaname}</div>;
                        })}
                    </Drawer>
                </div>

                );
    }

}
export default ParkSpot2;

