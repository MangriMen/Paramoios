'use strict'

let hpFillEl = document.getElementById('hp-bar-fill').classList;
let hpWaveEl = document.getElementById('hp-liquid').classList;
let equipment = document.getElementById('equipment');
let equipmentBox = document.getElementById('equipment-box');
let newItemDialog = document.getElementById('new-item-dialog');
let hpDialog = document.getElementById('hp-dialog');
let deathSavesOverlay = document.getElementById('death-saves-overlay');
let successMarks = [document.getElementById('success-mark-1'), document.getElementById('success-mark-2'), document.getElementById('success-mark-3')];
let failuresMarks = [document.getElementById('fail-mark-1'), document.getElementById('fail-mark-2'), document.getElementById('fail-mark-3')];
let selectedImageForItem = null;
let selectedItemInfo = null;
let tempFlag = 0;
let tempHp = 0;
let bufferMaxHp = 0;
let bufferHp = 0;
let isHealed = false;
document.getElementById('confirm-hp').addEventListener('click', changeHp);
document.getElementById('cancel-hp').addEventListener('click', displayHpDialog);
document.getElementById('damage').addEventListener('click', displayHpDialog);
document.getElementById('temp').addEventListener('click', displayHpDialog);
document.getElementById('heal').addEventListener('click', displayHpDialog);
document.getElementById('new-item').addEventListener('click', displayNewItemDialog);
document.getElementById('cancel-item').addEventListener('click', addNewItemToInventory);
document.getElementById('confirm-item').addEventListener('click', addNewItemToInventory);
document.getElementById('death-saves-dice').addEventListener('click', rollDeathSave);
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
let labelsAutoWidth = document.getElementsByClassName('label-auto-width');
for (let item of labelsAutoWidth) {
  labelAutoWidth(item);
}

let beautifulAlertContainer = document.createElement('div');
beautifulAlertContainer.id = 'beautiful-container';
document.body.appendChild(beautifulAlertContainer);
let beautifulAlertList = [];

let rollAlertContainer = document.createElement('div');
rollAlertContainer.id = 'roll-alert';
document.body.appendChild(rollAlertContainer);
let rollAlertList = [];

function rollAlert(rollNum = 17, text = 'На кубике выпало:') {
  let rollAlertMsg = document.createElement('div');
  rollAlertMsg.classList = 'roll-alert-msg default-background border-style border-radius default-shadow';

  let rollAlertText = document.createElement('span');
  rollAlertText.classList = 'roll-alert-msg-text';
  rollAlertText.textContent = text;

  let rollAlertNumber = document.createElement('span');
  rollAlertNumber.classList = 'roll-alert-msg-number';
  rollAlertNumber.textContent = rollNum;

  rollAlertMsg.appendChild(rollAlertText);
  rollAlertMsg.appendChild(rollAlertNumber);

  rollAlertList.push(rollAlertMsg);
  setTimeout(rollAlertErase, 2400);
  rollAlertContainer.appendChild(rollAlertMsg);
}

function rollAlertErase() {
  let tempRollMsg = rollAlertList.shift();

  tempRollMsg.classList.add('roll-alert-erase-translate');
  
  setTimeout(function() { rollAlertContainer.removeChild(rollAlertContainer.firstChild); }, 1000);
}

function createBAlert(text, delay) {
  let beautifulAlert = document.createElement('span');
  beautifulAlert.classList.add('beautiful-alert');
  beautifulAlert.textContent = text;
  beautifulAlert.dataset.delay = delay;
  beautifulAlertList.push(beautifulAlert);
  return beautifulAlert;
}

function bAlert(text, delay = 3000) {
  beautifulAlertContainer.appendChild(createBAlert(text, delay));
  if (beautifulAlertContainer.childElementCount > 1) { return; }
  let beautifulTimer = setTimeout(function bAlertHide() {
    if (beautifulAlertContainer.childElementCount == 0) {
      return;
    } else {
      setTimeout(function () { beautifulAlertContainer.removeChild(beautifulAlertContainer.lastChild) }, 1000);
      beautifulAlertContainer.lastChild.classList.add('beautiful-alert-erase-translate');
      beautifulTimer = setTimeout(bAlertHide, beautifulAlertContainer.lastChild.dataset.delay);
    }
  }, delay);
}

