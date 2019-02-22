.PHONY: docs css

all: | start
install:
	cd src && \
	npm install --save-dev electron && \
	npm install --save-dev mousetrap && \
	npm install -g electron-packager && \
	npm install --save-dev node-localstorage
start:
	cd src && \
	npm start
deploy:
	python minify-css.py
	electron-packager src StrumentalMente --platform=win32 --no-prune --overwrite --icon=src\assets\icon.ico --ignore="assets\css\main|assets\css\style_not-minified.css|_include"
	# electron-packager src StrumentalMente --platform=linux --no-prune --overwrite --ignore="assets\css\main|assets\css\style_not-minified.css|_include"
	cd src\assets\css && copy /Y style_not-minified.css style.css && del style_not-minified.css
docs: jsdoc
	python generate-documentation.py --src docs\src --dest docs

jsdoc:
	if not exist ".\docs\src\Realizzazione\code" mkdir .\docs\src\Realizzazione\code
	jsdoc2md .\src\app.js .\src\assets\js\main.js .\src\assets\js\render.js >> .\docs\src\Realizzazione\code\JsDocumentation.md
	cd .\docs\src\Realizzazione\code && pandoc JsDocumentation.md -f markdown -t latex -o JsDocumentation.tex