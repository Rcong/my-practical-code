# 便利贴Demo

这是一个模仿mac os中便利贴写的一个demo.
> [传送门 戳这里！！！](http://book.jirengu.com/Rcong/my-practical-code/sticky-note/index.html)

## 如何使用
下载后
```
$ npm install #安装依赖
$ gulp less #生成sticky-note.css文件
```

-> 页面引入jQuery、note.js以及sticky-note.css
-> body标签中设置一个容器节点div, 并设置class为wrap, 如
```
<div id="wrap" class="wrap"></div>
```
-> 调用```noteWrap.init()```并传入容器节点的jQuery对象```$('#wrap')```.
-> 调用```noteWrap.load();```如果localStorage中存在符合note的数据则会加载数据.
-> 需要增加便利贴的时候则在左下角点击加号增加一个新的便利贴,便利贴按住头部可以移动.

## 封装思路
这里把单独的一个便利贴做为一个对象给封装了
封装采用了构造函数的形式
```
function Note(opts) {
    //note的ID
    this.id = opts.id || 'Note_' + (Math.random() + '').substr(2, 8);
    //note的颜色
    this.color = opts.color || this.color;
    //note的内容
    this.content = opts.content || this.content;
    //note对应的节点的父容器
    this.$wrap = opts.wrap || this.$wrap;
    //note对应的节点
    this.$note = opts.$note || this.$note;
    //note的坐标
    this.locationX = opts.locationX || this.locationX;
    this.locationY = opts.locationY || this.locationY;
    this.render();
    this.bind();
}
```
便利贴的属性包括id、颜色、内容、对应的dom父节点容器、自身dom、以及x、y坐标.这些属性是可以通过opts传进来的,如果没有传入,也会顺着原型链往上去拿。
```
Note.prototype = {
    color: 'Apple',
    content: 'Write Something!!!',
    $wrap: $('body'),
    $note: null,
    locationX: 10,
    locationY: 10,
    colors: {
        'Pink': '#FFC0CB',
        'MayaBlue': '#77C1F0',
        'Apple': '#9acd32'
    }
    ...
}
```

构造函数中还有两个方法```render()```和```bind()```

```
render: function() {
    var noteStr = '',
        $note = null;

    noteStr += '<div data-id="' + this.id + '" class="note">';
    noteStr += '<div class="header"><span class="delete">×</span></div>';
    noteStr += '<div class="content" contenteditable="true">' + this.content + '</div>';
    noteStr += '</div>';

    $note = $(noteStr);
    this.$wrap.append($note);
    $note.find('.header').css('background', this.colors[this.color]);
    $note.find('.content').css('background', 'linear-gradient(-30deg, transparent 1.25em, ' + this.colors[this.color] + ' 0)');
    //将页面HTML的jQuery与Note对象关联起来
    this.$note = $note;
    //将渲染好的note的content保存起来
    this.save(this.content);
    this.setLocation(this.locationX, this.locationY);
}
```

render()方法其实就是组装字符串然后append到页面上,然后根据先前note的属性动态去修改样式.


```
bind: function() {
    var self = this,
        $note = this.$note
        $wrap = this.$wrap;

    var noteMoveHandler = function(e) {
            $note.css({
                left: e.originalEvent.pageX - $note.data('paddingX'),
                top: e.originalEvent.pageY - $note.data('paddingY')
            });
            self.locationX = e.originalEvent.pageX - $note.data('paddingX');
            self.locationY = e.originalEvent.pageY - $note.data('paddingY');
        }
        //绑定note的点击叉叉删除事件
    $note.find('.delete').on('click', function() {
        self.destroy();
    });
    $note.find('.header').on('mousedown', function(e) {
        //拖动开始时先关闭transition,否则mouseover时会有延迟.
        $note.css('transition', 'none 0s');
        $note.css('zIndex', 99);
        $note.css('opacity', .7);
        //拖动开始时计算note上点击的点和note左上角的间距
        $note.data('paddingX', e.originalEvent.pageX - self.locationX);
        $note.data('paddingY', e.originalEvent.pageY - self.locationY);
        $wrap.on('mousemove', noteMoveHandler);

    }).on('mouseup', function(e) {
        // e.preventDefault();
        $wrap.off('mousemove', noteMoveHandler);
        $note.css('zIndex', 2);
        $note.css('opacity', 1);
        //拖动结束时再开启transition.
        $note.css('transition', 'all 0.5s');
    });
```

bind()方法则是绑定事件,实现拖动、删除等效果.

```
save() 例如: note.save(data)会把data存入localStorage中,以note的id为key值.
```

save()是用来将note的内容保存到localStorage中的.

```
destroy() 例如: note.destroy()
```

destroy()则是清除页面上的note以及localStorage中对应的数据的.


```
setLocation(x, y) 例如: note.setLocation(100, 50)
```

setLocation(x, y)设置note在父容器wrap中的坐标,以左上角为坐标原点.


## gulp构建部分

+ 使用了browser-sync实时刷新浏览器.
+ 样式部分使用less编写, 之后使用了gulp-autoprefixer、gulp-less将样式添加前缀, 编译成css后并压缩存放在static文件夹下.
