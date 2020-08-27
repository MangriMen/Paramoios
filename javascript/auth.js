'use strict'

document.getElementById('user-btn').addEventListener('click', function (e) { toggleUserMenu(e); });

let img = document.getElementById('user-btn-img');

let logout = document.createElement('a');
logout.id = 'link-logout';
logout.classList = 'user-menu-buttons-down input-font-style default-background border-style';
logout.href = 'logout.php';
let logoutImg = document.createElement('img');
logoutImg.src = 'images/buttons/profile/logout.svg';
logoutImg.classList = 'link-auth-img user-menu-buttons-down-img';
logout.appendChild(logoutImg);

let userSettings = document.createElement('a');
userSettings.id = 'user-settings';
userSettings.classList = 'user-menu-buttons-down default-background border-style';
userSettings.href = 'user.html';
let userSettingsImg = document.createElement('img');
userSettingsImg.id = 'user-settings-img';
userSettingsImg.classList = 'user-menu-buttons-down-img';
userSettingsImg.src = 'images/buttons/profile/settings.svg';
userSettings.appendChild(userSettingsImg);

let login = document.createElement('a');
login.id = 'link-login';
login.classList = 'user-menu-buttons-down input-font-style default-background border-style';
login.href = 'form_auth.php';
let loginImg = document.createElement('img');
loginImg.src = 'images/buttons/profile/login.svg';
loginImg.classList = 'link-auth-img user-menu-buttons-down-img';
login.appendChild(loginImg);

let register = document.createElement('a');
register.id = 'link-register';
register.classList = 'user-menu-buttons-down input-font-style default-background border-style';
register.href = 'form_register.php';
let registerImg = document.createElement('img');
registerImg.src = 'images/buttons/profile/register.svg';
registerImg.classList = 'link-auth-img user-menu-buttons-down-img';
register.appendChild(registerImg);

document.addEventListener("DOMContentLoaded", function () {
    const request = fetch('../logged.php')

    const jsonStream = request.then(text => { return text.json() });

    jsonStream.then(data => {
        if (data.logged) {
            img.src = data.avatar;

            document.getElementById('user-checkbox').after(userSettings);
            document.getElementById('user-checkbox').after(logout);
            document.getElementById('player-name').textContent = 'Имя: ' + data.name;
            document.getElementById('player-email').textContent = 'Email: ' + data.email;
        } else {
            document.getElementById('user-checkbox').after(login);
            document.getElementById('user-checkbox').after(register);
        }
    });

})

function toggleUserMenu(e) {
    if (e.target == document.getElementById('user-btn-img') || e.target == this) {
        document.getElementById('user-checkbox').checked = !document.getElementById('user-checkbox').checked;
    }
}