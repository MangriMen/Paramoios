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

let raceChoosingBox = document.getElementById('race-choosing-box');
let raceSelect = document.getElementById('race-select');
let subraceSelect = document.getElementById('subrace-select');
let subraceBoxCached = subraceSelect.parentElement;
// let classSelect = document.getElementById('class-select');
let alignmentSelect = document.getElementById('alignment');
let backgroundSelect = document.getElementById('background-select');
let characteristicsIncreaseElements = document.getElementById('characteristics-increase-elements');
let raceTraitsFeaturesElements = document.getElementById('race-traits-features-elements');
let addInfoBox = document.getElementById('race-add-info-box');
let raceCard = document.getElementById('race-card');
let addInfoBoxBackground = document.getElementById('add-info-box-background');
let backgroundCard = document.getElementById('background-card');
let manuallyCheckbox = document.getElementById('manually-checkbox');

let selectedAdditionalInfo = null;
let selectedAdditionalInfoBackground = null;
let isSwitching = false;
let isSwitchingBackground = false;

let raceFeatures = [];

document.getElementById('growth-primary-measure').textContent = measureSystem[isMetric | 0][0];
document.getElementById('growth-secondary-measure').textContent = measureSystem[isMetric | 0][1];
document.getElementById('weight-measure').textContent = weightSystem[isMetric | 0];

raceSelect.addEventListener('change', raceSelected);
raceSelect.addEventListener('change', optionSelected);
raceSelect.addEventListener('change', rollGrowthWeight);

subraceSelect.addEventListener('change', subraceSelected);
subraceSelect.addEventListener('change', optionSelected);

document.getElementById('roll-growth-weight-button').addEventListener('click', rollGrowthWeight);

backgroundSelect.addEventListener('change', backgroundSelected);
backgroundSelect.addEventListener('change', optionSelected);

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
        this.raceTr.lastChild.textContent = "+" + zeroIfUndefined(user.race[raceSelect.value].abilityScoreInc[this.characteristic]);
        if (subraceSelect.firstChild)
            this.raceTr.lastChild.textContent = "+" + zeroIfUndefined(user.race[raceSelect.value].subrace[subraceSelect.value].abilityScoreInc[this.characteristic]);
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

