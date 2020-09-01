function beautifyText() {
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

function adjustLevel() {
    let i = 1;
    Array.from(document.getElementsByClassName('xp')).forEach(element => {
        let level = 0;
        let xp = Number(element.value);
        while ((level < Object.keys(levelDependenceTable).length) && (xp >= levelDependenceTable[level + 1])) {
            level += 1;
        }
        document.getElementById('level' + i).textContent = level;
        i++;
    });

}

function onloadBarWidth(spanId) {
    let actualValue = 0;
    let maxValue = 0;
    if (spanId == 'hp') {
        let i = 1;
        Array.from(document.getElementsByClassName('hp')).forEach(element => {
            let value = (element.textContent).split('/');
            actualValue = Number(value[0]);
            maxValue = Number(value[1]);
            changeBarWidth(actualValue, maxValue, spanId, i);
            i++;
        });
    }
    if (spanId == 'xp') {
        let i = 1;
        Array.from(document.getElementsByClassName('xp')).forEach(element => {
            actualValue = Number(element.value);
            let nextLevel = Number(document.getElementById('level' + i).textContent);
            let minValue = levelDependenceTable[nextLevel < Object.keys(levelDependenceTable).length ? nextLevel : 20];
            maxValue = levelDependenceTable[nextLevel + 1 < Object.keys(levelDependenceTable).length ? nextLevel + 1 : 20];
            actualValue -= minValue;
            maxValue -= minValue;
            changeBarWidth(actualValue, maxValue, spanId, i);
            i++;
        });
    }

}
function autoWidth() {
    let fontSize = parseInt(getComputedStyle(this).fontSize) / 2;
    this.style.width = ((this.value.length + 2) * fontSize + 'px');
}

function labelAutoWidth(element) {
    let fontSize = parseInt(getComputedStyle(element).fontSize) / 2;
    element.style.width = ((element.textContent.length + 1) * fontSize + 'px');
}

function changeBarWidth(newValue, maxValue, spanId, i = 1) {
    let maxWidth = document.getElementById(spanId + '-bar' + i).offsetWidth;
    let newWidth = (newValue / maxValue) * maxWidth;
    document.getElementById(spanId + '-bar-fill' + i).style.width = !newWidth ? 0 : (newWidth - 6) + 'px';
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