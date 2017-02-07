/**
 * 常用工具类
 */
const Common={
	/**
	 * [formatCouponDate 格式化优惠券日期]
	 * @param  {[type]} starttime     [开始时间]
	 * @param  {[type]} endtime       [结束时间]
	 * @param  {[type]} availableDays [有效期]
	 * @return {[type]}               [description]
	 */
    formatCouponDate:function(starttime,endtime,availableDays){
        if(availableDays>1000){
            return "永久有效";
        }
        var startDate=new Date(starttime.substring(0,10));
        var start=startDate.getFullYear()+"."+(startDate.getMonth()+1)+"."+startDate.getDate();
        var endDate=new Date(endtime.substring(0,10));
        var end=endDate.getFullYear()+"."+(endDate.getMonth()+1)+"."+endDate.getDate();
        return start+"-"+end;
    },
    /**
     * [formatCouponCode 格式化优惠券兑换码]
     * @param  {[type]} code [兑换码]
     * @return {[type]}      [description]
     */
    formatCouponCode:function(code){
        if(code==null){
            return "";
        }
        var str="";
        for(var i=0;i<code.length;i++){
            str+=code[i];
            if((i+1)%4==0){
                str+=" ";
            }
        }
        return str;
    },
    /**
     * [formatDateDT 格式化日期DT]
     * @param  {[type]} value [时间]
     * @return {[type]}       [description]
     */
    formatDateDT:function(value){
        if(value&&value.length>0){
            value=value.replace("Z"," ").replace("T"," ").replaceAll("-","/");
            return new Date(Date.parse(value));            
        }
        return new Date();
    },
    /**
     * [getKeyState 获取钥匙状态]
     * @param  {[type]} keyType    [钥匙类型]
     * @param  {[type]} ifusing    [是否已使用]
     * @param  {[type]} orderState [订单状态]
     * @param  {[type]} cellId     [格子ID]
     * @return {[type]}            [description]
     */
    getKeyState:function(keyType,ifusing,orderState,cellId){        
        if(cellId>0){
            if(keyType==1&&ifusing==0&&orderState==4){
                return 15;//车主待存钥匙
            }
            if((keyType==1&&ifusing==1&&orderState==4)||((keyType==2&&ifusing==0&&orderState==7)||(keyType==1&&ifusing==1&&orderState==7))||(keyType==4&&orderState==4)||(keyType==3&&orderState==4)){
                return 11;//车主已放钥匙
            }
            if((keyType==2&&ifusing==1&&orderState==7)||(keyType==2&&ifusing==1&&orderState==9)){
                return 12;//车主已取钥匙
            }
            if(keyType==4&&ifusing==1&&orderState==8){
                return 14;//技师已取钥匙
            }
            if((keyType==3&&ifusing==1&&orderState==9)||(keyType==2&&ifusing==0&&orderState==9)){
                return 13;//技师已放钥匙
            }
        }
        return 0;//无钥匙柜
    },
    /**
     * [getParameterByName 根据参数名获取Url参数值]
     * @param  {[type]} name [参数名]
     * @param  {[type]} url  [Url地址]
     * @return {[type]}      [description]
     */
    getParameterByName:function(name,url){
        if(!url){
            url=window.location.href;
        }
        name=name.replace(/[\[\]]/g,"\\$&");
        var regex=new RegExp("[?&]"+name+"(=([^&#]*)|&|#|$)"),
            results=regex.exec(url);
        if(!results){
            return null;
        }
        if(!results[2]){
            return '';
        }
        return decodeURIComponent(results[2].replace(/\+/g," "));
    },
    /**
     * [formatPayType 格式化支付类型]
     * @param  {[type]} data [支付方式数组]
     * @return {[type]}      [description]
     */
    formatPayType:function(data){
        if(!data){
            return "";
        }
        var arr=data.split(",");
        var str="";
        for(var i=0;i<arr.length;i++){
            switch(arr[i]){
                case "1":
                    str+="微信支付,";
                    break;
                case "2":
                    str+="支付宝支付,";
                    break;
                case "3":
                    str+="银联支付,";
                    break;
                case "4":
                    str+="网银支付,";
                    break;
                case "5":
                    str+="财付通支付,";
                    break;
                case "6":
                    str+="会员卡支付,";
                    break;
                case "7":
                    str+="优惠券支付,";
                    break;
                case "8":
                    str+="余额支付,";
                    break;                
            }        
        }        
        return str.substring(0,str.length-1);
    },
    /**
     * [isEmptyObj 判断Object/json是否为空]
     * @param  {[type]}  obj [需要判断的对象或Json]
     * @return {Boolean}     [description]
     */
    isEmptyObj:function(obj){
        var t;
        for(t in obj){
            return !1;
        }
        return !0;
    },
    /**
     * [getEvaluate 获取评价信息]
     * @param  {[type]} list [评价标签数组]
     * @return {[type]}      [标签组合]
     */
    getEvaluate:function(list){
        if(!list||list.length==0){
            return "";
        }
        var result="";
        for(var i=0;i<list.length;i++){
            if(list[i].isActive){
                result+=list[i].name+",";                
            }
        }
        return result.substring(0,result.length-1);
    },
    /**
     * [getEvaluateContent 获取评价内容]
     * @param  {[type]} content [评价内容]
     * @return {[type]}         [过滤后的评价内容]
     */
    getEvaluateContent:function(content){
        var index=content.indexOf("。输入评价：")+6;
        var result=content.substring(index,content.length);
        return result;        
    },
    /**
     * [getEvaluateLabels 获取评价云标签]
     * @param  {[type]} content [评价内容]
     * @return {[type]}         [云标签]
     */
    getEvaluateLabels:function(content){
        var index=content.indexOf("。输入评价：");
        if(index<=0){
            return "";
        }
        var labels=content.substring(0,index).split(",");
        var result="";
        for(var i=0;i<labels.length;i++){
            result+=labels[i];
            if(i<labels.length-1){
                result+=" | ";
            }
        }
        return result;                
    },
    /**
     * [filterArea 过滤区域]
     * @param {[type]} areaname [区域名]
     */
    filterArea : function (areaname) {
        if (!areaname) {
            return;
        }
        var areaList = [
            { areaname: '凤锦苑', filter: /\[((010)|(030)|(040))(([\u4e00-\u9fa5])|(\w))+\]/gi },
            { areaname: '凤天苑', filter: /\[((010)|(030)|(040))(([\u4e00-\u9fa5])|(\w))+\]/gi },
            { areaname: '凤馨苑', filter: /\[((010)|(060))(([\u4e00-\u9fa5])|(\w))+\]/gi },
            { areaname: '凤妍苑', filter: /\[((010))(([\u4e00-\u9fa5])|(\w))+\]/gi },
            { areaname: '东门商业街', filter: /\[((010)|(060))(([\u4e00-\u9fa5])|(\w))+\]/gi },
            { areaname: '云麓公馆', filter: /\[(000)(([\u4e00-\u9fa5])|(\w))+\]/gi },
            { areaname: '云山诗意', filter: /\[(000)(([\u4e00-\u9fa5])|(\w))+\]/gi },
            { areaname: '中海锦城', filter: /\[(000)(([\u4e00-\u9fa5])|(\w))+\]/gi },
            { areaname: '东陵广场', filter: /\[(010)(([\u4e00-\u9fa5])|(\w))+\]/gi },
        ];

        var _result = '';
        areaList.map(function (area) {
            if (areaname.indexOf(area.areaname) > -1) {
                _result = areaname.replace(area.filter, '').replace(/\[\d{3}/gi, '').replace(/]/gi, '').replace(".","");
                return false;
            }
        })
        return _result;
    },
    /**
     * [formatPhone 格式化手机号码]
     * @param {[type]} phone [手机号码]
     */
    formatPhone: function (phone) {
        var format = '';
        if (phone) {
            var reg = /(\d{3})(\d{1,4})/;
            var len = phone.length;
            if(len >= 3 && len <= 7){
                format = phone.replace(reg, '$1-$2');
            }else if(len > 7){
                format = phone.replace(reg, '$1-$2-');
            }else{
                format = phone;
            }
        }
        return format;
    },
    /**
     * [formatCarnum 格式化车牌]
     * @param {[type]} carnum [车牌]
     */
    formatCarnum: function(carnum){
        var format = '';
        if (carnum) {
            var reg = /(\w{1})([\d\w]{0,5})/;
            var len = carnum.length;
            if(len >= 2 && len <= 7){
                format = carnum.replace(reg, '$1·$2');
            }else{
                format = carnum;
            }
        }
        return format;

    },
    extendObj() { //扩展对象
        var args = arguments;
        if (args.length < 2) return;
        var temp = cloneObj(args[0]); //调用复制对象方法
        for (var n = 1; n < args.length; n++) {
            for (var i in args[n]) {
                temp[i] = args[n][i];
            }
        }
        return temp;
    },
    //自定义加法运算
    addNum (num1, num2) {
        var sq1,sq2,m;
        try {
            sq1 = num1.toString().split(".")[1].length;
        }
        catch (e) {
            sq1 = 0;
        }
        try {
            sq2 = num2.toString().split(".")[1].length;
        }
        catch (e) {
            sq2 = 0;
        }
        m = Math.pow(10,Math.max(sq1, sq2));
        return (num1 * m + num2 * m) / m;
    },
    //自定义加法运算
    decNum (num1, num2) {
        var sq1,sq2,m;
        try {
            sq1 = num1.toString().split(".")[1].length;
        }
        catch (e) {
            sq1 = 0;
        }
        try {
            sq2 = num2.toString().split(".")[1].length;
        }
        catch (e) {
            sq2 = 0;
        }
        m = Math.pow(10,Math.max(sq1, sq2));
        return (num1 * m - num2 * m) / m;
    },
    
}
/**
 * [replaceAll 匹配全部]
 * @param  {[type]} s1 [需要替换的值]
 * @param  {[type]} s2 [替换值]
 * @return {[type]}    [description]
 */
