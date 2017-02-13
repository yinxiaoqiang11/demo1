var xianshi = document.getElementsByClassName("xianshi")[0];
	var nums = document.querySelectorAll(".num li");
	var ways = document.querySelectorAll(".way li");
	var star = 0;
	var result = "";

	for (var i = 0; i < nums.length; i++) {
		nums[i].onclick = function () {
			if (star == 0) {
				xianshi.innerHTML = this.innerHTML;
				star++;
			}else {
				xianshi.innerHTML += this.innerHTML;
			}
			
		}
	}

	nums[nums.length-2].onclick = function () {
		xianshi.innerHTML = 0;
		star = 0;
	}

	nums[nums.length-3].onclick = function () {
		if (star == 0) {
			xianshi.innerHTML = this.innerHTML;
		}else {
			xianshi.innerHTML += this.innerHTML;
		}
	}

	for (var i = 0; i < ways.length; i++) {
		ways[i].onclick = function () {
			result += xianshi.innerHTML + this.innerHTML;
			star = 0;
			console.log(result);
		}
	}

	nums[nums.length-1].onclick = function() {
		result += xianshi.innerHTML;
		console.log(result);
		xianshi.innerHTML = eval(result);
		result = "";
		star = 0;
	}