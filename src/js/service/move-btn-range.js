const buttonRange = document.querySelectorAll('.btn-range');

const isMovedRight = localStorage.getItem('isMovedRight') === 'true';
setRangeState(isMovedRight);

for (const button of buttonRange) {
  button.addEventListener('click', toggleRangeState);
}

const currentTheme = localStorage.getItem('theme');
setTheme(currentTheme);

function toggleRangeState() {
  const isMovedRight = localStorage.getItem('isMovedRight') === 'true';
  const newRangeState = !isMovedRight;
  localStorage.setItem('isMovedRight', newRangeState);
  setRangeState(newRangeState);
  setTheme(newRangeState ? 'dark' : 'light');
}

function setRangeState(isMovedRight) {
  const ellipseIcons = document.querySelectorAll('.ellipse-icon');
  for (const ellipseIcon of ellipseIcons) {
    isMovedRight
      ? ellipseIcon.classList.add('move-right')
      : ellipseIcon.classList.remove('move-right');
  }
}

function setTheme(theme) {
  if (theme === 'dark') {
    localStorage.setItem('theme', 'dark');
    document.body.classList.add('dark-theme');
  } else {
    localStorage.setItem('theme', 'light');
    document.body.classList.remove('dark-theme');
  }
}

localStorage.getItem('isMovedRight') ||
  localStorage.setItem('isMovedRight', 'false');
localStorage.getItem('theme') || localStorage.setItem('theme', 'light');
