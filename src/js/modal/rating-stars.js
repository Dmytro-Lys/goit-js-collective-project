const ratingIcons = document.querySelectorAll('.rating-modal-form-icon');
        const ratingValueInput = document.getElementById('ratingValue');

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

                ratingValueInput.value = ratingValue;
            });
        });