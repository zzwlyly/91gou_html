$(function () {
    // $.cookie()
    //一般是登录时向服务器发请求获取到Token
    function login(username, password) {
        let param = {"username": username, "password": password};
        $.post("http://127.0.0.1:5000/api/v1/login/", param, function (data) {

            console.log(data);
            function setCookie(name1,name2, value1,value2) {

                var Days = 1;

                var exp = new Date();

                exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);

                document.cookie = "" + name1 + "=" + escape(value1) + ";expires=" + exp.toGMTString();
                document.cookie = "" + name2 + "=" + escape(value2) + ";expires=" + exp.toGMTString();

            }

            setCookie('uid','flag', data[0],data[1]);
            // 带上url参数 header头部 重新发送post请求user信息
            // window.location.href='main.html';
            // 刷新上一页
            // window.location.go(-1);
            window.history.go(-1);
            //将response得到的Token缓存到sessionStorage里面
            // sessionStorage.setItem('Token', data.TOKEN);
        })
            // .error(function (error) {
            //     alert(JSON.parse(error.responseText).errorMsg);
            // })
    }

//登录事件
    $("#login").click(function () {
        // todo 前端登录失败未判断
        var username = $('input[name=username]').val();
        var password = $('input[name=password]').val();
        console.log(username,password);
        login(username, password);
    })
});