let characteristicCards = {
    "strengthCard": new CharacteristicsCard("strength"),
    "dexterityCard": new CharacteristicsCard("dexterity"),
    "constitutionCard": new CharacteristicsCard("constitution"),
    "intelligenceCard": new CharacteristicsCard("intelligence"),
    "wisdomCard": new CharacteristicsCard("wisdom"),
    "charismaCard": new CharacteristicsCard("charisma")
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

function createInfoCardFromFeature(feature, place) {
    let card = document.createElement('div');
    card.id = feature + '-card';
    card.classList = 'card-box';

    let cardTitle = document.createElement('span');
    cardTitle.classList = 'card-title';
    cardTitle.textContent = translateTo('language', feature);

    let cardDescription = document.createElement('span');
    cardDescription.classList = 'card-description';
    if (place.hasOwnProperty(feature) && place[feature].hasOwnProperty('description')) {
        if (place[feature].description.hasOwnProperty(language)) {
            cardDescription.innerText = place[feature].description[language];
        }
        else {
            cardDescription.innerText = translateTo('language', "Missing Description");
        }
    }
    else {
        cardDescription.innerText = translateTo('language', "Missing Description");
    }

    card.appendChild(cardTitle);
    card.appendChild(cardDescription);

    return card;
}

function switchCard(element) {
    addInfoBox.style.transform = "rotateY(90deg)";

    setTimeout(() => {
        addInfoBox.querySelector('div').style.filter = "blur(2px)";
    }, 600);

    setTimeout(() => {
        addInfoBox.querySelector('div').style.filter = "";
        clearElement(addInfoBox);
        addInfoBox.appendChild((element == "race" ? raceCard : createInfoCardFromFeature(element.id, user.feature)));
        addInfoBox.style.transform = "rotateY(0deg)";
        addInfoBox.querySelector('div').style.filter = "blur(2px)";
        setTimeout(() => {
            addInfoBox.querySelector('div').style.filter = "";
            isSwitching = false;
        }, 400);
    }, 1000);
}

function additionalSelect(element) {
    if (selectedAdditionalInfo != null) {
        selectedAdditionalInfo.classList.toggle('item-pressed');
    }
    selectedAdditionalInfo = element;
    selectedAdditionalInfo.classList.toggle('item-pressed');
}

function additionalUnselect() {
    selectedAdditionalInfo.classList.toggle('item-pressed');
    selectedAdditionalInfo = null;
}

function displayAdditionalInfo() {
    if (!isSwitching) {
        isSwitching = true;
        if (selectedAdditionalInfo != this) {
            additionalSelect(this);
            switchCard(this);
        }
        else {
            additionalUnselect();
            switchCard("race");
        }
    }
}

function createFeaturesBox(feature, place) {
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

    featuresBox.addEventListener('click', displayAdditionalInfo);

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

function rollGrowthWeight() {
    let growthWeightObject = getRaceGrowthWeight(raceSelect.value, subraceSelect.value);
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

function loadRaceSelect() {
    for (let race in user.race) {
        let option = document.createElement('option');
        option.value = race;
        option.textContent = translateTo('language', race);
        raceSelect.appendChild(option);
    }
}

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
    for (let alignment of user.alignment) {
        let option = document.createElement('option');
        option.value = alignment;
        option.textContent = translateTo('language', alignment);
        alignmentSelect.append(option);
    }
}

function loadBackgroundSelect() {
    let fragment = new DocumentFragment();
    for (let background in user.background) {
        let option = document.createElement('option');
        option.value = background;
        option.textContent = translateTo('language', background);
        fragment.append(option);
    }
    backgroundSelect.append(fragment);
}

function loadSkills() {
    clearElement(skillsBox);
    for (let skill of user.background[backgroundSelect.value].skillProfencies) {
        let skillsBoxElement = createCharacteristicBox(skill, false, skill, user.background[backgroundSelect.value].skillProfencies);
        skillsBox.appendChild(skillsBoxElement);
    }
    // dispatchAllSelect(skillsBox);
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

// Select chage event catched

function optionSelected() {
    choosedCharacter.json[this.id.split('-')[0]] = this.value;
}

function raceSelected() {
    clearElement(subraceSelect);
    clearElement(characteristicsIncreaseElements);
    clearElement(raceTraitsFeaturesElements);
    changeRaceCard();
    for (let feature in user.race[raceSelect.value].skill) {
        let featuresBox = createFeaturesBox(feature, user.race[raceSelect.value].skill);
        featuresBox.dataset.origin = "race";
        raceTraitsFeaturesElements.appendChild(featuresBox);
    }
    for (let characteristic in user.race[raceSelect.value].abilityScoreInc) {
        let characteristicBox = createCharacteristicBox(characteristic, (characteristic.substr(0, 3) == "any"), "anyFeature0", user.race[raceSelect.value].abilityScoreInc, allCharacteristics);
        characteristicBox.dataset.origin = "race";
        characteristicsIncreaseElements.appendChild(characteristicBox);
    }
    dispatchAllSelect(characteristicsIncreaseElements);
    for (let subrace in user.race[raceSelect.value].subrace) {
        let option = document.createElement('option');
        option.value = subrace;
        option.textContent = translateTo('language', subrace);
        subraceSelect.appendChild(option);
    }

    if (subraceSelect.childElementCount > 0) {
        raceChoosingBox.append(subraceBoxCached);
    }
    else {
        if (subraceBoxCached.parentElement) { subraceBoxCached.parentElement.removeChild(subraceBoxCached) }
    }

    if (subraceSelect.firstChild)
        subraceSelect.dispatchEvent(new Event('change'));
    else {
        for (let card in characteristicCards)
            CharacteristicsCard.calcSum(characteristicCards[card]);
    }
    rollGrowthWeight();
}

function subraceSelected() {
    raceFeatures = [];
    Array.from(characteristicsIncreaseElements.childNodes).forEach(node => {
        if (node.dataset.origin == "subrace") {
            characteristicsIncreaseElements.removeChild(node);
        }
    });
    Array.from(raceTraitsFeaturesElements.childNodes).forEach(node => {
        if (node.dataset.origin == "subrace") {
            raceTraitsFeaturesElements.removeChild(node);
        }
        else {
            raceFeatures.push(node.id);
        }
    });
    for (let feature in user.race[raceSelect.value].subrace[subraceSelect.value].skill) {
        if (!(user.race[raceSelect.value].subrace[subraceSelect.value].skill[feature] in raceFeatures)) {
            let featuresBox = createFeaturesBox(feature, user.race[raceSelect.value].subrace[subraceSelect.value].skill);
            featuresBox.dataset.origin = "subrace";
            raceTraitsFeaturesElements.appendChild(featuresBox);
        }
    }
    for (let characteristic in user.race[raceSelect.value].subrace[subraceSelect.value].abilityScoreInc) {
        let characteristicBox = createCharacteristicBox(characteristic, characteristic.substr(0, 3) == "any", "anyFeature0", user.race[raceSelect.value].subrace[subraceSelect.value].abilityScoreInc, allCharacteristics);
        characteristicBox.dataset.origin = "subrace";
        characteristicsIncreaseElements.appendChild(characteristicBox);
    }
    // dispatchAllSelect(characteristicsIncreaseElements);

    for (let card in characteristicCards)
        CharacteristicsCard.calcSum(characteristicCards[card]);
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

// class BoundedSelect {
//     constructor() {

//     }
// }

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

function dispatchAllSelect(box) {
    Array.from(box.getElementsByTagName('select')).forEach(element => {
        element.dispatchEvent(new Event('change'));
    });
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
    constructor(select) {
        this.element = select;
    }

    getValue() {
        return this.element.value;
    }

    addNew(value, text) {
        let option = document.createElement('option');
        option.value = value;
        option.textContent = translateTo('language', text);
        this.element.append(option);
    }

    addOption(option) {
        this.element.append(option);
    }

    clear() {
        clearElement(this.element);
    }

    isEmpty() {
        if (this.element.firstChild) {
            return 0;
        }
        return 1;
    }
}

function fillSpanWithComma(span, inputArray) {
    let isComma = false;
    span.innerText = '';
    if (inputArray.length == 0) {
        span.innerText += translateTo('language', "None");
        return;
    }
    for (let element of inputArray) {
        span.innerText += (isComma ? ", " : "") + translateTo('language', element);
        isComma = true;
    }
}

class Builder {
    constructor(block) {
        let builder = this;
        user = JSON.parse(localStorage[localStorage.loggedUser]);
        userJSONFix();
        this.infoCardHolder = class InfoCardHolder {
            constructor() {
                this.box = document.createElement('div');
                this.box.classList = 'add-info-box default-background border-style border-radius default-shadow';
                this.isSwitching = false;
                this.isMainCard = false;
            }

            setMainCard(mainCard) {
                this.mainCard = mainCard;
                this.isMainCard = true;
            }

            removeMainCard() {
                delete this.mainCard;
            }

            switchCard(InfoCard) {
                if (this.isSwitching) { return; }
                else if (this.mainCard && this.isMainCard && (InfoCard.box == this.mainCard)) { return; }
                this.isSwitching = true;
                this.box.style.transform = "rotateY(90deg)";

                setTimeout(() => {
                    this.box.querySelector('div').style.filter = "blur(2px)";
                }, 600);

                setTimeout(() => {
                    this.box.querySelector('div').style.filter = "";
                    clearElement(this.box);
                    if (this.mainCard && !this.isMainCard) {
                        this.isMainCard = true;
                        this.box.appendChild(this.mainCard);
                    } else {
                        this.isMainCard = false;
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
        this.infoCard = class InfoCard {
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
        this.race = class Race {
            constructor(block) {
                // this.rootPage = block.getElementById('class-page');
                // this.raceSelect = new Select(block.getElementById('race-select'))
                // this.subraceSelect = new Select(block.getElementById('subrace-select'));

                // this.characteristicsIncreaseElements = block.getElementById("characteristics-increase-elements")
                // this.raceTraitsFeaturesElements = block.getElementById("race-traits-features-elements");

                // for (let race in user.race) {
                //     this.raceSelect.addNew(race, translateTo('language', race));
                // }

                // this.raceSelect.element.addEventListener('change', () => { this.load(this.raceSelect.getValue()); });
            }

            load(raceName) {
                let raceObject = user.race[raceName];

                clearElement(this.subraceSelect.element);
                clearElement(this.characteristicsIncreaseElements);
                clearElement(this.raceTraitsFeaturesElements);
                changeRaceCard();
                for (let feature in raceObject.skill) {
                    let featuresBox = createFeaturesBox(feature, raceObject.skill);
                    featuresBox.dataset.origin = "race";
                    this.raceTraitsFeaturesElements.appendChild(featuresBox);
                }
                for (let characteristic in raceObject.abilityScoreInc) {
                    let characteristicBox = createCharacteristicBox(characteristic, false, characteristic, raceObject.abilityScoreInc, allCharacteristics);
                    characteristicBox.dataset.origin = "race";
                    this.characteristicsIncreaseElements.appendChild(characteristicBox);
                }
                // dispatchAllSelect(characteristicsIncreaseElements);
                for (let subrace in raceObject.subrace) {
                    this.subraceSelect.addNew(subrace, translateTo('language', subrace));
                }

                !this.subraceSelect.element.firstChild ? subraceBoxCached.parentElement.removeChild(subraceBoxCached) : raceChoosingBox.append(subraceBoxCached);

                if (!this.subraceSelect.isEmpty())
                    this.subraceSelect.element.dispatchEvent(new Event('change'));
                else {
                    for (let card in characteristicCards)
                        CharacteristicsCard.calcSum(characteristicCards[card]);
                }
                rollGrowthWeight();
            }

            init() {
                // this.raceSelect.element.dispatchEvent(new Event('change'));
            }
        }
        this.class = class Class {
            constructor(block) {
                // Caching
                this.rootPage = block.getElementById('class-page');

                this.classSelect = new Select(block.getElementById('class-select'));

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
                this.infoCardHolder = new builder.infoCardHolder();

                this.classCard = new builder.infoCard(
                    "class",
                    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum magni quasi dolores non molestiae quae quia quod, ab eaque dignissimos.",
                    {
                        picture: "Images/creatures/humanoids/races/rc_dwarf.png",
                        animation: true
                    });

                this.testCard = new builder.infoCard(
                    "some-feature",
                    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eveniet, rem?",
                    {
                        title: "Тестовая способность"
                    }
                )

                // Installation
                this.classSelect.element.addEventListener('change', () => { this.load(this.classSelect.getValue()); });
                this.infoCardHolder.setMainCard(this.classCard.box);

                for (let class_ in user.class) {
                    this.classSelect.addNew(class_, translateTo('language', class_));
                }

                // Appending to DOM
                this.infoCardHolder.box.append(this.classCard.box);
                this.rootPage.prepend(this.infoCardHolder.box);
            }

            load(className) {
                let classObject = user.class[className];

                this.classCard.setText(classObject.init.description);
                this.classCard.setImg("Images/creatures/humanoids/races/" + "rc_dwarf" + ".png"); //className

                this.hitDice.innerText = `1d${classObject.init.hitDiceCoeffiecient}`;
                this.hitDiceStart.innerText = `${classObject.hpStart} + ${translateTo('language', "constitution modifier")}`;
                this.hitDiceNext.innerText = `${classObject.hpNext.roll[0]}d${classObject.hpNext.roll[1]} (${translateTo('language', "or")} ${classObject.hpNext.const}) + ${translateTo('language', "constitution modifier")}`;

                fillSpanWithComma(this.armor, classObject.init.proficiencies.armor);
                fillSpanWithComma(this.weapon, classObject.init.proficiencies.weapon);
                fillSpanWithComma(this.tools, classObject.init.proficiencies.tools);
                fillSpanWithComma(this.savingThrows, classObject.init.savingThrowsBonus);

                clearElement(this.skill);
                for (let skill = 0; skill < classObject.init.skillsChoice; skill++) {
                    let skillBoxElement = createCharacteristicBox(`anyClassSkill`, true, "anyClassSkill", classObject.init.skillsChoice, classObject.init.skill);
                    this.skill.appendChild(skillBoxElement);
                }
                dispatchAllSelect(this.skill);

                clearElement(this.equipment);
                for (let equipment of classObject.init.equipment) {
                    let equipmentBoxElement = createCharacteristicBox(equipment, false, classObject.init.equipment);
                    this.equipment.appendChild(equipmentBoxElement);
                }
                for (const [index, eq] of classObject.init.equipmentToChooseFrom.entries()) {
                    for (let equipment = 0; equipment < classObject.init.equipmentToChoice; equipment++) {
                        let equipmentBoxElement = createCharacteristicBox(`anyClassEquipment${index}`, true, `anyClassEquipment${index}`, classObject.init.equipmentToChoice, eq);
                        this.equipment.appendChild(equipmentBoxElement);
                    }
                }
                dispatchAllSelect(this.equipment);

                clearElement(this.money);
                let goldText = document.createElement('span');
                goldText.textContent = translateTo('language', "Gold") + ": " + (rollDice(classObject.init.money.diceCount, classObject.init.money.diceType).value * classObject.init.money.multiplyBy) + " " + translateTo('language', "Coins");
                this.money.appendChild(goldText);
            }

            init() {
                this.classSelect.element.dispatchEvent(new Event('change'));
            }
        }
        this.race = new this.race(block);
        this.class = new this.class(block);
    }

    addToSetFromObjectOrArray(outputSet, inputObjArr) {
        for (const key in inputObjArr) {
            outputSet.add(inputObjArr[key]);
        }
    }

    ifHasSetPropertyToTrue(objectWithBoolean, inputArray) {
        for (let key of inputArray) {
            if (objectWithBoolean.hasOwnProperty(key)) {
                objectWithBoolean[key] = true;
            }
        }
    }

    init() {
        this.race.init();
        this.class.init();
    }

    writeToCharacter() {
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
}

// Save character

let builder = new Builder(document);

// When DOM is loaded

window.addEventListener("load", function () {
    user = JSON.parse(localStorage[localStorage.loggedUser]);
    userJSONFix();
    choosedCharacter = user["character" + localStorage.numOfChoosedChar];
    choosedCharacter.json = user.defaultCharacter;

    loadRaceSelect();
    loadAlignmentSelect();
    loadCharacteristicsCards();
    loadBackgroundSelect();

    raceSelected();
    builder.init();
    backgroundSelected();
});