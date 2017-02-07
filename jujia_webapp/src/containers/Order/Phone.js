import React,{Component,PropTypes} from "react";
import Styles from "./Order.scss";
import TextField from "material-ui/TextField";
import Paper from "material-ui/Paper";

class Input extends Component{
    state = {
        fieldName:"手机号码",
        value:"",
        style:Styles.hideInput
    };

    constructor(props){
        super(props);
    };

    componentDidMount(){
    };

    setOpen(){
        this.setState({style:Styles.showInput});
        this.refs.inputField.focus();
         this.refs.inputField.value = "test";
    }
    setClose(event){
        console.log("setClose");
        this.setState({style:Styles.hideInput});
        event.preventDefault();
        return false;
    }
    input(event){
        console.log("input");
        event.stopPropagation();
        return false;
    }
    ok(){
        setTimeout(function(){
                this.setState({style:Styles.hideInput});
         }.bind(this),500);
    }

    render(){
        const paperStyle = {
               height:50,
               width:"100%",
               alignItems:"center"
        };

        return(
                <div>
                    <div className={Styles.orderField} onTouchTap={::this.setOpen}>
                        {this.state.value}
                    </div>
                    <div className={this.state.style} ref="container">
                        <div className={Styles.inputSection} onTouchTap={::this.input}>
                            <label className={Styles.labelField}>手<span className="spacing2"></span>机</label>
                            <div className={Styles.inputField}>
                              <input type="text" ref="inputField" name="inputField" onBlur={::this.ok}/>
                            </div>

                        </div>
                    </div>
                </div>
                );
    }
}

export default Input;

