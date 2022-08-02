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

let time = 61; // Time limit
const startButton = document.querySelector('.start-button'); // start button
const player1 = document.getElementById('player1'); // player 1 image
const player2 = document.getElementById('player2'); // player 2 image
const bugImage = document.getElementById('bug'); // bug image
const h1 = document.querySelector('h1'); // header
const player1scoreText = document.querySelector('#player1score'); // player 1 score text
const player2scoreText = document.querySelector('#player2score'); // player 2 score text
let player1score = 0; // player 1 score
let player2score = 0; // player 2 score
const canvas = document.getElementById('canvas'); // canvas
const context = canvas.getContext('2d'); // canvas drawing
const bugArray = []; // bug array
const window_height = window.innerHeight; // window height
const window_width = window.innerWidth; // window width
canvas.width = window_width; // canvas width
canvas.height = window_height; // canvas height

const players = { // players objects
    firstPlayer: { // first player object
        width:150, // player picture width
        height:150, // player picture height
        xpos: 5, // player picture starting x position
        ypos: Math.round(canvas.height / 1.2), // player picture starting y position
        speed: 5, // player speed in animation
    },
    
    secondPlayer: { // second player object
        width:150, // player picture width
        height:150, // player picture height
        xpos: Math.floor(Math.round(canvas.width / 5) * 5), // player picture x position
        ypos: Math.round(canvas.height / 1.2), // player picture y position
        speed: 5, // player picture speed in animation
    },

    drawPlayerOne() {
        context.drawImage(player1, this.firstPlayer.xpos, this.firstPlayer.ypos, this.firstPlayer.width, this.firstPlayer.height); // drawing player one picture
    },

    drawPlayerTwo() {
        context.drawImage(player2, this.secondPlayer.xpos, this.secondPlayer.ypos, this.secondPlayer.width, this.secondPlayer.height); // drawing player two picture
    }
};

class Bug { // bug class
    constructor() {
        this.xpos = Math.floor(Math.random() * canvas.width / 5) * 5; // bug picture x position
        this.ypos = 0 ;// bug picture y position
        this.width = 60; // bug picture width
        this.height = 60; // bug picture height
        this.speed = 5; // bug picture speed in animation
        this.dy = 1 * this.speed; // bug picture y axis movement
    }

    drawBug() {
        context.drawImage(bugImage, this.xpos, this.ypos, this.width, this.height); // drawing bug picture on canvas
    }

    update() {
        this.drawBug(); // bug picture updating animation
        this.ypos += this.dy; // bug picture moving on y axis animation
    }
}

let leftKeyPress = false; // starting left key press falsy value
let rightKeyPress = false; // starting right key press falsy value
let zKeyPress = false; // starting z key press falsy value
let cKeyPress = false; // starting c key press falsy value

const leftKey = 37; // left arrow key code
const rightKey = 39; // right arrow key code
const zKey = 90; // z key code
const cKey = 67; // c key code 

function keyPressed(evt) { // key press function
    if(evt.keyCode == leftKey) { // if left key is pressed
        leftKeyPress = true; // key press is set to true
    }
    if(evt.keyCode == rightKey) { // if right key is pressed
        rightKeyPress = true; // key press is set to true
    }
    if(evt.keyCode == zKey) { // if z key is pressed
        zKeyPress = true; // key press is set to true
    }
    if(evt.keyCode == cKey) { // if c key is pressed
        cKeyPress = true; // key press is set to true
    }
}

function keyReleased(evt) {
    if(evt.keyCode == leftKey) { // if left key is released
        leftKeyPress = false; // key press is set to false
    }
    if(evt.keyCode == rightKey) { // if right key is released
        rightKeyPress = false; // key press is set to false
    }
    if(evt.keyCode == zKey) { // if z key is released
        zKeyPress = false; // key press is set to false
    }
    if(evt.keyCode == cKey) { // if c key is released
        cKeyPress = false; // key press is set to false
    }
}

function rightWall() {
    if(players.firstPlayer.xpos + players.firstPlayer.width > canvas.width){ // if the first player's x position plus the the first player's width is more than the canvas width
        players.firstPlayer.xpos = canvas.width - players.firstPlayer.width; // the first player's x position is equal to the canvas width subtracted by the first player's width
        
    }
    if(players.secondPlayer.xpos + players.secondPlayer.width > canvas.width){ // if the second player's x position plus the the second player's width is more than the canvas width
        players.secondPlayer.xpos = canvas.width - players.secondPlayer.width; // the second player's x position is equal to the canvas width subtracted by the second player's width
    }
}


