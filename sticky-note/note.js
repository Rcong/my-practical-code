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
Note.prototype = {
    color: 'Apple',
    content: 'Write Something!!!',
    $wrap: $('body'),
    $note: null,
    locationX: 0,
    locationY: 0,
    colors: {
        'Pink': '#FFC0CB',
        'MayaBlue': '#77C1F0',
        'Apple': '#9acd32'
    },
    render: function() {
        var noteStr = '',
            $note = null;

        noteStr += '<div data-id="' + this.id + '" class="note">';
        noteStr += '<div class="header"><span class="delete">×</span></div>';
        noteStr += '<div class="content" contenteditable="true">' + this.content + '</div>';
        noteStr += '</div>';

        $note = $(noteStr);
        this.$wrap.append($note);
        // $note.css('background', this.colors[this.color]);
        $note.find('.header').css('background', this.colors[this.color]);
        $note.find('.content').css('background', 'linear-gradient(-30deg, transparent 1.25em, ' + this.colors[this.color] + ' 0)');
        //将页面HTML的jQuery与Note对象关联起来
        this.$note = $note;
        //将渲染好的note的content保存起来
        this.save(this.content);
    },
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

        //contenteditable没有 change 事件，所有这里做了模拟通过判断元素内容变动，执行 save
        var $noteCt = $note.find('.content');
        $noteCt.on('focus', function() {
            $noteCt.data('before', $noteCt.html());
        }).on('blur keyup paste', function() {
            if ($noteCt.data('before') !== $noteCt.html()) {
                $noteCt.data('before', $noteCt.html());
                self.save($noteCt.html());
            }
        });

    },
    save: function(data) {
        localStorage.setItem(this.id, data);
    },
    destroy: function() {
        this.$note.remove();
        delete localStorage.removeItem(this.id);
    },
    setLocation: function(x, y) {
        if (typeof x === 'number' && typeof y === 'number') {
            this.locationX = x;
            this.locationY = y;

            var $note = this.$note;
            $note.css({
                left: x,
                top: y
            });
        } else {
            throw new Error('incorrect param');
        }
    }
}
