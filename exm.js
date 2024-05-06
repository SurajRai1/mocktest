// script.js

const questionsContainer = document.getElementById('questions-container');
const timerElement = document.getElementById('timer');
const subjectDropdown = document.getElementById('subject');
let timer;

const subjects = {
    Economics: 1,
    History: 2,
    English: 3,
    'Political Science': 4,
    Sociology: 5,
};

const questionsPerSubject = 10;
const timeLimit = 20 * 60; // 20 minutes in seconds

const questionsData = {
    Economics: [
        {
            question: 'What is the primary goal of microeconomics?',
            options: ['A. Maximize profits', 'B. Minimize costs', 'C. Maximize utility', 'D. Equal distribution of wealth'],
            correctAnswer: 'C',
        },
        {
            question: 'In economics, what does GDP stand for?',
            options: ['A. Gross Domestic Product', 'B. General Development Plan', 'C. Global Demand Projection', 'D. Government Development Program'],
            correctAnswer: 'A',
        },
        {
            question: 'Which economic concept refers to the total value of goods and services produced in a country?',
            options: ['A. Inflation', 'B. Gross Domestic Product', 'C. Supply and Demand', 'D. Budget Deficit'],
            correctAnswer: 'B',
        },
        {
            question: 'What is the law of demand?',
            options: ['A. As prices increase, demand increases', 'B. As prices increase, demand decreases', 'C. Demand and prices are unrelated', 'D. Demand is always constant'],
            correctAnswer: 'B',
        },
        {
            question: 'Who is considered the father of modern economics?',
            options: ['A. Adam Smith', 'B. John Maynard Keynes', 'C. Karl Marx', 'D. Milton Friedman'],
            correctAnswer: 'A',
        },
        {
            question: 'What is an oligopoly?',
            options: ['A. Market with a single seller', 'B. Market with many sellers', 'C. Market with a few sellers', 'D. Market with identical products'],
            correctAnswer: 'C',
        },
        {
            question: 'What is the opportunity cost?',
            options: ['A. Total cost of production', 'B. Cost of the next best alternative', 'C. Fixed cost of production', 'D. Variable cost of production'],
            correctAnswer: 'B',
        },
        {
            question: 'What does the term "invisible hand" refer to in economics?',
            options: ['A. Government intervention', 'B. Natural market forces', 'C. Trade barriers', 'D. Price controls'],
            correctAnswer: 'B',
        },
        {
            question: 'What is the Phillips Curve used to illustrate?',
            options: ['A. Inflation and unemployment', 'B. Supply and demand', 'C. Economic growth', 'D. Fiscal policy'],
            correctAnswer: 'A',
        },
        {
            question: 'What is a fiscal policy tool used to stimulate economic activity?',
            options: ['A. Monetary policy', 'B. Supply-side economics', 'C. Expansionary fiscal policy', 'D. Contractionary fiscal policy'],
            correctAnswer: 'C',
        },
    ],
    // Add more questions for Economics...

    History: [
        {
            question: 'Who was the first President of the United States?',
            options: ['A. Thomas Jefferson', 'B. George Washington', 'C. Abraham Lincoln', 'D. John Adams'],
            correctAnswer: 'B',
        },
        {
            question: 'Which war was fought between the North and the South during the 1860s in the United States?',
            options: ['A. World War I', 'B. Civil War', 'C. Revolutionary War', 'D. War of 1812'],
            correctAnswer: 'B',
        },
        {
            question: 'Who wrote the Declaration of Independence?',
            options: ['A. Benjamin Franklin', 'B. Thomas Jefferson', 'C. John Adams', 'D. George Washington'],
            correctAnswer: 'B',
        },
        {
            question: 'What event marked the beginning of World War I?',
            options: ['A. Bombing of Pearl Harbor', 'B. Assassination of Archduke Franz Ferdinand', 'C. D-Day Invasion', 'D. Treaty of Versailles'],
            correctAnswer: 'B',
        },
        {
            question: 'Who was the leader of the Soviet Union during the Cuban Missile Crisis?',
            options: ['A. Vladimir Putin', 'B. Joseph Stalin', 'C. Nikita Khrushchev', 'D. Mikhail Gorbachev'],
            correctAnswer: 'C',
        },
        {
            question: 'In what year did Christopher Columbus first reach the Americas?',
            options: ['A. 1492', 'B. 1607', 'C. 1776', 'D. 1812'],
            correctAnswer: 'A',
        },
        {
            question: 'What was the main cause of the French Revolution?',
            options: ['A. Economic inequality', 'B. Religious conflicts', 'C. Colonial expansion', 'D. Industrialization'],
            correctAnswer: 'A',
        },
        {
            question: 'Who was the famous nurse during the Crimean War and is considered the founder of modern nursing?',
            options: ['A. Florence Nightingale', 'B. Clara Barton', 'C. Mary Seacole', 'D. Edith Cavell'],
            correctAnswer: 'A',
        },
        {
            question: 'What was the main goal of the Civil Rights Movement in the United States?',
            options: ['A. Women\'s suffrage', 'B. Racial equality', 'C. Labor rights', 'D. Environmental protection'],
            correctAnswer: 'B',
        },
        {
            question: 'Which U.S. president delivered the famous "I Have a Dream" speech during the March on Washington for Jobs and Freedom?',
            options: ['A. John F. Kennedy', 'B. Lyndon B. Johnson', 'C. Richard Nixon', 'D. Martin Luther King Jr.'],
            correctAnswer: 'D',
        },
    ],
    // Add more questions for History...

    English: [
        {
            question: 'What is the meaning of the word "ubiquitous"?',
            options: ['A. Rare', 'B. Common', 'C. Hidden', 'D. Temporary'],
            correctAnswer: 'B',
        },
        {
            question: 'Who is the author of the play "Romeo and Juliet"?',
            options: ['A. Charles Dickens', 'B. William Shakespeare', 'C. Jane Austen', 'D. Emily Brontë'],
            correctAnswer: 'B',
        },
        {
            question: 'Which literary period is known for its focus on reason, logic, and order?',
            options: ['A. Romanticism', 'B. Gothic', 'C. Renaissance', 'D. Enlightenment'],
            correctAnswer: 'D',
        },
        {
            question: 'What is the protagonist\'s name in George Orwell\'s "1984"?',
            options: ['A. Winston Smith', 'B. Big Brother', 'C. Julia', 'D. O\'Brien'],
            correctAnswer: 'A',
        },
        {
            question: 'In Shakespeare\'s "Hamlet," what is the famous soliloquy that begins with "To be or not to be"?',
            options: ['A. The Dagger Speech', 'B. The Seven Ages of Man', 'C. The Sermon on the Mount', 'D. The To Be or Not To Be Speech'],
            correctAnswer: 'D',
        },
        {
            question: 'Who wrote the novel "Pride and Prejudice"?',
            options: ['A. Jane Austen', 'B. Charlotte Brontë', 'C. Emily Brontë', 'D. Charles Dickens'],
            correctAnswer: 'A',
        },
        {
            question: 'What is the genre of George Orwell\'s "Animal Farm"?',
            options: ['A. Science Fiction', 'B. Dystopian Fiction', 'C. Fantasy', 'D. Historical Fiction'],
            correctAnswer: 'B',
        },
        {
            question: 'Who is the narrator in the novel "The Great Gatsby"?',
            options: ['A. Nick Carraway', 'B. Jay Gatsby', 'C. Daisy Buchanan', 'D. Tom Buchanan'],
            correctAnswer: 'A',
        },
        {
            question: 'Which Shakespearean play features the characters Macbeth and Lady Macbeth?',
            options: ['A. Othello', 'B. King Lear', 'C. Macbeth', 'D. Romeo and Juliet'],
            correctAnswer: 'C',
        },
        {
            question: 'Who wrote the poem "The Raven"?',
            options: ['A. Emily Dickinson', 'B. Edgar Allan Poe', 'C. Walt Whitman', 'D. Robert Frost'],
            correctAnswer: 'B',
        },
    ],
    // Add more questions for English...

    'Political Science': [
        {
            question: 'What is a democracy?',
            options: ['A. Rule by the people', 'B. Rule by a single person', 'C. Rule by the military', 'D. Rule by the elite'],
            correctAnswer: 'A',
        },
        {
            question: 'Who is known as the "Father of Modern Political Science"?',
            options: ['A. Plato', 'B. Aristotle', 'C. Machiavelli', 'D. John Locke'],
            correctAnswer: 'C',
        },
        {
            question: 'What is the main function of the legislative branch of government?',
            options: ['A. Enforcing laws', 'B. Making laws', 'C. Interpreting laws', 'D. Conducting elections'],
            correctAnswer: 'B',
        },
        {
            question: 'What is the term for a system of government where power is divided between a central government and regional governments?',
            options: ['A. Autocracy', 'B. Federalism', 'C. Unitarism', 'D. Totalitarianism'],
            correctAnswer: 'B',
        },
        {
            question: 'Who wrote the book "The Prince," which explores political power and leadership?',
            options: ['A. Thomas Hobbes', 'B. John Locke', 'C. Niccolò Machiavelli', 'D. Jean-Jacques Rousseau'],
            correctAnswer: 'C',
        },
        {
            question: 'In the United States, what is the term length for a member of the House of Representatives?',
            options: ['A. 2 years', 'B. 4 years', 'C. 6 years', 'D. 8 years'],
            correctAnswer: 'A',
        },
        {
            question: 'What is the role of the Supreme Court in the U.S. government?',
            options: ['A. Enforcing laws', 'B. Making laws', 'C. Interpreting laws', 'D. Conducting elections'],
            correctAnswer: 'C',
        },
        {
            question: 'Who is the head of the executive branch in the United States?',
            options: ['A. Speaker of the House', 'B. President', 'C. Chief Justice', 'D. Senate Majority Leader'],
            correctAnswer: 'B',
        },
        {
            question: 'What is the primary responsibility of the President of the United States?',
            options: ['A. Making laws', 'B. Enforcing laws', 'C. Interpreting laws', 'D. Conducting elections'],
            correctAnswer: 'B',
        },
        {
            question: 'What is the purpose of the United Nations?',
            options: ['A. Economic cooperation', 'B. Social media regulation', 'C. International peace and cooperation', 'D. Space exploration'],
            correctAnswer: 'C',
        },
    ],
    // Add more questions for Political Science...

    Sociology: [
        {
            question: 'What is the term for the process by which individuals internalize the values, beliefs, and norms of a society?',
        options: ['A. Socialization', 'B. Social mobility', 'C. Social stratification', 'D. Social control'],
        correctAnswer: 'A',
    },
    {
        question: 'Which sociological perspective emphasizes the ways in which society promotes inequality and conflict among groups?',
        options: ['A. Functionalism', 'B. Conflict theory', 'C. Symbolic interactionism', 'D. Feminist theory'],
        correctAnswer: 'B',
    },
    {
        question: 'What is the term for the social process through which individuals or groups acquire or create new culture?',
        options: ['A. Assimilation', 'B. Cultural relativism', 'C. Cultural diffusion', 'D. Cultural innovation'],
        correctAnswer: 'D',
    },
    {
        question: 'Who coined the term "the sociological imagination"?',
        options: ['A. Karl Marx', 'B. Max Weber', 'C. Émile Durkheim', 'D. C. Wright Mills'],
        correctAnswer: 'D',
    },
    {
        question: 'What is the concept that refers to the tendency to use one's own culture and values as the standard for judging the practices of others?',
        options: ['A. Ethnocentrism', 'B. Cultural relativism', 'C. Cultural diffusion', 'D. Cultural assimilation'],
        correctAnswer: 'A',
    },
    {
        question: 'Which sociologist introduced the idea of the "iron cage" of rationality in modern society?',
        options: ['A. Karl Marx', 'B. Max Weber', 'C. Émile Durkheim', 'D. Talcott Parsons'],
        correctAnswer: 'B',
    },
    {
        question: 'What is the term for a system of ranking individuals or groups based on unequal access to resources and opportunities?',
        options: ['A. Socialization', 'B. Social mobility', 'C. Social stratification', 'D. Social control'],
        correctAnswer: 'C',
    },
    {
        question: 'Which type of society is characterized by a simple division of labor, kinship ties, and a small population?',
        options: ['A. Industrial society', 'B. Post-industrial society', 'C. Agricultural society', 'D. Hunter-gatherer society'],
        correctAnswer: 'D',
    },
    {
        question: 'What is the term for the process of changing one's beliefs, behaviors, or cultural traits to fit in with a dominant group?',
        options: ['A. Assimilation', 'B. Cultural relativism', 'C. Cultural diffusion', 'D. Cultural accommodation'],
        correctAnswer: 'A',
    },
    {
        question: 'Which sociologist is known for his work on the theory of social capital?',
        options: ['A. Karl Marx', 'B. Pierre Bourdieu', 'C. Max Weber', 'D. Michel Foucault'],
        correctAnswer: 'B',
    },
],
    // Add more questions for Sociology....
};


