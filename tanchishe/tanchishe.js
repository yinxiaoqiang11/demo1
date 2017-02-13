var screen = document.getElementsByClassName("screen")[0];
		var header = document.getElementsByClassName("header")[0];
		var tails = document.getElementsByClassName("tail");
		var ggwp = document.getElementsByClassName("ggwp")[0];
		var gg = document.getElementsByClassName("gg")[0];
		var wp = document.getElementsByClassName("wp")[0];
		var score = document.getElementsByClassName("score")[0];
		var fenshu = 0;
		var headerTop = header.offsetTop;
		var headerLeft = header.offsetLeft;
		//随机数
		function rand (min,max) {
			return parseInt(Math.random()*(max-min)+min); 
		}
		//食物
		function createFood () {
			var food = document.createElement("div");
			food.className = "food";
			//不用appendChild而用insertBefore是为了吃食物的效果，要保证蛇头和食物碰撞的时候蛇头是在食物之上的
			screen.insertBefore(food, header);
			// screen.appendChild(food);
			//screen的宽高为500，要减去食物自身的宽高->475,以25宽高为一格，那么就取0--19
			var foodTop = rand(0,20)*25;
			var foodLeft = rand(0,20)*25;
			//当生成的食物和蛇的位置重合的时候重新生成新的随机数
			//食物和蛇头
			if (foodTop == headerTop && foodLeft == headerLeft) {
			  	foodTop = rand(0,20)*25;
			 	foodLeft = rand(0,20)*25;
			}
			//食物和蛇尾
			for (var i = 0; i < tails.length; i++) {
				if (foodTop == tails[i].offsetTop && foodLeft == tails[i].offsetLeft) {
					foodTop = rand(0,20)*25;
			 		foodLeft = rand(0,20)*25;
				}
			}
			food.style.top = foodTop+"px";
			food.style.left = foodLeft+"px"
		}
		createFood();
		//25px一格的速度
		var speed = 25;
		var timer;
		var ev = ev||window.event;
		var coder;
		function globalMove () {
			clearInterval(timer);
			timer = setInterval(function () {
				var food = document.getElementsByClassName("food")[0];
				headerTop = header.offsetTop;
				headerLeft = header.offsetLeft;
				//让tail的下一个等于上一个的位置
				for (var i = tails.length-1; i > 0; i--) {
				 	tails[i].style.left = tails[i-1].style.left;
				 	tails[i].style.top = tails[i-1].style.top;
				}
				document.addEventListener("keydown", function (ev) {
					 coder =  ev.keyCode||ev.which;
				},false)
				/***
					coder=37 左移
					coder=38 上移
					coder=39 右移
					coder=40 下移
				*/
				if (coder == 37) {
					header.style.left = headerLeft-speed+"px";
				}else if (coder == 38) {
					header.style.top = headerTop-speed+"px";
				}else if (coder == 39) {
					header.style.left = headerLeft+speed+"px";
				}else if (coder == 40) {
					header.style.top = headerTop+speed+"px";
				}
				//蛇头第一次移动的时候尾巴跟在移动	
				if (headerTop != header.offsetTop||headerLeft != header.offsetLeft) {
				  	tails[0].style.left = headerLeft+"px";
				  	tails[0].style.top = headerTop+"px";
				}
				//删除food，当蛇头和食物位置重合的时候删除
				if (headerTop == food.offsetTop&&headerLeft == food.offsetLeft) {
					//分数加加
					fenshu++;
					score.innerHTML = "分数："+fenshu;
					screen.removeChild(food);
					//删除完了要记得创建哦，么么哒！
					createFood();
					//还要记得创建一个新的尾巴哦！
					var lastTail = document.createElement("div");
					lastTail.className = "tail";
					screen.appendChild(lastTail);
					tails[tails.length-1].style.left = tails[tails.length-2].style.left;
					tails[tails.length-1].style.top = tails[tails.length-2].style.top;
				}
				for (var i = 0; i < tails.length; i++) {
					//蛇头的位置要是和蛇尾的位置重合的话就gameover了
					if (header.offsetLeft == tails[i].offsetLeft&&header.offsetTop == tails[i].offsetTop) {
						ggwp.style.display = "block";
						clearInterval(timer);
					}
				}
				//此时的蛇尾和蛇头的left和top均已经改变为下一个位置，蛇尾第一个为蛇头上一个位置，重新给蛇头的left和top赋值，是为了在判断超出边框的时候不是用旧值（上一个蛇头的位置的值）判断，也就是为了让蛇尾第一个值不超出边框
				headerTop = header.offsetTop;
				headerLeft = header.offsetLeft;
				if (headerTop<0||headerTop>475||headerLeft<0||headerLeft>475) {
					ggwp.style.display = "block";
					clearInterval(timer);		
				}
			}, 200) 
		}
		globalMove();
		//键盘事件 回车键的keycode为13
		document.onkeydown = function (e) {
			var ev = e||window.event;
			//出现ggwp页面的时候点击回车键重新加载页面
			if (ev.keyCode == 13 && ggwp.style.display) {
			 	window.location.href = "贪吃蛇3.html";
			}
		}
		//重新开始
		wp.onclick = function () {
			window.location.href = "贪吃蛇3.html";
		}