/*by 林紫勤 计算器 2016.10*/
var mystring = "";
var flag = 0; //用于判断再次输入是否清屏
window.onload = function() {
	var button1 = document.getElementsByClassName("button_num");
for (var i = 0, j = button1.length; i < j; i++) {
	button1[i].onclick = function () {
		if (flag == 1) {//清屏
			mystring = "";
			flag = 0;
		}
		var output = document.getElementById("output");
  		mystring += this.innerHTML;
  		display();
	}
}

var button2 = document.getElementsByClassName("button_op");
for (var i = 0, j = button2.length; i < j; i++) {
	button2[i].onclick = function () {
		if (flag == 1) {
			flag = 0;
		}
		var output = document.getElementById("output");
  		mystring += this.innerHTML;
  		display();
	}
}

//前面补零
document.getElementById("button_dot").onclick = function () {
		if (flag == 1 || mystring == "") {
			mystring = "0";
			flag = 0;
		}
		var output = document.getElementById("output");
  		mystring += this.innerHTML;
  		display();
	}
}
document.getElementById('button_delete').onclick = function () {
	var output = document.getElementById("output");
	var length = output.innerHTML.length;
  	mystring = mystring.substring(0,mystring.length-1);
  	display();
}
document.getElementById('button_CE').onclick = function () {
	var output = document.getElementById("output");
  	mystring = "";
  	display();
}
document.getElementById('button_equal').onclick = function () {
	var output = document.getElementById("output");
	var string = output.innerHTML;
	try {
		var number = parseFloat(eval(string).toFixed(8));
		mystring = number;
		display();
		flag = 1;
	} catch(err) {
		alert("Invalid input");
	}
}
}

function display() {
	if (mystring.length > 24) {
		output.innerHTML = mystring.substring(mystring.length-24,mystring.length);
	} else {
		output.innerHTML = mystring;
	}
}