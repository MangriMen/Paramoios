'use strict';

const allCharacteristics = [
    "ch_strength",
    "ch_dexterity",
    "ch_constitution",
    "ch_intelligence",
    "ch_wisdom",
    "ch_charisma",
]

const allLanguages = {
    "lang_common": {
        "Typical Speakers": ["Humans"],
        "Script": "CommonScript"
    },
    "lang_dwarvish": {
        "Typical Speakers": ["Dwarves"],
        "Script": "DwarvishScript"
    },
    "lang_elvish": {
        "Typical Speakers": ["Elves"],
        "Script": "ElvishScript"
    },
    "lang_giant": {
        "Typical Speakers": ["Ogres", "Giants"],
        "Script": "DwarvishScript"
    },
    "lang_gnomish": {
        "Typical Speakers": ["Gnomes"],
        "Script": "DwarvishScript"
    },
    "lang_halfling": {
        "Typical Speakers": ["Haflings"],
        "Script": "CommonScript"
    },
    "lang_orc": {
        "Typical Speakers": ["Orcs"],
        "Script": "DwarvishScript"
    },
}

let isMetric = (getCookie("isMetric") == "true");

let alignmentSelect = document.getElementById('alignment');
let backgroundSelect = document.getElementById('background-select');
let addInfoBoxBackground = document.getElementById('add-info-box-background');
let backgroundCard = document.getElementById('background-card');
let manuallyCheckbox = document.getElementById('manually-checkbox');

let selectedAdditionalInfo = null;
let selectedAdditionalInfoBackground = null;
let isSwitching = false;
let isSwitchingBackground = false;

let raceP = null;
let classP = null;
let characteristicCards = null;

// document.getElementById('growth-primary-measure').textContent = measureSystem[isMetric | 0][0];
// document.getElementById('growth-secondary-measure').textContent = measureSystem[isMetric | 0][1];
// document.getElementById('weight-measure').textContent = weightSystem[isMetric | 0];

document.getElementById('roll-growth-weight-button').addEventListener('click', () => { rollGrowthWeight(raceP); });

backgroundSelect.addEventListener('change', backgroundSelected);

const traitsText = document.getElementById('traits-text');
document.getElementById('traits-roll-button').addEventListener('click', function () { rollPersonalityField("traits") });

const idealsText = document.getElementById('ideals-text');
document.getElementById('ideals-roll-button').addEventListener('click', function () { rollPersonalityField("ideals") });

const bondsText = document.getElementById('bonds-text');
document.getElementById('bonds-roll-button').addEventListener('click', function () { rollPersonalityField("bonds") });

const flawsText = document.getElementById('flaws-text');
document.getElementById('flaws-roll-button').addEventListener('click', function () { rollPersonalityField("flaws") });

const skillsBox = document.getElementById('skill-box');
const languagesBox = document.getElementById('languages-box');
const equipmentBox = document.getElementById('equipment-box');

manuallyCheckbox.addEventListener('change', displayManuallyGrowthWeight);
manuallyCheckbox.dispatchEvent(new Event('change'));

let newCharacter = new Character;

let charWeight = 0;
let charHeight = 0;

class CharacteristicsCard {
    constructor(characteristic) {
        let object = this;
        this.characteristic = characteristic;

        function createCardTr(modifierType, type = "default") {
            let value = document.createElement('td');
            value.id = "" + characteristic + "-base";

            if (type == "select") {
                value.classList = "characteristics-select ";
                let select = document.createElement('select');
                select.classList = "input-font-style default-background";

                for (let i = 8; i <= 15; i++) {
                    let option = document.createElement('option');
                    option.value = i;
                    option.textContent = i;
                    select.append(option);
                }
                select.addEventListener('change', function () {
                    object.modifierTr.lastChild.textContent = addSignToNumber(calculateBonus(this.value));
                    CharacteristicsCard.calcSum(object);
                    setPointsLeft();
                });
                value.appendChild(select);
            } else if (type == "input") {
                value.classList = "override-score ";
                let input = document.createElement('input');
                input.type = "number";
                input.placeholder = "--";
                input.classList = "input-font-style";
                value.appendChild(input);
            }

            value.classList += "characteristics-modifier-value";

            let text = document.createElement('td');
            text.classList = "characteristics-modifier-text";
            text.textContent = modifierType;

            let tr = document.createElement('tr');
            tr.appendChild(text);
            tr.appendChild(value);

            return tr;
        }


        this.modifierTr = createCardTr("Модификатор");
        this.raceTr = createCardTr("Расовый Бонус");
        this.increaseTr = createCardTr("Увеличение хар.");
        this.otherTr = createCardTr("Остальное");
        this.overrideTr = createCardTr("Переопределить", "input");
        this.sumTr = createCardTr("Итого");
        this.baseTr = createCardTr("Базовое", "select");

        let table = document.createElement('table');
        table.id = this.characteristic + '-table';
        table.classList = 'characteristics-table';
        table.appendChild(this.baseTr);
        table.appendChild(this.raceTr);
        table.appendChild(this.increaseTr);
        table.appendChild(this.otherTr);
        table.appendChild(this.overrideTr);
        table.appendChild(this.sumTr);
        table.appendChild(this.modifierTr);

        let tableRoundWrapper = document.createElement('div');
        tableRoundWrapper.classList = 'table-round-wrapper default-inner-shadow';
        tableRoundWrapper.appendChild(table);

        let label = document.createElement('span');
        label.id = this.characteristic + '-label';
        label.classList = 'characteristics-table-label border-radius default-inner-shadow';
        label.textContent = translateTo('language', this.characteristic);

        this.card = document.createElement('div');
        this.card.id = this.characteristic + '-box';
        this.card.classList = 'characteristics-box';
        this.card.appendChild(label);
        this.card.appendChild(tableRoundWrapper);


        this.overrideTr.lastChild.addEventListener('keyup', function () { CharacteristicsCard.calcSum(object) });
    }

