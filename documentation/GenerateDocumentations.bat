@echo off
title Generatore

SETLOCAL EnableDelayedExpansion
for /F "tokens=1,2 delims=#" %%a in ('"prompt #$H#$E# & echo on & for %%b in (1) do     rem"') do (
  set "DEL=%%a"
)

mode con: cols=160 lines=40

:menu
cls
call :colorEcho 0c "  ####   ######  #####   ##  ##  ##   ##  ######  ##  ##  ######   ####   ##      ##   ##  ######  ##  ##  ######  ###### "
echo.
call :colorEcho 0c " ##        ##    ##  ##  ##  ##  ### ###  ##      ### ##    ##    ##  ##  ##      ### ###  ##      ### ##    ##    ##     "
echo.
call :colorEcho 0c "  ####     ##    #####   ##  ##  ## # ##  ####    ## ###    ##    ######  ##      ## # ##  ####    ## ###    ##    ####   "
echo.
call :colorEcho 0c "     ##    ##    ##  ##  ##  ##  ##   ##  ##      ##  ##    ##    ##  ##  ##      ##   ##  ##      ##  ##    ##    ##     "
echo.
call :colorEcho 0c "  ####     ##    ##  ##   ####   ##   ##  ######  ##  ##    ##    ##  ##  ######  ##   ##  ######  ##  ##    ##    ###### "
echo.
echo.                                                                             
call :colorEcho 0c "                      StrumentalMente - Generatore della Documentazione"
echo.
echo.
echo Questo file BAT permette di eseguire automaticamente diverse operazioni.
echo Scegliere quella da eseguire inserendo il numero dell'operazione da effettuare.
echo MENU:
echo      1. Generare tutti i documenti
echo      2. Rimuovere tutti i file generati da MiKTeX a esclusione del PDF
echo      3. Spostare tutti i documenti alla cartella "documentation"
echo      4. Tutte le operazioni precedenti
echo      5. Esci

:choiceInput
set /p choice="Inserire cosa si vuole fare: "
if /I "%choice%" EQU "1" goto generateDocs
if /I "%choice%" EQU "2" goto removeFiles
if /I "%choice%" EQU "3" goto moveFiles
if /I "%choice%" EQU "4" goto doEverything
if /I "%choice%" EQU "5" goto exit
call :colorEcho 0c "ERRORE "
echo : la scelta inserita non puo' essere accettata.
goto choiceInput

:doEverything
echo Eseguo tutte le operazioni elencate nel menu in ordine.
goto generateDocs

:generateDocs
echo Genero la documentazione.
cd src

cd Pianificazione
echo Genero la pianificazione...
pdflatex.exe -synctex=1 -interaction=batchmode --shell-escape Pianificazione.tex
bibtex.exe "Pianificazione"
pdflatex.exe -synctex=1 -interaction=batchmode --shell-escape Pianificazione.tex
pdflatex.exe -synctex=1 -interaction=batchmode --shell-escape Pianificazione.tex
cls

cd ../Progettazione
echo Genero la progettazione...
pdflatex.exe -synctex=1 -interaction=batchmode --shell-escape Progettazione.tex
bibtex.exe "Progettazione"
pdflatex.exe -synctex=1 -interaction=batchmode --shell-escape Progettazione.tex
pdflatex.exe -synctex=1 -interaction=batchmode --shell-escape Progettazione.tex
cls

cd ..
echo Genero la documentazione completa...
pdflatex.exe -synctex=1 -interaction=batchmode --shell-escape DocumentazioneCompleta.tex
bibtex.exe "DocumentazioneCompleta"
pdflatex.exe -synctex=1 -interaction=batchmode --shell-escape DocumentazioneCompleta.tex
pdflatex.exe -synctex=1 -interaction=batchmode --shell-escape DocumentazioneCompleta.tex
cls

cd ..
if /I "%choice%" EQU "1" goto end

:removeFiles
echo Rimuovo tutti i file inutili dalla sottocartella /src.
cd src
for /R %%G in (.) do (
	echo Cleaning: %%G
	pushd %%G
	del /Q *.aux *.glo *.idx *.log *.toc *.ist *.acn *.acr *.alg *.bbl *.blg *.dvi *.glg *.gls *.ilg *.ind *.lof *.lot *.maf *.mtc *.mtc1 *.out *.synctex.gz "*.synctex(busy)" *.thm
	popd
)
cd ..
if /I "%choice%" EQU "2" goto end

:moveFiles
echo Sposto tutte le documentazioni nella cartella corrente.
cd src
for /R %%G in (*.PDF) do (
	echo Sposto %%G
	rem substitute move with copy to copy files
	move %%G "../"
)
cd ..
if /I "%choice%" EQU "3" goto end
if /I "%choice%" EQU "4" goto end

:end
call :colorEcho 0a "Fatto"
echo.
pause
goto menu

:colorEcho
echo off
<nul set /p ".=%DEL%" > "%~2"
findstr /v /a:%1 /R "^$" "%~2" nul
del "%~2" > nul 2>&1i

:exit