'use strict'

let language = 'ru';
let selectedVocabulary = null;

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

let character = null;
let characterInput = document.getElementById('character-input')

let playerName = document.getElementById('player-name');
let characterName = document.getElementById('character-name');
let characterAlignment = document.getElementById('character-alignment');
let characterRace = document.getElementById('character-race');
let characterClass = document.getElementById('character-class');
let characterBackground = document.getElementById('character-background');
let characterStats = document.getElementById('character-stats');
let characterSkills = document.getElementById('skills');

let equipment = document.getElementById('equipment');
let equipmentBox = document.getElementById('equipment-box');
let newItemDialog = document.getElementById('new-item-dialog');
let hpDialog = document.getElementById('hp-dialog');
let tempHpDialog = document.getElementById('temp-hp-dialog');
let deathSavesOverlay = document.getElementById('death-saves-overlay');
let successMarks = [document.getElementById('success-mark-1'), document.getElementById('success-mark-2'), document.getElementById('success-mark-3')];
let failuresMarks = [document.getElementById('fail-mark-1'), document.getElementById('fail-mark-2'), document.getElementById('fail-mark-3')];

let selectedImageForItem = null;
let selectedItemInfo = null;
let profinciesParent = null;
let defaultCharacteristicCheckboxClasses = 'characteristic-death-save-checkbox border-style';

let hpFillEl = document.getElementById('hp-bar-fill').classList;
let hpWaveEl = document.getElementById('hp-liquid').classList;
let oldHp = (document.getElementById('hp').textContent).split('/');
let currentHp = Number(oldHp[0]);
let maxHp = Number(oldHp[1]);
let isHealed = false;
let isTemp = false;
let tempSwitch = false;
let tempType = '';
let bufferMaxHp = 0;
let bufferHp = 0;

document.getElementById('damage').addEventListener('click', displayHpDialog);
document.getElementById('heal').addEventListener('click', displayHpDialog);
document.getElementById('cancel-hp').addEventListener('click', displayHpDialog);
document.getElementById('current-hp').addEventListener('click', displayHpDialog);
document.getElementById('max-hp').addEventListener('click', displayHpDialog);
document.getElementById('cancel-temp-hp').addEventListener('click', displayTempHpDialog);
document.getElementById('temp').addEventListener('click', changeTempHp);
document.getElementById('confirm-hp').addEventListener('click', () => { if (isTemp) { tempSwitch = !tempSwitch; } changeHp(); });

document.getElementById('new-item').addEventListener('click', displayNewItemDialog);
document.getElementById('cancel-item').addEventListener('click', addNewItemToInventory);
document.getElementById('confirm-item').addEventListener('click', addNewItemToInventory);

document.getElementById('death-saves-dice').addEventListener('click', rollDeathSave);
document.getElementById('d20-dice').addEventListener('click', () => { let rolled = rollDice(20); rollAlert(rolled.value, `На D${rolled.type} выпало:`) });
document.getElementById('d12-dice').addEventListener('click', () => { let rolled = rollDice(12); rollAlert(rolled.value, `На D${rolled.type} выпало:`) });
document.getElementById('d100-dice').addEventListener('click', () => { let rolled = rollDice(100); rollAlert(rolled.value, `На D${rolled.type} выпало:`) });
document.getElementById('d10-dice').addEventListener('click', () => { let rolled = rollDice(10); rollAlert(rolled.value, `На D${rolled.type} выпало:`) });
document.getElementById('d8-dice').addEventListener('click', () => { let rolled = rollDice(8); rollAlert(rolled.value, `На D${rolled.type} выпало:`) });
document.getElementById('d6-dice').addEventListener('click', () => { let rolled = rollDice(6); rollAlert(rolled.value, `На D${rolled.type} выпало:`) });
document.getElementById('d4-dice').addEventListener('click', () => { let rolled = rollDice(4); rollAlert(rolled.value, `На D${rolled.type} выпало:`) });

document.getElementById('strength-death-save-checkbox').addEventListener('click', characteristicCheckBoxDropDown);
document.getElementById('dexterity-death-save-checkbox').addEventListener('click', characteristicCheckBoxDropDown);
document.getElementById('constitution-death-save-checkbox').addEventListener('click', characteristicCheckBoxDropDown);
document.getElementById('intelligence-death-save-checkbox').addEventListener('click', characteristicCheckBoxDropDown);
document.getElementById('wisdom-death-save-checkbox').addEventListener('click', characteristicCheckBoxDropDown);
document.getElementById('charisma-death-save-checkbox').addEventListener('click', characteristicCheckBoxDropDown);

