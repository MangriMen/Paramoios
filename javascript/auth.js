'use strict'

$(document).ready(function () {
    const request = fetch('../avatar.php')

    const jsonStream = request.then(text => { return text.text() });

    jsonStream.then(data => {
        let img = document.createElement('img');
        img.src = data;
        img.id = 'user-btn-img';
        document.getElementById('user-btn').appendChild(img);
    });
})