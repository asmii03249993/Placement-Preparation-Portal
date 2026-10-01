// Get category from URL
const params = new URLSearchParams(window.location.search);

const category = params.get("category");

// Get HTML elements
const categoryTitle =
    document.getElementById("categoryTitle");

const questionContainer =
    document.getElementById("questionContainer");

const timerElement =
    document.getElementById("timer");


// Variables
let questions = [];
let currentQuestion = 0;
let score = 0;

let timeLeft = 600; // 10 minutes
let timer;


// Check category
if (!category) {

    categoryTitle.innerText =
        "No Category Selected";

    questionContainer.innerHTML = `
        <h3>No category selected.</h3>

        <button
            class="next-btn"
            onclick="location.href='index.html'"
        >
            Back to Categories
        </button>
    `;

} else {

    categoryTitle.innerText =
        category + " Technical Questions";

    loadQuestions();
}


// Load questions from backend
async function loadQuestions() {

    try {

        const url =
            "http://localhost:5000/api/questions/" +
            encodeURIComponent(category);

        console.log("Fetching:", url);


        const response =
            await fetch(url);


        console.log(
            "Response Status:",
            response.status
        );


        if (!response.ok) {

            throw new Error(
                "HTTP Error: " + response.status
            );
        }


        questions =
            await response.json();


        console.log(
            "Questions received:",
            questions
        );


        if (questions.length === 0) {

            questionContainer.innerHTML = `
                <div class="result-box">

                    <h2>No Questions Found</h2>

                    <p>
                        No questions are available
                        for ${category}.
                    </p>

                    <button
                        class="next-btn"
                        onclick="location.href='index.html'"
                    >
                        Back to Categories
                    </button>

                </div>
            `;

            return;
        }


        // Start timer
        startTimer();


        // Display first question
        showQuestion();


    } catch (error) {

        console.error(
            "ERROR:",
            error
        );


        questionContainer.innerHTML = `
            <div class="result-box">

                <h2>Error Loading Questions</h2>

                <p>
                    ${error.message}
                </p>

                <p>
                    Please make sure the backend
                    server is running.
                </p>

                <button
                    class="next-btn"
                    onclick="location.href='index.html'"
                >
                    Back to Categories
                </button>

            </div>
        `;
    }
}


// Show question
function showQuestion() {

    const question =
        questions[currentQuestion];


    questionContainer.innerHTML = `

        <div class="question-box">

            <h3>
                Question
                ${currentQuestion + 1}
                of
                ${questions.length}
            </h3>


            <p class="question">
                ${question.question}
            </p>


            <div class="options">

                ${question.options.map(
                    function(option) {

                        return `

                            <label>

                                <input
                                    type="radio"
                                    name="answer"
                                    value="${option}"
                                >

                                ${option}

                            </label>

                        `;

                    }
                ).join("")}

            </div>


            <button
                class="next-btn"
                onclick="nextQuestion()"
            >

                ${
                    currentQuestion ===
                    questions.length - 1

                    ? "Submit Test"

                    : "Next Question"
                }

            </button>

        </div>

    `;
}


// Next question
function nextQuestion() {

    const selectedAnswer =
        document.querySelector(
            'input[name="answer"]:checked'
        );


    if (!selectedAnswer) {

        alert(
            "Please select an answer."
        );

        return;
    }


    // Check answer
    if (
        selectedAnswer.value ===
        questions[currentQuestion].correctAnswer
    ) {

        score++;

    }


    // Go to next question
    if (
        currentQuestion <
        questions.length - 1
    ) {

        currentQuestion++;

        showQuestion();

    } else {

        showResult();

    }
}


// Start timer
function startTimer() {

    updateTimer();


    timer = setInterval(
        function() {

            timeLeft--;

            updateTimer();


            if (timeLeft <= 0) {

                clearInterval(timer);

                alert(
                    "Time is over!"
                );

                showResult();

            }

        },
        1000
    );
}


// Update timer
function updateTimer() {

    const minutes =
        Math.floor(timeLeft / 60);


    const seconds =
        timeLeft % 60;


    timerElement.innerText =
        minutes +
        ":" +
        seconds
            .toString()
            .padStart(2, "0");
}


// Show result
async function showResult() {

    clearInterval(timer);


    const totalQuestions =
        questions.length;


    const wrongAnswers =
        totalQuestions - score;


    const percentage =
        Math.round(
            (score / totalQuestions) * 100
        );


    // Save score
    try {

        const response =
            await fetch(
                "http://localhost:5000/api/scores",
                {

                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({

                        category:
                            category,

                        totalQuestions:
                            totalQuestions,

                        correctAnswers:
                            score,

                        wrongAnswers:
                            wrongAnswers,

                        score:
                            percentage
                    })
                }
            );


        if (!response.ok) {

            throw new Error(
                "Score could not be saved"
            );
        }


        console.log(
            "Score saved successfully"
        );


    } catch (error) {

        console.error(
            "Score Error:",
            error
        );
    }


    // Display result
    questionContainer.innerHTML = `

        <div class="result-box">

            <h2>
                🎉 Test Completed!
            </h2>


            <p>
                Category:
                <strong>
                    ${category}
                </strong>
            </p>


            <p>
                Total Questions:
                <strong>
                    ${totalQuestions}
                </strong>
            </p>


            <p>
                Correct Answers:
                <strong>
                    ${score}
                </strong>
            </p>


            <p>
                Wrong Answers:
                <strong>
                    ${wrongAnswers}
                </strong>
            </p>


            <h2>
                Score:
                ${percentage}%
            </h2>


            <button
                class="next-btn"
                onclick="location.href='index.html'"
            >
                Back to Categories
            </button>

        </div>

    `;
}