calulator
�Ż�ǰ��72
�Ż���60

puzzle
�Ż�ǰ��261
�Ż���219



ʹ��jquery����ɶ��Ը��ã������������ʵ�ڲ���Ϥjquery������û���Ż������٣�Ҳ����ǰ������c���Ե��뷨�����Բ�֪����ô��



���ش��룿
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

��sort��վ
http://soj.sysu.edu.cn/courses.php
