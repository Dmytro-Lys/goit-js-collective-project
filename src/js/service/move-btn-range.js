const buttonRange = document.querySelectorAll('.btn-range');

const isMovedRight = localStorage.getItem('isMovedRight') === 'true';

setRangeState(isMovedRight);

buttonRange.forEach(function (button) {
  button.addEventListener('click', toggleRangeState);
});

const currentTheme = localStorage.getItem('theme');

setTheme(currentTheme);

function toggleRangeState() {
  let isMovedRight = localStorage.getItem('isMovedRight') === 'true';
  const newRangeState = !isMovedRight;
  localStorage.setItem('isMovedRight', newRangeState);
  setRangeState(newRangeState);
  setTheme(newRangeState ? 'dark' : 'light');
}

function setRangeState(isMovedRight) {
  const ellipseIcons = document.querySelectorAll('.ellipse-icon');
  ellipseIcons.forEach(function (ellipseIcon) {
    if (isMovedRight) {
      ellipseIcon.classList.add('move-right');
    } else {
      ellipseIcon.classList.remove('move-right');
    }
  });
}

function setTheme(theme) {
  // Update the theme
  if (theme === 'dark') {
    localStorage.setItem('theme', 'dark');
    document.body.classList.add('dark-theme');
  } else {
    localStorage.setItem('theme', 'light');
    document.body.classList.remove('dark-theme');
  }
}

if (localStorage.getItem('isMovedRight') === null) {
  localStorage.setItem('isMovedRight', 'false');
}

if (localStorage.getItem('theme') === null) {
  localStorage.setItem('theme', 'light');
}
