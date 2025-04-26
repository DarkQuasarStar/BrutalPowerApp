
document.addEventListener('gesturestart', e => e.preventDefault());

document.querySelectorAll('.finish-btn').forEach(btn => {
  const restText = btn.closest('.set-block').querySelector('.rest');
  let timer = null;

  btn.addEventListener('click', () => {
    if (btn.textContent === 'Finish') {
      btn.textContent = 'Done';
      let countdown = 90;
      restText.textContent = "Rest: 90s";
      timer = setInterval(() => {
        countdown--;
        if (countdown > 0) {
          restText.textContent = "Rest: " + countdown + "s";
        } else {
          restText.textContent = "Rest: FIGHT!";
          clearInterval(timer);
        }
      }, 1000);
    } else {
      btn.textContent = 'Finish';
      clearInterval(timer);
      restText.textContent = "Rest: 90s";
    }
  });
});
