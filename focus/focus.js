var inputs=document.getElementById('text');
		var	wordsArr=["闪购特卖","傅雷家书","运动相机","机械键盘","机甲手机壳"];

		function rand(min,max){
			return parseInt(Math.random()*(max-min)+min);
		}

		var voc=rand(0,5);
		inputs.value=wordsArr[voc];

		inputs.onfocus=function(){
			if (inputs.value==wordsArr[voc]) {
			inputs.value="";
			}
		}
		inputs.onblur=function(){
			if(inputs.value==""){
				 inputs.value=wordsArr[voc];
				}
			}