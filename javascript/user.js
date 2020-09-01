'use strict'

var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function () {
        document.getElementById('avatar-img').src = document.getElementById('user-btn-img').src;
    });
});
var config = { attributes: true, childList: false, characterData: false };
observer.observe(document.getElementById('user-btn-img'), config);

let activeTab = null;

let characterTab = document.getElementById('characters');
characterTab.addEventListener('click', selectPage);
characterTab.dispatchEvent(new Event('click'));

document.getElementById('profile-settings').addEventListener('click', selectPage);

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

loadCharacters();

async function loadCharacters() {
    await fetchUser();
    await getLogged();

    user = JSON.parse(localStorage[localStorage.loggedUser]);
    user.character1.json ? user.character1.json = JSON.parse(user.character1.json) : null;
    user.character2.json ? user.character2.json = JSON.parse(user.character2.json) : null;
    user.character3.json ? user.character3.json = JSON.parse(user.character3.json) : null;

    for (let i = 1; i <= 3; i++) {
        if (user['character' + i].json) {
            let characterBoxDefault = document.createElement('button');
            characterBoxDefault.classList = 'character-box default-background default-hover-active default-button border-style input-font-style';

            let avatar = document.createElement('img');
            avatar.alt = 'User avatar';
            avatar.classList = 'avatar border-style border-radius';
            avatar.src = 'images/buttons/profile/profile.jpg';

            let profileAndLevel = document.createElement('div');
            profileAndLevel.classList = 'profile-and-level';

            let hpBar = document.createElement('div');
            hpBar.id = 'hp-bar' + i;
            hpBar.classList = 'hp-bar border-style border-radius default-background default-shadow';

            let hpBarAnimation = document.createElement('div');
            hpBarAnimation.classList = 'bar-animation';

            let hpBarFill = document.createElement('div');
            hpBarFill.id = 'hp-bar-fill' + i;
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
            xpBar.id = 'xp-bar' + i;
            xpBar.classList = 'xp-bar border-style border-radius default-background default-shadow';

            let xpBarAnimation = document.createElement('div');
            xpBarAnimation.classList = 'bar-animation';

            let xpBarFill = document.createElement('div');
            xpBarFill.id = 'xp-bar-fill' + i;
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

            xpBar.appendChild(xpBarAnimation);
            xpBar.appendChild(xp);

            let levelText = document.createElement('div');
            levelText.classList = 'level-text border-style border-radius default-background default-shadow';

            let levelLabel = document.createElement('span');
            levelLabel.textContent = 'Уровень ';

            let level = document.createElement('span');
            level.id = 'level' + i;
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
        }
    }
    adjustLevel();
    onloadBarWidth('xp');
    onloadBarWidth('hp');
    beautifyText();
}