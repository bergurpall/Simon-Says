let buttonOrder = [];
let userInput = [];
const synth = new Tone.Synth().toDestination();
setupPadListeners()

const setupPadListeners = () => {
    for (let i = 1; i <= 4; i++) {
      const padElement = document.getElementById(padMap[i]);
      padElement.addEventListener("click", () => button_pressed(i));
    }
  };

const padMap = {
    1: "pad-red",
    2: "pad-yellow",
    3: "pad-green",
    4: "pad-blue"
  };

// Random number generator between 1-4 to choose next button in order
const random_num = () => {
    const min = 1;
    const max = 4;
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return button_append(num);
  };

// Function to append the chosen button to the list of the order of the buttons
const button_append = (num) => {
    if (num === 1) {
      buttonOrder.push(1);
    } else if (num === 2) {
      buttonOrder.push(2);
    } else if (num === 3) {
      buttonOrder.push(3);
    } else if (num === 4) {
      buttonOrder.push(4);
    }
  };
  
const list_iterate = (num, index) => {
    setTimeout(() => {
    const button = document.getElementById(padMap(num));
    button.classList.add("active");
    play_note(num);
    setTimeout(() => {
    button.classList.remove("active");
      }, 500);
    }, index * 1000);
  };
  
const play_note = (num) => {
    if (num === 1) {
      synth.triggerAttackRelease("C4", "8n");
    } else if (num === 2) {
      synth.triggerAttackRelease("D4", "8n");
    } else if (num === 3) {
      synth.triggerAttackRelease("E4", "8n");
    } else if (num === 4) {
      synth.triggerAttackRelease("F4", "8n");
    }
  };

const button_pressed = (num) => {
    userInput.push(num);
    play_note(num);
    const button = document.getElementById(padMap[num]);
    button.classList.add("active");
    setTimeout(() => {
      button.classList.remove("active");
    }, 300);
    if (userInput.length === buttonOrder.length) {
      checkSequence();
    }
  };

const checkSequence = () => {
    let isCorrect = true;
    for (let i = 0; i < buttonOrder.length; i++) {
      if (userInput[i] !== buttonOrder[i]) {
        isCorrect = false;
        break;
      }
    }
    if (isCorrect) {
      console.log("Correct sequence!");
      userInput = [];
      random_num();
      buttonOrder.forEach(list_iterate);
    } else {
      console.log("Wrong sequence. Game Over or retry logic here.");
    }
  };

const main = () => {
    random_num();
    buttonOrder.forEach(list_iterate);

  };
// þarf function til að: gera lista af inputs, taka öll inputs úr listanum fyrir næsta attempt