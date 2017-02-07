/**
 * Created by Administrator on 2016/7/15.
 */
import React, {Component, PropTypes} from 'react';
import styles from './RechargeRule.scss';
import FlatButton from 'material-ui/FlatButton';
class RechargeRule extends Component {
    static propTypes = {};
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };
    constructor(props) {
        super(props);
    }

    goBack(e){
        e.preventDefault();
        e.stopPropagation();
        this.context.router.push("/recharge");
    }
    render() {
        return (
            <div className={styles.RechargeRule}>
                <h2>充值协议</h2>
                <p>尊敬的客户，为保障您的合法权益，请您在点击“充值”按钮前，完整、仔细地阅读本充值协议。当您继续点击“充值”按钮，即视为您已阅读、理解本协议，并同意按本协议规定执行。</p>
                <div className={styles.ruleList}>
                    <ol>
                        <li>
                            充值方式
                            <br />通过本平台微信端的入口进行充值。
                        </li>
                        <li>
                            充值金额、充值赠送金额（如有）、账户余额
                            <br />充值金额指：本次充值实际支付的金额（人民币）。
                            <br />充值赠送金额指：根据本平台不时推出的充值优惠活动，您充值后，在您充值金额以外，额外赠予的金额。如，您充值100元人民币，根据当时的充值优惠活动赠送您20元，则您成功充值100元后，在本账户内显示的账户总充值金额为120元，超出的20元即为充值赠送金额。
                            <br />
                            账户余额：即您个人账户中当前的金额，账户金额一般通过充值金额、充值赠送金额及其他赠送或补偿的金额获得。
                        </li>
                        <li>
                            账户金额可用于平台所有服务项目的支付（平台特殊标明不允许使用的项目除外）。
                        </li>
                        <li>充值后，充值赠送金额（如有）、充值金额不设有效期，不能转移、转赠。</li>
                        <li>因充值过程中产生的第三方收取的费用（包括但不限于银行手续费、网络流量费）由您负责。</li>
                        <li>充值后，充值金额对应的余额可以提现。您随时可以在本平台中申请，待本平台客服确认您身份后给予办理。促销活动赠送余额、充值赠送余额不可提现。</li>
                        <li>最大可提现金额的计算方法如下：可提现余额=（账户总余额-促销活动赠送余额）*（累计自主充值金额）/（累计自主充值金额+累计自主充值赠送金额）。</li>
                        <li>
                            提现操作完成后，提现金额对应的赠送也一并扣除。提现后剩余余额对应的赠送金额予以保留。如充值100，赠送10元后，余额合计110元。则客户提现总额最高为100元。如果提现50元，则50元对应的赠送金额（为5元）也一并扣除，还有提现手续费50*1%=0.5元。最终账户剩余的金额为：100-50-5-0.5=54.5元。
                        </li>
                        <li>发票金额根据平台实际收到的充值金额开具，充值赠送金额或其他并非您实际支付的费用不能开具发票。您如需开具发票，请联系平台客服。</li>
                        <li>所有余额提现操作需要扣除提现手续费后发放，手续费按照提现金额的1%收取。</li>
                        <li>
                            提现金额按照原充值路径退回：
                            <br />
                            ① 我们将原路退回充值款项。如：当初是微信支付充值，则退回微信钱包；
                            <br />
                            ② 如果因为技术或银行系统障碍，无法原路退回。平台客服将联系您提供其他银行帐号进行转账。

                        </li>
                    </ol>
                </div>
                <FlatButton
                    label="返回"
                    backgroundColor="#d32f2f"
                    hoverColor="#cc3333"
                    className={styles.returnBtn}
                    labelStyle={{
                    color:'#fff',
                    letterSpacing:'0.3rem'
                    }
                   }
                    onTouchTap={(e)=>{this.goBack(e)}}
                />
            </div>
        )
    }
}

export  default RechargeRule;

