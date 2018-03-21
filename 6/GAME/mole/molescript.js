/*A GAME BY 林紫勤 2016.10*/

var mole = -1;//地鼠
var status = 0;//游戏状态
var remaintime = 30;//时间
var myscore = 0;//分数
var holes = document.getElementsByClassName("mole");//洞
window.onload = function() {
	showgamestatus();
	Startorstopgame();
	setclickfunction();
}
function setclickfunction() {
	var holes = document.getElementsByClassName("mole");
	for (var i = 0; i < holes.length; i++) {
		holes[i].onclick = function () {
			if (status == 1) {
				if (this.id== 'b' + (mole+1)) {//正确打中
					this.checked = false;
					myscore++;
					showscore();
					mole = getramdom();
					holes[mole].checked = true;
				} else {//错误点击
					myscore--;
					showscore();
					holes[mole].checked = true;
					return;
				}
			} else if (status == 2) {//暂停时点击--防止地鼠消失
				holes[mole].checked = true;
				return;
			}
		}
	}
}
function Startorstopgame() {
	document.getElementById("switch").onclick = function() {
		if (status == 0) {//开始
			mole = getramdom();
			//初始化
			for (var i = 0; i < holes.length; i++) {
				holes[i].checked = false;
			}
			holes[mole].checked = true;
			remaintime= 30;
			myscore = 0;
			status = 1;
			showtime();
			showscore();
			begin();
		}
		else if (status == 1) {//暂停
			status = 2;
			stop();
		} else {//暂停后继续
			status = 1;
			begin();
		}
	}
}
function showgamestatus() {//显示游戏状态
	var display = document.getElementById("game_status");
	if (status == 0) {
		display.innerHTML = "Game over";
	} else if (status == 1) {
		display.innerHTML = "Game playing";
	} else {
		display.innerHTML = "time out";
	}
}
function getramdom() {//获取随机数
	return Math.floor(Math.random() * (59 - 0 + 1) + 0);
}
function begin() {//开始游戏
	Timeclick();
	myclock = setInterval(Timeclick, 1000);//时钟
	showgamestatus();
}
function end() {//结束
	stop();
	mole = -1;
	status = 0;
	remaintime = 30;
	alert("GAME OVER!  your score is "+myscore);
	myscore = 0;
	showgamestatus();
}
function stop() {
	clearInterval(myclock);
	status = 2;
	showgamestatus();
}
function Timeclick() {
	showtime();
	if (remaintime == 0) end();
    if (remaintime > 0) remaintime--;
}
function showtime() {
	document.getElementById("output_time").value = remaintime;
}
function showscore() {
	document.getElementById("output_score").value = myscore;
}