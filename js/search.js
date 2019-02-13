$(function () {
    let url = location.search;
    let kw = url.split('&')[0].split('=')[1];
    // console.log('url',url);
    $('.hmtop').load('../basic/common/header.html');
    $('.footer').load('../basic/common/footer.html');

    // $("#ai-topsearch").click(function () {
    //     // window.location.href="search.html";
    //     let kw = $('#searchInput').val();
    //     console.log('kw',kw);
    //     location.reload();
    // });
    kw = decodeURIComponent(kw);

    add_goods(kw);

    function add_goods(kw, page=1) {
        let limit_param = {"kw": kw, "page": page};
        $.get('http://127.0.0.1:5000/api/v1/search/', limit_param, function (result) {
            if (result.status === 200 && result.msg === 'success') {
                console.log('result', result);
                $('#search-name').text(kw);
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
});