    static calcSum(object) {
        let overrideM = object.overrideTr.lastChild.firstChild.valueAsNumber;
        let sum = (Number.isNaN(overrideM) ?
            (
                removeSignFromNumber(object.baseTr.lastChild.lastChild.value) +
                removeSignFromNumber(object.raceTr.lastChild.textContent) +
                removeSignFromNumber(object.increaseTr.lastChild.textContent) +
                removeSignFromNumber(object.otherTr.lastChild.textContent)
            ) :
            overrideM
        );
        object.sumTr.lastChild.textContent = (Number.isNaN(sum) ? 0 : sum);
        object.modifierTr.lastChild.textContent = addSignToNumber(calculateBonus(sum));
    }

    calcModifiers() {
        this.raceTr.lastChild.textContent = "+" + zeroIfUndefined(raceP.raceObject.abilityScoreInc[this.characteristic]);
        if (raceP.subraceSelect.childElementCount > 0) {
            this.raceTr.lastChild.textContent = "+" + zeroIfUndefined(raceP.subraceObject.abilityScoreInc[this.characteristic]);
        }
        this.increaseTr.lastChild.textContent = "+" + 0;
        this.otherTr.lastChild.textContent = "+" + 0;
    }

    getCalcModifier() {
        return removeSignFromNumber(this.modifierTr.lastChild.textContent);
    }

    getTotalScore() {
        return removeSignFromNumber(this.sumTr.lastChild.textContent);
    }
}

function displayManuallyGrowthWeight() {
    if (manuallyCheckbox.checked) {
        document.getElementById('table-growth').style.display = 'none';
        document.getElementById('table-weight').style.display = 'none';
        document.getElementById('roll-growth-weight-button').style.display = 'none';

        document.getElementById('growth').style.display = '';
        document.getElementById('growth').style.display = '';
        document.getElementById('weight').style.display = '';
        document.getElementById('weight-measure').style.display = '';
    } else {
        document.getElementById('table-growth').style.display = '';
        document.getElementById('table-weight').style.display = '';
        document.getElementById('roll-growth-weight-button').style.display = '';

        document.getElementById('growth').style.display = 'none';
        document.getElementById('weight').style.display = 'none';
        document.getElementById('weight-measure').style.display = 'none';
    }
}

function setPointsLeft() {
    let pointsLeft = 27;
    for (let card in characteristicCards)
        pointsLeft -= (characteristicCards[card].baseTr.lastChild.firstChild.value - (characteristicCards[card].baseTr.lastChild.firstChild.value == 15 ? 6 : characteristicCards[card].baseTr.lastChild.firstChild.value == 14 ? 7 : 8));
    document.getElementById("characteristics-left-value").textContent = pointsLeft;
    if (pointsLeft < 0) {
        document.getElementById("characteristics-left-value").style.color = "red";
    }
    else if (pointsLeft == 0) {
        document.getElementById("characteristics-left-value").style.color = "green";
    }
    else {
        document.getElementById("characteristics-left-value").style.color = "";
    }
}

function createOptionForChooseCharacteristic(defchar) {
    let option = document.createElement('option');
    option.value = defchar;
    option.textContent = translateTo('language', defchar);
    return option;
}

