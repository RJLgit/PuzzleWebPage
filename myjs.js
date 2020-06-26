//The answer is the value of the answer which is 1-6 in order. These values are given in the html select options
class Question {
	constructor(ques, opt, ans, imag) {
		this.theQuestion = ques;
		this.theOptions = opt;
		this.theAnswer = ans;
		this.theImage = imag;
	}
}
//Arrays of options for each question
let question1Options = ["D4", "A6", "E3", "B2", "D1", "A2"];
let question2Options = ["40", "22", "49", "5", "17", "36"];
let question3Options = ["Calmorous", "Vulgar", "Boorish", "Garrulous", "Stressed", "Condescending"];
let question4Options = ["Softball", "Ice Hockey", "Golf", "Soccer", "Cricket", "Rugby"];
let question5Options = ["8 feet", "15 feet", "10 feet", "6 feet", "12 feet", "9 feet"];
//The question objects to hold the questions, the image, the correct answer and the options
let question1 = new Question("Find the ballet dancer in the Flamingos. What coordinates is it located at?", question1Options, 5, "Images/findBalletDancerGrid.PNG");
let question2 = new Question("What is the next number in the sequence shown above?", question2Options, 3, "Images/sequenceImage.PNG");
let question3 = new Question("Which word is most similar to loquacious?", question3Options, 4, "Images/question3Image.PNG");
let question4 = new Question("Which of the words is the odd one out?", question4Options, 2, "Images/question4Image.PNG");
let question5 = new Question("How far are they apart?", question5Options, 3, "Images/question5Image.PNG");
//Sets all the questions to the variable myQuestions
let myQuestions = [question1, question2, question3, question4, question5];
//Variables to hold the UI elements
let questionText;
let questionImage;
let questionAnswer;
let submitButton;
let retryButton;
let optionOne;
let optionTwo;
let optionThree;
let optionFour;
let optionFive;
let optionSix;
let myProgressBar;
let countdownUi;
let questionHeader;
let imageContainer;
//Variables which store the current question number, current score and the end time when quiz finished
let endTime;
let questionNumber;
let correctAnswers = 0;
//The method which is called everytime a new question is loaded. It populates the question UI.
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
	questionHeader.textContent = `Question ${questionNumber + 1} of ${myQuestions.length}`
	myProgressBar.style.width = (questionNumber / myQuestions.length) * 100 + "%";
}
//When the quiz is finished this method is called and it changes the UI to show the user their result
function showFinalScreen() {
	//Calculates the difference between the current time and the endTime, which returns how 
	//long the user had left. This value is displayed to the user unless the time was expired.
	let now = new Date().getTime();
	let timeLeft = endTime - now;
	let minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
	let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
	submitButton.style.display = 'none';
	questionAnswer.style.display = 'none';
	countdownUi.style.display = 'none';
	imageContainer.style.display = 'none';
	let timeLeftText;
	if (timeLeft > 0) {
		timeLeftText = `Your time left was: ${minutes} minutes ${seconds} seconds.`;
	} else {
		timeLeftText = "You didn't finish in time";
	}
	questionHeader.textContent = `Your score was: ${correctAnswers} out of ${myQuestions.length}`;
	questionText.textContent = timeLeftText;
	//Shows the retry button so the user can load the quiz again
	retryButton.style.display = 'block';
	myProgressBar.style.width = "100%";
}
//Method triggered when the submit answer button pressed.
function answerSubmitted() {
	//Nothing happens if the selected option was the default "select an answer" option
	if (questionAnswer.selectedIndex == 0) {
		
	} else {
		//Otherwise if the value was the correct answer then the correctanswers variable is incremented
		if (questionAnswer.value == myQuestions[questionNumber].theAnswer) {
		correctAnswers++;
	}
	//Checks if that is the end of the quiz
	if (questionNumber >= myQuestions.length - 1)
	{
		showFinalScreen();
	} else {
		//If not then increments question number and shows the next question
		questionNumber++;
		showQuestion();
	}
	}	
}
//Method called when the retry quiz button is pressed. This undoes all the ui changes in
//showfinalscreen method and restarts the quiz and the timer. It resets the variables
//which track the users progress in the quiz.
function retry() {
	correctAnswers = 0;
	questionNumber = 0;
	imageContainer.style.display = 'block';
	submitButton.style.display = 'block';
	questionAnswer.style.display = 'block';
	retryButton.style.display = 'none';
	countdownUi.style.display = 'block';
	showQuestion();
	setUpTimer();
}
//This method sets up the timer for the quiz to 2 minutes.
//It uses the setInterval method to carry out a function every 1 second.
//This function counts down in time until the time is just and then it just displays time expired.
function setUpTimer() {
	endTime = new Date().getTime()  + (2 * 60000);
	let interval = setInterval(function() {
		let now = new Date().getTime();
		let distance = endTime - now;
		let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		let seconds = Math.floor((distance % (1000 * 60)) / 1000);
		countdownUi.innerHTML = `Time left: ${minutes} minutes ${seconds} seconds.`;
		if (distance < 0) {
			clearInterval(interval);
			countdownUi.innerHTML = "Time expired.";
		} 
	}, 1000)
}
//Function called when the window loads
function init() {
	//Loads the UI elements and sets the onclick listeners to the buttons
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
	questionHeader = document.querySelector('#questionHeader');
	imageContainer = document.querySelector('#imageContainer');
	//Shows the first question and sets up the timer
	showQuestion();
	setUpTimer();
}

window.onload = init;
