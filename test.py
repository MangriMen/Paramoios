import unittest2
import sys
from PyQt5.QtWidgets import QApplication
from PyQt5 import uic
from PyQt5 import QtWidgets
from PyQt5 import QtGui
from PyQt5 import QtCore
from PyQt5.QtCore import Qt
from PyQt5.QtGui import QPixmap
from PyQt5.QtWidgets import QMessageBox
from PyQt5.QtWidgets import QFileDialog
from MainWindow import MainWindow

class TestUM(unittest2.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.app = QApplication(sys.argv)
        cls.w = MainWindow()

    def test_modifierUpdate(self):
        characteristics = self.w.ui.characteristicBox.findChildren(QtWidgets.QLineEdit)
        for QLineEdit in characteristics:
            if QLineEdit.accessibleDescription() == "base":
                QLineEdit.setText("12")
        self.w.modifireUpdate(QLineEdit)
        for QLineEdit in characteristics:
            if QLineEdit.accessibleDescription() == "bonus":
                self.assertEqual("+1", QLineEdit.text())


if __name__ == '__main__':
    unittest2.main()