document.getElementById('open-character').addEventListener('click', openCharacter);
document.getElementById('save-character').addEventListener('click', saveAndDownloadCharacter);

characterStats.querySelectorAll('div.characteristic').forEach(
  statsBox => {
    let timerCharacteristics = null;
    statsBox.querySelector('#' + statsBox.id + '-value').onkeydown = function () {
      let el = this;
      clearTimeout(timerCharacteristics);
      timerCharacteristics = setTimeout(function () {
        if (el.value == '') {
          el.value = '0';
        }
        updateBonus();
      }, 500);
    }
  });

let x = 0;
let y = 0;
document.getElementById('main-dice').addEventListener('click', toggleDiceList);
let mainDiceImg = document.getElementById('main-dice-img');
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
  setTimeout(rollAlertErase, 3400);
  rollAlertContainer.appendChild(rollAlertMsg);
}

function rollAlertErase() {
  let tempRollMsg = rollAlertList.shift();

  tempRollMsg.classList.add('roll-alert-erase-translate');

  setTimeout(function () { rollAlertContainer.removeChild(rollAlertContainer.firstChild); }, 1000);
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

function displayHpDialog() {
  if (getComputedStyle(hpDialog).display == 'none') {
    if (this.id == 'heal') {
      document.getElementById('hp-header').textContent = 'Восстановить:';
      isHealed = true;
      isTemp = false;
    } else if (this.id == 'damage') {
      document.getElementById('hp-header').textContent = 'Нанести урон:';
      isHealed = false;
      isTemp = false;
    } else {
      tempType = this.id;
      displayTempHpDialog();
      document.getElementById('hp-header').textContent = 'Изменить здоровье';
    }
    document.getElementById('hp-value').value = 1;
    hpDialog.style.display = 'block';
  } else {
    hpDialog.style.display = 'none';
  }
}

function displayTempHpDialog() {
  if (getComputedStyle(tempHpDialog).display == 'none') {
    tempHpDialog.style.display = 'block';
  } else {
    tempHpDialog.style.display = 'none';
  }
}

function getHp() {
  oldHp = (document.getElementById('hp').textContent).split('/');
  currentHp = Number(oldHp[0]);
  maxHp = Number(oldHp[1]);
}

function changeHp() {
  getHp();
  let offsetHp = Math.abs(Number(document.getElementById('hp-value').value));
  let newHp = 0;

  if (isNaN(offsetHp)) { return; }

  if (isTemp) {
    if (tempType == 'current-hp') {
      newHp = hpValidation(offsetHp, maxHp);
    } else {
      maxHp = offsetHp;
      newHp = hpValidation(currentHp, maxHp);
      bufferHp = newHp;
    }
    tempHpColorChange();
  } else {
    offsetHp = !isHealed ? -offsetHp : offsetHp;
    newHp = currentHp + offsetHp;
    newHp = hpValidation(newHp, maxHp);
  }

  if (newHp == 0) {
    hpDialog.style.display = 'none';
    deathSavesOverlay.style.display = 'flex';
  }

  document.getElementById('hp').textContent = newHp + '/' + maxHp;
  changeBarWidth(newHp, maxHp, 'hp');
}

function changeTempHp() {
  getHp();
  if (!tempSwitch) {
    isTemp = true;
    bufferHp = currentHp;
    bufferMaxHp = maxHp;
    displayTempHpDialog();
  } else {
    isTemp = false;
    currentHp = tempType == 'current-hp' ? bufferHp : currentHp;
    maxHp = bufferMaxHp;
    currentHp = hpValidation(currentHp, maxHp);
    tempHpColorChange();
  }
  document.getElementById('hp').textContent = currentHp + '/' + maxHp;
  changeBarWidth(currentHp, maxHp, 'hp');
  tempSwitch = false;
}

function tempHpColorChange() {
  if (isTemp) {
    if (tempType == 'current-hp') {
      hpFillEl.add('hp-temp-color');
      hpWaveEl.add('hp-temp-color');
    } else if (tempType == 'max-hp') {
      hpFillEl.add('max-hp-temp-color');
      hpWaveEl.add('max-hp-temp-color');
    }
    return;
  } else {
    hpFillEl.remove('max-hp-temp-color');
    hpWaveEl.remove('max-hp-temp-color');
    hpFillEl.remove('hp-temp-color');
    hpWaveEl.remove('hp-temp-color');
  }
}

function hpValidation(actual, maximum) {
  if (actual > maximum) {
    actual = maximum;
  } else if (actual < 0) {
    actual = 0;
  }
  return actual;
}

let successMarkCount = 0;
let failsMarkCount = 0;

function rollDice(diceType) {
  return {
    value: Math.floor(Math.random() * diceType + 1),
    type: diceType
  }
}

function rollDeathSave() {
  let rollResult = rollDice(20).value;

  rollAlert(rollResult, 'На D20 выпало:');

  console.log('At start | Fails: ' + failsMarkCount + '  Success: ' + successMarkCount);

  if (rollResult < 10) {
    document.getElementById(`fail-mark-${failsMarkCount + 1}`).src = 'images/icons/failures_mark_checked.svg';
    failsMarkCount += 1;
  } else if (rollResult >= 20) {
    rollDeathSaveClear(true);
    isHealed = true;
    changeHp();
    return;
  } else {
    document.getElementById(`success-mark-${successMarkCount + 1}`).src = 'images/icons/success_mark_checked.svg';
    successMarkCount += 1;
  }

  if (failsMarkCount == 3 || successMarkCount == 3) {
    rollDeathSaveClear();
  }

  document.getElementById('death-saves-heart').style.backgroundColor = 'hsl(357,' + (successMarkCount - failsMarkCount + 2) / 4 * 100 + '%, 40%)';

  console.log('At finish | Fails: ' + failsMarkCount + '  Success: ' + successMarkCount);
}

function rollDeathSaveClear(isTwenty = false) {
  if (failsMarkCount == 3) {
    bAlert('Вы умерли.', 5000);
  } else if (successMarkCount == 3) {
    bAlert('Вы живы!', 5000);
  } else if (isTwenty) {
    bAlert('Да вы счастливчик! На D20 выпало: 20!', 8000);
  }
  successMarkCount = 0;
  failsMarkCount = 0;
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
      bAlert('Введите название предмета!');
      newItem.style.display = 'none';
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
  document.getElementById('dice-list-checkbox').checked = !document.getElementById('dice-list-checkbox').checked;

  if (document.getElementById('dice-list-checkbox').checked) {
    mainDiceImg.src = "images/icons/control_icon/close.svg";
  } else {
    mainDiceImg.src = "images/buttons/dices/D20.svg";
  }
}

function characteristicProfinciesSelect(characteristic, proficient) {
  characteristic.classList.remove(characteristic.classList.item(0));
  characteristic.classList = defaultCharacteristicCheckboxClasses + ' characteristic-' + proficient.id;
}

function characteristicCheckBoxDropDown() {
  let dropList = document.getElementById('drop-list');

  if (dropList == null) {
    dropList = document.createElement('div');
    dropList.id = 'drop-list';
    dropList.classList = 'default-background border-style border-radius';

    let notProficient = document.createElement('span');
    notProficient.id = 'not-proficient';
    notProficient.classList = 'default-hover-active drop-list-text';
    notProficient.textContent = "Not Proficient";
    let notProficientBonus = document.createElement('span');
    notProficientBonus.classList = 'border-style border-radius characteristic-not-proficient drop-list-bonus';
    notProficientBonus.textContent = '+0';
    notProficient.appendChild(notProficientBonus);

    let halfProficient = document.createElement('span');
    halfProficient.id = 'half-proficient';
    halfProficient.classList = 'default-hover-active drop-list-text';
    halfProficient.textContent = "Half Proficient";
    let halfProficientBonus = document.createElement('span');
    halfProficientBonus.classList = 'border-style border-radius characteristic-half-proficient drop-list-bonus';
    halfProficientBonus.textContent = '+1';
    halfProficient.appendChild(halfProficientBonus);

    let proficient = document.createElement('span');
    proficient.id = 'proficient';
    proficient.classList = 'default-hover-active drop-list-text';
    proficient.textContent = "Proficient";
    let proficientBonus = document.createElement('span');
    proficientBonus.classList = 'border-style border-radius characteristic-proficient drop-list-bonus';
    proficientBonus.textContent = '+2';
    proficient.appendChild(proficientBonus);

    let expertise = document.createElement('span');
    expertise.id = 'expertise';
    expertise.classList = 'default-hover-active drop-list-text';
    expertise.textContent = "Expertise";
    let expertiseBonus = document.createElement('span');
    expertiseBonus.classList = 'border-style border-radius characteristic-expertise drop-list-bonus';
    expertiseBonus.textContent = '+4';
    expertise.appendChild(expertiseBonus);

    notProficient.addEventListener('click', function () { characteristicProfinciesSelect(profinciesParent, this) });
    halfProficient.addEventListener('click', function () { characteristicProfinciesSelect(profinciesParent, this) });
    proficient.addEventListener('click', function () { characteristicProfinciesSelect(profinciesParent, this) });
    expertise.addEventListener('click', function () { characteristicProfinciesSelect(profinciesParent, this) });

    dropList.appendChild(notProficient);
    dropList.appendChild(halfProficient);
    dropList.appendChild(proficient);
    dropList.appendChild(expertise);

    this.appendChild(dropList);
    profinciesParent = this;
  } else {
    profinciesParent.removeChild(dropList);
    if (profinciesParent != this) {
      this.dispatchEvent(new Event('click'));
    }
  }
}

document.getElementById('test').addEventListener('click', () => { console.log(character); loadCharacter(); });

function openCharacter() {
  characterInput.click();
  characterInput.onchange = function (e) {
    loadCharacterJSON();
  }
}

function loadCharacterJSON() {
  var input, file, fr;

  if (typeof window.FileReader !== 'function') {
    alert("The file API isn't supported on this browser yet.");
    return;
  }

  input = characterInput;

  if (!input) {
    alert("Um, couldn't find the fileinput element.");
  }
  else if (!input.files) {
    alert("This browser doesn't seem to support the `files` property of file inputs.");
  }
  else if (!input.files[0]) {
    alert("Please select a file before clicking 'Load'");
  }
  else {
    file = input.files[0];
    fr = new FileReader();
    fr.onload = receivedText;
    fr.readAsText(file);
  }

  function receivedText(e) {
    let lines = e.target.result;
    character = JSON.parse(lines);
  }
}

let russianVocabulary = {
  "Alignment": "Мировоззрение",
  "Lawful Good": "Законопослушный Добрый",
  "Lawful Neutral": "Законопослушный Нейтральный",
  "Lawful Evil": "Законопослушный Злой",
  "Neutral Good": "Нейтральный Добрый",
  "True Neutral": "Истинно Нейтральный",
  "Neutral Evil": "Нейтральный Злой",
  "Chaotic Good": "Хаотичный Добрый",
  "Chaotic Neutral": "Хаточино Нейтральный",
  "Chaotic Evil": "Хаотично Злой",
  "Class": "Класс",
  "Barbarian": "Варвар",
  "Bard": "Бард",
  "Cleric": "Жрец",
  "Druid": "Друид",
  "Fighter": "Воин",
  "Monk": "Монах",
  "Paladin": "Паладин",
  "Ranger": "Следопыт",
  "Rogue": "Плут",
  "Sorcerer": "Чародей",
  "Warlock": "Колдун",
  "Wizard": "Волшебник",
  "Race": "Раса",
  "Dwarf": "Дварф",
  "Elf": "Эльф",
  "Hafling": "Полурослик",
  "Human": "Человек",
  "Dragonborn": "Драконорожденный",
  "Gnome": "Гном",
  "Half-Elf": "Полуэльф",
  "Half-Orc": "Полуорк",
  "Tiefling": "Тифлинг",
  "Background": "Предыстория",
  "Acolyte": "Прислужник",
  "Charlatan": "Шарлатан",
  "Criminal": "Преступник",
  "Entertainer": "Артист",
  "Folk Hero": "Народный Герой",
  "Guild Artisan": "Гилдейский Ремесленник",
  "Hermit": "Отшельник",
  "Noble": "Благородный",
  "Outlander": "Чужеземец",
  "Sage": "Мудрец",
  "Sailor": "Моряк",
  "Soldier": "Солдат",
  "Urchin": "Беспризорник",
}

function capitalize(option, str) {
  if (option == 'firstOfWord') {
    return str.charAt(0).toUpperCase() + str.slice(1);
  } else if (option == 'firstOfAllWord') {
    var pieces = str.split(" ");
    for (var i = 0; i < pieces.length; i++) {
      var j = pieces[i].charAt(0).toUpperCase();
      pieces[i] = j + pieces[i].substr(1);
    }
    return pieces.join(" ");
  }
}

function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}

