import axios from "axios";
import apiKeys from "../apiKeys";

const firebaseUrl = apiKeys.apiKeys.firebaseConfig.databaseURL;

const getAllCollectionItemsByUid = (uid) =>
  new Promise((resolve, reject) => {
    axios
      .get(`${firebaseUrl}/collection.json?orderBy="uid"&equalTo="${uid}"`)
      .then((result) => {
        const collectionObject = result.data;
        const collectionArray = [];
        if (collectionObject != null) {
          Object.keys(collectionObject).forEach((collectionId) => {
            collectionObject[collectionId].collectionId = collectionId;
            collectionArray.push(collectionObject[collectionId]);
            /*This is not ideal. Using as a hack to account for the fact that 
              I don't have access to the firebase generated id until after it's been
              posted.That's why I'm having to push up, pull it down again and repost with 
              the collection id embed within the object.*/
            deleteFromCollection(collectionId);
            addCollectionItem(collectionObject[collectionId]);
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
      })
      .catch((error) => {
        reject(error);
      });
  });

const addCollectionItem = (newItem) =>
  new Promise((resolve, reject) => {
    axios
      .post(`${firebaseUrl}/collection.json`, newItem)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => reject(err));
  });

const deleteFromCollection = (itemId) =>
  axios.delete(`${firebaseUrl}/collection/${itemId}.json`);

export default {
  getAllCollectionItemsByUid,
  addCollectionItem,
  deleteFromCollection,
};
