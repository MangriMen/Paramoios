from PyQt5 import uic
from PyQt5 import QtWidgets
from PyQt5 import QtGui
from PyQt5 import QtCore
from PyQt5.QtCore import Qt


def setupMain(self):
    QtGui.QFontDatabase.addApplicationFont('fonts/BOOKMANIA-REGULAR.TTF')
    QtGui.QFontDatabase.addApplicationFont('fonts/EBERRON_RUS.TTF')

    self.setWindowFlags(QtCore.Qt.Widget | QtCore.Qt.FramelessWindowHint)
    self.setAttribute(Qt.WA_TranslucentBackground)
    self.setStyleSheet(getWindowStyleSheet())

    self.ui.label.setStyleSheet(getLabelStyleSheet())

    self.ui.menuButton.setIcon(QtGui.QIcon('images/buttons/bookmark_bottom.png'))
    self.ui.menuButton.setIconSize(QtCore.QSize(128, 64))
    self.ui.menuBox.hide()

    self.ui.temperBox.hide()
    CreateLineEditShadow(self, self.ui.temperBox)

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


def setupCharGen(self):
    QtGui.QFontDatabase.addApplicationFont('fonts/BOOKMANIA-REGULAR.TTF')
    QtGui.QFontDatabase.addApplicationFont('fonts/EBERRON_RUS.TTF')

    self.setWindowFlags(QtCore.Qt.Widget | QtCore.Qt.FramelessWindowHint)
    self.setAttribute(Qt.WA_TranslucentBackground)
    self.setStyleSheet(getWindowStyleSheet())

    self.ui.label.setStyleSheet(getLabelStyleSheet())

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

    self.ui.temperBox.setAttribute(Qt.WA_TranslucentBackground)

    self.ui.classSkillsChoose.setStyleSheet(getChooseWidgetStyleSheet())
    self.ui.backgroundSpecChoose.setStyleSheet(getChooseWidgetStyleSheet())

    self.ui.raceAddLanguageCombo.hide()
    self.ui.raceAddLanguageLabel.hide()

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
            "border: 1px solid #681e22;"
            "}"
            "QLineEdit {"
            "background-color: #dcc48d;"
            "border: 2px ridge #6e3320;"
            "border-radius: 3px;"
            "}"
            "QLabel {"
            "color: black;"
            "}"
            "QPushButton#menuButton {"
            "border: none"
            "}"
            "QWidget#copper {"
            "border-image: url('images/money/copper.png') 0 0 0 0 stretch stretch;"
            "}"
            "QWidget#silver {"
            "border-image: url('images/money/silver.png') 0 0 0 0 stretch stretch;"
            "}"
            "QWidget#electrum {"
            "border-image: url('images/money/electrum.png') 0 0 0 0 stretch stretch;"
            "}"
            "QWidget#gold {"
            "border-image: url('images/money/gold.png') 0 0 0 0 stretch stretch;"
            "}"
            "QWidget#platinum {"
            "border-image: url('images/money/platinum.png') 0 0 0 0 stretch stretch;"
            "}"
            "QFrame#temperBox {"
            "background-color: #efe7cf;;"
            "border: 2px ridge #6e3320;"
            "border-radius: 3px;"
            "}"
            "QTextEdit {"
            "background-color: #dcc48d;"
            "border: 2px ridge #6e3320;"
            "border-radius: 3px"
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
            "}"
            "QComboBox {"
            "background-color: #dcc48d;"
            "border: 2px ridge #6e3320;"
            "border-radius: 3px"
            "}"
            "QComboBox QAbstractItemView {"
            "selection-background-color: #e5d297;"
            "background-color: #dcc48d;"
            "border: 2px ridge #6e3320;"
            "border-radius: 3px"
            "}"
            "QComboBox QScrollBar:vertical {"
            "selection-background-color: #e5d297;"
            "background-color: #dcc48d;"
            "}"
            "QPushButton#btnDone {"
            "border: none;"
            "font: 28pt \"Eberron\";"
            "color: #fff;"
            "background-color: #681e22;"
            "}"
            "QPushButton#btnDone::disabled {"
            "color: #bdbdbd;"
            "background-color: #693e40;"
            "}"
            "QPushButton#btnDone::hover {"
            "background-color: #752226;"
            "}"
            "QWidget#skillsChooseBox {"
            "background-color: #dcc48d;"
            "border: 2px ridge #6e3320;"
            "border-radius: 3px;"
            "}"
            "QWidget#skillsChooseBox::disabled {"
            "background-color: #cbbe98;"
            "border: 2px ridge #6e3320;"
            "border-radius: 3px;"
            "}"
            "QWidget::tab-bar {"
            "left: 3px;"
            "}"
            "QTabWidget::pane {"
            "background-color: #dcc48d;"
            "border: 3px solid #681e22;"
            "border-radius: 3px;"
            "top: -2px;"
            "}"
            "QTabBar::tab {"
            "color: white;"
            "background-color: #82262a;"
            "border: 2px solid #4f171a;"
            "border-bottom-color:: #dcc48d;"
            "border-top-left-radius: 4px;"
            "border-top-right-radius: 4px;"
            "padding: 2px;"
            "min-width: 8ex;"
            "}"
            "QTabBar::tab:selected, QTabBar::tab:hover {"
            "background-color: #9c2d33;"
            "}"
            "QTabBar::tab:selected {"
            "border-bottom-color:: #dcc48d;"
            "}"
            "QCheckBox::indicator {"
            "width: 14px;"
            "height: 14px;"
            "}"
            "QCheckBox::indicator:checked {"
            "image: url('images/buttons/checkbox_checked.png');"
            "}"
            "QCheckBox::indicator:checked:hover {"
            "image: url('images/buttons/checkbox_checked_hover.png');"
            "}"
            "QCheckBox::indicator:checked:pressed {"
            "background-color: #22681e22;"
            "}"
            "QCheckBox::indicator:unchecked {"
            "image: url('images/buttons/checkbox_unchecked.png');"
            "}"
            "QCheckBox::indicator:unchecked:hover {"
            "image: url('images/buttons/checkbox_unchecked_hover.png');"
            "}"
            "QCheckBox::indicator:unchecked:pressed {"
            "background-color: #22681e22;"
            "}"
            "QFrame#raceBox, QFrame#alignmentBox, QFrame#classBox, QFrame#backgroundBox {"
            "border: 3px solid #6e3320;"
            "border-radius: 4px;"
            "}"
            "QPushButton#personalityRoll, QPushButton#idealsRoll, QPushButton#bondsRoll, QPushButton#flawsRoll {"
            "background: #00ffffff;"
            "image: url('images/buttons/D6_0.png');"
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
            "background-color: #e81123"
            "}"
            "QPushButton:pressed { "
            "background-color: #b51623; "
            "}")


def getMaximizeStyleSheet():
    return ("QPushButton { "
            "width: 35px;"
            "height: 25px;"
            "background-color: #681e22;"
            "border: none;"
            "}"
            "QPushButton:hover {"
            "background-color: #19ffffff"
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
            "background-color: #19ffffff"
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
            "background-color: #19ffffff"
            "}"
            "QPushButton:pressed { "
            "background-color: #dcc48d; "
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
            "background-color: #dcc48d;"
            "}")


def getToolBarStyleSheet():
    return ("QWidget {"
            "background-color: #681e22;"
            "border: none;"
            "}")


def getChooseWidgetStyleSheet():
    return ("QWidget {"
            "background-color: #dcc48d;"
            "border: 2px ridge #6e3320;"
            "border-radius: 3px;"
            "}"
            )


def getChooseWidgetInsideStyleSheet():
    return ("QWidget {"
            "border: none"
            "}")


def rollD6(roll):
    return ("QPushButton {"
            "background: #00ffffff;"
            "image: url('images/buttons/D6_" + str(roll + 1) + ".png');"
            "}")
