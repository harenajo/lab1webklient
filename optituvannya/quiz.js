document.addEventListener("DOMContentLoaded", function() {
  const quizContainer = document.getElementById('question-container');
  const resultContainer = document.getElementById('result-container');
  const submitButton = document.getElementById('submit-btn');
  const scoreContainer = document.getElementById('score');

  let questions = [];

  function buildQuiz() {
      questions.forEach((question, index) => {
          const questionDiv = document.createElement('div');
          questionDiv.classList.add('question');
          questionDiv.innerHTML = `<h3>${index + 1}. ${question.question}</h3>`;
          
          if (question.type === 'choice') {
              question.answers.forEach(answer => {
                  const label = document.createElement('label');
                  const radioBtn = document.createElement('input');
                  radioBtn.type = 'radio';
                  radioBtn.name = `question${index}`;
                  radioBtn.value = answer;
                  label.appendChild(radioBtn);
                  label.appendChild(document.createTextNode(answer));
                  questionDiv.appendChild(label);
              });
          } else if (question.type === 'multiple_choice') {
              question.answers.forEach(answer => {
                  const label = document.createElement('label');
                  const checkbox = document.createElement('input');
                  checkbox.type = 'checkbox';
                  checkbox.name = `question${index}`;
                  checkbox.value = answer;
                  label.appendChild(checkbox);
                  label.appendChild(document.createTextNode(answer));
                  questionDiv.appendChild(label);
              });
          } else if (question.type === 'text_entry') {
              const input = document.createElement('input');
              input.type = 'text';
              input.name = `question${index}`;
              questionDiv.appendChild(input);
          } else if (question.type === 'numeric_entry') {
              const input = document.createElement('input');
              input.type = 'number';
              input.name = `question${index}`;
              questionDiv.appendChild(input);
          }
          
          quizContainer.appendChild(questionDiv);
      });
  }
  
  function showResults() {
      const answerContainers = quizContainer.querySelectorAll('.question');
      let score = 0;
      
      questions.forEach((question, index) => {
          const answerContainer = answerContainers[index];
          let userAnswer;
          if (question.type === 'choice') {
              const selectedOption = answerContainer.querySelector(`input[name=question${index}]:checked`);
              userAnswer = selectedOption ? selectedOption.value : undefined;
          } else if (question.type === 'multiple_choice') {
              const selectedOptions = [...answerContainer.querySelectorAll(`input[name=question${index}]:checked`)];
              userAnswer = selectedOptions.map(option => option.value).sort();
          } else if (question.type === 'text_entry') {
              userAnswer = answerContainer.querySelector(`input[name=question${index}]`).value.trim();
          } else if (question.type === 'numeric_entry') {
              userAnswer = parseInt(answerContainer.querySelector(`input[name=question${index}]`).value.trim());
          }
          
          if (Array.isArray(question.correct_answer)) {
              if (JSON.stringify(userAnswer) === JSON.stringify(question.correct_answer.sort())) {
                  score++;
                  answerContainer.classList.add('correct');
              } else {
                  answerContainer.classList.add('incorrect');
              }
          } else {
              if (userAnswer === question.correct_answer) {
                  score++;
                  answerContainer.classList.add('correct');
              } else {
                  answerContainer.classList.add('incorrect');
              }
          }
      });
  
      scoreContainer.textContent = `Ваш результат: ${score} з ${questions.length}`;
      resultContainer.style.display = 'block';
  }
  

  submitButton.addEventListener('click', showResults);

  // Fetch questions from JSON file
  fetch('quiz.json')
      .then(response => response.json())
      .then(data => {
          questions = data.questions;
          buildQuiz();
      })
      .catch(error => console.error('Error fetching questions:', error));
});
