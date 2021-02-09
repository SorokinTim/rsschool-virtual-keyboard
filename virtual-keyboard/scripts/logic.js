let isShifted = false,
    isAlternate = false;


function insertText(text) {
  let startCursor = keyboardInputElement.selectionStart,
      endCursor = keyboardInputElement.selectionEnd,
      result = keyboardInputElement.value.substring(0, startCursor) + text + keyboardInputElement.value.substring(endCursor);

	keyboardInputElement.value = result;
	keyboardInputElement.focus();
	keyboardInputElement.selectionEnd = (startCursor == endCursor) ? (endCursor + text.length) : endCursor;
}

function removeText() {
  let startCursor = keyboardInputElement.selectionStart,
      endCursor = keyboardInputElement.selectionEnd,
      result = keyboardInputElement.value.substring(0, startCursor-1) + keyboardInputElement.value.substring(endCursor);

	keyboardInputElement.value = result;
	keyboardInputElement.focus();
	keyboardInputElement.selectionEnd = (startCursor == endCursor) ? (endCursor - 1) : endCursor;
}

function getAlternativeValues(elem, data) {
  let temp = elem.firstChild.data;
  elem.firstChild.data = elem.attributes[data].value;
  elem.attributes[data].value = temp;
}

function changeAlternativeNumberValues(elem) {
  let temp = elem.attributes['data-alternative-value'].value;
  elem.attributes['data-alternative-value'].value = elem.attributes['data-alternative-lang-value'].value;
  elem.attributes['data-alternative-lang-value'].value = temp;
}

function makeFocusOnElem(elem) {
  setTimeout(() => {
    elem.focus();
    setTimeout(() => keyboardInputElement.focus(), 50)
  }, 50);
}

function playAudio(audio) {
  if (keyboardSoundElement.firstElementChild.innerText == "volume_up") {
    audio.play();
    audio.currentTime = 0;
  }
}

function changeAudio(audio) {
  if (keyboardTranslateElement.lastElementChild.innerText == "EN") {
    audio.src = "./assets/sounds/tink.wav";
  } else {
    audio.src = "./assets/sounds/boom.wav";
  }
}

function changeRecognitionLang() {
  if (keyboardTranslateElement.lastElementChild.innerText == "EN") {
    recognizer.lang = "en-US";
  } else {
    recognizer.lang = "ru-RU";
  }
}

function playRecognition(rec) {
  if (keyboardRecElement.firstElementChild.innerText == "mic") {
    console.log("Recognition language is: ", rec.lang);
    rec.start();
  } else {
    rec.stop();
  }
}

function changeCursorPosition(index) {
  switch (index) {
    case 0:
      keyboardInputElement.focus();
      keyboardInputElement.selectionEnd -= getInputRows()[getSelectionPositionInRow(getInputRows(), keyboardInputElement.selectionEnd) - 1];
      keyboardInputElement.selectionStart = keyboardInputElement.selectionEnd;
      break;
    case 1:
      keyboardInputElement.focus();
      keyboardInputElement.selectionEnd--;
      break;
    case 2:
      keyboardInputElement.focus();
      keyboardInputElement.selectionStart += getInputRows()[getSelectionPositionInRow(getInputRows(), keyboardInputElement.selectionStart)];
      keyboardInputElement.selectionEnd = keyboardInputElement.selectionStart;
      break;
    case 3:
      keyboardInputElement.focus();
      keyboardInputElement.selectionStart++;
      break;

  }
}

function getInputWidth() {
  let cols = Math.floor(document.body.clientWidth*0.9/12);
  keyboardInputElement.attributes.cols.value = cols;
  return cols;
}

function getInputRows() {
  let splitedValue = keyboardInputElement.value.split(/(\s)/),
      cols = getInputWidth(),
      result = [],
      tempLen = 0;

  for(let i = 0; i < splitedValue.length;) {
    if ((tempLen + splitedValue[i].length) <= cols) {
      tempLen += splitedValue[i].length;
      i++;
      if(tempLen == cols && splitedValue[i+1] == " ") i++;
    } else {
      result.push(tempLen);
      tempLen = 0;
    }
  }
  result.push(tempLen);

  return result;
}

function getSelectionPositionInRow(rows, selection) {
  let sum = 0;

  for(let i = 0; i < rows.length; i++) {
    sum += rows[i];
    if (selection <= sum) {
      return i
    }
  }

  return result;
}

function showPopupElement() {
  keyboardPopupElement.style.top = `${event.clientY + 25}px`;
  keyboardPopupElement.style.left = `${event.clientX + 25}px`;
  keyboardPopupElement.classList.add('keyboard__popup--visible');
  keyboardPopupElement.classList.remove('keyboard__popup--invisible');
}

function hidePopupElement() {
  keyboardPopupElement.classList.add('keyboard__popup--invisible');
  keyboardPopupElement.classList.remove('keyboard__popup--visible');
}

function chageShiftState() {
  return isShifted = !isShifted;
}

function chageAlternateNumbersState() {
  return isAlternate = !isAlternate;
}

function updateShiftState() {
  if (!isShifted) {
    keyboardKeyElements.forEach(item => {
      if (item.firstChild.data.trim() != "") {
        item.firstChild.data = item.firstChild.data.toLowerCase();
      }
    });
  } else {
    keyboardKeyElements.forEach(item => {
      if (item.firstChild.data.trim() != "") {
        item.firstChild.data = item.firstChild.data.toUpperCase();
      }
    });
  }
}

function activateElement(elem) {
  if(elem.classList.contains("keyboard__key--active")) {
    elem.classList.remove("keyboard__key--active");
  } else {
    elem.classList.add("keyboard__key--active");
  }
}



// init: cols of textarea
getInputWidth();

// start observing a DOM node
const resizeObserver = new ResizeObserver(() => getInputWidth());
resizeObserver.observe(document.body)
