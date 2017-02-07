import React, { Component, PropTypes } from 'react';
import Dialog from "material-ui/Dialog";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as OrderActions from '../../redux/modules/Order/action';

@connect(
    state => ({
    }),
    OrderActions
)


export class Progress extends React.Component {
    static propTypes = {

    };

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    static state  = {
        open: false,
        model:[
                { flag: 1, title: '待付款', note: '您的订单未付款，付款后我们将尽快安排技师施工。', url: 'QuickOrder2.html', buttons: [{ title: '知道了', event: 'closeprogress()' }, { title: '去付款', event: 'gopage($event)' }] },
                { flag: 2, title: '待存钥匙', note: '您已成功下单，请尽快存钥匙。', url: 'SaveKey3.html', buttons: [{ title: '知道了', event: 'closeprogress()' }, { title: '存钥匙', event: 'gopage($event)' }] },
                { flag: 3, title: '待施工', note: '已经为您派单，技师准备施工！完工后短信提示，最迟', url: 'OrderDetail2.html', buttons: [{ title: '查看详情', event: 'gopage($event)' }, { title: '知道了', event: 'closeprogress()' }] },
                { flag: 4, title: '正在施工', note: '您的订单正在施工！', url: 'OrderDetail2.html', buttons: [{ title: '查看详情', event: 'gopage($event)' }, { title: '知道了', event: 'closeprogress()' }] },
                { flag: 5, title: '取钥匙', note: '您的订单已完成施工！请取钥匙。', url: 'TakeKeys3.html', buttons: [{ title: '知道了', event: 'closeprogress()' }, { title: '取钥匙', event: 'gopage($event)' }] },
                { flag: 6, title: '待评价', note: '感谢您使用居家养车服务！期待您在微信为技师服务评价、点赞、吐槽。', url: 'evaluate.html', buttons: [{ title: '知道了', event: 'closeprogress()' }, { title: '去评价', event: 'gopage()' }] },
                { flag: 7, title: '车问题', note: '技师施工前检查，发现您的爱车外观有些状况，特意提醒，请查看。', url: 'OrderDetail2.html', buttons: [{ title: '知道了', event: 'closeprogress()' }, { title: '查看详情', event: 'gopage($event)' }] }
            ]
    };
    constructor(props){
        super(props);
    }

    //    getUnfinishOrder(){
    //        this.props.getUnfinishOrder().then((res)=>{
    //            if(res.body.status){
    //                var order = res.body.data;
    //                var _status = parseInt(order["_status"]);
    //                var state = parseInt(order["state"]);
    //                if (_status == 2) {
    //                    scope.orderprogress.flag = 6;
    //                    scope.orderprogress.flag2 = 10;
    //                } else if (state < 3) {
    //                    scope.orderprogress.flag = 1;
    //                    scope.orderprogress.flag2 = 7;
    //                } else if (data_obj.cellid > 0 && _status == 0) {
    //                    scope.orderprogress.flag = 2;
    //                } else if ((data_obj.cellid > 0 || data_obj.cellid == 0) && state == 4) {
    //                    scope.orderprogress.flag = 3;
    //                    scope.orderprogress.flag2 = 8;
    //                    if (data_obj.est_finishtime) {
    //                        var _ft = calc_est_finishtime(data_obj.est_finishtime);
    //                        scope.orderprogress.progress.finishtimestr = _ft;
    //                    }
    //                } else if (data_obj.cellid > 0 && _status == 1) {
    //                    scope.orderprogress.flag = 5;
    //                } else if (state == 8) {
    //                    scope.orderprogress.flag = 4;
    //                    scope.orderprogress.flag2 = 9;
    //                    if (parseInt(data_obj["problem_state"]) > 0) {
    //                        scope.orderprogress.flag = 7;
    //                        scope.orderprogress.flag2 = (data_obj.cellid > 0 ? 11 :12);
    //                    }
    //                } else {
    //                    scope.orderprogress.flag = 0;
    //                }
    //
    //                $.each(_model, function () {
    //                    if (this.flag == scope.orderprogress.flag) {
    //                        scope.orderprogress.progress = $.extend(scope.orderprogress.progress, this);
    //                        if (scope.orderprogress.progress.finishtimestr) {
    //                            scope.orderprogress.progress.note += scope.orderprogress.progress.finishtimestr;
    //                        }
    //                        return false;
    //                    }
    //                })
    //
    //                if (data_obj.cellid > 0 && scope.orderprogress.flag != 7) {
    //                    scope.orderprogress.flag2 = scope.orderprogress.flag;
    //                }
    //
    //                if (data_obj.cellid > 0 && scope.orderprogress.flag == 5 && state == 7) {
    //                    scope.orderprogress.progress.note = scope.orderprogress.progress.note.replace('完成施工', '取消');
    //                }
    //            }
    //        });
    //
    //    }
    //
    handleClose() {
        this.setState({open: false});
    }



    render () {
        var actions = {

        }
        return (
            <div>
                <Dialog
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                    提交申请后，客服会尽快与您联系返工事宜。
                </Dialog>
            </div>
        )
    }
}

export default Progress;

