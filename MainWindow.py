import functools
import json
import math

from PyQt5 import uic
from PyQt5 import QtWidgets
from PyQt5 import QtGui
from PyQt5 import QtCore
from PyQt5.QtCore import Qt
from PyQt5.QtGui import QPixmap
from PyQt5.QtWidgets import QMessageBox
from PyQt5.QtWidgets import QFileDialog
from CharGenWindow import CharGenWindow

import style
import character_IO

(Ui_MainWindow, QMainWindow) = uic.loadUiType('MainWindow.ui')


class MainWindow(QMainWindow):

    def __init__(self, parent=None):
        QMainWindow.__init__(self, parent)
        self.ui = Ui_MainWindow()
        self.ui.setupUi(self)
        style.setupMain(self)

        self.setMouseTracking(True)
        self.ui.centralwidget.setMouseTracking(True)

        self.initVariables()
        self.CGW = CharGenWindow()
        self.CGW.parent = self
        self.newCharClicked()

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
        self.rectMenu = None
        self.rectTemper = None
        self.isMenuButtonClicked = False
        self.isTemperButtonClicked = False
        self.loadedCharacter = None
        self.backupCharacter = None
        setEnteredSignalQLineEdit = self.findChildren(QtWidgets.QLineEdit)
        setEnteredSignalQTextEdit = self.findChildren(QtWidgets.QTextEdit)
        for QLineEdit in setEnteredSignalQLineEdit:
            QLineEdit.textEdited.connect(functools.partial(self.fieldSaving, QLineEdit))
        # for QTextEdit in setEnteredSignalQTextEdit:
        #     QTextEdit.textChanged.connect(functools.partial(self.fieldSaving, QLineEdit))
        self.setCharacteristicUpdate = self.ui.characteristicBox.findChildren(
            QtWidgets.QLineEdit, QtCore.QRegularExpression("^[a-z]{6,12}$"))
        for QLineEdit in self.setCharacteristicUpdate:
            QLineEdit.textEdited.connect(
                functools.partial(self.modifireUpdate, QLineEdit))
        self.pathToJson = ""
        self.fileIsNew = False
        self.isAvailableToGenerate = True

    def modifireUpdate(self, QLineEdit):
        characteristics = self.ui.characteristicBox.findChildren(QtWidgets.QLineEdit)
        for QLineEdit in characteristics:
            if (QLineEdit.accessibleDescription() == "base"):
                self.loadedCharacter["characteristic"][QLineEdit.accessibleName()] = int(
                    QLineEdit.text().replace("+", "")) if (QLineEdit.text().replace("+", "") != "") else 0
                self.loadedCharacter["characteristicBonus"][
                    QLineEdit.accessibleName() + "Bonus"] = math.floor((self.loadedCharacter["characteristic"][QLineEdit.accessibleName()] - 10) / 2)

        for QLineEdit in characteristics:
            if (QLineEdit.accessibleDescription() == "bonus"):
                tempBonus = self.loadedCharacter[
                    "characteristicBonus"][QLineEdit.accessibleName()]
                QLineEdit.setText(
                    (("+" if tempBonus >= 0 else "") + str(tempBonus)))

    def menuButtonClicked(self):
        if not self.isMenuButtonClicked:
            self.ui.menuButton.setIcon(QtGui.QIcon(
                'images/buttons/bookmark_extended.png'))
            self.ui.menuButton.setIconSize(QtCore.QSize(128, 256))
            self.ui.menuButton.setGeometry(0, 0, 128, 256)
            self.ui.menuBox.show()
            self.isMenuButtonClicked = True
        else:
            self.ui.menuButton.setIcon(QtGui.QIcon(
                'images/buttons/bookmark_bottom.png'))
            self.ui.menuButton.setIconSize(QtCore.QSize(128, 64))
            self.ui.menuButton.setGeometry(0, 0, 128, 32)
            self.ui.menuBox.hide()
            self.isMenuButtonClicked = False

    def temperButtonClicked(self):
        if not self.isTemperButtonClicked:
            self.ui.temperBox.show()
            self.isTemperButtonClicked = True
        else:
            self.ui.temperBox.hide()
            self.isTemperButtonClicked = False

    def openFileClicked(self):
        self.pathToJson = QtWidgets.QFileDialog.getOpenFileName(
            self, "Open Character", "./save/characters", "JSON (*.json)")[0]
        character_IO.loadCharacter(self)
        self.fileIsNew = False

    def fieldSaving(self, QLineEdit):
        character_IO.backupCharacter(self)

    def loadGenerated(self):
        self.pathToJson = "saves/CharGenTemp/your_new_character.json"
        character_IO.loadCharacter(self)
        self.fileIsNew = True
        self.ui.save.setEnabled(True)

    def newCharClicked(self):
        self.pathToJson = "default_data/default_character.json"
        character_IO.loadCharacter(self)
        self.fileIsNew = True
        self.ui.save.setEnabled(True)

    def saveClicked(self):
        character_IO.saveCharacter(self)
        character_IO.loadCharacter(self)

    def saveAs(self):
        try:
            self.bufPath = QFileDialog.getSaveFileName(
                self, "Open Character", "./saves", "JSON (*.json)")[0]
            with open(self.bufPath, 'w') as f:
                f.write(json.dumps(self.loadedCharacter,
                                   sort_keys=False, indent=2))
        except FileNotFoundError:
            notFoundWarning = QMessageBox()
            notFoundWarning.setWindowTitle(self.ui.label.text())
            notFoundWarning.setText("[ALL|SAVEAS]Файл не найден")
            notFoundWarning.setIconPixmap(QPixmap(
                "images/messages/warning").scaled(24, 24, Qt.KeepAspectRatio, Qt.SmoothTransformation))
            notFoundWarning.exec()
        except:
            notFoundWarning = QMessageBox()
            notFoundWarning.setWindowTitle(self.ui.label.text())
            notFoundWarning.setText("[ALL|SAVEAS]Ошибка")
            notFoundWarning.setIconPixmap(QPixmap(
                "images/messages/warning").scaled(24, 24, Qt.KeepAspectRatio, Qt.SmoothTransformation))
            notFoundWarning.exec()
        else:
            self.pathToJson = self.bufPath

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
            self.mlb_isMenu = self.checkMenuButtonField(event)
            self.mlb_isTemper = self.checkTemperButtonField(event)
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

        if(self.rectInterface.contains(self.position)):
            QtWidgets.QWidget.setCursor(self, Qt.ClosedHandCursor)
            return self.Move
        else:
            QtWidgets.QWidget.setCursor(self, Qt.ArrowCursor)
            return self.Nothing

    def checkMenuButtonField(self, event):
        self.position = event.screenPos()
        self.rectMenu = QtCore.QRectF(
            0, 0, self.ui.menuButton.width(), self.ui.menuButton.height())
        if not (self.rectMenu.contains(self.position)) and (self.isMenuButtonClicked == True):
            self.menuButtonClicked()

    def checkTemperButtonField(self, event):
        self.position = event.screenPos()
        self.rectTemper = QtCore.QRectF(
            self.ui.temperButton.x(), self.ui.temperButton.y(), self.ui.temperButton.width(), self.ui.temperButton.height())
        if not (self.rectTemper.contains(self.position)) and (self.isTemperButtonClicked == True):
            self.temperButtonClicked()

    def closeEvent(self, event):
        self.CGW.close()

    def __del__(self):
        self.ui = None
