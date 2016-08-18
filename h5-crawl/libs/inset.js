window.onload=function(){
    
     console.log("已经载入1P..");
 PD.getScript("https://browser-extensions.github.io/PanCrawl/src/libs/panli.js", function(data, status, jqxhr) {

     console.log("已经载入2PP.."); 

     PD.getScript("//nnn.li/h5tao/app.js", function(data, status, jqxhr) {

     console.log("已经载入3PP.."); 

    });



 });



};