# -*- mode: python ; coding: utf-8 -*-

block_cipher = None


a = Analysis(['main.py'],
             pathex=[],
             binaries=[],
             datas=[],
             hiddenimports=[],
             hookspath=[],
             runtime_hooks=[],
             excludes=[],
             win_no_prefer_redirects=False,
             win_private_assemblies=False,
             cipher=block_cipher,
             noarchive=False)
a.datas += [('MainWindow.ui', 'C:/GitHubProjects/DnD5CharlistI/MainWindow.ui', '.'), 
  ('CharGenWindow.ui', 'C:/GitHubProjects/DnD5CharlistI/CharGenWindow.ui', '.'),
  ('default_data', 'C:/GitHubProjects/DnD5CharlistI/default_data', 'data'),
  ('images', 'C:/GitHubProjects/DnD5CharlistI/images', 'data'),
  ('fonts', 'C:/GitHubProjects/DnD5CharlistI/fonts', 'data'),
  ('saves', 'C:/GitHubProjects/DnD5CharlistI/saves', 'data')]
pyz = PYZ(a.pure, a.zipped_data,
             cipher=block_cipher)
exe = EXE(pyz,
          a.scripts,
          [],
          exclude_binaries=True,
          name='main',
          debug=False,
          bootloader_ignore_signals=False,
          strip=False,
          upx=True,
          console=False )
coll = COLLECT(exe,
               a.binaries,
               a.zipfiles,
               a.datas,
               strip=False,
               upx=True,
               upx_exclude=[],
               name='main')