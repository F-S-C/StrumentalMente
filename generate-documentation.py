import os
import subprocess
import argparse
import re
import shutil
from colorama import Fore, Style, init
from pyfiglet import figlet_format


def removeUselessFile(dir):
    dirList = os.listdir(dir)
    for item in dirList:
        if re.match(r"(.*?)\.(bcf|run\.xml|aux|glo|idx|log|toc|ist|acn|acr|alg|bbl|blg|dvi|glg|gls|ilg|ind|lof|lot|maf|mtc|mtc1|out|synctex.gz|synctex\(busy\)|thm)", item, re.IGNORECASE):
            os.remove(os.path.join(dir, item))
            print("eliminato " + item)


def fix_generated_jsdoc():
    filename = "./docs/src/Realizzazione/code/JsDocumentation.tex"
    file_content = ""
    with open(filename, "r") as file:
        content = file.readlines()
        file_content = "".join(content)

    file_content = re.sub(r"\\subsection\{((?:.|\n)*?)\}", r"\\subsubsection{\1}", file_content)
    file_content = re.sub(r"\\section\{((?:.|\n)*?)\}", r"\\subsection{\1}", file_content)
    file_content = re.sub(r"\\subsection\{Functions\}", r"\\section{Funzioni}", file_content)
    file_content = re.sub(r"\\begin{longtable}\[\]\{@\{\}(.*)@\{\}\}((?:.|\n)*?)\\end\{longtable\}",
                          r"\\begin{tabularx}{\\textwidth}{\1}\2\\end{tabularx}", file_content)
    file_content = re.sub(r"\\begin{tabularx}{\\textwidth}{lll}",
                          r"\\begin{tabularx}{\\textwidth}{XXX}", file_content)
    file_content = re.sub(r"\\begin{tabularx}{\\textwidth}{llll}",
                          r"\\begin{tabularx}{\\textwidth}{XXXX}", file_content)

    with open(filename, "w") as file:
        file.write(file_content)


def generate_html_bibliography():
    about_page_file = "./src/about.html"
    about_content = ""
    bib_content = ""

    subprocess.run(["bibtex2html", "--nodoc", "--nobibsource",
                    "--html-entities", "--dl", "docs/src/Progettazione/biblist.bib"])

    with open(about_page_file, "r") as file:
        content = file.readlines()
        about_content = "".join(content)
    with open("./biblist.html", "r") as file:
        content = file.readlines()
        bib_content = "".join(content)

    bib_content = re.sub(r'''<dl>((?:.|\n)*?)<\/dl>''',
                         r'''<ol class="bibliography">\1</ol>\n''', bib_content)
    bib_content = re.sub(r'''<dt>\n\[<a name="((?:.|\n)*?)">.*?<\/a>\]\n<\/dt>\n<dd>\n((?:.|\n)*?)\n<\/dd>''',
                         r'''<li id="\1">\2</li>''', bib_content)
    bib_content = re.sub(r'''(?:.|\n)*?(<ol.*?>(?:.|\n)*?<\/ol>)(?:.|\n)*''',
                         r'''\1''', bib_content)

    about_content = re.sub(r"(<!\-\-.*?#region Bibliografia.*?-->)(?:.|\n)*?(.*?<!\-\-.*?#endregion.*?\-\->)",
                           r"\1\n" + bib_content + r"\2\n", about_content)

    with open(about_page_file, "w") as file:
        file.write(about_content)

    os.remove("./biblist.html")


init()

parser = argparse.ArgumentParser(
    description="Genera la documentazione per il progetto 'StrumentalMente'.")
parser.add_argument(
    "-s", "--src", help="La directory in cui sono presenti i sorgenti della documentazione.")
parser.add_argument(
    "-d", "--dest", help="La directory in cui saranno memorizzati i file PDF generati. (default: './')", default="./")

parser.add_argument("-j", "--jsdoc", help="Genera solo i file JSDoc.",
                    action="store_true", dest="only_jsdoc")

parser.add_argument("-b", "--bib", help="Aggiorna solo la bibliografia nella pagina 'about'.",
                                        action="store_true", dest="only_bib")

args = parser.parse_args()

if args.only_jsdoc:
    fix_generated_jsdoc()
    exit()

if args.only_bib:
    generate_html_bibliography()
    exit()

print(Fore.RED + figlet_format('StrumentalMente:',
                               font='big', width=100) + Style.RESET_ALL)
print(Fore.RED + figlet_format('  documentazione',
                               font='big', width=100) + Style.RESET_ALL)

if args.src is None:
    args.src = input(
        "Inserire il percorso della cartella dei sorgenti della documentazione: ")
    while not os.path.exists(args.src):
        print(Fore.RED + "ERRORE: la cartella selezionata non esiste." + Style.RESET_ALL)
        args.src = input(
            "Inserire il percorso della cartella dei sorgenti della documentazione: ")
    args.dest = input(
        "Inserire il percorso della cartella in cui salvare la documentazione: ")

if not os.path.exists(args.dest):
    os.makedirs(args.dest)


for file in ["Pianificazione", "Progettazione", "Realizzazione", "ManualeUtente"]:
    subprocess.run(["pdflatex", "-synctex=1", "-interaction=batchmode",
                    "--shell-escape", file + ".tex"], cwd=os.path.join(args.src, file))
    subprocess.run(["biber", file], cwd=os.path.join(args.src, file))
    subprocess.run(["pdflatex", "-synctex=1", "-interaction=batchmode",
                    "--shell-escape", file + ".tex"], cwd=os.path.join(args.src, file))
    subprocess.run(["pdflatex", "-synctex=1", "-interaction=batchmode",
                    "--shell-escape", file + ".tex"], cwd=os.path.join(args.src, file))

    print(Fore.GREEN + "Generata la " + file + Style.RESET_ALL)
    removeUselessFile(os.path.join(args.src, file))
    print(Fore.GREEN + "Pulita la " + file + Style.RESET_ALL)
    shutil.move(os.path.join(args.src, file, file + ".pdf"),
                os.path.join(args.dest, file + ".pdf"))
    print(Fore.GREEN + "Spostata la " + file + Style.RESET_ALL)

subprocess.run(["pdflatex", "-synctex=1", "-interaction=batchmode",
                "--shell-escape", "DocumentazioneCompleta.tex"], cwd=args.src)
subprocess.run(["biber", "DocumentazioneCompleta"], cwd=args.src)
subprocess.run(["pdflatex", "-synctex=1", "-interaction=batchmode",
                "--shell-escape", "DocumentazioneCompleta.tex"], cwd=args.src)
subprocess.run(["pdflatex", "-synctex=1", "-interaction=batchmode",
                "--shell-escape", "DocumentazioneCompleta.tex"], cwd=args.src)

print(Fore.GREEN + "Generata la documentazione completa" + Style.RESET_ALL)
removeUselessFile(args.src)
print(Fore.GREEN + "Pulita la documentazione completa" + Style.RESET_ALL)

shutil.move(os.path.join(args.src, "DocumentazioneCompleta.pdf"),
            os.path.join(args.dest, "DocumentazioneCompleta.pdf"))
print(Fore.GREEN + "Spostata la documentazione completa" + Style.RESET_ALL)

print("Fine\a")
