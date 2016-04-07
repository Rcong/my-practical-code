

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 0.99)) + min;
}

function getData(){
    var data = []
        lastRandomInt = 0,
        randomInt = 0;
    for (var i = 0; i < 30; i++) {
        randomInt = getRandomInt(1, 9);
        while (randomInt === lastRandomInt) {
            randomInt = getRandomInt(1, 9);
        }
        lastRandomInt = randomInt;
        data.push({
            "img": "http://7xrunf.com1.z0.glb.clouddn.com/rcong-pic" + randomInt + ".jpeg",
            "description": "我是二次元少年中二未毕业"
        });
    }
    return data;
}

var data = getData();
var $items;
var waterfall = (function ($) {

    var wrap = null;
    var index = 0;
    var colHeight = [];

    function getMinInt(arr){
        var min = Math.min.apply(Math, arr);
        for (var i = 0, max = arr.length; i < max; i++) {
            if(min === arr[i]){
                index = i;
            }
        }
        return min;
    }

    function getMaxInt(arr){
        return Math.max.apply(Math, arr);
    }

    return {
        init: function($wrap){
            wrap = $wrap;
        },

        load: function(opts){
            if (opts.data && opts.content && opts.desc) {
                var item = '',
                    $items;
                for (var i = 0 , max = opts.data.length; i < max; i++) {
                    item += '<div class="item" style="top: 0px; left: 0px;">';
                    item += '<a href="' + data[i][opts.content] + '">';
                    item += '<img src="' + data[i][opts.content] + '" width="236">';
                    item += '</a>';
                    item += '<p class="description">' + data[i][opts.desc] + '</p>';
                    item += '</div>';
                }
                $items = $(item);
                wrap.append($items);
            }
            opts.success && opts.success($items);
        },
        render: function($items){
            var itemWidth = $items.outerWidth(true);
            var colNum = parseInt(wrap.width() / itemWidth);
            var margin = (wrap.width() - itemWidth * colNum) / (colNum - 1);

            if (colHeight.length === 0) {
                for(var i = 0; i < colNum; i++){
                    colHeight.push(0);
                }
            }

            $items.each(function(){
                var $cur = $(this);
                console.log($(this));
                $(this).find('img').on('load', function(){
                    $cur.css({
                        top: getMinInt(colHeight),
                        left: index * (itemWidth + margin)
                    });
                    console.log($cur.css('left') + ',' + $cur.css('top'));
                    console.log($(this).attr('src'));
                    colHeight[index] += $cur.height() + margin;
                });
                wrap.css('height', getMaxInt(colHeight));
            });
            //
            // for (var i = 0 , max = $items.length; i < max; i++) {
            //     $($items[i]).find('img').on('load', function(){
            //         $($items[i]).css({
            //             top: getMinInt(colHeight),
            //             left: index * (itemWidth + margin)
            //         });
            //         // console.log($items[i].css('top') + ',' + $items[i].css('left'));
            //         colHeight[index] += $($items[i]).height() + margin;
            //     });
            // }
            // wrap.css('height', getMaxInt(colHeight));
        }

    }


})($)

waterfall.init($('#waterfall-wrap'));
waterfall.load({
    data: data,
    content: 'img',
    desc: 'description',
    success: function($items){
        waterfall.render($items);
    }
});

$(window).on('resize', function(){

})
