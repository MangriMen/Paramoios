'use strict'

function changeHp(isHealed) {
  let oldHp = (document.getElementById('hp').textContent).split('/');
  let actualHp = Number(oldHp[0]);
  let maxHp = Number(oldHp[1]);
  let newHp = 0;
  let final = '';

  if (isHealed) {
  newHp = actualHp + (actualHp < maxHp);
  } else {
  newHp = actualHp - (actualHp > 0);
  }

  final = newHp + '/' + maxHp;
  document.getElementById('hp').textContent = final;

  changeBarWidth(newHp, maxHp, 'hp');
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
  document.getElementById(spanId + '-bar-fill').style.width = newWidth == 0 ? 0 : (newWidth - 6) + 'px';
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