let hunger = 100;
let happiness = 100;
let energy = 100;
let points = 0;
let hatched = false;
let angelAnimation;
let sleeping = false;
let sleepAnimation;
let sleepTimeout;
// Update stats on screen
function updateScreen() {
    document.getElementById("hunger").textContent = hunger;
    document.getElementById("happy").textContent = happiness;
    document.getElementById("energy").textContent = energy;
    document.getElementById("points").textContent = points;
}

// Feed menu
function toggleFoodMenu() {
const menu = document.getElementById("foodMenu");


if (menu.style.display === "none") {
    menu.style.display = "block";
} else {
    menu.style.display = "none";
}


}

function feedPet(food) {

    let cost = 0;

    if (food === "candy") cost = 3;
    if (food === "pie") cost = 5;
    if (food === "apple") cost = 8;
    if (food === "milk") cost = 12;

    if (points < cost) {
        alert("❌ Not enough points!");
        return;
    }

    points -= cost;

    if (food === "candy") {
        hunger = Math.min(100, hunger + 5);
        happiness = Math.min(100, happiness + 3);
    }

    if (food === "pie") {
        hunger = Math.min(100, hunger + 7);
    }

    if (food === "apple") {
        hunger = Math.min(100, hunger + 10);
        happiness = Math.min(100, happiness + 1);
    }

    if (food === "milk") {
        hunger = Math.min(100, hunger + 16);
        energy = Math.min(100, energy + 5);
    }

    updateScreen();

    document.getElementById("foodMenu").style.display = "none";
}

function playStars() {


// Remove old stars if they exist
document.querySelectorAll(".star").forEach(star => star.remove());

let starsLeft = 8;

const positions = [];

const game = document.getElementById("game");

for (let i = 0; i < 8; i++) {


const star = document.createElement("div");

star.className = "star";
star.textContent = "⭐";

let x;
let y;
let validPosition = false;

while (!validPosition) {

    x = Math.random() * 240 + 40;
y = Math.random() * 260 + 120;

    validPosition = true;

    for (const pos of positions) {

        const dx = x - pos.x;
        const dy = y - pos.y;

        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 45) {
            validPosition = false;
            break;
        }
    }
}

positions.push({ x, y });

star.style.left = x + "px";
star.style.top = y + "px";

star.onclick = () => {

    star.remove();

    starsLeft--;

    if (starsLeft === 0) {

        happiness = Math.min(100, happiness + 25);
        points += 10;
        updateScreen();

        alert("😇 Baby Angel had fun! +25 Happiness +10 points");
    }
};

game.appendChild(star);


}



}


function sleepPet() {

if (sleeping) {

    clearInterval(sleepAnimation);
    clearTimeout(sleepTimeout);

    sleeping = false;

    const pet = document.getElementById("pet");

    document.querySelectorAll("button").forEach(button => {
        button.disabled = false;
    });

    const sleepButton = document.querySelector(
        "button[onclick='sleepPet()']"
    );

    sleepButton.textContent = "Sleep";

    const angelFrames = [
        "images/babyangel1.png",
        "images/babyangel2.png"
    ];

    let angelFrame = 0;

    pet.src = angelFrames[0];

    clearInterval(angelAnimation);

    angelAnimation = setInterval(() => {

        angelFrame = (angelFrame + 1) % 2;

        pet.src = angelFrames[angelFrame];

    }, 500);

    return;
}

sleeping = true;
const sleepButton = document.querySelector(
    "button[onclick='sleepPet()']"
);

sleepButton.textContent = "Wake Up";
document.querySelectorAll("button").forEach(button => {
    button.disabled = true;
});

sleepButton.disabled = false;

const pet = document.getElementById("pet");
clearInterval(angelAnimation);
const sleepFrames = [
    "images/sleepangel1.png",
    "images/sleepangel2.png"
];

let frame = 0;

// Start sleeping animation
sleepAnimation = setInterval(() => {

    frame = (frame + 1) % 2;

    pet.src = sleepFrames[frame];

}, 500);

// After 10 seconds wake up
sleepTimeout = setTimeout(() => {

    clearInterval(sleepAnimation);

    energy = Math.min(100, energy + 30);

    updateScreen();
sleeping = false;
const sleepButton = document.querySelector(
    "button[onclick='sleepPet()']"
);

sleepButton.textContent = "Sleep";
document.querySelectorAll("button").forEach(button => {
button.disabled = false;
});

    // Return to normal angel animation
    const angelFrames = [
        "images/babyangel1.png",
        "images/babyangel2.png"
    ];

    let angelFrame = 0;

    pet.src = angelFrames[0];

    angelAnimation = setInterval(() => {

        angelFrame = (angelFrame + 1) % 2;

        pet.src = angelFrames[angelFrame];

    }, 500);

}, 10000);


}



