const ellipseIcon = document.querySelector('.ellipse-icon');
const rectangleIcon = document.querySelector('.rectangle-icon');
const buttonRange = document.querySelector('.btn-range');

buttonRange.addEventListener('click', moveRange);

function moveRange() {
  const isMovedRight = ellipseIcon.classList.contains('move-right');

  if (isMovedRight) {
    ellipseIcon.classList.remove('move-right');
    ellipseIcon.classList.add('move-left');
  } else {
    ellipseIcon.classList.remove('move-left');
    ellipseIcon.classList.add('move-right');
  }
}
