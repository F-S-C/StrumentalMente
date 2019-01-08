<h1>StrumentalMente</h1>

<h2>Indice</h2>

- [Prefazione](#prefazione)
- [Informazioni preliminari](#informazioni-preliminari)
  - [Autori](#autori)
  - [L'esame](#lesame)
- [Informazioni sul sistema](#informazioni-sul-sistema)
  - [La repository](#la-repository)
    - [La struttura della repository](#la-struttura-della-repository)

## Prefazione

_StrumentalMente_ è un sistema multimediale di e-learning progettato seguendo il modello di Alessi & Trollip.

## Informazioni preliminari

### Autori

_StrumentalMente_ è stato creato come progetto d'esame dal gruppo [**_F.S.C. -- Five Students of Computer Science_**](https://github.com/F-S-C), che è composto da:

- [Alessandro **Annese**](https://github.com/Ax3lFernus)
- [Davide **De Salvo**](https://github.com/Davidedes)
- [Andrea **Esposito**](https://github.com/espositoandrea)
- [Graziano **Montanaro**](https://github.com/prewarning)
- [Regina **Zaccaria**](https://github.com/ReginaZaccaria)

Il referente del gruppo è Andrea **Esposito**.

### L'esame

L'esame per cui questo progetto è stato creato è quello di **_Progettazione e Produzione Multimediale_** (_P.P.M._) del secondo anno del Corso di Laurea in _Informatica e Comunicazione Digitale_ dell'Università degli Studi di Bari "Aldo Moro".

## Informazioni sul sistema

Il sistema multimediale è stato realizzato seguendo il modello di **Alessi & Trollip** partendo dalla fase di progettazione fino alla vera e propria realizzazione, che è avvenuta utilizzando **HTML5**, **CSS3** e **JavaScript**.

### La repository

All'interno della _repository_ sono presenti:

- I sorgenti del sistema
- La documentazione
- I sorgenti della documentazione

Ci si riferisca alla sottosezione ['la struttura della repository'](#la-struttura-della-repository) per maggiori informazioni sull'organizzaione della repository e dei file in essa presenti.

Una versione utilizzabile del sistema è disponibile online grazie a GitHub Pages. L'indirizzo in cui è disponibile è [F-S-C.github.io/StrumentalMente/source](https://F-S-C.github.io/StrumentalMente/source/).

I sorgenti della documentazione sono in formato [LaTeX](https://www.latex-project.org/) (estensione `.tex`). Non sono presenti all'interno della repository i file intermedi che sono automaticamente generati durante la compilazione da [MiKTeX](https://miktex.org/), il compilatore LaTeX utilizzato per generare i file PDF presenti all'interno della directory `documentation`.

#### La struttura della repository

La repository è strutturata nel seguente modo.

```
StrumentalMente
├── documentation (contiene tutta la documentazione dell'applicazione)
│   └── src (contiene i sorgenti della documentazione)
└── source
    └── assets
        ├── css (contiene i file CSS dell'applicazione)
        ├── media (contiene tutti i media dell'applicazione)
        │   ├── audios (contiene tutti gli audio dell'applicazione)
        │   ├── images (contiene tutte le immagini dell'applicazione)
        │   └── videos (contiene tutti i video dell'applicazione)
        └── js (contiene tutti i file JavaScript dell'applicazione)
```
