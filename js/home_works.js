const gmailInput = document.querySelector("#gmail_input");
const gmailButton = document.querySelector("#gmail_button");
const gmailResult = document.querySelector("#gmail_result");

const regex = /^[a-z\d._]+@gmail\.com$/i;

gmailButton.addEventListener("click", () => {
  if (regex.test(gmailInput.value)) {
    gmailResult.textContent = "Gmail правильный";
    gmailResult.style.color = "green";
  } else {
    gmailResult.textContent = "Gmail неправильный";
    gmailResult.style.color = "red";
  }
});

const parentBlock = document.querySelector(".parent_block");
const childBlock = document.querySelector(".child_block");

let positionX = 0;
let positionY = 0;
let direction = "right";

const moveBlock = () => {
  const maxWidth = parentBlock.clientWidth - childBlock.offsetWidth;
  const maxHeight = parentBlock.clientHeight - childBlock.offsetHeight;

  positionX = Math.min(Math.max(positionX, 0), maxWidth);
  positionY = Math.min(Math.max(positionY, 0), maxHeight);

  if (direction === "right") {
    if (positionX < maxWidth) {
      positionX++;
    } else {
      direction = "down";
    }
  } else if (direction === "down") {
    if (positionY < maxHeight) {
      positionY++;
    } else {
      direction = "left";
    }
  } else if (direction === "left") {
    if (positionX > 0) {
      positionX--;
    } else {
      direction = "up";
    }
  } else if (direction === "up") {
    if (positionY > 0) {
      positionY--;
    } else {
      direction = "right";
    }
  }
  childBlock.style.left = `${positionX}px`;
  childBlock.style.top = `${positionY}px`;

  requestAnimationFrame(moveBlock);
};

moveBlock();

const secondsValue = document.getElementById("seconds");
const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const resetBtn = document.getElementById("reset");

let count = 0;
let timerId = null;

const startTimer = () => {
  if (timerId !== null) return;

  timerId = setInterval(() => {
    count++;
    secondsValue.textContent = count;
  }, 1000);
};

const stopTimer = () => {
  clearInterval(timerId);
  timerId = null;
};

const resetTimer = () => {
  stopTimer();
  count = 0;
  secondsValue.textContent = count;
};

startBtn.addEventListener("click", startTimer);
stopBtn.addEventListener("click", stopTimer);
resetBtn.addEventListener("click", resetTimer);

// card

const charactersList = document.querySelector(".characters-list");

const request = new XMLHttpRequest();

request.open("GET", "../data/characters.json");
request.setRequestHeader("Content-Type", "application/json");
request.send();

request.addEventListener("load", () => {
  if (request.status >= 200 && request.status < 300) {
    const data = JSON.parse(request.response);

    charactersList.innerHTML = "";

    data.forEach((character) => {
      const card = document.createElement("div");
      card.classList.add("character-card");

      card.innerHTML = `
                <div class="character-photo">
                    <img src="${character.photo}" alt="${character.name}">
                </div>
                <h3>${character.name}</h3>
                <p>${character.role}</p>
            `;

      charactersList.appendChild(card);
    });
  } else {
    console.error(`Ошибка при загрузке данных: ${request.status}`);
  }
});

request.addEventListener("error", () => {
  console.error("Произошла ошибка сети");
});




const anyRequest = new XMLHttpRequest();

anyRequest.open('GET', '../data/any.json');
anyRequest.setRequestHeader('Content-Type', 'application/json');
anyRequest.send();

anyRequest.addEventListener('load', () => {
    if (anyRequest.status >= 200 && anyRequest.status < 300) {
        const data = JSON.parse(anyRequest.response);
        console.log(data);
    } else {
        console.error(`Ошибка загрузки: ${anyRequest.status}`);
    }
});

anyRequest.addEventListener('error', () => {
    console.error('Произошла ошибка сети');
});