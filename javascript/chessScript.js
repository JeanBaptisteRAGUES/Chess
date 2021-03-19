var chessboard = new Image();
chessboard.src = './ChessImages/chessboard2.png';
/*
var bishopBlack = new Image();
var bishopWhite = new Image();
var kingBlack = new Image();
var kingWhite = new Image();
var knightBlack = new Image();
var knightWhite = new Image();
var pawnBlack = new Image();
var pawnWhite = new Image();
var queenBlack = new Image();
var queenWhite = new Image();
var rookBlack = new Image();
var rookWhite = new Image();
bishopBlack.src = './ChessImages/chessBishopBlack.png';
bishopWhite.src = './ChessImages/chessBishopWhite.png';
kingBlack.src = './ChessImages/chessKingBlack.png';
kingWhite.src = './ChessImages/chessKingWhite.png';
knightBlack.src = './ChessImages/chessKnightBlack.png';
knightWhite.src = './ChessImages/chessKnightWhite.png';
pawnBlack.src = './ChessImages/chessPawnBlack.png';
pawnWhite.src = './ChessImages/chessPawnWhite.png';
queenBlack.src = './ChessImages/chessQueenBlack.png';
queenWhite.src = './ChessImages/chessQueenWhite.png';
rookBlack.src = './ChessImages/chessRookBlack.png';
rookWhite.src = './ChessImages/chessRookWhite.png';
*/
blackPiecesSRC = ['./ChessImages/chessPawnBlack.png', './ChessImages/chessRookBlack.png',
 './ChessImages/chessKnightBlack.png', './ChessImages/chessBishopBlack.png',
 './ChessImages/chessQueenBlack.png', './ChessImages/chessKingBlack.png'];

whitePiecesSRC = ['./ChessImages/chessPawnWhite.png', './ChessImages/chessRookWhite.png',
'./ChessImages/chessKnightWhite.png', './ChessImages/chessBishopWhite.png',
'./ChessImages/chessQueenWhite.png', './ChessImages/chessKingWhite.png'];
/*
var pieceGrid = new Array(64);
var intGrid = new Array(64);
var valueGrid = new Array(64);
*/
var cases = new Array(64);
var blackPieces = new Array(16);
var whitePieces = new Array(16);

var pieceInHand = null;
var moveCases = [];
var destinationCase = null;
var playerTeam = 1;
var computerTeam = 2;
var playingTeam = 1;
var playerVsComputer = true;
var difficulty = 1;
var mode = 1;
var computerElo;

canevas = document.getElementById('canvas');
ctx = canevas.getContext('2d');
canevas.width = 600;
canevas.height = 600;

//Test
var nbIter = 0;

var bestMoves = new Array();

/*
chessboard.onload = function() {
  var param = this;
  loadBoard();
  setTimeout(function(){printBoard(param)}, 1000);
};
*/

function setComputerElo(difficulty){
    console.log("difficulty : " + difficulty);
    switch (difficulty) {
        case "0":
            console.log("case 0");
            computerElo = document.getElementById("elo").value;
            //console.log("computerElo : " + document.getElementById("elo").value);
            break;
        case "1":
            console.log("case 1");
            computerElo = 250;
            break;
        case "2":
            console.log("case 2");
            computerElo = 600;
            break;
        case "4":
            console.log("case 4");
            computerElo = 1000;
            break;
    }
    console.log("computerElo : " + computerElo);
}

function loadParameters(){
    playerVsComputer = document.getElementById("mode").value == 2;
    difficulty = document.getElementById("difficulty").value;
    var team = document.getElementById("color").value;
    setComputerElo(difficulty);
    

    if(team == 1){
        playerTeam = 1;
        computerTeam = 2;
    }else{
        playerTeam = 2;
        computerTeam = 1;
    }

    var menuChess = document.getElementById("menuChess");
    menuChess.style.display = "none";
}