setInterval(() => {
hunger = Math.max(0, hunger - 4);
updateScreen();
}, 8000);

// Happiness drops every 12 seconds
setInterval(() => {
happiness = Math.max(0, happiness - 3);
updateScreen();
}, 12000);

// Energy drops every 18 seconds
setInterval(() => {
energy = Math.max(0, energy - 2);
updateScreen();
}, 18000);


// Egg animation
const eggFrames = [
"images/egg1.png",
"images/egg2.png"
];

let eggFrame = 0;

let eggAnimation = setInterval(() => {


if (hatched) return;

eggFrame = (eggFrame + 1) % 2;

document.getElementById("pet").src =
    eggFrames[eggFrame];


}, 500);

// Click egg to hatch
document.getElementById("pet").addEventListener("click", hatchEgg);

function hatchEgg() {


if (hatched) return;

hatched = true;

clearInterval(eggAnimation);

const pet = document.getElementById("pet");

// Shake

pet.style.transform = "translateX(-5px)";

setTimeout(() => {
    pet.style.transform = "translateX(5px)";
}, 100);

setTimeout(() => {
    pet.style.transform = "translateX(-5px)";
}, 200);

setTimeout(() => {
    pet.style.transform = "translateX(5px)";
}, 300);

// Cracked egg appears

setTimeout(() => {

    pet.src = "images/eggcrack.png";
    pet.style.transform = "translateX(0)";

}, 400);

// Wait 3 seconds then become angel

setTimeout(() => {
document.getElementById("hatchText").style.display = "none";
    const angelFrames = [
        "images/babyangel1.png",
        "images/babyangel2.png"
    ];

    let angelFrame = 0;

    pet.src = angelFrames[0];

    angelAnimation = setInterval(() => {

        angelFrame = (angelFrame + 1) % 2;

        pet.src =
            angelFrames[angelFrame];

    }, 500);

}, 3400);


}

updateScreen();

function toggleHelp() {

    const box = document.getElementById("helpBox");
    const btn = document.getElementById("helpBtn");

    if (box.style.display === "block") {

        box.style.display = "none";
        btn.textContent = "▼ Help";

    } else {

        box.style.display = "block";
        btn.textContent = "▲ Help";
    }
}
function togglePlayMenu() {

    const menu = document.getElementById("playMenu");

    if (menu.style.display === "block") {
        menu.style.display = "none";
    } else {
        menu.style.display = "block";
    }
}
function playRPS() {

    document.getElementById("playMenu").style.display = "none";

    document.getElementById("rpsGame").style.display = "block";

    document.getElementById("rpsResult").textContent = "";
}
function chooseRPS(playerChoice) {

    const result = document.getElementById("rpsResult");

    result.textContent = "👼 Angel is thinking...";

    const choices = ["rock", "paper", "scissors"];

    setTimeout(() => {

        const angelChoice =
            choices[Math.floor(Math.random() * 3)];

        let angelImage = "images/rockhand.png";

if (angelChoice === "paper")
    angelImage = "images/paperhand.png";

if (angelChoice === "scissors")
    angelImage = "images/scissorhand.png";
        if (playerChoice === angelChoice) {

            result.innerHTML =
    `<img src="${angelImage}" width="60"><br>
     It's a tie!`;

        } else if (

            (playerChoice === "rock" && angelChoice === "scissors") ||
            (playerChoice === "paper" && angelChoice === "rock") ||
            (playerChoice === "scissors" && angelChoice === "paper")

        ) {

            happiness = Math.min(100, happiness + 15);

            points += 5;

            updateScreen();

            result.innerHTML =
    `<img src="${angelImage}" width="60"><br>
     You won! +15 Happiness +5 Points`;

        } else {

            result.innerHTML =
    `<img src="${angelImage}" width="60"><br>
     Angel Baby won! 👼`;

        }

    }, 2000);
}
function closeRPS() {

    document.getElementById("rpsGame").style.display = "none";

    document.getElementById("rpsResult").textContent = "";
}
