import wx from "weixin-js-sdk";
import http from "./httpClient";

const WeiXin = {
    pay: (prepay_id)=>new Promise((resolve, reject)=>{
        http.get("/api/oauths/wxoauth/getJssdkParam?curl=" +window.encodeURIComponent(window.location)).then((res)=>{
        //function onBridgeReady(){
        //   WeixinJSBridge.invoke(
        //       'getBrandWCPayRequest', {
        //           "appId" : res["appId"],     //公众号名称，由商户传入     
        //           "timeStamp":res["timestamp"],         //时间戳，自1970年以来的秒数     
        //           "nonceStr" : res["nonceStr"], //随机串     
        //           "package" : res["package"],     
        //           "signType": "MD5",         //微信签名方式：     
        //           "paySign" : res["paySign"] //微信签名 
        //       },
        //       function(res){     
        //           if(res.err_msg == "get_brand_wcpay_request：ok" ) {}     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
        //       }
        //   ); 
        //}
        //if (typeof WeixinJSBridge == "undefined"){
        //   if( document.addEventListener ){
        //       document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
        //   }else if (document.attachEvent){
        //       document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
        //       document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
        //   }
        //}else{
        //   onBridgeReady();
        //}
        //return;
            wx.config({
                debug: false,
                appId: res["appId"],
                timestamp: res["timestamp"],
                nonceStr: res["nonceStr"],
                signature: res["signature"],
                jsApiList: res["chooseWXPay"]
            });
            wx.ready(function(){
                http.get("/api/oauths/wxoauth/getwxjssdkpay",{prepay_id}).then((payRes)=>{
                    wx.chooseWXPay({
                        timestamp: payRes["timestamp"],
                        nonceStr: payRes["nonceStr"],
                        package: "prepay_id=" + prepay_id,
                        signType:"MD5",
                        paySign: payRes["paySign"],
                        success:(res)=>{
                            resolve(prepay_id);
                        },
                        cancel: (res)=>{
                            reject("cancel");
                        },
                        fail: (res)=>{
                            alert("fail: " + res.errMsg);
                            reject("fail: " + res.errMsg);
                        }
                    });
                });
            });
            wx.error((res)=>{
                //reject("wx error: " + res.errMsg);
            });
            wx.complete((res)=>{
            })
        },(res)=>{
            alert(res);
        });


    })
}
export default WeiXin;
