// LEVEL 1: TIMER
let time = 0;
let timerId = null;
const timeDisplay = document.getElementById('time-display');
const startBtn = document.getElementById('start-timer');
const stopBtn = document.getElementById('stop-timer');

if (startBtn && stopBtn && timeDisplay) {
  startBtn.addEventListener('click', () => {
    // MEDIUM BUG #1: multiple intervals can be started; no guard
    // (fix would be: only create a new interval if timerId is null)
    timerId = setInterval(() => {
      time++;
      timeDisplay.textContent = time;
    }, 1000);
  });

  stopBtn.addEventListener('click', () => {
    if (timerId !== null) {
      clearInterval(timerId);
      // EASY BUG: timerId is never reset, so code cannot detect stopped state
      // (fix would be: timerId = null;)
    }
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

    // MEDIUM BUG #2: input not cleared correctly (leaves a space)
    // (fix would be: todoInput.value = '';)
    todoInput.value = ' ';
  });

  // Event delegation for Done/Delete
  todoList.addEventListener('click', (event) => {
    const target = event.target;

    if (target.tagName === 'BUTTON') {
      const item = target.parentElement;

      if (target.textContent === 'Done') {
        const textSpan = item.querySelector('.todo-text');
        if (!textSpan) return;

        // This part is actually correct (no bug here).
        if (textSpan.className === 'todo-text') {
          textSpan.className = 'done';
        } else {
          textSpan.className = 'todo-text';
        }
      }

      if (target.textContent === 'Delete') {
        // HARD BUG: removes the entire list instead of just the clicked item
        // (fix would be: todoList.removeChild(item); or item.remove();)
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
    // NOTE: this time we PREVENT default, so page won't reload
    event.preventDefault();

    let score = 0;

    const q1 = quizForm.elements['q1'].value;
    const q2 = quizForm.elements['q2'].value;
    const q3 = quizForm.elements['q3'].value;

    // Correct answers: q1 = h1, q2 = color, q3 = ===
    if (q1 === 'h1') {
      score += 1;
    }
    if (q2 === 'color') {
      score += 1;
    }
    if (q3 === '===') {
      score += 1;
    }

    quizResult.textContent = 'Your score: ' + score + '/3';
  });
}

