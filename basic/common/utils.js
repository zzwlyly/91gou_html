/** 判断是否为空 **/
function isBlank(_value) {
    if (_value == null || _value === "" || _value === undefined) {
        return true;
    }
    return false;
}

/** 验证邮箱  **/
function validateEmailFiled(obj, param, description) {
    if (param.errorCount === 0 && obj.val().length > 0) {
        var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
        if (!reg.test(obj.val())) {
            param.errorCount = param.errorCount + 1;
            floatNotify.simple(description);
        }
    } else {
        param.errorCount = param.errorCount + 1;
        floatNotify.simple(description);
    }
}

/** 验证手机  **/
function validateMobileFiled(obj, param, description) {
    if (param.errorCount === 0) {
//验证电话号码手机号码，包含至今所有号段
        var reg = /^1\d{10}$/;
        if (!reg.test(obj.val())) {
            param.errorCount = param.errorCount + 1;
            floatNotify.simple(description);
        }
    }
}


/**
 * 检查文件类型
 * @param ths file对象
 * @return 是否符合规格
 */
function checkImgType(ths) {
    try {
        var obj_file = $(ths).get(0).files;
        for (var i = 0; i < obj_file.length; i++) {
            if (!/\.(JPEG|BMP|GIF|JPG|PNG)$/.test(obj_file[i].name.toUpperCase())) {
                alert("仅支持JPG、GIF、PNG、JPEG、BMP格式");
                $(ths).val("");
                return false;
            }
        }
    } catch (e) {
    }

    return true;
}

/**
 * 检查文件大小
 * @param ths file对象
 * @param limitSize 限制大小(k)
 * @return 是否符合规格
 */
function checkImgSize(ths, limitSize) {
    try {
        var maxsize = limitSize * 1024;
        var msgSize = limitSize + "K";
        if (limitSize >= 1024) {
            msgSize = limitSize / 1024 + "M";
        }
        var errMsg = "上传的图片不能超过" + msgSize;
        var obj_file = $(ths).get(0).files;

        for (var i = 0; i < obj_file.length; i++) {
            if (obj_file[i].size > maxsize) {
                alert(errMsg);
                $(ths).val("");
                return false;
            }
        }
    } catch (e) {

    }
    return true;
}

//方法，验证密码
function checkPassword() {

    var password = $('input[name=password]').val();

    if (isBlank(password)) {
        alert('密码不能为空！');
        // floatNotify.simple('密码不能为空！');
        return false;
    }

    if (password.length < 8) {
        alert('密码长度不能小于8个字符！！');
        // floatNotify.simple('密码长度不能小于6个字符！');
        return false;
    }

    return true;
}

//方法，检验第二次输入的新密码
function checkConfirmPW() {
    var password = $('input[name=password]').val();
    var confirm = $('input[name=password_repeat]').val();

    if (password !== confirm) {
        alert('两次输入的新密码不一致！！');
        // floatNotify.simple('两次输入的新密码不一致！');
        return false;
    }

    return true;
}



function getCookie(name) {

    var arr = document.cookie.match(new RegExp("(^|)" + name + "=([^;]*)(;|$)"));

    if (arr != null) return unescape(arr[2]);

    return null;

}