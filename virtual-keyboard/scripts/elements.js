// DOM Elements
const keyboardKeyElements = document.querySelectorAll('.keyboard__key'),
      keyboardElement = document.querySelector('.keyboard'),
      keyboardInputElement = document.querySelector('.use-keyboard-input'),
      keyboardPopupElement = document.querySelector('.keyboard__popup'),
      keyboardArrowElements = document.querySelectorAll('.keyboard__key--popup'),
      keyboardSubmitElement = document.querySelector('#submit'),
      keyboardCapslockElement = document.querySelector('#key-caps'),
      keyboardShiftElement = document.querySelector('#key-shift'),
      keyboardSpaceElement = document.querySelector("#key-space"),
      keyboardBackspaceElement = document.querySelector("#key-back"),
      keyboardReturnElement = document.querySelector("#key-return"),
      keyboardSoundElement = document.querySelector("#key-sound"),
      keyboardRecElement = document.querySelector("#key-rec"),
      keyboardTranslateElement = document.querySelector("#translate"),
      keyboardNumberElements = document.querySelectorAll("[data-alternative-value]"),
      keyboardAltLangElements = document.querySelectorAll("[data-alternative-lang]");


// Audio elements
const keyPressAudio = new Audio('./assets/sounds/boom.wav'),
      enterAudio = new Audio('./assets/sounds/tom.wav'),
      spaceAudio = new Audio('./assets/sounds/ride.wav'),
      backspaceAudio = new Audio('./assets/sounds/snare.wav'),
      shiftAudio = new Audio('./assets/sounds/hihat.wav');

// Speech element init
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognizer = new SpeechRecognition();
recognizer.lang = "en-US";
