var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},n={},r=e.parcelRequire3556;null==r&&((r=function(e){if(e in t)return t[e].exports;if(e in n){var r=n[e];delete n[e];var i={id:e,exports:{}};return t[e]=i,r.call(i.exports,i,i.exports),i.exports}var o=Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,t){n[e]=t},e.parcelRequire3556=r);var i=r("ccqIN");const o=document.querySelectorAll(".category-btn"),s=document.querySelector(".favorites-hero");document.querySelector(".categories");const a=document.querySelector(".categories-list"),l=document.querySelector(".no-favorites"),c=document.querySelector(".favorites-cards");function d(){0===localStorage.length&&o.forEach(e=>{e.classList.add("invisible")})}function u(){let e=window.innerWidth||document.documentElement.clientWidth;e<768?s.classList.add("invisible"):s.classList.remove("invisible")}window.addEventListener("DOMContentLoaded",d),d(),u(),window.addEventListener("load",u),window.addEventListener("resize",u),async function(){try{let e=await (0,i.loadFavoritCategories)();e&&e.forEach(e=>{a.insertAdjacentHTML("beforeend",'<li><button class="category-btn"> '+e+"</button></li>")})}catch(e){console.error(e.message)}}(),function(){let e=(0,i.loadData)();e?l.style.display="none":l.style.display="flex"}();const f=(0,i.loadFavorit)(),v=f.map(function(e){let{title:t,description:n,preview:r,rating:i}=e;return`
    <li class="card_favorites" style="background-image: url(${r});">
      <svg class="heart-svg" width="22" height="22">
        <use href="/src/images/svg-sprite.svg#card-heart"></use>
      </svg>
      <h2 class="card-title">${t}</h2>
      <p class="card-text">${n}</p>
      <div class="rating-and-btn">
        <p class="rating">${i}</p>
        <button class="see-recipe-btn">See recipe</button>
      </div>
    </li>
  `}).join("");c.insertAdjacentHTML("beforeend",v),r("2nhTy"),r("2d9l9"),r("1SH0X");
//# sourceMappingURL=favorites.68d00629.js.map
