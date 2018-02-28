window.onload=function () {
	web.ui.toNav();
	web.app.toBanner();
	web.app.toRun();
}
var web={};
web.ui={};
web.ui.toNav=function () {
	var aNav_btn=document.querySelectorAll('.nav li');	//获取导航条按钮
	var aNav_len= aNav_btn.length;			//获取导航条的长度
	for (var i = 0; i < aNav_len; i++) {
		aNav_btn[i].onmouseover=change_nav;
	}
	function change_nav() {
		for (var i = 0; i < aNav_len; i++) {
			aNav_btn[i].className='';
		}
		this.className='active';
	}
}
web.ui.moveLeft = function(obj,old,now){	//运动函数
	
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		
		var iSpeed = (now - old)/10;
		iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
		
		if(now == old){
			clearInterval(obj.timer);
		}
		else{
			old += iSpeed;
			obj.style.left = old + 'px';
		}
		
	},30);
	
};
web.app={};
web.app.toBanner=function () {		//轮播图运动方法
	var oBanner=document.querySelector('.wrap .banner');	//获取轮播图的ul
	var aLi_banner=oBanner.querySelectorAll('li');		//获取轮播图的li
	var aBtn=oBanner.querySelectorAll('button');
	var num=0;
	oBanner.onmouseenter=function () {
		show_btn();
		aBtn[1].onclick=function () {			//点击按钮切换下一张图片
			nextPic();
		}
		aBtn[0].onclick=function () {			//点击按钮切换下一张图片
			prevPic();
		}
		this.onmouseleave=hide_btn;
	};
	function show_btn() {		//移入轮播图出现按钮
		for (var i = 0; i < aBtn.length; i++) {
			aBtn[i].style.display='block';
		}
	}
	function hide_btn() {		//移出隐藏按钮
		for (var i = 0; i < aBtn.length; i++) {
			aBtn[i].style.display='none';
		}
	}
	function nextPic() {
		num++;
		if(num == aLi_banner.length){
			num=0;
		}
		for (var i = 0; i < aLi_banner.length; i++) {
			aLi_banner[i].className='';
		}
		aLi_banner[num].style.transition='1s';
		aLi_banner[num].className='active';
	}
	function prevPic() {
		num--;
		if(num < 0){
			num=aLi_banner.length-1;
		}
		for (var i = 0; i < aLi_banner.length; i++) {
			aLi_banner[i].className='';
		}
		aLi_banner[num].className='active';
	}
}
web.app.toRun=function () {				//底部图片切换方法
	var oPic_box=document.querySelector('.bottom .box');
	var oUl=oPic_box.querySelector('ul');
	var aLi=oUl.querySelectorAll('li');
	var oPrev=oPic_box.querySelector('.btn_prev');
	var oNext=oPic_box.querySelector('.btn_next');
	var iNow=0;
	oPrev.onclick=function () {
		if(iNow == 0){
			iNow = aLi.length/2;
			oUl.style.left = -oUl.offsetWidth/2 + 'px';
		}
		web.ui.moveLeft(oUl,-iNow*210,-(iNow-1)*210);
		iNow--;
	}
	oNext.onclick = function(){
		if(iNow == aLi.length/2){
			iNow = 0;
			oUl.style.left = 0;
		}
		web.ui.moveLeft(oUl,-iNow*210,-(iNow+1)*210);
		iNow++;
		
	};
}