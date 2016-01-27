# 普通方式和动态添加脚本方式的两个demo

file.js中仅仅是一个10000次的for循环和之后弹出一个alert框的几句代码。
[动态添加script元素的Demo链接戳这里!](http://book.jirengu.com/Rcong/myWorkspace/dynamic-script-element/dynamic.html)
[普通的引入script脚本Demo链接戳这里!](http://book.jirengu.com/Rcong/myWorkspace/dynamic-script-element/normal.html)
从demo上可以明显的看出动态加载方式可以在alert框弹出之前先看到页面上的文字,但是普通的方式只有在alert框弹出之后才可以看到页面上的文字。

这种动态加载脚本元素的方式不会阻塞页面的其他进程。