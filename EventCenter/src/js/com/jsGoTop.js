define(function(){

    var jsGoTop = function(){

        //接口配置和其他配置信息
        var config = {
            xx_api:""
        };
        
        //局部变量,局部方法,一般是一些小工具方法,不归属于模块本身的方法
        var checkUser = function(user){
            if(user=="sb"){
                return true;
            }
        }

        return {
            //总入口,在页面底部调用
            init:function(_config){
                //混合配置
                Souche.Util.mixin(config,_config);
                this._create();
                this._bind();
            },
            _create:function(){
                //创建html结构的功能
            },
            _bind:function(){
                //绑定事件的功能
            }
        }
    }();

    return jsGoTop;

});
