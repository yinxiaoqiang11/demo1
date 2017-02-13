var img=document.getElementsByTagName('img')[0];
		var imgTwo=document.getElementById('imgTwo');
		window.onscroll=function(){
			var scrollTop=document.body.scrollTop||document.documentElement.scrollTop

			var index=parseInt(scrollTop/30);
			var gg=parseInt(scrollTop/10)
			// console.log(index);
			if (index>70&&gg<234) {

				img.style.top="-"+15-(gg-210)*5+"%";
				imgTwo.style.top=100-(gg-210)*5+"%";
				imgTwo.src="../share/"+(index-71)+".jpg";

				console.log(imgTwo.src)
			}else if(index<=70){
				img.style.top="-"+15+"%";
				imgTwo.style.top=100+"%";
				index=parseInt(scrollTop/30);
				img.src="../shareImg/"+index+".jpg";
				// img.src="../img/h"+index+".png";
			}else{
				imgTwo.src="../share/"+(index-71)+".jpg";
			}
			
			

		} 