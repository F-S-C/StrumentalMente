.PHONY: docs css

all: | start
install:
	cd src && \
	npm install --save-dev electron && \
	npm install --save-dev mousetrap && \
	npm install -g --save-dev electron-packager && \
	npm install --save-dev node-localstorage
start:
	cd src && \
	npm start
deploy:
	python minify-css.py
	electron-packager src StrumentalMente --platform=win32 --overwrite --icon=src/assets/icon.ico --ignore="assets/css/main|assets/css/style_not-minified.css|_include"
	electron-packager src StrumentalMente --platform=linux --overwrite --ignore="assets/css/main|assets/css/style_not-minified.css|_include"
	cd src/assets/css && copy /Y style_not-minified.css style.css && del style_not-minified.css
docs:
	python generate-documentation.py --src docs/src --dest docs