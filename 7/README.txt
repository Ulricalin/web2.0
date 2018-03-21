calulator
优化前：72
优化后：60

puzzle
优化前：261
优化后：219



使用jquery代码可读性更好，不过由于如今实在不熟悉jquery，还是没有优化到多少，也有以前都是用c语言的想法，所以不知道怎么改



神秘代码？
$('thead th').click(tableSorter);

	function tableSorter() {
		getTable(this);
		if ($(this).hasClass('ascend')) {
			descend(this);
		} else {
			Ascend(this);
		}
	}

	var table_array = [];

	function Ascend(that) {
		$(that).removeClass('descend').addClass('ascend');
		$(that).siblings().removeClass('descend').removeClass('ascend');
		ascendSort($(that).index());
		display(that);
	}

	function descend(that) {
		$(that).removeClass('ascend').addClass('descend');
		$(that).siblings().removeClass('descend').removeClass('ascend');
		descendSort($(that).index());
		display(that);
	}

	function getTable(that) {
		var table = $(that).parents('table').children('tbody').children('tr');
		var inn = [];
		for (var i = 0; i < table.length; i++) {
			var length = table.eq(i).children().length, temp = [];
    		for (var j = 0; j < length; j++) temp[j] = table[i].children[j].innerHTML;
				table_array[i] = temp;
		}
	}

	function ascendSort(index) {
		table_array.sort(function(a,b) {
			if (isNaN(a) || isNaN(b)) {
				return a[index].localeCompare(b[index]); 
			} else {
				return a[index] - b[index];
			}
		});
	}

	function descendSort(index) {
		table_array.sort(function(a,b) {
			if (isNaN(a) || isNaN(b)) {
				return b[index].localeCompare(a[index]); 
			} else {
				return b[index] - a[index];
			}
		});
	}

	function display(that) {
	  var table = $(that).parents("table").children("tbody").children("tr");
	  var len = table.length;
	  for (var i = 0; i < len; i++) {
	    var length = table.eq(i).children().length;
	    for (var j = 0; j < length; j++) table[i].children[j].innerHTML = table_array[i][j];
	  }
	}

可sort网站
http://soj.sysu.edu.cn/courses.php
