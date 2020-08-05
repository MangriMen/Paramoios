'use strict'

let hpFillEl = document.getElementById('hp-bar-fill').classList;
let hpWaveEl = document.getElementById('hp-liquid').classList;
let equipment = document.getElementById('equipment');
let newItemDialog = document.getElementById('new-item-dialog');
let hpDialog = document.getElementById('hp-dialog');
let selectedImageForItem = null;
let selectedItemInfo = null;
let tempFlag = 0;
let tempHp = 0;
let bufferMaxHp = 0;
let bufferHp = 0;
let isHealed = false;
document.getElementById('confirm-hp').addEventListener('click', changeHp);
document.getElementById('cancel-hp').addEventListener('click', displayHpDialog);
document.getElementById('heal').addEventListener('click', displayHpDialog);
document.getElementById('damage').addEventListener('click', displayHpDialog);
let x = 0;
let y = 0;
document.getElementById('main-dice').addEventListener('click', toggleDiceList);
let mainDiceImg = document.getElementById('main-dice-img');
let diceList = document.getElementById('dice-list');
let xpField = document.getElementById('xp');
let numberFields = document.getElementsByClassName('number-input');
for (let item of numberFields) {
  item.addEventListener('keydown', numberCheck);
}
let textsAutoWidth = document.getElementsByClassName('text-auto-width');
for (let item of textsAutoWidth) {
  item.addEventListener('keydown', autoWidth);
  item.dispatchEvent(new Event('keydown'));
}

function displayHpDialog() {
  if (getComputedStyle(hpDialog).display == 'none') {
    if (this.id == 'heal') {
      document.getElementById('hp-header').textContent = 'Восстановить:';
      isHealed = 1;
    } else {
      document.getElementById('hp-header').textContent = 'Нанести урон:';
      isHealed = 0;
    }
    document.getElementById('hp-value').value = 1;
    hpDialog.style.display = 'block';
  } else {
    hpDialog.style.display = 'none';
  }
}

function changeHp() {
  let oldHp = (document.getElementById('hp').textContent).split('/');
  let actualHp = Number(oldHp[0]);
  let maxHp = Number(oldHp[1]);
  let offsetHp = Math.abs(Number(document.getElementById('hp-value').value));// Math.abs(Number(prompt('Введите необходимое количество:','0')));
  let newHp = 0;
  let final = '';

  if (!Number(offsetHp)) { return; }

  offsetHp = !isHealed ? -offsetHp : offsetHp;
  newHp = actualHp + offsetHp;
  
  newHp = hpValidation(newHp, maxHp);

  final = newHp + '/' + maxHp;

  document.getElementById('hp').textContent = final;
  changeBarWidth(newHp, maxHp, 'hp');
}

function temporaryChange() {
  let hpField = (document.getElementById('hp').textContent).split('/');
  hpField[0] = Number(hpField[0]);
  hpField[1] = Number(hpField[1]);

  if (!tempFlag) {
    bufferHp = hpField[0];
    bufferMaxHp = hpField[1];
    tempFlag = prompt('Введите 1 для изменения текущего здоровья, 2 - для максимального:','0');
    tempHp = Number(prompt('Введите количество:'));

    if (tempFlag == 1) {
      hpField[0] = tempHp;
      hpFillEl.add('hp-temp-color');
      hpWaveEl.add('hp-temp-color');
    } else if (tempFlag == 2) {
      hpField[1] = tempHp;
      hpFillEl.add('max-hp-temp-color');
      hpWaveEl.add('max-hp-temp-color');
    } else {
      return;
    }
    hpField[0] = hpValidation(hpField[0], hpField[1]);
  } else {
    hpField[1] = bufferMaxHp;
    hpField[0] = hpValidation((tempFlag != 2 ? bufferHp : hpField[0]), hpField[1]);
    hpFillEl.remove('max-hp-temp-color');
    hpWaveEl.remove('max-hp-temp-color');
    hpFillEl.remove('hp-temp-color');
    hpWaveEl.remove('hp-temp-color');
    tempFlag = 0;
  }

  document.getElementById('hp').textContent = hpField[0] + '/' + hpField[1];
  changeBarWidth(hpField[0], hpField[1], 'hp');
}

function hpValidation(actual, maximum) {
  if ((tempFlag != 1) && (actual > maximum)) {
    actual = maximum;
  } else if (actual < 0) {
    actual = 0;
  }

  return actual;
}

function onloadBarWidth(spanId) {
  let actualValue = 0;
  let maxValue = 0;
  if (spanId == 'hp') {
    let value = (document.getElementById('hp').textContent).split('/');
    actualValue = Number(value[0]);
    maxValue = Number(value[1]);
  }
  if (spanId == 'xp') {
    actualValue = Number(document.getElementById('xp').textContent);
    maxValue = Number(document.getElementById('xp').getAttribute('data-level'));
  }

  changeBarWidth(actualValue, maxValue, spanId);
}

function changeBarWidth(newValue, maxValue, spanId) {
  let maxWidth = document.getElementById(spanId + '-bar').offsetWidth;
  let newWidth = (newValue / maxValue) * maxWidth;
  document.getElementById(spanId + '-bar-fill').style.width = !newWidth ? 0 : (newWidth - 6) + 'px';
}

let timerXp = null;
xpField.onkeydown = function() {
  clearTimeout(timerXp);
  timerXp = setTimeout(function() {
    adjustLevel();
  }, 500);
}

