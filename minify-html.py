import re
import glob
import fileinput
from shutil import copyfile


def one_line(filename):
    with fileinput.FileInput(filename, inplace=True) as file:
        for line in file:
            line = line.strip()
            print(line, end="")


if __name__ == "__main__":
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
