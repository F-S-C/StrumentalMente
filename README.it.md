# <img src="./logo/512x512.png" alt="Logo di StrumentalMente" width="50px"> StrumentalMente<!-- omit in toc -->

[![Licenza](https://img.shields.io/github/license/F-S-C/StrumentalMente.svg?style=for-the-badge)](https://github.com/F-S-C/StrumentalMente/blob/master/LICENSE)
[![Non ancora rilasciato](https://img.shields.io/badge/release-non%20ancora%20rilasciato-orange.svg?style=for-the-badge)](https://github.com/F-S-C/StrumentalMente/releases)
<!--[![Ultima release](https://img.shields.io/github/release/F-S-C/StrumentalMente.svg?style=for-the-badge)](https://github.com/F-S-C/StrumentalMente/releases)-->

_Leggi questo file in altre lingue: [English](https://github.com/F-S-C/StrumentalMente/blob/master/README.md)_

_StrumentalMente_ è un sistema multimediale di e-learning progettato seguendo il modello di Alessi & Trollip.

**:warning: ATTENZIONE:** Questo progetto è stato creato in vista di un esame universitario, per questo motivo è documentato solo in *italiano*.

## Indice<!-- omit in toc -->

- [Prefazione](#prefazione)
  - [Gli autori](#gli-autori)
  - [L'esame](#lesame)
- [Informazioni sul sistema](#informazioni-sul-sistema)
  - [La repository](#la-repository)
    - [La struttura della repository](#la-struttura-della-repository)
- [Copyright e licenze](#copyright-e-licenze)
  - [I tools e le librerie utilizate](#i-tools-e-le-librerie-utilizate)

## Prefazione

Il progetto rappresenta un'applicazione del modello di Alessi & Trollip (come già anticipato).

L'obiettivo del sistema è quello di aiutare gli utenti nel conoscere la dolce arte della musica. Quindi, l'applicazione contiene delle funzionalità utili a conoscere le basi della teoria musicale, nonché le basi delle tecniche di utilizzo di diversi strumenti musicali. Nel raggiungere tali obiettivi, il sistema fornisce agli utenti la possibilità di autovalutare i propri livelli di preparazione senza intaccare la propria esperienza d'uso.

### Gli autori

_StrumentalMente_ è stato creato come progetto d'esame dal gruppo [**_F.S.C. &mdash; Five Students of Computer Science_**](https://github.com/F-S-C), che è composto da:

- [Alessandro **Annese**](https://github.com/Ax3lFernus)
- [Davide **De Salvo**](https://github.com/Davidedes)
- [Andrea **Esposito**](https://github.com/espositoandrea)
- [Graziano **Montanaro**](https://github.com/prewarning)
- [Regina **Zaccaria**](https://github.com/ReginaZaccaria)

Il referente del gruppo per questo progetto è Andrea **Esposito**.

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

I sorgenti della documentazione sono in formato [LaTeX](https://www.latex-project.org/) (estensione `.tex`). Non sono presenti all'interno della repository i file intermedi che sono automaticamente generati durante la compilazione da [MiKTeX](https://miktex.org/), il compilatore TeX utilizzato per generare i file PDF presenti all'interno della directory `docs`.

#### La struttura della repository

La repository è strutturata nel seguente modo.

```plaintext
StrumentalMente
├── docs (contiene tutta la documentazione dell'applicazione)
│   └── src (contiene i sorgenti della documentazione)
└── src
    └── assets
        ├── audios (contiene tutti gli audio dell'applicazione)
        ├── css (contiene i file CSS dell'applicazione)
        ├── images (contiene tutte le immagini dell'applicazione)
        ├── js (contiene tutti i file JavaScript dell'applicazione)
        └── videos (contiene tutti i video dell'applicazione)
```

## Copyright e licenze

Il progetto è rilasciato sotto la [**licenza Apache 2.0**](https://github.com/F-S-C/StrumentalMente/blob/master/LICENSE) (si veda il file [`LICENSE`](https://github.com/F-S-C/StrumentalMente/blob/master/LICENSE) per maggiori informazioni). Qualsiasi utilizzo del codice sorgente richiede, quindi, una nota di copyright in cui si specifica la provenienza del codice e i loro autori. È preferibile utilizzare, per indicare gli autori, la seguente notazione: `F.S.C. (Alessandro Annese, Davide De Salvo, Andrea Esposito, Graziano Montanaro, Regina Zaccaria)` o una notazione simile (in cui viene presentato il nome del gruppo _e_ i nomi dei suoi componenti).

### I tools e le librerie utilizate

L'applicazione è realizzata tramite [Node.js](https://nodejs.org/) (utilizzando [yarn](https://yarnpkg.com/) come _package manager_) e i seguenti moduli:

- [Electron](https://electronjs.org/) ([Licenza](https://github.com/electron/electron/blob/master/LICENSE))
- [Mousetrap](https://www.npmjs.com/package/mousetrap) ([Licenza](https://github.com/ccampbell/mousetrap/blob/master/LICENSE))
- [electron-builder](https://www.electron.build/) ([Licenza](https://github.com/electron-userland/electron-builder/blob/master/LICENSE))
- [node-localstorage](https://www.npmjs.com/package/node-localstorage) ([Licenza](https://github.com/lmaccherone/node-localstorage#mit-license))
- [jQuery](https://jquery.com/) ([Licenza](https://github.com/jquery/jquery/blob/master/LICENSE.txt))
- [Maphilight](https://github.com/kemayo/maphilight) ([Licenza](https://github.com/kemayo/maphilight/blob/master/MIT-LICENSE.txt)) &mdash; Modificato da [Andrea Esposito](https://github.com/espositoandrea)

Maggiori informazioni sulle licenze dei moduli possono essere trovate visitando i rispettivi link.