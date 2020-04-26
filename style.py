from PyQt5 import uic
from PyQt5 import QtWidgets
from PyQt5 import QtGui
from PyQt5 import QtCore
from PyQt5.QtCore import Qt


def setupStyle(self):
    QtGui.QFontDatabase.addApplicationFont('fonts/BOOKMANIA-REGULAR.TTF')
    QtGui.QFontDatabase.addApplicationFont('fonts/EBERRON_RUS.TTF')

    self.setWindowFlags(QtCore.Qt.Widget | QtCore.Qt.FramelessWindowHint)
    self.setAttribute(Qt.WA_TranslucentBackground)
    self.setStyleSheet(getWindowStyleSheet())

    self.ui.label.setStyleSheet(getLabelStyleSheet())

    self.ui.menuButton.setIcon(QtGui.QIcon('images/buttons/bookmark_bottom.png'))
    self.ui.menuButton.setIconSize(QtCore.QSize(128, 64))
    self.ui.menuBox.hide()

    self.ui.newChar.setStyleSheet(getMenuButtonStyleSheet())
    self.ui.openFile.setStyleSheet(getMenuButtonStyleSheet())
    self.ui.save.setStyleSheet(getMenuButtonStyleSheet())
    self.ui.saveAs.setStyleSheet(getMenuButtonStyleSheet())
    self.ui.exit.setStyleSheet(getMenuButtonStyleSheet())

    self.ui.btnClose.setStyleSheet(getCloseStyleSheet())
    self.ui.btnClose.setIcon(QtGui.QIcon('images/buttons/close.png'))
    self.ui.btnClose.setIconSize(QtCore.QSize(10, 10))

    self.ui.btnMaximize.setStyleSheet(getMaximizeStyleSheet())
    self.ui.btnMaximize.setIcon(QtGui.QIcon('images/buttons/maximize.png'))
    self.ui.btnMaximize.setIconSize(QtCore.QSize(10, 10))

    self.ui.btnMinimize.setStyleSheet(getMinimizeStyleSheet())
    self.ui.btnMinimize.setIcon(QtGui.QIcon('images/buttons/minimize.png'))
    self.ui.btnMinimize.setIconSize(QtCore.QSize(10, 10))

    self.ui.toolBar.setStyleSheet(getToolBarStyleSheet())

    CreateWindowShadow(self)
    ShadowLineEdit(self)
    ShadowRadioButton(self)
    ShadowLabel(self)


def CreateLineEditShadow(self, lineEdit):
    shadowEffect = QtWidgets.QGraphicsDropShadowEffect(self)
    shadowEffect.setBlurRadius(5)
    shadowEffect.setOffset(0)
    shadowEffect.setColor(QtGui.QColor(66, 66, 66))
    lineEdit.setGraphicsEffect(shadowEffect)


def CreateRadioButtonShadow(self, radioButton):
    shadowEffect = QtWidgets.QGraphicsDropShadowEffect(self)
    shadowEffect.setBlurRadius(16)
    shadowEffect.setOffset(0)
    shadowEffect.setColor(QtGui.QColor(200, 200, 200))
    radioButton.setGraphicsEffect(shadowEffect)


def CreateLabelShadow(self, label):
    shadowEffect = QtWidgets.QGraphicsDropShadowEffect(self)
    shadowEffect.setBlurRadius(8)
    shadowEffect.setOffset(0)
    shadowEffect.setColor(QtGui.QColor(255, 255, 255))
    label.setGraphicsEffect(shadowEffect)


def CreateWindowShadow(self):
    shadowEffect = QtWidgets.QGraphicsDropShadowEffect(self)
    shadowEffect.setBlurRadius(12)
    shadowEffect.setOffset(0)
    shadowEffect.setColor(QtGui.QColor(0, 0, 0))
    self.ui.centralwidget.setGraphicsEffect(shadowEffect)


def ShadowLineEdit(self):
    lineEdits = self.findChildren(QtWidgets.QLineEdit)
    for QLineEdit in lineEdits:
        CreateLineEditShadow(self, QLineEdit)


def ShadowRadioButton(self):
    radioButtons = self.findChildren(QtWidgets.QRadioButton)
    for QRadioButton in radioButtons:
        CreateRadioButtonShadow(self, QRadioButton)


def ShadowLabel(self):
    labels = self.findChildren(QtWidgets.QLabel)
    for QLabel in labels:
        CreateLabelShadow(self, QLabel)


def getWindowStyleSheet():
    return ("QWidget#centralwidget { "
            "background-color: white;"
            "background-image: url('images/background/backmenu.png');"
            "background-position: center;"
            "}"
            "QLineEdit {"
            "background-color: #d6c48d;"
            "border: 2px ridge #6e3320;"
            "border-radius: 3px"
            "}"
            "QLabel {"
            "color: black;"
            "}"
            "QPushButton#menuButton {"
            "border: none"
            "}"
            "QRadioButton::indicator {"
            "width: 14px;"
            "height: 14px;"
            "border-radius: 7px;"
            "}"
            "QRadioButton::indicator:checked {"
            "image: url('images/buttons/radio_checked.png');"
            "}"
            "QRadioButton::indicator:unchecked {"
            "image: url('images/buttons/radio_unchecked.png');"
            "}")


def getLabelStyleSheet():
    return ("QLabel { "
            "color: #fff;"
            "background-color: none;"
            "border: none;"
            "font: 14pt \"Eberron\";"
            "}")


def getCloseStyleSheet():
    return ("QPushButton {"
            "width: 35px;"
            "height: 25px;"
            "background-color: #681e22;"
            "border: none"
            "}"
            "QPushButton:hover {"
            "background-color: #eb385b"
            "}"
            "QPushButton:pressed { "
            "background-color: #ff365d; "
            "}")


def getMaximizeStyleSheet():
    return ("QPushButton { "
            "width: 35px;"
            "height: 25px;"
            "background-color: #681e22;"
            "border: none;"
            "}"
            "QPushButton:hover {"
            "background-color: #383838"
            "}"
            "QPushButton:pressed { "
            "background-color: #de8e37; "
            "}")


def getRestoreStyleSheet():
    return ("QPushButton { "
            "width: 35px;"
            "height: 25px;"
            "background-color: #681e22;"
            "border: none;"
            "}"
            "QPushButton:hover {"
            "background-color: #383838"
            "}"
            "QPushButton:pressed { "
            "background-color: #de8e37; "
            "}")


def getMinimizeStyleSheet():
    return ("QPushButton { "
            "width: 35px;"
            "height: 25px;"
            "background-color: #681e22;"
            "border: none; "
            "}"
            "QPushButton:hover { "
            "background-color: #383838"
            "}"
            "QPushButton:pressed { "
            "background-color: #d6c48d; "
            "}")


def getMenuStyleSheet():
    return ("QPushButton { "
            "color: #8f8f8f;"
            "background-color: #292929;"
            "border: none; "
            "}"
            "QPushButton:hover {"
            "color: #ffffff;"
            "}"
            "QPushButton:pressed { "
            "color: #ffffff; "
            "background-color: #de8e37; "
            "}")


def getMenuButtonStyleSheet():
    return ("QPushButton {"
            "font: 12pt \"Eberron\";"
            "background-color: #d6c48d;"
            "}")


def getToolBarStyleSheet():
    return ("QWidget {"
            "background-color: #681e22;"
            "border: none;"
            "}")
