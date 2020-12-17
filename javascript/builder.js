'use strict'


let activeTab = null;

let tabs = Array.from(document.getElementsByClassName("navigation-tab"));

tabs.forEach(tab => tab.addEventListener('click', selectPage));
tabs[3].dispatchEvent(new Event('click'));

function selectPage() {
    activeTab = this;
    document.getElementById('tabs').querySelectorAll('span').forEach(tab => {
        tab.classList.remove('active-tab');
        if (tab.id == activeTab.id) { tab.classList.add('active-tab'); }
    })

    document.getElementById('content-page').querySelectorAll('div').forEach(page => {
        if (page.id != activeTab.id + "-page" && page.dataset.type == 'page') { page.style.display = 'none' } else if (page.dataset.type == 'page') { page.style.display = 'grid' };
    })
}

const allAlignments = [
    "Lawful Good",
    "Lawful Neutral",
    "Lawful Evil",
    "Neutral Good",
    "True Neutral",
    "Neutral Evil",
    "Chaotic Good",
    "Chaotic Neutral",
    "Chaotic Evil",
]

const allCharacteristics = [
    "Strength",
    "Dexterity",
    "Constitution",
    "Intelligence",
    "Wisdom",
    "Charisma"
]

const growthWeightTable = {
    "Human": {
        "baseGrowth": 56,
        "growthCube": [2, 10],
        "baseWeight": 110,
        "weightCube": [2, 4]
    },
    "Dwarf mountain": {
        "baseGrowth": 48,
        "growthCube": [2, 4],
        "baseWeight": 130,
        "weightCube": [2, 6]
    },
    "Dwarf hill": {
        "baseGrowth": 44,
        "growthCube": [2, 4],
        "baseWeight": 115,
        "weightCube": [2, 6]
    },
    "Elf High Elf": {
        "baseGrowth": 54,
        "growthCube": [2, 10],
        "baseWeight": 90,
        "weightCube": [1, 4]
    },
    "Elf Wood Elf": {
        "baseGrowth": 54,
        "growthCube": [1, 4],
        "baseWeight": 100,
        "weightCube": [1, 4]
    },
    "Elf Dark Elf(Drow)": {
        "baseGrowth": 53,
        "growthCube": [2, 6],
        "baseWeight": 75,
        "weightCube": [1, 6]
    },
    "Halfling Lightfoot": {
        "baseGrowth": 31,
        "growthCube": [2, 4],
        "baseWeight": 35,
        "weightCube": [1, 1]
    },
    "Halfling Stout": {
        "baseGrowth": 31,
        "growthCube": [2, 4],
        "baseWeight": 35,
        "weightCube": [1, 1]
    },
    "Dragonborn": {
        "baseGrowth": 66,
        "growthCube": [2, 8],
        "baseWeight": 175,
        "weightCube": [2, 6]
    },
    "Gnome Forest Gnome": {
        "baseGrowth": 35,
        "growthCube": [2, 4],
        "baseWeight": 35,
        "weightCube": [1, 1]
    },
    "Gnome Rock Gnome": {
        "baseGrowth": 35,
        "growthCube": [2, 4],
        "baseWeight": 35,
        "weightCube": [1, 1]
    },
    "Half-Elf": {
        "baseGrowth": 57,
        "growthCube": [2, 8],
        "baseWeight": 110,
        "weightCube": [2, 4]
    },
    "Half-Orc": {
        "baseGrowth": 58,
        "growthCube": [2, 10],
        "baseWeight": 140,
        "weightCube": [2, 6]
    },
    "Tiefling": {
        "baseGrowth": 57,
        "growthCube": [2, 8],
        "baseWeight": 110,
        "weightCube": [2, 4]
    },
}

let alignmentSelect = document.getElementById('alignment');
for (let alignment of allAlignments) {
    let option = document.createElement('option');
    option.value = alignment;
    option.textContent = translateTo('language', capitalize('firstOfAllWord', alignment));
    alignmentSelect.append(option);
}

let raceSelect = document.getElementById('race-select');
let subraceSelect = document.getElementById('subrace-select');
let characteristicsIncreaseElements = document.getElementById('characteristics-increase-elements');
let raceTraitsFeaturesElements = document.getElementById('race-traits-features-elements');

raceSelect.addEventListener('change', raceSelected);
subraceSelect.addEventListener('change', subraceSelected);
raceSelect.addEventListener('change', optionSelected);
subraceSelect.addEventListener('change', optionSelected);
raceSelect.addEventListener('change', rollGrowthWeight);
subraceSelect.parentElement.style.display = "none";