function createFeaturesBox(feature, place, holder = null) {
    let featuresBox = document.createElement('button');
    featuresBox.id = place[feature];
    featuresBox.classList = 'feature-box default-background border-style border-radius default-inner-shadow default-button input-font-style';

    let featuresImg = document.createElement('img');
    // feautresImg.src = 'images/icons/features/' + place[feature];
    featuresImg.src = 'images/buttons/profile/img_placeholder.jpg';

    let featuresText = document.createElement('span');
    featuresText.textContent = translateTo('language', place[feature]);

    featuresBox.appendChild(featuresImg);
    featuresBox.appendChild(featuresText);

    let featureCard = new InfoCard(
        place[feature],
        user.feature[place[feature]].description[language],
        {
            title: translateTo('language', place[feature])
        }
    );

    featuresBox.addEventListener('click', () => { holder.switchCard(featureCard, featuresBox); })

    return featuresBox;
}

function createCharacteristicBox(characteristic, group, groupId, place, selectArray = null) {
    let characteristicBox = document.createElement('div');
    characteristicBox.dataset.id = groupId;
    characteristicBox.dataset.group = group;
    characteristicBox.classList = 'characteristic-box default-background border-style border-radius default-inner-shadow';
    let characteristicText;

    if ((selectArray != null) && group) {
        characteristicText = document.createElement('select');
        characteristicText.classList = 'select-padding default-background input-font-style';
        characteristicText.addEventListener('change', function () { additionalCharacteristicSelected(this, selectArray) });

        // characteristicText.appendChild(createOptionForChooseCharacteristic("Select item"));
        if (Array.isArray(selectArray)) {
            for (let defchar of selectArray) {
                characteristicText.appendChild(createOptionForChooseCharacteristic(defchar));
            }
        }
        else {
            for (let defchar in selectArray) {
                characteristicText.appendChild(createOptionForChooseCharacteristic(defchar));
            }
        }
    }
    else {
        characteristicText = document.createElement('span');
        characteristicText.textContent = translateTo('language', characteristic);
    }

    characteristicBox.appendChild(characteristicText);

    if (place && place[characteristic]) {
        let characteristicValue = document.createElement('span');
        characteristicValue.textContent = addSignToNumber(place[characteristic]);
        characteristicBox.appendChild(characteristicValue);
    }

    return characteristicBox;
}

function getRaceGrowthWeight(race, subrace) {
    return ((subrace == "") ? user.race[race].growthWeight : user.race[race].subrace[subrace].growthWeight)
}

function rollGrowthWeight(raceP) {
    let growthWeightObject = getRaceGrowthWeight(raceP.raceSelect.value, raceP.subraceSelect.value);
    let growthCube = growthWeightObject.growthCube;
    let gRollResult = rollDice(growthCube[0], growthCube[1]).value;

    let isMetric = (getCookie("isMetric") == "true");

    let multiplier = (isMetric ? 2.54 : 1);
    let gDivider = (isMetric ? 100 : 12);
    let gMeasure = measureSystem[isMetric | 0];

    let baseG = [
        Math.floor((growthWeightObject.baseGrowth * multiplier) / gDivider),
        ((growthWeightObject.baseGrowth * multiplier) % gDivider)
    ];

    let rollG = [
        Math.floor((gRollResult * multiplier) / gDivider),
        ((gRollResult * multiplier) % gDivider)
    ];

    let resultG = [
        Math.floor((baseG[0] + rollG[0]) + (baseG[1] + rollG[1]) / gDivider),
        ((baseG[1] + rollG[1]) % gDivider)
    ];

    document.getElementById('growth-base').textContent = "" + baseG[0] + gMeasure[0] + (isMetric ? " " : "") + Math.round(baseG[1]) + gMeasure[1] + " + ";
    document.getElementById('growth-roll').textContent = "" + rollG[0] + gMeasure[0] + (isMetric ? " " : "") + Math.round(rollG[1]) + gMeasure[1] + " = ";
    document.getElementById('growth-result').textContent = "" + resultG[0] + gMeasure[0] + (isMetric ? " " : "") + Math.round(resultG[1]) + gMeasure[1];

    let weightCube = growthWeightObject.weightCube;
    let wRollResult = rollDice(weightCube[0], weightCube[1]).value;

    let wDivider = (isMetric ? KGTOLBCONST : 1);
    let wMeasure = weightSystem[isMetric | 0];

    let baseW = growthWeightObject.baseWeight;
    let rollW = wRollResult * gRollResult;
    let resultW = (baseW + rollW);

    if (isMetric) {
        charHeight = Math.round(resultG[0] * gDivider + resultG[1]);
        charWeight = Math.round(lbToKg(resultW));
    } else {
        charHeight = Math.round(resultG[0] * gDivider + resultG[1]);
        charWeight = Math.round(resultW);
    }

    baseW /= wDivider;
    rollW /= wDivider;
    resultW /= wDivider;

    document.getElementById('weight-base').textContent = "" + baseW.toFixed(0) + " " + wMeasure + " + ";
    document.getElementById('weight-roll').textContent = "" + rollW.toFixed(0) + " " + wMeasure + " = ";
    document.getElementById('weight-result').textContent = "" + resultW.toFixed(0) + " " + wMeasure;
}

