/**
 * Created by Administrator on 2016/6/16.
 */
import React, {Component, PropTypes} from 'react';
import PackageItem from'./PackageItem';
import styles from'./BuyPackage.scss';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import *as BuyPackageAction from'../../redux/modules/BuyPackage/action';
import Loader from "../../components/Loader/Loader";
import BaseComponent from "../../components/BaseComponent/BaseComponent";
@connect(
    state=>({}),
    BuyPackageAction
)
class BuyPackage extends Component {
    static propTypes = {};
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };
    state = {
        showLoading: true,
        items: [],
        datas: [],
        showNoPackage: [],
        orLeft: 0,
        orTop: 0,
        left: 0,
        top: 0,
        showMove: false,
        move: false,
        node: null
    };

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.getPackageList();
    }

    componentDidMount() {

    }


    /**
     * 获取优惠券套餐
     */
    getPackageList() {
        this.props.getPackageList().then(res=> {
            if (res.body.status) {
                this.setState({items: res.body.data, showLoading: false});
                if (res.body.data.length > 0) {
                    this.getShoppingCar();
                } else {
                    this.showNoPackage();
                }
            }
        })
    }

    /**
     * 获取购物车
     */
    getShoppingCar() {
        this.props.getShoppingCar().then(res=> {
            if (res.body.status) {
                this.setState({datas: res.body.data});
                setTimeout(this.initSelect(), 1000);
            }
        })
    }

    /*****
     * 添加商品
     * @param index
     * @param otherId
     */
    addNum(index, otherId) {
        var type = 1;
        this.props.addToShoppingCar(otherId, type).then(res=> {
            if (res.body.status) {
                this.setState({datas: res.body.data});
            }
        })
    }

    /**
     * 移除商品
     * @param index
     * @param carId
     */
    deleteNum(index, carId) {
        this.props.deleteByCar(carId).then(res=> {
            if (res.body.status) {
                this.setState({datas: res.body.data})
            }
        })
    }

    gotoUrl(e, url) {
        e.preventDefault();
        e.stopPropagation();
        this.context.router.push(url);
    }

    /**
     * 改变商品选中状态
     * @param index
     * @param isSelect
     */
    changeTodoState(index, isSelect) {
        this.setState({
            items: this.state.items.map((item, i)=> {
                if (index == i) {
                    item.isSelect = isSelect;
                }
                return item;
            })
        });
    }

    addCloneNode(orLeft, orTop) {
        console.log(orLeft, orTop)

        var bottom = this.refs["btnWrap"].clientHeight;
        var windowHeight = document.body.clientHeight - bottom;
        var left = this.refs["shopCar"].offsetLeft + 5 + "px";
        var top = this.refs["shopCar"].offsetTop + windowHeight + "px";
        this.setState({left: left, top: top, showMove: true, orLeft: orLeft + "px", orTop: orTop + "px"})

        setTimeout(()=> {
            this.setState({move: true})
        }, 300)
        setTimeout(()=> {
            this.setState({showMove: false, move: false})
        }, 1200)
    }

    /**
     * 初始化商品选中状态
     */
    initSelect() {
        this.state.datas.map((data)=> {
            this.setState({
                items: this.state.items.map((item)=> {
                    if (item.packageid == data.otherid) {
                        item.isSelect = true;
                    }
                    return item;
                })
            })
        });
    }

    /**
     * 显示结算按钮
     * @returns {*}
     */
    showPayBtn() {
        for (let i = 0; i < this.state.items.length; i++) {
            for (let j = 0; j < this.state.datas.length; j++) {
                if (this.state.items[i].isSelect) {
                    if (this.state.datas[j].otherid == this.state.items[i].packageid) {
                        return true
                    }
                }
            }
        }
    }

    /**
     * 渲染出售优惠券列表
     * @returns {*}
     */
    renderPackageList() {
        if (this.state.items.length > 0) {
            return this.state.items.map((item, i)=>
                <PackageItem
                    key={i}
                    index={i}
                    couponId={item.packageid}
                    type={item.type}
                    faceValue={item.amount}
                    specialValue={item.price}
                    num={item.num}
                    title={item.packagename}
                    content={item.couponInfo}
                    time={item.available_days}
                    items={this.state.items}
                    isSelect={item.isSelect}
                    changeTodoState={this.changeTodoState.bind(this)}
                    addNum={this.addNum.bind(this)}
                    deleteNum={this.deleteNum.bind(this)}
                    addCloneNode={this.addCloneNode.bind(this)}
                    datas={this.state.datas}

                />
            )
        }
    }

    /**
     * 无套餐出售时，显示提示
     */
    showNoPackage() {
        this.setState(
            function () {
                this.state.showNoPackage.push(
                    <div className={styles.noPackage}>
                        近期暂无套餐出售，敬请期待！
                    </div>)
            }
        )
    }

    render() {
        var allMoney = 0,
            original = 0;
        this.state.datas.map(data=> {
            return allMoney += data.price, original += data.amount;
        });
        var saveMoney = (original - allMoney).toFixed(0);
        var node = [];
        if (this.state.node) {
            node.push(this.state.node);
        }
        var moveStyle = this.state.move ? {
            position: "fixed",
            left: this.state.left,
            top: this.state.top,
            transition: "all 1s",
            WebkitTransition: "all 1s",
            WebkitTransitionTimingFunction: "ease",
        } : {
            position: "fixed",
            left: this.state.orLeft,
            top: this.state.orTop
        };
        return (
            <BaseComponent>
                <div className={styles.BuyPackage}>
                    <Loader show={this.state.showLoading}/>
                    <div className={styles.packageList}>
                        {::this.renderPackageList()}
                        {this.state.showNoPackage}
                    </div>

                    <div className={styles.btnWrap} ref="btnWrap">
                        <div ref="shopCar" className={styles.shopCar}><i className="icon iconfont">&#xe62b;</i>
                            <div className={styles.num}>{this.state.datas.length}</div>
                        </div>
                        <div className={styles.moneyWrap}><span className={styles.total}>合计:</span><span
                            className={styles.totalMoney}>￥{allMoney.toFixed(0)}</span><span
                            className={styles.saveMoney}>(优惠:￥{saveMoney})</span></div>
                        {::this.showPayBtn() ?
                            <div className={styles.payPackageBtn} onTouchTap={(e)=>{this.gotoUrl(e,"/payPackage")}}>
                                购买
                            </div> : <div className={styles.tipBtn}>
                            添加商品
                        </div>
                        }
                    </div>
                    {
                        this.state.showMove &&
                        <i className={"icon iconfont "+styles.cloneBtn} style={moveStyle}>&#xe616;</i>
                    }
                </div>
            </BaseComponent>
        )
    }
}
export default BuyPackage;
