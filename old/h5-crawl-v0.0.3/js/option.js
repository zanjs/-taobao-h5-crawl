// chrome.runtime.sendMessage('Hello', function(response){
//     document.write(response);
// });

PD(function() {

    // 获取设置时间
    getSetTimeoutF(function(dTime) {


        $("#setTime").val(dTime);

        $('select').material_select();

    });


    // get_new_version();

    // 获取设置账户名称
    getSetUnameF(function(dname) {
        if (dname) {
            PD("#first_name").val(dname);
        }
    });

    // 获取设置订单号地址
    getSetUrl(function(dname) {
        if (dname) {
            PD("#getDataUrl").val(dname);
        }
    });

    // 获取设置订单号地址
    getSetPostUrl(function(dname) {
        if (dname) {
            PD("#postDataUrl").val(dname);
        }
    });


    // 获取账户类型
    getSetNumberTypeF(function(type) {
        if (type) {

            $('input:radio[value=' + type + ']').attr('checked', 'true');


        }

    });


    $('#setForm').on('submit', function() {

        var _t = $(this),
            _Type = $("input[name='numberType']:checked").val(),

            _setTime = $("#setTime").find("option:selected").val(),
            _uname = $("#first_name").val().replace(/(^\s+)|(\s+$)/g, ""),
            _getUrl = $("#getDataUrl").val().replace(/(^\s+)|(\s+$)/g, ""),
            _postUrl = $("#postDataUrl").val().replace(/(^\s+)|(\s+$)/g, "");


        var setData = {
            name: _uname,
            time: _setTime,
            type: _Type,
            getUrl: _getUrl,
            postUrl: _postUrl
        };


        setFormALl(setData, function() {

            PL.open({
                content: '设置成功',
                time: 2
            });


        });



        return false;
    });



    //   postOrderInfoServer();


})