function rollPersonalityField(personality) {
    if (personality == "traits")
        traitsText.textContent = user.background[backgroundSelect.value].personality.personalityTraits[
            getRandomInRange(0, user.background[backgroundSelect.value].personality.personalityTraits.length - 1)
        ];
    else if (personality == "ideals")
        idealsText.textContent = user.background[backgroundSelect.value].personality.ideals[
            getRandomInRange(0, user.background[backgroundSelect.value].personality.ideals.length - 1)
        ];
    else if (personality == "bonds")
        bondsText.textContent = user.background[backgroundSelect.value].personality.bonds[
            getRandomInRange(0, user.background[backgroundSelect.value].personality.bonds.length - 1)
        ];
    else if (personality == "flaws")
        flawsText.textContent = user.background[backgroundSelect.value].personality.flaws[
            getRandomInRange(0, user.background[backgroundSelect.value].personality.flaws.length - 1)
        ];
}

function changeRaceCard() {
    raceCard.querySelector('#add-info-race-img').src = 'Images/creatures/humanoids/races/' + raceSelect.value + '.png'
    raceCard.querySelector('#add-info-race-text').textContent = "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum magni quasi dolores non molestiae quae quia quod, ab eaque dignissimos.";
}

// Load functions

function loadCharacteristicsCards() {
    let fragment = new DocumentFragment();
    for (let card in characteristicCards) {
        fragment.append(characteristicCards[card].card);
        characteristicCards[card].baseTr.lastChild.firstChild.dispatchEvent(new Event('change'));
        characteristicCards[card].calcModifiers();
    }
    document.getElementById('characteristics-page').append(fragment);
}

function loadAlignmentSelect() {
    let fragment = new DocumentFragment();
    for (let alignment of user.alignment) {
        Select.add(fragment, alignment, translateTo('language', alignment));
    }
    alignmentSelect.append(fragment);
}

function loadBackgroundSelect() {
    let fragment = new DocumentFragment();
    for (let background in user.background) {
        Select.add(fragment, background, translateTo('language', background));
    }
    backgroundSelect.append(fragment);
}

function loadSkills() {
    clearElement(skillsBox);
    for (let skill of user.background[backgroundSelect.value].skillProfencies) {
        let skillsBoxElement = createCharacteristicBox(skill, false, skill, user.background[backgroundSelect.value].skillProfencies);
        skillsBox.appendChild(skillsBoxElement);
    }
    dispatchAllSelect(skillsBox);
}

function loadLanguages() {
    clearElement(languagesBox);
    if (user.background[backgroundSelect.value].languages <= 0) {
        languagesBox.display = 'none';
    }
    else {
        for (let language = 0; language < user.background[backgroundSelect.value].languages; language++) {
            let languagesBoxElement = createCharacteristicBox(`any${language}`, true, "anyLanguage0", user.background[backgroundSelect.value].languages, allLanguages);
            languagesBox.appendChild(languagesBoxElement);
        }
        dispatchAllSelect(languagesBox);
    }
}

function loadEquipment() {
    clearElement(equipmentBox);
    for (let thing of user.background[backgroundSelect.value].equipment) {
        let equipmentBoxElement = createCharacteristicBox(thing, false, thing, user.background[backgroundSelect.value].equipment);
        equipmentBox.appendChild(equipmentBoxElement);
    }
    for (let choice = 0; choice < user.background[backgroundSelect.value].equipmentToChoice; choice++) {
        let equipmentBoxElement = createCharacteristicBox(`any${choice}`, true, "anyChoice0", user.background[backgroundSelect.value].equipmentToChoice, user.background[backgroundSelect.value].equipmentToChooseFrom[choice]);
        equipmentBox.appendChild(equipmentBoxElement);
    }
    dispatchAllSelect(equipmentBox);
}

function backgroundSelected() {
    rollPersonalityField("traits");
    rollPersonalityField("ideals");
    rollPersonalityField("bonds");
    rollPersonalityField("flaws");
    loadSkills();
    loadLanguages();
    loadEquipment();
}

