$(function () {
    $('.hmtop').load('../basic/common/header.html');
    $('.footer').load('../basic/common/footer.html');

    console.log('index js 加载成功！');
    let USER_API = 'http://127.0.0.1:5000/api/v1/login/response/';
    let ADDRESS = 'http://127.0.0.1:5000/api/v1/address/';
    let INFORMATION = "http://127.0.0.1:5000/api/v1/information/";
    let uid = getUid('uid');
    let flag = getFlag('flag');
    let param = {"uid": uid, "flag": flag};
    if (!isBlank(uid) && flag === "1") {
        console.log('person_index', param);
        //    判断cookies有值 且是登录状态
        //    发送请求
        $.post(USER_API, param, function (result) {
            if (result.status === 200 && result.msg === 'success') {
                // 显示数据
                get_user_info(result.data);
                let user_info = result.data;
                for (let users of user_info.address) {
                    // console.log(user_info.username)
                    $('#add_address')
                        .append($('<li class="user-addresslist defaultAddr">')
                            .append($('<span class="new-option-r">')
                                .append('<i class="am-icon-check-circle">')
                                )
                            .append($('<p class="new-tit new-p-re">')
                                .append($('<span class="new-txt">')
                                    .text(users.name)
                                    )
                                .append($('<span class="new-txt-rd2">')
                                    .text(users.phone)
                                    )
                                )
                            .append($('<div class="new-mu_l2a new-p-re">')
                                .append($('<p class="new-mu_l2cw">')
                                    .append($('<span class="title">')
                                        .text("地址: ")
                                        )
                                    .append($('<span class="street">')
                                        .text(users.detail)
                                        )
                                    .append($('<span class="province">')
                                        .text(users.address)
                                        )
                                    )
                                )
                            )
                }
                // for (let order of user_info.orders) {
                //     console.log(order.order_item.goods.show_img);
                // $('.order-main')
                //     .append($('<div class="order-list">')
                //         .append($('<div class="order-status5">')
                //             .append($('<div class="order-title">')
                //                 .append($('<div class="dd-num">')
                //                     .text("订单编号: ")
                //                     .append($('<a>')
                //                         .attr('href','#')
                //                         .text(order.old)
                //                     )
                //                     .append($('span')
                //                         .text("成交时间: " + order.create_time)
                //                     )
                //                 )
                //             )
                //             .append($('<div class="order-content">')
                //                 .append($('<div class="order-left">')
                //                     .append($('<ul class="item-list">')
                //                         .append($('<li class="td td-item">')
                //                             .append($('<div class="item-pic">')
                //                                 .append($('<a class="J_MakePoint">')
                //                                     .attr('href','#')
                //                                     .append($('<img class="itempic J_ItemImg">')
                //                                         .attr('sre',order.)
                //                                     )
                //                                 )
                //                             )
                //                         )
                //                     )
                //                 )
                //             )
                //         )
                //     )
                //     }
            }
        });

        function adr(name, phone, detail, address) {
            let data1 = {
                "uid": uid,
                'name': name,
                'phone': phone,
                'detail': detail,
                'address': address,
            };
            $.post(ADDRESS, data1, function (data) {
                console.log(data)
            })
        }

        function infor(nick_name, username, sex, birthday, telephone, email) {
            let data2 = {
                'uid': uid,
                'nick_name': nick_name,
                'username': username,
                'birthday': birthday,
                'sex': sex,
                'telephone': telephone,
                'email': email,
            };
            $.post(INFORMATION, data2, function (data2) {
                console.log(data2)
            })
        }
    }

    function get_user_info(result) {
        console.log(result)

    }

    $('.s-name').text('社会我欢哥！');


    function getUid(name) {

        var arr = document.cookie.match(new RegExp("(^|)" + name + "=([^;]*)(;|$)"));

        if (arr != null) return unescape(arr[2]);

        return null;

    }

    function getFlag(name) {

        var arr = document.cookie.match(new RegExp("(^|)" + name + "=([^;]*)(;|$)"));

        if (arr != null) return unescape(arr[2]);

        return null;

    }

    $('#address').click(function () {
        let name = $('input[name=name]').val();
        let phone = $('input[name=phone]').val();
        let detail = $('input[name=detail]').val();
        let address = $('textarea[name=address]').val();
        console.log(name, phone, detail, address);
        adr(name, phone, detail, address);
    });
    $('#information').click(function () {
        let nick_name = $('input[name=nick_name]').val();
        let username = $('input[name=username]').val();
        let sex = $('input[name=sex]').val();
        let birthday = $('input[name=birthday]').val();
        let telephone = $('input[name=telephone]').val();
        let email = $('input[name=email]').val();
        console.log(nick_name, username, sex, birthday, telephone, email);
        infor(nick_name, username, sex, birthday, telephone, email);
    })
});