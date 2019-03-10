var quiz_id = "NULL";
var compare = false;

function quizLoad(id) {
	quiz_id = id;
	sessionStorage.setItem('score', 0);
	sessionStorage.setItem('score_max', document.getElementsByTagName("section").length);
	if (document.getElementById("chord") != undefined)
		script_load();
	initializeQuiz(false);
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