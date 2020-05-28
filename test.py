import math
import sys

import unittest2
from PyQt5.QtWidgets import QApplication
from PyQt5 import QtWidgets

from MainWindow import MainWindow


class TestUM(unittest2.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.app = QApplication(sys.argv)
        cls.w = MainWindow()

    def testModifierUpdate1(self):
        partOfChar = self.w.loadedCharacter["characteristic"]
        partOfChar["strength"] = 12
        partOfChar["dexterity"] = 12
        partOfChar["constitution"] = 12
        partOfChar["intelligence"] = 12
        partOfChar["wisdom"] = 12
        partOfChar["charisma"] = 14
        characteristics = self.w.ui.characteristicBox.findChildren(QtWidgets.QLineEdit)
        self.w.modifierUpdate()
        for QLineEdit in characteristics:
            formulaCalculatedBonus = str(math.floor((self.w.loadedCharacter["characteristic"][QLineEdit.accessibleName().replace("Bonus", "")] - 10) / 2))
            if QLineEdit.accessibleDescription() == "bonus":
                self.assertEqual(formulaCalculatedBonus, QLineEdit.text())

    def testModifierUpdate2(self):
        partOfChar = self.w.loadedCharacter["characteristic"]
        partOfChar["strength"] = 15
        partOfChar["dexterity"] = 15
        partOfChar["constitution"] = 8
        partOfChar["intelligence"] = 8
        partOfChar["wisdom"] = 10
        partOfChar["charisma"] = 14
        characteristics = self.w.ui.characteristicBox.findChildren(QtWidgets.QLineEdit)
        self.w.modifierUpdate()
        for QLineEdit in characteristics:
            formulaCalculatedBonus = str(math.floor((self.w.loadedCharacter["characteristic"][QLineEdit.accessibleName().replace("Bonus", "")] - 10) / 2))
            if QLineEdit.accessibleDescription() == "bonus":
                self.assertEqual(formulaCalculatedBonus, QLineEdit.text())

    def testModifierUpdate3(self):
        partOfChar = self.w.loadedCharacter["characteristic"]
        partOfChar["strength"] = 12
        partOfChar["dexterity"] = 13
        partOfChar["constitution"] = 15
        partOfChar["intelligence"] = 10
        partOfChar["wisdom"] = 12
        partOfChar["charisma"] = 11
        characteristics = self.w.ui.characteristicBox.findChildren(QtWidgets.QLineEdit)
        self.w.modifierUpdate()
        for QLineEdit in characteristics:
            formulaCalculatedBonus = str(math.floor((self.w.loadedCharacter["characteristic"][QLineEdit.accessibleName().replace("Bonus", "")] - 10) / 2))
            if QLineEdit.accessibleDescription() == "bonus":
                self.assertEqual(formulaCalculatedBonus, QLineEdit.text())

    def testBtnDoneUpdate1(self):
        self.w.CGW.ui.raceCombo.setCurrentIndex(1)
        self.w.CGW.ui.classCombo.setCurrentIndex(1)
        self.w.CGW.ui.backgroundCombo.setCurrentIndex(1)
        self.w.CGW.ui.alignmentCombo.setCurrentIndex(1)
        self.w.CGW.ui.strength.setText("12")
        self.w.CGW.ui.dexterity.setText("10")
        self.w.CGW.ui.constitution.setText("11")
        self.w.CGW.ui.intelligence.setText("12")
        self.w.CGW.ui.wisdom.setText("14")
        self.w.CGW.ui.charisma.setText("14")
        self.w.CGW.characteristicUpdate()
        self.w.CGW.btnDoneUpdate()
        self.assertTrue(self.w.CGW.ui.btnDone.isEnabled())


    def testBtnDoneUpdate2(self):
        self.w.CGW.ui.raceCombo.setCurrentIndex(1)
        self.w.CGW.ui.classCombo.setCurrentIndex(1)
        self.w.CGW.ui.backgroundCombo.setCurrentIndex(1)
        self.w.CGW.ui.alignmentCombo.setCurrentIndex(1)
        self.w.CGW.ui.strength.setText("15")
        self.w.CGW.ui.dexterity.setText("15")
        self.w.CGW.ui.constitution.setText("8")
        self.w.CGW.ui.intelligence.setText("8")
        self.w.CGW.ui.wisdom.setText("8")
        self.w.CGW.ui.charisma.setText("15")
        self.w.CGW.characteristicUpdate()
        self.w.CGW.btnDoneUpdate()
        self.assertTrue(self.w.CGW.ui.btnDone.isEnabled())

    def testBtnDoneUpdate3(self):
        self.w.CGW.ui.raceCombo.setCurrentIndex(1)
        self.w.CGW.ui.classCombo.setCurrentIndex(1)
        self.w.CGW.ui.backgroundCombo.setCurrentIndex(1)
        self.w.CGW.ui.alignmentCombo.setCurrentIndex(1)
        self.w.CGW.ui.strength.setText("15")
        self.w.CGW.ui.dexterity.setText("13")
        self.w.CGW.ui.constitution.setText("10")
        self.w.CGW.ui.intelligence.setText("12")
        self.w.CGW.ui.wisdom.setText("15")
        self.w.CGW.ui.charisma.setText("14")
        self.w.CGW.characteristicUpdate()
        self.w.CGW.btnDoneUpdate()
        self.assertFalse(self.w.CGW.ui.btnDone.isEnabled())


if __name__ == '__main__':
    unittest2.main()
