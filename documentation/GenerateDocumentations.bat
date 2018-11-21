@echo off
title Generate Documentations
echo I will generate all PDF files. 
pause
cd src

cd Pianificazione
pdflatex Pianificazione.tex

cd ../Progettazione
pdflatex Progettazione.tex

cd ..
pdflatex DocumentazioneCompleta.tex

cd ..
echo Done.

call RemoveAuxiliaryFiles.bat
call MoveDocumentations.bat
pause