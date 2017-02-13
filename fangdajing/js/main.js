//防止图片被选中
document.onselectstart=new Function('event.returnValue=false;');

var boxDiv = document.getElementById('box');//外层容器
var mainDiv = document.getElementById('main');//选择层
var leftUpDiv = document.getElementById('left-up');//坐上角触点
var leftDiv = document.getElementById('left');//左中间触点
var leftDownDiv = document.getElementById('left-down');//左下角触点
var upDiv = document.getElementById('up');//上中间触点
var downDiv = document.getElementById('down');//下中间触点
var rightUpDiv = document.getElementById('right-up');//右上角触点
var rightDiv = document.getElementById('right');//右中间触点
var rightDownDiv = document.getElementById('right-down');//右下角触点
var img3=document.getElementById('img3');

var ifBool = false;//判断鼠标是否按下
var contact = "";//当前拖动的触点

/*
	事件区
*/

//鼠标按下-左上角
leftUpDiv.onmousedown = function(e){
	var ev=e||window.event;
	ev.cancelBubble=true;
	ifBool = true;
	contact = "leftUp";

};
//鼠标按下-左中间
leftDiv.onmousedown = function(e){
	var ev=e||window.event;
	ev.cancelBubble=true;
	ifBool = true;
	contact = "left";

};
//鼠标按下-左下角
leftDownDiv.onmousedown = function(e){
	var ev=e||window.event;
	ev.cancelBubble=true;
	ifBool = true;
	contact = "leftDown";

};
//鼠标按下-上边
upDiv.onmousedown = function(e){
	var ev=e||window.event;
	ev.cancelBubble=true;
	ifBool = true;
	contact = "up";

};
//鼠标按下-下边
downDiv.onmousedown = function(e){
	var ev=e||window.event;
	ev.cancelBubble=true;
	ifBool = true;
	contact = "down";

};
//鼠标按下-右上角
rightUpDiv.onmousedown = function(e){
	var ev=e||window.event;
	ev.cancelBubble=true;
	ifBool = true;
	contact = "rightUp";

};
//鼠标按下-右中间
rightDiv.onmousedown = function(e){
	var ev=e||window.event;
	ev.cancelBubble=true;
	ifBool = true;
	contact = "right";

};
//鼠标按下-右下角
rightDownDiv.onmousedown = function(e){
	var ev=e||window.event;
	ev.cancelBubble=true;
	ifBool = true;
	contact = "rightDown";

};
//拖动
window.onmousemove = function(e){
	var ev=e||window.event;
	ev.cancelBubble=true;
	if(ifBool){
		switch(contact){
			case "leftUp":leftMove(e);upMove(e);break;
			case "left":leftMove(e);break;
			case "leftDown":leftMove(e);downMove(e);break;
			case "up":upMove(e);break;
			case "down":downMove(e);break;
			case "rightUp":rightMove(e);upMove(e);break;
			case "right":rightMove(e);break;
			case "rightDown":rightMove(e);downMove(e);break;
			default:alert("操作错误！");
		}
	var width = mainDiv.offsetWidth;
	var height = mainDiv.offsetHeight;
	setChoice();
	}
};
//鼠标松开
window.onmouseup = function(){
	ifBool = false;
	contact = "";
};

//鼠标点击控制mainDiv的移动
mainDiv.onmousedown=function(e){
	var ev=e||window.event;

	
	boxDiv.onmousemove=function(e){
		var ev=e||window.event;
		var disx=ev.clientX;
		var disy=ev.clientY;

		var moveX=disx-boxDiv.offsetLeft-mainDiv.offsetWidth/2;
		// console.log(moveX);
		var moveY=disy-boxDiv.offsetTop-mainDiv.offsetHeight/2;
		// console.log(moveY);

		var maxWidth=boxDiv.clientWidth-mainDiv.offsetWidth;
		var maxHeight=boxDiv.clientHeight-mainDiv.offsetHeight;

		if(moveX<0){
			moveX=0;
		}else if(moveX>maxWidth){
			moveX=maxWidth;
		}

		if(moveY<0){
			moveY=0;
		}else if(moveY>maxHeight){
			moveY=maxHeight;
		}

		mainDiv.style.left=moveX+"px";
		mainDiv.style.top=moveY+"px";

		img3.style.left=-moveX+"px";
		img3.style.top=-moveY+"px";
		//右边展示区域的范围
		preview({"top":mainDiv.offsetTop,"left":mainDiv.offsetLeft,"bottom":mainDiv.offsetTop+mainDiv.offsetHeight,"right":mainDiv.offsetLeft+mainDiv.offsetWidth});
		//可见区域的范围
		setChoice();
	}
	mainDiv.onmouseup=function(){
		boxDiv.onmousemove="";
	}
}
setChoice();//初始化选择区域可见