function translateTo(option, str) {
  if (language == 'ru') {
    selectedVocabulary = russianVocabulary;
  } else {
    return;
  }

  if (option == 'language') {
    var translatedWord = selectedVocabulary[fillStringIfEmpty(capitalize('firstOfAllWord', str))];
  } else if (option == 'save') {
    var translatedWord = getKeyByValue(selectedVocabulary, str);
  }

  return translatedWord != null ? translatedWord : String(undefined);
}

function fillStringIfEmpty(str) {
  return str != '' ? str : String(undefined);
}

function calculateBonus(value) {
  return Math.floor((value - 10) / 2);
}

function updateBonus() {
  characterStats.querySelectorAll('div.characteristic').forEach(
    statsBox => {
      var characteristicValue = statsBox.querySelector('#' + statsBox.id + '-value');
      var characteristicBonus = statsBox.querySelector('#' + statsBox.id + '-bonus');
      characteristicBonus.textContent = addSignToNumber(calculateBonus(parseInt(characteristicValue.value)));
    });

  saveCharacteristics();

  characterSkills.querySelectorAll('span.skill-bonus').forEach(
    skillBonus => {
      skillBonus.textContent = addSignToNumber(character.characteristicBonus[skillBonus.dataset.modifier + 'Bonus']);
    });
}

