import axios from 'axios';
import apiKeys from '../apiKeys';

const md5 = require('js-md5');

const baseUrl = apiKeys.baseUrl;
const publicKey = apiKeys.publicKey;
const privateKey = apiKeys.privateKey;

const ts = Date.now();

let hash = md5(ts+privateKey+publicKey);

const getCharacters = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`)
    .then((results) => {
      const charactersArray = results.data.data.results
      resolve(charactersArray);
      // console.log(charactersArray);
    })
    .catch((error) => {
      reject(error);
  });
});

const getComics = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`)
    .then((results) => {
      const charactersArray = results.data.data.results;
      charactersArray.forEach(character => {
        // let comicsObj = character.comics;
        // let characterId = character.id;
        // console.log(characterId);
        // resolve(comicsObj);
      });
    })
    .catch((err => reject("Get comics call failed", err)));
})


export default 
{
  getCharacters,
  getComics
};