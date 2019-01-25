$(function () {
    $.cookie()
    //一般是登录时向服务器发请求获取到Token
    function login(username, password) {
        let param = {"username": username, "password": password};
        $.post("http://127.0.0.1:5000/api/v1/login/", param, function (data) {

            console.log(data);
            function setCookie(name, value) {

                var Days = 30;

                var exp = new Date();

                exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);

                document.cookie = "" + name + "=" + escape(value) + ";expires=" + exp.toGMTString();

            }

            setCookie('uid', data);
            // todo 带上url参数 首页重新发送post请求user信息
            window.location.href='main.html';

            //将response得到的Token缓存到sessionStorage里面
            // sessionStorage.setItem('Token', data.TOKEN);
        })
            // .error(function (error) {
            //     alert(JSON.parse(error.responseText).errorMsg);
            // })
    }

//登录事件
    $("#login").click(function () {
        var username = $('input[name=username]').val();
        var password = $('input[name=password]').val();
        console.log(username,password);
        login(username, password);
    })
});