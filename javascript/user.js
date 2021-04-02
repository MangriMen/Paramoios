'use strict'

let charactersList = {};

var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function () {
        document.getElementById('avatar-img').src = document.getElementById('user-btn-img').src;
        setTimeout(async function () {
            await loadCharacters();
            document.getElementById('characters-loading-overlay').style.display = 'none';
        }, 0)
    });
});

var config = { attributes: true, childList: false, characterData: false };
observer.observe(document.getElementById('user-btn-img'), config);

async function loadCharacters() {
    await fetchUser();
    await getLogged();

    user = JSON.parse(localStorage[localStorage.loggedUser]);
    userJSONFix();

    for (let i = 1; i <= 3; i++) {
        if (user['character' + i].json) {
            let characterBoxDefault = document.createElement('button');
            characterBoxDefault.dataset.characterNumber = i;
            characterBoxDefault.classList = 'character-box default-background default-hover-active default-button border-style input-font-style';
            characterBoxDefault.addEventListener('click', loadCharacterFromProfile);

            let avatar = document.createElement('img');
            avatar.alt = 'User avatar';
            avatar.classList = 'avatar border-style border-radius';
            avatar.src = 'images/buttons/profile/profile_placeholder.png';

            let profileAndLevel = document.createElement('div');
            profileAndLevel.classList = 'profile-and-level';

            let hpBar = document.createElement('div');
            hpBar.classList = 'hp-bar border-style border-radius default-background default-shadow';

            let hpBarAnimation = document.createElement('div');
            hpBarAnimation.classList = 'bar-animation';

            let hpBarFill = document.createElement('div');
            hpBarFill.classList = 'bar-fill hp-color';

            let hpLiquid = document.createElement('div');
            hpLiquid.classList = 'wave-main wave-hp hp-color';

            hpBarFill.appendChild(hpLiquid);
            hpBarAnimation.appendChild(hpBarFill);

            let hp = document.createElement('span');
            hp.classList = 'hp bar-text';
            hp.textContent = user['character' + i].json.hp + '/' + user['character' + i].json.hpMax;

            hpBar.appendChild(hpBarAnimation);
            hpBar.appendChild(hp);

            let xpBar = document.createElement('div');
            xpBar.classList = 'xp-bar border-style border-radius default-background default-shadow';

            let xpBarAnimation = document.createElement('div');
            xpBarAnimation.classList = 'bar-animation';

            let xpBarFill = document.createElement('div');
            xpBarFill.classList = 'bar-fill xp-color';

            let xpLiquid = document.createElement('div');
            xpLiquid.classList = 'wave-main wave-level xp-color';

            xpBarFill.appendChild(xpLiquid);
            xpBarAnimation.appendChild(xpBarFill);

            let xp = document.createElement('input');
            xp.type = 'number';
            xp.readOnly = 'readonly'
            xp.classList = 'xp border-style input-font-style bar-text';
            xp.value = user['character' + i].json.experience;
            xp.disabled = true;

            xpBar.appendChild(xpBarAnimation);
            xpBar.appendChild(xp);

            let levelText = document.createElement('div');
            levelText.classList = 'level-text border-style border-radius default-background default-shadow';

            let levelLabel = document.createElement('span');
            levelLabel.textContent = 'Уровень ';

            let level = document.createElement('span');
            level.value = user['character' + i].json.level;

            levelLabel.appendChild(level);

            levelText.appendChild(levelLabel);

            profileAndLevel.appendChild(hpBar);
            profileAndLevel.appendChild(xpBar);
            profileAndLevel.appendChild(levelText);

            let namingText = document.createElement('div');
            namingText.classList = 'naming-text';

            let characterName = document.createElement('input');
            characterName.type = 'text';
            characterName.classList = 'character-name text-auto-width align-to-right text-to-right input-font-style';
            characterName.value = user['character' + i].json.charName;
            characterName.disabled = true;

            let characterOrigin = document.createElement('div');
            characterOrigin.classList = 'character-origin align-to-right gray-text text-to-right';

            let characterAlignment = document.createElement('span');
            characterAlignment.textContent = user['character' + i].json.alignment;

            let br = document.createElement('br');

            let characterRace = document.createElement('span');
            characterRace.textContent = user['character' + i].json.race;

            let dash1 = document.createElement('span');
            dash1.textContent = '-';

            let characterClass = document.createElement('span');
            characterClass.textContent = user['character' + i].json.class;

            let dash2 = document.createElement('span');
            dash2.textContent = '-';

            let characterBackground = document.createElement('span');
            characterBackground.textContent = user['character' + i].json.background;

            characterOrigin.appendChild(characterAlignment);
            characterOrigin.appendChild(br);
            characterOrigin.appendChild(characterRace);
            characterOrigin.appendChild(dash1);
            characterOrigin.appendChild(characterClass);
            characterOrigin.appendChild(dash2);
            characterOrigin.appendChild(characterBackground);

            namingText.appendChild(characterName);
            namingText.appendChild(characterOrigin);

            let moneyBox = document.createElement('div');
            moneyBox.classList = 'money-box';

            let copperBox = document.createElement('div');
            copperBox.classList = 'currency-box default-background border-style border-radius default-inner-shadow';

            let copperImg = document.createElement('img');
            copperImg.src = 'images/money/copper.svg';
            copperImg.classList = 'currency-img';
            copperImg.alt = 'copper coin';

            let copper = document.createElement('input');
            copper.type = 'number';
            copper.readOnly = 'readonly';
            copper.classList = 'currency-value border-style border-radius input-font-style';
            copper.value = user['character' + i].json.money.copper;
            copper.disabled = true;

            copperBox.appendChild(copperImg);
            copperBox.appendChild(copper);

            let silverBox = document.createElement('div');
            silverBox.classList = 'currency-box default-background border-style border-radius default-inner-shadow';

            let silverImg = document.createElement('img');
            silverImg.src = 'images/money/silver.svg';
            silverImg.classList = 'currency-img';
            silverImg.alt = 'silver coin';

            let silver = document.createElement('input');
            silver.type = 'number';
            silver.readOnly = 'readonly';
            silver.classList = 'currency-value border-style border-radius input-font-style';
            silver.value = user['character' + i].json.money.silver;
            silver.disabled = true;

            silverBox.appendChild(silverImg);
            silverBox.appendChild(silver);

            let electrumBox = document.createElement('div');
            electrumBox.classList = 'currency-box default-background border-style border-radius default-inner-shadow';

            let electrumImg = document.createElement('img');
            electrumImg.src = 'images/money/electrum.svg';
            electrumImg.classList = 'currency-img';
            electrumImg.alt = 'electrum coin';

            let electrum = document.createElement('input');
            electrum.type = 'number';
            electrum.readOnly = 'readonly';
            electrum.classList = 'currency-value border-style border-radius input-font-style';
            electrum.value = user['character' + i].json.money.electrum;
            electrum.disabled = true;

            electrumBox.appendChild(electrumImg);
            electrumBox.appendChild(electrum);

            let goldBox = document.createElement('div');
            goldBox.classList = 'currency-box default-background border-style border-radius default-inner-shadow';

            let goldImg = document.createElement('img');
            goldImg.src = 'images/money/gold.svg';
            goldImg.classList = 'currency-img';
            goldImg.alt = 'gold coin';

            let gold = document.createElement('input');
            gold.type = 'number';
            gold.readOnly = 'readonly';
            gold.classList = 'currency-value border-style border-radius input-font-style';
            gold.value = user['character' + i].json.money.gold;
            gold.disabled = true;

            goldBox.appendChild(goldImg);
            goldBox.appendChild(gold);

            let platinumBox = document.createElement('div');
            platinumBox.classList = 'currency-box default-background border-style border-radius default-inner-shadow';

            let platinumImg = document.createElement('img');
            platinumImg.src = 'images/money/platinum.svg';
            platinumImg.classList = 'currency-img';
            platinumImg.alt = 'platinum coin';

            let platinum = document.createElement('input');
            platinum.type = 'number';
            platinum.readOnly = 'readonly';
            platinum.classList = 'currency-value border-style border-radius input-font-style';
            platinum.value = user['character' + i].json.money.platinum;
            platinum.disabled = true;

            platinumBox.appendChild(platinumImg);
            platinumBox.appendChild(platinum);

            moneyBox.appendChild(copperBox);
            moneyBox.appendChild(silverBox);
            moneyBox.appendChild(electrumBox);
            moneyBox.appendChild(goldBox);
            moneyBox.appendChild(platinumBox);

            let characterStats = document.createElement('div');
            characterStats.classList = 'character-stats';

            let strength = document.createElement('div');
            strength.classList = 'characteristic default-inner-shadow border-radius';

            let strengthText = document.createElement('span');
            strengthText.classList = 'characteristic-text default-background border-style border-radius';
            strengthText.textContent = 'Сил.';

            let strengthBonus = document.createElement('div');
            strengthBonus.classList = 'characteristic-bonus default-background border-style border-radius';
            strengthBonus.textContent = user['character' + i].json.characteristicBonus.strengthBonus;

            let strengthValue = document.createElement('input');
            strengthValue.type = 'number';
            strengthValue.readOnly = 'readonly';
            strengthValue.value = user['character' + i].json.characteristic.strength;
            strengthValue.classList = 'characteristic-value default-background border-style border-radius default-button input-font-style';
            strengthValue.disabled = true;

            strength.appendChild(strengthText);
            strength.appendChild(strengthBonus);
            strength.appendChild(strengthValue);
            characterStats.appendChild(strength);

            let dexterity = document.createElement('div');
            dexterity.classList = 'characteristic default-inner-shadow border-radius';

            let dexterityText = document.createElement('span');
            dexterityText.classList = 'characteristic-text default-background border-style border-radius';
            dexterityText.textContent = 'Лов.';

            let dexterityBonus = document.createElement('div');
            dexterityBonus.classList = 'characteristic-bonus default-background border-style border-radius';
            dexterityBonus.textContent = user['character' + i].json.characteristicBonus.dexterityBonus;

            let dexterityValue = document.createElement('input');
            dexterityValue.type = 'number';
            dexterityValue.readOnly = 'readonly';
            dexterityValue.value = user['character' + i].json.characteristic.dexterity;
            dexterityValue.classList = 'characteristic-value default-background border-style border-radius default-button input-font-style';
            dexterityValue.disabled = true;

            dexterity.appendChild(dexterityText);
            dexterity.appendChild(dexterityBonus);
            dexterity.appendChild(dexterityValue);
            characterStats.appendChild(dexterity);

            let constitution = document.createElement('div');
            constitution.classList = 'characteristic default-inner-shadow border-radius';

            let constitutionText = document.createElement('span');
            constitutionText.classList = 'characteristic-text default-background border-style border-radius';
            constitutionText.textContent = 'Тел.';

            let constitutionBonus = document.createElement('div');
            constitutionBonus.classList = 'characteristic-bonus default-background border-style border-radius';
            constitutionBonus.textContent = user['character' + i].json.characteristicBonus.constitutionBonus;

            let constitutionValue = document.createElement('input');
            constitutionValue.type = 'number';
            constitutionValue.readOnly = 'readonly';
            constitutionValue.value = user['character' + i].json.characteristic.constitution;
            constitutionValue.classList = 'characteristic-value default-background border-style border-radius default-button input-font-style';
            constitutionValue.disabled = true;

            constitution.appendChild(constitutionText);
            constitution.appendChild(constitutionBonus);
            constitution.appendChild(constitutionValue);
            characterStats.appendChild(constitution);

            let intelligence = document.createElement('div');
            intelligence.classList = 'characteristic default-inner-shadow border-radius';

            let intelligenceText = document.createElement('span');
            intelligenceText.classList = 'characteristic-text default-background border-style border-radius';
            intelligenceText.textContent = 'Инт.';

            let intelligenceBonus = document.createElement('div');
            intelligenceBonus.classList = 'characteristic-bonus default-background border-style border-radius';
            intelligenceBonus.textContent = user['character' + i].json.characteristicBonus.intelligenceBonus;

            let intelligenceValue = document.createElement('input');
            intelligenceValue.type = 'number';
            intelligenceValue.readOnly = 'readonly';
            intelligenceValue.value = user['character' + i].json.characteristic.intelligence;
            intelligenceValue.classList = 'characteristic-value default-background border-style border-radius default-button input-font-style';
            intelligence.disabled = true;

            intelligence.appendChild(intelligenceText);
            intelligence.appendChild(intelligenceBonus);
            intelligence.appendChild(intelligenceValue);
            characterStats.appendChild(intelligence);

            let wisdom = document.createElement('div');
            wisdom.classList = 'characteristic default-inner-shadow border-radius';

            let wisdomText = document.createElement('span');
            wisdomText.classList = 'characteristic-text default-background border-style border-radius';
            wisdomText.textContent = 'Муд.';

            let wisdomBonus = document.createElement('div');
            wisdomBonus.classList = 'characteristic-bonus default-background border-style border-radius';
            wisdomBonus.textContent = user['character' + i].json.characteristicBonus.wisdomBonus;

            let wisdomValue = document.createElement('input');
            wisdomValue.type = 'number';
            wisdomValue.readOnly = 'readonly';
            wisdomValue.value = user['character' + i].json.characteristic.wisdom;
            wisdomValue.classList = 'characteristic-value default-background border-style border-radius default-button input-font-style';
            wisdomValue.disabled = true;

            wisdom.appendChild(wisdomText);
            wisdom.appendChild(wisdomBonus);
            wisdom.appendChild(wisdomValue);
            characterStats.appendChild(wisdom);

            let charisma = document.createElement('div');
            charisma.classList = 'characteristic default-inner-shadow border-radius';

            let charismaText = document.createElement('span');
            charismaText.classList = 'characteristic-text default-background border-style border-radius';
            charismaText.textContent = 'Хар.';

            let charismaBonus = document.createElement('div');
            charismaBonus.classList = 'characteristic-bonus default-background border-style border-radius';
            charismaBonus.textContent = user['character' + i].json.characteristicBonus.charismaBonus;

            let charismaValue = document.createElement('input');
            charismaValue.type = 'number';
            charismaValue.readOnly = 'readonly';
            charismaValue.value = user['character' + i].json.characteristic.charisma;
            charismaValue.classList = 'characteristic-value default-background border-style border-radius default-button input-font-style';
            charismaValue.disabled = true;

            charisma.appendChild(charismaText);
            charisma.appendChild(charismaBonus);
            charisma.appendChild(charismaValue);
            characterStats.appendChild(charisma);

            characterBoxDefault.appendChild(avatar);
            characterBoxDefault.appendChild(profileAndLevel);
            characterBoxDefault.appendChild(namingText);
            characterBoxDefault.appendChild(moneyBox);
            characterBoxDefault.appendChild(characterStats);

            document.getElementById('characters-page').appendChild(characterBoxDefault);

            charactersList['character' + i] = {
                "hp": hp,
                "hpBar": hpBar,
                "hpBarFill": hpBarFill,
                "xp": xp,
                "xpBar": xpBar,
                "xpBarFill": xpBarFill,
                "level": level,
            };
        } else {
            let characterBoxDefault = document.createElement('button');
            characterBoxDefault.classList = 'character-box default-background default-hover-active default-button border-style input-font-style';
            characterBoxDefault.dataset.characterNumber = i;
            characterBoxDefault.addEventListener('click', newCharacter);

            let newCharacterTitle = document.createElement('span');
            newCharacterTitle.classList = 'new-character-title gray-text';
            newCharacterTitle.textContent = 'Новый персонаж';

            characterBoxDefault.appendChild(newCharacterTitle);

            document.getElementById('characters-page').appendChild(characterBoxDefault);
        }
    }
    adjustAllLevels();
    adjustAllBarWidth();
    beautifyText();
}

