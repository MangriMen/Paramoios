'use strict';

// Замыкание
(function () {
    /**
     * Корректировка округления десятичных дробей.
     *
     * @param {String}  type  Тип корректировки.
     * @param {Number}  value Число.
     * @param {Integer} exp   Показатель степени (десятичный логарифм основания корректировки).
     * @returns {Number} Скорректированное значение.
     */
    function decimalAdjust(type, value, exp) {
        // Если степень не определена, либо равна нулю...
        if (typeof exp === 'undefined' || +exp === 0) {
            return Math[type](value);
        }
        value = +value;
        exp = +exp;
        // Если значение не является числом, либо степень не является целым числом...
        if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
            return NaN;
        }
        // Сдвиг разрядов
        value = value.toString().split('e');
        value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
        // Обратный сдвиг
        value = value.toString().split('e');
        return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
    }

    // Десятичное округление к ближайшему
    if (!Math.round10) {
        Math.round10 = function (value, exp) {
            return decimalAdjust('round', value, exp);
        };
    }
    // Десятичное округление вниз
    if (!Math.floor10) {
        Math.floor10 = function (value, exp) {
            return decimalAdjust('floor', value, exp);
        };
    }
    // Десятичное округление вверх
    if (!Math.ceil10) {
        Math.ceil10 = function (value, exp) {
            return decimalAdjust('ceil', value, exp);
        };
    }
})();

let language = 'ru';
let selectedVocabulary = null;

class Character {
    constructor(parsedJSON = "default") {
        if (typeof (parsedJSON) == Object) {
            for (let field in parsedJSON) {
                this[field] = parsedJSON[field];
            }
        } else {
            if (parsedJSON != "default") {
                console.log("Error loading character, created default");
                bAlert("Error loading character, created default", 5000);
                return;
            }
            this.playerName = "";
            this.charName = "";
            this.class = "";
            this.race = "";
            this.alignment = "";
            this.background = "";
            this.level = 1;
            this.experience = 0;
            this.armorClass = 0;
            this.initiative = 0;
            this.speed = 0;
            this.inspiration = false;
            this.proficiencyBonus = 0;
            this.hpMax = 0;
            this.hpNext = 0;
            this.hp = 0;
            this.hpTemp = 0;
            this.hitDiceCoeffiecient = 0;
            this.hitDiceLeft = 0;
            this.deathSaves = {
                "successes": 0,
                "failures": 0
            };
            this.abilityScore = {
                "strength": 0,
                "dexterity": 0,
                "constitution": 0,
                "intelligence": 0,
                "wisdom": 0,
                "charisma": 0
            };
            this.abilityScoreBonus = {
                "strengthBonus": -5,
                "dexterityBonus": -5,
                "constitutionBonus": -5,
                "intelligenceBonus": -5,
                "wisdomBonus": -5,
                "charismaBonus": -5
            };
            this.savingThrowProf = {
                "strength": false,
                "dexterity": false,
                "constitution": false,
                "intelligence": false,
                "wisdom": false,
                "charisma": false
            };
            this.skillProf = {
                "acrobatics": false,
                "animalHandling": false,
                "arcana": false,
                "athletics": false,
                "deception": false,
                "history": false,
                "insight": false,
                "intimidation": false,
                "investigation": false,
                "medicine": false,
                "nature": false,
                "perception": false,
                "perfomance": false,
                "persuasion": false,
                "religion": false,
                "sleightOfHand": false,
                "stealth": false,
                "survival": false
            };
            this.passiveWisdom = -5;
            this.armorProf = {};
            this.weaponProf = {};
            this.toolProf = {};
            this.proficiencies = {
                "armor": new Set(),
                "weapon": new Set()
            };
            this.armament = {
                "weapon": [
                    "fists"
                ],
                "armor": [],
                "offHandWeapon": ""
            };
            this.equipment = [];
            this.money = {
                "copper": 0,
                "silver": 0,
                "electrum": 0,
                "gold": 0,
                "platinum": 0
            };
            this.languages = new Set([
                "common"
            ]);
            this.maxWeight = 0;
            this.specialization = "";
            this.otherProfincies = [];
            this.features = [];
            this.age = 0;
            this.height = 0;
            this.weight = 0;
            this.eyes = "";
            this.skin = "";
            this.hair = "";
            this.backstory = "";
            this.additionalFeaturesAndTraits = "";
            this.treasure = [];
            this.image = "default";
            this.traits = "";
            this.ideals = "";
            this.bonds = "";
            this.flaws = "";
        }
    }

