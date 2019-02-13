/**
 * Created by Administrator on 2017/5/24.
 */

$(function () {
    $('.hmtop').load('../basic/common/header.html');
    // $('.footer').load('../basic/common/footer.html');
    // 用户购物车商品显示
    let USER_API = 'http://127.0.0.1:5000/api/v1/login/response/';
    let uid = getUid('uid');
    let flag = getFlag('flag');
    let param = {"uid": uid, "flag": flag};
    if (!isBlank(uid) && flag === "1") {
        // console.log('person_index', param);
        //    判断cookies有值 且是登录状态
        //    发送请求
        $.post(USER_API, param, function (result) {
            if (result.status === 200 && result.msg === 'success') {
                // 显示数据
                get_user_info(result.data.cart_item);
                // get_user_info(result.data.cart_item);
                select_event()
            }
        })
    }

    function get_user_info(result) {

        // $('.shop_info')
        //     .append(
        //         $('<div class="all_check">')
        //             .append(
        //                 $('<input type="checkbox" id="shop_a" class="shopChoice">')
        //                 )
        //             .append(
        //                 $('<label for="shop_a" class="shop">')
        //                 )
        //         )
        //     .append(
        //         $('<div class="shop_name">')
        //             .append(
        //                 $('<a href="javascript:;">').text('91商城自营')
        //                 )
        //         );

        for (let good of result) {
            if (good.flag === 1) {
                let price = good.goods.good_price * good.good_quantity;
                $('.order_content').append(
                    $('<ul class="order_lists order_ul">').attr('id', good.good_id)
                        .append(
                            $('<li class="list_chk">')
                                .append(
                                    $('<input type="checkbox" id="checkbox_2" class="son_check">')
                                    )
                                .append(
                                    $('<label for="checkbox_2">')
                                    )
                            )
                        .append(
                            $('<li class="list_con">')
                                .append(
                                    $('<div class="list_img">')
                                        .append(
                                            $('<a>')
                                                .attr('href', 'detail.html?good_id=' + good.good_id)
                                                .append(
                                                    $('<img>').attr('src', '../images/' + good.goods.show_img + '.jpg')
                                                    )
                                            )
                                    )
                                .append(
                                    $('<div class="list_text">')
                                        .append(
                                            $('<a>').attr('href', 'detail.html?good_id=' + good.good_id)
                                                .text(good.goods.good_desc)
                                            )
                                    )
                            )
                        .append(
                            $('<li class="list_info">')
                                .append(
                                    $('<p>').text('规格：默认')
                                    )
                            // .append(
                            //     $('<p>').text('规格：默认')
                            //     )
                            )
                        .append(
                            $('<li class="list_price">')
                                .append(
                                    $('<p class="price">').text('￥' + good.goods.good_price)
                                    )
                            )
                        .append(
                            $('<li class="list_amount">')
                                .append(
                                    $('<div class="amount_box">')
                                        .append(
                                            $('<a href="javascript:;" class="reduce reSty">').text('-')
                                            )
                                        .append(
                                            $('<input type="text" class="sum">').attr('value', good.good_quantity)
                                                .attr('good_id', good.good_id)
                                            )
                                        .append(
                                            $('<a href="javascript:;" class="plus">').text('+')
                                            )
                                    )
                            )
                        .append(
                            $('<li class="list_sum">')
                                .append(
                                    $('<p class="sum_price">')
                                        .text('￥' + price)
                                    )
                            )
                        .append(
                            $('<li class="list_op">')
                                .append(
                                    $('<p class="del">')
                                        .append(
                                            $('<a href="javascript:;" class="delBtn">')
                                                .attr('gid', good.good_id)
                                                .text('移除商品')
                                            )
                                    )
                            )
                    )
            }
        }
    }


    function select_event() {
        //全局的checkbox选中和未选中的样式
        var $allCheckbox = $('input[type="checkbox"]'),     //全局的全部checkbox
            $wholeChexbox = $('.whole_check'),
            $cartBox = $('.cartBox'),                       //每个商铺盒子
            $shopCheckbox = $('.shopChoice'),               //每个商铺的checkbox
            $sonCheckBox = $('.son_check');
        //每个商铺下的商品的checkbox
        $allCheckbox.click(function () {
            if ($(this).is(':checked')) {
                $(this).next('label').addClass('mark');
            } else {
                $(this).next('label').removeClass('mark')
            }
        });

        //===============================================全局全选与单个商品的关系================================
        $wholeChexbox.click(function () {
            var $checkboxs = $cartBox.find('input[type="checkbox"]');
            if ($(this).is(':checked')) {
                $checkboxs.prop("checked", true);
                $checkboxs.next('label').addClass('mark');
            } else {
                $checkboxs.prop("checked", false);
                $checkboxs.next('label').removeClass('mark');
            }
            totalMoney();
        });


        $sonCheckBox.each(function () {
            $(this).click(function () {
                if ($(this).is(':checked')) {
                    //判断：所有单个商品是否勾选
                    var len = $sonCheckBox.length;
                    var num = 0;
                    $sonCheckBox.each(function () {
                        if ($(this).is(':checked')) {
                            num++;
                        }
                    });
                    if (num === len) {
                        $wholeChexbox.prop("checked", true);
                        $wholeChexbox.next('label').addClass('mark');
                    }
                } else {
                    //单个商品取消勾选，全局全选取消勾选
                    $wholeChexbox.prop("checked", false);
                    $wholeChexbox.next('label').removeClass('mark');
                }
            })
        });

        //=======================================每个店铺checkbox与全选checkbox的关系/每个店铺与其下商品样式的变化===================================================

        //店铺有一个未选中，全局全选按钮取消对勾，若店铺全选中，则全局全选按钮打对勾。
        $shopCheckbox.each(function () {
            $(this).click(function () {
                if ($(this).is(':checked')) {
                    //判断：店铺全选中，则全局全选按钮打对勾。
                    var len = $shopCheckbox.length;
                    var num = 0;
                    $shopCheckbox.each(function () {
                        if ($(this).is(':checked')) {
                            num++;
                        }
                    });
                    if (num === len) {
                        $wholeChexbox.prop("checked", true);
                        $wholeChexbox.next('label').addClass('mark');
                    }

                    //店铺下的checkbox选中状态
                    $(this).parents('.cartBox').find('.son_check').prop("checked", true);
                    $(this).parents('.cartBox').find('.son_check').next('label').addClass('mark');
                } else {
                    //否则，全局全选按钮取消对勾
                    $wholeChexbox.prop("checked", false);
                    $wholeChexbox.next('label').removeClass('mark');

                    //店铺下的checkbox选中状态
                    $(this).parents('.cartBox').find('.son_check').prop("checked", false);
                    $(this).parents('.cartBox').find('.son_check').next('label').removeClass('mark');
                }
                totalMoney();
            });
        });


        //========================================每个店铺checkbox与其下商品的checkbox的关系======================================================

        //店铺$sonChecks有一个未选中，店铺全选按钮取消选中，若全都选中，则全选打对勾
        $cartBox.each(function () {
            var $this = $(this);
            var $sonChecks = $this.find('.son_check');
            $sonChecks.each(function () {
                $(this).click(function () {
                    if ($(this).is(':checked')) {
                        //判断：如果所有的$sonChecks都选中则店铺全选打对勾！
                        var len = $sonChecks.length;
                        var num = 0;
                        $sonChecks.each(function () {
                            if ($(this).is(':checked')) {
                                num++;
                            }
                        });
                        if (num === len) {
                            $(this).parents('.cartBox').find('.shopChoice').prop("checked", true);
                            $(this).parents('.cartBox').find('.shopChoice').next('label').addClass('mark');
                        }

                    } else {
                        //否则，店铺全选取消
                        $(this).parents('.cartBox').find('.shopChoice').prop("checked", false);
                        $(this).parents('.cartBox').find('.shopChoice').next('label').removeClass('mark');
                    }
                    totalMoney();
                });
            });
        });


        //=================================================商品数量==============================================
        var $plus = $('.plus'),
            $reduce = $('.reduce'),
            $all_sum = $('.sum');

        $plus.click(function () {
            // todo 修改商品数量，将最新数量 $count 保存到数据库
            var $inputVal = $(this).prev('input'),
                $count = parseInt($inputVal.val()) + 1,
                $obj = $(this).parents('.amount_box').find('.reduce'),
                $priceTotalObj = $(this).parents('.order_lists').find('.sum_price'),
                $price = $(this).parents('.order_lists').find('.price').html(),  //单价
                $priceTotal = $count * parseInt($price.substring(1));
            $inputVal.val($count);
            $priceTotalObj.html('￥' + $priceTotal);
            if ($inputVal.val() > 1 && $obj.hasClass('reSty')) {
                $obj.removeClass('reSty');
            }
            totalMoney();
            let good_id = $inputVal.attr('good_id');
            console.log(good_id);
            update_count(good_id, $count)
        });

        $reduce.click(function () {
            // todo 修改商品数量，将最新数量 $count 保存到数据库
            var $inputVal = $(this).next('input'),
                $count = parseInt($inputVal.val()) - 1,
                $priceTotalObj = $(this).parents('.order_lists').find('.sum_price'),
                $price = $(this).parents('.order_lists').find('.price').html(),  //单价
                $priceTotal = $count * parseInt($price.substring(1));
            if ($inputVal.val() > 1) {
                $inputVal.val($count);
                $priceTotalObj.html('￥' + $priceTotal);
            }
            if ($inputVal.val() === 1 && !$(this).hasClass('reSty')) {
                $(this).addClass('reSty');
            }
            totalMoney();
            let good_id = $inputVal.attr('good_id');
            update_count(good_id, $count)
        });

        $all_sum.keyup(function () {
            // todo 修改商品数量，将最新数量 $count 保存到数据库
            var $count = 0,
                $priceTotalObj = $(this).parents('.order_lists').find('.sum_price'),
                $price = $(this).parents('.order_lists').find('.price').html(),  //单价
                $priceTotal = 0;
            if ($(this).val() === '') {
                $(this).val('1');
            }
            $(this).val($(this).val().replace(/\D|^0/g, ''));
            $count = $(this).val();
            $priceTotal = $count * parseInt($price.substring(1));
            $(this).attr('value', $count);
            $priceTotalObj.html('￥' + $priceTotal);
            totalMoney();

            let good_id = $(this).attr('good_id');
            update_count(good_id, $count)
        });

        //======================================移除商品========================================

        var $order_lists = null;
        var $order_content = '';
        var $good_id = '';
        $('.delBtn').click(function () {
            $order_lists = $(this).parents('.order_lists');
            $good_id = $(this).attr('gid');
            $order_content = $order_lists.parents('.order_content');
            $('.model_bg').fadeIn(300);
            $('.my_model').fadeIn(300);
        });

        //关闭模态框
        $('.closeModel').click(function () {
            closeM();
        });
        $('.dialog-close').click(function () {
            closeM();
        });

        function closeM() {
            $('.model_bg').fadeOut(300);
            $('.my_model').fadeOut(300);
        }

        //确定按钮，移除商品
        $('.dialog-sure').click(function () {
            // todo 删除购物车商品条目,通过$good_id
            console.log('$good_id', $good_id);
            $order_lists.remove();
            if ($order_content.html().trim() == null || $order_content.html().trim().length === 0) {
                $order_content.parents('.cartBox').remove();
            }
            closeM();
            $sonCheckBox = $('.son_check');
            totalMoney();
            delete_cart($good_id);
            location.reload();
        });

        //======================================总计==========================================

        function totalMoney() {
            var total_money = 0;
            var total_count = 0;
            var calBtn = $('.calBtn a');
            $sonCheckBox.each(function () {
                if ($(this).is(':checked')) {
                    var goods = parseInt($(this).parents('.order_lists').find('.sum_price').html().substring(1));
                    var num = parseInt($(this).parents('.order_lists').find('.sum').val());
                    total_money += goods;
                    total_count += num;
                }
            });
            $('.total_text').html('￥' + total_money);
            $('.piece_num').html(total_count);

            // console.log(total_money,total_count);

            if (total_money !== 0 && total_count !== 0) {
                if (!calBtn.hasClass('btn_sty')) {
                    calBtn.addClass('btn_sty');
                    // 可结算， todo 有bug，可点击后变成不可点击又可以点结算了
                    let btn_sty = $('.btn_sty');
                    btn_sty.click(function () {
                        let ul_list = document.querySelectorAll('.order_ul');
                        let good_id = [];
                        for (let ul of ul_list) {
                            good_id.push(ul.id);
                        }
                        console.log('good_id', good_id.join(','));
                        param = {
                            'uid': uid,
                            'good_id': good_id.join(','),
                        };
                        $.post("http://127.0.0.1:5000/api/v1/cart/", param, function () {
                        });

                        $.post("http://127.0.0.1:5000/api/v1/orders/", {'uid': uid}, function (data) {
                            let pay_param = {'uid': uid, 'oid': data};
                            $.post("http://127.0.0.1:5000/api/v1/alipay/", pay_param, function (data) {
                                // window.location.href = data
                                window.open(data,"_blank");
                            })
                        });
                        $('.order_content').empty();
                    })
                }
            } else {
                if (calBtn.hasClass('btn_sty')) {
                    calBtn.removeClass('btn_sty');
                }
            }
        }

        function update_count(good_id, quantity) {
            param = {
                'uid': uid,
                'good_id': good_id,
                'quantity': quantity,
            };
            $.post("http://127.0.0.1:5000/api/v1/cart/", param, function () {
                // console.log('购物车修改成功')
            })
        }

        function delete_cart(good_id) {
            param = {
                'uid': uid,
                'good_id': good_id,
            };
            $.post("http://127.0.0.1:5000/api/v1/cart/del/", param, function () {
                // console.log('购物车修改成功')
            })
        }

    }


});