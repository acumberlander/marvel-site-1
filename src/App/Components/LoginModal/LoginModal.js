import React, { Component } from "react";
import "./LoginModal.scss";
import Modal from "@material-ui/core/Modal";
import Slide from "@material-ui/core/Slide";
import Backdrop from "@material-ui/core/Backdrop";
import { ModalBody } from "reactstrap";
import { Button } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import InputAdornment from "@material-ui/core/InputAdornment";
import MailIcon from "@material-ui/icons/Mail";
import LockIcon from "@material-ui/icons/Lock";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import TextField from "@material-ui/core/TextField";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import PersonIcon from "@material-ui/icons/Person";
import "firebase/auth";
import firebase from "firebase/app";
import userRequests from "../../Helpers/Data/Requests/userRequests";
import authRequests from "../../Helpers/Data/Requests/authRequests";

const userInfo = {
  email: "",
  password: "",
  fullName: "",
  uid: "",
};

export default class LoginModal extends Component {
  state = {
    selectedLogin: false,
    selectedSignUp: false,
    seePassword: false,
    loginInfo: userInfo,
  };

  showLogin = () => {
    this.setState({ selectedSignUp: false });
    this.setState({ selectedLogin: true });
  };

  showSignUp = () => {
    this.setState({ selectedLogin: false });
    this.setState({ selectedSignUp: true });
  };

  togglePasswordVisibility = () => {
    this.setState({ seePassword: !this.state.seePassword });
  };

  returnToModal = () => {
    this.setState({
      selectedLogin: false,
      selectedSignUp: false,
    });
  };

