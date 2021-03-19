blackPiecesSRC = ['./ChessImages/chessPawnBlack.png', './ChessImages/chessRookBlack.png',
 './ChessImages/chessKnightBlack.png', './ChessImages/chessBishopBlack.png',
 './ChessImages/chessQueenBlack.png', './ChessImages/chessKingBlack.png'];

whitePiecesSRC = ['./ChessImages/chessPawnWhite.png', './ChessImages/chessRookWhite.png',
'./ChessImages/chessKnightWhite.png', './ChessImages/chessBishopWhite.png',
'./ChessImages/chessQueenWhite.png', './ChessImages/chessKingWhite.png'];

class Piece{
    constructor(nameP, type, team, index, pCase){
        this.nameP = nameP;
        this.type = type;
        this.value = 0;
        this.team = team;
        this.index = index;
        this.attachedCase = pCase;
        this.moved = false;
        this.killed = false;
        this.mult = true;
        this.myValues = [1,5,3,3,9,10];
        canevas = document.getElementById('canvas');
        ctx = canevas.getContext('2d');
        this.displayP = new Image();
        //this.displayP.src = src;
    }

    getName(){
        return this.nameP;
    }

    setValue(){
        this.value = this.myValues[this.type-1];
        if(this.team == 1){
            this.displayP.src = whitePiecesSRC[this.type-1];
        }else{
            this.displayP.src = blackPiecesSRC[this.type-1]; 
        }
    }

    getValue(){
        return this.value;
    }

    getType(){
        return this.type;
    }

    getTeam(){
        return this.team;
    }

    getIndex(){
        return this.index;
    }

    setIndex(index){
        this.index = index;
    }

    getAttachedCase(){
        return this.attachedCase;
    }

    setAttachedCase(newCase){
        this.attachedCase = newCase;
    }

    hasMoved(){
        return this.moved;
    }

    promoteToQueen(){
        this.type = 5;
        this.setValue();
    }

    testPawnPromotion(){
        if(this.type == 1){
            if(this.team == 1){
                if(this.index/8 < 1){
                    return true;
                }
            }else{
                if(this.index/8 >= 7){
                    return true;
                }
            }
        }
        
        return false;
    }

    move(caseDestination, cases){
        if(this.killed) console.log("Error : " + this.nameP + "(" + this.index + ") is dead, but a script attempted to play it !");
        this.moved = true;
        cases[this.index].removePiece();
        if(!caseDestination.isEmpty()) caseDestination.getAttachedPiece().kill();
        caseDestination.addPiece(this);
        this.setAttachedCase(caseDestination);
        this.index = caseDestination.getIndex();
        if(this.testPawnPromotion()) this.promoteToQueen();
    }

    virtualMove(caseDestination, cases){
        if(this.killed) console.log("Error : " + this.nameP + "(" + this.index + ") is dead, but a script attempted to play it !");
        cases[this.index].removePiece();
        if(!caseDestination.isEmpty()) caseDestination.getAttachedPiece().kill();
        caseDestination.addPiece(this);
        this.setAttachedCase(caseDestination);
        this.index = caseDestination.getIndex();
        if(this.testPawnPromotion()) this.promoteToQueen();
    }

    kill(){
        this.killed = true;
    }

    isDead(){
        return this.killed;
    }

    displayPiece(){
        ctx.drawImage(this.displayP, (this.index*75)%600, Math.floor((this.index*75)/600)*75, 75, 75);
        //ctx.drawImage(this.displayP, (63*75)%600 - (this.index*75)%600, Math.floor((63*75)/600)*75 - Math.floor((this.index*75)/600)*75, 75, 75);
    }

    getPieceIncr(){
        var incr = [];
        var dist = [];
        switch (this.type) {
            case 1:
                if(this.team == 1){
                    if(!this.hasMoved()){
                        incr = [-9,-8, -7, -16];
                        dist = [2, 1, 2, 2];
                    }else{
                        incr = [-9,-8, -7];
                        dist = [2, 1, 2];
                    }
                }else{
                    if(!this.hasMoved()){
                        incr = [7, 8, 9, 16];
                        dist = [2, 1, 2, 2];
                    }else{
                        incr = [7, 8, 9];
                        dist = [2, 1, 2];
                    }
                }
                this.mult = false;
                break;
            case 2:
                incr = [-8, -1, 1, 8];
                dist = [1, 1, 1, 1];
                this.mult = true;
                break;
            case 3:
                incr = [-17, -15, -10, -6, 6, 10, 15, 17];
                dist = [3, 3, 3, 3, 3, 3, 3, 3];
                this.mult = false;
                break;
            case 4:
                incr = [-9, -7, 7, 9];
                dist = [2, 2, 2, 2];
                this.mult = true;
                break;
            case 5:
                incr = [-9, -8, -7, -1, 1, 7, 8, 9];
                dist = [2, 1, 2, 1, 1, 2, 1, 2];
                this.mult = true;
                break;
            case 6:
                incr = [-9, -8, -7, -1, 1, 7, 8, 9];
                dist = [2, 1, 2, 1, 1, 2, 1, 2];
                this.mult = false;
                break;
            default:
                break;
        }
        
        return [incr, dist];
    }

    calculateDistance(start, end){
        return Math.abs(start%8 - end%8) + Math.abs(Math.floor(start/8) - Math.floor(end/8));
    }

    pawnMoveValid(start, dest, cases){
        var valid = false;
        //console.log("Start : " + start + " | Dest : " + dest + " | Deslta : " + Math.abs(start - dest));
        if(Math.abs(start - dest) == 8 || Math.abs(start - dest) == 16){
            if(cases[dest].isEmpty()){
                if(Math.abs(start - dest) == 8){
                    valid =  true;
                }else{
                    var incr;
                    if(this.team == 1){
                        incr = 8;
                    }else{
                        incr = -8;
                    }
                    valid = cases[dest+incr].isEmpty();
                }
            }
        }else{
            if(!cases[dest].isEmpty()){
                //console.log("Pawn : 7 or 9");
                if(cases[dest].getAttachedPiece().getTeam() != this.team){
                    valid =  true;
                }
            }
        }

        return valid;
    }

    isDestinationValid(start, dest, dist, cases){
        var valid = false;
        if(dest >= 0 && dest < 64){
            if(calculateDistance(start, dest) == dist){
                var attachedPiece = cases[dest].getAttachedPiece();
                if(this.type == 1){
                    valid = this.pawnMoveValid(start, dest, cases);
                }else{
                    if(attachedPiece != null){
                        if(attachedPiece.getTeam() != this.team){
                            valid = true;
                        }
                    }else{
                        valid = true;
                    }   
                }
            }
        }
        //console.log(start + ", " + dest + ", " + "d" + dist + " : " + valid);
        return valid;
    }


    getAttackRange(cases){
        var attackCases = [];
        var [incr, dist] = this.getPieceIncr();
        var continuer = true;

        if(this.mult){
            for(let i = 0; i < incr.length; ++i){
                var newIndex = this.index;
                while(continuer){
                    if(this.isDestinationValid(newIndex, (newIndex + incr[i]), dist[i], cases)){
                        attackCases.push(newIndex + incr[i]);
                        newIndex += incr[i];
                        if(cases[newIndex].getAttachedPiece() != null) continuer = false;
                    }else{
                        continuer = false;
                    }
                }
                continuer = true;
            }
        }else{
            for(let i = 0; i < incr.length; ++i){
                if(this.isDestinationValid(this.index, (this.index + incr[i]), dist[i], cases)){
                    attackCases.push(this.index + incr[i]);
                }
            }
        }

        return attackCases;
    }
}