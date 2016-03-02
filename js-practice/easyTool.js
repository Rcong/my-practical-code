var $$ = (function(){
    return  {
        /* 判断类型 */
        type:function(obj){
            return Object.prototype.toString.call(obj).slice(8,-1).toLowerCase();
        },
        isNumber:function(value){
            return this.type(value)==='number';
        },
        isString:function(value){
            return this.type(value)==='string';
        },
        isNull:function(value){
            return value===null;
        },
        isUndefined:function(value){
            return value===undefined;
        },
        isObject:function(value){
            return this.type(value)==='object';
        },
        isBoolean:function(value){
            return this.type(value)==='boolean';
        },
        isFunction:function(value){
            return this.type(value)==='function';
        },
        isArray:function(value){
            return this.type(value)==='array';
        },
        isDate:function(value){
            return this.type(value)==='date';
        },
        isRegExp:function(value){
            return this.type(value)==='regexp';
        },

        /* 判断 */
        isEmail:function(value){

        },

        /* DOM操作 */
        //去除字符串两边的空白字符
        trim:function(str){
            return str.replace(/(^\s+)|(\s+$)/g,'');
        },
        hasClass:function(el,cls){
            return new RegExp('\\b'+cls+'\\b','g').test(el.className);
        },
        addClass:function(el,cls){
            if(!this.hasClass(el,cls)){
                el.className+=(' '+cls);
                console.log(el.className);
                el.className = this.trim(el.className);
                console.log(el.className);
            }
        },
        removeClass:function(el,cls){
            var clsName =  el.className,
                reg = new RegExp('\\b'+cls+'\\b','g');
            clsName = clsName.replace(reg,'').replace(/\s+/g,' ');
            el.className = this.trim(clsName);
        }
    }
})();
