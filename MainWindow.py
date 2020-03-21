from PyQt5 import uic
from PyQt5.QtWidgets import *
from PyQt5.QtGui import QIcon
from PyQt5.QtCore import QCoreApplication

(Ui_MainWindow, QMainWindow) = uic.loadUiType('design.ui')

class MainWindow(QMainWindow):

    def __init__(self, parent=None):
        QMainWindow.__init__(self, parent)
        self.ui = Ui_MainWindow()
        self.ui.setupUi(self)
        self.initUI()

    def __del__(self):
        self.ui = None