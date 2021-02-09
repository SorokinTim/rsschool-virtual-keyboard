keyboardKeyElements.forEach(item => {
  item.addEventListener('click', () => {
    if (item.firstChild.data.trim() != "") {
      insertText(item.firstChild.data);
      playAudio(keyPressAudio);
    }
  })
});

keyboardCapslockElement.addEventListener('click', () => {
  chageShiftState();
  updateShiftState();
  activateElement(keyboardCapslockElement);
  playAudio(shiftAudio);
})

keyboardInputElement.addEventListener('click', () => {
  keyboardElement.classList.remove("keyboard--hidden");
})

keyboardSubmitElement.addEventListener('click', () => {
  keyboardElement.classList.add("keyboard--hidden");
})

keyboardSpaceElement.addEventListener('click', () => {
  insertText(" ");
  playAudio(spaceAudio);
})

keyboardBackspaceElement.addEventListener('click', () => {
  removeText();
  playAudio(backspaceAudio);
})

keyboardReturnElement.addEventListener('click', () => {
  insertText("\n");
  playAudio(enterAudio);
})

keyboardSoundElement.addEventListener('click', () => {
  getAlternativeValues(keyboardSoundElement.firstElementChild, "data-alternative-icon-name");
})

keyboardTranslateElement.addEventListener('click', () => {
  // change numbers to alternative values
  keyboardNumberElements.forEach(elem => {
    changeAlternativeNumberValues(elem);
    changeAudio(keyPressAudio);
  });

  // change letters to alternative language values
  keyboardAltLangElements.forEach(elem => {
    getAlternativeValues(elem, "data-alternative-lang");
  });

  // change rec language
  changeRecognitionLang();
})

keyboardRecElement.addEventListener('click', () => {
  getAlternativeValues(keyboardRecElement.firstElementChild, "data-alternative-icon-name");
  playRecognition(recognizer);
});

recognizer.addEventListener("result", function(e) {

    let text = Array.from(e.results)
    .map(result => result[0])
    .map(result => result.transcript)
    .join('');

    insertText(`${text} `);
});

recognizer.addEventListener("end", function(e) {
  playRecognition(recognizer);
});

keyboardArrowElements.forEach((elem, index) => {
  elem.addEventListener('click', () => changeCursorPosition(index));
});



document.onkeydown = (event) => {
  //shift
  if (event.keyCode == 16) {
    chageShiftState();
    updateShiftState();
    activateElement(keyboardShiftElement);
    keyboardNumberElements.forEach(item => {
      getAlternativeValues(item, "data-alternative-value");
    });
    makeFocusOnElem(keyboardShiftElement);
  };

  //caps
  if(event.keyCode == 20) {
    chageShiftState();
    updateShiftState();
    activateElement(keyboardCapslockElement);
    makeFocusOnElem(keyboardCapslockElement);
  };

  //backspace
  if(event.keyCode == 8) makeFocusOnElem(keyboardBackspaceElement);

  //enter
  if(event.keyCode == 13) makeFocusOnElem(keyboardReturnElement);

  //space
  if(event.keyCode == 32) makeFocusOnElem(keyboardSpaceElement);
};

document.onkeyup = (event) => {
  if (event.keyCode == 16) {
    chageShiftState();
    updateShiftState();
    activateElement(keyboardShiftElement);
    keyboardNumberElements.forEach(item => {
      getAlternativeValues(item, "data-alternative-value");
    });
  };
};

document.addEventListener('keypress', (event) => {
  // letter keyboards focus
  keyboardKeyElements.forEach(elem => {
    if (elem.innerText == event.key) {
      makeFocusOnElem(elem);
    }
  });
});

keyboardInputElement.oncontextmenu = (event) => {
  if(keyboardPopupElement.classList.contains("keyboard__popup--invisible")) {
    showPopupElement();
  } else {
    hidePopupElement();
  }
  return false;
}

keyboardCapslockElement.oncontextmenu = () => {
  chageShiftState();
  updateShiftState();
  activateElement(keyboardCapslockElement);
  keyboardNumberElements.forEach(item => {
    getAlternativeValues(item, "data-alternative-value");
  });
  makeFocusOnElem(keyboardCapslockElement);
  return false;
}

keyboardShiftElement.addEventListener("click", () => {
  chageShiftState();
  updateShiftState();
  activateElement(keyboardShiftElement);
  keyboardNumberElements.forEach(item => {
    getAlternativeValues(item, "data-alternative-value");
  });
  makeFocusOnElem(keyboardShiftElement);
  playAudio(shiftAudio);
});
