const scoreContainer =
    document.getElementById("scoreContainer");


// Load score history
async function loadScoreHistory() {

    try {

        const response =
            await fetch(
                "http://localhost:5000/api/scores"
            );


        if (!response.ok) {

            throw new Error(
                "Failed to load score history"
            );

        }


        const scores =
            await response.json();


        console.log(
            "Score History:",
            scores
        );


        // No scores
        if (scores.length === 0) {

            scoreContainer.innerHTML = `

                <div class="result-box">

                    <h3>
                        No Test History
                    </h3>

                    <p>
                        Complete a test to see
                        your score here.
                    </p>

                </div>

            `;

            return;
        }


        // Create table
        let tableHTML = `

            <table class="score-table">

                <thead>

                    <tr>

                        <th>
                            Category
                        </th>

                        <th>
                            Total Questions
                        </th>

                        <th>
                            Correct
                        </th>

                        <th>
                            Wrong
                        </th>

                        <th>
                            Score
                        </th>

                        <th>
                            Date
                        </th>

                    </tr>

                </thead>

                <tbody>

        `;


        scores.forEach(function(score) {

            const date =
                new Date(score.date)
                    .toLocaleString();


            tableHTML += `

                <tr>

                    <td>
                        ${score.category}
                    </td>

                    <td>
                        ${score.totalQuestions}
                    </td>

                    <td>
                        ${score.correctAnswers}
                    </td>

                    <td>
                        ${score.wrongAnswers}
                    </td>

                    <td>
                        <strong>
                            ${score.score}%
                        </strong>
                    </td>

                    <td>
                        ${date}
                    </td>

                </tr>

            `;

        });


        tableHTML += `

                </tbody>

            </table>

        `;


        scoreContainer.innerHTML =
            tableHTML;


    } catch (error) {

        console.error(
            "Score History Error:",
            error
        );


        scoreContainer.innerHTML = `

            <div class="result-box">

                <h2>
                    Error Loading Scores
                </h2>

                <p>
                    ${error.message}
                </p>

                <p>
                    Make sure the backend
                    server is running.
                </p>

            </div>

        `;

    }

}


// Run function
loadScoreHistory();
