//The answer is the value of the answer which is 1-6 in order. These values are given in the html select options
class Question {
	constructor(ques, opt, ans, imag) {
		this.theQuestion = ques;
		this.theOptions = opt;
		this.theAnswer = ans;
		this.theImage = imag;
	}
}
let question1Options = ["D4", "A6", "E3", "B2", "D1", "A2"];
let question2Options = ["40", "22", "49", "5", "17", "36"];
let question3Options = ["Calmorous", "Vulgar", "Boorish", "Garrulous", "Stressed", "Condescending"];
let question4Options = ["Softball", "Ice Hockey", "Golf", "Soccer", "Cricket", "Rugby"];
let question5Options = ["8 feet", "15 feet", "10 feet", "6 feet", "12 feet", "9 feet"];



let question1 = new Question("Find the ballet dancer in the Flamingos. What coordinates is it located at?", question1Options, 5, "Images/findBalletDancerGrid.PNG");
let question2 = new Question("What is the next number in the sequence shown above?", question2Options, 3, "Images/sequenceImage.PNG");
let question3 = new Question("Which word is most similar to loquacious?", question3Options, 4, "Images/question3Image.PNG");
let question4 = new Question("Which of the words is the odd one out?", question4Options, 2, "Images/question4Image.PNG");
let question5 = new Question("How far are they apart?", question5Options, 3, "Images/question5Image.PNG");

let myQuestions = [question1, question2, question3, question4, question5];


let questionText;
let questionImage;
let questionAnswer;
let submitButton;
let retryButton;
let questionNumber;
let optionOne;
let optionTwo;
let optionThree;
let optionFour;
let optionFive;
let optionSix;
let correctAnswers = 0;
let myProgressBar;
let countdownUi;
let endTime;

function showQuestion() {
	questionText.textContent = myQuestions[questionNumber].theQuestion;
	questionImage.src = myQuestions[questionNumber].theImage;
	optionOne.text = myQuestions[questionNumber].theOptions[0];
	optionTwo.text = myQuestions[questionNumber].theOptions[1];
	optionThree.text = myQuestions[questionNumber].theOptions[2];
	optionFour.text = myQuestions[questionNumber].theOptions[3];
	optionFive.text = myQuestions[questionNumber].theOptions[4];
	optionSix.text = myQuestions[questionNumber].theOptions[5];
	questionAnswer.selectedIndex = 0;
	myProgressBar.style.width = (questionNumber / myQuestions.length) * 100 + "%";
}

function showFinalScreen() {
	let now = new Date().getTime();
	let timeLeft = endTime - now;
	let minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
	let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
	questionImage.style.display = 'none';
	submitButton.style.display = 'none';
	questionAnswer.style.display = 'none';
	countdownUi.style.display = 'none';
	let timeLeftText;
	if (timeLeft > 0) {
		timeLeftText = ". Your time left was: " +  minutes + " minutes " + seconds + " seconds.";
	} else {
		timeLeftText = ". You didn't finish in time";
	}
	
	questionText.textContent = "Your score was: " + correctAnswers + " out of " + myQuestions.length
							 + timeLeftText;
	retryButton.style.display = 'block';
	myProgressBar.style.width = "100%";
}

function answerSubmitted() {
	if (questionAnswer.selectedIndex == 0) {
		
	} else {
		if (questionAnswer.value == myQuestions[questionNumber].theAnswer) {
		correctAnswers++;
	}
	if (questionNumber >= myQuestions.length - 1)
	{
		showFinalScreen();
	} else {
		questionNumber++;
		showQuestion();
	}
	}

	
}

function retry() {
	correctAnswers = 0;
	questionNumber = 0;
	questionImage.style.display = 'block';
	submitButton.style.display = 'block';
	questionAnswer.style.display = 'block';
	retryButton.style.display = 'none';
	countdownUi.style.display = 'block';

	showQuestion();
	setUpTimer();
}

function setUpTimer() {
	endTime = new Date().getTime()  + (2 * 60000);
	let interval = setInterval(function() {
		let now = new Date().getTime();
		let distance = endTime - now;
		let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		let seconds = Math.floor((distance % (1000 * 60)) / 1000);
		countdownUi.innerHTML = "Time left: " + minutes + " minutes " + seconds + " seconds.";
		if (distance < 0) {
			clearInterval(interval);
			countdownUi.innerHTML = "Time expired.";
		} 
	}, 1000)
}

function init() {
	questionText = document.querySelector('#question');
	questionImage = document.querySelector('#questionImage');
	questionAnswer = document.querySelector('#selectHolder');
	submitButton = document.querySelector('#submitButton');
	submitButton.addEventListener('click', answerSubmitted);
	retryButton = document.querySelector('#retryButton');
	retryButton.addEventListener('click', retry);
	questionNumber = 0;
	optionOne = document.querySelector('#optionOne');
	optionTwo = document.querySelector('#optionTwo');
	optionThree = document.querySelector('#optionThree');
	optionFour = document.querySelector('#optionFour');
	optionFive = document.querySelector('#optionFive');
	optionSix = document.querySelector('#optionSix');
	myProgressBar = document.querySelector('#myProgressBar');
	countdownUi = document.querySelector('#countdown');
	showQuestion();
	setUpTimer();
}

window.onload = init;
