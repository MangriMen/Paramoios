'use strict'

let auth = document.getElementById('auth');
let registration = document.getElementById('registration');
let welcome = document.getElementById('welcome');
let authorized = document.getElementById('authorized');

let authTitle = document.getElementById('auth-title');
let registrationTitle = document.getElementById('registration-title');

registration.style.display = 'none';

let orAuth = document.createElement('h6');
orAuth.id = 'or-id';
orAuth.classList = 'or text-black-shadow';
orAuth.textContent = 'или регистрация?';
orAuth.addEventListener('click', changeAuth);

function strip(html){
    let doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
 }

async function getErrors() {
    const request = await fetch('../php/auth_errors.php', {
        method: 'POST'
    });

    if (request.ok) {
        const data = await request.json();
        if (data.error_messages != "") return data.error_messages;
        if (data.success_messages != "") return data.success_messages;
        return false;
    } else {
        alert("Ошибка загрузки пользователя, код ошибки HTTP: " + request.status);
    }
}

document.addEventListener("DOMContentLoaded", async function () {
    let data = await getErrors();
    if (data) {
        document.getElementById('block_for_messages').textContent = strip(data);
    }
    if (localStorage.loggedUser) {
        auth.style.display = 'none';
        registration.style.display = 'none';
        setTimeout(function () { location.href = "user.html" }, 3000);
    }
    else {
        authorized.style.display = 'none';
        authTitle.after(orAuth);
    }
})

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