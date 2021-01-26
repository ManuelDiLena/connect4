class Board {
    constructor(boardHTML, columnsHTML, board) {
        this.boardHTML = boardHTML;
        this.columnsHTML = columnsHTML;
        this.board = board;
    }

    resetBoard = function() {
        for(var i = 0; i < this.board.length; i++) {
            for(var j = 0; j < this.board[i].length; j++) {
                this.board[i][j] = null;
            }
        }
    }

    columnEventHandler = function(evt) {
        var columnId = evt.target.id.substr(1, 1);
        for(var i = 0; i < this.board[columnId].length; i++) {
            if(!this.board[columnId][i]) {
                this.board[columnId][i] = turn;
                toggleTurn();
                this.render();
                break;
            }
        }
    }

    bindColumnHandlers = function() {
        for(var i = 0; i < this.columnsHTML.length; i++) {
            this.columnsHTML[i].onclick = this.columnEventHandler.bind(this);
        }
    }

    render = function() {
        var html = '';
        for(var i = 0; i < this.board.length; i++) {
            html += '<div id="c' + i + '" class="column">';
            for(var j = this.board[i].length - 1; j >= 0; j--) {
                html += '<div id="s' + i + j + '" class="slot';
                if(this.board[i][j]) {html += ' ' + this.board[i][j];}
                html += '"></div>';
            }
            html += '</div>';
        }
        this.boardHTML.innerHTML = html;
        this.bindColumnHandlers();
    }

}