import re
import os
import glob
import fileinput
from shutil import copyfile
from jsmin import jsmin


def removeComments(content):
    pattern = re.compile(r"(\/\*(?:.|\n)*?\*\/)")
    for comment in re.findall(pattern, content):
        content = content.replace(comment, "")
    return content


def get_substitution(line, base="src/assets/css"):
    fileName = ""
    data = ""
    m = re.search(r"\@import url\([\"'](.*?)[\"']\);", line)
    if m:
        fileName = m.group(1)
        with open(os.path.join(base, fileName), 'r') as myfile:
            data = myfile.read().split("\n")
            for i in range(len(data)):
                data[i] = data[i].strip()
                if "@import" in data[i]:
                    data[i] = get_substitution(data[i], "src/assets/css/main")
                    data[i] = removeComments(data[i])
                if "../../" in data[i]:
                    data[i] = data[i].replace("../../", "../")
    return "".join(data)


def one_line(filename):
    with fileinput.FileInput(filename, inplace=True) as file:
        for line in file:
            line = line.strip()
            print(line, end="")


if __name__ == "__main__":
    copyfile("src/assets/css/style.css",
             "src/assets/css/style_not-minified.css")

    with open("src/assets/css/style.css", "r") as f:
        content = f.read()

    content = removeComments(content)
    with open("src/assets/css/style.css", 'w') as f:
        f.write(content)

    with fileinput.FileInput("src/assets/css/style.css", inplace=True) as file:
        for line in file:
            if "@import" in line:
                s = get_substitution(line)
                s = removeComments(s)
                print(line.replace(line, s), end="")
            else:
                print(line.strip(), end="")

    for filename in glob.glob("src/*.html"):
        one_line(filename)
    for filename in glob.glob("src/helpers/*.html"):
        one_line(filename)
    for filename in glob.glob("src/dialogs/*.html"):
        one_line(filename)
    for filename in glob.glob("src/teoria/base/*.html"):
        one_line(filename)
    for filename in glob.glob("src/teoria/avanzata/*.html"):
        one_line(filename)

    for currentFile in ["src/app.js",
                        "src/assets/js/main.js",
                        "src/assets/js/render.js",
                        "src/assets/js/quiz.js",
                        "src/assets/js/accordi_basso.js",
                        "src/assets/js/accordi_chitarra.js"]:
        copyfile(currentFile, currentFile[:-3] +
                 "_not-minified" + currentFile[-3:])
        with open(currentFile, "r") as js_file:
            minified = jsmin(js_file.read())
        with open(currentFile, "w") as js_file:
            js_file.write(minified)
