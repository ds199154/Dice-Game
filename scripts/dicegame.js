// COMP 2132 - Final Project - Dice Game - Dalvir Shoker - A01263111

// Consts & lets
const $p1Roll = $("#p1-roll");
const $p2Roll = $("#p2-roll");
const $p1Score = $("#p1-score");
const $p2Score = $("#p2-score");
const $popup = $("#popup");
const $round = $("#round");

const $rollDiceBtn = $("#rollDiceBtn");
const $resetGameBtn = $("#resetGameBtn");

const popupFadeInterval = 1000; // in ms

const DICE_MIN_ROLL = 1;
const DICE_MAX_ROLL = 6;

let round = 0;


// Player Object
const Player = {
    playerRoundScore: 0,
    playerTotalScore: 0,

    // return player round score
    roundScore: function roundScore() {
        return this.playerRoundScore;
    },
    // return player total score
    totalScore: function totalScore() {
        return this.playerTotalScore;
    }
}


// Create two players
const newPlayerOne = Object.create(Player);
const newPlayerTwo = Object.create(Player);


// Roll die and return num from 1-6
function rollDie() {
    return Math.floor((Math.random()) * (DICE_MAX_ROLL - DICE_MIN_ROLL + 1)) + DICE_MIN_ROLL;
}


// Roll both players dice
function rollDice() {
    // Dice audio
    const rollDiceMusic = new Audio('audio/roll-dice.mp3');
    rollDiceMusic.play();

    // roll each die
    let dice1 = rollDie();
    let dice2 = rollDie();
    let dice3 = rollDie();
    let dice4 = rollDie();

    $("#dice1").attr("src", `images/dice-roll-${dice1}.gif`);
    $("#dice2").attr("src", `images/dice-roll-${dice2}.gif`);
    $("#dice3").attr("src", `images/dice-roll-${dice3}.gif`);
    $("#dice4").attr("src", `images/dice-roll-${dice4}.gif`);


    // Player 1 Dice Conditional
    if (dice1 === 1 || dice2 === 1) {
        //playerOneRoundScore = 0;
        newPlayerOne.playerRoundScore = 0;
    } else if (dice1 === dice2) {
        //playerOneRoundScore = (dice1 + dice2) * 2;
        newPlayerOne.playerRoundScore = ((dice1 + dice2) * 2);
    } else {
        //playerOneRoundScore = dice1 + dice2;
        newPlayerOne.playerRoundScore = dice1 + dice2;
    }

    // Player 2 Dice Conditional
    if (dice3 === 1 || dice4 === 1) {
        //playerTwoRoundScore = 0;
        newPlayerTwo.playerRoundScore = 0;
    } else if (dice3 === dice4) {
        //playerTwoRoundScore = ((dice3 + dice4) * 2);
        newPlayerTwo.playerRoundScore = ((dice3 + dice4) * 2);
    } else {
        //playerTwoRoundScore = dice3 + dice4;
        newPlayerTwo.playerRoundScore = dice3 + dice4;
    }


    // Add round scores to total scores
    newPlayerOne.playerTotalScore += newPlayerOne.playerRoundScore;
    newPlayerTwo.playerTotalScore += newPlayerTwo.playerRoundScore;

    // Display player 1 round and total score
    $p1Score.html(`<h2>Round Score: ${newPlayerOne.roundScore()}</h2>`);
    $p1Score.append(`<h2>Total: ${newPlayerOne.totalScore()}</h2>`);

    // Display player 2 round and total score
    $p2Score.html(`<h2>Round Score: ${newPlayerTwo.roundScore()}</h2>`);
    $p2Score.append(`<h2>Total: ${newPlayerTwo.totalScore()}</h2>`);

    round++;
    $round.text(`${round}`);

    // End game after 3 rounds and declare winner
    if (round === 3) {
        $rollDiceBtn.prop("disabled", true);
        declareWinner();
    }
}


// Reset game function
function resetGame() {
    
    // Reset round counter
    round = 0;
    $round.text(`${round}`);

    // Reset player scores
    newPlayerOne.playerTotalScore = 0;
    newPlayerTwo.playerTotalScore = 0;

    // Remove background image and clear popup text
    $("body").css("background-image", "none");
    $popup.html("");
    $popup.fadeTo(popupFadeInterval, 0, function() {});

    // Enable dice
    $("#rollDiceBtn").prop("disabled", false);

    // Reset scores
    $("#p1-score").html(`<h2>Round Score: 0</h2>`);
    $("#p1-score").append(`<h2>Total: 0</h2>`);
    $("#p2-score").html(`<h2>Round Score: 0</h2>`);
    $("#p2-score").append(`<h2>Total: 0</h2>`);

    // Reset images
    for (i = 1; i < 5; i++) {
        $(`#dice${i}`).attr("src", `images/dice.jpg`);
    }
}


// Declare game winner function
function declareWinner() {
    // Declare music
    const loserMusic = new Audio('audio/you-lose.mp3');
    const winnerMusic = new Audio('audio/you-win.mp3');
    const drawMusic = new Audio('audio/draw.mp3');

    // Final result popup
    $popup.fadeTo(popupFadeInterval, 2, function() {});
    // Player one wins
    if (newPlayerOne.playerTotalScore > newPlayerTwo.playerTotalScore) {
        $popup.html(`<button type="button" class="btnclose" id="closeBtn">X</button>`);
        $popup.append(`<h1>Congratulations,</h1> <h1>You Win!</h1>`);
        $popup.append(`<p><img id="you-win" class="img-winner" src="images/you-win.gif" alt="images/you-win.gif"></p>`);
        $("body").css("background-image", "url(images/raining-money.gif)");
        winnerMusic.play();

        // Player two wins    
    } else if (newPlayerOne.playerTotalScore < newPlayerTwo.playerTotalScore) {
        $popup.html(`<button type="button" class="btnclose" id="closeBtn">X</button>`);
        $popup.append(`<h1>Sorry, Player Two Wins!</h1>`);
        $popup.append(`<p><img id="you-lose" class="img-winner" src="images/you-lose.gif" alt="images/you-lose.gif"></p>`);
        $("body").css("background-image", "url(images/burning-money.gif)");
        loserMusic.play();

        // Game ends in draw
    } else if (newPlayerOne.playerTotalScore === newPlayerTwo.playerTotalScore) {
        $popup.html(`<button type="button" class="img-winner" class="btnclose" id="closeBtn">X</button>`);
        $popup.append(`<h1>Game was a Draw!</h1>`);
        $popup.append(`<p><img id="draw" class="img-winner" src="images/draw.gif" alt="images/draw.gif"></p>`);
        drawMusic.play();
    }


    $("#closeBtn").on("click", function() {
        $popup.fadeTo(popupFadeInterval, 0, function() {});
    });
}

// Page setup
$p1Roll.append(`<img id="dice1" src="images/dice.jpg" alt="images/dice.jpg">`);
$p1Roll.append(`<img id="dice2" src="images/dice.jpg" alt="images/dice.jpg">`);

$p2Roll.append(`<img id="dice3" src="images/dice.jpg" alt="images/dice.jpg">`);
$p2Roll.append(`<img id="dice4" src="images/dice.jpg" alt="images/dice.jpg">`);

$rollDiceBtn.on("click", function() {
    rollDice();
});

$resetGameBtn.on("click", function() {
    resetGame();
});