function loadBoard(){
    //playingTeam = 2;
    loadParameters();

    var basicConfig =   [22,23,24,25,26,24,23,22,
                         21,21,21,21,21,21,21,21,
                         0,0,0,0,0,0,0,0,
                         0,0,0,0,0,0,0,0,
                         0,0,0,0,0,0,0,0,
                         0,0,0,0,0,0,0,0,
                         11,11,11,11,11,11,11,11,
                         12,13,14,15,16,14,13,12];

    var whitePromoteConfig =   [0,0,0,0,0,0,0,0,
                                11,11,11,11,11,11,11,11,
                                0,0,0,0,0,0,0,0,
                                0,0,0,0,0,0,0,0,
                                0,0,0,26,0,0,0,0,
                                0,0,0,0,0,0,0,0,
                                0,0,0,0,0,0,0,0,
                                0,0,0,0,16,0,0,0];

    var blackPromoteCongig =   [0,0,0,0,26,0,0,0,
                                0,0,0,0,0,0,0,0,
                                0,0,0,0,0,0,0,0,
                                0,0,0,0,16,0,0,0,
                                0,0,0,0,0,0,0,0,
                                0,0,0,0,0,0,0,0,
                                21,21,21,21,21,21,21,21,
                                0,0,0,0,0,0,0,0];

    var testCheckmateWhite =   [0,0,0,0,0,0,0,0,
                                0,0,0,0,0,0,0,0,
                                0,0,0,0,26,0,0,0,
                                0,12,0,0,0,0,0,0,
                                0,0,12,0,0,0,0,0,
                                0,0,0,0,0,0,0,0,
                                0,0,0,0,0,0,0,0,
                                0,0,0,0,16,0,0,0];

    var testCheckmateBlack =   [0,0,0,0,0,0,0,0,
                                0,0,0,0,0,0,0,0,
                                0,0,0,0,16,0,0,0,
                                0,22,0,0,0,0,0,0,
                                0,0,22,0,0,0,0,0,
                                0,0,0,0,0,0,0,0,
                                0,0,0,0,0,0,0,0,
                                0,0,0,0,26,0,0,0];

    var testWrongCheckmate =   [22,0,24,0,26,24,23,22,
                                21,21,21,0,0,21,21,21,
                                0,0,23,0,0,0,0,0,
                                0,0,0,25,0,0,0,0,
                                0,0,0,21,0,0,0,14,
                                0,0,0,0,0,0,0,0,
                                11,11,11,0,0,11,11,11,
                                12,13,0,15,16,14,13,12];

    var testFinale =   [0,0,0,0,0,0,0,0,
                        0,0,12,0,0,0,0,0,
                        0,0,11,22,0,0,0,0,
                        0,0,0,0,0,0,0,0,
                        0,0,0,16,0,26,0,21,
                        0,0,0,11,0,0,0,0,
                        0,0,0,0,0,0,0,0,
                        0,0,0,0,0,0,0,0];

    var pieces = basicConfig;

    var piecesNames = ['pawn', 'rook', 'knight', 'bishop', 'queen', 'king'];
    var picesColors = ['white', 'black'];

    iBlack = 0;
    iWhite = 0;
    for(let i = 0; i < 64; ++i)
    {
        cases[i] = new Case(i);
        if(pieces[i] != 0){
            pieceName = picesColors[Math.floor(pieces[i]/10) - 1] + " " + piecesNames[pieces[i]%10 - 1];
            if(Math.floor(pieces[i]/10) == 1){
                //mySRC = whitePiecesSRC[pieces[i]%10 - 1];
                //console.log(mySRC);
                whitePieces[iWhite] = new Piece(pieceName, pieces[i]%10, 1, i, cases[i]);
                whitePieces[iWhite].setValue();
                cases[i].addPiece(whitePieces[iWhite]);
                iWhite++;
            }else{
                //mySRC = blackPiecesSRC[pieces[i]%10 - 1];
                //console.log(mySRC);
                blackPieces[iBlack] = new Piece(pieceName, pieces[i]%10, 2, i, cases[i]);
                blackPieces[iBlack].setValue();
                cases[i].addPiece(blackPieces[iBlack]);
                iBlack++;
            }
        }
    }
    //alert("playingTeam : " + playingTeam +  " | playerTeam : " + playerTeam);
    canevas.addEventListener("click", function(event){detectCollision(event, this)});
    setTimeout(function(){printBoard()}, 1000);
    if(playerVsComputer && playingTeam == computerTeam) setTimeout(function(){computerPlay()}, 2000);
}

