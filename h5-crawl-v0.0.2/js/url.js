



//获取跳转的url
function openTaoBaoUrl(ID){
   
   var urlA = [
       "https://h5.m.taobao.com/mlapp/odetail.html?bizOrderId="
       
   ]
        
   var url = urlA[0]+ID;   
   return url;    
}

/**
 * 跳转路由
 */
var routerTao = {
    order:function(id){
        return 'https://h5.m.taobao.com/mlapp/odetail.html?bizOrderId='+id;
    },
    express:function(id){
        return 'https://h5.m.taobao.com/awp/mtb/oper.htm?operId=0&orderId='+id;
    }
}


//路由转发

function routerUrl(){
     
     
    chrome.storage.sync.get('OrderIdIndex', function(data) {
        
        if(data.OrderIdIndex){
            
            console.log(data.OrderIdIndex)
            
            var fenId = "OrderIdAll_"+data.OrderIdIndex;
            
            routerUrlTwo(fenId)
            
        }
        
    })
     
}

//路由转发2
function routerUrlTwo(fenId){
    
    chrome.storage.sync.get(fenId, function(data) {  
                if(data[fenId]){
                   
                    var _code = _.head(data[fenId]);
                    
                    console.log(fenId);
                    
                    if(_code){
                        
                        
                        setTimeout(function(){                     
                                locationUrlGo(_code);       
                        },2000)  
                        
                        // 获取设置时间
                        // getSetTimeoutF(function(dTime){
                            
                        //     setTimeout(function(){                     
                        //         locationUrlGo(_code);       
                        //     },3000)  
                            
                        // })
                        
                         
                    }else{
                        
                        console.log("减少一个index表Rot2")
                
                        fenIdJian(function(n){
                            
                                 
                            if(n== 0){
                                noCrawlOrder();
                                return;
                            } 
                            
                            routerUrl();
                            
                           
                        });
                        
                        
                        
                    }
                    
                }
                
             })

}

   
// 跳转 订单详细 url
function locationUrlGo(id){  
    
    window.location.href = openTaoBaoUrl(id);
} 

// 跳转 到物流信息 url
function expressUrlGo(id){  
    
    window.location.href = routerTao.express(id);
}    
   