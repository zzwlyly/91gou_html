$(function () {
    $('.hmtop').load('../basic/common/header.html');
    $('.footer').load('../basic/common/footer.html');


    $.get(NAV_URL, function (result) {

        if (result.status === 200 && result.msg === 'success') {
            // 动态添加三级菜单
            add_category(result.data);
            // 数据库只有8条数据，所以执行两次，显示16条导航
            add_category(result.data);
        }


        // 分类三级联动菜单
        $('.am-slider').flexslider();
        $("li").hover(function () {
            $(".category-content .category-list li.first .menu-in").css("display", "none");
            $(".category-content .category-list li.first").removeClass("hover");
            $(this).addClass("hover");
            $(this).children("div.menu-in").css("display", "block")
        }, function () {
            $(this).removeClass("hover");
            $(this).children("div.menu-in").css("display", "none")
        });
    });

    // 分类
    function add_category(result) {
        for (let cate_1 of result) {
            let $li = $('<li>');
            let $div = $('<div>').addClass('sort-side');
            $('.category-list')
                .append(
                    $li
                        .append(
                            // $('<>')
                            $('<div>').addClass('category-info')
                                .append(
                                    $('<h3>').addClass('category-name').addClass('b-category-name')
                                        .append(
                                            // todo 如果需要图标再加
                                            // $('<i>')
                                            //     .append(
                                            //         $('<img>').attr('src','../images/cake.png')
                                            //     )
                                            $('<a>').addClass('ml-22').attr('title', cate_1.name).text(cate_1.name)
                                        )
                                        .append(
                                            $('<em>').text('>')
                                        )
                                )
                        )
                        .append(
                            $('<div>').addClass('menu-item').addClass('menu-in').addClass('top')
                                .append(
                                    $('<div>').addClass('area-in')
                                        .append(
                                            $('<div>').addClass('area-bg')
                                                .append(
                                                    $('<div>').addClass('menu-srot')
                                                        .append(
                                                            $div
                                                        )
                                                )
                                        )
                                )
                        )
                );
            // 二级分类
            for (let cate_2 of cate_1.children) {
                let $dl = $('<dl>').addClass('dl-sort');
                $div
                    .append(
                        $dl
                            .append(
                                $('<dt>')
                                    .append(
                                        $('<span>').attr('title', cate_2.name).text(cate_2.name)
                                    )
                            )
                    );
                // 三级分类
                for (let cate_3 of cate_2.children) {
                    $dl.append
                    ($('<dd>')
                        .append(
                            $('<a>').attr('title', cate_3.name).attr('href','/')
                                .append(
                                    $('<span>').text(cate_3.name)
                                )
                        )
                    )
                }
            }
        }
    }

    // 热门倒计时
    let a = 57600000;         //以毫秒为单位
    function fomtime() {
        a = a - 1000;
        var b = new Date();
        b.setTime(0);
        var c = new Date();
        c.setTime(a);
        var day1 = b.getDate();        //为方便调用，把天数、小时等单独定义
        var hours1 = b.getUTCHours();
        var minu1 = b.getMinutes();
        var seco1 = b.getSeconds();
        var day2 = c.getDate();
        var hours2 = c.getHours();
        var minu2 = c.getMinutes();
        var seco2 = c.getSeconds();
        var day = day2 - day1;
        var hours = hours2 - hours1;
        var minu = minu2 - minu1;
        var seco = seco2 - seco1;
        $('#hh').html(hours);
        $('#mm').html(minu);
        $('#ss').html(seco);
        // setTimeout("fomtime()", 1000);
    }
    //
    fomtime();
    setInterval(fomtime, 1000);

    //    热门商品
    for (let i = 1; i < 5; i++) {
        $('.sale').append(
            $('<div class="am-u-sm-3 sale-item">')
                .append(
                    $('<div>').addClass('s-img')
                        .append(
                            $('<a>').attr('href', '#')
                                .append(
                                    $('<img>').attr('src', '../images/sale' + i + '.jpg')
                                )
                        )
                ).append(
                $('<div>').addClass('s-info')
                    .append(
                        $('<a>').attr('href', '#')
                            .append(
                                $('<p>').addClass('title').text('ZEK 原味海苔')
                            )
                    )
                    .append(
                        $('<div>').addClass('s-price').text('￥')
                            .append(
                                $('<b>').text('9.90')
                            )
                            .append(
                                $('<a>').addClass('s-buy').attr('href', '#').text('秒杀')
                            )
                    )
            )
        )
    }

    //    楼层商品展示
    // $.get(SUBS_URL, function (result) {
    //     if (result.status === 200 && result.msg === 'success') {
    //         // 商品展示
    //         add_goods(result.data);
    //     }
    // });

    // function add_goods(result) {
    //     for (let sub of result.slice(0, 2)) {
    //         // console.log(result.indexOf(sub));
    //         let $brands = $('<div class="today-brands brands" style="right:0;top:13px;">');
    //         let $floodSix = $('<div class="am-g am-g-fixed floodSix ">');
    //         $('#shopmain').append(
    //             $('<div>').addClass('f' + (result.indexOf(sub) + 1))
    //                 .append(
    //                     $('<div>').addClass('am-container')
    //                         .append(
    //                             // $shopTitle
    //                             $('<div>').addClass('shopTitle')
    //                                 .append(
    //                                     $('<h4>').addClass('floor-title').text(sub.name)
    //                                 )
    //                                 .append(
    //                                     $('<div>').addClass('floor-subtitle')
    //                                         .append(
    //                                             $('<em>').addClass('am-icon-caret-left')
    //                                         )
    //                                         .append(
    //                                             $('<h3>').text('每一件衣服都有一个故事')
    //                                         )
    //                                 )
    //                                 .append(
    //                                     $brands
    //                                     // $('<div class="today-brands brands" style="right:0;top:13px;">')
    //                                 )
    //                         )
    //                 )
    //                 .append(
    //                     $floodSix
    //                 )
    //         );
    //
    //         for (let subcate of sub.subs) {
    //             // console.log(sub.sub_id);
    //             $('<a>').attr('href','./subcategory.html?subcategory=' + sub.sub_id + '?type=' + subcate.type_id).text(subcate.name).appendTo($brands);
    //
    //             for (let i = 0; i < subcate.types.length; i++) {
    //                 $floodSix
    //                     .append(
    //                         $('<div class="am-u-sm-5 am-u-md-3 text-one list">')
    //                             .append(
    //                                 $('<div class="word">')
    //                                     .append(
    //                                         $('<a class="outer" href="#">')
    //                                             .append(
    //                                                 $('<span class="inner">')
    //                                                     .append(
    //                                                         $('<b class="text">').text(subcate.types[i].name.slice(0, 3))
    //                                                     )
    //                                             )
    //                                     )
    //                             )
    //                             .append(
    //                                 $('<a>').attr('href','./subcategory.html?subcategory=' + sub.sub_id)
    //                                     .append(
    //                                         // $('<img>').attr('src', goods.image)
    //                                         $('<img style="width: 160px;height: 160px;">').attr('src', '../images/yifu.jpg')
    //                                     )
    //                                     .append(
    //                                         $('<div class="outer-con">')
    //                                             .append(
    //                                                 $('<div class="title">').text(sub.name + '全场年底大优惠')
    //                                             )
    //                                             .append(
    //                                                 $('<div class="sub-title">').text('这个冬天有你更温暖')
    //                                             )
    //                                     )
    //                             )
    //                             .append(
    //                                 $('<div class="triangle-topright">')
    //                             )
    //                     );
    //                 // 推荐商品1 （根据subcate.types[0]显示指定商品
    //                 for (let goods of subcate.types[0].goods_detail) {
    //                     $floodSix
    //                         .append(
    //                             $('<div class="am-u-sm-7 am-u-md-5 am-u-lg-2 text-two big">')
    //                                 .append(
    //                                     $('<div class="outer-con">')
    //                                         .append(
    //                                             $('<div class="title">').text(goods.title.slice(0, 7))
    //                                         )
    //                                         .append(
    //                                             $('<div class="sub-title">').text("¥" + goods.promote_price)
    //                                         )
    //                                 )
    //                                 .append(
    //                                     $('<a>').attr('href','./detail.html?good=' + goods.goods)
    //                                         .append(
    //                                             $('<img style="width: 280px;height: 280px">').attr('src', goods.image)
    //                                             // $('<img>').attr('src', '../images/act1.png')
    //                                         )
    //                                 )
    //                         )
    //                 }
    //                 // 推荐商品2
    //                 for (let goods of subcate.types[0].goods_detail) {
    //                     $floodSix
    //                         .append(
    //                             $('<li>').append(
    //                                 $('<div class="am-u-md-2 am-u-lg-2 text-three">')
    //                                     .append(
    //                                         $('<div class="boxLi">')
    //                                     )
    //                                     .append(
    //                                         $('<div class="outer-con ">')
    //                                             .append(
    //                                                 $('<div class="title">').text(goods.title.slice(0, 7))
    //                                             )
    //                                             .append(
    //                                                 $('<div class="sub-title">').text("¥" + goods.promote_price)
    //                                             )
    //                                     )
    //                                     .append(
    //                                         $('<a>').attr('href','./detail.html?good=' + goods.goods)
    //                                             .append(
    //                                                 $('<img style="width: 150px;height: 150px">').attr('src', goods.image)
    //                                                 // $('<img>').attr('src', '../images/1.jpg')
    //                                             )
    //                                     )
    //                             )
    //                         );
    //                 }
    //                 // 推荐商品3
    //                 for (let goods of subcate.types[0].goods_detail) {
    //                     $floodSix
    //                         .append(
    //                             $('<li>').append(
    //                                 $('<div class="am-u-md-2 am-u-lg-2 text-three sug">')
    //                                     .append(
    //                                         $('<div class="boxLi">')
    //                                     )
    //                                     .append(
    //                                         $('<div class="outer-con ">')
    //                                             .append(
    //                                                 $('<div class="title">').text(goods.title.slice(0, 7))
    //                                             )
    //                                             .append(
    //                                                 $('<div class="sub-title">').text("¥" + goods.promote_price)
    //                                             )
    //                                     )
    //                                     .append(
    //                                         $('<a>').attr('href','./detail.html?good=' + goods.goods)
    //                                             .append(
    //                                                 $('<img style="width: 150px;height: 150px">').attr('src', goods.image)
    //                                                 // $('<img>').attr('src', '../images/1.jpg')
    //                                             )
    //                                     )
    //                             )
    //                         );
    //                 }
    //                 // 推荐商品4
    //                 for (let goods of subcate.types[0].goods_detail) {
    //                     $floodSix
    //                         .append(
    //                             $('<li>').append(
    //                                 $('<div class="am-u-sm-4 am-u-md-5 am-u-lg-4 text-five">')
    //                                     .append(
    //                                         $('<div class="boxLi">')
    //                                     )
    //                                     .append(
    //                                         $('<div class="outer-con ">')
    //                                             .append(
    //                                                 $('<div class="title">').text(goods.title.slice(0, 7))
    //                                             )
    //                                             .append(
    //                                                 $('<div class="sub-title">').text("¥" + goods.promote_price)
    //                                             )
    //                                     )
    //                                     .append(
    //                                         $('<a>').attr('href','./detail.html?good=' + goods.goods)
    //                                             .append(
    //                                                 $('<img style="width: 150px;height: 150px">').attr('src', goods.image)
    //                                                 // $('<img>').attr('src', '../images/1.jpg')
    //                                             )
    //                                     )
    //                             )
    //                         );
    //                 }
    //                 // 推荐商品5
    //                 for (let goods of subcate.types[0].goods_detail) {
    //                     $floodSix
    //                         .append(
    //                             $('<li>').append(
    //                                 $('<div class="am-u-sm-4 am-u-md-2 am-u-lg-2 text-six">')
    //                                     .append(
    //                                         $('<div class="boxLi">')
    //                                     )
    //                                     .append(
    //                                         $('<div class="outer-con ">')
    //                                             .append(
    //                                                 $('<div class="title">').text(goods.title.slice(0, 7))
    //                                             )
    //                                             .append(
    //                                                 $('<div class="sub-title">').text("¥" + goods.promote_price)
    //                                             )
    //                                     )
    //                                     .append(
    //                                         $('<a>').attr('href','./detail.html?good=' + goods.goods)
    //                                             .append(
    //                                                 $('<img style="width: 150px;height: 150px">').attr('src', goods.image)
    //                                                 // $('<img>').attr('src', '../images/1.jpg')
    //                                             )
    //                                     )
    //                             )
    //                         );
    //                 }
    //                 // 推荐商品6
    //                 for (let goods of subcate.types[0].goods_detail) {
    //                     $floodSix
    //                         .append(
    //                             $('<li>').append(
    //                                 $('<div class="am-u-sm-4 am-u-md-2 am-u-lg-4 text-six">')
    //                                     .append(
    //                                         $('<div class="boxLi">')
    //                                     )
    //                                     .append(
    //                                         $('<div class="outer-con ">')
    //                                             .append(
    //                                                 $('<div class="title">').text(goods.title.slice(0, 7))
    //                                             )
    //                                             .append(
    //                                                 $('<div class="sub-title">').text("¥" + goods.promote_price)
    //                                             )
    //                                     )
    //                                     .append(
    //                                         $('<a>').attr('href','./detail.html?good=' + goods.goods)
    //                                             .append(
    //                                                 $('<img style="width: 150px;height: 150px">').attr('src', goods.image)
    //                                                 // $('<img>').attr('src', '../images/1.jpg')
    //                                             )
    //                                     )
    //                             )
    //                         );
    //                 }
    //
    //             }
    //         }
    //     }
    // }
});
