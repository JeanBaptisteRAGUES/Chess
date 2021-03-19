class Case{
    constructor(index){
        this.index = index;
        this.attachedPiece = null;
        this.displaySpecial = false;
        canevas = document.getElementById('canvas');
        ctx = canevas.getContext('2d');
        this.displayMove = new Image();
        this.displayMove.src = './ChessImages/chessCaseMove.png';
        this.displayAttack = new Image();
        this.displayAttack.src = './ChessImages/chessCaseAttack.png';
    }

    addPiece(piece){
        this.attachedPiece = piece;
    }

    removePiece(){
        this.attachedPiece = null;
    }

    setDisplaySpecial(value){
        this.displaySpecial = value;
    }

    displayCase(){
        if(this.displaySpecial){
            if(this.attachedPiece == null){
                ctx.drawImage(this.displayMove, (this.index*75)%600, Math.floor((this.index*75)/600)*75, 75, 75);
            }else{
                ctx.drawImage(this.displayAttack, (this.index*75)%600, Math.floor((this.index*75)/600)*75, 75, 75);
            }
        }
    }

    isEmpty(){
        return this.attachedPiece == null;
    }

    getAttachedPiece(){
        return this.attachedPiece;
    }

    setAttachedPiece(piece){
        this.attachedPiece = piece;
        if(piece != null){
            piece.setIndex(this.index);
            piece.setAttachedCase(this);
        }
    }

    getIndex(){
        return this.index;
    }
}