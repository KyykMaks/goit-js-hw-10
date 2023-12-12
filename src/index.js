import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';
import 'slim-select/dist/slimselect.css';

const loaderClass = document.querySelector('.loader');
const catClass = document.querySelector('.cat-info');
const breedClass = document.querySelector('.breed-select');

import { fetchBreeds, fetchCatByBreed } from './cat-api';

breedClass.style.visibility = 'hidden';

const showError = () => {
  Notiflix.Notify.failure(
    'Oops! Something went wrong! Try reloading the page!'
  );
};

const updateCatClass = catData => {
  catClass.innerHTML = `<div><img src="${catData.url}" style="border: 1px solid black; width: 450px;"/></div>
  <div>
    <h2>${catData.breeds[0].name}</h2>
    <p>${catData.breeds[0].description}</p>
    <p>Temperament: ${catData.breeds[0].temperament}</p>
  </div>
`;
  loaderClass.style.display = 'none';
};

const handleChange = async () => {
  const breedChange = breedClass.value;
  catClass.innerHTML = '';
  loaderClass.style.display = 'block';

  try {
    const breeds = await fetchCatByBreed(breedChange);
    breedClass.style.display = 'none';
    updateCatClass(breeds[0]);
  } catch (error) {
    breedClass.style.display = 'none';
    showError();
  }
};

fetchBreeds()
  .then(breeds => {
    breedClass.style.visibility = 'visible';
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
  });

breedClass.addEventListener('change', handleChange);
