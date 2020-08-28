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
// characterTab.dispatchEvent(new Event('click'));

document.getElementById('profile-settings').addEventListener('click', selectPage);
document.getElementById('profile-settings').dispatchEvent(new Event('click'));

function selectPage() {
    activeTab = this;
    document.getElementById('tabs').querySelectorAll('span').forEach(tab => {
        tab.classList.remove('non-active-tab');
        if (tab.id != activeTab.id) { tab.classList.add('non-active-tab'); }
    })

    document.getElementById('content-page').querySelectorAll('div').forEach(page => {
        if (page.id != activeTab.id + "-page" && page.dataset.type == 'page') { page.style.display = 'none' };
    })
    if (activeTab.id == 'characters') {

    } else if (activeTab.id = 'profile-settings') {
        document.getElementById('profile-settings-page').style.display = 'grid';
    }
}