function printBoard() {
    console.log("printBoard()");
    ctx.drawImage(this.chessboard, 0, 0, this.chessboard.width, this.chessboard.height, 0, 0, this.canevas.width, this.canevas.height);
    this.chessboard.style.display = 'none';
    
    for(let i = 63; i >= 0; --i){
        cases[i].displayCase();
        if(cases[i].getAttachedPiece() != null){
            cases[i].getAttachedPiece().displayPiece();
            
        }
    }
}

function checkPieceSelectedValidity(piece){
    let isValid = false;
    if(playerTurn){
        if(piece.getTeam() == playerTeam){
            isValid = true;
        }
    }

    return isValid;
}

function calculateDistance(startCase, endCase){
    startCaseLig = Math.floor(startCase/8);
    startCaseCol = startCase%8;
    endCaseLig = Math.floor(endCase/8);
    endCaseCol = endCase%8;

    return (Math.abs(startCaseLig - endCaseLig) + Math.abs(startCaseCol - endCaseCol));
}

function setCasesSpecialVisibility(piece, cases){
    moveCases = piece.getAttackRange(cases);

    for(let i = 0; i < moveCases.length; ++i){
        cases[moveCases[i]].setDisplaySpecial(true);
    }
}

function clearCases(){
    cases.forEach(function(myCase){
        myCase.setDisplaySpecial(false);
    });
}

function canMoveTo(piece, destination){
    if(piece != null){
        var mCases = piece.getAttackRange(cases);
        return mCases.includes(destination);
    }else{
        return false;
    }
}

function findNextPlayer(team){
    if(team == 1){
        return 2;
    }else{
        return 1;
    }
}

function switchPlayer(){
    playingTeam = findNextPlayer(playingTeam);
    if(playerVsComputer){
        if(playingTeam == computerTeam) computerPlay();
    }
}

function moveTo(piece, destination, change){
    piece.move(cases[destination], cases);
    moveCases = [];
    clearCases();
    printBoard();
    if(testCheckmate(playingTeam)){
        loadBoard();
        printBoard();
    }else{
        testCheck(playingTeam);
        if(change) switchPlayer();
    }
}

function virtualMoveTo(piece, destination){
    piece.virtualMove(cases[destination], cases);
}

function getGlobalThreat(opPieces, cases){
    var attackCases = [];
    opPieces.forEach(function(piece){
        if(!piece.isDead()){
            var subAttackCases = piece.getAttackRange(cases);
            attackCases.push(...subAttackCases);
        }
    });
    return [...new Set(attackCases)];
}

function canCastleQueenside(allyPieces, opPieces, cases){
    var canCastle = false;
    var king = allyPieces.find(piece => piece.getType() == 6);
    if(!king.hasMoved()){
        if(king.getTeam() == 1){
            var rook = allyPieces.find(piece => (piece.getType() == 2 && piece.getIndex() == 56)); 

            if(rook != null){
                canCastle = !rook.hasMoved();
                canCastle = canCastle && cases[57].isEmpty() && cases[58].isEmpty() && cases[59].isEmpty();

                var globalThreat = getGlobalThreat(opPieces, cases);
                canCastle = canCastle && !globalThreat.includes(58) && !globalThreat.includes(59) && !globalThreat.includes(60);
            }
        }else{
            var rook = allyPieces.find(piece => (piece.getType() == 2 && piece.getIndex() == 0)); 

            if(rook != null){
                canCastle = !rook.hasMoved();
                canCastle = canCastle && cases[1].isEmpty() && cases[2].isEmpty() && cases[3].isEmpty();

                var globalThreat = getGlobalThreat(opPieces, cases);
                canCastle = canCastle && !globalThreat.includes(2) && !globalThreat.includes(3) && !globalThreat.includes(4);
            }
        }
    }

    return canCastle;
}

