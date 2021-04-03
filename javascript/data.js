let user = null;
let choosedCharacter = null;

let defaultContentArray = [];
let contentArray = [];

if (!window.indexedDB) {
    window.alert("Ваш браузер не поддерживает стабильную версию IndexedDB. Некоторые функции будут недоступны");
}

const DB_NAME = "MainDB";
const DB_VERSION = 2;

var db;

async function deleteAllDatabases() {
    const dbs = await window.indexedDB.databases()
    dbs.forEach(db => { window.indexedDB.deleteDatabase(db.name) })
}

connectDB();
// deleteOldIndexedDB(DB_NAME, DB_VERSION);

function deleteOldIndexedDB(dbName, actualVersion) {
    if (!indexedDB) {
        return false;
    }

    var req = indexedDB.open(dbName);
    req.onsuccess = function (event) {
        var version;
        if (event.srcElement != undefined) {
            version = event.srcElement.result.version;//chrome
        } else {
            version = event.target.result.version;//firefox
        }

        event.target.result.close();
        if (version != actualVersion && version != 1) {
            indexedDB.deleteDatabase(dbName);
        }
    };
}

function connectDB() {
    const DBOPEN = window.indexedDB.open(DB_NAME, DB_VERSION);

    DBOPEN.onerror = function (event) {
        alert("Не удалось открыть базу данных!")
    };

    DBOPEN.onsuccess = function (event) {
        db = event.target.result;
        db.onversionchange = function (event) {
            db.close();
            alert("A new version of this page is ready. Please reload!");
        };

        db.onerror = function (event) {
            alert("Database error: " + event.target.error);
        };
    };

    DBOPEN.onupgradeneeded = function (event) {
        db = event.target.result;
        console.log("Database upgraded");
        if (!db.objectStoreNames.contains('default_content')) {
            db.createObjectStore('default_content', { keyPath: 'name' });
        }
        if (!db.objectStoreNames.contains('content')) {
            db.createObjectStore('content', { keyPath: 'name' });
        }
    };

    DBOPEN.onblocked = function (event) {
        db = event.target.result;
        alert("База данных устарела, пожалуста, перезагрузите страницу.")
        db.close();
    }
}

async function getObjectStore(name, mode) {
    return db.transaction([name], mode).objectStore(name);
}

async function getDefaultContent() {
    const request = await fetch(
        "../logged.php",
        {
            method: "POST",
            body: "get-default-content"
        }
    )

    if (request.ok) {
        const data = await request.json();
        return data;
    }
    else {
        alert("Ошибка загрузки данных, код ошибки HTTP: " + request.status);
    }
}

function userJSONFix() {
    if (user) {
        user.character1.json ? user.character1.json = JSON.parse(user.character1.json) : null;
        user.character2.json ? user.character2.json = JSON.parse(user.character2.json) : null;
        user.character3.json ? user.character3.json = JSON.parse(user.character3.json) : null;
        user.defaultCharacter ? user.defaultCharacter = JSON.parse(user.defaultCharacter) : null;
    }
}

async function loadContentToArray(callbackFunc) {
    let content = await getObjectStore("content", "readonly");
    let rq_content = content.getAll();

    rq_content.onsuccess = async function (event) {
        for (let cnt of rq_content.result) {
            let object = {};
            object.name = cnt.name;
            object.json = JSON.parse(cnt.json);
            contentArray.push(object);
        }

        let default_content = await getObjectStore("default_content", "readonly");
        let rq_default_content = default_content.getAll();

        rq_default_content.onsuccess = function () {
            for (let cnt of rq_default_content.result) {
                let object = {};
                object.name = cnt.name;
                object.json = JSON.parse(cnt.json);
                defaultContentArray.push(object);
            }

            callbackFunc();
        }
    }
}


