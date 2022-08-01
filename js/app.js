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

let time = 60;
const startButton = document.querySelector('.start-button');
const player1 = document.getElementById('player1');
const player2 = document.getElementById('player2');
const h1 = document.querySelector('h1');
const player1score = document.querySelector('#player1score');
const player2score = document.querySelector('#player2score');
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

    drawPlayer(){
        context.drawImage(player1, this.firstPlayer.xpos, this.firstPlayer.ypos, this.firstPlayer.width, this.firstPlayer.height)
        context.drawImage(player2, this.secondPlayer.xpos, this.secondPlayer.ypos, this.secondPlayer.width, this.secondPlayer.height)
    },
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

let updateElements = function() {
    game.clear()
    players.drawPlayer()
    playerMove()
    bugMovement()
    requestAnimationFrame(updateElements)
}

function timer() {
    if (time > 0) {
        time -= 1;
        h1.innerHTML = `Time: ${time}`;
    }
}

const game = {
    startGame() {
        const bugs = setInterval(() => {
            bugArray.push(new Bug)
        }, 1000)     
        setInterval(() => {
            timer()
        }, 1000)
        startButton.classList.add('hidden');
        player1score.classList.remove('hidden');
        player2score.classList.remove('hidden');
        canvas.classList.remove('hidden')
    },
    
    clear() {
        context.clearRect(0, 0, canvas.width, canvas.height)
    }
}

class Bug {
    constructor() {
        this.xpos = Math.floor(Math.random() * canvas.width)
        this.ypos = 0
        this.speed = 5
        this.radius = 20
        this.dy = 1 * this.speed
    }

    drawBug() {
        context.fillStyle = '#008000'
        context.beginPath()
        context.arc(this.xpos, this.ypos, this.radius, 0, Math.PI * 2)
        context.fill()
        context.closePath()
    }

    update() {
        this.drawBug()
        this.ypos += this.dy
    }
}

const bugMovement = () => {
    bugArray.forEach((bug, index) => {
        if(bug.ypos >= canvas.height) {
            bugArray.splice(index, 1)
        } else {
            bug.update()
        }
    })
}

document.addEventListener('keydown', keyPressed)
document.addEventListener('keyup', keyReleased)
startButton.addEventListener('click', () => { 
    game.startGame();
    timer()
    updateElements()
})

// class Bug {
//     constructor() {
//         this.imagePath = 'grasshopper.png';
//         this.xpos = Math.random() * window_width;
//         this.ypos = 50;
//         this.width = 60;
//         this.height = 60;
//         this.speed = 5;
//         this.dy = 1 * this.speed
//     }

//     createImage(context, imagePath, xpos, ypos, width, height) {
//         let myImage = document.createElement('img');
//         myImage.src = imagePath;
//         myImage.onload = function() {
//             context.drawImage(myImage, xpos, ypos, width, height,);
//         }
//     }

//     update() {
//         this.createImage(context, Bug.imagePath, Bug.xpos, Bug.ypos, Bug.width, Bug.height, Bug.speed)
//         Bug.ypos += Bug.dy
//     }
// }