// Get category from URL

const params =
    new URLSearchParams(
        window.location.search
    );

const category =
    params.get("category");


// Get HTML elements

const categoryTitle =
    document.getElementById(
        "categoryTitle"
    );

const questionContainer =
    document.getElementById(
        "questionContainer"
    );

const timerElement =
    document.getElementById(
        "timer"
    );


// Variables

let questions = [];

let currentQuestion = 0;

let score = 0;

let timeLeft = 600;

let timer;

let testFinished = false;


// Check category

if (!category) {

    categoryTitle.innerText =
        "No Category Selected";

    questionContainer.innerHTML = `

        <div class="result-box">

            <h3>
                No category selected.
            </h3>

            <button
                class="next-btn"
                onclick="location.href='mock-test.html'">

                Back to Mock Tests

            </button>

        </div>

    `;

} else {

    categoryTitle.innerText =
        category + " Mock Test";

    loadMockQuestions();

}


// Load questions

async function loadMockQuestions() {

    try {

        const url =
            "http://localhost:5000/api/questions/" +
            encodeURIComponent(category);

        console.log(
            "Fetching:",
            url
        );


        const response =
            await fetch(url);


        if (!response.ok) {

            throw new Error(
                "HTTP Error: " +
                response.status
            );

        }


        const allQuestions =
            await response.json();


        console.log(
            "Questions received:",
            allQuestions
        );


        if (allQuestions.length === 0) {

            questionContainer.innerHTML = `

                <div class="result-box">

                    <h2>
                        No Questions Found
                    </h2>

                    <p>
                        No questions are available
                        for ${category}.
                    </p>

                    <button
                        class="next-btn"
                        onclick="location.href='mock-test.html'">

                        Back to Mock Tests

                    </button>

                </div>

            `;

            return;

        }


        /*
         * Shuffle questions
         */

        questions =
            shuffleArray(
                allQuestions
            );


        /*
         * Mock test uses maximum
         * 10 questions.
         */

        questions =
            questions.slice(
                0,
                10
            );


        startTimer();

        showQuestion();


    } catch (error) {

        console.error(
            "Mock Test Error:",
            error
        );


        questionContainer.innerHTML = `

            <div class="result-box">

                <h2>
                    Error Loading Mock Test
                </h2>

                <p>
                    ${error.message}
                </p>

                <p>
                    Please make sure the
                    backend is running.
                </p>

            </div>

        `;

    }

}


// Shuffle questions

function shuffleArray(array) {

    const newArray =
        [...array];


    for (
        let i = newArray.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
                Math.random() *
                (i + 1)
            );


        [
            newArray[i],
            newArray[j]
        ] =
        [
            newArray[j],
            newArray[i]
        ];

    }


    return newArray;

}


// Show question

function showQuestion() {

    const question =
        questions[
            currentQuestion
        ];


    questionContainer.innerHTML = `

        <div class="question-box">

            <h3>

                Mock Question
                ${currentQuestion + 1}
                of
                ${questions.length}

            </h3>


            <p class="question">

                ${question.question}

            </p>


            <div class="options">

                ${question.options
                    .map(
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
                    )
                    .join("")
                }

            </div>


            <button
                class="next-btn"
                onclick="nextQuestion()">

                ${
                    currentQuestion ===
                    questions.length - 1

                    ? "Submit Mock Test"

                    : "Next Question"
                }

            </button>

        </div>

    `;

}


// Next question

function nextQuestion() {

    if (testFinished) {
        return;
    }


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


    if (
        selectedAnswer.value ===
        questions[
            currentQuestion
        ].correctAnswer
    ) {

        score++;

    }


    if (
        currentQuestion <
        questions.length - 1
    ) {

        currentQuestion++;

        showQuestion();

    } else {

        finishTest();

    }

}


// Start timer

function startTimer() {

    updateTimer();


    timer =
        setInterval(
            function() {

                if (testFinished) {
                    return;
                }


                timeLeft--;

                updateTimer();


                if (timeLeft <= 0) {

                    clearInterval(timer);

                    alert(
                        "Time is over!"
                    );

                    finishTest();

                }

            },
            1000
        );

}


// Update timer

function updateTimer() {

    const minutes =
        Math.floor(
            timeLeft / 60
        );


    const seconds =
        timeLeft % 60;


    timerElement.innerText =
        minutes +
        ":" +
        seconds
            .toString()
            .padStart(2, "0");

}


// Finish test

async function finishTest() {

    if (testFinished) {
        return;
    }


    testFinished = true;


    clearInterval(timer);


    const totalQuestions =
        questions.length;


    const wrongAnswers =
        totalQuestions - score;


    const percentage =
        Math.round(
            (
                score /
                totalQuestions
            ) * 100
        );


    /*
     * Save Mock Test Score
     */

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
                            category +
                            " - Mock Test",

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
                "Mock test score could not be saved."
            );

        }


        console.log(
            "Mock test score saved."
        );


    } catch (error) {

        console.error(
            "Score Saving Error:",
            error
        );

    }


    /*
     * Display Result
     */

    questionContainer.innerHTML = `

        <div class="result-box">

            <h2>
                🎉 Mock Test Completed!
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
                onclick="location.href='mock-test.html'">

                Try Another Mock Test

            </button>


            <button
                class="next-btn"
                onclick="location.href='score-history.html'">

                📊 View Score History

            </button>


            <button
                class="next-btn"
                onclick="location.href='index.html'">

                🏠 Back to Home

            </button>

        </div>

    `;

}