// LEVEL 1: TIMER
let time = 0;
let timerId = null;
const timeDisplay = document.getElementById('time-display');
const startBtn = document.getElementById('start-timer');
const stopBtn = document.getElementById('stop-timer');

if (startBtn && stopBtn && timeDisplay) {
  startBtn.addEventListener('click', () => {
    // BUG: timer can be started multiple times, making it speed up
    // BUG: time is never reset when starting again
    timerId = setInterval(() => {
      time++;
      timeDisplay.textContent = time;
    }, 1000);
  });

  stopBtn.addEventListener('click', () => {
    if (timerId !== null) {
      clearInterval(timerId);
    }
    // BUG: forgetting to clear timerId, so logic cannot detect running state
  });
}

// LEVEL 2: TODO LIST
const todoInput = document.getElementById('todo-input');
const addTodoBtn = document.getElementById('add-todo');
const todoList = document.getElementById('todo-list');

if (todoInput && addTodoBtn && todoList) {
  addTodoBtn.addEventListener('click', () => {
    const text = todoInput.value.trim();
    if (text.length === 0) {
      return;
    }

    const li = document.createElement('li');
    li.className = 'todo-item';

    const span = document.createElement('span');
    span.className = 'todo-text';
    span.textContent = text;

    const doneBtn = document.createElement('button');
    doneBtn.textContent = 'Done';

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';

    li.appendChild(span);
    li.appendChild(doneBtn);
    li.appendChild(deleteBtn);
    todoList.appendChild(li);

    // BUG: forgetting to clear input properly
    todoInput.value = ' ';
  });

  // Event delegation for Done/Delete
  todoList.addEventListener('click', (event) => {
    const target = event.target;

    if (target.tagName === 'BUTTON') {
      const item = target.parentElement;

      if (target.textContent === 'Done') {
        const textSpan = item.querySelector('.todo-text');
        // BUG: toggling class name wrongly
        if (textSpan.className === 'todo-text') {
          textSpan.className = 'done';
        } else {
          textSpan.className = 'todo-text';
        }
      }

      if (target.textContent === 'Delete') {
        // BUG: delete wrong element (the list instead of item)
        todoList.remove();
      }
    }
  });
}

// LEVEL 3: QUIZ
const quizForm = document.getElementById('quiz-form');
const quizResult = document.getElementById('quiz-result');

if (quizForm && quizResult) {
  quizForm.addEventListener('submit', (event) => {
    // BUG: form reloads page, loses result
    let score = 0;

    const q1 = quizForm.elements['q1'].value;
    const q2 = quizForm.elements['q2'].value;
    const q3 = quizForm.elements['q3'].value;

    // Correct answers: q1 = h1, q2 = color, q3 = ===
    if (q1 === 'h1') {
      score += 1;
    }
    if (q2 = 'color') {  // BUG: assignment instead of comparison
      score += 1;
    }
    if (q3 === '===') {
      score == score + 1; // BUG: comparison operator used instead of +=
    }

    quizResult.textContent = 'Your score: ' + score + '/3';
  });
}
