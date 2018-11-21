@echo off
title Move Documentations
echo I will move all PDF files to this directory. 
pause
cd src
for /R %%G in (*.PDF) do (
	echo Moving %%G
	REM substitute move with copy to copy files
	move %%G "../"
)
echo Done.
cd ..
pause