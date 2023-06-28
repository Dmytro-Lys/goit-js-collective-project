// // import { remove } from 'lodash';
// import { getAllData } from './service/api.js';
// import { getFilterRecipes } from './service/api.js';

// const refs = {
//   container: document.getElementById('all-categories'),
//   toClearBtn: document.getElementById('all-ctg-btn'),
//   list: document.getElementById('list'),
//   btnCtg: document.querySelector('.dishes'),
//   markup: document.querySelector('.markup'),
// };

// refs.btnCtg.addEventListener('click', async () => {
//   try {
//     const recepies = await fetchUsers();
//     renderUserListItems(recepies);
//   } catch (error) {
//     console.log(error.message);
//   }
// });
// async function fetchUsers() {
//   const baseUrl = getAllData();
//   const userIds = [1, 2, 3, 4, 5];

//   const arrayOfPromises = userIds.map(async userId => {
//     const response = await fetch(`${baseUrl}/_id/${userId}`);
//     return response.json();
//   });

//   const users = await Promise.all(arrayOfPromises);
//   return users;
// }

// function renderUserListItems(users) {
//   const markup = users
//     .map(
//       user => `<li class="item">
//           <p><b>Name</b>: ${user.name}</p>
//           <p><b>Email</b>: ${user.email}</p>
//           <p><b>Company</b>: ${user.company.name}</p>
//         </li>`
//     )
//     .join('');
//   refs.markup.innerHTML = markup;
// }
