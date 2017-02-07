import React, { Component, PropTypes } from 'react';
import Paper from "material-ui/Paper";
import Styles from './EvalLabel.scss';
import {yellow600,fullWhite} from "material-ui/styles/colors";


export class EvalLabel extends React.Component {

    static propTypes = {
        labels: PropTypes.array,
        point: PropTypes.number
    };

    static defaultProps = {
        labels: [
            {name: "洗得很干净", isActive: false, maxPoint: 5, minPoint: 4},
            {name: "速度超级快", isActive: false, maxPoint: 5, minPoint: 4},
            {name: "师傅很细心", isActive: false, maxPoint: 5, minPoint: 4},
            {name: "水渍没清理", isActive: false, maxPoint: 3, minPoint: 1},
            {name: "洗得不干净", isActive: false, maxPoint: 3, minPoint: 1},
            {name: "马虎有遗漏", isActive: false, maxPoint: 3, minPoint: 1},
        ]
    };

    state = {
        labels: []
    };

    constructor(props) {
        super(props);
        this.state = {labels: this.props.labels};
    }

    check(index) {
        console.log(index);
        this.state.labels[index].isActive = !this.state.labels[index].isActive;
        this.setState({labels: this.state.labels});
        this.props.getLabels(this.state.labels);
    }

    render() {
        const labelActiveStyle = {
            flex:33,
            height: 25,
            minWidth: 80,
            margin: 8,
            textAlign: "center",
            borderRadius:'0.2rem',
            backgroundColor: yellow600,
            color: fullWhite
        };
        const labelStyle = {
            flex:33,
            height: 25,
            minWidth: 80,
            margin: 8,
            textAlign: "center",
            border:'1px solid #ccc',
            borderRadius:'0.2rem',
            color:'#ccc'
        };

        return (
            <div>
                <p className={Styles.title}>请选择标签</p>
                <div className={Styles.labels}>
                    {
                        this.state.labels.map((label, index)=> {
                            if (label.maxPoint >= this.props.point && label.minPoint <= this.props.point) {
                                return (<div
                                    style={label.isActive ? labelActiveStyle : labelStyle}
                                    key={index}
                                    onTouchTap={()=> {
                                    this.check(index)
                                }}>
                                    <span className={Styles.titleName}>{label.name}</span>
                                </div>)
                            } else {
                                label.isActive = false
                                return ""
                            }
                        })
                    }
                </div>
            </div>
        )
    }
}

export default EvalLabel;

