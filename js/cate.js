let url = location.search;
// let nav_id = parseInt(url.split('=')[1]);
let nav_id = parseInt(url.split('&')[0].split('=')[1]);
// let nav_id = 16;
// flag 区分是点击分类进来的 还是 搜索关键字进来的
$(function () {
    $('.hmtop').load('../basic/common/header.html');
    $('.footer').load('../basic/common/footer.html');
    let param = {"nid": nav_id};
    $.get(CATE_URL, param, function (result) {
        if (result.status === 200 && result.msg === 'success') {
            add_cates(result.data);

            // $(".dd-conent dd").on("click", function () {
            //     console.log('点击了属性。。');
            // });
            cate_value_click_event();
            // 分类商品显示，点击下一页
            add_goods(nav_id);
        }
    });

    function add_cates(result) {
        let values = [];
        for (let cate of result) {
            if (nav_id === cate.nid) {
                $('#cate-name').text(cate.name);
                for (let property of cate.cate_property) {
                    let values_list = property.values.split('|');
                    values.push(values_list);
                    // values.unshift(values_list);
                    // values.push(property.values);
                    $('.select')
                        .append(
                            $('<li class="select-list">')
                                .append(
                                    $('<dl>').attr('id', 'select' + (cate.cate_property.indexOf(property) + 1))
                                        .append(
                                            $('<dt class="am-badge am-round">').text(property.name)
                                            )
                                        .append(
                                            $('<div class="dd-conent">')
                                                .attr('id', 'dd-conent' + (cate.cate_property.indexOf(property) + 1))
                                                .append(
                                                    $('<dd class="select-all selected">')
                                                        .append(
                                                            $('<a href="#">').text('全部')
                                                            // $('<span>').text('全部')
                                                            )
                                                    )
                                            )
                                    )
                            );

                }

                for (let i = 0; i < values.length; i++) {
                    let value_list = values[i];
                    let dd_id = '#dd-conent' + (i + 1).toString();
                    for (let value of value_list) {
                        $(dd_id)
                            .append(
                                $('<dd>')
                                    .append(
                                        $('<a href="#">')
                                        // $('<span>')
                                            .text(value)
                                        )
                                )
                    }
                }

            }

        }

    }

    function add_goods(nid, page=1) {
        let limit_param = {"nid": nid, "page": page};
        $.get('http://127.0.0.1:5000/api/v1/goods/limit/', limit_param, function (result) {
            // alert(GOODS_LIMIT_URL);
            if (result.status === 200 && result.msg === 'success') {
                $('#cate-num').text(result.data.pages);
                for (let good of result.data.goods) {
                    $('.boxes')
                        .append(
                            $('<li>')
                                .append(
                                    $('<a>').attr('href', 'detail.html?good_id=' + good.good_id)
                                        .append(
                                            $('<div class="i-pic limit">')
                                                .append(
                                                    $('<img>').attr('src', '../images/' + good.show_img + '.jpg')
                                                    )
                                                .append(
                                                    $('<p class="title fl">').text(good.good_desc)
                                                    )
                                                .append(
                                                    $('<p class="price fl">')
                                                        .append(
                                                            $('<b>').text('¥')
                                                            )
                                                        .append(
                                                            $('<strong>').text(good.good_price)
                                                            )
                                                    )
                                                .append(
                                                    $('<p class="number fl">').text('销量')
                                                        .append(
                                                            $('<span>').text('0')
                                                            )
                                                    )
                                            )
                                    )
                            )
                }
            }

        });

    }

    function cate_value_click_event() {
        var hh = document.documentElement.clientHeight;
        var ls = document.documentElement.clientWidth;
        if (ls < 640) {

            $(".select dt").click(function () {
                if ($(this).next("div").css("display") === 'none') {
                    $(".theme-popover-mask").height(hh);
                    $(".theme-popover").css("position", "fixed");
                    $(this).next("div").slideToggle("slow");
                    $(".select div").not($(this).next()).hide();
                } else {
                    $(".theme-popover-mask").height(0);
                    $(".theme-popover").css("position", "static");
                    $(this).next("div").slideUp("slow");
                }

            });


            $(".eliminateCriteria").live("click", function () {
                $(".dd-conent").hide();
            });

            $(".select dd").live("click", function () {
                $(".theme-popover-mask").height(0);
                $(".theme-popover").css("position", "static");
                $(".dd-conent").hide();
            });
            $(".theme-popover-mask").live("click", function () {
                $(".theme-popover-mask").height(0);
                $(".theme-popover").css("position", "static");
                $(".dd-conent").hide();
            });

        }


        $("span.love").click(function () {
            $(this).toggleClass("active");
        });


        $("#select1 dd").click(function () {
            $(this).addClass("selected").siblings().removeClass("selected");
            if ($(this).hasClass("select-all")) {
                $("#selectA").remove();
            } else {
                var copyThisA = $(this).clone();
                if ($("#selectA").length > 0) {
                    $("#selectA a").html($(this).text());
                } else {
                    $(".select-result dl").append(copyThisA.attr("id", "selectA"));

                }
            }
        });

        $("#select2 dd").click(function () {
            $(this).addClass("selected").siblings().removeClass("selected");
            if ($(this).hasClass("select-all")) {
                $("#selectB").remove();
            } else {
                var copyThisB = $(this).clone();
                if ($("#selectB").length > 0) {
                    $("#selectB a").html($(this).text());
                } else {
                    $(".select-result dl").append(copyThisB.attr("id", "selectB"));
                }
            }
        });

        $("#select3 dd").click(function () {
            $(this).addClass("selected").siblings().removeClass("selected");
            if ($(this).hasClass("select-all")) {
                $("#selectC").remove();
            } else {
                var copyThisC = $(this).clone();
                if ($("#selectC").length > 0) {
                    $("#selectC a").html($(this).text());
                } else {
                    $(".select-result dl").append(copyThisC.attr("id", "selectC"));
                }
            }
        });

        $("#selectA").live("click", function () {
            $(this).remove();
            $("#select1 .select-all").addClass("selected").siblings().removeClass("selected");
        });

        $("#selectB").live("click", function () {
            $(this).remove();
            $("#select2 .select-all").addClass("selected").siblings().removeClass("selected");
        });

        $("#selectC").live("click", function () {
            $(this).remove();
            $("#select3 .select-all").addClass("selected").siblings().removeClass("selected");
        });

        $(".select dd").live("click", function () {
            if ($(".select-result dd").length > 1) {
                $(".select-no").hide();
                $(".eliminateCriteria").show();
                $(".select-result").show();
            } else {
                $(".select-no").show();
                $(".select-result").hide();

            }
        });

        $(".eliminateCriteria").live("click", function () {
            $("#selectA").remove();
            $("#selectB").remove();
            $("#selectC").remove();
            $(".select-all").addClass("selected").siblings().removeClass("selected");
            $(".eliminateCriteria").hide();
            $(".select-no").show();
            $(".select-result").hide();

        });
    }

    $('.next-two').click(function () {
        $('.boxes').empty();
        add_goods(nav_id, 2);
    })

});
