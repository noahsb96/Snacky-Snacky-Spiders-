// click start game to start game
// once start game is clicked 2 spiders appear at the bottom, start button, h1 disappear, player scores appear and time appears
// timer counts down from 60 to 0
// crickets come from top of screen and move to bottom
    // crickets appear in random spots at top of the screen
    // if the crickets move all the way to the bottom then they disappear
    // if crickets collide with top of the spider picture then they disappear and increments corresponding player score
// players can move left to right and right to left
// game ends once timer gets to 0
// winner is player who's score is higher
    //alert pops up that declares the winner
// game is reset

let time = 61;
const startButton = document.querySelector('.start-button');
const player1 = document.getElementById('player1');
const player2 = document.getElementById('player2');
const bugImage = document.getElementById('bug')
const h1 = document.querySelector('h1');
const player1scoreText = document.querySelector('#player1score');
const player2scoreText = document.querySelector('#player2score');
const player1score = 0
const player2score = 0
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const bugArray = []
const window_height = window.innerHeight
const window_width = window.innerWidth
canvas.width = window_width
canvas.height = window_height

const players = {
    firstPlayer: {
        width:150,
        height:150,
        xpos:0,
        ypos: canvas.height / 1.2,
        speed: 5,
    },
    
    secondPlayer: {
        width:150,
        height:150,
        xpos: canvas.width / 1.09,
        ypos: canvas.height / 1.2,
        speed: 5,
    },

    drawPlayerOne() {
        context.drawImage(player1, this.firstPlayer.xpos, this.firstPlayer.ypos, this.firstPlayer.width, this.firstPlayer.height)
    },

    drawPlayerTwo() {
        context.drawImage(player2, this.secondPlayer.xpos, this.secondPlayer.ypos, this.secondPlayer.width, this.secondPlayer.height)
    }
}

class Bug {
    constructor() {
        this.xpos = Math.floor(Math.random() * canvas.width)
        this.ypos = 0
        this.width = 60
        this.height = 60
        this.speed = 5
        this.radius = 20
        this.dy = 1 * this.speed
    }

    drawBug() {
        context.drawImage(bugImage, this.xpos, this.ypos, this.width, this.height)
    }

    update() {
        this.drawBug()
        this.ypos += this.dy
    }
}

let leftKeyPress = false;
let rightKeyPress = false;
let zKeyPress = false;
let cKeyPress = false;

const leftKey = 37
const rightKey = 39
const zKey = 90
const cKey = 67

function keyPressed(evt) {
    if(evt.keyCode == leftKey) {
        leftKeyPress = true
    }
    if(evt.keyCode == rightKey) {
        rightKeyPress = true
    }
    if(evt.keyCode == zKey) {
        zKeyPress = true
    }
    if(evt.keyCode == cKey) {
        cKeyPress = true
    }
}

function keyReleased(evt) {
    if(evt.keyCode == leftKey) {
        leftKeyPress = false
    }
    if(evt.keyCode == rightKey) {
        rightKeyPress = false
    }
    if(evt.keyCode == zKey) {
        zKeyPress = false
    }
    if(evt.keyCode == cKey) {
        cKeyPress = false
    }
}

function rightWall() {
    if(players.firstPlayer.xpos + players.firstPlayer.width > canvas.width){
        players.firstPlayer.xpos = canvas.width - players.firstPlayer.width
        
    }
    if(players.secondPlayer.xpos + players.secondPlayer.width > canvas.width){
        players.secondPlayer.xpos = canvas.width - players.secondPlayer.width
    }
}


function playerMove() {
    if(zKeyPress && players.firstPlayer.xpos > 0) {
        players.firstPlayer.xpos -= players.firstPlayer.speed
    }
    if(cKeyPress) {
        players.firstPlayer.xpos += players.firstPlayer.speed
    }
    if(leftKeyPress && players.secondPlayer.xpos > 0) {
        players.secondPlayer.xpos -= players.secondPlayer.speed
    }
    if(rightKeyPress) {
        players.secondPlayer.xpos += players.secondPlayer.speed
    }
    
    rightWall()
}

function timer() {
    if (time > 0) {
        time -= 1;
        h1.innerHTML = `Time: ${time}`;
    }
}

function win() {
    if (player1score > player2score) {
        alert('Player One Wins!')
    }

    if (player2score > player1score) {
        alert('Player Two Wins!')
    }

    if (player1score == player2score) {
        alert('No winner! Game is tied!')
    }
}

function startGame() {
    setInterval(() => {
        bugArray.push(new Bug)
    }, 1000)     
    setInterval(() => {
        timer()
        if (time === 0) {
            win()
        }
    }, 1000)
    startButton.classList.add('hidden');
    player1scoreText.classList.remove('hidden');
    player2scoreText.classList.remove('hidden');
    canvas.classList.remove('hidden')
}

function bugMovement () {
    bugArray.forEach((bug, index) => {
        if (bug.ypos >= canvas.height) {
            bugArray.splice(index, 1)
        }
        else {
            bug.update()
        }    
    },

    bugArray.forEach((bug, index) => {
        if (players.firstPlayer.xpos < bug.xpos && players.firstPlayer.xpos > bug.xpos && players.firstPlayer.ypos < bug.ypos && players.firstPlayer.ypos >= bug.ypos) {
                bugArray.splice(index, 1)
                player1score += 1
                player1scoreText.innerHTML = `${player1scoreText}<br>${player1score}`
        }

        if (players.secondPlayer.xpos <= bug.xpos && players.secondPlayer.xpos >= bug.xpos && players.secondPlayer.ypos <= bug.ypos && players.secondPlayer.ypos >= bug.ypos) {
                bugArray.splice(index, 1)
                player2score += 1
                player2scoreText.innerHTML = `${player2scoreText}<br>${player2score}`
        }
    })
)}
    
function clear() {
        context.clearRect(0, 0, canvas.width, canvas.height)
}

function updateElements() {
    clear()
    players.drawPlayerOne()
    players.drawPlayerTwo()
    playerMove()
    bugMovement()
    requestAnimationFrame(updateElements)
}

document.addEventListener('keydown', keyPressed)
document.addEventListener('keyup', keyReleased)
startButton.addEventListener('click', () => { 
    startGame();
    timer()
    updateElements()
})