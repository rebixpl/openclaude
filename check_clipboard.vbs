Set WSHShell = CreateObject("WScript.Shell")

' Check if image is in clipboard using PowerShell
command = "powershell -NoProfile -Command ""Add-Type -AssemblyName System.Windows.Forms; exit ([int][System.Windows.Forms.Clipboard]::ContainsImage())"""
exitCode = WSHShell.Run(command, 0, True)

WScript.Quit exitCode
