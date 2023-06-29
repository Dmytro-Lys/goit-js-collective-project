const form = document.getElementById('ratingForm');
const ratingIcons = document.querySelectorAll('.rating-modal-form-icon');

ratingIcons.forEach(function (icon) {
    icon.addEventListener('click', function () {
        const ratingValue = this.getAttribute('data-rating');

        ratingIcons.forEach(function (icon) {
            if (icon.getAttribute('data-rating') <= ratingValue) {
                icon.classList.add('active');
            } else {
                icon.classList.remove('active');
            }
        });
    });
});

form.addEventListener('submit', function (e) {
    e.preventDefault();
    const selectedRating = document.querySelector('.rating-modal-form-icon.active');

    if (selectedRating) {
        const ratingValue = selectedRating.getAttribute('data-rating');
        alert('You rated: ' + ratingValue + ' stars');
      
    } else {
        alert('Please select a rating');
    }
});