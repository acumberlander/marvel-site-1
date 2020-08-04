import firebase from "firebase/app";
import "firebase/auth";

const googleAuthenticate = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(provider);
};

const facebookAuthenticate = () => {
  const provider = new firebase.auth.FacebookAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((results) => {
      return results;
    });
};

const logoutUser = () => firebase.auth().signOut();

const getCurrentUid = () => firebase.auth().currentUser.uid;

export default {
  googleAuthenticate,
  facebookAuthenticate,
  logoutUser,
  getCurrentUid,
};
