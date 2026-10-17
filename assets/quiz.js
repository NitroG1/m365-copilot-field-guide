// Quiz component. Markup:
// <div class="quiz" data-answer="2"><p class="q">...</p><div class="opts">
//   <button class="opt">...</button> x N</div><p class="feedback"></p>
//   <p class="why" hidden>Explanation shown after answering.</p></div>
// One click answers; feedback is immediate; a running score appears in .quiz-score.
(function () {
  var quizzes = document.querySelectorAll('.quiz');
  var score = { right: 0, done: 0, total: quizzes.length };
  var scoreEl = document.querySelector('.quiz-score');
  function render() {
    if (!scoreEl) return;
    scoreEl.textContent = score.done === 0 ? '' :
      'Score: ' + score.right + ' of ' + score.done + ' answered' +
      (score.done === score.total ? ' (all ' + score.total + ' done)' : '');
  }
  quizzes.forEach(function (quiz) {
    var answer = parseInt(quiz.getAttribute('data-answer'), 10);
    var opts = quiz.querySelectorAll('button.opt');
    var feedback = quiz.querySelector('.feedback');
    var why = quiz.querySelector('.why');
    opts.forEach(function (btn, i) {
      btn.addEventListener('click', function () {
        if (quiz.dataset.done) return;
        quiz.dataset.done = '1';
        var right = i === answer;
        btn.dataset.state = right ? 'right' : 'wrong';
        if (!right) opts[answer].dataset.state = 'right';
        opts.forEach(function (b) { b.disabled = true; });
        if (feedback) {
          feedback.textContent = right ? 'Right.' : 'Not that one.';
          feedback.className = 'feedback ' + (right ? 'right' : 'wrong');
        }
        if (why) why.hidden = false;
        score.done += 1; if (right) score.right += 1; render();
      });
    });
  });
})();
