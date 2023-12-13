import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';
import 'slim-select/dist/slimselect.css';

const loaderClass = document.querySelector('.loader');
const catClass = document.querySelector('.cat-info');
const breedClass = document.querySelector('.breed-select');
const isHidden = document.querySelector('.is-hidden');


import { fetchBreeds, fetchCatByBreed } from '/src/js/cat-api.js';

breedClass.style.display = 'none';

const showError = () => {
  Notiflix.Notify.failure(
    'Oops! Something went wrong! Try reloading the page!'
  );
};

breedClass.addEventListener('change', function () {
  const breedChange = breedClass.value;
  catClass.innerHTML = '';
  
  loaderClass.style.display = 'block';
  fetchCatByBreed(breedChange)
    .then(breeds => {
      breedClass.style.display = 'none';
      const catData = breeds[0];
      catClass.innerHTML = `<div><img src="${catData.url}" style="border: 1px solid black; width: 450px;"/></div>
  <div>
    <h2>${catData.breeds[0].name}</h2>
    <p>${catData.breeds[0].description}</p>
    <p>Temperament: ${catData.breeds[0].temperament}</p>
  </div>`;
    })
    .catch(error => {
      breedClass.style.display = 'none';
      showError();
    })
    .finally(() => {
      loaderClass.style.display = 'none';
    });
});

fetchBreeds()
  .then(breeds => {
    breedClass.style.display = 'block';
    loaderClass.style.display = 'none';
    const cats = breeds
      .map(breed => `<option value="${breed.id}">${breed.name}</option>`)
      .join('');
    breedClass.insertAdjacentHTML('beforeend', cats);
    new SlimSelect({ select: breedClass });
  })
  .catch(error => {
    breedClass.style.display = 'none';
    showError();
  })
  .finally(() => {
    loaderClass.style.display = 'none';
  });