let manuallyCheckbox = document.getElementById('manually-checkbox');
manuallyCheckbox.addEventListener('change', displayManuallyGrowthWeight);
manuallyCheckbox.dispatchEvent(new Event('change'));

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
        table.appendChild(this.modifierTr);
        table.appendChild(this.raceTr);
        table.appendChild(this.increaseTr);
        table.appendChild(this.otherTr);
        table.appendChild(this.overrideTr);
        table.appendChild(this.sumTr);

        let tableRoundWrapper = document.createElement('div');
        tableRoundWrapper.classList = 'table-round-wrapper default-inner-shadow';
        tableRoundWrapper.appendChild(table);

        let label = document.createElement('span');
        label.id = this.characteristic + '-label';
        label.classList = 'characteristics-table-label border-radius default-inner-shadow';
        label.textContent = translateTo('language', capitalize('firstOfAllWord', this.characteristic));

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
                removeSignFromNumber(object.modifierTr.lastChild.textContent) +
                removeSignFromNumber(object.raceTr.lastChild.textContent) +
                removeSignFromNumber(object.increaseTr.lastChild.textContent) +
                removeSignFromNumber(object.otherTr.lastChild.textContent)
            ) :
            overrideM
        );
        object.sumTr.lastChild.textContent = addSignToNumber((Number.isNaN(sum) ? 0 : sum));
    }

    calcModifiers() {
        this.raceTr.lastChild.textContent = "+" + zeroIfUndefined(user.race[raceSelect.value].bonuses.characteristic[this.characteristic]);
        if (subraceSelect.firstChild)
            this.raceTr.lastChild.textContent = "+" + zeroIfUndefined(user.race[raceSelect.value].subraces[subraceSelect.value].bonuses.characteristic[this.characteristic]);
        this.increaseTr.lastChild.textContent = "+" + 0;
        this.otherTr.lastChild.textContent = "+" + 0;
    }

    getCard() {
        return this.card;
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

function additionalCharacteristicSelected() {
    let that = this;
    this.parentElement.parentElement.childNodes.forEach(node => {
        if (node.id.substring(0, node.id.length - 1) == 'any') {
            if (node.id != that.parentElement.id) {
                let temp = node.firstChild.value;
                clearElement(node.firstChild);

                node.firstChild.appendChild(createOptionForChooseCharacteristic("Select item"));
                for (let defchar of allCharacteristics) {
                    node.firstChild.appendChild(createOptionForChooseCharacteristic(defchar));
                    if (temp == defchar) {
                        node.firstChild.value = temp;
                    }
                }
            }
        }
    });

    this.parentElement.parentElement.childNodes.forEach(node => {
        if (node.id.substring(0, node.id.length - 1) == 'any') {
            if (node.id != that.parentElement.id) {
                node.firstChild.childNodes.forEach(option => {
                    if (option.value == that.value && that.value != "Select item") {
                        node.firstChild.removeChild(option);
                    }
                });
            }
        }
    });
}

function createOptionForChooseCharacteristic(defchar) {
    let option = document.createElement('option');
    option.value = defchar;
    option.textContent = translateTo('language', defchar);
    return option;
}

let addInfoBox = document.getElementById('add-info-box');
let raceCard = document.getElementById('race-card');
let selectedAdditionalInfo = null;
let isSwitching = false;

function changeRaceCard() {
    raceCard.querySelector('#add-info-race-img').src = 'Images/creatures/humanoids/races/' + raceSelect.value + '.png'
    raceCard.querySelector('#add-info-text').textContent = "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum magni quasi dolores non molestiae quae quia quod, ab eaque dignissimos";
}

function createInfoCardFromFeature(feature, place) {
    let card = document.createElement('div');
    card.id = feature + '-card';
    card.classList = 'card-box';

    let cardTitle = document.createElement('span');
    cardTitle.classList = 'card-title';
    cardTitle.textContent = translateTo('language', capitalize('firstOfAllWord', feature));

    let cardDescription = document.createElement('span');
    cardDescription.classList = 'card-description';
    cardDescription.innerText = place[feature].description[language];

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
    featuresText.textContent = translateTo('language', capitalize('firstOfAllWord', place[feature]));

    featuresBox.appendChild(featuresImg);
    featuresBox.appendChild(featuresText);

    featuresBox.addEventListener('click', displayAdditionalInfo);

    return featuresBox;
}

function createCharacteristicBox(characteristic, place) {
    let characteristicBox = document.createElement('div');
    characteristicBox.id = characteristic;
    characteristicBox.classList = 'characteristic-box default-background border-style border-radius default-inner-shadow';
    let characteristicText;

    if (characteristic.substring(0, characteristic.length - 1) == "any") {
        characteristicText = document.createElement('select');
        characteristicText.classList = 'clear-select default-background input-font-style';
        characteristicText.addEventListener('change', additionalCharacteristicSelected);

        characteristicText.appendChild(createOptionForChooseCharacteristic("Select item"));
        for (let defchar of allCharacteristics) {
            characteristicText.appendChild(createOptionForChooseCharacteristic(defchar));
        }
    }
    else {
        characteristicText = document.createElement('span');
        characteristicText.textContent = translateTo('language', characteristic);
    }

    let characteristicValue = document.createElement('span');
    characteristicValue.textContent = addSignToNumber(place[characteristic]);

    characteristicBox.appendChild(characteristicText);
    characteristicBox.appendChild(characteristicValue);

    return characteristicBox;
}

function raceSelected() {
    clearElement(subraceSelect);
    clearElement(characteristicsIncreaseElements);
    clearElement(raceTraitsFeaturesElements);
    changeRaceCard();
    for (let feature in user.race[raceSelect.value].skills) {
        let featuresBox = createFeaturesBox(feature, user.race[raceSelect.value].skills);
        featuresBox.dataset.origin = "race";
        raceTraitsFeaturesElements.appendChild(featuresBox);
    }
    for (let characteristic in user.race[raceSelect.value].bonuses.characteristic) {
        let characteristicBox = createCharacteristicBox(characteristic, user.race[raceSelect.value].bonuses.characteristic);
        characteristicBox.dataset.origin = "race";
        characteristicsIncreaseElements.appendChild(characteristicBox);
    }
    for (let subrace in user.race[raceSelect.value].subraces) {
        let option = document.createElement('option');
        option.value = subrace;
        option.textContent = translateTo('language', subrace);
        subraceSelect.appendChild(option);
    }
    !subraceSelect.firstChild ? subraceSelect.parentElement.style.display = "none" : subraceSelect.parentElement.style.display = "flex";
    if (subraceSelect.firstChild)
        subraceSelect.dispatchEvent(new Event('change'));
    else {
        for (let card in characteristicCards)
            CharacteristicsCard.calcSum(characteristicCards[card]);
    }
}
let raceFeatures = [];
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
    for (let feature in user.race[raceSelect.value].subraces[subraceSelect.value].bonuses.skills) {
        if (!(user.race[raceSelect.value].subraces[subraceSelect.value].bonuses.skills[feature] in raceFeatures)) {
            let featuresBox = createFeaturesBox(feature, user.race[raceSelect.value].subraces[subraceSelect.value].bonuses.skills);
            featuresBox.dataset.origin = "subrace";
            raceTraitsFeaturesElements.appendChild(featuresBox);
        }
    }
    for (let characteristic in user.race[raceSelect.value].subraces[subraceSelect.value].bonuses.characteristic) {
        let characteristicBox = createCharacteristicBox(characteristic, user.race[raceSelect.value].subraces[subraceSelect.value].bonuses.characteristic);
        characteristicBox.dataset.origin = "subrace";
        characteristicsIncreaseElements.appendChild(characteristicBox);
    }

    for (let card in characteristicCards)
        CharacteristicsCard.calcSum(characteristicCards[card]);
}

