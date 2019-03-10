import os
from glob import glob
import subprocess

if __name__ == "__main__":
    result = [y for x in os.walk(".\\")
              for y in glob(os.path.join(x[0], '*.docx'))]

    for file in result:
        print(file)
        currentDir = os.path.split(file)[0]
        subprocess.Popen(["pandoc", os.path.split(file)[1],
                          "-o", os.path.split(file)[1].replace("docx", "html")],
                         cwd=currentDir)

    print("Done\a")