function canCastleKingside(allyPieces, opPieces, cases){
    var canCastle = false;
    var king = allyPieces.find(piece => piece.getType() == 6);
    if(!king.hasMoved()){
        if(king.getTeam() == 1){
            var rook = allyPieces.find(piece => (piece.getType() == 2 && piece.getIndex() == 63)); 

            if(rook != null){
                canCastle = !rook.hasMoved();
                canCastle = canCastle && cases[61].isEmpty() && cases[62].isEmpty();

                var globalThreat = getGlobalThreat(opPieces, cases);
                canCastle = canCastle && !globalThreat.includes(60) && !globalThreat.includes(61) && !globalThreat.includes(62);
            }
        }else{
            var rook = allyPieces.find(piece => (piece.getType() == 2 && piece.getIndex() == 7)); 

            if(rook != null){
                canCastle = !rook.hasMoved();
                canCastle = canCastle && cases[5].isEmpty() && cases[6].isEmpty();

                var globalThreat = getGlobalThreat(opPieces, cases);
                canCastle = canCastle && !globalThreat.includes(4) && !globalThreat.includes(5) && !globalThreat.includes(6);
            }
        }
    }

    return canCastle;
}

function castleKingside(king){
    if(king.getTeam() == 1){
        var rook = whitePieces.find(piece => (piece.getType() == 2 && piece.getIndex() == 63));
        moveTo(king, 62, false);
        moveTo(rook, 61, true);
    }else{
        var rook = blackPieces.find(piece => (piece.getType() == 2 && piece.getIndex() == 7));
        moveTo(king, 6, false);
        moveTo(rook, 5, true);
    }
}

function castleQueenside(king){
    if(king.getTeam() == 1){
        var rook = whitePieces.find(piece => (piece.getType() == 2 && piece.getIndex() == 56));
        moveTo(king, 58, false);
        moveTo(rook, 59, true);
    }else{
        var rook = blackPieces.find(piece => (piece.getType() == 2 && piece.getIndex() == 0));
        moveTo(king, 2, false);
        moveTo(rook, 3, true);
    }
}

function canSpecialMoveTo(piece, destination, cases){
    var canSpecialMove = false;
    if(piece.getType() == 6){
        if(piece.getTeam() == 1){
            if(destination == 58){
                canSpecialMove = canCastleQueenside(whitePieces, blackPieces, cases);
                console.log("canCastleQueenside : " + canSpecialMove);
            }else{
                if(destination == 62){
                    canSpecialMove = canCastleKingside(whitePieces, blackPieces, cases);
                    console.log("canCastleKingside : " + canSpecialMove);
                }
            }
        }else{
            if(destination == 2){
                canSpecialMove = canCastleQueenside(blackPieces, whitePieces, cases);
                console.log("canCastleQueenside : " + canSpecialMove);
            }else{
                if(destination == 6){
                    canSpecialMove = canCastleKingside(blackPieces, whitePieces, cases);
                    console.log("canCastleKingside : " + canSpecialMove);
                }
            }
        }
    }

    return canSpecialMove;
}

function specialMoveTo(piece, destination, cases){
    if(piece.getType() == 6){
        if(piece.getTeam() == 1){
            if(destination == 58){
                castleQueenside(piece);
            }else{
                if(destination == 62){
                    castleKingside(piece);
                }
            }
        }else{
            if(destination == 2){
                castleQueenside(piece);
            }else{
                if(destination == 6){
                    castleKingside(piece);
                }
            }
        }
    }
    if(testCheckmate()){
        loadBoard();
        printBoard();
    }
}

function testCheck(team){
    var king;
    var threat;
    var check = false;

    if(team == 1){
        king = whitePieces.find(piece => piece.getType() == 6);
        threat = getGlobalThreat(blackPieces, cases);

        check = threat.includes(king.getIndex());

        if(check){
            cases[king.getIndex()].setDisplaySpecial(true);
        }
    }else{
        king = blackPieces.find(piece => piece.getType() == 6);
        threat = getGlobalThreat(whitePieces, cases);

        check = threat.includes(king.getIndex());

        if(check){
            cases[king.getIndex()].setDisplaySpecial(true);
        }
    }
    return check;
}

