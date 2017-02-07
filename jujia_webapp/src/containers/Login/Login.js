import React, { Component, PropTypes } from 'react';
import * as LoginActions from '../../redux/modules/Login/action';
import Loader from '../../components/Loader/Loader';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as OrderActions from '../../redux/modules/Login/action';

@connect(
    state => ({
        loginState: state.login
    }),
    LoginActions,
)



@connect(
    state => ({
        loginState: state.login
    }),
    LoginActions
)
export default class Login extends Component {
    state = {
        verifyText: '验证',
        verifyBtnDisable: false,
        countTime: 10,
        loading: false
    };

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor(props){
        super(props);
        
        let username = "admin";
        let userpwd = "888.1";
        let type = "0";
        this.props.login(username,userpwd,type)
            .then(res => {
                if(res.body.status){
                    this.context.router.push('/home2');
                    console.log('login success');
                    this.setState({isLoading:true}); 
                }
            })


        
    }

    componentWillReceiveProps(props) {        
        const { loginState } = props;
        let loading = !!(loginState.checkVecode.isLoading || loginState.getVercode.isLoading);
        this.setState({ loading });
    }

    sendVerifyCode() {
        let countTime = this.state.countTime;
        this.setState({ verifyBtnDisable: true });
        this.getVecode();

        this.interval = setInterval(() => {
            countTime--;
            this.setState({ verifyText: countTime });

            if (countTime <= 0) {
                clearInterval(this.interval);
                this.setState({
                    verifyText: '重新发送',
                    verifyBtnDisable: false
                });
            }
        }, 1000);
    }

    getVecode() {
        const mobile = this.state.mobile;
        this.props.getVecode(mobile)
    }

    /*login() {
        const { mobile, vecode } = this.state;
        const { location: { query: { a, c } }, checkVecode, registerUser } = this.props;

        this.props.checkVecode(mobile, vecode)
            .then(res => {
                if (res.body.info) {
                    registerUser(mobile, a, c)
                        .then(res => {
                            res.body.info && localStorage.setItem('token', res.body.info);
                            this.context.router.push('/home2');
                            console.log('logindIn!');
                        })
                }
            });
    }*/
    login(){
        const {username, userpwd} = this.state;
        const type = 0;
        this.props.login(username,userpwd,type)
            .then(res => {
                console.log(res);                
                if(res.body.status){
                    this.context.router.push('/home2');
                    console.log('login success');
                    this.setState({isLoading:true}); 
                }
            })

    }

    onFieldChanged(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    goBack() {
        clearInterval(this.interval);
        this.context.router.push('/home2');
    }

    render() {
        console.log(this.props)
        return (
            <form className="container login" onChange={::this.onFieldChanged}>
            <div className="textfield">
            <label>username</label>

                <input type="text" name="username"/>
            <label>userpwd</label>
                <input type="text" name="userpwd"/>
            </div>
                <div className="textfield">
                    <input type="text" pattern="[0-9]*" name="mobile" />
                    <label>手机号</label>
                    <button
                        className="button danger verify-btn"
                        type="button"
                        onClick={::this.sendVerifyCode}
                        disabled={this.state.verifyBtnDisable}>
                        {this.state.verifyText}
                    </button>
                </div>
                <div className="textfield">
                    <input type="text" pattern="[0-9]*" name="vecode" />
                    <label>验证码</label>
                </div>
                <button
                    className="button primary"
                    type="button"
                    onClick={::this.login}>
                    登录
                </button>
                <br/><br/>
                <button className="button primary" type="button" onClick={::this.goBack}>返回</button><br/><br/>
                <Loader show={this.state.loading} />
                {this.state.isLoading}
            </form>
        )
    }
}
