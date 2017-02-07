/**
 * Created by Administrator on 2016/7/27.
 */
import React, { Component, PropTypes } from 'react';
import Common from "../../../utils/Common";
import imgSrcBody from './images/bodybag.png';
import title1 from './images/title1.png';
import title2 from './images/title2.png';
import title3 from './images/title3.png';
import title4 from './images/title4.png';
import title5 from './images/title5.png';
import title6 from './images/title6.png';

class BrandCarsCareRule extends Component {

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    state = {
        imgSrc: ""
    };

    componentWillMount() {
        this.getRuleTitle();
    }

    constructor(props) {
        super(props);
    }

    getRuleTitle() {
        var type = Common.getParameterByName("type");
        if (type == 1) {
           return this.setState({imgSrc:title1});
        }
        if (type == 2) {
            return this.setState({imgSrc:title2});
        }
        if (type == 3) {
            return this.setState({imgSrc:title3});
        }
        if (type == 4) {
            return this.setState({imgSrc:title4});
        }
        if (type == 5) {
            return this.setState({imgSrc:title5});
        }
        if (type == 6) {
            return this.setState({imgSrc:title6});
        }
    }

    render() {
        return (
            <div>
                <img src={this.state.imgSrc} style={{width:'100%',marginBottom:'-10px'}}/><img src={imgSrcBody} style={{width:'100%'}}/>
            </div>
        )
    }

}

export default BrandCarsCareRule;
