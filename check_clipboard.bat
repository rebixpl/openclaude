@echo off
powershell -NoProfile -Command "Add-Type -AssemblyName System.Windows.Forms; exit ([int][System.Windows.Forms.Clipboard]::ContainsImage())"