function addSignToNumber(value) {
  if (isNaN(value)) return '';
  return value < 0 ? value : '+' + value;
}

function loadCharacter() {
  loadPlayerName();
  loadCharacterName();
  loadCharacterOrigin();
  loadCharacteristics();
  loadHpAndXp();
}

function loadPlayerName() {
  playerName.textContent = fillStringIfEmpty(character.playerName);
}

function loadCharacterName() {
  characterName.value = fillStringIfEmpty(character.charName);
  characterName.dispatchEvent(new Event('keydown'));
}

function loadCharacterOrigin() {
  characterAlignment.textContent = translateTo('language', character.alignment);
  characterRace.textContent = translateTo('language', character.race);
  characterClass.textContent = translateTo('language', character.class);
  characterBackground.textContent = translateTo('language', character.background);
}

function loadCharacteristics() {
  characterStats.querySelectorAll('div.characteristic').forEach(
    statsBox => {
      var characteristicValue = statsBox.querySelector('#' + statsBox.id + '-value');
      var characteristicBonus = statsBox.querySelector('#' + statsBox.id + '-bonus');
      characteristicValue.value = character.characteristic[statsBox.id];
      characteristicBonus.textContent = addSignToNumber(calculateBonus(parseInt(character.characteristic[statsBox.id])));
    });

  characterSkills.querySelectorAll('span.skill-bonus').forEach(
    skillBonus => {
      skillBonus.textContent = addSignToNumber(character.characteristicBonus[skillBonus.dataset.modifier + 'Bonus']);
    });
}

