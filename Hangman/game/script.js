// Word lists in French and English
let frenchWords = ["Bonjour", "Baguette", "Livre", "Fromage", "Maison"];
let englishWords = ["Goodbye", "Kingdom", "Pudding", "Language", "Queen"];

// Get canvas and drawing context
const canvas = document.getElementById("drawing");
const ctx = canvas.getContext("2d");

// Game state variables
let word = null;
let nbToFind;
let nbFound;
let nbMistakes;
let gameStarted = false;

function start(language) {
    reset(); // clear previous game state
    gameStarted = true;

    // Choose a random word based on selected language
    switch (language) {
        case "fr":
            word = frenchWords[Math.floor(Math.random() * frenchWords.length)].toUpperCase();
            break;
        case "en":
            word = englishWords[Math.floor(Math.random() * englishWords.length)].toUpperCase();
            break;
    }

    const wordContainer = document.getElementById("word");

    // Create one span per letter
    for (let i = 0; i < word.length; i++) {
        const emptyCase = document.createElement("span");
        emptyCase.classList.add("empty-letter");
        emptyCase.textContent = "";
        emptyCase.setAttribute("data-index", i);
        wordContainer.appendChild(emptyCase);
    }

    nbToFind = word.length;
    nbFound = 0;
    nbMistakes = 0;
}

function reset() {
    gameStarted = false;
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Enable all letter buttons
    const buttons = document.querySelectorAll(".letter");
    buttons.forEach(btn => {
        btn.disabled = false;
    });

    // Clear previous word display
    document.getElementById("word").innerHTML = "";
}

function letterPressed(letter) {
    if (!gameStarted) {
        return;
    }
    const btn = document.getElementById(letter);
    btn.disabled = true;

    const letters = document.querySelectorAll("#word .empty-letter");
    let found = false;

    // Reveal correct letters
    for (let i = 0; i < word.length; i++) {
        if (word[i] === letter) {
            letters[i].textContent = letter;
            found = true;
            nbFound++;
        }
    }

    // If letter was not found, draw next part of hangman
    if (!found) {
        nbMistakes++;
        drawGugusse(nbMistakes);
    }

    // Check for win
    if (nbFound === nbToFind) {
        alert("You won!");
        reset();
    }

    // Check for loss
    if (nbMistakes === 10) {
        alert("You lost (the game)");
        reset();
    }
}

// Draw hangman based on current mistake count
function drawGugusse(step) {
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;

    switch (step) {
        case 1: // Base
            ctx.beginPath();
            ctx.moveTo(20, 230);
            ctx.lineTo(130, 230);
            ctx.stroke();
            break;
        case 2: // Vertical pole
            ctx.beginPath();
            ctx.moveTo(50, 230);
            ctx.lineTo(50, 30);
            ctx.stroke();
            break;
        case 3: // Top bar
            ctx.beginPath();
            ctx.moveTo(50, 30);
            ctx.lineTo(150, 30);
            ctx.stroke();
            break;
        case 4: // Rope
            ctx.beginPath();
            ctx.moveTo(150, 30);
            ctx.lineTo(150, 60);
            ctx.stroke();
            break;
        case 5: // Head
            ctx.beginPath();
            ctx.arc(150, 75, 15, 0, Math.PI * 2, true);
            ctx.stroke();
            break;
        case 6: // Body
            ctx.beginPath();
            ctx.moveTo(150, 90);
            ctx.lineTo(150, 140);
            ctx.stroke();
            break;
        case 7: // Left arm
            ctx.beginPath();
            ctx.moveTo(150, 100);
            ctx.lineTo(130, 120);
            ctx.stroke();
            break;
        case 8: // Right arm
            ctx.beginPath();
            ctx.moveTo(150, 100);
            ctx.lineTo(170, 120);
            ctx.stroke();
            break;
        case 9: // Left leg
            ctx.beginPath();
            ctx.moveTo(150, 140);
            ctx.lineTo(130, 170);
            ctx.stroke();
            break;
        case 10: // Right leg
            ctx.beginPath();
            ctx.moveTo(150, 140);
            ctx.lineTo(170, 170);
            ctx.stroke();
            break;
    }
}
