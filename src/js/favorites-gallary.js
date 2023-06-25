
const categoryBtns = document.querySelectorAll('.category-btn');
const heroImage = document.querySelector('.favorites-hero')

window.addEventListener('DOMContentLoaded', hideCategories)

function hideCategories() {
    if (localStorage.length !== 0) {
        return;
    }
    else {
        categoryBtns.forEach(btn => {
            btn.classList.add('invisible')
        });
    }
}

function hideHeroImageLess768() {
    const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
    if (viewportWidth < 768) {
        heroImage.classList.add('invisible');
    }
    else {
        heroImage.classList.remove('invisible');
    }
}

window.addEventListener("load", hideHeroImageLess768);
window.addEventListener("resize", hideHeroImageLess768);