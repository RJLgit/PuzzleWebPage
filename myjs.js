let questionText;
let questionImage;
let questionAnswer;
let submitButton;

function answerSubmitted() {
	console.log("answer done");
}


function init() {
	questionText = document.querySelector('#question');
	questionImage = document.querySelector('#questionImage');
	questionAnswer = document.querySelector('#selectHolder');
	submitButton = document.querySelector('#submitButton');
	submitButton.addEventListener('click', answerSubmitted);
}

window.onload = init;
