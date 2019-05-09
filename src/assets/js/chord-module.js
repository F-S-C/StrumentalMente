"use strict";

/**
 * Classe accordo.
 * @param {String} nome Stringa che indica il nome dell'accordo
 * @param {Boolean} dita Sequenza di valori logici che indicano se la checkbox corrispondente è
 * stata selezionata o meno
 * @param {number} tasto_iniziale Indica il numero del capotasto iniziale dell'accordo
 */
class Chord {
	constructor(nome, dita) {
		this.nome = nome;
		this.dita = dita;
	}
}

window.Chord = Chord
module.exports = Chord;