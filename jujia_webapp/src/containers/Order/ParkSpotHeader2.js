import React,{Component, PropTypes} from "react"
import Styles from "./Order.scss";
import MenuItem from "material-ui/MenuItem";
import TextField from "material-ui/TextField";
import Divider from 'material-ui/Divider';
import Clear from 'material-ui/svg-icons/content/clear';
import Back from "material-ui/svg-icons/navigation/arrow-back";
import ensureVisible from "../../utils/EnsureVisible";
import RaisedButton from "material-ui/RaisedButton";

class ParkSpotHeader2 extends Component{
    state = {
        text: "",
        placeholderForNormalPark:"请输入停车位，如 032",
        placeholderForUnNormalPark:"例如2栋前面/超市旁边/2栋旁斜坡",
    };

    constructor(props){
        super(props);
    };

  back(){
  }
  clear(){
  }

  handleChange(e){
      this.props.onParkSpotChange(e);
  }

  ok(e){
      e.preventDefault();
      e.stopPropagation();
      var parkname = this.refs["parkname"].value;
      this.props.onParkNameChange(parkname)

  }
   componentDidUpdate(){
        if(this.props.isOpen == true && (this.props.selectedArea.hasparkspot || this.props.selectedArea.areatype == "070")){
            this.refs["parkname"].focus();
        }
   }

   isUnnormal(showAreaname){
        return showAreaname.indexOf("地面") > -1 || showAreaname.indexOf("凤馨苑") > -1 || showAreaname.indexOf("凤妍苑") > -1 || showAreaname.indexOf("东门商业") > -1


   }

    render(){
        const headerStyle = {
            background: "#f5f5f5"
        };

        const {selectedArea,showAreaname, onClear, onBack, onParkSpotChange,partspot} = this.props;
        if(this.isUnnormal(showAreaname)){
            var okBtn =  <div className={Styles.btn} onTouchTap={(e)=>this.ok(e)}>
                            <span>
                                确定
                           </span>
                           </div>

        }
        if(this.props.selectedArea.hasparkspot || this.props.selectedArea.areatype == "070"){
            const isUnnormal = this.isUnnormal(showAreaname);
            var parkspot =
                    <div className={Styles.inputParkSpot}>
                        <span  className={Styles.label}>停车位</span>
                        <div className={Styles.value}>
                            <input  className={Styles.input} type={isUnnormal? "text": "tel"} ref="parkname" name="parkspot" value={parkspot}
                            onFocus={(e)=>{ensureVisible(this.refs["header"],this)} }
                            onChange={(e)=>this.handleChange(e)}
                            placeholder={isUnnormal?this.state.placeholderForUnNormalPark: this.state.placeholderForNormalPark}
                        />
                        </div>
                            {okBtn}
                    </div>
        }
        return (
                <div>
                    <div
                    className={Styles.headerItem}
                    >
                    <span className={Styles.leftIcon} onTouchTap={onBack}>
                        <i className="icon iconfont">&#xe609;</i>
                    </span>
                    <div
                        ref="header"
                        className={Styles.areaname}
                    >
                        {showAreaname}
                        </div>
                        <span className={Styles.rightIcon} onTouchTap={onClear}>
                        <i className="icon iconfont">&#xe60a;</i>
                        </span>
                    </div>
                    {parkspot}

                    </div>
                );
    }
}
export default ParkSpotHeader2;
