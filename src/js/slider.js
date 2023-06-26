import { getAllData } from "./service/api";

import axios from 'axios';
import $ from 'jquery';
import slick from 'slick-carousel';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';



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
            <p class="topic-country">${recipe.topic.area}</p>
        </div>
        <div class="cook-hero-div">
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

}

  

