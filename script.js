'use strict';

const btn = document.querySelector("#mode");
const body = document.querySelector("body");
const box = document.querySelector(".btns");
const resetButton = document.querySelector(".reset");
const newGame = document.querySelector("#newGame");
let Winner = document.querySelector("#Winner");
let Tie = document.querySelector("#tie");
const Home = document.querySelector("#home");
let Tagline = document.querySelector("#tagline");

if (!box) {
    console.error('Board element (.btns) not found.');
}

// Theme toggle
let mode = "light"; // fixed typo and initialize properly
if (btn && body) {
    // set initial button text based on mode
    btn.innerText = mode === 'light' ? 'Dark Mode' : 'Light Mode';
    btn.addEventListener('click', () => {
        if (mode === "light") {
            body.classList.add("darkmode");
            body.classList.remove("lightmode");
            btn.innerText = "Light Mode";
            mode = "dark";
        } else {
            body.classList.add("lightmode");
            body.classList.remove("darkmode");
            btn.innerText = "Dark Mode";
            mode = "light";
        }
    });
}

// Winning combinations
const winArray = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
    [0, 4, 8], [2, 4, 6]             // diagonals
];

let currentPlayer = "O";
const originalContent = box ? box.innerHTML : '';

// Delegated click handler for board buttons
if (box) {
    box.addEventListener('click', function (event) {
        const target = event.target;
        if (!target || !target.matches('button')) return;

        // ignore clicks on already filled buttons
        if (target.disabled) return;

        target.textContent = currentPlayer;
        target.disabled = true;
        target.style.color = "black";

        const winner = checkWinner();
        if (winner) {
            showWinner(winner);
            return;
        }

        if (isBoardFull()) {
            showTie();
            return;
        }

        currentPlayer = currentPlayer === "O" ? "X" : "O";
    });
}

// Check winner by reading current board state
function checkWinner() {
    const buttons = box.querySelectorAll('button');
    for (const pattern of winArray) {
        const [a, b, c] = pattern;
        const valA = buttons[a].textContent.trim();
        const valB = buttons[b].textContent.trim();
        const valC = buttons[c].textContent.trim();

        if (valA !== "" && valA === valB && valB === valC) {
            // highlight winning buttons
            buttons[a].classList.add('winner');
            buttons[b].classList.add('winner');
            buttons[c].classList.add('winner');
            return valA; // return 'O' or 'X'
        }
    }
    return null;
}

function isBoardFull() {
    const buttons = box.querySelectorAll('button');
    return Array.from(buttons).every(btn => btn.textContent.trim() !== "");
}

function disableBoard() {
    const buttons = box.querySelectorAll('button');
    buttons.forEach(b => b.disabled = true);
}

function showWinner(winner) {
    disableBoard();
    // simple feedback; you can replace with a nicer UI element
    Winner.style.display = "";
    Winner.innerText = `Congrats, Winner is The ${winner} ..... !`;
    Tie.style.display = "none";
    Tagline.style.display = "none";
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth' // Adds smooth scrolling animation
    });
}

function showTie() {
    Tie.style.display = "";
    Tagline.style.display = "none";
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth' // Adds smooth scrolling animation
    });
}

function resetMessage() {
    Winner.style.display = "none";
    Tagline.style.display = "";
    Tie.style.display = "none";
}

// Reset / New Game handlers
if (resetButton) {
    resetButton.addEventListener('click', () => {
        box.innerHTML = originalContent;
        currentPlayer = "O";
        resetMessage();
        // no need to reattach box listener because we used delegation on `box`
    });
}

if (newGame) {
    newGame.addEventListener('click', () => {
        box.innerHTML = originalContent;
        currentPlayer = "O";
        resetMessage();
    });
}