function testCheckmate(testTeam){
    var checkmate = calculateCheckmate(0, findNextPlayer(testTeam)); 
    if(Math.abs(checkmate) >= 10){
        if(testTeam == 1){
            alert("Victoire des blancs !");
        }else{
            alert("Victoire des noirs !");
        }
    }

    console.log("checkmate : " + checkmate);
    return checkmate >= 10;
}

function randInt(max){
    return Math.floor(Math.random() * Math.floor(max));
}

function computerRandomPlay(computerPieces){
    var playablePieces = [];
    var playableMoves = [];

    computerPieces.forEach(function(piece){
        if(!piece.isDead()){
            if(piece.getAttackRange(cases).length > 0){
                playablePieces.push(piece);
            }
        }
    });

    if(playablePieces.length > 0){
        var myRand = randInt(playablePieces.length);
        var randPiece = playablePieces[myRand];
        playableMoves.push(...randPiece.getAttackRange(cases));
        myRand = randInt(playableMoves.length);
        var randDestination = playableMoves[myRand];
        var destContent;
        if(cases[randDestination].isEmpty()){
            destContent = "empty(" + randDestination + ")";
        }else{
            destContent = cases[randDestination].getAttachedPiece().getName() + "(" + randDestination + ")";
        }
        console.log("Computer plays " + randPiece.getName() + "(" + randPiece.getIndex() + ") to " + destContent); 
        moveTo(randPiece, randDestination, true);
    }else{
        console.log("Computer : I can't move !");
        return -1;
    }
}

function calculateCheckmate(myIterator, team){
    var maxPointsPiece = -1000;

    if(myIterator < 2){
        for(let i = 0; i < 64; i++){
            if(!cases[i].isEmpty() && cases[i].getAttachedPiece().getTeam() == team){
                var myPiece = cases[i].getAttachedPiece();
                var attackRange = myPiece.getAttackRange(cases);
                var maxPointsMove = -999;
    
                for(let a = 0; a < attackRange.length; ++a){
                    var oldPiece = cases[attackRange[a]].getAttachedPiece();
                    var oldPieceValue = 0;
                    if(oldPiece != null) oldPieceValue = oldPiece.getValue();
    
                    var points = 0;
                    var newTeam = 0;
    
                    if(team == 1){
                        newTeam = 2;
                    }else{
                        newTeam = 1;
                    }
    
                    if(oldPieceValue == 10){
                        if(myIterator%2 != 0){
                            points = 100/myIterator;
                        }else{
                            points = 200;
                        }
                    }else{
                        if((oldPieceValue - myIterator/2) > 0){
                            points = oldPieceValue - myIterator/2;
                        }else{
                            points = 0;
                        }
                    }
    
                    if(oldPieceValue == 10){
                        cases[myPiece.getIndex()].removePiece();
                        cases[attackRange[a]].setAttachedPiece(myPiece);
                    }else{
                        cases[myPiece.getIndex()].removePiece();
                        cases[attackRange[a]].setAttachedPiece(myPiece);
    
                        points = points - calculateCheckmate(myIterator+1, newTeam);
                    }
    
                    if(points > maxPointsMove){
                        maxPointsMove = points;
                    }
    
                    cases[i].setAttachedPiece(myPiece);
                    myPiece.setIndex(i);
                    myPiece.setAttachedCase(cases[i]);
                    cases[attackRange[a]].setAttachedPiece(oldPiece);
                }
    
                if(maxPointsMove > maxPointsPiece){
                    maxPointsPiece = maxPointsMove;
                }
            }
        }
    
        if(maxPointsPiece <= -900){
            maxPointsPiece = -200;
        }
    
        return maxPointsPiece;
    }else{
        return 0;
    }
}

