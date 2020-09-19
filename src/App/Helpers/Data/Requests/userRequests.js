import axios from "axios";
import apiKeys from "../apiKeys";
import firebase from "firebase";

const firebaseUrl = apiKeys.firebaseConfig.databaseURL;

const createUser = (user) => axios.post(`${firebaseUrl}/users.json`, user);

const updateUserCollection = (user, userKey) =>
  axios.put(`${firebaseUrl}/users/${userKey}.json`, user);

const addUserCollectionItem = (userKey, newItem) => {
  let userRef = firebase.database().ref("users/" + userKey);
  userRef.child("collection").update({
    newItem,
  });
};

const getUserByUid = (uid) =>
  new Promise((resolve, reject) => {
    axios
      .get(`${firebaseUrl}/users.json?orderBy="uid"&equalTo="${uid}"`)
      .then((result) => {
        const userObject = result.data;
        let userKeys = "";
        if (userObject != null) {
          Object.keys(userObject).forEach((userId) => {
            userObject[userId].id = userId;
            userKeys = userObject[userId];
          });
        }
        resolve(userKeys);
      })
      .catch((error) => {
        reject(error);
      });
  });

// returns array of user objects
const getAllUsers = () =>
  new Promise((resolve, reject) => {
    axios
      .get(`${firebaseUrl}/users.json`)
      .then((result) => {
        const userObject = result.data;
        const userArray = [];
        if (userObject != null) {
          Object.keys(userObject).forEach((userId) => {
            userObject[userId].id = userId;
            userArray.push(userObject[userId]);
          });
        }
        resolve(userArray);
      })
      .catch((error) => {
        reject(error);
      });
  });

export default {
  getAllUsers,
  getUserByUid,
  createUser,
  updateUserCollection,
  addUserCollectionItem,
};
