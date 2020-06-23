//The answer is the value of the answer which is 1-6 in order. These values are given in the html select options
class Question {
	constructor(ques, opt, ans, imag) {
		this.theQuestion = ques;
		this.theOptions = opt;
		this.theAnswer = ans;
		this.theImage = imag;
	}
}

let question2Options = ["40", "22", "49", "5", "17", "36"];

Question question2 = new Question("What is the next number in the sequence shown above?", question2Options, 3, "Images/sequenceImage.png");

let questionText;
let questionImage;
let questionAnswer;
let submitButton;
let questionNumber;
let optionOne;
let optionTwo;
let optionThree;
let optionFour;
let optionFive;
let optionSix;

function answerSubmitted() {
	console.log(questionAnswer.value)
	console.log("answer done");
}


function init() {
	questionText = document.querySelector('#question');
	questionImage = document.querySelector('#questionImage');
	questionAnswer = document.querySelector('#selectHolder');
	submitButton = document.querySelector('#submitButton');
	submitButton.addEventListener('click', answerSubmitted);
	questionNumber = 0;
	optionOne = document.querySelector('#optionOne');
	optionTwo = document.querySelector('#optionTwo');
	optionThree = document.querySelector('#optionThree');
	optionFour = document.querySelector('#optionFour');
	optionFive = document.querySelector('#optionFive');
	optionSix = document.querySelector('#optionSix');
}

window.onload = init;
