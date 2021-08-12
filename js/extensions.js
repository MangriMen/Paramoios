// Tab switching
let activeTab = null;

let tabs = Array.from(document.getElementsByClassName("navigation-tab"));

tabs.forEach(tab => tab.addEventListener('click', selectPage));
tabs[0].dispatchEvent(new Event('click'));

function selectPage() {
    activeTab = this;
    document.getElementById('tabs').querySelectorAll('span').forEach(tab => {
        tab.classList.remove('active-tab');
        if (tab.id == activeTab.id) { tab.classList.add('active-tab'); }
    })

    document.getElementById('content-page').querySelectorAll('div').forEach(page => {
        if (page.id != activeTab.id + "-page" && page.dataset.type == 'page') { page.style.display = 'none' } else if (page.dataset.type == 'page') { page.style.display = 'grid' };
    })
}

let contentBuff = {};

function openFile() {
    let openInput = document.getElementById('open-input');
    if (!openInput) {
        openInput = document.createElement('input');
        openInput.type = "file";
        openInput.style.display = "none";
    }

    openInput.click();
    openInput.onchange = function (e) {
        loadContent(openInput);
    }
}

function loadContent(input) {
    var input, file, fr;

    if (typeof window.FileReader !== 'function') {
        alert("The file API isn't supported on this browser yet.");
        return;
    }

    if (!input) {
        alert("Um, couldn't find the fileinput element.");
    }
    else if (!input.files) {
        alert("This browser doesn't seem to support the `files` property of file inputs.");
    }
    else if (!input.files[0]) {
        alert("Please select a file before clicking 'Load'");
    }
    else {
        file = input.files[0];
        fr = new FileReader();
        fr.onload = receivedText;
        fr.readAsText(file);
        contentBuff.name = file.name.replace(".json", "");
    }

    function receivedText(e) {
        let lines = e.target.result;
        contentBuff.json = JSON.parse(lines);
        addContentToDB();
    }
}
