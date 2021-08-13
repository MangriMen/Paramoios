'use strict'

let auth = document.getElementById('auth');
let registration = document.getElementById('registration');
let welcome = document.getElementById('welcome');

let authTitle = document.getElementById('auth-title');
let registrationTitle = document.getElementById('registration-title');

registration.style.display = 'none';

let orAuth = document.createElement('h6');
orAuth.id = 'or-id';
orAuth.classList = 'or text-black-shadow';
orAuth.textContent = 'или регистрация?';
orAuth.addEventListener('click', changeAuth);

if (authTitle) {
    authTitle.after(orAuth);
}
else {
    setTimeout(function () { location.href = "user.html" }, 3000);
}

function changeAuth() {
    if (getComputedStyle(registration).display == 'none') {
        auth.style.display = 'none';
        registration.style.display = 'block';
        orAuth.textContent = 'или авторизация?';
        welcome.classList.toggle('welcome-reg');
        registrationTitle.after(orAuth);
    } else {
        auth.style.display = 'block';
        registration.style.display = 'none';
        orAuth.textContent = 'или регистрация?';
        welcome.classList.toggle('welcome-reg');
        authTitle.after(orAuth);
    }
}