function additionalCharacteristicSelected(element, array) {
    let wrapper = Array.from(element.parentElement.parentElement.querySelectorAll(`[data-id="${element.parentElement.dataset.id}"][data-group="true"]`));
    if (wrapper.length == 0) return;

    if (!Array.isArray(array)) { array = Object.keys(array); }

    for (let i = 1; i <= wrapper.length; i++) {
        if (i == wrapper.length) {
            i = 0;
        }
        let oldValue = wrapper[i].firstChild.value;
        clearElement(wrapper[i].firstChild);
        for (let defchar of array) {
            let j = 0;
            for (; j < wrapper.length; j++) {
                if (defchar == wrapper[j].firstChild.value) {
                    break;
                }
            }
            if (j == wrapper.length) {
                wrapper[i].firstChild.append(createOptionForChooseCharacteristic(defchar))
            }
        }
        if ((wrapper[i].firstChild.value = oldValue) && (wrapper[i].firstChild.value == "")) {
            wrapper[i].firstChild.value = wrapper[i].firstChild.firstChild.value;
        }
        if (i == 0) {
            break;
        }
    }

    let oldValue = wrapper[0].firstChild.value;
    clearElement(wrapper[0].firstChild)
    for (let defchar of array) {
        let j = 1;
        for (; j < wrapper.length; j++) {
            if (defchar == wrapper[j].firstChild.value) {
                break;
            }
        }
        if (j == wrapper.length) {
            wrapper[0].firstChild.append(createOptionForChooseCharacteristic(defchar))
        }
    }
    if ((wrapper[0].firstChild.value = oldValue) && (wrapper[0].firstChild.value == "")) {
        wrapper[0].firstChild.value = wrapper[0].firstChild.firstChild.value;
    }
}

function getBackgroundLanguageArray() {
    let out = [];
    Array.from(languagesBox.childNodes).forEach(language => {
        if (language.id.substr(0, 3) == "any") {
            out.push(language.firstChild.value.replace("Lang", "").toLowerCase());
        } else {
            out.push(language.firstChild.textContent.replace("Lang", "").toLowerCase());
        }
    });
    return out;
}
class Select {
    static add(select, value, text) {
        let option = document.createElement('option');
        option.value = value;
        option.textContent = translateTo('language', text);
        select.append(option);
    }

    static isEmpty(select) {
        return !select.firstChild;
    }
}
class InfoCardHolder {
    constructor() {
        this.box = document.createElement('div');
        this.box.classList = 'add-info-box default-background border-style border-radius default-shadow';
        this.isSwitching = false;
        this.isMainCard = false;
        this.currentCard;
        this.currentElement;
    }

    setMainCard(mainCard) {
        this.mainCard = mainCard;
        this.isMainCard = true;
        this.currentCard = this.mainCard;
    }

    removeMainCard() {
        delete this.mainCard;
    }

    switchCard(InfoCard, element = null) {
        if (this.isSwitching) { return; }
        else if (this.mainCard && this.isMainCard && (InfoCard.box == this.mainCard)) { return; }
        if (element) {
            if (this.currentElement) {
                this.currentElement.classList.toggle('item-pressed');
            }
            if (this.currentElement != element) {
                this.currentElement = element;
                this.currentElement.classList.toggle('item-pressed');
            }
        }
        this.isSwitching = true;
        this.box.style.transform = "rotateY(90deg)";

        setTimeout(() => {
            this.box.querySelector('div').style.filter = "blur(2px)";
        }, 600);

        setTimeout(() => {
            this.box.querySelector('div').style.filter = "";
            clearElement(this.box);
            if (this.mainCard && !this.isMainCard && this.currentCard == InfoCard.box) {
                this.isMainCard = true;
                this.currentCard = this.mainCard;
                this.box.appendChild(this.mainCard);
            } else {
                this.isMainCard = false;
                this.currentCard = InfoCard.box;
                this.box.appendChild(InfoCard.box);
            }
            this.box.style.transform = "rotateY(0deg)";
            this.box.querySelector('div').style.filter = "blur(2px)";
            setTimeout(() => {
                this.box.querySelector('div').style.filter = "";
                this.isSwitching = false;
            }, 400);
        }, 1000);
    }
}
class InfoCard {
    constructor(id, text, options = {}) {
        options = {
            title: "",
            picture: "",
            animation: false,
            ...options
        }

        this.box = document.createElement('div');
        this.box.id = id + '-card';
        this.box.classList = 'card-box';

        this.text = document.createElement('span');
        this.text.classList = 'card-description';
        this.text.innerText = text;

        if (options.picture == "") {
            this.title = document.createElement('span');
            this.title.classList = 'card-title';
            this.title.innerText = options.title;

            this.box.append(this.title);
        } else {
            this.img = document.createElement('img');
            this.img.classList = 'add-info-img';
            this.img.src = options.picture;

            this.box.append(this.img);
        }

        this.box.append(this.text);

        if (options.animation) {
            this.animationBox = document.createElement('div');
            this.animationBox.classList = 'card-bottom-animation-box';

            this.animation = document.createElement('div');
            this.animation.classList = 'card-bottom-animation';
            this.animation.dataset.animation = true;

            this.animationInner = document.createElement('div');
            this.animationInner.classList = 'card-bottom-animation-inner';
            this.animationInner.dataset.animation = true;

            this.animation.append(this.animationInner);
            this.animationBox.append(this.animation);

            this.box.append(this.animationBox);
        }
    }

