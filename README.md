# DnD5CharlistI
[![Made With Python](https://camo.githubusercontent.com/66bcc473eef72296e18309e55791f886004574cb/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4d616465253230776974682d507974686f6e2d2532334646443234323f6c6f676f3d707974686f6e266c6f676f436f6c6f723d7768697465)](https://www.python.org/)
[![Build Status](https://travis-ci.org/MangriMen/DnD5CharlistI.svg?branch=master)](https://travis-ci.org/MangriMen/DnD5CharlistI)
[![CodeFactor](https://www.codefactor.io/repository/github/mangrimen/dnd5charlisti/badge/master)](https://www.codefactor.io/repository/github/mangrimen/dnd5charlisti/overview/master)

# [Wiki: Specification](https://github.com/MangriMen/DnD5CharlistI/wiki#specification)

# Последний релиз [Beta 0.0.1](https://github.com/MangriMen/DnD5CharlistI/releases/tag/v0.0.1-beta)

## Используемые/необходимые для сборки библиотеки (requirements.txt):
* **attrs 19.3.0**
* **jsonschema 3.2.0**
* **linecache2 1.0.0**
* **PyQt5 5.14.2**
* **PyQt5-sip 12.7.2**
* **PyQt5-stubs 5.14.2.2**
* **pyrsistent 0.16.0**
* **six 1.14.0**
* **traceback2 1.4.0**
* **unittest2 1.1.0**

### Установить все необходимые библиотеки при условии установленного python 3 и pip:
```
pip3 install --upgrade pip
pip3 install -r requirements.txt
```

### Собрать и запустить тесты можно при помощи
```
make
```

### Установка pyinstaller при установленном python 3 и pip
```
pip3 install pyinstaller
```

### Собрать приложение можно используя pyinstaller через команду
```
Windows: PyInstaller --noconsole --onedir --add-data  "MainWindow.ui;." --add-data "CharGenWindow.ui;." --add-data "default_data/;default_data" --add-data "img/;images" --add-data "fonts/;fonts" --add-data "saves/;saves" main.py
Linux: pyinstaller --noconsole --onedir --add-data  MainWindow.ui:. --add-data CharGenWindow.ui:. --add-data default_data/:default_data --add-data img/:images --add-data fonts/:fonts --add-data saves/:saves main.py
```
*При этом сборка происходит для той ОС на которой она была запущена
