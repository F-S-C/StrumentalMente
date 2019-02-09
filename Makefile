.PHONY: docs css

all: | start
install:
	cd src && \
	npm install --save-dev electron && \
	npm install --save electron-localshortcut && \
	npm install -g --save-dev electron-packager
start:
	cd src && \
	npm start
deploy:
	electron-packager src StrumentalMente --platform=win32 --overwrite --icon=src/assets/icon.ico
	electron-packager src StrumentalMente --platform=linux --overwrite
docs:
	python generate-documentation.py --src docs/src --dest docs
css:
	$(MAKE) -C src/_css