  authenticateUser = (e, email, password) => {
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.props.hideModal();
      })
      .catch((err) => {
        let errorCode = err.code;
        let errorMessage = err.message;
        if (errorCode === "auth/wrong-password") {
          errorMessage = "Username or password is invalid.";
        } else if (errorCode === "auth/user-not-found") {
          errorMessage = "Username or password is invalid.";
        }
        alert(errorMessage);
      });
  };

  login = (e) => {
    e.preventDefault();
    this.authenticateUser(
      e,
      this.state.loginInfo.email,
      this.state.loginInfo.password
    );
  };

  googleLogin = () => {
    authRequests.googleAuthenticate();
    this.props.hideModal();
  };

  // This function authenticates the user but does not allow
  // for data to be access at this time due to COVID-19 according to Facebook.
  facebookLogin = () => {
    authRequests.facebookAuthenticate();
    this.props.hideModal();
  };

  signUp = (newUserInfo) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(newUserInfo.email, newUserInfo.password)
      .then(() => {
        newUserInfo.uid = authRequests.getCurrentUid();
        const usrInfo = {
          fullName: newUserInfo.fullName,
          email: newUserInfo.email,
          uid: newUserInfo.uid,
        };
        userRequests.createUser(usrInfo);
        this.props.hideModal();
      })
      .catch((err) => alert(err.message));
  };

  formSubmit = (e) => {
    e.preventDefault();
    const signUp = this.signUp;
    const userInfo = { ...this.state.loginInfo };
    signUp(this.state.loginInfo);
    this.setState({ loginInfo: userInfo });
  };

  formFieldStringState = (name, e) => {
    e.preventDefault();
    const tempInfo = { ...this.state.loginInfo };
    tempInfo[name] = e.target.value;
    this.setState({ loginInfo: tempInfo });
  };

  emailChange = (e) => {
    this.formFieldStringState("email", e);
  };

  passwordChange = (e) => {
    this.formFieldStringState("password", e);
  };

  fullNameChange = (e) => {
    this.formFieldStringState("fullName", e);
  };

  render() {
    const theType = this.state.seePassword ? "text" : "password";
    const visibleIcon = this.state.seePassword ? (
      <VisibilityIcon
        className="eye-icon"
        fontSize="small"
        onClick={this.togglePasswordVisibility}
      />
    ) : (
      <VisibilityOffIcon
        className="eye-icon"
        fontSize="small"
        onClick={this.togglePasswordVisibility}
      />
    );
    if (this.state.selectedLogin) {
      return (
        <div>
          <Modal
            className="the-modal"
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <ModalBody className="login-modal-body">
              <Slide in={this.props.modalOpen}>
                <div className="content-container">
                  <div className="login-header">
                    <ArrowBackIcon
                      className="back-arrow"
                      fontSize="default"
                      onClick={this.returnToModal}
                    />
                    <h3>Log In</h3>
                  </div>
                  <div className="body-content">
                    <div id="input-container">
                      <form>
                        <div className="email-input-div">
                          <TextField
                            className="filled-basic"
                            name="email"
                            label="Email"
                            variant="filled"
                            type="email"
                            value={this.state.loginInfo.email}
                            onChange={this.emailChange}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <MailIcon fontSize="small" />
                                </InputAdornment>
                              ),
                            }}
                          />
                        </div>
                        <div className="password-input-div">
                          <TextField
                            className="filled-basic"
                            name="password"
                            label="Password"
                            variant="filled"
                            type={theType}
                            value={this.state.loginInfo.password}
                            onChange={this.passwordChange}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <LockIcon fontSize="small" />
                                </InputAdornment>
                              ),
                              endAdornment: (
                                <InputAdornment position="end">
                                  {visibleIcon}
                                </InputAdornment>
                              ),
                            }}
                          />
                        </div>
                        <Button id="login-button" onClick={this.login}>
                          Log In
                        </Button>
                      </form>
                    </div>
                  </div>
                </div>
              </Slide>
            </ModalBody>
          </Modal>
        </div>
      );
    }
    if (this.state.selectedSignUp) {
      return (
        <div>
          <Modal
            className="the-modal"
            open={this.props.modalOpen}
            onClose={this.props.hideModal}
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
            onen
          >
            <ModalBody className="login-modal-body">
              <Slide in={this.props.modalOpen}>
                <div className="content-container">
                  <div className="login-header">
                    <ArrowBackIcon
                      className="back-arrow"
                      fontSize="default"
                      onClick={this.returnToModal}
                    />
                    <h3>Create a new account</h3>
                  </div>
                  <div className="body-content">
                    <div id="input-container">
                      <form onEnter={true}>
                        <div className="email-input-div">
                          <TextField
                            className="filled-basic"
                            label="Email"
                            variant="filled"
                            type="email"
                            onChange={this.emailChange}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <MailIcon fontSize="small" />
                                </InputAdornment>
                              ),
                            }}
                          />
                        </div>
                        <div className="password-input-div">
                          <TextField
                            className="filled-basic"
                            label="Password"
                            variant="filled"
                            type={theType}
                            onChange={this.passwordChange}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <LockIcon fontSize="small" />
                                </InputAdornment>
                              ),
                              endAdornment: (
                                <InputAdornment position="end">
                                  {visibleIcon}
                                </InputAdornment>
                              ),
                            }}
                          />
                        </div>
                        <div className="password-input-div">
                          <TextField
                            className="filled-basic"
                            label="Full name"
                            variant="filled"
                            type="text"
                            onChange={this.fullNameChange}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <PersonIcon fontSize="small" />
                                </InputAdornment>
                              ),
                            }}
                          />
                        </div>
                        <Button
                          onClick={this.formSubmit}
                          type="submit"
                          id="login-button"
                        >
                          Sign Up
                        </Button>
                      </form>
                    </div>
                  </div>
                </div>
              </Slide>
            </ModalBody>
          </Modal>
        </div>
      );
    } else {
      return (
        <div>
          <Modal
            className="the-modal"
            open={this.props.modalOpen}
            onClose={this.props.hideModal}
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <ModalBody>
              <Slide in={this.props.modalOpen}>
                <div className="content-container">
                  <div className="close-icon-div">
                    <CloseIcon id="close-icon" onClick={this.props.hideModal} />
                  </div>
                  <div className="header-content">
                    <h1 id="modal-title">YoComics!</h1>
                    <p id="modal-description">
                      Browse and keep a catalog of all your favorite comics!
                    </p>
                  </div>
                  <p>Quickly Connect With</p>
                  <hr></hr>
                  <div className="body-content">
                    <div className="social-buttons">
                      <Button onClick={this.facebookLogin} id="facebook-button">
                        <span className="button-content">
                          <img
                            id="facebook-icon"
                            src="https://privacyinternational.org/sites/default/files/flysystem/styles/middle_column_small/local-default/2019-03/Facebook_logo_%28square%29.png?itok=ju1PgzXf"
                            alt="facebook"
                          ></img>
                          <p>continue with Facebook</p>
                        </span>
                      </Button>
                      <Button onClick={this.googleLogin} id="google-button">
                        <span className="button-content">
                          <img
                            id="google-icon"
                            src="https://img.pngio.com/google-logo-png-circle-google-icon-png-white-transparent-google-logo-white-png-654_665.png"
                            alt="google"
                          ></img>
                          <p>continue with google</p>
                        </span>
                      </Button>
                    </div>
                  </div>
                  <hr></hr>
                  <p>Or Use Your Email</p>
                  <div className="action-links">
                    <span className="log-options" onClick={this.showSignUp}>
                      Sign Up
                    </span>
                    <span className="log-options" onClick={this.showLogin}>
                      Log In
                    </span>
                  </div>
                </div>
              </Slide>
            </ModalBody>
          </Modal>
        </div>
      );
    }
  }
}
