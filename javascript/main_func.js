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

let russianVocabulary = {
    "Select Item": "Выберите пункт",

    "Darkvision": "Тёмное Зрение",
    "Dwarven Resilience": "Дварфская Устойчивость",
    "Tool Proficiency": "Владение Инструментами",
    "Dwarven Combat Training": "Дварфская Боевая Тренировка",
    "Stonecunning": "Знание Камня",
    "Kenn Senses": "Обострённые Чувства",
    "Fey Ancestry": "Наследие Фей",
    "Trance": "Транс",
    "Mask of the Wild": "Маскировка в дикой местности",
    "Superior Darkvision": "Превосходное Тёмное Зрение",
    "Sunlight Sensitivity": "Чувствительность К Солнцу",
    "Drow Magic": "Магия Дроу",
    "Drop Weapon Training": "Владение Оружием Дроу",
    "Lucky": "Везучий",
    "Brave": "Храбрый",
    "Halfling Nimbleness": "Проворство Полуросликов",
    "Naturally Stealthy": "Естественная Скрытность",
    "Stout Resilience": "Устойчивость Коренастых",
    "Gnome Cunning": "Гномья Хитрость",
    "Natural Illusionist": "Природная Иллюзия",
    "Speak With Small Beasts": "Общение С Маленькими Зверями",
    "Artificer's Lore": "Ремесленные Знания",
    "Tinker": "Жестянщик",
    "Skill Versatility": "Универсальность Навыков",
    "Menacing": "Угрожающий Вид",
    "Relentless Endurance": "Непоколебимая Стойкость",
    "Savage Attacks": "Свирепые Атаки",
    "Hellish Resistance": "Адское Сопротивление",
    "Infernal Legacy": "Дьявольское Наследие",

    "Strength": "Сила",
    "Dexterity": "Ловкость",
    "Constitution": "Телосложение",
    "Intelligence": "Интеллект",
    "Wisdom": "Мудрость",
    "Charisma": "Харизма",

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
    "Halfling": "Полурослик",
    "Human": "Человек",
    "Dragonborn": "Драконорожденный",
    "Gnome": "Гном",
    "Half-Elf": "Полуэльф",
    "Half-Orc": "Полуорк",
    "Tiefling": "Тифлинг",

    "Subrace": "Подраса",
    "Hill": "Холмовой",
    "Mountain": "Горный",
    "High Elf": "Высший",
    "Wood Elf": "Лесной",
    "Dark Elf(Drow)": "Тёмный",
    "Lightfoot": "Легконогий",
    "Stout": "Коренастый",
    "Forest Gnome": "Лесной",
    "Rock Gnome": "Скальный",

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

window.addEventListener('load', function () {
    if (!("isAnimation" in localStorage)) {
        localStorage.isAnimation = "running";
    }
    applyAnimation();
});

function toggleAnimations() {
    (localStorage.isAnimation == "running" ? localStorage.isAnimation = "paused" : localStorage.isAnimation = "running");
    applyAnimation();
}

function applyAnimation() {
    document.querySelectorAll('*[data-animation]').forEach(element => {
        element.style.animationPlayState = localStorage.isAnimation;
        if (element.style.animationPlayState == "running") {
            element.style.transform = "rotate(0deg)";
        } else {
            element.style.transform = "";
        }
    });
}

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

function clearElement(object) {
    while (object.firstChild) object.removeChild(object.firstChild);
}

/**
 * @param {Number} xp The pure number
 */

function getLevelFromXp(xp) {
    let newLevel = 0;
    while ((newLevel < Object.keys(levelDependenceTable).length) && (xp >= levelDependenceTable[newLevel + 1])) {
        newLevel += 1;
    }
    return newLevel;
}

function adjustLevelProto(xp, level) {
    xp = Number(xp.value);
    level.textContent = getLevelFromXp(xp);
}

function adjustLevel() {
    adjustLevelProto(document.getElementById('xp'), document.getElementById('level'));
}

function adjustAllLevels() {
    for (character in charactersList) {
        adjustLevelProto(charactersList[character].xp, charactersList[character].level);
    }
}

/**
 * @param {Element} hp The hp text
 * @param {Element} hpBar The hp bar object
 * @param {Element} hpBarFill The hp bar fill object
 * @param {Element} xp The xp text
 * @param {Element} xpBar The xp bar object
 * @param {Element} xpBarFill The xp bar fill object
 * @param {String} barType The type of bar to adjust
 */

function adjustBarWidthProto(value, bar, barFill, barType) {
    let actualValue = 0;
    let maxValue = 0;
    if (barType == 'hp') {
        let hp = (value.textContent).split('/');
        actualValue = Number(hp[0]);
        maxValue = Number(hp[1]);
    } else if (barType == 'xp') {
        actualValue = Number(value.value);
        let actualLevel = getLevelFromXp(actualValue);
        let xpMinValue = levelDependenceTable[actualLevel < Object.keys(levelDependenceTable).length ? actualLevel : 20];
        maxValue = levelDependenceTable[actualLevel + 1 < Object.keys(levelDependenceTable).length ? actualLevel + 1 : 20];
        actualValue -= xpMinValue;
        maxValue -= xpMinValue;
    }
    changeBarWidth(actualValue, maxValue, bar, barFill);
}

function adjustBarWidth() {
    adjustBarWidthProto(document.getElementById('hp'),
        document.getElementById('hp-bar'),
        document.getElementById('hp-bar-fill'), 'hp');
    adjustBarWidthProto(document.getElementById('xp'),
        document.getElementById('xp-bar'),
        document.getElementById('xp-bar-fill'), 'xp');
}

function adjustAllBarWidth() {
    for (character in charactersList) {
        adjustBarWidthProto(charactersList[character].hp,
            charactersList[character].hpBar,
            charactersList[character].hpBarFill, 'hp');
        adjustBarWidthProto(charactersList[character].xp,
            charactersList[character].xpBar,
            charactersList[character].xpBarFill, 'xp');
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

function changeBarWidth(newValue, maxValue, bar, barFill) {
    let maxWidth = bar.offsetWidth;
    let newWidth = (newValue / maxValue) * maxWidth;
    barFill.style.width = !newWidth ? 0 : (newWidth - 6) + 'px';
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

let beautifulAlertContainer = document.createElement('div');
beautifulAlertContainer.id = 'beautiful-container';
document.body.appendChild(beautifulAlertContainer);
let beautifulAlertList = [];

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

function fillStringIfEmpty(str) {
    return str != '' ? str : String(undefined);
}

function calculateBonus(value) {
    return Math.floor((value - 10) / 2);
}

function addSignToNumber(value) {
    if (isNaN(value)) return '';
    return value < 0 ? value : '+' + value;
}