function optionSelected() {
    choosedCharacter.json[this.id.split('-')[0]] = this.value;
}

document.getElementById('roll-growth-weight-button').addEventListener('click', rollGrowthWeight);

function rollGrowthWeight() {
    let growthCube = growthWeightTable[raceSelect.value + (subraceSelect.value ? (" " + subraceSelect.value) : "")].growthCube;
    let gRollResult = rollDice(growthCube[0], growthCube[1]).value;

    let isMetric = (getCookie("isMetric") == "true");

    let multiplier = (isMetric ? 2.54 : 1);
    let gDivider = (isMetric ? 100 : 12);
    let gMeasure = (isMetric ? ["м", "см"] : ["'", "\""]);

    let baseG = [
        Math.floor((growthWeightTable[raceSelect.value + (subraceSelect.value ? (" " + subraceSelect.value) : "")].baseGrowth * multiplier) / gDivider),
        ((growthWeightTable[raceSelect.value + (subraceSelect.value ? (" " + subraceSelect.value) : "")].baseGrowth * multiplier) % gDivider)
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

    let weightCube = growthWeightTable[raceSelect.value + (subraceSelect.value ? (" " + subraceSelect.value) : "")].weightCube;
    let wRollResult = rollDice(weightCube[0], weightCube[1]).value;

    let wDivider = (isMetric ? 2.205 : 1);
    let wMeasure = (isMetric ? "кг" : "фнт");

    let baseW = growthWeightTable[raceSelect.value + (subraceSelect.value ? (" " + subraceSelect.value) : "")].baseWeight;
    let rollW = wRollResult * gRollResult;
    let resultW = (baseW + rollW);

    baseW /= wDivider;
    rollW /= wDivider;
    resultW /= wDivider;

    document.getElementById('weight-base').textContent = "" + baseW.toFixed(0) + " " + wMeasure + " + ";
    document.getElementById('weight-roll').textContent = "" + rollW.toFixed(0) + " " + wMeasure + " = ";
    document.getElementById('weight-result').textContent = "" + resultW.toFixed(0) + " " + wMeasure;
}

window.addEventListener("load", function () {
    user = JSON.parse(localStorage[localStorage.loggedUser]);
    userJSONFix();
    choosedCharacter = user["character" + localStorage.numOfChoosedChar];
    choosedCharacter.json = user.defaultCharacter;

    for (let race in user.race) {
        let option = document.createElement('option');
        option.value = race;
        option.textContent = translateTo('language', race);
        raceSelect.appendChild(option);
    }

    for (let card in characteristicCards) {
        document.getElementById('characteristics-page').append(characteristicCards[card].getCard());
        characteristicCards[card].baseTr.lastChild.firstChild.dispatchEvent(new Event('change'));
        characteristicCards[card].calcModifiers();
    }


    raceSelect.dispatchEvent(new Event('change'));

    rollGrowthWeight();
});
