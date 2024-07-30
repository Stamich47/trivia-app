const triviaContainer = document.getElementById('container');
const numberOfQuestions = 5;

document.addEventListener('DOMContentLoaded', () => {
  fetch(
    `https://opentdb.com/api.php?amount=${numberOfQuestions}&difficulty=medium`
  )
    .then((response) => response.json())
    .then((data) => {
      const questions = data.results;
      console.log(data.results);

      questions.forEach((trivia) => {
        const triviaCard = document.createElement('div');
        triviaCard.className = 'trivia-card';

        const questionElement = document.createElement('div');
        questionElement.className = 'question';
        questionElement.innerHTML = trivia.question;
        triviaCard.appendChild(questionElement);

        const optionsElement = document.createElement('div');
        optionsElement.className = 'options';

        if (trivia.difficulty === 'easy') {
          triviaCard.style.backgroundColor = '#93f5ac';
        } else if (trivia.difficulty === 'medium') {
          triviaCard.style.backgroundColor = '#f2f593';
        } else {
          triviaCard.style.backgroundColor = '#f59393';
        }

        const allOptions = [
          ...trivia.incorrect_answers,
          trivia.correct_answer,
        ].sort(() => Math.random() - 0.5);
        allOptions.forEach((option) => {
          const optionElement = document.createElement('div');
          optionElement.className = 'option';
          optionElement.innerHTML = option;
          optionsElement.appendChild(optionElement);

          optionElement.addEventListener('click', () => {
            // Clear previous highlights
            optionsElement.querySelectorAll('.option').forEach((opt) => {
              opt.classList.remove('correct', 'incorrect');
            });

            // Highlight selected option
            if (option === trivia.correct_answer) {
              optionElement.classList.add('correct');
            } else {
              optionElement.classList.add('incorrect');
            }
          });
        });

        triviaCard.appendChild(optionsElement);
        triviaContainer.appendChild(triviaCard);
      });
    })
    .catch((error) => {
      triviaContainer.innerHTML = 'Failed to load questions.';
      console.error('Error fetching the trivia questions:', error);
    });
});