    setText(text) {
        this.text.innerText = text;
    }

    setImg(src) {
        this.img.src = src;
    }
}

class Race_ {
    constructor(block) {
        // Caching
        this.rootPage = block.getElementById('race-page');

        this.raceSelect = block.getElementById('race-select');
        this.subraceSelect = block.getElementById('subrace-select');
        this.characteristicsIncreaseElements = block.getElementById("characteristics-increase-elements")
        this.raceTraitsFeaturesElements = block.getElementById("race-traits-features-elements");
        this.subraceBoxCached = this.subraceSelect.parentElement;
        this.raceChoosingBox = document.getElementById('race-choosing-box');

        // Creating objects
        this.infoCardHolder = new InfoCardHolder();

        this.raceCard = new InfoCard(
            "race",
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum magni quasi dolores non molestiae quae quia quod, ab eaque dignissimos.",
            {
                picture: "Images/creatures/humanoids/races/rc_dwarf.png",
                animation: true
            });

        // Installation
        this.infoCardHolder.setMainCard(this.raceCard.box);

        for (let race in user.race) {
            Select.add(this.raceSelect, race, translateTo('language', race));
        }

        // Installing event listeners
        this.raceSelect.addEventListener('change', () => { this.load(this.raceSelect.value); });
        this.subraceSelect.addEventListener('change', () => { this.loadSubrace(this.subraceSelect.value) });

        // Adding to DOM
        this.infoCardHolder.box.append(this.raceCard.box);
        this.rootPage.prepend(this.infoCardHolder.box);

        // Dispatching events
        this.raceSelect.dispatchEvent(new Event('change'));
        this.subraceSelect.dispatchEvent(new Event('change'));
    }

    load(raceName) {
        this.raceObject = user.race[raceName];

        clearElement(this.subraceSelect);
        clearElement(this.characteristicsIncreaseElements);
        clearElement(this.raceTraitsFeaturesElements);
        // changeRaceCard();

        for (let feature in this.raceObject.skill) {
            let featuresBox = createFeaturesBox(feature, this.raceObject.skill, this.infoCardHolder);
            featuresBox.dataset.origin = "race";
            this.raceTraitsFeaturesElements.appendChild(featuresBox);
        }

        for (let characteristic in this.raceObject.abilityScoreInc) {
            let characteristicBox = createCharacteristicBox(characteristic, (characteristic.substr(0, 3) == "any"), "anyFeature0", this.raceObject.abilityScoreInc, allCharacteristics);
            characteristicBox.dataset.origin = "race";
            this.characteristicsIncreaseElements.appendChild(characteristicBox);
        }
        dispatchAllSelect(this.characteristicsIncreaseElements);

        for (let subrace in this.raceObject.subrace) {
            Select.add(this.subraceSelect, subrace, translateTo('language', subrace));
        }

        if (this.subraceSelect.childElementCount > 0) {
            this.raceChoosingBox.append(this.subraceBoxCached);
            this.subraceSelect.dispatchEvent(new Event('change'));
        }
        else {
            if (this.subraceBoxCached.parentElement) { this.subraceBoxCached.parentElement.removeChild(this.subraceBoxCached) }
            for (let card in characteristicCards)
                CharacteristicsCard.calcSum(characteristicCards[card]);
        }

        rollGrowthWeight(this);
    }