function newCharacter() {
    localStorage.numOfChoosedChar = this.dataset.characterNumber;

    document.location.href = "builder.html";
}

function loadCharacterFromProfile() {
    alert("Загрузить персонажа redirect");
}

document.getElementById('avatar-change-overlay').addEventListener('click', displayCropAvatar);

let avatarInput = document.getElementById('file');
let avatarFullImage = document.getElementById('avatar-full-image');
let avatarCropLayout = document.getElementById('avatar-crop-layout');
let avatarCropBox = document.getElementById('avatar-crop-box');
let chooseAvatar = document.getElementById('choose-avatar');
let btnChangePassword = document.getElementById('player-change-password')
let dataContentList = document.getElementById('data-content-list');
let dataContentAdd = document.getElementById('data-content-add');

btnChangePassword.addEventListener('click', changePassword);
avatarInput.addEventListener('change', cropAvatar);
avatarCropLayout.addEventListener('click', closeCrop);
dataContentAdd.addEventListener('click', addContent);

let croppr = null;

function displayCropAvatar() {
    avatarCropLayout.style.display = 'block';
    avatarCropBox.style.display = 'grid';
}

function cropAvatar(e) {
    let file = avatarInput.files[0];
    let fr = new FileReader();
    fr.onload = receivedImage;
    fr.readAsDataURL(file);

    async function receivedImage(e) {
        if (!croppr) {
            let promise = new Promise((resolve, reject) => {
                avatarFullImage.src = e.target.result;
                if (avatarFullImage.src) {
                    resolve("done");
                }
            });
            await promise;
            if (parseInt(getComputedStyle(avatarFullImage).height) > 600) {
                document.getElementById('avatar-crop-field').style.width = parseInt(getComputedStyle(avatarFullImage).width) / (parseInt(getComputedStyle(avatarFullImage).height) / 600) + 'px  ';
            }
            else {
                document.getElementById('avatar-crop-field').style.width = "";
            }
            croppr = new Croppr('#avatar-full-image', {
                startSize: [100, 100, '%'],
                aspectRatio: 1,
                minSize: [100, 100, 'px'],
                onInitialize: (instance) => { document.getElementById('avatar-rect').value = JSON.stringify(instance.getValue()); },
                onCropEnd: (data) => { document.getElementById('avatar-rect').value = JSON.stringify(data); },
            });
            chooseAvatar.style.display = 'none';
        }
    }
}

