$(function() {
	listen();
})

function listen() {
	$("label input").blur(function(event) {
		var target = event.target;
		name = $(target).attr('name');
		if (CheckValid(name, $(target).val())) {
			$(target).addClass('corrent');
			clearError(name);
		} else {
			$(target).removeClass('corrent');
			displayError(name);
		}
	});
	$('form').submit(function(e) {
	  var len = $('label input').length;
	  for (var i = 0; i < len; i++)
	    if (!$($('label input')[i]).hasClass('corrent')) {
	      e.preventDefault();
	      alert("请提交正确信息！");
	      break;
	    }
	});
	$('#reset').click(function() {
	  $('.notice').text('');
	});
}
function displayError(name) {
	if (name === 'username') $('#namenotice').text('用户名6~18位英文字母、数字或下划线，必须以英文字母开头');
  	else if (name === 'studentid') $('#idnotice').text('学号8位数字，不能以0开头');
  	else if (name === 'phone') $('#phonenotice').text('电话11位数字，不能以0开头');
  	else if (name == "email") $('#emailnotice').text('邮箱不合法');
}
function clearError(name) {
	if (name === 'username') $('#namenotice').text('');
  	else if (name === 'studentid') $('#idnotice').text('');
  	else if (name === 'phone') $('#phonenotice').text('');
  	else if (name == "email") $('#emailnotice').text('');
}
function CheckValid(name, val) {
  regUserName = /^[a-zA-Z]\w{5,17}$/;
  regStudentId = /^[1-9]\d{7}$/;
  regPhone = /^[1-9]\d{10}$/;
  regEmail = /^[a-zA-Z_\-0-9]+@(([a-zA-Z_\-0-9])+\.)+[a-zA-Z]{2,4}$/;

  if (name === 'username') return regUserName.test(val);
  else if (name === 'studentid') return regStudentId.test(val);
  else if (name === 'phone') return regPhone.test(val);
  else return regEmail.test(val);
}
