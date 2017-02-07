import React,{Component, PropTypes} from "react"
import Styles from "./Order.scss";
import MenuItem from "material-ui/MenuItem";
import TextField from "material-ui/TextField";
import Divider from 'material-ui/Divider';
import Clear from 'material-ui/svg-icons/content/clear';
import Back from "material-ui/svg-icons/navigation/arrow-back";
import ensureVisible from "../../utils/EnsureVisible";

class ParkSpotHeader extends Component{
    state = {
        text: "",
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

    render(){
        const headerStyle = {
            background: "#f5f5f5"
        };

        const {selectedArea,showAreaname, onClear, onBack, onParkSpotChange,partspot} = this.props;
        if(this.props.selectedArea.hasparkspot || this.props.selectedArea.areatype == "070"){
            var parkspot =   
                <MenuItem >
                    <div className={Styles.inputParkSpot}>
                        <span  className={Styles.label}>停车位</span>
                        <div className={Styles.value}>
                        <TextField name="parkspot" value={parkspot} 
                        onFocus={(e)=>{ensureVisible(this.refs["header"],this); console.log(this.refs["header"])} }
                        onChange={(e)=>this.handleChange(e)}/>
                        </div>
                    </div>
               </MenuItem>;
        }
        return (
                <div>
                    <MenuItem
                    leftIcon = {<Back onTouchTap={onBack}/>}
                    rightIcon = {<Clear onTouchTap={onClear}/>}
                    innerDivStyle = {headerStyle}
                    >
                    <p
                    ref="header"
                    >
                        {showAreaname}
                        </p>
                    </MenuItem>
                    {parkspot}

                    </div>
                );
    }
}
export default ParkSpotHeader;