function resetCrop() {
    croppr.containerEl.parentElement.insertBefore(croppr._restore.element, croppr.containerEl);
    croppr.containerEl.parentElement.removeChild(croppr.containerEl);
    avatarFullImage.src = "";
    croppr = null;
}

function acceptCrop() {
    avatarCropLayout.style.display = 'none';
    avatarCropBox.style.display = 'none';
}

function closeCrop() {
    acceptCrop();
    if (croppr) {
        resetCrop();
    }
    chooseAvatar.style.display = 'block';
    avatarInput.value = "";
}

function changePassword() {
    const parent = btnChangePassword.parentElement;

    btnChangePassword.parentElement.removeChild(btnChangePassword);

    let changePassBox = document.createElement('form');
    changePassBox.addEventListener("submit", submitPassword);

    let changeInput = document.createElement('input');
    changeInput.type = "password";

    let changeSubmit = document.createElement('input');
    changeSubmit.type = "submit";
    changeSubmit.value = translateTo('language', "btn_submit");

    let changeCancel = document.createElement('input');
    changeCancel.type = "button";
    changeCancel.value = translateTo('language', "btn_cancel");
    changeCancel.addEventListener('click', cancelPassword);

    changeSubmit.style.marginRight = changeCancel.style.marginRight = changeInput.style.marginRight = "1rem";
    changeSubmit.classList = changeCancel.classList = (changeInput.classList = "display-disable default-background border-style border-radius default-inner-shadow input-font-style")
        + " default-button";

    changePassBox.append(changeInput, changeSubmit, changeCancel);
    parent.append(changePassBox);

    async function submitPassword(e) {
        e.preventDefault();
        if (changeInput.value.length < 6) {
            bAlert("Минимальная длинна пароля должна составлять 6 символов!", 3000);
        }
        else {
            changeInput.disabled = true;
            changeSubmit.disabled = true;
            changeCancel.disabled = true;
            await ajaxChangePassword(changeInput.value);
            cancelPassword();
        }
    }

    function cancelPassword() {
        const parent = changePassBox.parentElement;

        parent.removeChild(changePassBox);
        parent.append(btnChangePassword);
    }

    async function ajaxChangePassword(newPassword) {
        const object = {
            changePassword: newPassword
        }
        const request = await fetch(
            '../user_control.php',
            {
                method: 'POST',
                body: JSON.stringify(object)
            }
        );

        if (request.ok) {
            const data = await request.json();
            if (data.changed) {
                bAlert(translateTo('language', "pass_change_successfull"), 5000);
            } else {
                bAlert(translateTo('language', "pass_change_error"), 5000);
            }
        } else {
            alert("Ошибка подключения к базе данных, код ошибки HTTP: " + request.status);
        }
    }
}