//Re-regarder la video de GothamChess -> "4 Steps To Evaluate ANY Chess Position"
function calculatePositionValue(team){
    var posValue = 0.0;
    var allyPieces = [];
    var opPieces = [];

    if(team == 1){
        allyPieces = whitePieces;
        opPieces = blackPieces;
    }else{
        allyPieces = blackPieces;
        opPieces = whitePieces;
    }


    var allyKing = allyPieces.find(piece => piece.getType() == 6);
    var opKing = opPieces.find(piece => piece.getType() == 6);
    var attackRangeAlly = allyKing.getAttackRange(cases);
    var attackRangeOp = opKing.getAttackRange(cases);

    for(let i = 0; i < 64; ++i){
        if(!cases[i].isEmpty()){
            var testPiece = cases[i].getAttachedPiece();
            var testPieceRange = testPiece.getAttackRange(cases);

            for(let a = 0; a < testPieceRange.length; ++a){
                if(testPiece.getTeam() == team){
                    if(attackRangeOp.includes(testPieceRange[a])){
                        posValue += 0.1;
                    }else{
                        if(testPieceRange[a] == opKing.getIndex()){
                            posValue += 0.15;
                        }else{
                            posValue += 0.01;
                        }
                    }
                }else{
                    if(attackRangeAlly.includes(testPieceRange[a])){
                        posValue -= 0.1;
                    }else{
                        if(testPieceRange[a] == allyKing.getIndex()){
                            posValue -= 0.15;
                        }else{
                            posValue -= 0.01;
                        }
                    }
                }
            }
        }
    }
    return posValue;
}

function computerMinMax(myIterator, maxIterator, team){
    nbIter++;
    if(myIterator < maxIterator){
        var maxPointsPiece = -1000;
        var pieceToMove = null;
        var destination = -1;

        for(let i = 0; i < 64; i++){
            if(!cases[i].isEmpty() && cases[i].getAttachedPiece().getTeam() == team){
                var myPiece = cases[i].getAttachedPiece();
                var attackRange = myPiece.getAttackRange(cases);
                var maxPointsMove = -999;

                for(let a = 0; a < attackRange.length; ++a){
                    var oldPiece = cases[attackRange[a]].getAttachedPiece();
                    var oldPieceValue = 0;
                    if(oldPiece != null) oldPieceValue = oldPiece.getValue();

                    var points = 0;
                    var newTeam = 0;

                    if(team == 1){
                        newTeam = 2;
                    }else{
                        newTeam = 1;
                    }

                    //Si le pion peut faire une dame
                    if(myPiece.getType() == 1 && oldPieceValue != 10 && ((attackRange[a] >= 0 && attackRange[a] < 8) || (attackRange[a] > 55 && attackRange[a] < 64))){
                        if(myIterator < 2){
                            points = 9 + oldPieceValue;
                        }else{
                            points = 6 + oldPieceValue/2;
                        }
                    }else{
                        if(oldPieceValue == 10){
                            if(myIterator%2 != 0){
                                points = 100/myIterator;
                            }else{
                                points = 200;
                            }
                        }else{
                            if((oldPieceValue - myIterator/2) > 0){
                                points = oldPieceValue - myIterator/2;
                            }else{
                                points = 0;
                            }
                        }
                    }

                    if(oldPieceValue == 10){
                        cases[myPiece.getIndex()].removePiece();
                        cases[attackRange[a]].setAttachedPiece(myPiece);
                    }else{
                        cases[myPiece.getIndex()].removePiece();
                        cases[attackRange[a]].setAttachedPiece(myPiece);

                        if(myIterator < 2){
                            var posValue = calculatePositionValue(team);
                            points += posValue;
                        }

                        points = points - computerMinMax(myIterator+1, maxIterator, newTeam)[0];
                    }

                    if(myIterator == 0){
                        /*
                        console.log("startCase = " + myPiece.getIndex());
                        console.log("targetCase = " + attackRange[a]);
                        console.log("points = " + points);
                        */
                    }

                    if(points > maxPointsMove){
                        maxPointsMove = points;
                        if(myIterator == 0 && maxPointsMove > maxPointsPiece){
                            pieceToMove = myPiece;
                            destination = attackRange[a];
                        }
                    }else{
                        if(points == maxPointsMove){
                            let myRand = randInt(100);
                            if(myRand < 50){
                                maxPointsMove = points;
                                if(myIterator == 0 && maxPointsMove > maxPointsPiece){
                                    pieceToMove = myPiece;
                                    destination = attackRange[a];
                                }
                            }
                        }
                    }

                    cases[i].setAttachedPiece(myPiece);
                    myPiece.setIndex(i);
                    myPiece.setAttachedCase(cases[i]);
                    cases[attackRange[a]].setAttachedPiece(oldPiece);
                }

                if(maxPointsMove > maxPointsPiece){
                    maxPointsPiece = maxPointsMove;
                }else{
                    if(maxPointsMove == maxPointsPiece){
                        let myRand = randInt(100);
                        if(myRand < 50) maxPointsPiece = maxPointsMove;
                    }
                }
            }
        }

        if(maxPointsPiece <= -900){
            maxPointsPiece = -200;
        }

        return [maxPointsPiece, pieceToMove, destination];
    }
    else{
        return [0, pieceToMove, destination];
    }
}

