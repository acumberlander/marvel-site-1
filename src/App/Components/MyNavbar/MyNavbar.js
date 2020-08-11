import React from "react";
import "./MyNavbar.scss";
import PropTypes from "prop-types";
// import MenuItem from "@material-ui/core/MenuItem";
// import Select from "@material-ui/core/Select";
import { Link } from "react-router-dom";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import LoginModal from "../LoginModal/LoginModal";
import Button from "@material-ui/core/Button";
import { ProfilePage } from "./../ProfilePage/ProfilePage";

class MyNavbar extends React.Component {
  static propTypes = {
    isAuthed: PropTypes.bool,
    logoutClickEvent: PropTypes.func,
  };

  state = {
    drawerOpen: false,
    modalOpen: false,
    loggingIn: false,
  };

  toggleDrawer = () => {
    this.setState({ drawerOpen: !this.state.drawerOpen });
  };

  showModal = () => {
    this.setState({ modalOpen: true });
    if (!!this.state.drawerOpen) {
      this.toggleDrawer();
    }
  };

  hideModal = () => {
    this.setState({ modalOpen: false });
  };

  logOut = () => {
    this.props.logoutClickEvent();
    this.toggleDrawer();
  };

  buildNavBar = () => {
    const { isAuthed, userObject } = this.props;
    if (isAuthed) {
      return (
        <div className="nav-group">
          <img
            src="https://s3-us-east-2.amazonaws.com/redefined/wp-content/uploads/2019/11/12161154/sonic_paramount.jpg"
            alt="Sonic Profile Pic"
            className="profile-pic"
            onClick={this.toggleDrawer}
          ></img>
          <Drawer
            className="drawer-component"
            anchor="right"
            open={this.state.drawerOpen}
            onClose={this.toggleDrawer}
            variant="temporary"
          >
            <div className="drawer-profile-section">
              <img
                src="https://s3-us-east-2.amazonaws.com/redefined/wp-content/uploads/2019/11/12161154/sonic_paramount.jpg"
                alt="Sonic Profile Pic"
                className="drawer-profile-pic"
              ></img>
              <h2>{userObject.fullName}</h2>
              <h4>Green Hills</h4>
            </div>
            <Divider />
            <List>
              {[
                <ListItem
                  button
                  onClick={this.toggleDrawer}
                  component={Link}
                  to="/home"
                  key={"Home"}
                >
                  <ListItemIcon>{<HomeIcon />}</ListItemIcon>
                  <ListItemText primary={"Home"} />
                </ListItem>,

                <ListItem
                  button
                  onClick={this.toggleDrawer}
                  component={Link}
                  to={`/profile/${userObject.id}`}
                  key={"Profile"}
                >
                  <ListItemIcon>{<AccountCircleIcon />}</ListItemIcon>
                  <ListItemText primary={"Profile"} />
                </ListItem>,

                <ListItem button onClick={this.logOut} key={"Log Out"}>
                  <ListItemIcon>{<ExitToAppIcon />}</ListItemIcon>
                  <ListItemText primary={"Log Out"} />
                </ListItem>,
              ]}
            </List>
          </Drawer>
        </div>
      );
    } else {
      return (
        <div className="nav-group">
          <div className="login-button">
            <Button
              variant="outlined"
              color="secondary"
              onClick={this.showModal}
            >
              Log In
            </Button>
          </div>
          <span
            onClick={this.toggleDrawer}
            className="material-icons menu-icon"
          >
            menu
          </span>
          <Drawer
            anchor="right"
            open={this.state.drawerOpen}
            onClose={this.toggleDrawer}
            variant="temporary"
          >
            <div className="drawer-profile-section">
              <AccountCircleIcon onClick={this.showModal} id="logged-out-pic" />
              <h2 className="log-in" onClick={this.showModal}>
                Log in now
              </h2>
              <h4>You aren't logged in</h4>
            </div>
            <Divider />
            <List>
              {
                <ListItem
                  button
                  onClick={this.toggleDrawer}
                  component={Link}
                  to="/home"
                  key={"Home"}
                >
                  <ListItemIcon>{<HomeIcon />}</ListItemIcon>
                  <ListItemText primary={"Home"} />
                </ListItem>
              }
            </List>
          </Drawer>
        </div>
      );
    }
  };

  render() {
    return (
      <div className="my-navbar-container">
        <LoginModal
          modalOpen={this.state.modalOpen}
          hideModal={this.hideModal}
        />
        <Link to="/home" className="home-logo">
          <h2>YoComics!</h2>
        </Link>
        <div className="search-bar-container">
          <input className="search-bar" placeholder="Search YoComics"></input>
        </div>
        {this.buildNavBar()}
      </div>
    );
  }
}

export default MyNavbar;
