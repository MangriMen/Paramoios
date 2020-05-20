import sys
from PyQt5.QtWidgets import QApplication
from MainWindow import MainWindow

if __name__ == '__main__':

    app = QApplication(sys.argv)

    w = MainWindow()
    w.move(100, 100)
    w.setWindowTitle('DnD5CharlistI')
    w.show()

    sys.exit(app.exec_())
