import React, { Component, PropTypes } from 'react';
import {List,ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import aiche from './images/aiche.png';
import del from './images/shanchu.png';
import car from './images/car.png'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import styles from './CarManager.scss';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as CarManagerActions from "../../redux/modules/CarManager/action";
import Loader from "../../components/Loader/Loader";
import BaseComponent from "../../components/BaseComponent/BaseComponent";

@connect(
    state=>({
        getCarListState: state.getCarList,
        delCarState: state.delCar
    }),
    CarManagerActions
)

class CarManager extends Component {
    static propTypes = {};

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };
    state = {
        open: false,
        delId: 0,
        carManagerList: []
    };

    handleOpen(carid) {
        this.setState({delId: carid});
        this.setState({open: true});
    }

    handleClose() {
        this.setState({open: false});
        this.setState({delId: 0});
    }

    constructor(props) {
        super(props);
        this.handleOpen = ::this.handleOpen;
        this.handleClose = ::this.handleClose;
    }

    /**
     * 组件加载时自动执行
     */
    componentWillMount() {
        console.log("CarManager组件加载时执行!!!");
        this.initCarList();
    }

    /**
     * [initCarList 初始化车列表]
     * @return {[type]} [description]
     */
    initCarList() {
        this.setState({showLoading: true});
        this.props.getCarList().then(res=> {
            if (res.body.status) {
                this.renderCarList(res.body.data);
                var self = this;
                setTimeout(function () {
                    self.setState({showLoading: false});
                }, 1000);
            }
        })
    }

    renderCarList(data) {
        var self = this;
        var listItem = [];
        var delStyles = {
            borderRadius: '0 !important',
            backgroundColor: 'white !important',
            height: '20px',
            width: '20px',
            top: '20px',
            backgroundSize: '16px 20px !important',
            backgroundPosition: '50% 50% !important',
            backgroundRepeat: 'no-repeat !important'
        };
        data.map(function (item, i) {
            listItem.push(<ListItem key={i} primaryText={item.carnum} className={styles.item}
                                    leftAvatar={<Avatar src={aiche} />}
                                    rightAvatar={<Avatar src={del} style={delStyles} className={
                                        styles.backgroundImage
                                    }   onTouchTap={self.handleOpen.bind(this,item.carid)} />}/>)
        });
        if (data.length > 0) {
            this.setState({
                carManagerList: <div className={styles.carManager}>
                    <List className={styles.list}>
                        {listItem}
                    </List>
                </div>
            });
        } else {
            this.setState({
                carManagerList: <div className={styles.noCarWrap}>
                    <div><img src={car} className={styles.carIcon}/></div>
                    <div className={styles.noCar}><span >尚未下过单,无爱车记录,</span>
                        <a className={styles.goOrder} onTouchTap={(e)=>{self.gotoUrl(e,"/selectService")}}>去下单!</a>
                    </div>
                </div>
            });
        }
    }

    /**
     * [delCar 删除车]
     * @return {[type]} [description]
     */
    delCar() {
        const {delId}=this.state;
        this.props.delCar(delId).then(res=> {
            if (res.body.status) {
                this.initCarList();
            }
            this.handleClose();
        })
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

    render() {
        const action = [
            <FlatButton label="取消" primary={true} onTouchTap={this.handleClose}/>,
            <FlatButton label="确定" primary={true} keyboardFocused={true} onTouchTap={::this.delCar}/>
        ];
        return (
            <BaseComponent>
                <Loader show={this.state.showLoading}/>
                {this.state.carManagerList}
                <Dialog
                    title="是否删除车辆"
                    actions={action}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}>
                    是否确认删除该车辆呢！
                </Dialog>
            </BaseComponent>
        )
    }
}

export default CarManager;
