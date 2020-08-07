import axios from "axios";
import apiKeys from "../apiKeys";

const md5 = require("js-md5");

const baseUrl = apiKeys.marvelApiKey.baseUrl;
const publicKey = apiKeys.marvelApiKey.publicKey;
const privateKey = apiKeys.marvelApiKey.privateKey;

const ts = Date.now();

let hash = md5(ts + privateKey + publicKey);

const getCharacters = () =>
  new Promise((resolve, reject) => {
    axios
      .get(
        `${baseUrl}/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`
      )
      .then((results) => {
        const charactersArray = results.data.data.results;
        resolve(charactersArray);
        // console.log(charactersArray);
      })
      .catch((error) => {
        reject(error);
      });
  });

// const getComics = () => new Promise((resolve, reject) => {
//   axios.get(`${baseUrl}/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`)
//     .then((results) => {
//       const charactersArray = results.data.data.results;
//       console.log(charactersArray.length);
//       resolve(charactersArray)
//       })
//       .catch((err => reject("Get comics call failed", err)));
//     });

export default {
  getCharacters,
  // getComics
};