let timerNumberFields = null;
function numberCheck() {
  let el = this;
  clearTimeout(timerNumberFields);
  timerNumberFields = setTimeout(function() {
    if (el.value == '') {
      el.value = '0';
    }
  }, 500);
}

let timerAutoWidth = null;
function autoWidth() {
  let fontSize = parseInt(getComputedStyle(this).fontSize) / 2;
  this.style.width = ((this.value.length + 1) * fontSize + 'px');
}

function adjustLevel() {
  let levelDependenceTable = {
    1: 0,
    2: 300,
    3: 900,
    4: 2700,
    5: 6500,
    6: 14000,
    7: 23000,
    8: 34000,
    9: 48000,
    10: 64000,
    11: 85000,
    12: 100000,
    13: 120000,
    14: 140000,
    15: 165000,
    16: 195000,
    17: 225000,
    18: 265000,
    19: 305000,
    20: 355000
  }
  let level = 0;
  let xp = Number(document.getElementById('xp').value);
  while ((level < Object.keys(levelDependenceTable).length) && (xp >= levelDependenceTable[level + 1])) {
    level += 1;
  }
  document.getElementById('level').textContent = level;
}

function displayNewItemDialog() {
  if (getComputedStyle(newItemDialog).display == 'none') {
    newItemDialog.style.display = 'block';
  } else {
    return;
  }
  document.getElementById('item-name').value = null;
  let pts = "images/items/"
  let itemsImgSrcs = [pts+"axe.svg", pts+"rope.svg", pts+"shield.svg", pts+"sword.svg"];
  let imageSelect = document.getElementById('image-select');
  while (imageSelect.firstChild) {
    imageSelect.removeChild(imageSelect.firstChild);
  }
  for (let i = 0; i < itemsImgSrcs.length; i++) {
    let itemImg = document.createElement("img");
    itemImg.src = itemsImgSrcs[i];
    itemImg.classList.add("image-select-button", "border-style", "border-radius", "default-background");
    itemImg.addEventListener("click", selectImageToItem);
    if (i == 0) { selectedImageForItem = itemImg; selectedImageForItem.classList.add("image-selected"); };
    document.getElementById('image-select').appendChild(itemImg);
  }
}

function addNewItemToInventory(isConfirm) {
  if(!isConfirm) {
    newItemDialog.style.display = 'none';
    return;
  } else {
    let newItem = document.createElement("img");
    newItem.src = selectedImageForItem.src;
    newItem.classList.add("item", "default-background", "border-style", "border-radius");
    newItem.addEventListener("click", openItemAdditionalInfo);
    newItem.value = document.getElementById('item-name').value;
    equipment.appendChild(newItem);
    newItemDialog.style.display = 'none';
  }
}

function selectImageToItem() {
  if (selectedImageForItem != this) {
    if (selectedImageForItem != null) {
      selectedImageForItem.classList.remove("image-selected");
    }
    this.classList.add("image-selected");
    selectedImageForItem = this;
  }
}

function getCoords(elem) {
  var box = elem.getBoundingClientRect();
  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };
}

equipment.onmousedown = getMouseCoord;
function getMouseCoord(e) {
  var m = getCoords(this);
  x = e.pageX - m.left;
  y = e.pageY - m.top;
}

function openItemAdditionalInfo() {
  let isItemAdditional = document.getElementById("item-additional");
  if (selectedItemInfo != this) {
    if(isItemAdditional != null) {
      closeAdditionalInfo();
    }
    createAdditionalInfo(this);
  } else {
    isItemAdditional != null ? closeAdditionalInfo() : createAdditionalInfo(this);
  }
  selectedItemInfo = this;
}

function createAdditionalInfo(item) {
  let itemAdditional = document.createElement("div");
  let itemDisplayName = document.createElement("input");
  let itemAdditionalClose = document.createElement("button");
  let itemAdditionalCloseImg = document.createElement("img");

  itemAdditional.id = "item-additional";
  
  itemDisplayName.classList.add("border-style", "border-radius", "default-background", "default-hover-active", "default-button", "input-font-style");
  itemDisplayName.id = "item-display-name";
  itemDisplayName.type = "text";
  itemDisplayName.value = item.value;
  itemDisplayName.readOnly = true;

  itemAdditionalClose.id = "item-additional-close";
  itemAdditionalClose.classList = "border-style border-radius default-background default-hover-active default-button input-font-style";
  itemAdditionalClose.addEventListener("click", closeAdditionalInfo);

  itemAdditionalCloseImg.id = "item-additional-close-img";
  itemAdditionalCloseImg.src = "images/icons/control_icon/close.svg";

  itemAdditionalClose.appendChild(itemAdditionalCloseImg);

  itemAdditional.appendChild(itemDisplayName);
  itemAdditional.appendChild(itemAdditionalClose);

  equipment.appendChild(itemAdditional);
  itemAdditional.style.left = x + "px";
  itemAdditional.style.top = y + "px";
}

function closeAdditionalInfo() {
  let itemAdditional = document.getElementById("item-additional");
  if (itemAdditional != null) {
    equipment.removeChild(itemAdditional);
  }
}

function toggleDiceList() {
  if (getComputedStyle(diceList).display == "none") {
    diceList.style.display = "flex";
    mainDiceImg.src = "images/icons/control_icon/close.svg";
  } else {
    diceList.style.display = "none";
    mainDiceImg.src = "images/buttons/dices/D20.svg";
  }
}