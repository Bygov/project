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
const maxPosition = 448;

const moveBlock = () => {
  if (positionX < maxPosition) {
    positionX++;
    childBlock.style.left = `${positionX}px`;

    requestAnimationFrame(moveBlock);
  }
};

moveBlock();