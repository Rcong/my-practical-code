function trim(str){
    return str.replace(/(^\s+)|(\s+$)/,'');
}

function hasClass(el, cls){
    return new RegExp('\\b'+cls+'\\b').test(el.className);
}

function addClass(el, cls){
    if(!hasClass(el, cls)){
        el.className = trim(el.className+' '+cls);
    }
}

function removeClass(el, cls){
    if(hasClass(el, cls)){
        el.className = trim(el.className.replace(cls,'').replace(/\s+/g,' '));
    }
}

window.onload = function(){
	var music = document.getElementById("music");
	var audio = document.getElementsByTagName("audio")[0];

	audio.addEventListener("ended",function(e){
		removeClass(this,'play');
	});

	music.addEventListener("touchstart",function(){
		if(audio.paused){
			audio.play();
			this.style.animationPlayState = "running";
			// addClass(this,'play');
		}else{
			audio.pause();
			this.style.animationPlayState = "paused";
			// removeClass(this,'play');
		}	
	},false);
}