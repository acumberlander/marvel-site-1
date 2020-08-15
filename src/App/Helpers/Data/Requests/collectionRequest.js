import axios from "axios";
import apiKeys from "../apiKeys";
import userRequests from "./userRequests";

const firebaseUrl = apiKeys.apiKeys.firebaseConfig.databaseURL;
// const uid = authRequests.getCurrentUid();

const getCollection = () =>
  new Promise((resolve, reject) =>
    axios
      .get(`${firebaseUrl}/collection.json`)
      .then((result) => {
        let collectionObj = result.data;
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
    return contentItem;
  });

const getUserCollectionItemsByUid = (uid) =>
  new Promise((resolve, reject) =>
    axios
      .get(`${firebaseUrl}/users.json?orderBy="uid"&equalTo="${uid}"`)
      .then((result) => {
        const collectionObject = result.data[Object.keys(result.data)];
        if (collectionObject != null) {
          const userCollection = collectionObject.collection;
          resolve(userCollection);
        }
      })
      .catch((error) => {
        reject(error);
      })
  );

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
    console.log(item);
    let userKey = res["id"];
    let userObject = res;

    let updatedArr = userObject.collection.filter((i) => i.id !== item.id);
    userObject.collection = updatedArr;
    userRequests.updateUserCollection(userObject, userKey);
  });

export default {
  getUserCollectionItemsByUid,
  addCollectionItem,
  deleteFromCollection,
  getCollection,
  getContentById,
};
