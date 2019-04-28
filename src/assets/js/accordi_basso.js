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
	constructor(nome, dita, tasto_iniziale) {
		this.nome = nome;
		this.dita = dita;
		this.tasto_iniziale = tasto_iniziale;
	}
}

var accordi = [
	new accordo("Do", [true, false, false, false,
		false, false, false, false,
		false, false, false, false,
		false, false, false, false], 1),
	new accordo("Dom", [true, false, false, false,
		false, false, false, false,
		false, false, false, false,
		false, false, false, false], 3),
	new accordo("Do#", [true, false, false, false,
		false, false, false, false,
		false, false, false, false,
		false, false, false, false], 4),
	new accordo("Do#m", [true, false, false, false,
		false, false, false, false,
		false, false, false, false,
		false, false, false, false], 4),
	new accordo("Re", [true, false, false, false,
		false, false, false, false,
		false, false, false, false,
		false, false, false, false], 1),
	new accordo("Rem", [true, false, false, false,
		false, false, false, false,
		false, false, false, false,
		false, false, false, false], 1),
	new accordo("Re#", [true, false, false, false,
		false, false, false, false,
		false, false, false, false,
		false, false, false, false], 6),
	new accordo("Re#m", [true, false, false, false,
		false, false, false, false,
		false, false, false, false,
		false, false, false, false], 6),
	new accordo("Mi", [true, false, false, false,
		false, false, false, false,
		false, false, false, false,
		false, false, false, false], 1),
	new accordo("Mim", [true, false, false, false,
		false, false, false, false,
		false, false, false, false,
		false, false, false, false], 1),
	new accordo("Fa", [true, false, false, false,
		false, false, false, false,
		false, false, false, false,
		false, false, false, false], 1),
	new accordo("Fam", [true, false, false, false,
		false, false, false, false,
		false, false, false, false,
		false, false, false, false], 1),
	new accordo("Fa#", [true, false, false, false,
		false, false, false, false,
		false, false, false, false,
		false, false, false, false], 2),
	new accordo("Fa#m", [true, false, false, false,
		false, false, false, false,
		false, false, false, false,
		false, false, false, false], 2),
	new accordo("Sol", [true, false, false, false,
		false, false, false, false,
		false, false, false, false,
		false, false, false, false], 1),
	new accordo("Solm", [true, false, false, false,
		false, false, false, false,
		false, false, false, false,
		false, false, false, false], 3),
	new accordo("Sol#", [true, false, false, false,
		false, false, false, false,
		false, false, false, false,
		false, false, false, false], 4),
	new accordo("Sol#m", [true, false, false, false,
		false, false, false, false,
		false, false, false, false,
		false, false, false, false], 4),
	new accordo("La", [true, false, false, false,
		false, false, false, false,
		false, false, false, false,
		false, false, false, false], 1),
	new accordo("Lam", [true, false, false, false,
		false, false, false, false,
		false, false, false, false,
		false, false, false, false], 1),
	new accordo("La#", [true, false, false, false,
		false, false, false, false,
		false, false, false, false,
		false, false, false, false], 1),
	new accordo("La#m", [true, false, false, false,
		false, false, false, false,
		false, false, false, false,
		false, false, false, false,
		false, false, false, false], 1),
	new accordo("Si", [true, false, false, false,
		false, false, false, false,
		false, false, false, false,
		false, false, false, false], 2),
	new accordo("Sim", [true, false, false, false,
		false, false, false, false,
		false, false, false, false,
		false, false, false, false], 2),
];

/**
 * Seleziona un numero casuale compreso tra 1 e 7 e ne imposta l'accordo da richiedere all'utente.
 */
function script_load() {
	for (var i = 0; i < document.getElementsByName("chord").length; i++) {
		var k = Math.floor((Math.random() * (accordi.length - i)) + 1);
		document.getElementsByName("chord_name")[i].innerHTML = "Accordo di " + accordi[k - 1].nome; //NAME OF SELECTED CHORD
		for (var j = 0; j < 4; j++) //TABS OF SELECTED CHORD
		{
			document.getElementsByName("chord")[i].getElementsByClassName("num_tasto")[j].innerHTML = (j + accordi[k - 1].tasto_iniziale) + "° Tasto";
			document.getElementsByName("correct_chord")[i].getElementsByClassName("num_tasto")[j].innerHTML = (j + accordi[k - 1].tasto_iniziale) + "° Tasto";
		}
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
		for (var i = 0; i < 16; i++) {
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
			for (var i = 0; i < 16; i++) {
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