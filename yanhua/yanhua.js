window.onload = function(){


	}
	function rgb(){//创建颜色随机值
		var str =Math.ceil(Math.random()*16777215).toString(16);//向上取整
		while(str.length<6){
			str='0'+str;
		}
		return str;
	}
		document.onclick=function(event){
			var oEvent = event || window.event;
			var t =oEvent.clientY;
			var l =oEvent.clientX;
			var oRdeDiv =document.createElement('div');//创建一个div
			oRdeDiv.style.width = '4px';
			oRdeDiv.style.height = '30px';
			oRdeDiv.style.background = 'red';
			document.body.appendChild(oRdeDiv);//向body添加一个div元素
			oRdeDiv.style.top=document.documentElement.clientHeight+'px';
			oRdeDiv.style.left=oEvent.clientX+'px';
			//alert(oRdeDiv.offsetTop)
			var timer =setInterval(function(){//让创建的这个div从下往上打上来！
			oRdeDiv.style.top = oRdeDiv.offsetTop-20+'px';
			if(oRdeDiv.offsetTop <= t){
				clearInterval(timer);
				document.body.removeChild(oRdeDiv);
				var i=0;
				var aDiv = [];
				for(var i=0;i<50;i++){//创建多个div
					var oDiv = document.createElement('div');
					oDiv.style.background='#'+rgb();
					oDiv.style.width='2px';
					oDiv.style.height='2px';
					oDiv.style.left=l+'px';
					oDiv.style.top=t+'px';
					document.body.appendChild(oDiv);
					aDiv.push(oDiv);
					oDiv.speedX =Math.random()*20-10;//添加一个x轴的速度
					oDiv.speedY =Math.random()*20-10;//添加一个y轴的速度

				}
				var newtimer =setInterval(function(){//让每个div随机往下掉，以达到烟花效果
					var count=0;
					for(var i=0;i<aDiv.length;i++){
						if(!aDiv[i])continue;//当aDiv[i]为空不再进行循环操作
						aDiv[i].style.left=aDiv[i].offsetLeft+aDiv[i].speedX+'px';
						aDiv[i].style.top=aDiv[i].offsetTop+aDiv[i].speedY+'px';
						aDiv[i].speedY++;//y轴的速度越来越大以便烟花向下掉
						var winWidth = document.documentElement.clientWidth || document.body.clientWidth;
						var winHeight = document.documentElement.clientHeight || document.body.clientHeight;
						if(aDiv[i].offsetLeft<0 || aDiv[i].offsetLeft>winWidth || aDiv[i].offsetTop>winHeight){
							document.body.removeChild(aDiv[i]);
							aDiv[i]=null;
						}
						count++;
					}
					if(count==0){//当所有的div小块掉出屏幕是清除定时器
						clearInterval(newtimer);
					}
				},30)
			}



			},30)
		}