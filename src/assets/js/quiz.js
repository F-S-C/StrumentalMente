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
	if (document.getElementById("chord") != undefined)
		verify_and_store();
	showQuizDialog(quiz_id, sessionStorage.getItem('score'), sessionStorage.getItem('score_max'));
}