window.onload=function(){
	oDiv=document.getElementById('box');
	var l=0;
	var t=0;
	var ispeedX=0;
	var ispeedY=0;
	var timer=null;
	oDiv.onmousedown=function(e){
		clearInterval(timer);
		var ev=e||event;
		//鼠标距离box的外边框的距离
		var disX=ev.clientX - oDiv.offsetLeft;
		var disY=ev.clientY - oDiv.offsetTop;
		document.onmousemove=function(e){
			var ev=e||event;
			//box的left值
			oDiv.style.left= ev.clientX - disX + 'px';
			oDiv.style.top=ev.clientY -disY + 'px';
			 //box下一次距离前一次的移动距离
		    ispeedX=oDiv.offsetLeft-l;
		    console.log(ispeedX);
			ispeedY=oDiv.offsetTop-t;
			//把前一次的boxoffsetLeft值赋给l
				l=oDiv.offsetLeft;
				console.log(l);
				t=oDiv.offsetTop;
			}//onmousemove
		
	document.onmouseup=function(){
		document.onmousemove=null;
		clearInterval(timer);
		boomMove(oDiv);
	 
	function boomMove(obj){
		//获取浏览器可视区域的宽度和高度
	var clientX=document.documentElement.clientWidth-obj.offsetWidth||document.body.clientWidth-obj.offsetWidth;   
    var clientY=document.documentElement.clientHeight-obj.offsetHeight||document.body.clientHeight-obj.offsetHeight; 
	 
	timer=setInterval(function(){
		   //每一次移动的top距离相加以获得重力
		   ispeedY +=3;
		  // ispeedX +=3;
		var x= obj.offsetLeft + ispeedX;
        var t= obj.offsetTop + ispeedY;	
	      console.log(ispeedX);
	      console.log(ispeedY);
		    
         if(x>clientX){
		x=clientX;
		ispeedX *=-0.9;
		// ispeedY *=0.8;
		 };
		 if(x<0){
		x=0;
		ispeedX *=-0.9;
		// ispeedY *=0.8;	 
			 };
	     if(t>clientY){
		 t=clientY;
		 
		 ispeedY *=-0.8;
		 ispeedX *=0.9;	  
			 };
		 if(t<0){
		 t=0;
		 ispeedY *=-1.1;	 
			 };
	  
	    obj.style.left= x + 'px';
	    obj.style.top= t + 'px'; 
		// Math.abs取绝对值
		//ispeedX一直在乘以0.8，数值不会变为0，为了使其为0，做个判断
		 if(Math.abs(ispeedX)<1){ispeedX=0;};
		 if(Math.abs(ispeedY)<1){ispeedY=0;};
		 if(ispeedX==0&&ispeedY==0&&oDiv.offsetTop==clientY){clearInterval(timer); }
		 	 
		},30) ; 
       }
	}//onmouseup
	}//onmousedown	
  }