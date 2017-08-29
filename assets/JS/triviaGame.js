$("#start").on("click",function(){
	$("#start").remove();
	game.loadQuestion();
});

$(document).on("click", ".answer-button", function(e){
	game.clicked(e);
});

$(document).on("click", "#reset", function(){
	game.reset();
});

var questions =[{
	question: "Who was Darth Plagueis's apprentice?",
	answers: ["Darth Bane", "Darth Zannah", "Darth Vader", "Darth Sidious"],
	correctAnswer: "Darth Sidious",
}, {
	question: "Who originally owned the Millennium Falcon?",
	answers: ["Leia", "Han Solo", "Lando Calrissian", "Chewbacca"],
	correctAnswer: "Lando Calrissian",
}, {
	question: "What is Darth Bane known for creating?",
	answers: ["The downfall of the Jedi Order", "The Deathstar", "Mass Genocide of the Geonsian Population", "The Rule of Two"],
	correctAnswer: "The Rule of Two",
}, {
	question: "Where was the 2nd Deathstar destroyed?",
	answers: ["The Forest Moon of Endor", "Hoth", "Yavin IV", "Kashyyk"],
	correctAnswer: "The Forest Moon of Endor",
}, {
	question: "Who killed Lord Kaan and The Brotherhood of Darkness?",
	answers: ["Lord Qordis", "Darth Bane", "Darth Vader", "Lord Kas'im"],
	correctAnswer: "Darth Bane",
}, {
	question: "Who was Darth Vader's apprentice featured in the video game 'The Force Unleashed'?",
	answers: ["Lady Lumiya", "Flint", "Starkiller", "Savage Opress"],
	correctAnswer: "Starkiller",
}, {
	question: "What species is Grand Admiral Thrawn?",
	answers: ["Bith", "Yuuzhan Vong", "Kamarian", "Chiss"],
	correctAnswer: "Chiss",
}, {
	question: "Who was the sith masterin the legacy series that came after Vergere?",
	answers: ["Darth Tyranus", "Darth Gean", "Darth Krayt", "Dark Lord Belia Darzu"],
	correctAnswer: "Darth Krayt",
}, {
	question: "Which era did Revan turn to the darkside, only to later be brought back to the light by the jedi counsil?",
	answers: ["The New Jedi Order era", "The Rise of the Empire era", "The Old Republic era", "The New Republic era"],
	correctAnswer: "The Old Republic era",
}, {
	question: "Who shot first?",
	answers: ["Han Solo", "Greedo"],
	correctAnswer: "Han Solo",
}];

var game = {
	questions: questions,
	currentQuestion:0,
	counter: 30,
	correct: 0,
	incorrect: 0,
	unanswered: 0,
	countdown: function(){
		game.counter--;
		$("#counter").html(game.counter);
		if(game.counter<=0){
			console.log("Time Up!");
			game.timeUp();
		}
	},
	loadQuestion: function(){
		timer = setInterval(game.countdown, 1000);
		$("#subwrapper").html("<h2>TIME: <span id='counter'>30</span> Seconds</h2>");
		$("#subwrapper").append("<h2>" + questions[game.currentQuestion].question + "</h2>");
		for (var i = 0; i < questions[game.currentQuestion].answers.length; i++){
			$("#subwrapper").append('<button class="answer-button" id="button-' + i + '" data-name="' + questions[game.currentQuestion].answers[i] + '">' + questions[game.currentQuestion].answers[i] + "</button>");
		}
	},
	nextQuestion: function(){
		game.counter = 30;
		$("#counter").html(game.counter);
		game.currentQuestion ++;
		game.loadQuestion();
	},
	timeUp: function(){
		clearInterval(timer);
		game.unanswered++;
		$("#subwrapper").html("<h2>Out Of Time!</h2>");
		$("#subwrapper").append("<h3>The Correct Answer Was: " + questions[game.currentQuestion].correctAnswer + "</h3>");
		if(game.currentQuestion == questions.length - 1){
			setTimeout(game.results, 3 * 1000);
		} else {
			setTimeout(game.nextQuestion, 3 * 1000);
		}
	},
	results: function(){
		clearInterval(timer);
		$("#subwrapper").html("<h2>All Done!</h2>");
		$("#subwrapper").append("<h3>Correct: " + game.correct + "</h3>");
		$("#subwrapper").append("<h3>Incorrect: " + game.incorrect + "</h3>");
		$("#subwrapper").append("<h3>Unanswered: " + game.unanswered + "</h3>");
		$("#subwrapper").append("<button id='reset'>RESET</button>");
	},
	clicked: function(e){
		clearInterval(timer);
		if ($(e.target).data("name") == questions[game.currentQuestion].correctAnswer){
			game.answeredCorrectly();
		} else {
			game.answeredIncorrectly();
		}
	},
	answeredCorrectly: function(){
		console.log("you got it");
		clearInterval(timer);
		game.correct ++;
		$("#subwrapper").html("<h2>YOU GOT IT RIGHT!</h2>");
		if(game.currentQuestion == questions.length - 1){
			setTimeout(game.results, 3 * 1000);
		} else {
			setTimeout(game.nextQuestion, 3 * 1000);
		}
	},
	answeredIncorrectly: function(){
		console.log("you got it wrong");
		clearInterval(timer);
		game.incorrect ++;
		$("#subwrapper").html("<h2>YOU GOT IT WRONG!</h2>");
		$("#subwrapper").append("<h3>The Correct Answer Was: " + questions[game.currentQuestion].correctAnswer + "</h3>");

		if(game.currentQuestion == questions.length - 1){
			setTimeout(game.results, 3 * 1000);
		} else {
			setTimeout(game.nextQuestion, 3 * 1000);
		}
	},
	reset: function(){
		game.currentQuestion = 0;
		game.counter = 0;
		game.correct = 0;
		game.incorrect = 0;
		game.loadQuestion();
	},
};


