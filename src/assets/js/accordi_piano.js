var selezionato = new Array();
var corretto = new Array(5);
/**
 * Classe accordo.
 * @param {String} nome Stringa che indica il nome dell'accordo
 * @param {Boolean} dita Sequenza di valori logici che indicano se la checkbox corrispondente è
 * stata selezionata o meno
 * @param {number} tasto_iniziale Indica il numero del capotasto iniziale dell'accordo
 */
class accordo {
	constructor(nome, dita) {
		this.nome = nome;
		this.dita = dita;
	}
}

var accordi = [
	new accordo("Do", [true, false, true, false, true, false, false,
		false, false, false, false, false]),
	new accordo("Do#", [false, false, false, true, false, false, false,
		true, false, false, true, false]),
	new accordo("Dom", [true, false, false, false, true, false, false,
		false, true, false, false, false]),
	new accordo("Do#m", [false, false, true, false, false, false, false,
		true, false, false, true, false]),
	new accordo("Re", [false, true, false, false, false, true, false,
		false, false, true, false, false]),
	new accordo("Rem", [false, true, false, true, false, true, false,
		false, false, false, false, false]),
	new accordo("Re#", [false, false, false, false, true, false, false,
		false, true, false, false, true]),
	new accordo("Re#m", [false, false, false, false, false, false, false,
		false, true, true, false, true]),
	new accordo("Mi", [false, false, true, false, false, false, true,
		false, false, false, true, false]),
	new accordo("Mim", [false, false, true, false, true, false, true,
		false, false, false, false, false]),
	new accordo("Fa", [true, false, false, true, false, true, false,
		false, false, false, false, false]),
	new accordo("Fam", [true, false, false, true, false, false, false,
		false, false, false, true, false]),
	new accordo("Fa#", [false, false, false, false, false, false, false,
		true, false, true, false, true]),
	new accordo("Fa#m", [false, false, false, false, false, true, false,
		true, false, true, false, false]),
	new accordo("Sol", [false, true, false, false, true, false, true,
		false, false, false, false, false]),
	new accordo("Solm", [false, true, false, false, true, false, false,
		false, false, false, false, true]),
	new accordo("Sol#", [true, false, false, false, false, false, false,
		false, true, false, true, false]),
	new accordo("Sol#m", [false, false, false, false, false, false, true,
		false, true, false, true, false]),
	new accordo("La", [false, false, true, false, false, true, false,
		true, false, false, false, false]),
	new accordo("Lam", [true, false, true, false, false, true, false,
		false, false, false, false, false]),
	new accordo("La#", [false, true, false, true, false, false, false,
		false, false, false, false, true]),
	new accordo("La#m", [false, false, false, true, false, false, false,
		true, false, false, false, true]),
	new accordo("Si", [false, false, false, false, false, false, true,
		false, true, true, false, false]),
	new accordo("Sim", [false, true, false, false, false, false, true,
		false, false, true, false, false]),
];

/**
 * Seleziona un numero casuale compreso tra 1 e 7 e ne imposta l'accordo da richiedere all'utente.
 */
function script_load() {

	for (var i = 0; i < document.getElementsByName("chord").length; i++) {
		var k = Math.floor((Math.random() * (accordi.length - i)) + 1);
		document.getElementsByName("chord_name")[i].innerHTML = "Accordo di " + accordi[k - 1].nome; //NAME OF SELECTED CHORD
		selezionato.push(accordi[k - 1]);
		accordi.splice(k - 1, 1);
	}
	accordi.splice(0, accordi.length);
}

/**
 * Verifica che le selezioni effettuate dall'utente siano corrette in base all'accordo presentatogli e
 * memorizza: se la selezione è corretta (1) o non corretta (0), le checkbox selezionate (e non) e 
 * l'accordo che l'utente doveva riprodurre.
 */
function verify_and_store() {
	for (var j = 0; j < document.getElementsByName("chord").length; j++) {
		corretto[j] = true;
		var elements = document.getElementsByName("chord")[j];
		for (var i = 0; i < 12; i++) {
			if (selezionato[j].dita[i] != elements.getElementsByTagName("input")[i].checked)
				corretto[j] = false;

			elements.getElementsByTagName("input")[i].disabled = true;
		}

		if (corretto[j])
			sessionStorage.setItem("score", JSON.parse(sessionStorage.getItem("score")) + 1);
	}
}

/**
 * In base al numero di accordo che l'utente doveva riprodurre, ripristina la sequenza di selezioni
 * corretta nello schema.
 */
function correct_chord() {
	for (var j = 0; j < document.getElementsByName("chord").length; j++) {
		var elements = document.getElementsByName("correct_chord")[j];
		if (corretto[j] == false) {
			elements.style.display = "block";
			document.getElementsByName("errato")[j].innerHTML = "Inserito";
			for (var i = 0; i < 12; i++) {
				if (selezionato[j].dita[i] == true)
					elements.getElementsByTagName("input")[i].checked = true;
				else
					elements.getElementsByTagName("input")[i].checked = false;
				elements.getElementsByTagName("input")[i].disabled = true;
			}
		} else
			document.getElementsByName("errato")[j].innerHTML = "Corretto";
	}
}