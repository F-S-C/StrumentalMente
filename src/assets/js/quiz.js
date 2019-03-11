var quiz_id = "NULL";
var compare = false;

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
			for (var g = 0; g < 4; g++)
				input[g].checked = false;
		}
	}
}

function quizLoad(id) {
	quiz_id = id;
	generateRandomQuestions();
	sessionStorage.setItem('score', 0);
	sessionStorage.setItem('score_max', document.getElementsByTagName("section").length);
	if (document.getElementById("chord") != undefined)
		script_load();
	initializeQuiz();
}

function quizVerify() {
	answersCheck();
	if (document.getElementById("chord") != undefined)
		verify_and_store();
	showQuizDialog(quiz_id, sessionStorage.getItem('score'), sessionStorage.getItem('score_max'));
}

function quizCompare() {
	document.getElementsByTagName("section")[document.getElementsByTagName("section").length - 1].className = "hide";
	document.getElementsByTagName("section")[0].className = "show";
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
	if (document.getElementById("chord") != undefined) {
		replace_selected();
		if (sessionStorage.getItem("correct") == "false")
			correct_chord();
	}
}

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