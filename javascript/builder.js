'use strict'

let activeTab = null;

let tabs = Array.from(document.getElementsByClassName("navigation-tab"));

tabs.forEach(tab => tab.addEventListener('click', selectPage));
tabs[0].dispatchEvent(new Event('click'));

function selectPage() {
    activeTab = this;
    document.getElementById('tabs').querySelectorAll('span').forEach(tab => {
        tab.classList.remove('non-active-tab');
        if (tab.id != activeTab.id) { tab.classList.add('non-active-tab'); }
    })

    document.getElementById('content-page').querySelectorAll('div').forEach(page => {
        if (page.id != activeTab.id + "-page" && page.dataset.type == 'page') { page.style.display = 'none' } else if (page.dataset.type == 'page') { page.style.display = 'grid' };
    })
}

let raceSelect = document.getElementById('race-select');
let subraceSelect = document.getElementById('subrace-select');
let characteristicsIncreaseElements = document.getElementById('characteristics-increase-elements');
let raceTraitsFeaturesElements = document.getElementById('race-traits-features-elements');

raceSelect.addEventListener('change', raceSelected);
subraceSelect.addEventListener('change', subraceSelected);
raceSelect.addEventListener('change', optionSelected);
subraceSelect.addEventListener('change', optionSelected);
subraceSelect.parentElement.style.display = "none";

const allCharacteristics = [
    "Strength",
    "Dexterity",
    "Constitution",
    "Intelligence",
    "Wisdom",
    "Charisma"
]

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

function createInfoCardFromFeature(feature, place) {
    let card = document.createElement('div');
    card.id = feature + '-card';
    card.classList = 'card-box';

    let cardTitle = document.createElement('span');
    cardTitle.classList = 'card-title';
    cardTitle.textContent = translateTo('language', capitalize('firstOfAllWord', feature));

    let cardDescription = document.createElement('span');
    cardDescription.classList = 'card-description';
    cardDescription.textContent = place[feature].description;

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

function displayAdditionalInfo() {
    if (!isSwitching) {
        isSwitching = true;
        if (selectedAdditionalInfo != this) {
            switchCard(this);
            selectedAdditionalInfo = this;
        }
        else {
            switchCard("race");
            selectedAdditionalInfo = null;
        }
    }
}

function createFeaturesBox(feature, place) {
    let featuresBox = document.createElement('button');
    featuresBox.id = place[feature];
    featuresBox.classList = 'feature-box default-background border-style border-radius default-inner-shadow default-button input-font-style';

    let featuresImg = document.createElement('img');
    // feautresImg.src = 'images/icons/features/' + feature;
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
}

function subraceSelected() {
    characteristicsIncreaseElements.childNodes.forEach(node => {
        if (node.dataset.origin == "subrace") {
            characteristicsIncreaseElements.removeChild(node);
        }
    });
    for (let characteristic in user.race[raceSelect.value].subraces[subraceSelect.value].bonuses.characteristic) {
        let characteristicBox = createCharacteristicBox(characteristic, user.race[raceSelect.value].subraces[subraceSelect.value].bonuses.characteristic);
        characteristicBox.dataset.origin = "subrace";
        characteristicsIncreaseElements.appendChild(characteristicBox);
    }
}

function optionSelected() {
    choosedCharacter.json[this.id.split('-')[0]] = this.value;
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
    raceSelect.dispatchEvent(new Event('change'));
});

