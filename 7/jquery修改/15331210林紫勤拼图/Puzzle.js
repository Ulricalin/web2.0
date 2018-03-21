/*by ziqin lin on 2016.10*/

window.onload = function() {
    begin();
};

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

(function mypuzzlelist() {
    var puzzlelist = document.getElementsByClassName("puzzle");
    resetmypuzzlelist = function() {
        puzzlelist = document.getElementsByClassName("puzzle");
    };
    getmypuzzlelist = function() {return puzzlelist;};
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
function begin() {
    chooseDifficulty();
    seeThePicture();
    createpuzzle();
    setclick();
    startgame();
    choosepicture();
}
function seeThePicture() {
    document.getElementById("seePicture").onmousedown = function() {
        document.getElementById("gamepicture").className = getmypicture();
    };
    document.getElementById("seePicture").onmouseup = function() {
        document.getElementById("gamepicture").className = {};
    };
}
function choosepicture() {
    document.getElementById("picture").onclick = function() {
        addcount();
        if (gettime() != 0) outgame();
        removepre();
        createpuzzle();
        setclick();
        startgame();
    };
}
function chooseDifficulty() {
    document.getElementById("Difficulty").onclick = function() {
        changesize();
        if (gettime() != 0) outgame();
        removepre();
        createpuzzle();
        setclick();
        startgame();
    };
}
function removepre() {
    var myNode = document.getElementById("gamearea");
    var fc = myNode.firstChild;

    while( fc ) {
        myNode.removeChild( fc );
        fc = myNode.firstChild;
    }
}
function startgame() {
    document.getElementById("start").onclick = function() {
        if (gettime() != 0) outgame();
        start();
        timeon();
        Timeclick();
        disorder();
    };
}
function Timeclick() {
    showtime();
    timepass();
}

function createpuzzle() {
    var fragment = document.createDocumentFragment();
    var puzzle;
    for (var i = 1; i <= getmysize(); i++) {
        for (var j = 1; j <= getmysize(); j++) {
            puzzle = document.createElement('div');
            puzzle.className = "puzzle " + "puzzle" + getmysize() + " puzzle" + getmysize() +"r" + i + "c" + j + getmypicture();
            puzzle.id = "puzzle" + getmysize() + "r" + i + 'c' + j;
            fragment.appendChild(puzzle);
        }
    }
    puzzle.className += " blank";
    document.getElementById("gamearea").appendChild(fragment);
    resetmypuzzlelist();
}
function setclick() {
    var puzzlelist = getmypuzzlelist();
    for (var i = 0; i < puzzlelist.length; i++) {
        puzzlelist[i].onclick = function() {
            if (isstart()) {
                var blank = document.getElementsByClassName("blank");
                var br = parseInt(blank[0].className[23]);
                var bc = parseInt(blank[0].className[25]);
                var mr = parseInt(this.className[23]);
                var mc = parseInt(this.className[25]);
                if (bc == mc) {
                    if (mr-br == -1) {
                        mr = mr+1;
                        br = br-1;
                        addStep();
                    } else if (mr-br == 1) {
                        mr = mr-1;
                        br = br+1;
                        addStep();
                    }
                } else if (br == mr) {
                    if (mc-bc == -1) {
                        mc = mc+1;
                        bc = bc-1;
                        addStep();
                    } else if (mc-bc == 1) {
                        mc = mc-1;
                        bc = bc+1;
                        addStep();
                    }
                }
                this.className = "puzzle " + "puzzle" + getmysize() + " puzzle" + getmysize() +"r" + mr + "c" + mc + getmypicture();
                blank[0].className = "puzzle " + "puzzle" + getmysize() + " puzzle" + getmysize() +"r" + br + "c" + bc + getmypicture()+ " blank";
                if (finish()) end();
                showstep();
            }
        };
    }
}
function disorder() {
    var puzzle = new Array();
    var puzzletype = {
            create: function(x, y) {
                var puzzle = {};
                puzzle.r = x;
                puzzle.c = y;
                puzzle.move = function(otherpuzzle) {
                    puzzle.r = otherpuzzle.r;
                    puzzle.c = otherpuzzle.c;
                }
                return puzzle;
            }
    };
    for (var i = 1; i <= getmysize(); i++) {
        puzzle[i] = new Array();
    }
    for (var i = 1; i <= getmysize(); i++) {
        for (var j = 1; j <= getmysize(); j++) {
            puzzle[i][j] = puzzletype.create(i, j);
        }
    }
    var blank = puzzletype.create(getmysize(), getmysize());
    var random;
    for (var i = 0; i < 150; i++) {
        random = getRandom();
        if (random == 0) {
            if (blank.r < getmysize()) {
                puzzle[blank.r][blank.c].move(puzzle[blank.r+1][blank.c]);
                blank.r++;
            }
        } else if (random == 1) {
            if (blank.r > 1) {
                puzzle[blank.r][blank.c].move(puzzle[blank.r-1][blank.c]);
                blank.r--;
            }
        } else if (random == 2) {
            if (blank.c < getmysize()) {
                puzzle[blank.r][blank.c].move(puzzle[blank.r][blank.c+1]);
                blank.c++;
            }
        } else if (random == 3) {
            if (blank.c > 1) {
                puzzle[blank.r][blank.c].move(puzzle[blank.r][blank.c-1]);
                blank.c--;
            }
        }
    }
    puzzle[blank.r][blank.c].r = getmysize();
    puzzle[blank.r][blank.c].c = getmysize();
    var puzzlelist = getmypuzzlelist();
    var k = 0;
    for (var i = 1; i <= getmysize(); i++) {
        for (var j = 1; j <= getmysize(); j++) {
            puzzlelist[k].className = "puzzle " + "puzzle" + getmysize() + " puzzle" + getmysize() + "r" + i + "c" + j + getmypicture();
            puzzlelist[k].id = "puzzle" + getmysize() + "r" + puzzle[i][j].r + "c" + puzzle[i][j].c;
            k++;
        }
    }
    puzzlelist[(blank.r-1)*getmysize()+blank.c-1].className += " blank";
}
function getRandom() {
  return parseInt(Math.random() * 4);
}
function finish() {
    if (!isstart()) return false;
    var puzzlelist = getmypuzzlelist();
    var flag = true;
    for (var i = 0; i < puzzlelist.length; i++) {
        if (puzzlelist[i].className[23] != puzzlelist[i].id[8] || puzzlelist[i].className[25] != puzzlelist[i].id[10]) {
            flag = false;
            break;
        }
    }
    if (flag) return true;
    else return false;
}
function end() {
    timeout();
    document.getElementById("score_container").className = "visible";
}
document.getElementById("score_container").onclick = function() {
    this.className = "disvisible";
};
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