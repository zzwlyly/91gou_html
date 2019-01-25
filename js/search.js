let url = location.search;
let nav_id = parseInt(url.split('=')[1]);
// let nav_id = 16;
// flag 区分是点击分类进来的 还是 搜索关键字进来的
$(function () {
    $('.hmtop').load('../basic/common/header.html');
    $('.footer').load('../basic/common/footer.html');
    let param = {"nid": nav_id};
    $.get(CATE_URL, param, function (result) {
        if (result.status === 200 && result.msg === 'success') {
            add_goods(result.data);
        }
    });

    function add_goods(result) {
        for (let cate of result) {
            if (nav_id === cate.nid) {
                $('#cate-name').text(cate.name);
                $('#cate-num').text(cate.goods.length);
                for (let property of cate.cate_property) {
                    let values_list = property.values.split('|');
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
                                                .append(
                                                    $('<dd class="select-all selected">')
                                                        .append(
                                                            $('<a href="#">').text('全部')
                                                        )
                                                )
                                        )
                                )
                        );
                    // 分类属性
                    for (let prop_value of values_list) {
                        $('.dd-conent')
                            .append(
                                $('<dd>')
                                    .append(
                                        $('<a href="#">')
                                            .text(prop_value)
                                    )
                            );
                    }

                }

                for (let good of cate.goods.slice(0, 12)) {
                    $('.boxes')
                        .append(
                            $('<li>')
                            //'detail.html?good_id='
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
        }


    }

// <li>
//     <div class="i-pic limit">
//         <img src="../images/imgsearch1.jpg"/>
//         <p class="title fl">【良品铺子旗舰店】手剥松子218g 坚果炒货零食新货巴西松子包邮</p>
//     <p class="price fl">
//         <b>¥</b>
//         <strong>56.90</strong>
//         </p>
//         <p class="number fl">
//         销量<span>1110</span>
//         </p>
//         </div>
//         </li>
});