String.prototype.replaceAll=function(s1,s2){
    return this.replace(new RegExp(s1,"gm"),s2);
}
/**
 * [addDate 添加日期]
 * @param {[type]} days [日期]
 */
Date.prototype.addDate=function(days){
    var d=this;
    d.setDate(d.getDate()+days);
    var month=d.getMonth()+1;
    var day=d.getDate();
    if(month<10){
        month="0"+month;
    }
    if(day<10){
        day="0"+day;
    }
    var val=d.getFullYear()+"-"+month+"-"+day;
    return val;
};
/**
 * [format 时间格式化]
 * @param  {[type]} format [时间格式]
 * @return {[type]}        [description]
 */
Date.prototype.format=function (format) {
    var o={
        "Y+":this.getFullYear(),//年
        "M+":this.getMonth()+1,//月份
        "d+":this.getDate(),//日
        "h+":this.getHours(),//小时
        "m+":this.getMinutes(),//分
        "s+":this.getSeconds(),//秒
        "q+":Math.floor((this.getMonth()+3)/3),//季度
        "S":this.getMilliseconds()//毫秒           
    };
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for(var k in o){
        if (new RegExp("(" + k + ")").test(format)) format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
    return format;
};
/**
 * [indexOf 获取元素在数组中的索引]
 * @param  {[type]} val [元素]
 * @return {[type]}     [description]
 */
Array.prototype.indexOf=function(val){
    for(var i=0;i<this.length;i++){
        if(this[i]==val){
            return i;
        }
    }
};
/**
 * [remove 移除数组中指定元素]
 * @param  {[type]} val [指定元素]
 * @return {[type]}     [description]
 */
Array.prototype.remove=function(val){
    var index=this.indexOf(val);
    if(index>-1){
        this.splice(index,1);
    }
}
export default Common;
