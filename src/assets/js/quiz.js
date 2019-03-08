var quiz_id = "NULL";

function quizLoad(id, score_max) {
	quiz_id = id;
	sessionStorage.setItem('score', 0);
	sessionStorage.setItem('score_max', score_max);
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