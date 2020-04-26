from PyQt5 import uic
from PyQt5 import QtWidgets
from PyQt5 import QtGui
from PyQt5 import QtCore
from PyQt5.QtCore import Qt
import style

(Ui_MainWindow, QMainWindow) = uic.loadUiType('MainWindow.ui')


class MainWindow(QMainWindow):

    def __init__(self, parent=None):
        QMainWindow.__init__(self, parent)
        self.ui = Ui_MainWindow()
        self.ui.setupUi(self)
        style.setupStyle(self)

        self.setMouseTracking(True)
        self.ui.centralwidget.setMouseTracking(True)

        self.initVariables()

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
        self.isMenuButtonClicked = False

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
        self.emit(previousPositionChanged(self.previousPosition))

    def mousePressEvent(self, event):
        if (event.button() == Qt.LeftButton):
            self.m_leftMouseButtonPressed = self.checkResizableField(event)
            self.mlb_isMenu = self.checkMenuButtonField(event)
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

    def __del__(self):
        self.ui = None
