import axios from "axios";
import apiKeys from "../apiKeys";
import userRequests from "./userRequests";
import authRequests from "./authRequests";

const firebaseUrl = apiKeys.apiKeys.firebaseConfig.databaseURL;

const getCollection = () =>
  new Promise((resolve, reject) =>
    axios
      .get(`${firebaseUrl}/collection.json`)
      .then((result) => {
        let collectionObj = result.data;
        console.log(collectionObj);
        resolve(collectionObj);
      })
      .catch((err) => reject(err))
  );

const getContentById = (id) =>
  getCollection().then((res) => {
    let comics = res.Comics;
    let movies = res.Movies;
    let popular = res.Popular;
    let series = res.Series;
    let contentArray = [...popular, ...movies, ...comics, ...series];
    let contentItem = contentArray.filter((item) => item.id === id)[0];
    console.log(contentItem);
    return contentItem;
  });

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

const addCollectionItem = (uid, newItem) =>
  userRequests.getUserByUid(uid).then((res) => {
    let userObject = res;
    let userKey = res["id"];

    if (!userObject.collection) {
      userObject.collection = [newItem];
      userRequests.updateUserCollection(userObject, userKey);
    } else {
      let filteredArr = userObject.collection.filter(
        (item) => item.id === newItem.id
      );

      if (filteredArr.length === 0) userObject.collection.push(newItem);
      userRequests.updateUserCollection(userObject, userKey);
    }
  });

const deleteFromCollection = (uid, item) =>
  userRequests.getUserByUid(uid).then((res) => {
    let userKey = res["id"];
    let userObject = res;

    let updatedArr = userObject.collection.filter((x) => x.id !== item.id);
    userObject.collection = updatedArr;
    userRequests.updateUserCollection(userObject, userKey);
  });

export default {
  getAllCollectionItemsByUid,
  addCollectionItem,
  deleteFromCollection,
  getCollection,
  getContentById,
};