function startExam() {
    clearInterval(timer);
    displayQuestions();
    startTimer();
}

function displayQuestions() {
    const selectedSubject = subjectDropdown.value;

    questionsContainer.innerHTML = ''; // Clear previous questions

    for (let i = 0; i < questionsPerSubject; i++) {
        const questionNumber = i + 1; // Start numbering from 1
        const questionData = questionsData[selectedSubject][i];

        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');
        questionDiv.innerHTML = `<p>${questionNumber}. ${questionData.question}</p>`;

        const optionsList = document.createElement('ul');
        optionsList.classList.add('options');

        // Add radio options (A, B, C, D)
        for (let j = 0; j < 4; j++) {
            const optionLabel = String.fromCharCode(65 + j);
            const optionText = questionData.options[j];

            const optionLi = document.createElement('li');
            optionLi.innerHTML = `
                <input type="radio" name="q${questionNumber}" value="${optionLabel}" id="q${questionNumber}${optionLabel}">
                <label for="q${questionNumber}${optionLabel}">${optionText}</label>
            `;

            optionsList.appendChild(optionLi);
        }

        questionDiv.appendChild(optionsList);
        questionsContainer.appendChild(questionDiv);
    }
}

function startTimer() {
    let secondsRemaining = timeLimit;

    function updateTimer() {
        const minutes = Math.floor(secondsRemaining / 60);
        const seconds = secondsRemaining % 60;

        timerElement.textContent = `Time Left: ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

        if (secondsRemaining <= 0) {
            clearInterval(timer);
            timerElement.textContent = 'Time Expired!';
            // You can add logic for auto-submit here
        }

        secondsRemaining--;
    }

    updateTimer(); // Initial display

    timer = setInterval(updateTimer, 1000);
}

function submitExam() {
    clearInterval(timer);
    calculateScore();
    // Add logic to display performance chart in a new page
}


// Your existing exm.js code

function submitExam() {
    clearInterval(timer);
    calculateScore();
    // Redirect to the performance page after submitting the exam
    window.location.href = "performance.html";
}

// Remaining exm.js code...



function calculateScore() {
    const totalQuestions = questionsPerSubject;
    let correctAnswers = 0;

    for (let i = 1; i <= totalQuestions; i++) {
        const selectedOption = document.querySelector(`input[name="q${i}"]:checked`);

        if (selectedOption) {
            const questionData = questionsData[subjectDropdown.value][i - 1];
            const isCorrect = selectedOption.value === questionData.correctAnswer;

            if (isCorrect) {
                correctAnswers++;
            }

            selectedOption.disabled = true; // Disable the selected option
        }
    }

    const scorePercentage = (correctAnswers / totalQuestions) * 100;
}
