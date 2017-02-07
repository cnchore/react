import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules'
import ToggleDisplay from '../internal/ToggleDisplay';
import styles from './loader.scss';
import Loading from "react-loading";
import {red500} from "material-ui/styles/colors";

class Loader extends Component {
    static propTypes = {
        show: PropTypes.bool.isRequired
    };

    constructor(props) {
        super(props);
        this.onTouchMove = this.onTouchMove.bind(this);
    }

    onTouchMove(e) {
        e.preventDefault();
    }

    render() {
        const { show, hideBg } = this.props;
        const loadingStyle = {
            top:-100,
            bottom:0,
            left:0,
            right:0,
            position:"fixed",
            margin:"auto",
            marginTop:"200px",
            height:"60px",
            width:"100px"
        }
        var bg = <div styleName='loadingBg' onTouchMove={this.onTouchMove}>
                     <div style={loadingStyle}>
                        <Loading type="bubbles" color={"#cc3333"} height="60px" width="100px" />
                     </div>
                </div>


        if(hideBg){
            bg = <div styleName='loadingBg2' onTouchMove={this.onTouchMove}>
                     <div style={loadingStyle}>
                        <Loading type="bubbles" color={"#cc3333"} height="60px" width="100px" />
                     </div>
                </div>

        }

        return(
            <ToggleDisplay show={show}>
                {bg}
          </ToggleDisplay>
        );
    }
}

export default CSSModules(Loader, styles, { allowMultiple: true} );
