import re
import os
import fileinput
from shutil import copyfile

copyfile("style.css", "../assets/css/style.css")


def get_substitution(line, base="./"):
    fileName = ""
    data = ""
    m = re.search(r'\@import url\(\"(.*?)\"\);', line)
    if m:
        fileName = m.group(1)
        with open(os.path.join(base, fileName), 'r') as myfile:
            data = myfile.read().split("\n")
            for i in range(len(data)):
                if "@import" in data[i]:
                    data[i] = get_substitution(data[i], "./main/")
    return "\n".join(data)


with fileinput.FileInput("../assets/css/style.css", inplace=True) as file:
    for line in file:
        if "@import" in line:
            s = get_substitution(line)
            print(line.replace(line, s), end='\n')
        else:
            print(line, end="")