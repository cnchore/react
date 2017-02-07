import React, { Component, PropTypes } from 'react';
import Styles from "./EvalStar.scss";
import Avatar from 'material-ui/Avatar';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import {
yellow600,
grey300,
} from 'material-ui/styles/colors';

export class EvalStart extends React.Component {

    static propTypes = {
        checkedCount: PropTypes.number,
        onChecked: PropTypes.func
    };

    static defaultProps = {
       checkedCount: 0,
        onChecked: ()=>{}
    };

    state = {
        colors:[],
        desc:""
    };

    constructor(props){
        super(props);
        var colors = [];
        for(var i = 0; i < 5; ++i){
            colors.push({isActive: i<this.props.checkedCount,index: i, desc: this.getDesc(i)});
        }
        this.state = { colors:colors, desc:this.getDesc(this.props.checkedCount-1)};
    }

    getDesc(index){
        switch(index){
            case 0:
                return "非常差";
            case 1:
                return "很差";
            case 2:
                return "差";
            case 3 :
                return "好";
            case 4: 
                return "非常好";
        }
        return "";
    }
    

    check(index){
        this.state.colors.map(function(color){
            color.isActive = color.index <= index;
        });
        this.setState({colors: this.state.colors, desc: this.getDesc(index)});
        this.props.onChecked(index + 1);
    };

    render () {
        const starStyle = {
            marginRight:10,
            width:"40px",
            height:"40px"
        };
        return (
            <div>
                <div className={Styles.stars}>
                {this.state.colors.map((color)=>{
                    return <ActionGrade 
                    style={starStyle}
                    key={color.index} 
                    color={color.isActive?yellow600:grey300} 
                    onTouchTap={()=>{this.check(color.index)}}/>
                })}
                </div>
                <p className={Styles.desc}>{this.state.desc}</p>
            </div>
        )
    }
}

export default EvalStart;

