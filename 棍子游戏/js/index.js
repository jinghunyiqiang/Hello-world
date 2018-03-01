window.onload=function () {
	var oWrap=document.getElementById('wrap');
	var oBox=oWrap.querySelector('.box');		//获取红色方块
	var oStart=oWrap.querySelector('.start');		//获取起始黑色方块
	var oFin=oWrap.querySelector('.finish');	//获取结束方块
	var oStick=oWrap.querySelector('.stick');	//获取棍子
	var oCon=oWrap.querySelector('.content');	//获取游戏显示区域界面
	var oRight=oWrap.querySelector('.right');	//获取最右侧方块
	var oScore=document.querySelector('h2 span');	//获取分数
	var timer=null;
	var num=0;
	var onOff=true;
	var step=0;
	var iNum=0;		//记录得分
	html();
	oStart.onmousedown=function (ev) {
		var ev=ev;
		timer=setInterval(() => {
			num+=5;
			oStick.style.height=num+'px';
		}, 50)
		this.onmouseup=function () {
			clearInterval(timer);
			oStick.style.transition=`1s`;
			oStick.style.transform=`rotate(-90deg)`;
			var dis=oFin.offsetLeft-oStart.offsetLeft-oStart.clientWidth;
			//W1为第二个方块的宽度
			var W1=oFin.clientWidth;
			//W2为红盒子方块和起始方块的宽度差值
			var W2=oStart.clientWidth-oBox.clientWidth;
			oRight.style.left=Math.round(350+Math.random()*80)+'px';
			oRight.style.width=Math.round(20+Math.random()*60)+'px';

			if(num<W2+dis || num>W2+dis+W1){
				onOff=false;
				oStick.addEventListener('transitionend', function () {
					alert('Game Over,您的总得分为'+iNum+'分');
				})
			}
		}
	}
	oStick.addEventListener('transitionend', function () {
		if(onOff){
			oBox.style.transition='1s';
			oBox.style.left=oFin.offsetLeft+'px';
			iNum++;
			oScore.innerHTML=iNum;
		}
	});
	oBox.addEventListener('transitionend', function (ev) {
		var ev=ev;
		oCon.style.left=-(oFin.offsetLeft)+'px';
		oCon.style.transition='1s';
		ev.stopPropagation();
		step=1;
	});
	oCon.addEventListener('transitionend',function () {
		if(step==1){
			oCon.style.transition='none';
			oCon.style.left='0';
			num=0;
			step=0;
			oStick.style.transform=`90deg`;
			oBox.style.left='0';
			oBox.style.transition='none';
			oStick.style.height='0';
			oStick.style.transform=`rotateX(180deg)`;
			oStick.style.transition='none';
			oStart.style.width=oFin.clientWidth+'px';
			oFin.style.width=oRight.clientWidth+'px';
			oFin.style.left=oRight.offsetLeft-oFin.offsetLeft+'px';


		}
	});
	//随机设置第二个方块的宽度和间距
	function html () {
		oFin.style.width=Math.round(30+Math.random()*60)+'px';
		oFin.style.left=Math.round(90+Math.random()*80)+'px';
	}
}