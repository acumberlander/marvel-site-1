import axios from "axios";
import apiKeys from "../apiKeys";

const baseUrl = apiKeys.comicVineApiKey.baseUrl;
const apiKey = apiKeys.comicVineApiKey.apiKey;

const getCharacters = () => {
  new Promise((resolve, reject) => {
    axios
      .get(`${baseUrl}/characters/?${apiKey}&sort=name`)
      .then((results) => {
        resolve(results);
        console.log(results);
      })
      .catch((err) => reject(err));
  });
};

export default { getCharacters };
