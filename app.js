function solveSudoku(gameArr) {
    var emptySpot = nextEmptySpot(gameArr);
    var r = emptySpot[0];
    var c = emptySpot[1];

    // if no vacant spot is left, board is solved
    if (r === -1) {
        return gameArr;
    };

    var possArr = possiblities(r, c, gameArr);

    for (var k = 0; k < possArr.length && nextEmptySpot(gameArr)[0] !== -1; k++) {
        gameArr[r][c] = possArr[k];
        solveSudoku(gameArr);
    }

    // if no possible value leads to a solution reset this value
    if (nextEmptySpot(gameArr)[0] !== -1) gameArr[r][c] = 0;

    return gameArr;
}

function nextEmptySpot(gameArr) {
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (gameArr[i][j] === 0) return [i, j];
        }
    }
    return [-1, -1];
}

function possiblities(r, c, gameArr) {
    var possArr = [];
    var row = [];
    var col = [];
    var quad = [];
    var k = 0;
    var l = 0;
    if (r <= 2) k = 0; else if (r <= 5) k = 3; else k = 6;
    if (c <= 2) l = 0; else if (c <= 5) l = 3; else l = 6;

    for (var i = 0; i < 9; i++) {
        row.push(gameArr[i][c]);
    }
    for (var j = 0; j < 9; j++) {
        col.push(gameArr[r][j]);
    }
    for (var i = k; i < k + 3; i++) {
        for (var j = l; j < l + 3; j++) {
            quad.push(gameArr[i][j]);
        }
    }

    for (var n = 1; n < 10; n++) {
        if (row.indexOf(n) === -1 && col.indexOf(n) === -1 && quad.indexOf(n) === -1) {
            possArr.push(n);
        }
    }
    return possArr;
}
function checkQuadrant(r, c, gameArr) {
    var qudarantArr = [];
    for (var i = r; i < r + 3; i++) {
        for (var j = c; j < c + 3; j++) {
            if (qudarantArr.indexOf(gameArr[i][j]) === -1 || gameArr[i][j] === 0) {
                qudarantArr.push(gameArr[i][j]);
            } else {
                return false;
            }
        }
    }
    return true;
}
function isValidSudoku(gameArr) {
    if (!checkQuadrant(0, 0, gameArr)) return false;
    if (!checkQuadrant(0, 3, gameArr)) return false;
    if (!checkQuadrant(0, 6, gameArr)) return false;

    if (!checkQuadrant(3, 0, gameArr)) return false;
    if (!checkQuadrant(3, 3, gameArr)) return false;
    if (!checkQuadrant(3, 6, gameArr)) return false;

    if (!checkQuadrant(6, 0, gameArr)) return false;
    if (!checkQuadrant(6, 3, gameArr)) return false;
    if (!checkQuadrant(6, 6, gameArr)) return false;

    for (var i = 0; i < gameArr.length; i++) {
        var rowNumbers = [];
        for (var j = 0; j < gameArr.length; j++) {
            if (rowNumbers.indexOf(gameArr[i][j]) === -1 || gameArr[i][j] === 0) {
                rowNumbers.push(gameArr[i][j]);
            } else {
                return false;
            }
        }
    }

    for (var i = 0; i < gameArr.length; i++) {
        var colNumbers = [];
        for (var j = 0; j < gameArr.length; j++) {
            if (colNumbers.indexOf(gameArr[j][i]) === -1 || gameArr[j][i] === 0) {
                colNumbers.push(gameArr[j][i]);
            } else {
                return false;
            }
        }
    }
    return true;
}

