# Quiz Application

A dynamic and interactive quiz application built with JavaScript, HTML, and CSS. This project fetches quiz data from a JSON file and provides a random quiz feature, as well as category-based quizzes for users. The app supports multiple question types such as multiple-choice, text-based answers, and number-based answers.

## Features

- **Category-based Quizzes**: Categories like General Knowledge, Science, Mathematics, and Indian History.
- **Random Quiz Button**: Allows users to start a random quiz from any available category.
- **Multiple Question Types**:
  - Multiple Choice Questions (MCQ)
  - Text-based questions
  - Number-based questions
- **Shuffle Questions**: Questions are shuffled randomly within each category.
- **Score Tracking**: The application tracks and displays the user's score after completing the quiz.
- **Responsive UI**: Designed to be user-friendly and responsive for desktop and mobile devices.

## Technologies Used

- **HTML**: Structure of the application
- **CSS**: Styling for the UI
- **JavaScript**: Logic to handle the quiz functionalities, including fetching data from JSON, shuffle logic, and event handling.
- **JSON**: Data source for quiz categories and questions

## Getting Started

- Open the project in your browser:
- Open the index.html file in your web browser:

Or simply drag the index.html file into the browser window.

#### Start Playing:
- You can start by selecting any quiz category.
- You can also use the random quiz button to start a quiz from a random category.

## File Structure
```bash
Copy code

quiz-app/
│
├── images/                # Contains images used in the project
│   ├── gk.jpg
│   ├── science (1).jpg
│   ├── maths.jpg
│   └── history.jpg
│
├── quiz-data.json         # JSON file containing quiz categories and questions
├── index.html             # Main HTML file
├── style.css              # Stylesheet for the project
└── script.js              # JavaScript file containing quiz logic
```

## JSON Data Structure

```json
{
  "sections": [
    {
      "sectionTitle": "General Knowledge",
      "questions": [
        {
          "question": "What is the capital of France?",
          "questionType": "mcq",
          "options": ["Paris", "London", "Berlin", "Madrid"],
          "answer": "Paris"
        },
        {
          "question": "Who wrote 'Hamlet'?",
          "questionType": "text",
          "answer": "Shakespeare"
        }
      ]
    },
    {
      "sectionTitle": "Science",
      "questions": [
        {
          "question": "What is the chemical symbol for water?",
          "questionType": "mcq",
          "options": ["H2O", "O2", "CO2", "H2"],
          "answer": "H2O"
        },
        {
          "question": "How many planets are in our solar system?",
          "questionType": "number",
          "answer": 8
        }
      ]
    }
  ]
}

```