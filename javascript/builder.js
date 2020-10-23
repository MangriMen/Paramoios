let activeTab = null;

tabs = Array.from(document.getElementsByClassName("navigation-tab"));

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