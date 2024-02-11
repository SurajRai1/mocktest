// performance.js

document.addEventListener('DOMContentLoaded', function () {
    // Retrieve the score from the URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const rawScore = urlParams.get('score');

    // Convert the raw score to a whole number
    const score = isNaN(rawScore) ? 0 : Math.round(parseFloat(rawScore));

    // Display the score
    const scoreElement = document.getElementById('score');
    scoreElement.textContent = `Your Score: ${score}%`;

    // Display the number of correct and incorrect answers
    const { correctCount, incorrectCount } = getAnswerCounts();
    const scoreText = `You got ${correctCount} questions right and ${incorrectCount} questions wrong.`;
    const scoreTextElement = document.createElement('p');
    scoreTextElement.textContent = scoreText;
    scoreElement.insertAdjacentElement('afterend', scoreTextElement);

    // Display submitted answers
    displayAnswers();

    // Add "Back to Home" button
    const backButton = document.getElementById('backButton');
    backButton.addEventListener('click', goBack);
});

function getAnswerCounts() {
    let correctCount = 0;
    let incorrectCount = 0;

    for (let i = 1; i <= totalQuestions; i++) {
        const selectedOption = document.querySelector(`input[name="q${i}"]:checked`);
        const questionData = questionsData[subjectDropdown.value][i - 1];

        if (selectedOption) {
            const isCorrect = selectedOption.value === questionData.correctAnswer;

            if (isCorrect) {
                correctCount++;
            } else {
                incorrectCount++;
            }
        } else {
            incorrectCount++;
        }
    }

    return { correctCount, incorrectCount };
}

function displayAnswers() {
    const answersList = document.getElementById('answers-list');

    // Iterate through submitted answers (you may need to adapt this based on your data structure)
    for (let i = 1; i <= totalQuestions; i++) {
        const selectedOption = document.querySelector(`input[name="q${i}"]:checked`);
        const questionData = questionsData[subjectDropdown.value][i - 1];

        const answerItem = document.createElement('li');
        answerItem.innerHTML = `<p>${i}. ${questionData.question}</p>`;

        if (selectedOption) {
            const isCorrect = selectedOption.value === questionData.correctAnswer;

            // Mark correct and incorrect answers
            if (isCorrect) {
                answerItem.classList.add('correct-answer');
            } else {
                answerItem.classList.add('incorrect-answer');
            }

            answerItem.innerHTML += `<p>Your Answer: ${selectedOption.value} (${isCorrect ? 'Correct' : 'Incorrect'})</p>`;
        } else {
            answerItem.innerHTML += '<p>Your Answer: Not Submitted</p>';
        }

        answersList.appendChild(answerItem);
    }
}

function goBack() {
    // Navigate back to the home page
    window.location.href = 'home.html';
}