function computerMinMaxSorted(myIterator, maxIterator, team){
    nbIter++;
    if(myIterator < maxIterator){
        var maxPointsPiece = -1000;
        var pieceToMove = null;
        var destination = -1;

        for(let i = 0; i < 64; i++){
            if(!cases[i].isEmpty() && cases[i].getAttachedPiece().getTeam() == team){
                var myPiece = cases[i].getAttachedPiece();
                var attackRange = myPiece.getAttackRange(cases);
                var maxPointsMove = -999;

                for(let a = 0; a < attackRange.length; ++a){
                    var oldPiece = cases[attackRange[a]].getAttachedPiece();
                    var oldPieceValue = 0;
                    if(oldPiece != null) oldPieceValue = oldPiece.getValue();

                    var points = 0;
                    var newTeam = 0;

                    if(team == 1){
                        newTeam = 2;
                    }else{
                        newTeam = 1;
                    }

                    //Si le pion peut faire une dame
                    if(myPiece.getType() == 1 && oldPieceValue != 10 && ((attackRange[a] >= 0 && attackRange[a] < 8) || (attackRange[a] > 55 && attackRange[a] < 64))){
                        if(myIterator < 2){
                            points = 9 + oldPieceValue;
                        }else{
                            points = 6 + oldPieceValue/2;
                        }
                    }else{
                        if(oldPieceValue == 10){
                            if(myIterator%2 != 0){
                                points = 100/myIterator;
                            }else{
                                points = 200;
                            }
                        }else{
                            if((oldPieceValue - myIterator/2) > 0){
                                points = oldPieceValue - myIterator/2;
                            }else{
                                points = 0;
                            }
                        }
                    }

                    if(oldPieceValue == 10){
                        cases[myPiece.getIndex()].removePiece();
                        cases[attackRange[a]].setAttachedPiece(myPiece);
                    }else{
                        cases[myPiece.getIndex()].removePiece();
                        cases[attackRange[a]].setAttachedPiece(myPiece);

                        if(myIterator < 2){
                            var posValue = calculatePositionValue(team);
                            points += posValue;
                        }

                        points = points - computerMinMaxSorted(myIterator+1, maxIterator, newTeam)[0];
                    }

                    if(myIterator == 0){
                        /*
                        console.log("startCase = " + myPiece.getIndex());
                        console.log("targetCase = " + attackRange[a]);
                        console.log("points = " + points);
                        */
                    }

                    if(points > maxPointsMove){
                        maxPointsMove = points;
                        if(myIterator == 0 && maxPointsMove > maxPointsPiece){
                            pieceToMove = myPiece;
                            destination = attackRange[a];
                            bestMoves.push(new MoveInfos(pieceToMove, destination, maxPointsMove, cases.slice()));
                            if(bestMoves.length > 5) bestMoves.shift();
                        }
                    }else{
                        if(points == maxPointsMove){
                            let myRand = randInt(100);
                            if(myRand < 50){
                                maxPointsMove = points;
                                if(myIterator == 0 && maxPointsMove > maxPointsPiece){
                                    pieceToMove = myPiece;
                                    destination = attackRange[a];
                                    bestMoves.push(new moveInfos(pieceToMove, destination, maxPointsMove, cases.slice()));
                                    if(bestMoves.length > 5) bestMoves.shift();
                                }
                            }
                        }
                    }

                    cases[i].setAttachedPiece(myPiece);
                    myPiece.setIndex(i);
                    myPiece.setAttachedCase(cases[i]);
                    cases[attackRange[a]].setAttachedPiece(oldPiece);
                }

                if(maxPointsMove > maxPointsPiece){
                    maxPointsPiece = maxPointsMove;
                }else{
                    if(maxPointsMove == maxPointsPiece){
                        let myRand = randInt(100);
                        if(myRand < 50) maxPointsPiece = maxPointsMove;
                    }
                }
            }
        }

        if(maxPointsPiece <= -900){
            maxPointsPiece = -200;
        }

        return [maxPointsPiece, pieceToMove, destination];
    }
    else{
        return [0, pieceToMove, destination];
    }
}

