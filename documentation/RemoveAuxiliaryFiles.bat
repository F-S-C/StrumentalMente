@echo off
title Remove Auxiliary Files
echo I will remove all auxiliary file in all subfolders of /src. 
pause
cd src
for /R %%G in (.) do (
	echo Cleaning: %%G
	pushd %%G
	rm -f *.aux *.glo *.idx *.log *.toc *.ist *.acn *.acr *.alg *.bbl *.blg *.dvi *.glg *.gls *.ilg *.ind *.lof *.lot *.maf *.mtc *.mtc1 *.out *.synctex.gz
	popd
)

echo Done.
cd ..
pause