var div1=document.getElementsByClassName('div1')[0];
		var div2=document.getElementsByClassName('div2')[0];
		// var maxWidth=div1.clientWidth-div2.offsetWidth;
		// var maxHeight=div1.clientHeight-div2.offsetHeight;
		var speed=4;
		var x=true;
		var y=true;
		var timer=null;
		timer=setInterval(function(){
			var maxWidth=div1.clientWidth-div2.offsetWidth;
			var maxHeight=div1.clientHeight-div2.offsetHeight;
			var l=div2.offsetLeft;
			var t=div2.offsetTop;
			if (x) {
				l+=speed;
				if (l>=maxWidth) {
					x=false;
				}
			}else{
				l-=speed;
				if (l<=0) {
					x=true;
				}
			}
			if (y) {
				t+=speed;
				if (t>=maxHeight) {
					y=false;
				}
			}
			else{
				t=t-speed;
				if (t<=0){
					y=true;
				}
			}
			div2.style.left=l+'px';
			div2.style.top=t+'px';
		},2)