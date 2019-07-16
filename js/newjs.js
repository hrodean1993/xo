var _cellIdList = [];
var _isX = true;
var _winName = "";
var _isWin = false;
var _matrix = [
    [-1, -1, -1],
    [-1, -1, -1],
    [-1, -1, -1]
];

function main(elmnt) {
    var id = elmnt.id;
    if (_cellIdList.indexOf(id) == -1 && !_isWin)
    {

        var div = document.getElementById(id);
        var prefix;
        var newIdObj = getIdPosition(id);
        if (_isX) {
            prefix = "X";
            //console.log(Number(newIdObj.x));
            _matrix[Number(newIdObj.x)][Number(newIdObj.y)] = 2;
        } else
        {
            prefix = "Y";
            //console.log(+(newIdObj.y));
            _matrix[Number(newIdObj.x)][Number(newIdObj.y)] = 1;
        }
        var imgName = "img_" + prefix;
        _isX = !_isX;
        div.innerHTML = "<img class='img_style' src='images/" + imgName + ".png'/>";
        var isWin = checkWin();
        if (isWin) {
            gameResult(_winName);
        } else {
            drawCheck();
        }
        _cellIdList.push(id);
    }
}

function getIdPosition(divId) {
    var arr = divId.split('_');
    return {x: arr[1], y: arr[2]};
}

function checkWin() {
    var horizontalWin = false;
    var verticalWin = false;
    var leftDiagonalWin = false;
    var rightDiagonalWin = false;
    for (var i = 0; i < 3; i++) {
        horizontalWin = horizontalCheck(i);
        verticalWin = verticalCheck(i);
        leftDiagonalWin = leftDiagonalCheck();
        rightDiagonalWin = rightDiagonalCheck();

        if (horizontalWin > 0) {
            _isWin = true;
            _winName = horizontalWin == 1 ? "Win O" : "Win X";
            break;
        } else if (verticalWin > 0) {
            _isWin = true;
            _winName = verticalWin == 1 ? "Win O" : "Win X";
            break;
        } else if (leftDiagonalWin > 0) {
            _isWin = true;
            _winName = leftDiagonalWin == 1 ? "Win O" : "Win X";
            break;
        } else if (rightDiagonalWin > 0) {
            _isWin = true;
            _winName = rightDiagonalWin == 1 ? "Win O" : "Win X";
            break;
        }
    }
    return horizontalWin > 0 || verticalWin > 0 || leftDiagonalWin > 0 || rightDiagonalWin > 0;
}

function horizontalCheck(column) {
    var horCheck = false;
    for (var i = 0; i < 3; i++) {
        var elmnt = _matrix[column][i];
        if (elmnt == -1) {
            return -1;
        }
        if (i != 0) {
            if (elmnt == _matrix[column][i - 1]) {
                horCheck = true;
            } else {
                horCheck = false;
                break;
            }
        }
    }
    if (horCheck) {
        return _matrix[column][0];
    } else {
        return -1;
    }
}

function verticalCheck(row) {
    var verCheck = false;
    for (var i = 0; i < 3; i++) {
        var elmnt = _matrix[i][row];
        if (elmnt == -1) {
            return -1;
        }
        if (i != 0) {
            if (elmnt == _matrix[i - 1][row]) {
                verCheck = true;
            } else {
                verCheck = false;
                break;
            }
        }
    }
    if (verCheck) {
        return _matrix[0][row];
    } else {
        return -1;
    }
}

function leftDiagonalCheck() {
    var diCheck = false;
    for (var i = 0; i < 3; i++)
    {
        var elmnt = _matrix[i][i];
        if (elmnt == -1) {
            return -1;
        }
        if (i != 0) {
            if (elmnt == _matrix[i - 1][i - 1]) {
                diCheck = true;
            } else {
                diCheck = false;
                break;
            }
        }
    }
    if (diCheck) {
        return _matrix[1][1];
    } else {
        return -1;
    }
}

function rightDiagonalCheck() {
    var diCheck = false;
    for (var i = 0; i < 3; i++)
    {
        var elmnt = _matrix[i][2 - i];
        if (elmnt == -1) {
            return -1;
        }
        if (i != 0) {
            if (elmnt == _matrix[i - 1][2 - i + 1]) {
                diCheck = true;
            } else {
                diCheck = false;
                break;
            }
        }
    }
    if (diCheck) {
        return _matrix[1][1];
    } else {
        return -1;
    }
}

function drawCheck() {
    var isMatrixValid = true;
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            if (_matrix[i][j] < 0) {
                isMatrixValid = false;
            }
        }
    }
    if (isMatrixValid) {
        gameResult("Game draw");
    }
}

function gameResult(result) {
    document.getElementById("result").style.display = "block";
    var winText = document.createElement("H1");
    var textnode = document.createTextNode(result);
    winText.appendChild(textnode);
    document.getElementById("result").appendChild(winText);
    gameEnd();
}

function resetGame(){
    gameEnd();
    _isWin = false;
    var resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "";
    resultDiv.style.display = "none";
    var cells = document.getElementsByClassName("cell");
    for(var i=0; i<cells.length; i++){
        cells[i].innerHTML = "";
    }
}

function gameEnd() {
    _cellIdList.length = 0;
    _cellIdList = [];
    _isX = true;
    _matrix = [
    [-1, -1, -1],
    [-1, -1, -1],
    [-1, -1, -1]
    ];
    _winName = "";
}
