@echo off
cscript //Nologo check_clipboard.vbs
echo VBScript exit code: %errorlevel%
if %errorlevel%==0 (
    echo Image found!
) else (
    echo No image
)
