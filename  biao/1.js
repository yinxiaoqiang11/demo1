    var canvas=document.getElementById("canvas");
	var width=canvas.width;
	var height=canvas.height;
	var ctx=canvas.getContext("2d");
	var r=width/2;
	var rem=width/200;
	function drawBackground(){
		ctx.save();
		ctx.translate(r,r);
		ctx.beginPath();
		ctx.lineWidth=10*rem;
		ctx.arc(0,0,r-ctx.lineWidth/2,0,Math.PI*2,false);
		ctx.stroke()
		// 留作问题
		// ctx.restore();

		// 制作数字
		var hourArr=[3,4,5,6,7,8,9,10,11,12,1,2];
		ctx.font=18*rem+"px Arial";
		ctx.textAlign="center";
		ctx.textBaseline="middle"
		hourArr.forEach(function(number,i){
			var rad=2*Math.PI/12*i;
			var x=Math.cos(rad)*(r-30*rem);
			var y=Math.sin(rad)*(r-30*rem);
			ctx.fillText(number,x,y)
		})
		// 制作刻度
		for(var i=0;i<60;i++){
			var rad=2*Math.PI/60*i;
			var x=Math.cos(rad)*(r-18*rem);
			var y=Math.sin(rad)*(r-18*rem);
			ctx.beginPath();
			if(i%5==0){
				ctx.fillStyle="#000";
				ctx.arc(x,y,2*rem,0,Math.PI*2,false)
			}else{
				ctx.fillStyle="#ccc";
				ctx.arc(x,y,2*rem,0,Math.PI*2,false)
			}
			ctx.fill()
		}
		// 背景部分不能加restore()
		// ctx.restore()
	}
	function drawHour(hour,minu){
		ctx.save();
		ctx.beginPath();
		var rad=Math.PI*2/12*hour;
		var mard=Math.PI*2/12/60*minu;
		ctx.rotate(rad+mard);
		ctx.lineWidth=6*rem;
		ctx.lineCap="round";
		ctx.moveTo(0,10*rem);
		ctx.lineTo(0,-50*rem);
		ctx.stroke()
		ctx.restore();
	}
	function drawMinu(minu){
		ctx.save();
		ctx.beginPath();
		var rad=Math.PI*2/60*minu;
		ctx.rotate(rad);
		ctx.lineWidth=3*rem;
		ctx.lineCap="round";
		ctx.moveTo(0,10*rem);
		ctx.lineTo(0,-70*rem);
		ctx.stroke()
		ctx.restore();
	}
	function drawSecond(second){
		ctx.save();
		ctx.beginPath();
		var rad=Math.PI*2/60*second;
		ctx.rotate(rad);
		ctx.moveTo(-2*rem,20*rem);
		ctx.lineTo(2*rem,20*rem);
		ctx.lineTo(1*rem,-80*rem);
		ctx.lineTo(-1*rem,-80*rem)
		ctx.fillStyle="red"
		ctx.fill()
		ctx.restore();
	}
	function drawDot(){
		ctx.beginPath();
		ctx.arc(0,0,2*rem,0,Math.PI*2,false);
		ctx.fillStyle="#fff";
		ctx.fill()
	}

	function draw(){
		ctx.clearRect(0,0,canvas.width,canvas.height);
		var now=new Date();
		var hour=now.getHours();
		var minu=now.getMinutes();
		var second=now.getSeconds();
		drawBackground()
		drawHour(hour,minu)
		drawMinu(minu)
		drawSecond(second)
		drawDot()
		ctx.restore()
	}
	draw()
	setInterval(draw,1000)