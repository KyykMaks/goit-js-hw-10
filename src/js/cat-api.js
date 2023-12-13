import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_N5RrWSNYYHTP7KKOcvf9lMktkx4HcNoPMksCFLpnh3RBY55CNdB5Ww2eTNZpEOC5';

const catApi = 'https://api.thecatapi.com/v1';

export function fetchBreeds() {
  return axios
    .get(`${catApi}/breeds`)
    .then(response => response.data)
    .catch(error => {
      console.log(error);
      throw new Error(error.status);
    });
}

export function fetchCatByBreed(breedId) {
  return axios
    .get(`${catApi}/images/search?breed_ids=${breedId}`)
    .then(response => response.data)
    .catch(error => {
      console.log(error);
      throw new Error(error.status);
    });
}
