/*A GAME BY 林紫勤 2016.10*/
var first = true;
window.onload = function(){
	if (first) {
		reset();
		first = false;
	}
	startevent();
	roadevent();
	wallevent();
	endevent();
}
function startevent() {
	document.getElementById("Start").onmouseover = function() {
		this.value = true;
		document.getElementById("grade").innerHTML = "";
	}
}
function roadevent() {
	var road = document.getElementsByClassName("road");
	for (var i = 0, j = road.length; i < j; i++) {
		road[i].onmouseover = function() {
			var start = document.getElementById("Start");
			if (start.value == true) this.value = true;
		}
	}
}
function wallevent() {
	var wall= document.getElementsByClassName("wall");
	for (var i = 0, j = wall.length; i < j; i++) {
		wall[i].onmouseover = function() {
			var start = document.getElementById("Start");
			if (start.value == true) {
				this.style.backgroundColor='red';
				document.getElementById("grade").innerHTML = "You lose!";
				reset();
			}
		}
		wall[i].onmouseout = function() {
			this.style.backgroundColor = 'rgba(220,220,220,1)';
		}
	}
}
function endevent() {
	document.getElementById("End").onmouseover = function() {
		if (document.getElementById("Start").value == true) {
			var flag = 0;
			var road = document.getElementsByClassName("road");
			for (var i = 0, j = road.length; i < j; i++) {
				if (road[i].value == false) {
					flag = 1;
				}
			}
			if (flag) {
				document.getElementById("grade").innerHTML = "Don't cheat,you should start form the 'S' and move to the 'E' inside the maze!";
			} else {
				document.getElementById("grade").innerHTML = "You win!";
			}
			reset();
		}
	}
}
function reset() {
	document.getElementById("Start").value = false;
	var road = document.getElementsByClassName("road");
	for (var i = 0, j = road.length; i < j; i++) {
	road[i].value = false;
	}
}