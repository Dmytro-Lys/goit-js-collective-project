import { getAllData } from "./service/api";
// import axios from 'axios';

// axios.get('https://tasty-treats-backend.p.goit.global/api/events')
//   .then(response => {
//     const recipes = response.data;
//     renderPopularEvents(recipes);
//   })
//   .catch(error => {
//     console.error('Помилка:', error);
//   });



// const hero = document.querySelector('.hero-slider');

// function renderPopularEvents(events) {
//     const eventsHTML = events.map(event => `
//        <li class="recipe-item">
//         <div class="cook">
//             <img src="${event.cook.imgUrl}" alt="Cook Image" class="cook-image">
//             <h3 class="cook-name">${event.cook.name}</h3>
//         </div>
//         <div class="topic">
//             <img src="${event.topic.previewUrl}" alt="Preview Image" class="preview-image">
//             <h4 class="topic-name">${event.topic.name}</h4>
//             <p class="topic-details">Area: ${event.topic.area}</p>
//         </div>
//     </li>
//     `).join('');
//     hero.innerHTML = eventsHTML;
// }

import axios from 'axios';
import $ from 'jquery';
import slick from 'slick-carousel';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
// import 'flickity/dist/flickity.min.css';
// import Flickity from 'flickity';


axios.get('https://tasty-treats-backend.p.goit.global/api/events')
  .then(response => {
    const recipes = response.data; 
    renderPopularEvents(recipes);
  })
  .catch(error => {
    console.error('Помилка:', error);
  });

const hero = document.querySelector('.hero-slider');

function renderPopularEvents(recipes) {
    const recipeHTML = recipes.map(recipe => `
      
        <div class="masterclass">
            <img src="${recipe.cook.imgUrl}" alt="Cook Image" class="hero-image">
        </div>
        <div class="card-wrap">
            <img class="topic-hero" src="${recipe.topic.previewUrl}" alt="Preview Image" class="preview-image-hero">
            <p class="topic-name-hero">${recipe.topic.name}</p>
            <p class="topic-details-hero">${recipe.topic.area}</p>
        </div>
        <div>
             <img src="${recipe.topic.imgUrl}" alt="Cook Image" class="cook-image-hero">
             </div>
            
    
    `).join('');
    hero.innerHTML += recipeHTML;
  $(".hero-slider").slick({
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3
});
//    const flkty = new Flickity('.hero-slider', {
//   cellAlign: 'left',
//   groupCells: true,
//   contain: true
// });

}
var flkty = new Flickity('.hero-slider');
flkty.next();
  flkty.select(3);
  

