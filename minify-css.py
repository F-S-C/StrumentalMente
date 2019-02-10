import re
import os
import fileinput
from shutil import copyfile

def removeComments(content):
    pattern = re.compile(r"(\/\*(?:.|\n)*?\*\/)")
    for comment in re.findall(pattern, content):
        content = content.replace(comment, "")
    return content

def get_substitution(line, base="src/assets/css"):
    fileName = ""
    data = ""
    m = re.search(r"\@import url\(\"(.*?)\"\);", line)
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

if __name__ == "__main__":
    copyfile("src/assets/css/style.css", "src/assets/css/style_not-minified.css")

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