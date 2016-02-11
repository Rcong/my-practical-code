# sui-mobile中遇到的问题整理

---
### 关于“工具栏”切换
sui-mobile开发人员建议不使用Router,而是采用浏览器直接跳转的形式(即加给工具栏链接加external的class),也就是不做成SPA形式。

---
### 两个页面相互切换,切换到的新页面中的js不执行
解决办法:所有页面都引用相同js,这个js文件中包含了所有逻辑,事件部分使用委托来绑定。

---
### 0.62版本中pageInit中 $.showIndicator(); 不显示
因为0.62版本在pageInit事件上调用了\$.hideIndicator(),\$.showIndicator()会先执行,所以hide掉了。
解决办法:用setTimeout()延时执行。

---
### 使用$.router.load加载页面时,目前不能指定页面自定义的加载方向。
两个页面来回切换,切回去的时候如果需要数据更新,配置参数不使用缓存,保存数据更新,强制请求,有以下两种方式:
1.在a链接上加```data-no-cache="true"```属性来标明不适用缓存。
2.使用js方法load来加载,把可选参数ignoreCache设为true。

---
### 用ajax加载页面后,刷新里面的组件。
绑定pageInit 事件，手动实例化组件
```javascript
	$(document).on("pageInit", function(e, pageId, $page) {
		if(pageId === "pageIndex") {
		}
	});
```
hehe

---
### 页面的js,写在script里面的js,页面切换以后,在切换回来,js就不见了

如果期望每次进入对应视图都执行，就在
```
$(document).on('pageInit',  fn)
```
如果fn里的逻辑是后面页面里才需要执行的，加上对应page的pageid即可：
```
$(document).on('pageInit',  '#pageid', fn)
```
对那些只执行一次的逻辑，不写在pageInit事件里就好了

---
### 使用sui的时候，点击一个链接进入下个页面的时候，在第一个页面上载入了自己的css文件，下个页面消失.

SUI-Mobile 的自动链接劫持路由模式，旨在于帮助我们快速的搭建贴近原生应用体验的SPA应用。

各个页面的css你可以

* 根据pageid的命名空间在入口页的css里import进去。
* 或者在各个其他页面的.page元素里引用静态资源
* 或者考虑CSS Module等方案

---
### 返回页面的方法
可以通过$.router.loadPage(url)来加载一个页面,参数url可以是一个ajax页面地址,也可以是一个内联页面的id。
```
$.router.loadPage("/detail");
$.router.loadPage("#about");
```

但有如下场景,页面从A->B->C,在C页面back到A页面。此时使用$.router.loadPage('/A');是前进到A页面,但相当于又重新加载了A页面,document就存在两个A页面结构了。

对于这种 **越级back** ,目前sui-mobile在设计上是不支持的。

---
### 多个页面跳转时很卡顿，loading图标消失几秒后才跳转到另一个页面
链接转场时，如果是内联页面，是不会有loading的，如果是ajax异步载入的，有loading就说明页面数据没加载进来,可能是你的下个页面里可能有异步加载数据的部分。