function playerMove() {
    if(zKeyPress && players.firstPlayer.xpos > 0) { // if the z key is pressed and the first player's x position is greater than 0
        players.firstPlayer.xpos -= players.firstPlayer.speed; // then the first player's x position is subtracted by the first player's speed
    }
    if(cKeyPress) { // if the c key is pressed
        players.firstPlayer.xpos += players.firstPlayer.speed; // then the first player's x position is added by the first player's speed
    }
    if(leftKeyPress && players.secondPlayer.xpos > 0) { // if the left arrow key is pressed and the second player's x position is greater than 0
        players.secondPlayer.xpos -= players.secondPlayer.speed; // then the second player's x position is subtracted by the second player's speed
    }
    if(rightKeyPress) { // if the right arrow key is pressed
        players.secondPlayer.xpos += players.secondPlayer.speed; // then the second player's x position is added by the second player's speed
    }
    
    rightWall(); // right wall collision function
}

function timer() { // timer function
    if (time > 0) { // if the time is greater than 0
        time -= 1; // then the time is subtracted by 1
        h1.innerHTML = `Time: ${time}`; // and the header is changed from the title to the time limit
    }
}

function win() { // win function
    if (player1score > player2score) { // if player 1's score is more than player 2's score
        alert('Player One Wins!'); // an alert pops up that declares player one the winner
    }

    if (player2score > player1score) { // if player 2's score is higher than player 1's score
        alert('Player Two Wins!'); // then an alert pops up that declares player two the winner
    }

    if (player1score == player2score) { // if player 1's score is equal to player 2's score
        alert('No winner! Game is tied!'); // then an alert pop's up declaring the game is a tie
    }
}

function startGame() { // start game function
    setInterval(() => { // every second
        bugArray.push(new Bug()); // a new bug is pushed into the bug array
    }, 1000);    
    setInterval(() => { // every second
        timer(); // the timer is decreased by 1
        if (time === 0) { // if the time is equal to 0
            win(); // check the win function
        }
    }, 1000);
    startButton.classList.add('hidden'); // add hidden class and css to the start button
    player1scoreText.classList.remove('hidden'); // remove the hidden class and css from the player 1 score text
    player2scoreText.classList.remove('hidden'); // remove the hidden class and css from the player 2 score text
    canvas.classList.remove('hidden'); // remove the hidden class and css from the canvas
}

function bugMovement () { // bug movement function
    bugArray.forEach((bug, index) => { // for each bug in the bug array and it's index
        if (bug.ypos >= canvas.height || bug.xpos + bug.width > canvas.width) { // if the bug's y position is greater than or equal to the canvas height or the bug's x position plus the bug's width is greater than the canvas width
            bugArray.splice(index, 1); // remove that bug from the array
        }
        else { // if the above if statement isn't true
            bug.update(); // update the bug animation
        }    
    },

    bugArray.forEach((bug, index) => { // for each bug in the bug array and it's corresponding index
        if (players.firstPlayer.xpos + players.firstPlayer.width >= bug.xpos && players.firstPlayer.xpos <= bug.xpos + bug.width && players.firstPlayer.ypos <= bug.ypos + bug.height && players.firstPlayer.ypos >= bug.ypos) { // if the first player's x position is equal to the bug's x position and the first player's y position is less than the bug's y position
                bugArray.splice(index, 1); // remove that bug from the bug array
                player1score += 1; // increment player 1's score
                player1scoreText.innerHTML = `Player One Score<br>${player1score}`; // change the player 1 score text to show the current player one score
        }

        if (players.secondPlayer.xpos + players.secondPlayer.width >= bug.xpos && players.secondPlayer.xpos <= bug.xpos + bug.width && players.secondPlayer.ypos <= bug.ypos + bug.height && players.secondPlayer.ypos >= bug.ypos) { // if the second player's x position is equal to the bug's xposition and the second player's y position is less than the bug's y position
                bugArray.splice(index, 1); // remove that bug from the bug array
                player2score += 1; // increment player 2's score by 1
                player2scoreText.innerHTML = `Player 2 Score<br>${player2score}`; // change the player 2 score text to show the current player two score
        }
    })
)}
    
function clear() {
        context.clearRect(0, 0, canvas.width, canvas.height); // clear the canvas
}

function updateElements() { // update all elements that need animation
    clear(); // clear the canvas
    players.drawPlayerOne(); // draw player one picture
    players.drawPlayerTwo(); // draw player 2 picture
    playerMove(); // move the players when keys are pressed
    bugMovement(); // move the bugs down the screen
    requestAnimationFrame(updateElements); // animate all functions in the update elements function
}

document.addEventListener('keydown', keyPressed); // when a key is pressed, run the key pressed function
document.addEventListener('keyup', keyReleased); // when a key is released, run the key released function
startButton.addEventListener('click', () => { // when start button is pressed
    startGame(); // run the start game function
    timer(); // run the timer function
    updateElements(); // run the update elements function
});