# sui-mobile中遇到的问题整理

* ### 两个页面相互切换,切换到的新页面中的js不执行
解决办法:所有页面都引用相同js,这个js文件中包含了所有逻辑,事件部分使用委托来绑定。

* ### 0.62版本中pageInit中 $.showIndicator(); 不显示
因为0.62版本在pageInit事件上调用了\$.hideIndicator(),\$.showIndicator()会先执行,所以hide掉了。
解决办法:用setTimeout()延时执行。

* ###使用$.router.load加载页面时,目前不能指定页面自定义的加载方向。
两个页面来回切换,切回去的时候如果需要数据更新,配置参数不使用缓存,保存数据更新,强制请求,有以下两种方式:
1.在a链接上加```data-no-cache="true"```属性来标明不适用缓存。
2.使用js方法load来加载,把可选参数ignoreCache设为true。

* 用ajax加载页面后,刷新里面的组件啊
绑定pageInit 事件，手动实例化组件
```javascript
	$(document).on("pageInit", function(e, pageId, $page) {
		if(pageId === "pageIndex") {

		}
	});
```