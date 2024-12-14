document.addEventListener("DOMContentLoaded", function () {
    let quizData = {};

    // Fetch the quiz data from JSON file
    fetch("quiz-data.json")
        .then((response) => response.json())
        .then((data) => {
            quizData = data;
            console.log(quizData);
            generateQuizCards();
            initializeQuizButtons();
        })
        .catch((error) => {
            console.error("Error fetching data: ", error);
        });

    function generateQuizCards() {
        const carouselContainer = document.querySelector(".main-carousal");
        carouselContainer.innerHTML = '';

        // Image mapping for each section
        const sectionImages = {
            "General Knowledge": "./images/gk.jpg",
            "Science": "./images/science (1).jpg",
            "Mathematics": "./images/maths.jpg",
            "Indian History": "./images/history.jpg"
        };

        quizData.sections.forEach((section, index) => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <img src="${sectionImages[section.sectionTitle]}" alt="${section.sectionTitle.toLowerCase()}">
                <button class="card-btn" data-section="${index}">${section.sectionTitle.toUpperCase()}</button>
            `;
            carouselContainer.appendChild(card);
        });
    }

    function initializeQuizButtons() {
        const cardBtns = document.querySelectorAll(".card-btn");
        cardBtns.forEach((card) => {
            card.addEventListener("click", function () {
                const sectionIndex = parseInt(
                    card.getAttribute("data-section")
                );
                if (quizData.sections && quizData.sections[sectionIndex]) {
                    startQuiz(sectionIndex);
                }
            });
        });

        const randomBtn = document.querySelector(".randon-btn-btn");
        randomBtn.addEventListener("click", function () {
            if (quizData.sections && quizData.sections.length > 0) {
                const randomSectionIndex = Math.floor(
                    Math.random() * quizData.sections.length
                );
                startQuiz(randomSectionIndex);
            }
        });
    }

    function startQuiz(sectionIndex) {
        const currentSection = quizData.sections[sectionIndex];
        const currentQuestionBank = [...currentSection.questions];
        let currentQuestionIndex = 0;
        let score = 0;
        let answerSelected = false;
        let nextButton;

        shuffleArray(currentQuestionBank);

        const mainContent = document.querySelector(".main-content");
        const body = document.querySelector("body");
        const questionContainer = document.querySelector(".question-container");

        document.querySelector(".main-content").style.display = "none";
        document.querySelector("body").style.backgroundImage = "none";
        document.querySelector(".question-container").style.display = "flex";
        document.querySelector(".question-container").innerHTML = `
            <div class="questions-content"></div>
            <div class="options">
                <ul></ul>
                <p class="right">Correct Answer!</p>
                <div class="wrong">
                    <p>Wrong Answer!</p>
                    <p class="correct-answer"></p>
                </div>
                <button class="next-btn">Next</button>
            </div>
        `;

        nextButton = questionContainer.querySelector(".next-btn");

        nextButton.addEventListener("click", function () {
            if (currentQuestionIndex === currentQuestionBank.length - 1) {
                endQuiz();
            } else {
                currentQuestionIndex++;
                showQuestion();
            }
        });

        showQuestion();

        function showQuestion() {
            answerSelected = false;
            const question = currentQuestionBank[currentQuestionIndex];
            const questionElement =
                document.querySelector(".questions-content");
            const optionsElement = document.querySelector(".options ul");
            const rightMsg = document.querySelector(".right");
            const wrongMsg = document.querySelector(".wrong");

            // Reset the UI
            questionElement.textContent = question.question;
            optionsElement.innerHTML = "";
            rightMsg.style.display = "none";
            wrongMsg.style.display = "none";
            nextButton.disabled = true;

            nextButton.textContent =
                currentQuestionIndex === currentQuestionBank.length - 1
                    ? "Finish"
                    : "Next";

            if (question.questionType === "mcq") {
                question.options.forEach((option) => {
                    const optionElement = document.createElement("li");
                    optionElement.textContent = option;
                    optionsElement.appendChild(optionElement);

                    optionElement.addEventListener("click", function () {
                        if (!answerSelected) {
                            handleAnswer(option, question.answer);
                            optionElement.classList.add("selected");
                        }
                    });
                });
            } else if (question.questionType === "text") {
                const inputGroup = document.createElement("div");
                inputGroup.className = "input-group";

                const inputElement = document.createElement("input");
                inputElement.type = "text";
                inputElement.placeholder = "Enter text";

                const submitButton = document.createElement("button");
                submitButton.textContent = "Submit";
                submitButton.className = "submit-answer";

                inputGroup.appendChild(inputElement);
                inputGroup.appendChild(submitButton);
                optionsElement.appendChild(inputGroup);

                submitButton.addEventListener("click", function () {
                    if (!answerSelected && inputElement.value.trim()) {
                        handleAnswer(
                            inputElement.value.trim().toLowerCase(),
                            question.answer.toLowerCase()
                        );
                    }
                });

                inputElement.addEventListener("keyup", function (event) {
                    if (
                        event.key === "Enter" &&
                        !answerSelected &&
                        inputElement.value.trim()
                    ) {
                        handleAnswer(
                            inputElement.value.trim().toLowerCase(),
                            question.answer.toLowerCase()
                        );
                    }
                });
            } else if (question.questionType === "number") {
                const inputGroup = document.createElement("div");
                inputGroup.className = "input-group";

                const inputElement = document.createElement("input");
                inputElement.type = "number";
                inputElement.placeholder = "Enter number";


                const submitButton = document.createElement("button");
                submitButton.textContent = "Submit";
                submitButton.className = "submit-answer";

                inputGroup.appendChild(inputElement);
                inputGroup.appendChild(submitButton);
                optionsElement.appendChild(inputGroup);

                submitButton.addEventListener("click", function () {
                    if (!answerSelected && inputElement.value !== "") {
                        handleAnswer(
                            Number(inputElement.value),
                            question.answer
                        );
                    }
                });

                inputElement.addEventListener("keyup", function (event) {
                    if (
                        event.key === "Enter" &&
                        !answerSelected &&
                        inputElement.value !== ""
                    ) {
                        handleAnswer(
                            Number(inputElement.value),
                            question.answer
                        );
                    }
                });
            }
        }

        function handleAnswer(userAns, correctAns) {
            answerSelected = true;
            const isCorrect = userAns === correctAns;

            if (isCorrect) {
                score++;
                document.querySelector(".right").style.display = "block";
                document.querySelector(".wrong").style.display = "none";
            } else {
                document.querySelector(".wrong").style.display = "block";
                document.querySelector(".correct-answer").textContent = `Correct answer: ${correctAns}`;
            }

            nextButton.disabled = false;
            updateScore();
        }

        function updateScore() {
            console.log(
                `Current Score: ${score}/${currentQuestionBank.length}`
            );
        }

        function endQuiz() {
            questionContainer.innerHTML = `
            <img src="./images/quizend.jpg" alt="quizEnd">    
            <div class="scoreElement">
                    <h1>Quiz Completed</h1>
                    <h2>${currentSection.sectionTitle}</h2>
                    <p>Your Final Score: ${score}/${currentQuestionBank.length}</p>
                    <button id="home-btn">Return Home</button>
                </div>
            `;

            document
                .getElementById("home-btn")
                .addEventListener("click", function () {
                    mainContent.style.display = "";
                    body.style.backgroundImage = "";
                    questionContainer.style.display = "none";
                });
        }
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
});

