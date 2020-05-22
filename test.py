import math

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

import CharGenWindow
from MainWindow import MainWindow

class TestUM(unittest2.TestCase):
    @classmethod
    def setUpClass(self):
        self.app = QApplication(sys.argv)
        self.w = MainWindow()

    def test_modifierUpdate(self):
        characteristics = self.w.ui.characteristicBox.findChildren(QtWidgets.QLineEdit)
        self.w.modifierUpdate()
        for QLineEdit in characteristics:
            if QLineEdit.accessibleDescription() == "bonus":
                self.assertEqual(str(math.floor((self.w.loadedCharacter["characteristic"][QLineEdit.accessibleName().replace("Bonus", "")] - 10) / 2)), QLineEdit.text())

    def test_btnDoneUpdate(self):
        self.selectedRace = "Dwarf"
        self.selectedClass = "Barbarian"
        self.selectedBackground = "Acolyte"
        self.selectedAlignment = "Lawful Good"
        self.w.CGW.ui.strength.setText("12")
        self.w.CGW.ui.dexterity.setText("12")
        self.w.CGW.ui.constitution.setText("12")
        self.w.CGW.ui.intelligence.setText("12")
        self.w.CGW.ui.wisdom.setText("12")
        self.w.CGW.ui.charisma.setText("14")
        self.w.CGW.characteristicUpdate()
        self.w.CGW.btnDoneUpdate()
        self.assertTrue(self.w.CGW.ui.btnDone.isEnabled())

if __name__ == '__main__':
    unittest2.main()
