const ellipseIcons = document.querySelectorAll('.ellipse-icon');
const buttonRanges = document.querySelectorAll('.btn-range');

buttonRanges.forEach(function (button) {
  button.addEventListener('click', moveRange);
});

function moveRange(event) {
  const button = event.currentTarget;
  const ellipseIcon = button.querySelector('.ellipse-icon');

  const isMovedRight = ellipseIcon.classList.contains('move-right');

  if (isMovedRight) {
    ellipseIcon.classList.remove('move-right');
    ellipseIcon.classList.add('move-left');
  } else {
    ellipseIcon.classList.remove('move-left');
    ellipseIcon.classList.add('move-right');
  }
}
