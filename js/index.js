$(function () {
    $('.hmtop').load('../basic/common/header.html');
    $('.footer').load('../basic/common/footer.html');

    let USER_API = 'http://127.0.0.1:5000/api/v1/login/response/';
    let cookies = getCookie('uid', 'flag');
    let uid = cookies[0];
    let flag = cookies[2];
    let param = {"uid": uid, "flag": flag};
    if (!isBlank(uid) && flag === "1") {
        console.log('header', param);
        //    判断cookies有值 且是登录状态
        //    发送请求
        $.post(USER_API, param, function (result) {
            // console.log('header', data);
            if (result.status === 200 && result.msg === 'success') {
                // 显示数据
                show_user(result.data);
            }
        })
    }

    function show_user(result) {
        alert(result)
    }

});