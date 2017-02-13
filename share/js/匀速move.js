// JavaScript Document

//获取样式
function getStyle(obj, name)
{
	if(obj.currentStyle)
	{
		return obj.currentStyle[name];	
	}
	else
	{
		return getComputedStyle(obj,false)[name];	
	}	
}
//运动
function startMove1(obj, name, iTarget){
	//先关
	clearInterval(timer1);
	//开
	timer1=setInterval(function(){
		//获取样式
		if(name=='opacity'){
			//如果透明度情况	
			var cur=Math.round(parseFloat(getStyle(obj, name))*100);
		}else{
			//正常情况
			var cur=parseInt(getStyle(obj, name));	
		}
		//运动速度快慢
		var speed=(iTarget-cur)/8; 		
		speed=speed>0?Math.ceil(speed):Math.floor(speed);
		
		if(cur==iTarget){
			clearInterval(timer1);	
		}else{
			if(name=='opacity'){
				obj.style.filter='alhpa(opacity'+(cur+speed)+')';
				obj.style.opacity=(cur+speed)/100;	
			}else{
				obj.style[name]=cur+speed+'px';	
			}
		}			
	},30)	
}
function startMove2(obj, name, iTarget){
	//先关
	clearInterval(timer2);
	//开
	timer2=setInterval(function(){
		//获取样式
		if(name=='opacity'){
			//如果透明度情况	
			var cur=Math.round(parseFloat(getStyle(obj, name))*100);
		}else{
			//正常情况
			var cur=parseInt(getStyle(obj, name));	
		}
		//运动速度快慢
		var speed=(iTarget-cur)/8; 		
		speed=speed>0?Math.ceil(speed):Math.floor(speed);
		
		if(cur==iTarget){
			clearInterval(timer2);	
		}else{
			if(name=='opacity'){
				obj.style.filter='alhpa(opacity'+(cur+speed)+')';
				obj.style.opacity=(cur+speed)/100;	
			}else{
				obj.style[name]=cur+speed+'px';	
			}
		}			
	},30)	
}