/*
	函数区
*/

//左边拖动
function leftMove(e){
	var x = e.clientX;//鼠标横坐标
	if(x < getPosition(boxDiv).left){
		x = getPosition(boxDiv).left;
	}
	var width = mainDiv.clientWidth;//选择层宽度
	var mainX = getPosition(leftUpDiv).left + 4;//左上角横坐标
	var addWidth = mainX - x;//拖动后应该增加的宽度

	//设置拖动后的宽高和位置
	mainDiv.style.width = (width + addWidth) + "px";
	mainDiv.style.left = mainDiv.offsetLeft - mainX + x + "px";
}
//上边拖动
function upMove(e){
	var y = e.clientY;//鼠标纵坐标
	if(y < getPosition(boxDiv).top){
		y = getPosition(boxDiv).top;
	}
	var height = mainDiv.clientHeight;//选择层的高度
	console.log(height);
	var mainY = getPosition(leftUpDiv).top + 4;//左上角纵坐标
	var addHeight = mainY - y;//拖动后应该增加的高度
	
	//设置拖动后的宽高和位置
	mainDiv.style.height = (height + addHeight) + "px";
	mainDiv.style.top = mainDiv.offsetTop - mainY + y + "px"; //纵坐标减去增加的高度
}
//下边拖动
function downMove(e){
	var y = e.clientY;//鼠标纵坐标
	if(y > getPosition(boxDiv).top + boxDiv.offsetHeight){
		y = getPosition(boxDiv).top + boxDiv.offsetHeight;
	}
	var height = mainDiv.clientHeight;//选择层的高度
	var mainY = getPosition(leftUpDiv).top + 4;//左上角纵坐标
	var addHeight = y - mainY - height;//拖动后应该增加的高度
	mainDiv.style.height = (height + addHeight) + "px";
	
}
//右边拖动
function rightMove(e){
	var x = e.clientX;//鼠标横坐标
	if(x > getPosition(boxDiv).left + boxDiv.offsetWidth){
		x = getPosition(boxDiv).left + boxDiv.offsetWidth;
	}
	var width = mainDiv.clientWidth;//选择层宽度
	var mainX = getPosition(leftUpDiv).left + 4;//左上角横坐标
	var addWidth = x - width - mainX;//拖动后应该增加的宽度

	//设置拖动后的宽高和位置
	mainDiv.style.width = (width + addWidth) + "px";
}
//设置选择区域可见
function setChoice(){
	var top = mainDiv.offsetTop;
	var right = mainDiv.offsetLeft + mainDiv.offsetWidth;
	var bottom = mainDiv.offsetTop + mainDiv.offsetHeight;
	var left = mainDiv.offsetLeft;
	document.getElementById("img2").style.clip = "rect("+top+"px,"+right+"px,"+bottom+"px,"+left+"px)";
	preview({"top":top,"right":right,"bottom":bottom,"left":left});

}
//获取元素的绝对位置
function getPosition(node){
	var left = node.offsetLeft;
	var top = node.offsetTop;
	current = node.offsetParent; // 取得元素的offsetParent
	　// 一直循环直到根元素
　　while (current != null) {
	　　left += current.offsetLeft;
	　　top += current.offsetTop;
	　　current = current.offsetParent;
　　}
	return {"left":left,"top":top};
}

//预览
function preview(view){
	
	img3.style.top = -view.top + "px";
	img3.style.left = -view.left + "px";
	img3.style.clip = "rect("+view.top+"px,"+view.right+"px,"+view.bottom+"px,"+view.left+"px)";
}

