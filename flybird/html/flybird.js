var audioBullet = document.getElementsByClassName('audioBullet')[0];
	var audioOver = document.getElementsByClassName('audioOver')[0];
	var container = document.getElementsByClassName('container')[0];
	var startBox = document.getElementsByClassName('startBox')[0];
	var overBox = document.getElementsByClassName('overBox')[0];
	var countBox = document.getElementsByClassName('count')[0];
	var count = 0;
	var best = 0;
	
	var bird = document.querySelector('.bird img');
	var birdBox = document.getElementsByClassName('bird')[0];
	var flyTimer = null;
	var flyDelayTime = 50;
	var upSpeed = 10;
	var downSpeed = 20;

	window.onload = function () {
		startGame();
	}

	//开始页面
	var titleTimer = null;
	var titleDelayTime = 150;
	function startGame() {
		count = 0;
		birdBox.style.display = "none";
		countBox.style.display = "none";
		startBox.style.width = container.clientWidth + "px";
		startBox.style.height = container.clientHeight + "px";
		startBox.style.display = "block";
		var title = document.getElementsByClassName('title')[0];
		var startBird = document.getElementsByClassName('startBird')[0];
		var startBtn = document.getElementsByClassName('startBtn')[0];
		var scoreBtn = document.getElementsByClassName('scoreBtn')[0];
		var speed = 3;
		var i = 0;
		titleTimer = setInterval(function () {
			if (i++%6<=0) {speed = -speed}
			title.style.top = title.offsetTop + speed + "px";
			startBird.src = "../img/bird" + i%2 + ".png";
		},titleDelayTime);
		startBtn.onclick = function () {
			clearInterval(titleTimer);
			gameReady();
		}
	}

	//结束页面
	function overGame() {
		closeAllTimer();
		overBox.style.width = container.clientWidth + "px";
		overBox.style.height = container.clientHeight + "px";
		overBox.style.display = "block";
		countBox.style.display = "none";
		var okBtn = document.getElementsByClassName('okBtn')[0];
		var submitBtn = document.getElementsByClassName('submitBtn')[0];
		var countImg = document.getElementsByClassName('countImg')[0];
		var bestImg = document.getElementsByClassName('bestImg')[0];
		bestImg.innerHTML = countImg.innerHTML = "";
		if (best < count) {best = count}
		count = ""+count;
		best = ""+best;
		for (var i = 0; i < count.length; i++) {
			countImg.innerHTML += "<img src='../img/" + count[i] + ".jpg'>"
		}
		for (var i = 0; i < best.length; i++) {
			bestImg.innerHTML += "<img src='../img/" + best[i] + ".jpg'>"
		}
		okBtn.onclick = function () {
			overBox.style.display = "";
			firstClick = true;
			removeOverPipe();
			startGame();
		}
		document.onkeydown = null;
	}

	//清除结束后的障碍
	function removeOverPipe() {
		var pipes = document.querySelectorAll(".topPipe,.bottomPipe");
		var n = pipes.length;
		for (var i = 0; i < n; i++) {
			pipes[i].parentNode.removeChild(pipes[i]);
		}
	}

	//准备页面
	var firstClick = true;
	function gameReady() {
		birdBox.style = "";
		bird.src = "../img/bird0.png";
		startBox.style.display = "none";
		countBox.style = "";
		countBox.innerHTML = "<img src='../img/0.jpg'>";
		gogogo();

		//键盘点击事件
		document.onkeydown = function (e) {
			var ev = e || window.event;
			// console.log(ev.key);
			if (ev.key == " ") {
				clearInterval(flyTimer);
				if (firstClick) {
					pipeMove();
					pipeRemove();
					touchTest();
					createPipeDelay();
					addCount();
					firstClick = false;
				}
				audioBullet.play();
				var i = 0;
				//向上飞的过程
				flyTimer = setInterval(function () {	
					bird.src = "../img/up_bird" + i%2 + ".png";
					birdBox.style.top = birdBox.offsetTop - upSpeed + "px";
					if (i >= 5) {
						i = 0;
						clearInterval(flyTimer);
						//水平飞行的过程
						flyTimer = setInterval(function () {
							bird.src = "../img/bird" + i%2 + ".png";
							if (i >= 3) {
								i = 0;
								clearInterval(flyTimer);
								//向下飞的过程
								flyTimer = setInterval(function () {
									bird.src = "../img/down_bird" + i%2 + ".png";
									birdBox.style.top = birdBox.offsetTop + downSpeed + "px";
									if (i >= 3) {
										// clearInterval(flyTimer);
										i = 0;
									}
									i++;
								},flyDelayTime);
							}
							i++;
						},flyDelayTime);
					}
					i++;
				},flyDelayTime);
			}
		}
	}
	

	//创建成对障碍
	var pipeInterval = 120;
	function createPipe() {
		var topPipe = document.createElement('div');
		var bottomPipe = document.createElement('div');
		var topPipeImg = document.createElement('img');
		var bottomPipeImg = document.createElement('img');

		topPipe.className = "topPipe";
		bottomPipe.className = "bottomPipe";

		topPipeImg.src = "../img/up_pipe.png";
		bottomPipeImg.src = "../img/down_pipe.png";

		topPipe.appendChild(topPipeImg);
		bottomPipe.appendChild(bottomPipeImg);

		var topH = getRandom(60,container.offsetHeight - pipeInterval - 100);
		var botH = container.offsetHeight - pipeInterval - topH;
		// console.log(botH+"="+container.offsetHeight+"-"+pipeInterval+"-"+topH);

		topPipe.style.height = topH + "px";
		bottomPipe.style.height = botH + "px";
		topPipe.style.left = 350 + "px";
		bottomPipe.style.left = 350 + "px";

		container.appendChild(topPipe);
		container.appendChild(bottomPipe);

	}

	//障碍移动
	var pipeMoveTimer = null;
	var pipeMoveDelayTime = 50;
	function pipeMove() {
		pipeMoveTimer = setInterval(function () {
			var pipes = document.querySelectorAll('.topPipe,.bottomPipe');
			for (var i = 0; i < pipes.length; i++) {
				pipes[i].style.left = pipes[i].offsetLeft - 5 + "px";
			}
		},pipeMoveDelayTime);
	}

	//障碍间隔生成
	var pipeCreateTimer = null;
	var pipeCreateDelayTime = pipeMoveDelayTime * 50;
	function createPipeDelay() {
		clearInterval(pipeCreateTimer);
		pipeCreateTimer = setInterval(createPipe,pipeCreateDelayTime);
	}

	//障碍清除
	var pipeRemoveTimer = null;
	var pipeRemoveDelayTime = pipeMoveDelayTime;
	function pipeRemove() {
		pipeRemoveTimer = setInterval(function () {
			var pipes = document.querySelectorAll('.topPipe,.bottomPipe');
			if (pipes[0] && pipes[0].offsetLeft < 0 - pipes[0].offsetWidth) {
				pipes[0].parentNode.removeChild(pipes[0]);
			}
		},pipeRemoveDelayTime);
	}

	//背景滚动条移动
	var sliper = document.getElementsByClassName('sliper')[0];
	var goTimer = null;
	var goDelayTime = pipeMoveDelayTime;
	function gogogo() {
		goTimer = setInterval(function () {
			sliper.style.left = sliper.offsetLeft - 5 + "px";
			if (sliper.offsetLeft <= -50) {
				sliper.style.left = 0;
			}
		},goDelayTime);
	}

	//碰撞检测
	var touchTestTimer = null;
	var touchTestDelayTime = pipeMoveDelayTime;
	function touchTest() {
		touchTestTimer = setInterval(function () {
			var bol = false;

			var boxT = 0;
			var boxB = container.offsetHeight - sliper.offsetHeight;

			var pipes = document.querySelectorAll('.topPipe,.bottomPipe');
			var birdT = birdBox.offsetTop;
			var birdB = birdT + birdBox.offsetHeight;
			var birdL = birdBox.offsetLeft;
			var birdR = birdL + birdBox.offsetWidth;

			if (birdT <= boxT || birdB >= boxB) {
				bol = true;
			}

			for (var i = 0; i < pipes.length; i++) {
				var ppT = pipes[i].offsetTop;
				var ppB = ppT + pipes[i].offsetHeight;
				var ppL = pipes[i].offsetLeft;
				var ppR = ppL + pipes[i].offsetWidth;

				if (!(birdL>ppR||birdR<ppL||birdT>ppB||birdB<ppT)) {
					bol = true;
					break;
				}
			}

			if (bol) {
				console.log("Game Over");
				audioOver.play();
				overGame();
				// closeAllTimer();
			}
		},touchTestDelayTime);
	}

	//加分
	var addCountTimer = null;
	var addCountDelayTime = pipeMoveDelayTime;
	function addCount() {
		addCountTimer = setInterval(function () {
			var pipes = document.querySelectorAll(".topPipe");
			for (var i = 0; i < pipes.length; i++) {
				if (birdBox.offsetLeft >= pipes[i].offsetLeft - pipes[i].offsetWidth/2 && birdBox.offsetLeft <= pipes[i].offsetLeft - pipes[i].offsetWidth/2 + 5) {
					count++;
					count = ""+count;
					countBox.innerHTML = "";
					for (var i = 0; i < count.length; i++) {
						countBox.innerHTML += "<img src='../img/" + count[i] + ".jpg'>"
					}
				}
			}
		},addCountDelayTime);
	}

	//清除所有定时器
	function closeAllTimer() {
		clearInterval(goTimer);
		clearInterval(flyTimer);
		clearInterval(pipeMoveTimer);
		clearInterval(touchTestTimer);
		clearInterval(pipeRemoveTimer);
		clearInterval(pipeCreateTimer);
		clearInterval(addCountTimer);
	}

	//获取随机数字
	function getRandom(min,max) {
		return parseInt(Math.random()*(max-min)+min);
	}