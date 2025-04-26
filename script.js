
document.addEventListener('gesturestart', e => e.preventDefault());

let baseE1RM = null;

document.querySelectorAll('.set-block').forEach(block => {
  const btn = block.querySelector('.finish-btn');
  const weight = block.querySelector('.weight');
  const reps = block.querySelector('.reps');
  const rpe = block.querySelector('.rpe');
  const rest = block.querySelector('.rest');
  const setNumber = parseInt(block.dataset.set);

  let timer = null;

  btn.addEventListener('click', () => {
    if (!btn.classList.contains('active')) {
      btn.classList.add('active');
      btn.textContent = "Done";
      weight.readOnly = reps.readOnly = true;
      rpe.disabled = true;

      let countdown = 90;
      timer = setInterval(() => {
        if (countdown > 0) {
          rest.textContent = "Rest: " + countdown + "s";
          countdown--;
        } else {
          rest.textContent = "Rest: FIGHT!";
          clearInterval(timer);
        }
      }, 1000);

      const w = parseFloat(weight.value);
      const r = parseInt(reps.value);
      const rp = parseInt(rpe.value);
      if (!isNaN(w) && !isNaN(r) && !isNaN(rp)) {
        const e1rm = Math.round(w * (1 + r * 0.0333));
        if (setNumber === 1) {
          baseE1RM = e1rm;
        } else if (baseE1RM) {
          const fatigue = 1 - (e1rm / baseE1RM);
          if (fatigue > 0.05) {
            weight.value = Math.max(0, Math.round((w - 2.5) * 2) / 2);
            weight.classList.add('autoregulated');
          } else if (fatigue < -0.03) {
            weight.value = Math.round((w + 2.5) * 2) / 2;
            weight.classList.add('autoregulated');
          }
        }
      }
    } else {
      btn.classList.remove('active');
      btn.textContent = "Finish";
      weight.readOnly = reps.readOnly = false;
      rpe.disabled = false;
      clearInterval(timer);
      rest.textContent = "Rest: 90s";
    }
  });
});
