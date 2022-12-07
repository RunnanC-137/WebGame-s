const jogador = document.querySelector(".jogador")
const butao = document.querySelectorAll(".butao")
const stage = document.querySelector(".stage")
const modoDeJogo = document.querySelector(".modo-de-jogo")


window.onload = startGame(true)

function startGame(element) {

    if (element) {

        for (let square = 0; square < 9; square++) {
            let newSquare = document.createElement("div")
            newSquare.id = square
            newSquare.classList.add("square")
            stage.appendChild(newSquare)
        } 
    }

    document.querySelectorAll(".square").forEach((square) => {
        square.addEventListener("click", handleClick)
    })

}

function handleClick(element) {

    
    let square = element.target;
    let length = square.children.length
    if (length < 1) {
        
        let position = square.id
    
        if(handleMove(position)) {
            upDateSquare(`${position}`)
            whoWin(100)
            return
        } 
        upDateSquare(`${position}`)
        whoPlayer()
        if (computerPlayer) {
            computerChoice()
        }
    }
}

function upDateSquare(position) {
    let square = document.getElementById(position.toString())
    let symbol = document.createElement("div")
    symbol.classList.add(`${board[position]}`)
    square.appendChild(symbol)

    return 
}

function whoPlayer() {

    playerTime == 0 ? playerTime = 1  : playerTime = 0
    playerTime == 0 ? jogador.innerHTML = "Player &#x2B55" : jogador.innerHTML = "Player &#x274C" 
}

function whoWin(time) {

    let squares = document.querySelectorAll(".square")
    squares.forEach((square) => {
        square.removeEventListener("click", handleClick)
    })
    setTimeout(() => {
        playerTime == 0 ? jogador.innerHTML = "Payer ⭕ venceu" : jogador.innerHTML = "Player ❌ venceu"

    }, time)
    butao[0].style.display = "flex"
    butao[1].style.display = "flex"
}


function computerChoice(){

    if (board.filter(square => square == "").length > 0) {

    let square = Math.floor(Math.random() * 9)
    let computer = document.querySelectorAll(".square")[square]
    while (computer.children.length > 0) {
        square = Math.floor(Math.random() * 9)
        computer = document.querySelectorAll(".square")[square]
    }
    let position = computer.id
    let squares = document.querySelectorAll(".square")
    squares.forEach((square) => {
        square.removeEventListener("click", handleClick)
    })
    
    setTimeout((error) => {

        if(handleMove(position)) {
            upDateSquare(`${position}`)
            whoWin(100)
            return
        }
        upDateSquare(`${position}`)
        whoPlayer()
        squares.forEach((square) => {
            square.addEventListener("click", handleClick)
        })
    }, 500)
    } else {
        jogador.innerHTML = "⭕ Deu velha ❌"

    }
}

function reset() {

    for (let i = 0; i < 9; i++) {
        board[i] = ''
    }
    theEnd = false
    playerTime = 0
    gameOver = false
    
    document.querySelectorAll(".square").forEach((square) => {
        if (square.children.length > 0) {

            square.children[0].remove()
        }
    })
    startGame(false)
    butao[0].style.display = "none"
    butao[1].style.display = "none"
    jogador.innerHTML = "Player ⭕"
}

function singlePlayer() {
    selectGame()   

    computerPlayer = true

}


function selectGame() {

    modoDeJogo.style.display = "none"
    jogador.style.display = "block"
    stage.style.display = "grid"
    document.querySelector(".title").style.display = "block"
    
}