(function(){
	$(function() {new Pane();})

	function Pane() {
		this.createTiles();
		this.listenTilesClicks();
		this.listenButtonsClicks();
	}

	var p = Pane.prototype;

	(function mypicture() {
	    var count = 0;
	    var picture = [' panda', ' Mona_Lisa', ' sidai', ' kaka', ' yinhun'];
	    addcount = function() {count = (count+1)%5;};
	    getmypicture = function() {return picture[count];};
	})();

	(function mysize() {
	    var size = 4;
	    changesize = function() {size = size%2+3;};
	    getmysize = function() {return size;};
	})();

	(function is_start() {
	    var flag = false;
	    isstart = function () {
	        return flag;
	    };
	    start = function () {
	        flag = true;
	    };
	    quit_from_start = function() {flag = false;}
	})();

	(function my_clock() {
	    var time = 0;
	    var myclock;
	    timeon = function() {myclock = setInterval(Timeclick, 1000);};
	    timeout = function() {clearInterval(myclock);time = 0;};
	    timepass = function() {time++;};
	    gettime = function() {return time;};
	})();
	(function my_step() {
	    var step = 0;
	    resetStep = function() {step = 0;}
	    addStep = function() {step++;}
	    getmystep = function() {return step;}
	})();

	p.createTiles = function() {
		var that = this;
		this.tiles = [];
		var fragment = document.createDocumentFragment();
		var puzzle;
		var size = getmysize();
		for (var i = 0; i < size*size-1; i++) {
				puzzle = document.createElement('div');
				puzzle.className = "puzzle " + "puzzle" + size + getmypicture();
	      		fragment.appendChild(puzzle);
	      		this.tiles.push(new Tile(puzzle, i));
		}
		this.blank = (new Tile(null, size*size-1));
		this.tiles.push(this.blank);
    	document.getElementById("gamearea").appendChild(fragment);
	}


	p.listenTilesClicks = function() {
		$('#gamearea').click(function(event) {
			var tile = event.target._tile;
			if (tile && tile.canMove(this.blank)) {
				tile.move(this.blank);
				if (!this.onTest()) {
					addStep();
					showstep();
					this.checkResult();
				}
			}
		}.bind(this));
	}

	p.checkResult = function() {
		if (this.finish()) this.end();
	}

	p.finish = function() {
		for (var i = 0; i < this.tiles.length; i++) {
			if (!this.tiles[i].isInRightPlace()) return false;
		}
		return true;
	}


	p.end = function() {
		timeout();
    	$("#score_container").removeClass("disvisible").addClass("visible");
	}

	p.listenButtonsClicks = function() {
		$("#seePicture").mousedown(function() {
	       $("#gamepicture").addClass(getmypicture());
	    });
	    $("#seePicture").mouseup(function() {
	        $("#gamepicture").removeClass(getmypicture());
	    });
	    $("#picture").click(function() {
	    	$('#gamearea div').removeClass(getmypicture());
	        addcount();
	        $('#gamearea div').addClass(getmypicture());
	        if (gettime() != 0) outgame();
	    });
	    $("#start").click(function() {
	        if (gettime() != 0) outgame();
	        start();
	        timeon();
	        Timeclick();
	        resetStep();
	        this.disorder();
	    }.bind(this));
	    $("#score_container").click(function() {
		    this.className = "disvisible";
		});
	    $("#Difficulty").click(function() {
	        changesize();
	        if (gettime() != 0) outgame();
	        removepre();
	        new Pane();
	    }.bind(this));
	}
	function removepre() {
	    var myNode = document.getElementById("gamearea");
	    var fc = myNode.firstChild;

	    while( fc ) {
	        myNode.removeChild( fc );
	        fc = myNode.firstChild;
	    }
	}
	p.onTest = function() {
		return this.suffer;
	}

	p.disorder = function() {
		this.suffer = true;
		var size = getmysize()*getmysize();
		for (var i = 0; i < 1500; i++) {
			$(this.tiles[Math.floor(Math.random()*size)].dom).click();
		}
		this.suffer = false;
	}

	var Tile = function(dom, seq) {
		this.dom = dom;
		this.seq = seq;
		this.setPosition();
		if (dom) {
			this.dom._tile = this;
		}
		this.setBackground();
		this.updatePlace();
	}

	var p = Tile.prototype;
	p.setBackground = function() {
		if (getmysize() == 3) {
			this.height = this.width = 115;
		} else if (getmysize() == 4) {
			this.height = this.width = 87;
		}
		var top = this.row*this.height;
		var left = this.column*this.width;
		$(this.dom).css('background-position', -left + 'px ' + -top + 'px');
	}
	p.setPosition = function() {
		this.row = Math.floor(this.seq/getmysize());
		this.column = this.seq % getmysize();
	}
	p.updatePlace = function() {
		$(this.dom).css('left', this.column*this.width);
		$(this.dom).css('top', this.row*this.height);
	}
	p.canMove = function(blank) {
		return (this.row == blank.row && Math.abs(this.column - blank.column) == 1) || 
				(this.column == blank.column && Math.abs(this.row - blank.row) == 1);

	}
	p.move = function(blank) {
		this.swapAttr(blank, 'row');
		this.swapAttr(blank, 'column');
		this.updatePlace();
		blank.updatePlace();
	}
	p.swapAttr= function(other, attr) {
		var temp = other[attr];
		other[attr] = this[attr];
		this[attr] = temp;
	}
	function showtime() {
	    document.getElementById("output_time").value = gettime();
	}
	function outgame() {
	    resetStep();
	    timeout();
	    showtime();
	    showstep();
	    quit_from_start();
	}
	function showstep() {
	    document.getElementById("Step").value = getmystep();
	}
	p.isInRightPlace = function() {
		return this.seq == this.row*getmysize()+this.column;
	}
	function Timeclick() {
	    showtime();
	    timepass();
	}
})();