function loadHpAndXp() {
  document.getElementById('hp').textContent = '' + character.hp + '/' + character.hpMax;
  onloadBarWidth('hp');
  document.getElementById('xp').value = '' + character.experience;
  adjustLevel();
  onloadBarWidth('xp');
}

function saveFile(filename, data) {
  var blob = new Blob([data], { type: 'text/csv' });
  if (window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveBlob(blob, filename);
  }
  else {
    var elem = window.document.createElement('a');
    elem.href = window.URL.createObjectURL(blob);
    elem.download = filename;
    document.body.appendChild(elem);
    elem.click();
    document.body.removeChild(elem);
  }
}

function saveAndDownloadCharacter() {
  saveCharacter();
  let data = JSON.stringify(character, null, 2);
  saveFile(character.charName + '.json', data);
}

function saveCharacter() {
  savePlayerName();
  saveCharacterName();
  saveCharacterOrigin();
  saveCharacteristics();
  saveHpAndXp();
}

function savePlayerName() {
  character.playerName = playerName.textContent;
}

function saveCharacterName() {
  character.charName = characterName.value;
}

function saveCharacterOrigin() {
  character.alignment = translateTo('save', characterAlignment.textContent);
  character.race = translateTo('save', characterRace.textContent);
  character.class = translateTo('save', characterClass.textContent);
  character.background = translateTo('save', characterBackground.textContent);
}

function saveCharacteristics() {
  characterStats.querySelectorAll('div.characteristic').forEach(
    statsBox => {
      var characteristicValue = statsBox.querySelector('#' + statsBox.id + '-value');
      var characteristicBonus = statsBox.querySelector('#' + statsBox.id + '-bonus');
      character.characteristic[statsBox.id] = parseInt(characteristicValue.value);
      character.characteristicBonus[statsBox.id + 'Bonus'] = parseInt(characteristicBonus.textContent);
    });
}

function saveHpAndXp() {
  character.experience = document.getElementById('xp').value;
  getHp();
  character.hp = currentHp;
  character.hpMax = maxHp;
}


