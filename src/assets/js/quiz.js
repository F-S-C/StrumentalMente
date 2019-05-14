var quiz_id = "NULL";
var compare = false;

/**
 * La funzione genera una permutazione casuale dei numeri naturali
 * nell'intervallo [0,3]. Ogni numero è utilizato per indicizzare il vettore
 * delle risposte (di ogni domanda), quindi la permutazione corrisponde alla
 * permutazione delle risposte a ogni domanda.
 */
function generateRandomQuestions() {
	var temp, trovato, v = [0, 0, 0, 0];
	for (var k = 0; k < document.getElementsByTagName("section").length; k++) {
		var elements = document.getElementsByTagName("section")[k];
		var input = elements.getElementsByTagName("input");
		var label = elements.getElementsByTagName("label");
		v = [0, 0, 0, 0];
		for (var i = 0; i < 4;) {
			temp = Math.floor((Math.random() * 4) + 1);
			trovato = false;
			for (var j = 0; j < 4; j++) {
				if (v[j] == temp)
					trovato = true;
			}
			if (!trovato) {
				v[i] = temp;
				i++;
			}

		}
		if (elements.getElementsByClassName("box").length < 1) {
			input[v[0] - 1].style.gridArea = "a";
			input[v[1] - 1].style.gridArea = "b";
			input[v[2] - 1].style.gridArea = "c";
			input[v[3] - 1].style.gridArea = "d";
			label[v[0] - 1].style.gridArea = "a";
			label[v[1] - 1].style.gridArea = "b";
			label[v[2] - 1].style.gridArea = "c";
			label[v[3] - 1].style.gridArea = "d";
		}
	}
}

/**
* Funzione di caricamento dei quiz che inizializza il punteggio dell'utente, il punteggio massimo del
* quiz e richiama la funzione inizializeQuiz. 
* In caso di quiz che riguardano gli accordi, richiama la funzione di caricamento degli stessi.
* @param {String} id Indica quale quiz si sta svolgendo per permettere al programma di 
* memorizzarne l' esito.
*/
function quizLoad(id) {
	quiz_id = id;
	generateRandomQuestions();
	sessionStorage.setItem('score', 0);
	sessionStorage.setItem('score_max', document.getElementsByTagName("section").length);
	if (document.getElementsByName("chord")[0] != undefined)
		script_load();
	initializeQuiz();
}

/**
* Richiama la funzione di Check delle risposte inoltre, se si tratta di un quiz che riguarda gli
* accordi, richiama anche la funzione verify_and_store(). Infine visualizza la finestra di dialogo 
* che mostra il punteggio ottenuto dall'utente su quello massimo del quiz e richiede se uscire dal
* quiz o verificare le risposte date.
* @param {String} return_link Indica in quale pagina si deve ritornare al completamento dei quiz.
*/
function quizVerify(return_link) {
	answersCheck();
	if (document.getElementsByName("chord")[0] != undefined)
		verify_and_store();
	showQuizDialog(quiz_id, sessionStorage.getItem('score'), sessionStorage.getItem('score_max'), return_link);
}

/**
 * Mostra gli eventuali errori commessi dall'utente mostrando le risposte corrette e le eventuali risposte sbagliate.
 * Nel caso di un quiz sugli accordi, mostra l'accordo corretto al fianco di quello errato.
 */
function quizCompare() {
	document.getElementsByTagName("section")[document.getElementsByTagName("section").length - 1].className = "hide";
	document.getElementsByTagName("section")[0].className = "";
	document.getElementById("next").style.display = "inline-block";
	document.getElementsByClassName("question-link")[document.getElementsByClassName("question-link").length - 1].className = "question-link";
	document.getElementsByClassName("question-link")[0].className = "question-link active";
	compare = true;
	initializeQuiz();
	for (var i = 0; i < document.getElementsByTagName("form").length; i++) {
		var selected = document.getElementsByTagName("form")[i];
		for (var j = 0; j < document.getElementsByTagName("form")[i].getElementsByTagName("input").length; j++) {
			var verify = selected.getElementsByTagName("input")[j];
			var label = selected.getElementsByTagName("label")[j];
			if (verify.checked == true && verify.value == "1") {
				verify.className = "correct";
			} else if (verify.checked == true && verify.value == "0") {
				verify.className = "wrong"
			} else if (verify.checked == false && verify.value == "1")
				verify.className = "correct_not_selected"
			else if (verify.checked == false && verify.value == "0") {
				verify.className = "disabled";
			}
			verify.disabled = "true";
		}
	}
	if (document.getElementsByName("chord")[0] != undefined) {
		correct_chord();
	}
}

/*
* Verifica le risposte selezionate dall'utente con quelle corrette. In caso di risposta corretta
* aumenta di 1 il punteggio ottenuto dall'utente.
*/
function answersCheck() {
	var points = 0;
	for (var i = 0; i < document.getElementsByTagName("form").length; i++) {
		var selected = document.getElementsByTagName("form")[i];
		for (var j = 0; j < document.getElementsByTagName("form")[i].getElementsByTagName("input").length; j++) {
			var verify = selected.getElementsByTagName("input")[j];
			if (verify.checked == true && verify.value == "1") {
				points++;
			}
		}
	}
	sessionStorage.setItem("score", points);
}