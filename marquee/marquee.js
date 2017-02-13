var ul=document.getElementsByTagName("ul")[0];	
		var uLi=ul.getElementsByTagName("li");

		var ol=document.getElementsByTagName("ol")[0];	
		var oLi=ol.getElementsByTagName("li");

		var arrColor=["red","orange","yellow","green","cyan","blue","purple"];

		var uLiDiv=ul.getElementsByTagName("div");

		// 通过一个js动态循环来确定每个li的高度和颜色
		for (var i = 0; i < oLi.length; i++) {
			uLi[i].style.backgroundColor=arrColor[i];
			oLi[i].style.backgroundColor=arrColor[i];
			uLiDiv[i].style.backgroundColor=arrColor[i];
			// oLi[i].style.height = oLi[i].offsetHeight + "px";
		}

	//scrollIntoView用法
	//点哪飞哪
		//scrollIntoView :将对象滚动到可见范围内,将其排列到窗口顶部(true)或底部(false)。
		uLi[0].onclick = function(){
			d1.scrollIntoView(false);	
		}
		uLi[1].onclick = function(){
			d2.scrollIntoView();	
		}
		uLi[2].onclick = function(){
			d3.scrollIntoView(true);	
		}
		uLi[3].onclick = function(){
			d4.scrollIntoView();	
		}
		uLi[4].onclick = function(){
			d5.scrollIntoView(false);	
		}	

	//想咬我?
		document.getElementById("btn").onclick = function() {
    		document.getElementById("block").scrollIntoView();
		};

	//撞到天花板了
		window.onscroll=function(){
			var scrollTop=document.body.scrollTop||document.documentElement.scrollTop;
			var top=document.getElementById("top");	
			var navv=document.getElementById("navv");	
			if (scrollTop>200) {
				navv.style.opacity=1;
			}else{
				navv.style.opacity=0;
			}
			top.onclick=function(){
				var t=0;
				var d=30;
				var b=scrollTop;
				var c=0-b;
				var timer=setInterval(function(){
					t++;
					if (t>=d) {
						clearInterval(timer)
					}
					if (document.body.scrollTop) {
						document.body.scrollTop=Tween.Bounce.easeOut(t,b,c,d);
					}else {
						document.documentElement.scrollTop=Tween.Bounce.easeOut(t,b,c,d);
					}
				}, 30)			
			}
		}

	//滚动的大头
		window.onload=function(){
			var bigs=document.getElementById("big");
			var smalls=document.getElementById("small");
			var lis=smalls.getElementsByTagName("li");
			var btn=document.getElementsByTagName("button");
			var speed=5;

			smalls.innerHTML+=smalls.innerHTML;
			smalls.style.height=lis.length*lis[0].offsetHeight+"px";

			function move(){
				if (smalls.offsetTop>=0) {
					smalls.style.top=-smalls.offsetHeight/2+"px";
				}
				else if (smalls.offsetTop<=-smalls.offsetHeight/2) {
					smalls.style.top=0;
				}
				smalls.style.top=smalls.offsetTop+speed+"px";
			}

			var timer=null;
			var timer=setInterval(function(){
				move();
			},30)

			smalls.onmouseover=function(){
				clearInterval(timer);
			}
			smalls.onmouseout=function(){
				timer=null;
				timer=setInterval(move,30);
			}

			btn[0].onclick=function(){
				speed=-5;
			}
			btn[1].onclick=function(){
				speed=5;
			}
		}