function setAIDepth(elo){
    let depth = 1;
    let eloLevels = [250, 600, 1000];
    let eloDepth = [1, 2, 4];
    let minElo = 250;
    let maxElo = 1000;
    let minDepth = 1;
    let maxDepth = 4;
    let iElo = 0;

    while(eloLevels[iElo] <= elo && iElo < eloLevels.length){
        ++iElo;
    }

    if(iElo == eloLevels.length) iElo--;
    maxElo = eloLevels[iElo];
    minElo = eloLevels[iElo-1];
    maxDepth = eloDepth[iElo];
    minDepth = eloDepth[iElo-1];

    randElo = minElo + randInt(maxElo-minElo);

    if(randElo <= elo){
        depth = maxDepth;
    }else{
        depth = minDepth;
    }

    console.log("minElo : " + minElo + " | maxElo : " + maxElo + " | elo : " + elo + " | randElo : " + randElo + " | depth : " + depth);

    return depth;
}

function computerPlay(){
    console.log("Computer plays");
    nbIter = 0;
    if(computerTeam == 1){
        //computerRandomPlay(whitePieces);
    }else{
        //computerRandomPlay(blackPieces);
    }
    bestMoves = new Array();
    var [points, pieceToMove, destination] = computerMinMax(0, setAIDepth(computerElo), computerTeam);
    bestMoves.forEach(function(move){
        console.log(move.pieceToMove.getName() + " can go to case " + move.destination + " for " + move.points + " points");
    });
    //console.log("Test : " + computerMinMax3(0, 4, computerTeam)[1]);
    if(pieceToMove != null){
        console.log("Computer move " + pieceToMove.getName() + "(" + pieceToMove.getIndex() + ") to " + destination + " for " + points + " points !");
        //moveTo(pieceToMove, destination, true);
        setTimeout(function(){moveTo(pieceToMove, destination, true)}, 1000);
        console.log("nbIter : " + nbIter);
    }else{
        console.log("Computer can't move !");
        switchPlayer();
    }
    console.log("Computer has finished");
    printBoard();
}

function clickAction(caseIndex){
    moveCases = [];
    clearCases();
    printBoard();
    //console.log(caseSelected);

    //console.log("canCastleKingside : " + canCastleKingside(whitePieces, blackPieces, cases));

    var attachedPiece = cases[caseIndex].getAttachedPiece();

    if(attachedPiece == null){
        if(canMoveTo(pieceInHand, caseIndex)){
            moveTo(pieceInHand, caseIndex, true);
        }else{
            if(canSpecialMoveTo(pieceInHand, caseIndex, cases)){
                specialMoveTo(pieceInHand, caseIndex, cases);
            }
        }
    }else{
        console.log(attachedPiece.getName() + " (" + caseIndex + ")");
        if(attachedPiece.getTeam() == playingTeam){
            if(playingTeam == playerTeam || !playerVsComputer){
                pieceInHand = attachedPiece;
                setCasesSpecialVisibility(pieceInHand, cases);
            }
        }else{
            if(canMoveTo(pieceInHand, caseIndex)){
                moveTo(pieceInHand, caseIndex, true);
            }
        }
    }
    printBoard();
}

function detectCollision(evt, ref){
    var x = evt.pageX - ref.offsetLeft;
    var y = evt.pageY - ref.offsetTop;
    var clickedCaseIndex = Math.floor(x/75)%8 + 8*(Math.floor(y/75)%8);
    clickAction(clickedCaseIndex);
}