import React, { Component } from "react";
import * as firebase from "firebase/app";
import "./App.scss";
import userRequests from "./Helpers/Data/Requests/userRequests";
import authRequests from "./Helpers/Data/Requests/authRequests";
import connection from "./Helpers/Data/connection";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import MyNavbar from "./Components/MyNavbar/MyNavbar";
import HomePage from "./Components/HomePage/HomePage";
import DetailsPage from "./Components/DetailsPage/DetailsPage";
import ProfilePage from "./Components/ProfilePage/ProfilePage";

class App extends Component {
  state = {
    authed: false,
    currentUid: "",
    pendingUser: true,
    userObject: {},
  };

  componentDidMount() {
    connection();
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        userRequests.getAllUsers().then((allUsers) => {
          const filteredUsers = allUsers.filter(
            (userObj) => userObj.uid === user.uid
          ).length;
          if (filteredUsers === 0) {
            console.log(filteredUsers);
            const userInfo = {
              fullName: user.displayName,
              email: user.email,
              uid: user.uid,
              collection: user.collection,
            };
            userRequests.createUser(userInfo);
          }
        });
        const currentUid = user.uid;
        userRequests.getUserByUid(currentUid).then((user) => {
          this.setState({
            userObject: user,
            authed: true,
            currentUid: currentUid,
            pendingUser: false,
          });
        });
      } else {
        this.setState({
          authed: false,
          currentUid: "",
          pendingUser: false,
        });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    const { authed, userObject } = this.state;

    const logoutClickEvent = () => {
      authRequests.logoutUser();
      this.setState({ authed: false });
    };
    return (
      <div className="App">
        <BrowserRouter>
          <React.Fragment>
            <MyNavbar
              userObject={userObject}
              isAuthed={authed}
              logoutClickEvent={logoutClickEvent}
            />
            <div className="app-container">
              <div className="d-flex justify-content-center">
                <Switch>
                  <Route
                    path="/"
                    exact
                    component={HomePage}
                    authed={this.state.authed}
                  />
                  <Route
                    path="/home"
                    component={HomePage}
                    authed={this.state.authed}
                  />
                  <Route
                    exact
                    path="/details/:id"
                    component={DetailsPage}
                    authed={this.state.authed}
                  />
                  <Route
                    path={`/profile/:${this.state.currentUid}`}
                    component={ProfilePage}
                    authed={this.state.authed}
                  />
                </Switch>
              </div>
            </div>
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