const levelDependenceTable = {
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

function displayHpDialog() {
  if (getComputedStyle(hpDialog).display == 'none') {
    if (this.id == 'heal') {
      document.getElementById('hp-header').textContent = 'Восстановить:';
      isHealed = 1;
    } else if (this.id == 'damage') {
      document.getElementById('hp-header').textContent = 'Нанести урон:';
      isHealed = 0;
    } else {
      document.getElementById('hp-header').textContent = 'Изменить здоровье';
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
  let offsetHp = Math.abs(Number(document.getElementById('hp-value').value));
  let newHp = 0;
  let final = '';

  if (isNaN(offsetHp)) { return; }

  offsetHp = !isHealed ? -offsetHp : offsetHp;
  newHp = actualHp + offsetHp;

  newHp = hpValidation(newHp, maxHp);

  if (newHp == 0) { deathSavesOverlay.style.display = 'flex'; }

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
    tempFlag = prompt('Введите 1 для изменения текущего здоровья, 2 - для максимального:', '0');
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

let successMarkCount = 1;
let failsMarkCount = 1;

function rollDeathSave() {
  if (failsMarkCount >= 3 || successMarkCount >= 3) {
    rollDeathSaveClear();
    return;
  }
  
  let rollResult = Math.floor(Math.random() * 20 + 1);

  rollAlert(rollResult, 'На D20 выпало:');

  if (rollResult  < 10) {
    document.getElementById(`fail-mark-${failsMarkCount}`).src = 'images/icons/failures_mark_checked.svg';
    failsMarkCount += 1;
  } else if (rollResult >= 20) {
    rollDeathSaveClear(true);
    isHealed = true;
    changeHp();
    isHealed = false;
    return;
  } else {
    document.getElementById(`success-mark-${successMarkCount}`).src = 'images/icons/success_mark_checked.svg';
    successMarkCount += 1;
  }

  document.getElementById('death-saves-heart').style.backgroundColor = 'hsl(357,' + (successMarkCount - failsMarkCount + 2) / 4 * 100 + '%, 40%)';
}

function rollDeathSaveClear(isTwenty) {
  if (failsMarkCount >= 3) {
    bAlert('Вы умерли.', 5000);
  } else if (successMarkCount >= 3) {
    bAlert('Вы живы!', 5000);
  } else if (isTwenty) {
    bAlert('Да вы счастливчик! На D20 выпало: 20!', 8000);
  }
  successMarkCount = 1;
  failsMarkCount = 1;
  successMarks.forEach(mark => mark.src = 'images/icons/success_mark.svg');
  failuresMarks.forEach(mark => mark.src = 'images/icons/failures_mark.svg');
  deathSavesOverlay.style.display = 'none';
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
    actualValue = Number(document.getElementById('xp').value);
    let nextLevel = Number(document.getElementById('level').textContent);
    let minValue = levelDependenceTable[nextLevel < Object.keys(levelDependenceTable).length ? nextLevel : 20];
    maxValue = levelDependenceTable[nextLevel + 1 < Object.keys(levelDependenceTable).length ? nextLevel + 1 : 20];
    actualValue -= minValue;
    maxValue -= minValue;
  }

  changeBarWidth(actualValue, maxValue, spanId);
}

function changeBarWidth(newValue, maxValue, spanId) {
  let maxWidth = document.getElementById(spanId + '-bar').offsetWidth;
  let newWidth = (newValue / maxValue) * maxWidth;
  document.getElementById(spanId + '-bar-fill').style.width = !newWidth ? 0 : (newWidth - 6) + 'px';
}

let timerXp = null;
xpField.onkeydown = function () {
  clearTimeout(timerXp);
  timerXp = setTimeout(function () {
    adjustLevel();
    onloadBarWidth('xp');
  }, 500);
}

let timerNumberFields = null;
function numberCheck() {
  let el = this;
  clearTimeout(timerNumberFields);
  timerNumberFields = setTimeout(function () {
    if (el.value == '') {
      el.value = '0';
    }
  }, 500);
}

function autoWidth() {
  let fontSize = parseInt(getComputedStyle(this).fontSize) / 2;
  this.style.width = ((this.value.length + 2) * fontSize + 'px');
}

function labelAutoWidth(element) {
  let fontSize = parseInt(getComputedStyle(element).fontSize) / 2;
  element.style.width = ((element.textContent.length + 1) * fontSize + 'px');
}

function adjustLevel() {
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
  let itemsImgSrcs = [pts + "axe.svg", pts + "rope.svg", pts + "shield.svg", pts + "sword.svg", pts + "traveler_pack.svg"];
  let imageSelect = document.getElementById('image-select');
  while (imageSelect.firstChild) {
    imageSelect.removeChild(imageSelect.firstChild);
  }
  for (let i = 0; i < itemsImgSrcs.length; i++) {
    let itemImg = document.createElement("img");
    itemImg.src = itemsImgSrcs[i];
    itemImg.classList.add("image-select-button", "border-style", "border-radius", "default-background");
    itemImg.addEventListener("click", selectImageToItem);
    if (i == 0) { selectedImageForItem = itemImg; selectedImageForItem.classList.add("image-selected"); }
    document.getElementById('image-select').appendChild(itemImg);
  }
}

function addNewItemToInventory() {
  if (this.id == 'confirm-item') {
    let newItem = document.createElement("img");
    newItem.src = selectedImageForItem.src;
    newItem.classList.add("item", "default-background", "border-style", "border-radius");
    newItem.addEventListener("click", openItemAdditionalInfo);
    newItem.value = document.getElementById('item-name').value;
    if (newItem.value == '') {
      bAlert('Введите название предмета!' + Math.random(), 3000);
      newItem.style.display='none';
      newItem = null;
      return;
    }
    equipment.appendChild(newItem);
    newItemDialog.style.display = 'none';
  } else {
    newItemDialog.style.display = 'none';
    return;
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

equipmentBox.onmousedown = getMouseCoord;
function getMouseCoord(e) {
  var m = getCoords(this);
  x = e.pageX - m.left;
  y = e.pageY - m.top;
}

function openItemAdditionalInfo() {
  let isItemAdditional = document.getElementById("item-additional");
  if (selectedItemInfo != this) {
    if (isItemAdditional != null) {
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

  equipmentBox.appendChild(itemAdditional);
  itemAdditional.style.left = x + "px";
  itemAdditional.style.top = y + "px";
}

function closeAdditionalInfo() {
  let itemAdditional = document.getElementById("item-additional");
  if (itemAdditional != null) {
    equipmentBox.removeChild(itemAdditional);
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