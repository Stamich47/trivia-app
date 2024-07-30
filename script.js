const triviaContainer = document.getElementById('container');
const numberOfQuestions = 5;

document.addEventListener('DOMContentLoaded', () => {
  fetch(`https://opentdb.com/api.php?amount=${numberOfQuestions}`)
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

        const allOptions = [
          ...trivia.incorrect_answers,
          trivia.correct_answer,
        ].sort(() => Math.random() - 0.5);
        allOptions.forEach((option) => {
          const optionElement = document.createElement('div');
          optionElement.className = 'option';
          optionElement.innerHTML = option;
          optionsElement.appendChild(optionElement);
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
