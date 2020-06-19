# MatQuiz

A Single Page Application for answering fill-in-the-blank style questions. With a clean interface designed for phones first.

#### Try a live demo at [http://quiz.thestaticcow.dk/#/quiz/animals_and_definite.json](http://quiz.thestaticcow.dk/#/quiz/animals_and_definite.json)

![Question Mistake](/demo/example_mistake.jpg) ![Question Correct](/demo/example_correct.jpg) ![Question Grade](/demo/example_grade.jpg)

## What it does

- Constructs quizzes from a single json file
  - A quiz contains many questions, each with a separate "page"
- Provides feedback to the user whether the answers given for a question are correct.
- Provides a grade upon completion of a quiz.
- Allows searching for available quizzes.
  - Gives relevant suggestions as you type.

## How it works

The site was built in vue as a learning exercise. The goal was to learn how to use a modern framework for building single page applications.

### Constructing the quizzes

Each quiz is constructed from a single JSON file containing a list of questions. Each question contains the question text itself along with the correct answer, of which there can be multiple for each blank, and an optional placeholder text.

The Application keeps track of correct anwers for each question and will grade the Quiz upon completion.

The following is an examaple of a json file containing a quiz.

```json
{
    "title":"Animals and Definite",
    "description":"...",
    "questions": [
      {
        "sentence": "Jes står op om _ og fodrer sine _ masser af mad.",
        "answers": ["morgenen", "kyllinger"],
        "placeholders": ["the morning", "chickens"]
      },
      {
          "sentence": "Derefter laver han _ til _ familie.",
          "answers": ["morgenmad", "sin"],
          "placeholders": ["breakfast", "his"]
      },
      {
          "sentence": "Jes har _ børn. En pige og en dreng. _ hedder Nina og _ hedder Mads.",
          "answers": ["to", "pigen", "drengen"],
          "placeholders": ["two", "the girl", "the boy"]
      }
    ]
}
```

### Backend - Serving quizzes and search suggestions

The backend for serving search suggestions was build in nodejs, using express. This is not an optimal implementation and is on my wishlist for improvement if I get back to this project.
