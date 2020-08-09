import axios from "axios";
import apiKeys from "../apiKeys";

const firebaseUrl = apiKeys.apiKeys.firebaseConfig.databaseURL;

const getAllCollectionItemsByUid = (uid) => {
  new Promise((resolve, reject) => {
    axios
      .get(`${firebaseUrl}/collection.json?orderBy="uid"&equalTo="${uid}"`)
      .then((result) => {
        const collectionObject = result.data;
        const collectionArray = [];
        if (collectionObject != null) {
          Object.keys(collectionObject).forEach((collectionId) => {
            collectionObject[collectionId].id = collectionId;
            collectionArray.push(collectionObject[collectionId]);
          });
          collectionArray.sort((a, b) => {
            if (a.date < b.date) {
              return -1;
            }
            if (a.date > b.date) {
              return 1;
            }
            return 0;
          });
        }
        resolve(collectionArray);
        return collectionArray;
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const addCollectionItem = (newItem) => {
  new Promise((resolve, reject) => {
    axios
      .post(`${firebaseUrl}/collection.json`, newItem)
      .then((res) => {
        resolve(res);

        return res;
      })
      .catch((err) => reject(err));
  });
};

const deleteFromCollection = (itemId) => {
  axios.delete(`${firebaseUrl}/collection/${itemId}.json`);
};

export default {
  getAllCollectionItemsByUid,
  addCollectionItem,
  deleteFromCollection,
};
