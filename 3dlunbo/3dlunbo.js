var view=document.getElementsByClassName('view');//获取观众席
		var space3D=document.getElementsByClassName('space3D')[0];//获取舞台
		var pictures=space3D.getElementsByTagName('div');//舞台表演人员

			var index=0;

			//for循环图片
		for (var i = 0; i < pictures.length; i++) {
			
			pictures[i].onclick=function() {

				index++;

				space3D.style.transition="transform 2s";

				space3D.style.transform="rotateY("+40*index+"deg)";

			}					
		}