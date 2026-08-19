// =====================================================
// PAGE 6 — MISUU HEART CATCH GAME
// =====================================================

const gameArea = document.getElementById("game-area");
const gameScoreNumber = document.getElementById("game-score-number");
const gameMisuu = document.getElementById("game-misuu");
const gameMessage = document.getElementById("game-message");
const gameNextButton = document.getElementById("game-next");

let gameScore = 0;
let gameStarted = false;
let heartSpawnTimer = null;

const HEART_TARGET = 10;


// =====================================================
// START GAME
// =====================================================

function startMisuuGame() {

    if (gameStarted) {
        return;
    }

    gameStarted = true;
    gameScore = 0;

    if (gameScoreNumber) {
        gameScoreNumber.textContent = "0";
    }

    spawnHeart();

    heartSpawnTimer = setInterval(() => {

        if (gameScore < HEART_TARGET) {
            spawnHeart();
        }

    }, 1200);

}


// =====================================================
// CREATE HEART
// =====================================================

function spawnHeart() {

    if (!gameArea) {
        return;
    }

    const heart = document.createElement("button");

    heart.classList.add("game-heart");

    heart.textContent = "♥";

    heart.setAttribute(
        "aria-label",
        "Catch heart"
    );


    // Random size
    const size =
        Math.floor(Math.random() * 16) + 24;

    heart.style.fontSize = `${size}px`;


    // Keep hearts away from screen edges
    const maxX =
        gameArea.clientWidth - 55;

    const maxY =
        gameArea.clientHeight - 160;

    const x =
        Math.max(
            10,
            Math.random() * maxX
        );

    const y =
        Math.max(
            45,
            Math.random() * maxY
        );


    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;


    // Catch heart
    heart.addEventListener("click", () => {

        catchHeart(heart);

    });


    gameArea.appendChild(heart);


    // Heart disappears if not caught
    setTimeout(() => {

        if (
            heart.parentElement &&
            !heart.classList.contains("caught")
        ) {
            heart.remove();
        }

    }, 3000);

}


// =====================================================
// CATCH HEART
// =====================================================

function catchHeart(heart) {

    if (
        heart.classList.contains("caught") ||
        gameScore >= HEART_TARGET
    ) {
        return;
    }

    heart.classList.add("caught");

    gameScore++;


    if (gameScoreNumber) {
        gameScoreNumber.textContent = gameScore;
    }


    // Misuu reacts
    if (gameMisuu) {

        gameMisuu.classList.add("catch");

        setTimeout(() => {
            gameMisuu.classList.remove("catch");
        }, 220);

    }


    setTimeout(() => {
        heart.remove();
    }, 350);


    if (gameScore >= HEART_TARGET) {
        completeMisuuGame();
    }

}


// =====================================================
// COMPLETE GAME
// =====================================================

function completeMisuuGame() {

    clearInterval(heartSpawnTimer);


    // Remove remaining hearts
    document
        .querySelectorAll(".game-heart")
        .forEach((heart) => {
            heart.remove();
        });


    if (gameMessage) {
        gameMessage.textContent =
            "You caught them all! Misuu is impressed ♡";
    }


    if (gameNextButton) {

        gameNextButton.disabled = false;

        gameNextButton.classList.remove("locked");

        gameNextButton.innerHTML = `
            <span>See the final surprise</span>
            <span>→</span>
        `;

    }

}