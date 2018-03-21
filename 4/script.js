/*by 林紫勤 计算器 2016.10*/
var mystring = "";
var flag = 0; //用于判断再次输入是否清屏
window.onload = function() {
	$('#input').click(function(event) {
		var button = event.target;
		if (button.className == "button_num") {
			if (flag == 1) {//清屏
				mystring = "";
				flag = 0;
			}
	  		mystring += button.innerHTML;
	  		display();
		} else if (button.className == "button_op") {
			if (flag == 1) {//清屏
				mystring = "";
				flag = 0;
			}
	  		mystring += button.innerHTML;
	  		display();
		}
	})
//前面补零
	$('#button_dot').click(function() {
		if (flag == 1 || mystring == "") {
			mystring = "0";
			flag = 0;
		}
  		mystring += this.innerHTML;
  		display();
	})

$('#button_delete').click(function() {
	var length = mystring.length;
  	mystring = mystring.substring(0,length-1);
  	display();
})
$('#button_CE').click (function() {
  	mystring = "";
  	display();
})
$('#button_equal').click(function() {
	try {
		var number = parseFloat(eval(mystring).toFixed(8));
		mystring = number;
		display();
		flag = 1;
	} catch(err) {
		alert("Invalid input");
	}
})

function display() {
	if (mystring.length > 24) {
		output.innerHTML = mystring.substring(mystring.length-24,mystring.length);
	} else {
		output.innerHTML = mystring;
	}
}
}