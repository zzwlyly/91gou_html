// let url = location.search;
// let nav_id = parseInt(url.split('=')[1]);
let nav_id = 16;
$(function () {
    $('.hmtop').load('../basic/common/header.html');
    $('.footer').load('../basic/common/footer.html');

    $.get(CATE_URL, function (result) {
        if (result.status === 200 && result.msg === 'success') {
            add_cate_prop(result.data);
        }

    });
    var cate_id = 0;

    function add_cate_prop(result) {
        for (let cate of result) {
            if (nav_id === cate.nid) {
                cate_id = cate.cid;
                $('.cate-name').text(cate.name);
                for (let prop of cate.cate_property) {
                    let prop_values = prop.values.split('|');
                    console.log(prop_values);
                    $('.cate-prop').append(
                        $('<div>').addClass('cate-wrap')
                            .append(
                                $('<div>').addClass('property')
                                    .append(
                                        $('<div>').addClass('prop-key')
                                            .append(
                                                $('<span>').text(prop.name)
                                            )
                                    )
                                    .append(
                                        $('<div>').addClass('prop-values')
                                            .append(
                                                $('<span>').addClass('prop-value')
                                                    .text(prop.values)
                                            )
                                    )
                            )
                    );


                }

                for (let good of cate.goods) {
                    // if (cate_id === good.cid) {
                    $('.goods-list')
                        .append(
                            $('<div class="cate-good-wrap clear-v">').append(
                                $('<ul>').addClass('cate-good-info')
                                    .append(
                                        $('<li>').append(
                                            $('<img>').addClass('cate-good-img')
                                                .attr('src', '../images/' + good.show_img + '.jpg')
                                        )
                                    )
                                    .append(
                                        $('<li>')
                                            .addClass('cate-good-price')
                                            .append(
                                                $('<span>')
                                                    .text('¥' + good.good_price)
                                            )
                                    )
                                    .append(
                                        $('<li>')
                                            .addClass('cate-good-desc')

                                            .append(
                                                $('<p>').text(good.good_desc)
                                            )
                                    )
                            )
                        )
                    // }

                }

                // for (let value of prop_values) {
                //     $('.property').append(
                //         $('<div>').addClass('prop-values')
                //             .append(
                //                 $('<span>').addClass('prop-value')
                //                     .text(value)
                //             )
                //     )
                //
                // }


            }

        }

    }

});