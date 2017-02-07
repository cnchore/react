import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from 'containers/App/App';
import {
    Home,
    Home2,
    Login,
    Order,
    User,
    CheckIn,
    Ctlogin,
    SaveKey,
    TakeKey,
    SelectService,
    OrderList,
    OrderDetail,
    WaitService,
    CarManager,
    ParkingManager,
    MyCoupon,
    ServiceEvaluate,
    BaseComponent,
    BuyPackage,
    PayPackage,
    MyBalance,
    BalanceDetails,
    Recharge,
    RechargeRule,
    MyCustomService,
    NovicePackageRule,
    VipPackageRule,
    FiftyYuanRule,
    OneYuanRule,
    BrandCarsCare,
    GoodsDetail,
    BuyingActivity,
    BrandCarsCareRules,
    AddNewUserRule,
    BrandCarsCareRule,
    AnionCouponRule,
    OpenRedPackets,
    AddNewUser,
    AttentionPage,
    ModifyPhone,
    OrderStation,
    OrderPhone,
    Banner3
} from './containers';

export default (store) => (
    <Route path='/' component={App}>
        <IndexRoute component={Home}/>
        <Route path="home3" component={Home2}/>
        <Route path="home2" component={Home2}/>
        <Route path="login" component={Login}/>
        <Route path="home" component={Home}/>
        <Route path="order" component={Order}/>
        <Route path="user" component={User}/>
        <Route path="checkIn" component={CheckIn}/>
        <Route path="ctlogin" component={Ctlogin}/>
        <Route path="saveKey" component={SaveKey}/>
        <Route path="takeKey" component={TakeKey}/>
        <Route path="selectService" component={SelectService}/>
        <Route path="orderList" component={OrderList}/>
        <Route path="orderDetail" component={OrderDetail}/>
        <Route path="waitService" component={WaitService}/>
        <Route path="carManager" component={CarManager}/>
        <Route path="parkingManager" component={ParkingManager}/>
        <Route path="myCoupon" component={MyCoupon}/>
        <Route path="serviceEvaluate" component={ServiceEvaluate}/>
        <Route path="baseComponent" component={BaseComponent}/>
        <Route path="buyPackage" component={BuyPackage}/>
        <Route path="payPackage" component={PayPackage}/>
        <Route path="myBalance" component={MyBalance}/>
        <Route path="balanceDetails" component={BalanceDetails}/>
        <Route path="recharge" component={Recharge}/>
        <Route path="rechargeRule" component={RechargeRule}/>
        <Route path="myCustomService" component={MyCustomService}/>
        <Route path="novicePackageRule" component={NovicePackageRule}/>
        <Route path="vipPackageRule" component={VipPackageRule}/>
        <Route path="fiftyYuanRule" component={FiftyYuanRule}/>
        <Route path="oneYuanRule" component={OneYuanRule}/>
        <Route path="brandCarsCareRules" component={BrandCarsCareRules}/>
        <Route path="brandCarsCare" component={BrandCarsCare}/>
        <Route path="goodsDetail" component={GoodsDetail}/>
        <Route path="buyingActivity" component={BuyingActivity}/>
        <Route path="brandCarsCareRule" component={BrandCarsCareRule}/>
        <Route path="addNewUserRule" component={AddNewUserRule}/>
        <Route path="anionCouponRule" component={AnionCouponRule}/>
        <Route path="openRedPackets" component={OpenRedPackets}/>
        <Route path="addNewUSer" component={AddNewUser}/>
        <Route path="attentionPage" component={AttentionPage}/>
        <Route path="modifyPhone" component={ModifyPhone}/>
        <Route path="orderStation" component={OrderStation}/>
        <Route path="orderPhone" component={OrderPhone}/>
        <Route path="banner3" component={Banner3}/>
    </Route>
)
