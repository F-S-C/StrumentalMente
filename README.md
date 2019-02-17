# StrumentalMente<!-- omit in toc -->

[![License](https://img.shields.io/github/license/F-S-C/StrumentalMente.svg?style=for-the-badge)](https://github.com/F-S-C/StrumentalMente/blob/master/LICENSE)
[![Not yet released](https://img.shields.io/badge/release-not%20yet%20released-orange.svg?style=for-the-badge)](https://github.com/F-S-C/StrumentalMente/releases)
<!--[![Latest release](https://img.shields.io/github/release/F-S-C/StrumentalMente.svg?style=for-the-badge)](https://github.com/F-S-C/StrumentalMente/releases)-->

_Read this in other languages: [Italiano](https://github.com/F-S-C/StrumentalMente/blob/master/README.it.md)_

_StrumentalMente_ is an e-learning multimedia system planned and designed following the Alessi & Trollip model.

**:warning: WARNING:** This project was created as part of a university exam, so (except for this file) it's documented only in *Italian*.

## Table of Contents<!-- omit in toc -->

- [Preface](#preface)
  - [The Authors](#the-authors)
  - [The Exam](#the-exam)
- [Information About the System](#information-about-the-system)
  - [The Repository](#the-repository)
    - [The Structure of this Repository](#the-structure-of-this-repository)
- [Copyright and Licenses](#copyright-and-licenses)
  - [Used Tools Libraries](#used-tools-libraries)

## Preface

This project represent an application of the Alessi & Trollip model (as already stated).

The goal of the system is to help the user knowing the sweet art of music. Therefore, the application contains some functions that can be used to learn the basics of the theory behind music, alongside with the basic use techniques of various musical instruments. While reaching its goals, the system gives the user the means to self-evaluate his knowledge, without ruining their use experience.

### The Authors

_StrumentalMente_ was created as an exam's project by the group [**_F.S.C. &mdash; Five Students of Computer Science_**](https://github.com/F-S-C), made of:

- [Alessandro **Annese**](https://github.com/Ax3lFernus)
- [Davide **De Salvo**](https://github.com/Davidedes)
- [Andrea **Esposito**](https://github.com/espositoandrea)
- [Graziano **Montanaro**](https://github.com/prewarning)
- [Regina **Zaccaria**](https://github.com/ReginaZaccaria)

The referent of the group for this project is Andrea **Esposito**.

### The Exam

The exam for which this project was created is one of **Multimedia Design and Production** (in Italian: *"Progettazione e Produzione Multimediale", P.P.M.*) of the second year of the Degree Course in _Computer Science and Digital Communication_ of the University of Bari "Aldo Moro".

## Information About the System

This multimedia system was created following the Alessi & Trollip Model starting from the planning phase to the proper realization, for which were used **HTML5**, **CSS3** and **JavaScript**.

### The Repository

In this repository there are:

- The system source code
- The documentation
- The documentation source code

Visit the subsection ['the structure of this repository'](#the-structure-of-this-repository) to get more information on the organization of this repository and on the files that are in it.

The documentation source files are in [LaTeX](https://www.latex-project.org/) format (`.tex` extension). The files automatically generated by [MiKTeX](https://miktex.org/), the TeX compiler used to generate the PDF files in the `docs` directory, during the compilation are not included in this repository.

#### The Structure of this Repository

This is the structure of the repository.

```plaintext
StrumentalMente
├── docs (the documentation of the system)
│   └── src (the documentation source code)
└── src
    └── assets
        ├── audios (all audios used in the application)
        ├── css (all the CSS used in the application)
        ├── images (all images used in the application)
        ├── js (all javascript files used in the application)
        └── videos (all videos used in the application)
```

## Copyright and Licenses

This project is released under the [**Apache 2.0 License**](https://github.com/F-S-C/StrumentalMente/blob/master/LICENSE) (see the [`LICENSE`](https://github.com/F-S-C/StrumentalMente/blob/master/LICENSE) file for more information). So, any use of the source code requires a copyright notice containing the source of the code and its original authors. To show the original authors of the code a notation like `F.S.C. (Alessandro Annese, Davide De Salvo, Andrea Esposito, Graziano Montanaro, Regina Zaccaria)` is preferred (it can be used another notation where are shown _both_ the group name _and_ its components).

### Used Tools Libraries

No external tool or library was used.