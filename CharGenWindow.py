import functools
import json
import math
import random

from PyQt5 import QtCore
from PyQt5 import QtGui
from PyQt5 import QtWidgets
from PyQt5 import uic
from PyQt5.QtCore import Qt
from jsonschema import validate, ValidationError

import character_IO
import style

(Ui_CharGenWindow, QCharGenWindow) = uic.loadUiType('CharGenWindow.ui')


class CharGenWindow(QCharGenWindow):

    def __init__(self, parent=None):
        QCharGenWindow.__init__(self, parent)
        self.ui = Ui_CharGenWindow()
        self.ui.setupUi(self)

        style.setupCharGen(self)
        self.initVariables()

        with open('default_data/race.json', 'r', encoding="utf-8") as f:
            self.loadedRaces = json.loads(f.read())
        self.ui.raceCombo.addItem(self.defaultRace)
        for race_ in self.loadedRaces:
            self.ui.raceCombo.addItem(race_)

        with open('default_data/class.json', 'r', encoding="utf-8") as f:
            self.loadedClasses = json.loads(f.read())
        self.ui.classCombo.addItem(self.defaultClass)
        for class_ in self.loadedClasses:
            self.ui.classCombo.addItem(class_)

        with open('default_data/background.json', 'r', encoding="utf-8") as f:
            self.loadedBackgrounds = json.loads(f.read())
        self.ui.backgroundCombo.addItem(self.defaultBackground)
        for background_ in self.loadedBackgrounds:
            self.ui.backgroundCombo.addItem(background_)

        with open('default_data/alignment.json', 'r', encoding="utf-8") as f:
            self.loadedAlignments = json.loads(f.read())
        self.ui.alignmentCombo.addItem(self.defaultAlignment)
        for alignment_ in self.loadedAlignments:
            self.ui.alignmentCombo.addItem(alignment_)

        with open('default_data/json_schemes/raceSchema.json', 'r', encoding="utf-8") as f:
            self.raceSchema = json.loads(f.read())
        with open('default_data/json_schemes/classSchema.json', 'r', encoding="utf-8") as f:
            self.classSchema = json.loads(f.read())
        with open('default_data/json_schemes/backgroundSchema.json', 'r', encoding="utf-8") as f:
            self.backgroundSchema = json.loads(f.read())
        with open('default_data/json_schemes/alignmentSchema.json', 'r', encoding="utf-8") as f:
            self.alignmentSchema = json.loads(f.read())

        try:
            validate(self.loadedRaces, self.raceSchema)
            # validate(self.loadedClasses, self.classSchema)
            # validate(self.loadedBackgrounds, self.backgroundSchema)
            validate(self.loadedAlignments, self.alignmentSchema)
        except ValidationError:
            self.close()
            character_IO.errorReadWarning(self, "Ошибка. Файл, возможно, повреждён.")

        self.createCharacter()

    def initVariables(self):
        self.previousPosition = QtCore.QPoint()
        self.previousPositionChanged = QtGui.QMouseEvent
        self.isButtonPressed = QtCore.QEvent.MouseButtonPress
        QtCore.pyqtProperty(QtCore.QPoint, self.previousPosition, self.previousPosition,
                            self.setPreviousPosition, self.previousPositionChanged)
        self.Nothing = 0
        self.Move = 5
        self.m_previousPosition = QtCore.QPoint()
        self.m_leftMouseButtonPressed = 0
        self.moving = False
        self.rectInterface = None
        self.setCharacteristicUpdate = self.ui.characteristicBox.findChildren(
            QtWidgets.QLineEdit, QtCore.QRegularExpression("^[a-z]{6,12}$"))
        for QLineEdit in self.setCharacteristicUpdate:
            QLineEdit.textEdited.connect(
                functools.partial(self.characteristicUpdate))
        self.defaultRace = "Choose race..."
        self.defaultClass = "Choose class..."
        self.defaultBackground = "Choose background..."
        self.defaultAlignment = "Choose ..."
        self.selectedRace = "dwarf"
        self.selectedClass = "Barbarian"
        self.selectedBackground = "acolyte"
        self.selectedAlignment = "Lawful Good"
        self.characteristicSum = 0

    def createCharacter(self):
        try:
            with open("default_data/default_character.json", 'r', encoding="utf-8") as f:
                self.newCharacterGen = json.loads(f.read())
        except FileNotFoundError:
            character_IO.notFoundWarning(self, "[LOAD] Файл не найден.")
        except ValidationError:
            character_IO.notFoundWarning(self, "[LOAD] Файл не соответствует шаблону.")
        except Exception as e:
            character_IO.errorReadWarning(self, "[LOAD] Ошибка загрузки, выбран неверный файл или он повреждён.", e)

    def btnDoneClicked(self):
        character_IO.saveGenerated(self)
        try:
            with open("saves/CharGenTemp/your_new_character.json", 'w', encoding="utf-8") as f:
                f.write(json.dumps(self.newCharacterGen, sort_keys=False, indent=2))
        except FileNotFoundError:
            character_IO.notFoundWarning(self, "[SAVE] Путь не выбран.")
        except Exception as e:
            character_IO.errorReadWarning(self, "[SAVE] Ещё какая-то ошибка.", e)
        self.close()
        self.parent.loadGenerated()

    def characteristicUpdate(self):
        self.characteristicSum = 0
        self.numsConvertion = {
            8: 0,
            9: 1,
            10: 2,
            11: 3,
            12: 4,
            13: 5,
            14: 7,
            15: 9
        }
        for num in self.setCharacteristicUpdate:
            textToInt = int(num.text()) if num.text() != "" else 8
            if textToInt < 8 or textToInt > 15:
                num.setStyleSheet("background-color: #e78181")
            else:
                num.setStyleSheet("background-color: #dcc48d")
            self.characteristicSum += self.numsConvertion[
                textToInt if textToInt in range(8, 16) else 8]
        self.ui.characteristicSum.setText(str(self.characteristicSum))
        if self.characteristicSum != 27:
            self.ui.characteristicSumMax.setStyleSheet(
                "QLabel {color: red; font: 13pt \"Eberron\";}")
        else:
            for num in self.setCharacteristicUpdate:
                num.setStyleSheet("background-color: #91cd8e")
            self.ui.characteristicSumMax.setStyleSheet(
                "QLabel {color: black; font: 13pt \"Eberron\";}")
        self.btnDoneUpdate()

        characteristics = self.ui.characteristicBox.findChildren(QtWidgets.QLineEdit)
        for QLineEdit in characteristics:
            if (QLineEdit.accessibleDescription() == "base"):
                self.newCharacterGen["characteristic"][QLineEdit.accessibleName()] = int(
                    QLineEdit.text().replace("+", "")) if (QLineEdit.text().replace("+", "") != "") else 0
                self.newCharacterGen["characteristicBonus"][
                    QLineEdit.accessibleName() + "Bonus"] = math.floor(
                    (self.newCharacterGen["characteristic"][QLineEdit.accessibleName()] - 10) / 2)

        for QLineEdit in characteristics:
            if (QLineEdit.accessibleDescription() == "bonus"):
                tempBonus = self.newCharacterGen[
                    "characteristicBonus"][QLineEdit.accessibleName()]
                QLineEdit.setText(
                    (("+" if tempBonus >= 0 else "") + str(tempBonus)))

    def getRaceCombo(self, QString):
        self.selectedRace = QString
        if self.selectedRace != self.defaultRace:
            self.ui.raceSubCombo.clear()
            self.ui.raceSubCombo.setEnabled(True)
            for subRace in self.loadedRaces[self.selectedRace]["subraces"]:
                self.ui.raceSubCombo.addItem(subRace)
        else:
            self.ui.raceSubCombo.clear()
            self.ui.raceSubCombo.setEnabled(False)
        self.btnDoneUpdate()

    def getClassCombo(self, QString):
        self.classSkillsChecked = []
        self.selectedClass = QString
        if self.selectedClass != self.defaultClass:
            self.ui.classSkillsChoose.setEnabled(True)
            self.ui.classEquipmentChoose.setEnabled(True)
            for i in reversed(range(self.ui.classSkillsLayout.count())):
                self.ui.classSkillsLayout.itemAt(i).widget().deleteLater()
            for skill in self.loadedClasses[self.selectedClass]["init"]["skills"]:
                temp = QtWidgets.QCheckBox(skill, self.ui.classSkillsChoose)
                temp.setMinimumSize(40, 20)
                temp.setStyleSheet(style.getChooseWidgetInsideStyleSheet())
                temp.stateChanged.connect(functools.partial(
                    self.skillsGetChecked, temp, self.ui.classSkillsChoose, self.classSkillsChecked,
                    self.loadedClasses[self.selectedClass]["init"]["skillsChoice"]))
                self.ui.classSkillsLayout.addWidget(temp)
            self.ui.classEquipmentChoose.clear()
            eqLenght = self.loadedClasses[self.selectedClass]["init"]["equipmentToChooseFrom"]
            self.classEquipmentChecked = [[0] * 0 for i in range(len(eqLenght))]
            for tabs in range(len(self.loadedClasses[self.selectedClass]["init"]["equipmentToChooseFrom"])):
                self.ui.classEquipmentChoose.addTab(
                    QtWidgets.QWidget(self.ui.classEquipmentChoose), str(tabs + 1))
                self.thisLayout = QtWidgets.QVBoxLayout(self.ui.classEquipmentChoose.widget(tabs))
                self.thisLayout.setContentsMargins(5, 5, 5, 5)
                for equipment in self.loadedClasses[self.selectedClass]["init"]["equipmentToChooseFrom"][tabs]:
                    temp = QtWidgets.QCheckBox(equipment, self.ui.classEquipmentChoose.tabBar())
                    temp.setMinimumSize(40, 20)
                    temp.stateChanged.connect(functools.partial(
                        self.equipmentGetChecked, temp, self.ui.classEquipmentChoose, self.classEquipmentChecked,
                        self.loadedClasses[self.selectedClass]["init"]["equipmentToChoice"]))
                    self.thisLayout.addWidget(temp)
        else:
            for i in reversed(range(self.ui.classSkillsLayout.count())):
                self.ui.classSkillsLayout.itemAt(i).widget().deleteLater()
            self.ui.classEquipmentChoose.clear()
            self.ui.classSkillsChoose.setEnabled(False)
            self.ui.classEquipmentChoose.setEnabled(False)
        self.btnDoneUpdate()

    def skillsGetChecked(self, QCheckBox, QWidget, CheckedArray, Max):
        if QCheckBox.checkState() == Qt.Checked:
            if len(CheckedArray) == Max:
                skillsInBox = QWidget.findChildren(QtWidgets.QCheckBox)
                for skill in skillsInBox:
                    if skill not in CheckedArray:
                        skill.setCheckable(False)
            else:
                CheckedArray.append(QCheckBox)
        elif QCheckBox.checkState() == Qt.Unchecked:
            if QCheckBox in CheckedArray:
                CheckedArray.remove(QCheckBox)
                skillsInBox = QWidget.findChildren(QtWidgets.QCheckBox)
                for skill in skillsInBox:
                    skill.setCheckable(True)

    def equipmentGetChecked(self, QCheckBox, QTabWidget, CheckedArray, Max):
        for tabs in range(QTabWidget.count()):
            if QCheckBox.parentWidget() == QTabWidget.widget(tabs):
                if QCheckBox.checkState() == Qt.Checked:
                    if len(CheckedArray[tabs]) == Max:
                        equipmentInBox = QTabWidget.widget(
                            tabs).findChildren(QtWidgets.QCheckBox)
                        for equipment in equipmentInBox:
                            if equipment not in CheckedArray[tabs]:
                                equipment.setCheckable(False)
                    else:
                        CheckedArray[tabs].append(QCheckBox)
                elif QCheckBox.checkState() == Qt.Unchecked:
                    if QCheckBox in CheckedArray[tabs]:
                        CheckedArray[tabs].remove(QCheckBox)
                        equipmentInBox = QTabWidget.widget(
                            tabs).findChildren(QtWidgets.QCheckBox)
                        for equipment in equipmentInBox:
                            equipment.setCheckable(True)

    def getBackgroundCombo(self, QString):
        self.backgroundSpecChecked = []
        self.selectedBackground = QString
        if self.selectedBackground != self.defaultBackground:
            self.ui.backgroundSpecChoose.clear()
            self.ui.backgroundSpecChoose.setEnabled(True)
            self.ui.backgroundEquipmentChoose.setEnabled(True)
            for skill in self.loadedBackgrounds[self.selectedBackground]["specialization"]:
                self.ui.backgroundSpecChoose.addItem(skill)
            self.ui.backgroundEquipmentChoose.clear()
            eqLenght = self.loadedBackgrounds[self.selectedBackground]["equipmentToChooseFrom"]
            self.backgroundEquipmentChecked = [[0] * 0 for i in range(len(eqLenght))]
            for tabs in range(len(self.loadedBackgrounds[self.selectedBackground]["equipmentToChooseFrom"])):
                self.ui.backgroundEquipmentChoose.addTab(
                    QtWidgets.QWidget(self.ui.backgroundEquipmentChoose), str(tabs + 1))
                self.thisLayout = QtWidgets.QVBoxLayout(
                    self.ui.backgroundEquipmentChoose.widget(tabs))
                self.thisLayout.setContentsMargins(5, 5, 5, 5)
                for equipment in self.loadedBackgrounds[self.selectedBackground]["equipmentToChooseFrom"][tabs]:
                    temp = QtWidgets.QCheckBox(
                        equipment, self.ui.backgroundEquipmentChoose.tabBar())
                    temp.setMinimumSize(40, 20)
                    temp.stateChanged.connect(functools.partial(
                        self.equipmentGetChecked, temp, self.ui.backgroundEquipmentChoose,
                        self.backgroundEquipmentChecked,
                        self.loadedBackgrounds[self.selectedBackground]["equipmentToChoice"]))
                    self.thisLayout.addWidget(temp)
        else:
            self.ui.backgroundSpecChoose.clear()
            self.ui.backgroundEquipmentChoose.clear()
            self.ui.classSkillsChoose.setEnabled(False)
            self.ui.backgroundEquipmentChoose.setEnabled(False)
        self.btnDoneUpdate()

    def getAlignmentCombo(self, QString):
        self.selectedAlignment = QString
        self.btnDoneUpdate()

    def btnDoneUpdate(self):
        nums = []
        for num in self.setCharacteristicUpdate:
            textToInt = int(num.text()) if num.text() != "" else 8
            if textToInt in range(8, 16):
                nums.append(True)
            else:
                nums.append(False)
        numsTrue = 0
        for num in nums:
            if num:
                numsTrue += 1
        numstate = (numsTrue == len(nums))

        if (self.selectedRace != self.defaultRace and self.selectedClass != self.defaultClass
                and self.selectedBackground != self.defaultBackground
                and self.selectedAlignment != self.defaultAlignment and self.characteristicSum == 27
                and numstate is True):
            self.ui.btnDone.setEnabled(True)
        else:
            self.ui.btnDone.setEnabled(False)

    def personalityRollClicked(self):
        personality = self.loadedBackgrounds[self.selectedBackground][
            "personality"]["personalityTraits"]
        personalityRoll = random.randint(0, len(personality) - 1)
        self.ui.personalityEdit.setText(personality[personalityRoll])

    def idealsRollClicked(self):
        ideals = self.loadedBackgrounds[self.selectedBackground][
            "personality"]["ideals"]
        idealsRoll = random.randint(0, len(ideals) - 1)
        self.ui.idealsEdit.setText(ideals[idealsRoll])
        self.ui.idealsRoll.setStyleSheet(style.rollD6(idealsRoll))

    def bondsRollClicked(self):
        bonds = self.loadedBackgrounds[self.selectedBackground][
            "personality"]["bonds"]
        bondsRoll = random.randint(0, len(bonds) - 1)
        self.ui.bondsEdit.setText(bonds[bondsRoll])
        self.ui.bondsRoll.setStyleSheet(style.rollD6(bondsRoll))

    def flawsRollClicked(self):
        flaws = self.loadedBackgrounds[self.selectedBackground][
            "personality"]["flaws"]
        flawsRoll = random.randint(0, len(flaws) - 1)
        self.ui.flawsEdit.setText(flaws[flawsRoll])
        self.ui.flawsRoll.setStyleSheet(style.rollD6(flawsRoll))

    def changedMaximize(self):
        if not self.isMaximized():
            self.ui.btnMaximize.setIcon(
                QtGui.QIcon('images/buttons/maximize.png'))
            self.ui.btnMaximize.setIconSize(QtCore.QSize(10, 10))
            self.ui.toolBar.setMinimumHeight(23)
            self.ui.toolBar.setMaximumHeight(23)
            self.ui.mainLayout.setContentsMargins(0, 0, 0, 0)
            self.ui.mainLayout.setSpacing(0)
            self.showMaximized()
        else:
            self.ui.btnMaximize.setIcon(
                QtGui.QIcon('images/buttons/maximize.png'))
            self.ui.btnMaximize.setIconSize(QtCore.QSize(10, 10))
            self.ui.toolBar.setMinimumHeight(31)
            self.ui.toolBar.setMaximumHeight(31)
            self.ui.mainLayout.setContentsMargins(12, 12, 12, 12)
            self.showNormal()

    def previousPosition(self, previousPosition):
        return self.m_previousPosition

    def setPreviousPosition(self, previousPosition):
        if (self.m_previousPosition == self.previousPosition):
            return
        self.m_previousPosition = self.previousPosition
        self.emit(self.previousPositionChanged(self.previousPosition))

    def mousePressEvent(self, event):
        if (event.button() == Qt.LeftButton):
            self.m_leftMouseButtonPressed = self.checkResizableField(event)
            self.setPreviousPosition(event.pos())
        return QtWidgets.QWidget.mousePressEvent(self, event)

    def mouseReleaseEvent(self, event):
        if (event.button() == Qt.LeftButton):
            self.m_leftMouseButtonPressed = 0
            QtWidgets.QWidget.setCursor(self, Qt.ArrowCursor)
            self.moving = False
            return QtWidgets.QWidget.mouseReleaseEvent(self, event)

    def mouseMoveEvent(self, event):
        if event.buttons() == QtCore.Qt.NoButton:
            pass
        elif event.buttons() == QtCore.Qt.LeftButton:
            if not self.moving:
                self.mouseTouch = event.pos()
                self.moving = True
            if self.m_leftMouseButtonPressed == self.Move:
                if self.isMaximized():
                    self.ui.btnMaximize.setIcon(
                        QtGui.QIcon('images/buttons/maximize.png'))
                    self.ui.btnMaximize.setIconSize(QtCore.QSize(10, 10))
                    self.ui.toolBar.setMinimumHeight(31)
                    self.ui.toolBar.setMaximumHeight(31)
                    self.offsetX = self.minimumSize().width() / (self.width() / event.x())
                    self.showNormal()
                    self.mouseTouch = QtCore.QPoint(
                        self.offsetX, self.mouseTouch.y())
                else:
                    dx = event.x() - self.m_previousPosition.x()
                    dy = event.y() - self.m_previousPosition.y()
                    self.setGeometry(self.x() + dx - self.mouseTouch.x(), self.y() +
                                     dy - self.mouseTouch.y(), self.width(), self.height())
        elif event.buttons() == QtCore.Qt.RightButton:
            pass

    def mouseDoubleClickEvent(self, event):
        self.m_leftMouseButtonPressed = self.checkResizableField(event)
        if self.m_leftMouseButtonPressed == self.Move:
            self.changedMaximize()
            self.mouseReleaseEvent(event)

    def checkResizableField(self, event):
        self.position = event.screenPos()
        self.margin = self.ui.mainLayout.contentsMargins().left()
        self.rectInterface = QtCore.QRectF(self.x() + self.margin, self.y(
        ) + self.margin, self.width() - self.margin, self.ui.toolBar.maximumSize().height())

        if (self.rectInterface.contains(self.position)):
            QtWidgets.QWidget.setCursor(self, Qt.ClosedHandCursor)
            return self.Move
        QtWidgets.QWidget.setCursor(self, Qt.ArrowCursor)
        return self.Nothing