setTimeout(loadDefaultContent, 50);
setTimeout(displayContent, 100);

function createContentElement(text, allowedToRemove) {
    let box = document.createElement('div');
    box.classList = "default-background border-style border-radius default-inner-shadow input-font-style data-content-list-entry";
    box.dataset.key = text;

    let name = document.createElement('span');
    name.textContent = translateTo("language", text);

    box.append(name);

    if (allowedToRemove) {
        let deleteButton = document.createElement('button')
        deleteButton.classList = "display-disable default-background border-style border-radius default-inner-shadow input-font-style default-button content-delete-button";
        deleteButton.textContent = "X";
        deleteButton.addEventListener('click', removeContentFromDb);

        box.append(deleteButton);
    }

    return box;
}

async function loadDefaultContent() {
    let objectStore = await getObjectStore("default_content", "readonly");

    let rq = await objectStore.count();
    rq.onsuccess = async function (event) {
        if (rq.result == 0) {
            let defaultContent = await getDefaultContent();
            defaultContent.alignment ? defaultContent.alignment = JSON.parse(defaultContent.alignment) : null;
            defaultContent.background ? defaultContent.background = JSON.parse(defaultContent.background) : null;
            defaultContent.class ? defaultContent.class = JSON.parse(defaultContent.class) : null;
            defaultContent.race ? defaultContent.race = JSON.parse(defaultContent.race) : null;
            defaultContent.feature ? defaultContent.feature = JSON.parse(defaultContent.feature) : null;

            objectStore = await getObjectStore("default_content", "readwrite");

            for (let content in defaultContent) {
                let object = {
                    name: "default_" + content,
                    json: JSON.stringify(defaultContent[content])
                }
                let rq = objectStore.put(object);

                rq.onsuccess = function () {
                    dataContentList.prepend(createContentElement(object.name));
                }
            }
        }
    }
}

