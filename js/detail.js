let url = location.search;
let good_id = url.split('=')[1];
console.log(good_id);
// let good_id = '7437788';
$(function () {
    $('.hmtop').load('../basic/common/header.html');
    $('.footer').load('../basic/common/footer.html');
    let param = {"good_id": good_id};
    $.get(GOODS_URL, param, function (result) {
        if (result.status === 200 && result.data) {
            console.log(result.data);
            for (let good of result.data) {
                if (good_id === good.good_id) {
                    let $ul_img = $('<ul class="tb-thumb" id="thumblist">');
                    $('.item-inform')
                        .append($('<div class="clearfixLeft" id="clearcontent">')
                            .append($('<div class="box">')
                                /* 商品大图*/
                                // '../images/'+ good.show_img +'.jpg'
                                    .append($('<div class="tb-booth tb-pic tb-s310">')
                                        .append($('<a>')
                                            .append($('<img class="jqzoom">').attr('src', '../basic/images/main1.jpg'))
                                        )
                                    )
                                    /*商品小图*/
                                    .append(
                                        $ul_img
                                    )
                            )
                        )

                        /* 商品详情*/
                        .append($('<div class="clearfixRight">')
                            .append($('<div class="tb-detail-hd">')
                                /*商品名称*/
                                    .append($('<h1>').text(good.good_desc))
                            )
                            .append($('<div class="tb-detail-list">')
                                /*价格*/
                                    .append($('<div class="tb-detail-price">')
                                        .append($('<li class="price iteminfo_price">')
                                            .append($('<dt>').text('促销价'))
                                            .append($('<dd>')
                                                .append($('<em>').text('¥'))
                                                .append($('<b class="sys_item_mktprice">').text(good.good_price))
                                            )
                                        )
                                        .append($('<li class="price iteminfo_mktprice">')
                                            .append($('<dt>').text('原价'))
                                            .append($('<dd>')
                                                .append($('<em>').text('¥'))
                                                .append($('<b class="sys_item_mktprice">').text(good.good_price + 100))
                                            )
                                        )
                                    )
                                    /*地址*/
                                    .append($('<dl class="iteminfo_parameter freight">')
                                        .append($('<dt>').text('配送至'))
                                        .append($('<div class="iteminfo_freprice">')
                                            .append($('<div class="am-form-content address">')
                                                .append($('<select data-am-selected>')
                                                    .append($('<option value="a">').text('浙江省'))
                                                    .append($('<option value="b">').text('湖北省'))
                                                )
                                            )
                                            .append($('<div class="am-form-content address">')
                                                .append($('<select data-am-selected>')
                                                    .append($('<option value="a">').text('温州市'))
                                                    .append($('<option value="b">').text('武汉市'))
                                                )
                                            )
                                            .append($('<div class="am-form-content address">')
                                                .append($('<select data-am-selected>')
                                                    .append($('<option value="a">').text('瑞安区'))
                                                    .append($('<option value="b">').text('洪山区'))
                                                )
                                            )
                                            .append($('<div class="pay-logis">')
                                                .append($('<span>').text('快递'))
                                                .append($('<b class="sys_item_freprice">').text(10))
                                                .append($('<span>').text('元'))
                                            )
                                        )
                                    )
                                    .append($('<div class="clear">'))
                                    /*销量*/
                                    .append($('<ul class="tm-ind-panel">')
                                        .append($('<li class="tm-ind-item tm-ind-sellCount canClick">')
                                            .append($('<div class="tm-indcon">')
                                                .append($('<span class="tm-label">').text('月销量'))
                                                .append($('<span class="tm-count">').text(1015))
                                            )
                                        )
                                        .append($('<li class="tm-ind-item tm-ind-sellCount canClick">')
                                            .append($('<div class="tm-indcon">')
                                                .append($('<span class="tm-label">').text('累计销量'))
                                                .append($('<span class="tm-count">').text(6015))
                                            )
                                        )
                                        .append($('<li class="tm-ind-item tm-ind-sellCount canClick">')
                                            .append($('<div class="tm-indcon">')
                                                .append($('<span class="tm-label">').text('累计评价'))
                                                .append($('<span class="tm-count">').text(640))
                                            )
                                        )
                                    )
                                    .append($('<div class="clear">'))
                                    /*各种规格*/
                                    .append($('<dl class="iteminfo_parameter sys_item_specpara">')
                                        .append($('<dt class="theme-login">')

                                            // .append($('<div class="cart-title">').text('可选规格')
                                            //     .append($('<span class="am-icon-angle-right">'))
                                            // )
                                        )
                                        .append($('<dd>')
                                            .append($('<div class="theme-popover-mask">'))
                                            .append($('<div class="theme-popover">')
                                                // .append($('<div class="theme-span">'))
                                                // .append($('<div class="theme-poptit">')
                                                //     .append($('<a href="javascript:;" title="关闭" class="close">').text('X'))
                                                // )
                                                    .append($('<div class="theme-popbod dform">')
                                                        .append($('<form class="theme-signin" name="loginform" action="" method="post">')
                                                            .append($('<div class="theme-signin-left">')
                                                                // .append($('<div class="theme-options good_sku">')
                                                                //
                                                                //
                                                                // )
                                                                /*数量*/
                                                                    .append($('<div class="theme-options2">')
                                                                        .append($('<div class="cart-title number">').text('数量'))
                                                                        .append($('<dd>')
                                                                            .append($('<input id="min" class="min am-btn am-btn-default" name="" type="button" value="-"/>'))
                                                                            .append($('<input id="text_box" name="" type="text" value="1" style="width:30px;"/>'))
                                                                            .append($('<input id="add" class="am-btn am-btn-default" name="" type="button" value="+"/>'))
                                                                            .append($('<span id="Stock" class="tb-hidden">').text('库存'))
                                                                            .append($('<span class="stock">').text(good.goods_sku[0].good_stock))
                                                                        )
                                                                    )
                                                                    .append($('<div class="clear">'))
                                                                    .append($('<div class="btn-op">')
                                                                        .append($('<div class="btn am-btn am-btn-warning">').text('确认'))
                                                                        .append($('<div class="btn close am-btn am-btn-warning">').text('取消'))
                                                                    )
                                                            )
                                                        )
                                                    )
                                            )
                                        )
                                    )
                                    .append(
                                        $('<div class="shopPromotion gold">')
                                            .append(
                                                $('<div class="hot">')
                                                    .append(
                                                        $('<dt class="tb-metatit">').text('店铺优惠')
                                                    )
                                                    .append(
                                                        $('<div class="gold-list">')
                                                            .append(
                                                                $('<p>').text('购物满2件打8折，满3件7折')
                                                                    .append(
                                                                        $('<span>').text('点击领券')
                                                                            .append(
                                                                                $('<i class="am-icon-sort-down">')
                                                                            )
                                                                    )
                                                            )
                                                    )
                                                    .append(
                                                        $('<div class="clear">')
                                                    )
                                            )
                                            .append(
                                                $('<div class="coupon">')
                                                    .append(
                                                        $('<dt class="tb-metatit">').text('优惠券')
                                                    )
                                                    .append(
                                                        $('<div class="gold-list">')
                                                            .append(
                                                                $('<ul>')
                                                                    .append(
                                                                        $('<li>').text('125减5')
                                                                    )
                                                                    .append(
                                                                        $('<li>').text('198减10')
                                                                    )
                                                                    .append(
                                                                        $('<li>').text('298减20')
                                                                    )
                                                            )
                                                    )
                                            )
                                    )
                            )
                            .append($('<div class="pay">')
                                .append($('<li>')
                                    .append($('<div class="clearfix tb-btn tb-btn-buy theme-login">')
                                        .append($('<a id="LikBuy" title="点此按钮到下一步确认购买信息" href="#">').text('立即购买'))
                                    )
                                )
                                .append($('<li>')
                                    .append($('<div class="clearfix tb-btn tb-btn-buy theme-login">')
                                        .append($('<a id="LikBasket" title="加入购物车" href="#">').text('加入购物车'))
                                    )
                                )
                            )
                        )
                        /*操作页面*/

                        .append($('<div class="clear">'))
                        /*优惠套装*/
                        .append($('<div class="match">')
                            .append($('<div class="match-title">').text('优惠套餐'))
                            .append($('<div class="match-comment">')
                                .append($('<ul class="like_list">')
                                    .append($('<li>')
                                        .append($('<div class="s_picBox">')
                                            .append($('<a class="s_pic" href="#">')
                                                .append($('<img>').attr('src', '../images/cp.jpg'))
                                            )
                                        )
                                        .append($('<a class="txt" target="_blank" href="#">').text('萨拉米 1+1小鸡腿'))
                                        .append($('<div class="info-box">')
                                            .append($('<span class="info-box-price">').text('¥ 29.90'))
                                            .append($('<span class="info-original-price">').text('￥ 199.00'))
                                        )
                                    )
                                    .append($('<li class="plus_icon">')
                                        .append($('<i>').text('+'))
                                    )
                                    .append($('<li>')
                                        .append($('<div class="s_picBox">')
                                            .append($('<a class="s_pic" href="#">')
                                                .append($('<img>').attr('src', '../images/cp2.jpg'))
                                            )
                                        )
                                        .append($('<a class="txt" target="_blank" href="#">').text('ZEK 原味海苔'))
                                        .append($('<div class="info-box">')
                                            .append($('<span class="info-box-price">').text('¥ 8.90'))
                                            .append($('<span class="info-original-price">').text('￥ 299.00'))
                                        )
                                    )
                                    .append($('<li class="plus_icon">')
                                        .append($('<i>').text('='))
                                    )
                                    .append($('<li class="total_price">')
                                        .append($('<p class="combo_price">')
                                            .append($('<span class="c-title">').text('套餐价:'))
                                            .append($('<span>').text('￥35.00'))
                                        )
                                        .append($('<p class="save_all">').text('共省:')
                                            .append($('<span>').text('￥463.00'))
                                        )
                                        .append($('<a href="#" class="buy_now">').text('立即购买'))
                                    )
                                    .append($('<li class="plus_icon">')
                                        .append($('<i class="am-icon-angle-right">'))
                                    )
                                )
                            )
                        )
                        .append($('<div class="clear">'));

                    //    商品左边图片
                    for (let good_img of good.goods_img.slice(0, 3)) {
                        let img = '../basic/images/main' + (good.goods_img.indexOf(good_img) + 1) + '.jpg';
                        $ul_img
                            .append($(' <li class="tb-selected">')
                                .append($('<div class="tb-pic tb-s40">')
                                    .append(
                                        $('<a>')
                                        // .append($('<img>').attr('src', '../images/'+ good_img.img +'.jpg')
                                        //     .attr('mid', '../images/'+ good_img.img +'.jpg').attr('big', '../images/'+ good_img.img +'.jpg')
                                        // )
                                            .append($('<img>').attr('src', img)
                                                .attr('mid', img).attr('big', img)
                                            )
                                    )
                                )
                            )
                    }
                    /*导航栏点击事件*/

                    $('.nav-cont>ul>li').click(function () {
                        $(this).css('background', 'red');
                        $(this).siblings().css('background', 'none')
                    });


                    /*购物车点击事件*/
                    $('#LikBasket').click(function () {
                        let number = parseInt($('#text_box').val());
                        $('#J_MiniCartNum').text(number + 1);
                        $('.cart_num').text(number + 1);
                        data = {
                            number: number,
                            good_id: good.goods_id
                        };
                        $.get(GOODS_URL, function (result) {
                            let num = parseInt($('#text_box').val())
                        })
                    });


                    /*切换图片*/
                    $(".jqzoom").imagezoom();
                    $("#thumblist li a").click(function () {
                        $(this).parents("li").addClass("tb-selected").siblings().removeClass("tb-selected");
                        $(".jqzoom").attr('src', $(this).find("img").attr("mid"));
                        $(".jqzoom").attr('rel', $(this).find("img").attr("big"));
                    });
                    /*点击数量的点击事件*/
                    $('#add').click(function () {
                        let number = $('#add').prev().val();
                        number++;
                        $('#add').prev().val(number)
                    });
                    $('#min').click(function () {
                        let number = $("#min").next().val();
                        number = number > 1 ? number - 1 : number;
                        $("#min").next().val(number)
                    });


                    /*推荐*/
                    $('.introduce')
                        .append($('<div class="browse">')
                            .append($('<div class="mc">')
                                .append($('<ul>')
                                    .append($('<div class="mt">')
                                        .append($('<h2>').text('看了又看'))
                                    )
                                    .append($('<li class="first">')
                                        .append($('<div class="p-img">')
                                            .append($('<a href="#">')
                                                .append($('<img>').attr('src', '../images/browse1.jpg'))
                                            )
                                        )
                                        .append($('<div class="p-name">')
                                            .append($('<a href="#">').text('【三只松鼠_开口松子】零食坚果特产炒货东北红松子原味'))
                                        )
                                        .append($('<div class="p-price">')
                                            .append($('<strong>').text('￥35.90'))
                                        )
                                    )
                                )
                            )
                        );
                    $('.twlistNews').append($('<img>').attr('src', '../images/10.jpg'))
                        .append($('<img>').attr('src', '../images/4.jpg'))
                        .append($('<img>').attr('src', '../images/5.jpg'))
                        .append($('<img>').attr('src', '../images/6.jpg'))
                        .append($('<img>').attr('src', '../images/7.jpg'))
                        .append($('<img>').attr('src', '../images/8.jpg'))
                        .append($('<img>').attr('src', '../images/9.jpg'));


                    /*全部评价*/
                    $('.p-bfc').append($('<q class="comm-tags">').append($('<span>').text('味道不错'))
                        .append($('<em>').text('(2177)'))
                    );
                    /*评论*/
                    $('.am-comments-list').append($('<li class="am-comment">')
                        .append($('<a href="">')
                            // 用户头像
                                .append($('<img class="am-comment-avatar">').attr('src', '../images/hwbn40x40.jpg'))
                        )
                        .append($('<div class="am-comment-meta">')
                            //用户名
                                .append($('<a href="#link-to-user" class="am-comment-author">').text('b***1 (匿名)'))
                                //评论日期
                                .append($('<time datetime="">').text('2015年11月02日 17:46'))
                        )
                        .append($('<div class="am-comment-bd">')
                            .append($('<div class="tb-rev-item " data-id="255776406962">')
                                //   评论内容
                                    .append($('<div class="J_TbcRate_ReviewContent tb-tbcr-content ">').text('摸起来丝滑柔软，不厚，没色差，颜色好看！买这个衣服还接到诈骗电话，我很好奇他们是怎么知道我买了这件衣服，并且还知道我的电话的！'))
                            )
                            // 购买产品型号
                            .append($('<div class="tb-r-act-bar">').text('颜色分类：柠檬黄&nbsp;&nbsp;尺码：S'))
                        )
                    );

                    /*猜你喜欢*/
                    $('.am-avg-sm-2').append($('<li>')
                        .append($('<div class="i-pic limit">')
                            .append($('<div class="i-pic limit">')
                                // 添加图片信息
                                    .append($('<img>').attr('src', '../images/imgsearch1.jpg'))
                                    // 添加文本信息
                                    .append($('<p>').text('【良品铺子_开口松子】零食坚果特产炒货')
                                        .append($('<span>').text('东北红松子奶油味'))
                                    )
                                    //  价格信息
                                    .append($('<p class="price fl">')
                                        .append($('<b>').text('￥'))
                                        .append($('<strong>').text('298.00'))
                                    )
                            )
                        )
                    ).append($('<div class="clear">'));

                    let good_spu = good.goods_spu[0].spu_prop.slice(1, -1).split(',');
                    // console.log(good_spu);
                    // console.log(good_spu[1].trim().slice(1, -1));
                    // console.log(good_spu[1].slice(1, -1));
                    for (let spu of good_spu) {
                        //.trim()
                        $('#J_AttrUL').append($('<li title="">').text(spu.trim().slice(1, -1)))
                        // alert('spu')
                    }

                }
            }
        }
    })


    /**/
})
;

