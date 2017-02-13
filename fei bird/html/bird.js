//函数里面的定时器 一定要在函数最前面关掉！！！！！！
	var bird = document.querySelector('#bird');//获取小鸟
	var banner = document.querySelector('#banner');
	var timer0 = null;
	var timer2 = null;//banner滚动的定时器
	var birdup = null;
	var birddown = null;
	var pipeyidong =null;
	var creatpipe = null;
	var touchTimer = null;
	var birdPingfly = null;
	var divPing = null;
	var countTimer = null;
	var i = 0;
	var pic = 0;
	var downspeed = 15;
	var upspeed =10;
	var flydiv = document.querySelector('#fly');
	var pingbird = document.querySelector('#fly img');
	var stardiv = document.querySelector('#startbtn');
	var startbtn = document.querySelector('#startbtn img:nth-child(1)');
	var press = document.querySelector('#press');
	var score = document.querySelector('#score');
	// var scoreimg = document.querySelector('#score img');
	var overbox = document.querySelector('#overbox');
	var obimg = document.querySelectorAll('#overbox img');
	var contain = document.querySelector('#contain');
	var nowscore = document.querySelector('#nowscore');
	var best = document.querySelector('#best');
	var bestcount = 0;
	var start = 0;
    //最开始的时候
	window.onload=function(){
		startBird();
		timer2 = setInterval(function(){
		if (banner.offsetLeft<=-200) {
			banner.style.left = -10+'px';}
		banner.style.left = banner.offsetLeft-4+'px';
	},50);
	}
	//按住开始按钮之后
	startbtn.onclick = function(){
		flydiv.style.display = 'none';
		stardiv.style.display = 'none';
		bird.style.display = 'block';
		bird.src = '../img/bird0.png';
		bird.style.left = 50+'px';
		bird.style.top = 220+'px';
		press.style.display = 'block';
		score.style.display = 'block';
		timer0 = setInterval(function(){
			bird.src = '../img/bird'+i%2+'.png';
			i++;
		},100); 
		var bol = true;//这个要放在里面  是让createPipes()和touchText()只在第一次按住空格的时候就执行  而之后再按就没有作用 不然会叠加计时器
		document.onkeydown = function(e){

			press.style.display = 'none';
			clearInterval(timer0);
			clearInterval(birdUp);
			var ev = e||window.event;

	        if (ev.keyCode=='32') {
	       	    if (bol) {
	       	    	createPipes();
		            touchText();
		            bol=false;//阻止多次按space造成 多次运行 createPipes()和touchText()的情况
	       	    }
	       		birdUp();
	       }
		}; 
	}
	//按住gameover之后的ok键
	obimg[2].onclick = function(){
    	var pipes = document.querySelectorAll('.uppipe,.downpipe');//多个子节点用循环删除
    	for(var i = 0;i<pipes.length;i++){
    		contain.removeChild(pipes[i]);
    	}
    	timer2 = setInterval(function(){
		if (banner.offsetLeft<=-200) {
			banner.style.left = -10+'px';}
		banner.style.left = banner.offsetLeft-4+'px';
	},50)
    	bird.style.display = 'none';
    	overbox.style.display = 'none';
    	stardiv.style.display = 'block';
    	flydiv.style.display = 'block';
    	nowscore.innerHTML = '';//一定要记得清空哪个
    	score.innerHTML = '';//一定要记得清空
    	nowscore.innerHTML+='<img src="../img/0.jpg" alt="">';
    	score.innerHTML+='<img src="../img/0.jpg" alt="">';
    	startBird();
    }
    //开始的动画 在window.onload的时候运行
    function startBird(){
    	var i = 0;
    	var speed = 1;
    	clearInterval(birdPingfly);
    	clearInterval(divPing);
    	birdPingfly = setInterval(function(){
			pingbird.src = '../img/bird'+i%2+'.png';
			i++;
		},100); 
		divPing = setInterval(function(){
			i++;
			if (flydiv.offsetTop>=40) {
				speed = -1;
				i = 0;
			}
			if (flydiv.offsetTop==0) {
				speed = 1;
			}
    		flydiv.style.top = flydiv.offsetTop+speed+'px';

    	     },40);
    };
	//创建 并且 移动 的函数
	function createPipes(){
		clearInterval(creatpipe);
		creatpipe=setInterval(function(){                 
			createPipe();
			pipeYidong();//要加 每一个创建的都要移动
		},2500);
	}
	function rand(min,max){
		return parseInt(Math.random()*(max-min)+min)
		};
	function createPipe(){
		var uppipe = document.createElement('div');//创建上面的pipe
		var downpipe = document.createElement('div');//创建下面的pipe
		var upimg = document.createElement('img');//创建上面的图图
		var downimg = document.createElement('img');//创建下面的图图
		uppipe.setAttribute('class','uppipe');//给创建的div class
		upimg.src ="../img/up_pipe.png"; //给上面的图图加路径
		uppipe.appendChild(upimg);//将上面的图图插入到上面的div里
		downpipe.setAttribute('class','downpipe');//同理
		downimg.src ="../img/down_pipe.png"; 
		downpipe.appendChild(downimg);
		contain.appendChild(uppipe);
		contain.appendChild(downpipe);
		uppipe.style.height = rand(50,213)+'px';//随机获取创建div的高度
		downpipe.style.height = 330-uppipe.offsetHeight+'px';//通过设置上面的div的高度 来确定下面div的高度
	}
	//pipe 移动和移除 以及碰撞事件
	function pipeYidong(){
		clearInterval(pipeyidong);
		var bird = document.querySelector('#bird');
		var uppipe = document.querySelectorAll('.uppipe');
		var downpipe = document.querySelectorAll('.downpipe');
         	pipeyidong=setInterval(function (){
         		for(var i = 0;i<uppipe.length;i++){//循环 创建的每一个都向左走
         		uppipe[i].style.left = uppipe[i].offsetLeft-4+'px';
         	    };
         	    for(var i = 0;i<downpipe.length;i++){
         		downpipe[i].style.left = downpipe[i].offsetLeft-4+'px';
         	    };
         },50);
         	//超出范围的移除  这个地方如果用循环的话  会有影响  所以 记得使用下面的方法 只删除第一个就可以
         	var contain = document.querySelector('#contain');
         	if (uppipe[0]&&uppipe[0].offsetLeft<=-60) {
         		contain.removeChild(uppipe[0]);
         	}
         	if (downpipe[0]&&downpipe[0].offsetLeft<=-60) {
         		contain.removeChild(downpipe[0]);
         	}; 
	}
    //碰撞检测
    function touchText(){
    	clearInterval(touchTimer);
    	clearInterval(countTimer);//每一次都要关掉函数中之前的所有定时器 不然会叠加的
    	touchTimer=setInterval(function(){
    	var pipes = document.querySelectorAll('.uppipe,.downpipe');
    	var bol = false;
        var birdL = bird.offsetLeft;
        var birdT = bird.offsetTop;
        var birdW = bird.offsetWidth+birdL;
        var birdH = bird.offsetHeight+birdT;
	     	for(var i =0;i<pipes.length;i++){  
	     		var pipeL = pipes[i].offsetLeft;
		        var pipeT = pipes[i].offsetTop;
		        var pipeW = pipes[i].offsetWidth+pipeL;
		        var pipeH = pipes[i].offsetHeight+pipeT;
	         	if (!(birdL>pipeW||birdW<pipeL||birdT>pipeH||birdH<pipeT)){
	         		//判断条件为不碰的情况，！一下 就是所有碰撞的情况
			        	clearTimer();
			        	gameover();     
	     	    };
            };
            if (bird.offsetTop>=385) {//这个是判断小鸟落地事件
		 	    clearInterval(birddown);
		 	    bird.style.top = 380+'px';
		 	console.log(pic);
		 	    clearTimer();
		 	    gameover();
		 }
            
    	},50);
    	//得分检测
	    	start = setTimeout(function(){
	    		countTimer = setInterval(function(){
		    		var pipp = document.querySelectorAll('.uppipe,.downpipe'); //获取所有创建的div
		    	    var pipe = pipp[0];//获取第一个
		    	    if (bird.offsetLeft>pipe.offsetLeft&&bird.offsetLeft<=pipe.offsetLeft+4) {
			     	    //判断条件就是小鸟过去的时候 而且不能多次叠加 在这个范围内加分 要和管子移动的时间相同
			     	   	pic++;
			     	    pic = ''+pic;//变成字符串
			     	    console.log(pic);
			     	    console.log(typeof pic);
			     	    score.innerHTML = '';//每次都要置空
			     	    nowscore.innerHTML= '';
			     	    for(var i = 0;i<pic.length;i++){//原理同下
			     	    	score.innerHTML+='<img src="../img/'+pic[i]+'.jpg" alt="">';
			     	    	nowscore.innerHTML+='<img src="../img/'+pic[i]+'.jpg" alt="">';
			     	    }
			     	}
	    	},50);
    	},2500);
    }
	
    // 小鸟向上飞
	function birdUp(){
		i=0;
		clearInterval(birdup);//作用就是关掉上一次 下次执行的时候不会叠加
		clearInterval(birddown);//取消下降的定时器 一定要写 因为上升的时候不能有下降的定时器
		birdup = setInterval(function(){
			bird.src = '../img/up_bird'+i%2+'.png';
			bird.style.transform = 'rotateZ(0deg)';
			i++;
			bird.style.top = bird.offsetTop-upspeed+'px';
			if (bird.offsetTop<=0) {
				bird.style.top = 0;    
			}
			if (i>3) {
				clearInterval(birdup);  
				birdDown();//当上升一定高度时候 要开启下降的定时器 这样就继续下降了 
			}

		},100); 
	}
	//小鸟一直下落的函数
	function birdDown(){
		i = 0;
		clearInterval(birddown);
      birddown = setInterval(function(){
		 bird.src = '../img/down_bird'+i%2+'.png';//因为所有的数%2 不是为0 就是1 所以这个地方巧妙的解决了图片变换的问题
		 i++;
		 bird.style.top = bird.offsetTop+downspeed+'px';//让小鸟自动下落
	   },100); 
	};
	//当游戏结束的时候，关闭所有的定时器
	function clearTimer(){
		clearInterval(timer0);
		clearInterval(timer2);
		clearInterval(birdup);
		clearInterval(pipeyidong);
		clearInterval(creatpipe);
		clearInterval(touchTimer);
		clearInterval(birddown);
		clearInterval(countTimer);
		clearTimeout(start);
	};
	//game结束
	function gameover(){
	   
       score.style.display = 'none';
       //bestcount为了存储最好成绩 和pic即每次的成绩相比 看是否更新自身
       if (bestcount<pic) {
			bestcount = pic;//当前成绩比之前的记录好
       }
       if (bestcount>pic) {
       	    bestcount = bestcount;//当前成绩没有之前的记录好 就保留当前最好成绩
       }
       bestcount=''+bestcount;//把bestcount变成字符串 这样就能根据字符串的位数来确定图片的途径 因为图片命名是0 1 2 3等 这是个技巧
       best.innerHTML = '';
       for(var i=0;i<bestcount.length;i++){
       	best.innerHTML+='<img src="../img/'+ bestcount[i]+'.jpg">';//这个循环是为了解决有多位数出现的情况
       }
       overbox.style.display = 'block';
       pic = 0;//变量归零 但是bestcount不用归零
       document.onkeydown=null;//让游戏结束的时候 空格不好用
	}
      