let user = null;
let choosedCharacter = null;

function userJSONFix() {
    if (user) {
        user.character1.json ? user.character1.json = JSON.parse(user.character1.json) : null;
        user.character2.json ? user.character2.json = JSON.parse(user.character2.json) : null;
        user.character3.json ? user.character3.json = JSON.parse(user.character3.json) : null;
        user.defaultCharacter ? user.defaultCharacter = JSON.parse(user.defaultCharacter) : null;
        user.alignment ? user.alignment = JSON.parse(user.alignment) : null;
        user.background ? user.background = JSON.parse(user.background) : null;
        user.class ? user.class = JSON.parse(user.class) : null;
        user.race ? user.race = JSON.parse(user.race) : null;
        user.feature ? user.feature = JSON.parse(user.feature) : null;
    }
}