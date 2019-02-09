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


init()

parser = argparse.ArgumentParser(
    description="Genera la documentazione per il progetto 'StrumentalMente'.")
parser.add_argument(
    "-s", "--src", help="La directory in cui sono presenti i sorgenti della documentazione.")
parser.add_argument(
    "-d", "--dest", help="La directory in cui saranno memorizzati i file PDF generati. (default: './')", default="./")

args = parser.parse_args()

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

for file in ["Pianificazione", "Progettazione", "Realizzazione"]:
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