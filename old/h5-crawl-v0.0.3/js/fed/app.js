
/**
 * 订单信息
 */
var PLorderInfo = {
    getText:function(){
        var P = PD(".order-manage");
        
        var Pt = P.text();

        if(!Pt.trim().split(/订单详情/)[1]){
           
            errorOrderIdNum.clear();
             return false;
        }

        if(Pt.trim().split(/订单详情/)[1].trim() == '没有该订单相关的信息'){
            errorIDMessg(GetQueryString("bizOrderId"));
            errorOrderIdNum.clear();
            return false;
        }
       

        if(P.length = 0){
            return false;
        }
        var name = orderId = orderOperate = orderState = payId = "";
        try{    
                name = Pt.split(/收货人[:：]/)[1] ? Pt.split(/收货人[:：]/)[1].split(" ")[0].trim():"";
                orderId = Pt.split(/订单编号:|支付宝交易号/)[1].trim();
                orderOperate = PD(".memobook").length > 0 ? PD(".memobook .submsg").text() : "";
                orderState = PD(".express").length;
                payId = Pt.split(/支付宝交易号:|创建时间/)[1].trim();
        }
        catch(err)
        {
            console.log(err);
        }

        if(orderId == "" || isNaN(orderId)){
            orderId = GetQueryString("bizOrderId");
        }
        
        var obj = {
            name:name,
            orderId:orderId,
            orderOperate:orderOperate,
            orderState:orderState,
            payId:payId
        }

        return obj;
    },
    saveInfo:function(){
        var info = this.getText();
    }
}
/**
 * 物流信息
 */
var PLexpressInfo = {
    getText:function(){
        var expName = expId =  "";
        var logisinfo = PD(".logis-info").text();
        try {
            expName = logisinfo.split(/物流公司|运单号码/)[1] ? logisinfo.split(/物流公司|运单号码/)[1].trim() : "";
            expId = logisinfo.split(/运单号码/)[1] ? logisinfo.split(/运单号码/)[1].trim() : "";
        } catch (error) {
            console.log(err);
        }
         var obj = {
            expName:expName,
            expId:expId
        }

        return obj;

    }
}




function isOrderNull() {
    var _host = window.location;
    var _pathName = _host.pathname;
    var mmsg;

    if(_pathName == "/mlapp/odetail.html"){
        mmsg = GoGetOrderInfo();
    }else if(_pathName == "/awp/mtb/oper.htm"){
         mmsg = GoGetExpressInfo();
    }else{
        mmsg = false;
    }

    return mmsg;

}


//获取 订单信息页面的信息总成
function GoGetOrderInfo(){

    PLClearOrderInfo();

    var orderInfo = PLorderInfo.getText();

    if(orderInfo.orderState == 1 || orderInfo.orderState == "1"){
        PLSaveOrderInfo(orderInfo);

        expressUrlGo(orderInfo.orderId)

        return false;
    }

    var  msg = {
        type: "taobao-information",
        uName: orderInfo.name,
        Ocode: orderInfo.orderId,
        Ycode: '',
        Zcode: isNaN(orderInfo.payId) ? undefined : orderInfo.payId,
        UMsg: orderInfo.orderOperate,
        sta: 100,
        Ycop: ''
    };

    return msg;  
}

//获取物流页面的信息总成
function GoGetExpressInfo(){

    var expressInfo = PLexpressInfo.getText();

    var orderInfo = PLGetOrderInfo();

    var  msg;

    if(PLGetOrderInfo()){

        msg = {
            type: "taobao-information",
            uName: orderInfo.name,
            Ocode: orderInfo.orderId,
            Ycode: expressInfo.expId,
            Zcode: isNaN(orderInfo.payId) ? undefined : orderInfo.payId,
            UMsg: orderInfo.orderOperate,
            sta: 100,
            Ycop: expressInfo.expName
        };

    }else{
        msg = false;
    };
    
    return msg;
}

//暂时保存订单信息
function PLSaveOrderInfo(obj){
    localStorage.setItem("PLSaveOrderInfo",JSON.stringify(obj))
}
// 清除 订单信息
function PLClearOrderInfo(){
 localStorage.clear('PLSaveOrderInfo');
}
//获取 订单信息
function PLGetOrderInfo(){
  return  localStorage.getItem('PLSaveOrderInfo') ? JSON.parse(localStorage.getItem('PLSaveOrderInfo')) : false;
}

//自动登陆
function PLLoginTaobao(){


}