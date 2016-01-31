//1.数据定义
var data = [
	{img:1,h1:'Createive',h2:'DUET'},
	{img:2,h1:'Friendly',h2:'DEVIL'},
	{img:3,h1:'Tranquilent',h2:'COMPATRIOT'},
	{img:4,h1:'Insecure',h2:'HUSSLER'},
	{img:5,h1:'Loving',h2:'REBEL'},
	{img:6,h1:'Passionate',h2:'SEEKER'},
	{img:7,h1:'Crazy',h2:'FRIEND'}
];

//2.通用函数
var g = function(id){
	if (id.substr(0,1)=='.') {
		return document.getElementsByClassName(id.substr(1));
	}
	return document.getElementById(id);	
}

//3.添加幻灯片的操作(所有幻灯片&对应的按钮)
var addSliders = function(){
	var tplMain = g('tpl-main').innerHTML
					.replace(/^\s*/,'')//去掉开头空白符
					.replace(/^\s*$/,'');//去掉结尾空白符
	var tplCtrl = g('tpl-ctrl').innerHTML
					.replace(/^\s*/,'')//去掉开头空白符
					.replace(/^\s*$/,'');//去掉结尾空白符

	var outMain = [];
	var outCtrl = [];

	for (var i = 0; i < data.length; i++) {
	// for (i in data) {
		var htmlMain = tplMain
			.replace(/{{index}}/g,data[i].img)
			.replace(/{{h2}}/g,data[i].h1)
			.replace(/{{h3}}/g,data[i].h2)
			.replace(/{{css}}/g,['','main-i-right'][i%2]);

		var htmlCtrl = tplCtrl.replace(/{{index}}/g,data[i].img);
		outMain.push(htmlMain);
		outCtrl.push(htmlCtrl);
	}

	g('tpl-main').innerHTML = outMain.join('');
	g('tpl-ctrl').innerHTML = outCtrl.join('');
	g('tpl-main').innerHTML += tplMain
			.replace(/{{index}}/g,'{{index}}');
			console.log(g('main-{{index}}'));
	g('main-{{index}}').id = 'main-background';		
}

//4.定义何时处理幻灯片输出
window.onload = function(){
	addSliders();
	switchSlider(1);
}

//5.幻灯片切换
var switchSlider = function(index){
	var main = g('main-'+index);
	var ctrl = g('ctrl-'+index);
	var mains = g('.main-i');
	var ctrls = g('.ctrl-i');

	for (var i = 0; i < ctrls.length; i++) {
		mains[i].className = mains[i].className.replace(' main-i-active','');
		ctrls[i].className = ctrls[i].className.replace(' ctrl-i-active','');
	};

	main.className += ' main-i-active';
	ctrl.className += ' ctrl-i-active';

	setTimeout(function(){
		g('main-background').innerHTML = main.innerHTML;
	},1000);
	
}