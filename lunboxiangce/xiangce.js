var lis=document.getElementsByTagName('li');
	var span=document.getElementsByTagName('span');
	var open=document.getElementById('open');
	var close=document.getElementById('close');
	var div1=document.getElementsByClassName('small')[0];
	for (var i = 0; i < lis.length; i++) {
		lis[i].style.backgroundImage="url(img/"+(i+1)+".jpg)";
	}
	open.onclick=function(){
		for (var i = 0; i < lis.length; i++) {
			lis[i].style.transform="rotateY("+30*i+"deg)"+"translateZ("+350+"px)";	
			lis[i].cc=i;
			lis[i].onclick=function(){
				var index=this.cc;
				var degs=30*index
				if (degs>180) {
					degs=degs-360;
					console.log(degs)
				}
				div1.style.transform="rotateY("+-degs+"deg)";
				var time=null;
					for (var i = 0; i < lis.length; i++) {
						lis[i].style.borderWidth=20+"px";
						span[i].style.opacity=1;
					}
					this.style.borderWidth=0;
					span[this.cc].style.opacity=0;
			}

		}
	}
	close.onclick=function(){
			for (var i = 0; i < lis.length; i++) {
				lis[i].style.transform="rotateY("+(0*i)+"deg)"+"translateZ("+0+"px)";
			}
		}	