    loadSubrace(subraceName) {
        this.subraceObject = this.raceObject.subrace[subraceName];

        this.raceFeatures = [];

        Array.from(this.characteristicsIncreaseElements.childNodes).forEach(node => {
            if (node.dataset.origin == "subrace") { this.characteristicsIncreaseElements.removeChild(node); }
        });

        Array.from(this.raceTraitsFeaturesElements.childNodes).forEach(node => {
            node.dataset.origin == "subrace"
                ? this.raceTraitsFeaturesElements.removeChild(node)
                : this.raceFeatures.push(node.id);
        });

        for (let feature in this.subraceObject.skill) {
            if (!(this.subraceObject.skill[feature] in this.raceFeatures)) {
                let featuresBox = createFeaturesBox(feature, this.subraceObject.skill, this.infoCardHolder);
                featuresBox.dataset.origin = "subrace";
                this.raceTraitsFeaturesElements.appendChild(featuresBox);
            }
        }

        for (let characteristic in this.subraceObject.abilityScoreInc) {
            let characteristicBox = createCharacteristicBox(characteristic, characteristic.substr(0, 3) == "any", "anyFeature0", this.subraceObject.abilityScoreInc, allCharacteristics);
            characteristicBox.dataset.origin = "subrace";
            this.characteristicsIncreaseElements.appendChild(characteristicBox);
        }
        dispatchAllSelect(this.characteristicsIncreaseElements);

        for (let card in characteristicCards) {
            CharacteristicsCard.calcSum(characteristicCards[card]);
        }
    }
}
class Class_ {
    constructor(block) {
        // Caching
        this.rootPage = block.getElementById('class-page');
        this.classObject = null;

        this.classSelect = block.getElementById('class-select');

        this.hitDice = block.getElementById('hit-dice-value');
        this.hitDiceStart = block.getElementById('hit-dice-start-value');
        this.hitDiceNext = block.getElementById('hit-dice-next-value');

        this.armor = block.getElementById('armor-value');
        this.weapon = block.getElementById('weapon-value');
        this.tools = block.getElementById('tools-value');
        this.savingThrows = block.getElementById('saving-throws-value');
        this.skill = block.getElementById('skill-value');
        this.equipment = block.getElementById('class-equipment');
        this.money = block.getElementById('class-money');

        // Creating objects
        this.infoCardHolder = new InfoCardHolder();

        this.classCard = new InfoCard(
            "class",
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum magni quasi dolores non molestiae quae quia quod, ab eaque dignissimos.",
            {
                picture: "Images/creatures/humanoids/races/rc_dwarf.png",
                animation: true
            });

        this.testCard = new InfoCard(
            "some-feature",
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eveniet, rem?",
            {
                title: "Тестовая способность"
            }
        )

        // Installation
        this.infoCardHolder.setMainCard(this.classCard.box);

        for (let class_ in user.class) {
            Select.add(this.classSelect, class_, translateTo('language', class_));
        }

        // Installing event listeners
        this.classSelect.addEventListener('change', () => { this.load(this.classSelect.value); });

        // Appending to DOM
        this.infoCardHolder.box.append(this.classCard.box);
        this.rootPage.prepend(this.infoCardHolder.box);

        // Init
        this.classSelect.dispatchEvent(new Event('change'));
    }

    load(className) {
        this.classObject = user.class[className];

        this.classCard.setText(this.classObject.init.description);
        this.classCard.setImg("Images/creatures/humanoids/races/" + "rc_dwarf" + ".png"); //className

        this.hitDice.innerText = `1d${this.classObject.init.hitDiceCoeffiecient}`;
        this.hitDiceStart.innerText = `${this.classObject.hpStart} + ${translateTo('language', "constitution modifier")}`;
        this.hitDiceNext.innerText = `${this.classObject.hpNext.roll[0]}d${this.classObject.hpNext.roll[1]} (${translateTo('language', "or")} ${this.classObject.hpNext.const}) + ${translateTo('language', "constitution modifier")}`;

        fillSpanWithComma(this.armor, this.classObject.init.proficiencies.armor);
        fillSpanWithComma(this.weapon, this.classObject.init.proficiencies.weapon);
        fillSpanWithComma(this.tools, this.classObject.init.proficiencies.tools);
        fillSpanWithComma(this.savingThrows, this.classObject.init.savingThrowsBonus);

        clearElement(this.skill);
        for (let skill = 0; skill < this.classObject.init.skillsChoice; skill++) {
            let skillBoxElement = createCharacteristicBox(`anyClassSkill`, true, "anyClassSkill", this.classObject.init.skillsChoice, this.classObject.init.skill);
            this.skill.appendChild(skillBoxElement);
        }
        dispatchAllSelect(this.skill);

        clearElement(this.equipment);
        for (let equipment of this.classObject.init.equipment) {
            let equipmentBoxElement = createCharacteristicBox(equipment, false, this.classObject.init.equipment);
            this.equipment.appendChild(equipmentBoxElement);
        }
        for (const [index, eq] of this.classObject.init.equipmentToChooseFrom.entries()) {
            for (let equipment = 0; equipment < this.classObject.init.equipmentToChoice; equipment++) {
                let equipmentBoxElement = createCharacteristicBox(`anyClassEquipment${index}`, true, `anyClassEquipment${index}`, this.classObject.init.equipmentToChoice, eq);
                this.equipment.appendChild(equipmentBoxElement);
            }
        }
        dispatchAllSelect(this.equipment);

        clearElement(this.money);
        let goldText = document.createElement('span');
        goldText.textContent = translateTo('language', "Gold") + ": " + (rollDice(this.classObject.init.money.diceCount, this.classObject.init.money.diceType).value * this.classObject.init.money.multiplyBy) + " " + translateTo('language', "Coins");
        this.money.appendChild(goldText);
    }
}