async function loadContentToArrayAndDisplay() {
    let content = await getObjectStore("content", "readonly");
    let rq_content = content.getAll();

    let counter = 0;

    rq_content.onsuccess = async function (event) {
        contentArray = rq_content.result;

        let default_content = await getObjectStore("default_content", "readonly");
        let rq_default_content = default_content.getAll();

        rq_default_content.onsuccess = function () {
            defaultContentArray = rq_default_content.result;

            clearElement(dataContentList);
            let fragment = new DocumentFragment();

            for (let content of contentArray) {
                fragment.append(createContentElement(content.name, true));
            }
            let splitter = document.createElement('div');
            splitter.dataset.key = "splitter";
            fragment.append(splitter);
            for (let content of defaultContentArray) {
                fragment.append(createContentElement(content.name, false));
            }

            dataContentList.append(fragment);
        }
    }
}

async function displayContent() {
    if (contentArray.length == 0) {
        await loadContentToArrayAndDisplay();
    }
}

function addContent() {
    openFile();
}

function insertAfter(newNode, existingNode) {
    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
}

async function addContentToDB() {
    let object = {
        name: contentBuff.name,
        json: JSON.stringify(contentBuff.json)
    }

    let objectStore = await getObjectStore("content", "readwrite");
    let rq = objectStore.put(object);

    rq.onsuccess = function () {
        for (let node of Array.from(dataContentList.childNodes)) {
            if (node.dataset.key == object.name) {
                return;
            }
            else if (node.dataset.key == "splitter") {
                node.parentElement.insertBefore(createContentElement(object.name, true), node);
                return;
            }
            else if (node.dataset.key > object.name) {
                insertAfter(createContentElement(object.name, true), node);
                return;
            }
        }
    }

    rq.onerror = function () {
        console.log("Ошибка: ", rq.error);
    };
}

async function removeContentFromDb() {
    let objectStore = await getObjectStore("content", "readwrite");

    let element = this;
    let key = element.parentElement.dataset.key;

    let rq = objectStore.delete(key);

    rq.onsuccess = function () {
        element.parentElement.parentElement.removeChild(element.parentElement);
    }

    rq.onerror = function () {
        console.log("Ошибка: ", rq.error);
    };
}