    loadCharacter(parsedJSON) {
        if (typeof (parsedJSON) == Object) {
            for (let field in parsedJSON) {
                this[field] = parsedJSON[field];
            }
        } else {
            console.log("Error loading character");
            bAlert("Error loading character", 5000);
            return;
        }
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

let russianVocabulary = {
    "btn_submit": "Ок",
    "btn_cancel": "Отмена",

    "pass_change_successfull": "Пароль успешно изменён",
    "pass_change_error": "Не удалось изменить пароль",

    "select item": "Выберите Пункт",
    "missing description": "Отсутствует Описание",
    "or": "или",
    "constitution modifier": "модификатор Телосложения",
    "light": "Лёгкие доспехи",
    "medium": "Средние доспехи",
    "shield": "Щиты",
    "simple": "Простое оружие",
    "martial": "Воинское оружие",
    "text_none": "Нет",

    "M": "м",
    "Cm": "см",
    "Ft": "фут.",
    "Kg": "кг",

    "dwarven resilience": "Дварфская Устойчивость",
    "darkvision": "Тёмное Зрение",
    "tool proficiency": "Владение Инструментами",
    "dwarven combat training": "Дварфская Боевая Тренировка",
    "tool proficiency": "Владение Инструментами",
    "stonecunning": "Знание Камня",
    "dwarf armor Mastery": "Владение Доспехами Дварфов",
    "dwarven endurance": "Дварфская Выдержка",
    "kenn senses": "Обострённые Чувства",
    "fey ancestry": "Наследие Фей",
    "trance": "Транс",
    "elven weapon Mastery": "Владение эльфийским оружием",
    "quick legs": "Быстрые Ноги",
    "mask of The Wild": "Маскировка в дикой местности",
    "superior darkvision": "Превосходное Тёмное Зрение",
    "sunlight sensitivity": "Чувствительность К Солнцу",
    "drow magic": "Магия Дроу",
    "drop weapon training": "Владение Оружием Дроу",
    "lucky": "Везучий",
    "brave": "Храбрый",
    "halfling nimbleness": "Проворство Полуросликов",
    "naturally stealthy": "Естественная Скрытность",
    "stout resilience": "Устойчивость Коренастых",
    "legacy of Dragons": "Наследие Драконов",
    "breath weapon": "Оружие Дыхания",
    "resistance to Damage": "Сопротивление Урону",
    "gnome cunning": "Гномья Хитрость",
    "natural illusionist": "Природная Иллюзия",
    "speak with small beasts": "Общение С Маленькими Зверями",
    "artificer's Lore": "Ремесленные Знания",
    "tinker": "Жестянщик",
    "skill versatility": "Универсальность Навыков",
    "menacing": "Угрожающий Вид",
    "relentless endurance": "Непоколебимая Стойкость",
    "savage attacks": "Свирепые Атаки",
    "hellish resistance": "Адское Сопротивление",
    "infernal legacy": "Дьявольское Наследие",

    "ch_title": "Характеристика",
    "ch_strength": "Сила",
    "ch_dexterity": "Ловкость",
    "ch_constitution": "Телосложение",
    "ch_intelligence": "Интеллект",
    "ch_wisdom": "Мудрость",
    "ch_charisma": "Харизма",

    "al_title": "Мировоззрение",
    "al_lawful_good": "Законно Добрый",
    "al_neutral_good": "Нейтрально Добрый",
    "al_chaotic_good": "Хаотично Добрый",
    "al_lawful_neutral": "Законно Нейтральный",
    "al_true_neutral": "Нейтральный",
    "al_chaotic_neutral": "Хаотично Нейтральный",
    "al_lawful_evil": "Законно Злой",
    "al_neutral_evil": "Нейтрально Злой",
    "al_chaotic _evil": "Хаотично Злой",

    "cl_title": "Класс",
    "cl_barbarian": "Варвар",
    "cl_bard": "Бард",
    "cl_cleric": "Жрец",
    "cl_druid": "Друид",
    "cl_fighter": "Воин",
    "cl_monk": "Монах",
    "cl_paladin": "Паладин",
    "cl_ranger": "Следопыт",
    "cl_rogue": "Плут",
    "cl_sorcerer": "Чародей",
    "cl_warlock": "Колдун",
    "cl_wizard": "Волшебник",

    "rc_title": "Раса",
    "rc_dwarf": "Дварф",
    "rc_elf": "Эльф",
    "rc_halfling": "Полурослик",
    "rc_human": "Человек",
    "rc_dragonborn": "Драконорожденный",
    "rc_gnome": "Гном",
    "rc_half-elf": "Полуэльф",
    "rc_half-orc": "Полуорк",
    "rc_tiefling": "Тифлинг",

    "sr_title": "Подраса",
    "sr_hill": "Холмовой",
    "sr_mountain": "Горный",
    "sr_high": "Высший",
    "sr_wood": "Лесной",
    "sr_drow": "Тёмный",
    "sr_lightfoot": "Легконогий",
    "sr_stout": "Коренастый",
    "sr_forest": "Лесной",
    "sr_rock": "Скальный",

    "bg_title": "Предыстория",
    "bg_acolyte": "Прислужник",
    "bg_charlatan": "Шарлатан",
    "bg_criminal": "Преступник",
    "bg_entertainer": "Артист",
    "bg_folk_hero": "Народный Герой",
    "bg_guild_artisan": "Гилдейский Ремесленник",
    "bg_hermit": "Отшельник",
    "bg_noble": "Благородный",
    "bg_outlander": "Чужеземец",
    "bg_sage": "Мудрец",
    "bg_sailor": "Моряк",
    "bg_soldier": "Солдат",
    "bg_urchin": "Беспризорник",

    "sk_title": "Навык",
    "sk_acrobatics": "Акробатика",
    "sk_animal_handling": "Уход за животными",
    "sk_arcana": "Магия",
    "sk_athletics": "Атлетика",
    "sk_deception": "Обман",
    "sk_history": "История",
    "sk_insight": "Проницательность",
    "sk_intimidation": "Запугивание",
    "sk_investigation": "Расследование",
    "sk_medicine": "Медицина",
    "sk_nature": "Природа",
    "sk_perception": "Восприятие",
    "sk_performance": "Выступление",
    "sk_persuasion": "Убеждение",
    "sk_religion": "Религия",
    "sk_sleight_of_hand": "Ловкость рук",
    "sk_stealth": "Скрытность",
    "sk_survival": "Выживание",

    "lang_title": "Язык",
    "lang_giant": "Великаний",
    "lang_gnomish": "Гномий",
    "lang_goblin": "Гоблинский",
    "lang_dwarvish": "Дварфийский",
    "lang_common": "Общий",
    "lang_orc": "Орочий",
    "lang_halfling": "Полуросликов",
    "lang_elvish": "Эльфийский",

    "Gold": "Золото",

    "Coins": "Монет"

    // "Scipt": "Письменность",
    // "test": "Великанья",
    // "test": "Дварфская",
    // "test": "Общая",
    // "test": "Эльфийская",
}

const LBTOKGCOSNT = 0.45359243;
const KGTOLBCONST = 2.2046223302272;
const FTTOMCONST = 0.3048;
const MTOFTCONST = 3.280839895;
const INCHTOCMCONST = 2.54;
const CMTOINCHCONST = 0.3937007874;

function fromToMultiplyProto(number, constant) {
    if (typeof (number) === "number") {
        return Math.round10(number * constant, -5);
    } else {
        return NaN;
    }
}

function lbToKg(number) {
    return fromToMultiplyProto(number, LBTOKGCOSNT);
}

function kgToLb(number) {
    return fromToMultiplyProto(number, KGTOLBCONST);
}

function ftToM(number) {
    return fromToMultiplyProto(number, FTTOMCONST);
}

function mToFt(number) {
    return fromToMultiplyProto(number, MTOFTCONST);
}

function inchToCm(number) {
    return fromToMultiplyProto(number, INCHTOCMCONST);
}

function cmToInch(number) {
    return fromToMultiplyProto(number, CMTOINCHCONST);
}

const measureSystem = [
    ["'", "\""],
    [translateTo('language', "m"), translateTo('language', "cm")]
]

const weightSystem = [
    translateTo('language', "ft"),
    translateTo('language', "kg")
]

function getRandomFloat(min, max) {
    return Math.random() * (max - min) + min;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function rollDice(count, diceType) {
    let sum = 0;
    for (let i = 0; i < count; i++)
        sum += getRandomInRange(1, diceType);
    return {
        value: sum,
        count: count,
        type: diceType
    }
}

function getExpires() {
    let today = new Date();
    let expires = new Date();
    expires.setTime(today.getTime() + 1000 * 60 * 60 * 24 * 365);
    return expires;
}

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name, value, options = {}) {

    options = {
        path: '/',
        // add other defaults here if necessary
        ...options
    };

    if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
    }

    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

    for (let optionKey in options) {
        updatedCookie += "; " + optionKey;
        let optionValue = options[optionKey];
        if (optionValue !== true) {
            updatedCookie += "=" + optionValue;
        }
    }

    document.cookie = updatedCookie;
}


function deleteCookie(name) {
    setCookie(name, "", {
        'max-age': -1
    })
}

window.addEventListener('load', function () {
    if (getCookie('isAnimation') == undefined) {
        setCookie('isAnimation', "running", { expires: getExpires() });
    }
    applyAnimation();
});

function toggleAnimations() {
    setCookie('isAnimation', (getCookie('isAnimation') == "running" ? "paused" : "running"), { expires: getExpires() });
    applyAnimation();
}

function applyAnimation() {
    document.querySelectorAll('*[data-animation]').forEach(element => {
        element.style.animationPlayState = getCookie('isAnimation');
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
    for (let character in charactersList) {
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
    for (let character in charactersList) {
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
        var translatedWord = selectedVocabulary[fillStringIfEmpty(str)];
    } else if (option == 'save') {
        var translatedWord = getKeyByValue(selectedVocabulary, str);
    }

    return translatedWord != null ? translatedWord : str;
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

function removeSignFromNumber(value) {
    return (Number.isNaN(parseInt(value)) ? 0 : parseInt(value));
}

function zeroIfUndefined(value) {
    return (value == undefined ? 0 : value);
}

function isEmpty(obj) {
    for (let x in obj) { return false; }
    return true;
}

function fillSpanWithComma(span, inputArray) {
    let isComma = false;
    span.innerText = '';
    if (inputArray.length == 0) {
        span.innerText += translateTo('language', "text_none");
        return;
    }
    for (let element of inputArray) {
        span.innerText += (isComma ? ", " : "") + translateTo('language', element);
        isComma = true;
    }
}

function addToSetFromObjectOrArray(outputSet, inputObjArr) {
    for (const key in inputObjArr) {
        outputSet.add(inputObjArr[key]);
    }
}

function ifHasSetPropertyToTrue(objectWithBoolean, inputArray) {
    for (let key of inputArray) {
        if (objectWithBoolean.hasOwnProperty(key)) {
            objectWithBoolean[key] = true;
        }
    }
}

function dispatchAllSelect(box) {
    Array.from(box.getElementsByTagName('select')).forEach(element => {
        element.dispatchEvent(new Event('change'));
    });
}