function shuffleArray(gameArr) {
    // Swap each element with another randomly selected one.
    if(gameArr){
    for (var i = 0; i < gameArr.length; i++) {
    var j = i;

    while (j === i) {
        j = Math.floor(Math.random() * gameArr.length);
    }

    var contents = gameArr[i];
    gameArr[i] = gameArr[j];
    gameArr[j] = contents;
    }
    }
    if(!isValidSudoku(gameArr)){
        shuffleArray(gameArr)
    }
}
//---------------------------------------------------Test-----------------------------------------------------------------

    var gameArr = [
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0]
    ]

    function CreateTable(){
        count = 0;
        shuffleArray(gameArr)

    var str = "<table  border='1' >";
    for(var i = 0; i < gameArr.length; i++){
        str+='<tr>'
        for(var j = 0; j < gameArr[i].length; j++){
            if(gameArr[i][j]%2 === 0){
            str=str+"<td>" + gameArr[i][j] + "</td>";
            }
            else {
                count++
                str = str+'<td>' + '' + '</td>';
        }
        }
        str+='</tr>'
    }
    str+="</table>";
    console.log(count)
    document.getElementById("TableHolder").innerHTML = str;
    }




solveSudoku(gameArr);
shuffleArray(gameArr)


console.log('Solved');
console.log(gameArr);
console.log(isValidSudoku(gameArr));
//----------------------------------------------------------------------
// const PUZZLE_SIZE = 9;

// var initRow = function (puzzle) {
//     var row = [];
//     for (var i = 0; i < PUZZLE_SIZE; ++i) {
//         row[i] = 0;
//         for (var j = 0; j < PUZZLE_SIZE; ++j) {
//             row[i] |= 1 << puzzle[i][j];
//         }
//     }
//     return row;
// };

// var initCol = function (puzzle) {
//     var col = [];
//     for (var i = 0; i < PUZZLE_SIZE; ++i) {
//         col[i] = 0;
//         for (var j = 0; j < PUZZLE_SIZE; ++j) {
//             col[i] |= 1 << puzzle[j][i];
//         }
//     }
//     return col;
// };

// var getCirclePosition = function (x, y) {
//     return Math.floor(x / 3) * 3 + Math.floor(y / 3);
// };

// var initCir = function (puzzle) {
//     var cir = [];
//     for (var k = 0; k < PUZZLE_SIZE; ++k) {
//         cir[k] = 0;
//     }
//     for (var i = 0; i < PUZZLE_SIZE; ++i) {
//         for (var j = 0; j < PUZZLE_SIZE; ++j) {
//             cir[getCirclePosition(i, j)] |= 1 << puzzle[i][j];
//         }
//     }
//     return cir;
// };

// var initComparion = function (puzzle) {
//     return {
//         row: initRow(puzzle),
//         col: initCol(puzzle),
//         cir: initCir(puzzle)
//     };
// };

// var isValid = function (comparion, x, y, digital) {
//     return !((comparion.row[x] & 1 << digital) ||
//     (comparion.col[y] & 1 << digital) ||
//     (comparion.cir[getCirclePosition(x, y)] & 1 << digital));
// };

// var fillUp = function (puzzle, x, y, digital, comparion) {
//     puzzle[x][y] = digital;
//     comparion.row[x] |= 1 << digital;
//     comparion.col[y] |= 1 << digital;
//     comparion.cir[getCirclePosition(x, y)] |= 1 << digital;
// };

// var clear = function (puzzle, x, y, digital, comparion) {
//     puzzle[x][y] = 0;
//     comparion.row[x] ^= 1 << digital;
//     comparion.col[y] ^= 1 << digital;
//     comparion.cir[getCirclePosition(x, y)] ^= 1 << digital;
// };

// var dfsSudoku = function (puzzle, comparion) {
//     for (var i = 0; i < PUZZLE_SIZE; ++i) {
//         for (var j = 0; j < PUZZLE_SIZE; ++j) {
//             if (!puzzle[i][j]) {
//                 for (var k = 1; k < 10; ++k) {
//                     if (isValid(comparion, i, j, k)) {
//                         fillUp(puzzle, i, j, k, comparion);
//                         if (dfsSudoku(puzzle, comparion)) {
//                             return true;
//                         }
//                         clear(puzzle, i, j, k, comparion);
//                     }
//                 }
//                 return false;
//             }
//         }
//     }
//     return true;
// };

// function sudoku(puzzle) {
//     var comparion = initComparion(puzzle);
//     dfsSudoku(puzzle, comparion);
//     console.log(puzzle)
//     return puzzle;
// }