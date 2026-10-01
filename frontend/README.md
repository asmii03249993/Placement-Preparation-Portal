# 🎓 Placement Preparation Portal

## 📌 Project Overview

**Placement Preparation Portal** is a full-stack web application
developed to help students prepare for technical placement interviews.

The application provides category-based technical questions, timed
tests, score calculation, score history, and randomized mock tests.

------------------------------------------------------------------------

## 🎯 Problem Statement

Students preparing for campus placements need a simple platform where
they can practice technical questions and test their knowledge.

This project provides a single portal where students can:

-   Select a technical subject.
-   Practice multiple-choice questions.
-   Complete questions within a time limit.
-   View their test result.
-   Store and view previous scores.
-   Take randomized mock tests.

------------------------------------------------------------------------

## ⭐ Assigned Features

The project implements all the assigned features:

1.  **Category Selection**
2.  **Technical Questions**
3.  **Timer**
4.  **Score History**
5.  **Mock Tests**

------------------------------------------------------------------------

## 🚀 Implemented Features

### 1. Category Selection

Students can select from different technical categories:

-   Java
-   Python
-   C Programming
-   C++
-   DBMS
-   Operating System
-   Computer Networks
-   Data Structures

### 2. Technical Questions

Each category contains multiple-choice technical questions.

The user selects one answer and moves to the next question.

### 3. Timer

A **10-minute timer** is provided during the technical test and mock
test.

The timer automatically counts down while the test is running.

### 4. Score Calculation

After completing a test, the application displays:

-   Total Questions
-   Correct Answers
-   Wrong Answers
-   Score Percentage

### 5. Score History

Test results are stored in MongoDB.

Students can view previous test results on the **Score History** page.

### 6. Mock Test

The mock test feature:

-   Allows category selection.
-   Randomizes questions.
-   Selects up to 10 questions.
-   Provides a timer.
-   Calculates the final score.
-   Saves the mock-test result.

### 7. REST API

The backend provides APIs for:

-   Getting questions.
-   Getting questions by category.
-   Adding questions.
-   Saving scores.
-   Getting score history.

------------------------------------------------------------------------

## 🛠️ Technologies Used

  Technology   Purpose
  ------------ -------------------------------
  HTML         Web page structure
  CSS          Styling and responsive design
  JavaScript   Frontend functionality
  Node.js      Backend runtime
  Express.js   REST API
  MongoDB      Database
  Mongoose     MongoDB connection and models
  Postman      API testing
  GitHub       Source code hosting

------------------------------------------------------------------------

## 📂 Project Structure

``` text
Placement-Preparation-Portal/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   │   ├── Question.js
│   │   └── Score.js
│   ├── routes/
│   │   ├── questionRoutes.js
│   │   └── scoreRoutes.js
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   ├── category.js
│   │   ├── questions.js
│   │   ├── score-history.js
│   │   └── mock-questions.js
│   ├── index.html
│   ├── questions.html
│   ├── score-history.html
│   ├── mock-test.html
│   └── mock-questions.html
│
├── screenshots/
│   ├── home-page.png
│   ├── technical-questions.png
│   ├── test-result.png
│   ├── score-history.png
│   ├── mock-test.png
│   └── postman-add-question.png
│
└── README.md
```

------------------------------------------------------------------------

## ⚙️ How to Run the Project

### Step 1: Start MongoDB

Make sure MongoDB is installed and running.

### Step 2: Open the Backend Folder

``` bash
cd C:\Placement-Preparation-Portal\backend
```

### Step 3: Install Dependencies

``` bash
npm install
```

### Step 4: Start the Backend

``` bash
npm run dev
```

The backend will run on:

``` text
http://localhost:5000
```

### Step 5: Open the Frontend

Open:

``` text
C:\Placement-Preparation-Portal\frontend\index.html
```

in a web browser.

------------------------------------------------------------------------

## 🔗 API Endpoints

### Get All Questions

``` text
GET http://localhost:5000/api/questions
```

### Get Questions by Category

Example:

``` text
GET http://localhost:5000/api/questions/Java
```

Other examples:

``` text
GET /api/questions/Python
GET /api/questions/DBMS
GET /api/questions/C++ 
```

### Add a Question

``` text
POST http://localhost:5000/api/questions
```

Example request:

