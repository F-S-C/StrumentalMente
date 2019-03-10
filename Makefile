.PHONY: docs css

all: | start

install:
	cd src && \
	npm install -g yarn
	cd src && yarn install --force

start:
	cd src && \
	npm start

deploy:
	python minify.py
	cd src && yarn dist
	cd src\assets\css && copy /Y style_not-minified.css style.css && del style_not-minified.css
	cd src\assets\js && copy /Y render_not-minified.js render.js && del render_not-minified.js
	cd src\assets\js && copy /Y main_not-minified.js main.js && del main_not-minified.js
	cd src && copy /Y app_not-minified.js app.js && del app_not-minified.js
	git checkout -- "*.html"

docs: jsdoc
	python generate-documentation.py --src docs\src --dest docs

jsdoc:
	if not exist ".\docs\src\Realizzazione\code" mkdir .\docs\src\Realizzazione\code
	jsdoc2md .\src\app.js .\src\assets\js\main.js .\src\assets\js\render.js .\src\assets\js\quiz.js .\src\assets\js\accordo.js -d 1 > .\docs\src\Realizzazione\code\JsDocumentation.md
	cd .\docs\src\Realizzazione\code && pandoc JsDocumentation.md -f markdown -t html -o JsDocumentation.html
	cd .\docs\src\Realizzazione\code && pandoc JsDocumentation.html -f html -t latex -o JsDocumentation.tex
	cd .\docs\src\Realizzazione\code && del JsDocumentation.html
	python generate-documentation.py --src docs\src --dest docs --jsdoc

bib2html:
	python generate-documentation.py --src docs\src --dest docs --bib

docx-to-html:
	cd docs\Contenuti && python docx-to-html.py