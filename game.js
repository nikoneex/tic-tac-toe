var game = function () {

    const Player = (name, id, marker, markerIcon) => {
        const takeTurn = (elm) => {
            $(elm).html(currPlayer.markerIcon)
        }
        return { name, id, marker, markerIcon, takeTurn }
    }

    let gameBoard = [
        {
            l: undefined,
            m: '',
            r: ''
        },
        {
            l: '',
            m: '',
            r: undefined
        },
        {
            l: '',
            m: undefined,
            r: ''
        }
    ]

    let turn = 1;

    const nextTurn = () => {
        if(currPlayer === player1){
            $('#player1').parent().addClass('playerTurn')
            $('#player2').parent().removeClass('playerTurn')
        } else {
            $('#player2').parent().addClass('playerTurn')
            $('#player1').parent().removeClass('playerTurn')
        }
    }

    const renderBoard = () => {
        //build gameboard
        for (const row in gameBoard) {
            for (const box in gameBoard[row]) {
                $('#gameboard').append('<div class="box" data-row="' + row + '" data-col="' + box + '"></div>')
            }
        }

        //add click listener
        $('.box').click(function () {
            $(this).off();
            markBoard(this, currPlayer);
            currPlayer.takeTurn(this);
            checkBoard();
            if (currPlayer == player1) {
                currPlayer = player2
            } else {
                currPlayer = player1
            }
            nextTurn()
        })
        
        //add players
        $('#player1').text(player1.name)
        $('#player1icon').html(player1.markerIcon)
        $('#player2').text(player2.name)
        $('#player2icon').html(player2.markerIcon)

        nextTurn();
    };

    var gameOver = false;

    const checkBoard = () => {
        //take 5 turns before evaluating
        if (turn >= 5) {
            //check rows
            for (const row in gameBoard) {
                if (gameBoard[row].l === gameBoard[row].m && gameBoard[row].m === gameBoard[row].r) {
                    endGame(currPlayer);
                }
            }

            //check cols
            if (gameBoard[0].l === gameBoard[1].l && gameBoard[1].l === gameBoard[2].l) {
                endGame(currPlayer);
            }
            if (gameBoard[0].m === gameBoard[1].m && gameBoard[1].m === gameBoard[2].m) {
                endGame(currPlayer);
            }
            if (gameBoard[0].r === gameBoard[1].r && gameBoard[1].r === gameBoard[2].r) {
                endGame(currPlayer);
            }

            //check diagonals
            if (gameBoard[0].l === gameBoard[1].m && gameBoard[1].m === gameBoard[2].r) {
                endGame(currPlayer);
            }
            if (gameBoard[0].r === gameBoard[1].m && gameBoard[1].m === gameBoard[2].l) {
                endGame(currPlayer);
            }
        }

        if (turn === 9 && !gameOver){
            console.log("tie!")
        }
        return turn++
    }

    const markBoard = (box, player) => {
        var row = $(box).data('row')
        var col = $(box).data('col')
        gameBoard[row][col] = player.marker
    }

    const endGame = (player) => {
        $('.box').off()
        console.log("Game won " + currPlayer.name)
        return gameOver = true
    }

    // const getNames = () => {

    // }

    return { Player, renderBoard, gameBoard }
}();

var player1 = game.Player('Player 1','player1', 'O', '<i class="fas fa-circle-notch"></i>')
var player2 = game.Player('Player 2','player2', 'X', '<i class="fas fa-times"></i>')

var currPlayer = player1;
game.renderBoard()