``` json
{
  "category": "Java",
  "question": "Which keyword is used to create a subclass in Java?",
  "options": [
    "this",
    "extends",
    "super",
    "static"
  ],
  "correctAnswer": "extends"
}
```

### Save Score

``` text
POST http://localhost:5000/api/scores
```

### Get Score History

``` text
GET http://localhost:5000/api/scores
```

------------------------------------------------------------------------

# 📸 Screenshots

The following screenshots are from the working project.

## 1. Home Page -- Category Selection

The home page allows the student to select a technical category and
access score history or mock tests.

![Home Page](screenshots/home-page.png)

------------------------------------------------------------------------

## 2. Technical Questions

The technical test displays the current question, answer options,
question number, and remaining time.

![Technical Questions](screenshots/technical-questions.png)

------------------------------------------------------------------------

## 3. Test Result

After completing the test, the application displays the total questions,
correct answers, wrong answers, and percentage score.

![Test Result](screenshots/test-result.png)

------------------------------------------------------------------------

## 4. Score History

The score history page displays previous test results stored in the
MongoDB database.

![Score History](screenshots/score-history.png)

------------------------------------------------------------------------

## 5. Mock Test

Students can select a category and start a randomized mock test.

![Mock Test](screenshots/mock-test.png)

------------------------------------------------------------------------

## 6. Add Question Using Postman

The question API was tested using Postman. A new Java question was
successfully added through the POST API.

![Postman Add Question](screenshots/postman-add-question.png)

------------------------------------------------------------------------

# 🧪 Testing

The application was tested for the following features:

  Test                          Status
  ----------------------------- ------------------------
  Home page loading             ✅ Passed
  Category selection            ✅ Passed
  Technical questions loading   ✅ Passed
  Answer selection              ✅ Passed
  Next Question                 ✅ Passed
  10-minute timer               ✅ Passed
  Score calculation             ✅ Passed
  Score saving                  ✅ Passed
  Score history                 ✅ Passed
  Mock test                     ✅ Passed
  Random questions              ✅ Passed
  Question API                  ✅ Tested with Postman
  MongoDB connection            ✅ Passed

------------------------------------------------------------------------

# 🤖 AI Assistance

AI was used as a **learning and development assistant** during the
project.

AI assistance was used for:

-   Understanding the assignment requirements.
-   Planning the application structure.
-   Creating HTML, CSS, and JavaScript code.
-   Creating Node.js and Express APIs.
-   Creating MongoDB/Mongoose models.
-   Debugging backend errors.
-   Debugging frontend and API connection issues.
-   Understanding Postman API testing.
-   Creating the timer functionality.
-   Implementing score history.
-   Implementing randomized mock tests.
-   Preparing project documentation.

### Example Prompts Used

``` text
Give me step-by-step code for a Placement Preparation Portal.
```

``` text
Create a Node.js Express API for technical questions.
```

``` text
Create a MongoDB schema for questions and scores.
```

``` text
Add a 10-minute timer to the technical test.
```

``` text
Create score history using MongoDB.
```

``` text
Create a randomized mock test.
```

``` text
Help me debug the frontend and backend connection.
```

------------------------------------------------------------------------

# 🔐 Database

The application uses **MongoDB** to store:

### Questions

Questions contain:

-   Category
-   Question
-   Options
-   Correct Answer

### Scores

Scores contain:

-   Category
-   Total Questions
-   Correct Answers
-   Wrong Answers
-   Score
-   Date

------------------------------------------------------------------------

# 💡 Future Enhancements

Possible future improvements include:

-   Student login and registration.
-   Admin dashboard.
-   More technical questions.
-   Difficulty levels.
-   Topic-wise performance analysis.
-   Leaderboard.
-   Search and filter options.
-   Detailed answer explanations.
-   Progress charts.
-   User profile.

------------------------------------------------------------------------

# 🏁 Conclusion

The **Placement Preparation Portal** is a working full-stack application
that provides students with a simple way to prepare for technical
placement interviews.

It implements the complete assigned feature set:

**Category Selection → Technical Questions → Timer → Score History →
Mock Tests**

The project uses a frontend, backend, and MongoDB database and has been
tested using the web application and Postman APIs.

------------------------------------------------------------------------

## 👩‍💻 Author

**Final Year Student Project**

**Project Title:** Placement Preparation Portal
