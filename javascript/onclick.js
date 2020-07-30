'use strict'

let hpFillEl = document.getElementById('hp-bar-fill').classList;
let hpWaveEl = document.getElementById('hp-liquid').classList;
let inventory = document.getElementById('equipment');
let newItemDialog = document.getElementById('new-item-dialog');
let hpDialog = document.getElementById('hp-dialog');
let selectedImageForItem = null;
let tempFlag = 0;
let tempHp = 0;
let bufferMaxHp = 0;
let bufferHp = 0;
let isHealed = false;
document.getElementById('confirm-hp').addEventListener('click', changeHp);
document.getElementById('cancel-hp').addEventListener('click', displayHpDialog);
document.getElementById('heal').addEventListener('click', displayHpDialog);
document.getElementById('damage').addEventListener('click', displayHpDialog);

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
  let level = Number(document.getElementById('level').textContent);
  let xp = Number(document.getElementById('xp').textContent);
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
  let pts = "images/items/"
  let itemsImgSrcs = [pts+"axe.svg", pts+"rope.svg", pts+"shield.svg", pts+"sword.svg"];
  while (document.getElementById('image-select').firstChild) {
    document.getElementById('image-select').removeChild(element.firstChild);
  }
  for (let i = 0; i < itemsImgSrcs.length; i++) {
    let itemImg = document.createElement("img");
    itemImg.src = itemsImgSrcs[i];
    itemImg.classList.add("image-select-button", "border-style", "border-radius", "default-background");
    itemImg.addEventListener("click", selectImageToItem);
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
    inventory.appendChild(newItem);
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

function openItemAdditionalInfo() {
  let isItemAdditional = document.getElementById("item-additional");
  if(isItemAdditional == null) {
    let itemAdditional = document.createElement("div");
    let itemDisplayName = document.createElement("input");
    let itemAdditionalClose = document.createElement("button");
    let itemAdditionalCloseImg = document.createElement("img");
  
    itemAdditional.id = "item-additional";
    
    itemDisplayName.classList.add("border-style", "border-radius", "default-background", "default-hover-active", "default-button", "input-font-style");
    itemDisplayName.id = "item-display-name";
    itemDisplayName.type = "text";
    itemDisplayName.value = this.value;
    itemDisplayName.readOnly = true;
  
    itemAdditionalClose.id = "item-additional-close";
    itemAdditionalClose.classList = "border-style border-radius default-background default-hover-active default-button input-font-style";
    itemAdditionalClose.addEventListener("click", closeAdditionalInfo);
  
    itemAdditionalCloseImg.id = "item-additional-close-img";
    itemAdditionalCloseImg.src = "images/icons/control_icon/close.svg";
  
    itemAdditionalClose.appendChild(itemAdditionalCloseImg);
  
    itemAdditional.appendChild(itemDisplayName);
    itemAdditional.appendChild(itemAdditionalClose);
  
    inventory.appendChild(itemAdditional);
  }
}

function closeAdditionalInfo() {
  let itemAdditional = document.getElementById("item-additional");
  if (itemAdditional != null) {
    inventory.removeChild(itemAdditional);
  }
}