function writeToCharacter() {
    // Name
    newCharacter.playerName = user.name;
    newCharacter.charName = document.getElementById('name').textContent;

    // Primary fields
    newCharacter.race = raceSelect.value;
    newCharacter.class = classSelect.value;
    newCharacter.alignment = alignmentSelect.value;
    newCharacter.background = backgroundSelect.value;

    // Level
    newCharacter.level = 1;
    newCharacter.experience = 0;

    // Hp
    newCharacter.hp = user.class[classSelect.value].hpStart;
    newCharacter.hpNext = user.class[classSelect.value].hpNext;
    newCharacter.hpTemp = newCharacter.hp;
    newCharacter.hpMax = newCharacter.hp;
    newCharacter.hitDiceCoeffiecient = user.class[classSelect.value].init.hitDiceCoeffiecient;
    newCharacter.hitDiceLeft = 1;

    // Capability
    newCharacter.speed = user.race[raceSelect.value].speed;
    newCharacter.maxWeight = Math.round10(lbToKg(newCharacter.abilityScore.strength * 15), -1);

    // Personality
    // newCharacter.age =
    newCharacter.height = charHeight;
    newCharacter.weight = charWeight;

    newCharacter.traits = traitsText.textContent;
    newCharacter.ideals = idealsText.textContent;
    newCharacter.bonds = bondsText.textContent;
    newCharacter.flaws = flawsText.textContent;

    // Passive
    // newCharacter.armorClass = 0;
    // newCharacter.initiative = 0;
    // newCharacter.proficiencyBonus = 0;
    newCharacter.passiveWisdom = 10 + newCharacter.abilityScoreBonus.wisdomBonus;

    // Ability
    for (let abilityCard in characteristicCards) {
        newCharacter.abilityScore[characteristicCards[abilityCard].characteristic] = characteristicCards[abilityCard].getTotalScore();
        newCharacter.abilityScoreBonus[characteristicCards[abilityCard].characteristic + "Bonus"] = characteristicCards[abilityCard].getCalcModifier();
    }

    // Proficiency
    for (let proficiencyGroup in user.class[classSelect.value].init.proficiencies) {
        this.addToSetFromObjectOrArray(newCharacter.proficiencies[proficiencyGroup],
            user.class[classSelect.value].init.proficiencies[proficiencyGroup]);
    }
    this.ifHasSetPropertyToTrue(newCharacter.savingThrowProf, user.class[classSelect.value].init.savingThrowsBonus);
    this.ifHasSetPropertyToTrue(newCharacter.skillProf, user.background[backgroundSelect.value].skillProfencies);

    // Money
    for (let coin in newCharacter.money) {
        newCharacter.money[coin] += user.background[backgroundSelect.value].money[coin];
    }

    // Language
    this.addToSetFromObjectOrArray(newCharacter.languages, user.race[raceSelect.value].languages);
    this.addToSetFromObjectOrArray(newCharacter.languages, user.race[raceSelect.value].subrace[subraceSelect.value].languages);
    this.addToSetFromObjectOrArray(newCharacter.languages, getBackgroundLanguageArray());
}

// When DOM is loaded

window.addEventListener("load", function () {
    user = JSON.parse(localStorage[localStorage.loggedUser]);
    userJSONFix();
    choosedCharacter = user["character" + localStorage.numOfChoosedChar];
    choosedCharacter.json = user.defaultCharacter;

    raceP = new Race_(document);
    classP = new Class_(document);
    // Characteristics = new Characteristics(document);
    // Personality = new Personality(document);
    characteristicCards = {
        "strengthCard": new CharacteristicsCard("strength"),
        "dexterityCard": new CharacteristicsCard("dexterity"),
        "constitutionCard": new CharacteristicsCard("constitution"),
        "intelligenceCard": new CharacteristicsCard("intelligence"),
        "wisdomCard": new CharacteristicsCard("wisdom"),
        "charismaCard": new CharacteristicsCard("charisma")
    }

    loadAlignmentSelect();
    loadCharacteristicsCards();
    loadBackgroundSelect();

    backgroundSelected();
});