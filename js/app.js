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
const player1 = document.querySelector('#player1');
const player2 = document.querySelector('#player2');
const h1 = document.querySelector('h1');
const player1score = document.querySelector('#player1score');
const player2score = document.querySelector('#player2score');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

class Image {
    constructor(imagePath, xpos, ypos, width, height, speed) {
        this.imagePath = imagePath;
        this.xpos = xpos;
        this.ypos = ypos;
        this.width = width;
        this.height = height;
        this.speed = speed;
    }

    createImage(context, imagePath, xpos, ypos, width, height) {
        let myImage = document.createElement('img');
        myImage.src = imagePath;
        myImage.onload = function() {
            context.drawImage(myImage, xpos, ypos, width, height);
        }
    }

    drawGrasshopper () {
        canvas.style.width = document.body.clientWidth
        canvas.style.height = document.body.clientHeight
        const image = new Image('grasshopper.png', 50, 50, 80, 80);
        createImage(context, image.imagePath, image.xpos, image.ypos, image.width, image.height);
    }

    update() {
        this.drawGrasshopper()
    }
}

let bugCounter = 1;

let allBugs = [];

let createGrasshopper = function(grasshopper) {
    Image.draw(context);
}

for (let n)

function timer() {
    if (time > 0) {
        time -= 1;
        h1.innerHTML = `Time: ${time}`;
    }
}

function startGame() {
    let countdown = setInterval(() => {
        timer()
    }, 1000)
    startButton.classList.add('hidden');
    player1.classList.remove('hidden');
    player2.classList.remove('hidden');
    player1score.classList.remove('hidden');
    player2score.classList.remove('hidden');
}

startButton.addEventListener('click', startGame);
startButton.addEventListener('click', timer);
startButton.addEventListener('click', drawGrasshopper);