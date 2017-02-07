import React, { Component, PropTypes } from 'react';
import EvalStar from "../EvalStar/EvalStar";
import EvalLabel from "../EvalLabel/EvalLabel";
import TextField from "material-ui/TextField";
import Styles from "./Evaluation.scss";

export class Evaluation extends React.Component {
    static propTypes = {

    };

    state = {
        point: 4,
        
    };

    checkStar(point){
        ::this.setState({point:point});
    };
    

    render () {
        return (
            <div>
                <div>服务评价</div>
                <EvalStar checkedCount={this.state.point}  onChecked={::this.checkStar}/>
                <EvalLabel point={this.state.point}/>
                <div className={Styles.remark}>
                    <TextField
                        value={this.props.remark}
                        onChange={(text)=>j}
                        fullWhite={true}
                        hintText="写点评论"
                        />
                </div>
            </div>
        )
    }
}

export default Evaluation;

