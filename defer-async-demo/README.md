# defer 与 async

async和defer属性都是用于异步加载js文件,期间不会才生阻塞浏览器其他进程,区别在于async是加载完之后自动执行,而defer需要等到页面加载之后再执行,需要注意的一点是这两个属性必须在有src属性的```<script>```标签中(外链脚本)才有效

打开defer.html会依次看到 弹出"script"的alert框=>页面渲染出文字=>弹出"defer"的alert框=>弹出"load"的alert框

打开async.html会依次看到 弹出"script"的alert框=>弹出"async"的alert框=>页面渲染出文字=>弹出"load"的alert框
