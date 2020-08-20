import React, { PureComponent } from "react";
import "./MyNavbar.scss";
import PropTypes from "prop-types";
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
import SearchTable from "../SearchTable/SearchTable";
import data from "../../Helpers/Data/Requests/collectionRequest";
import SearchField from "react-search-field";
import { Button } from "reactstrap";

class MyNavbar extends PureComponent {
  static propTypes = {
    isAuthed: PropTypes.bool,
    logoutClickEvent: PropTypes.func,
  };

  state = {
    drawerOpen: false,
    modalOpen: false,
    loggingIn: false,
    filteredContent: [],
    collection: [],
  };

  // Data call
  getCollection = () => {
    data.getCollection().then((res) => {
      this.setState({ collection: res });
    });
  };

  componentDidMount() {
    this.getCollection();
  }

  // Drawer functions
  toggleDrawer = () => {
    this.setState({ drawerOpen: !this.state.drawerOpen });
  };

  // Modal functions
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

  // Search Results
  buildSearchResults = () => {
    const { filteredContent } = this.state;
    return (
      <div id="search-results">
        <div
          className={`${
            filteredContent.length > 0 ? "active" : "inactive"
          } search-result-card`}
        >
          <SearchTable propData={this.props} collection={filteredContent} />
        </div>
      </div>
    );
  };

  // Search bar functions
  onChange = (value, e) => {
    const { collection } = this.state;
    const allContent = [
      ...collection["Popular"],
      ...collection["Comics"],
      ...collection["Movies"],
      ...collection["Series"],
    ];
    const filteredContent = [];
    e.preventDefault();
    if (!value) {
      this.setState({ filteredContent: [] });
    } else {
      for (let i = 0; i < allContent.length; i++) {
        if (
          allContent[i].name.toLowerCase().includes(value.toLowerCase()) ||
          allContent[i].description.toLowerCase().includes(value.toLowerCase())
        ) {
          filteredContent.push(allContent[i]);
        }
        this.setState({ filteredContent });
      }
    }
  };

  render() {
    // Navbar UI builder
    const buildNavbar = () => {
      const { isAuthed, userObject } = this.props;
      if (isAuthed) {
        return (
          <div className="nav-group">
            <LoginModal
              modalOpen={this.state.modalOpen}
              hideModal={this.hideModal}
            />
            <Link to="/home" className="home-logo">
              <h2>YoComics!</h2>
            </Link>
            <div className="search-bar-container">
              <SearchField
                type="search"
                className="search-bar"
                onChange={this.onChange}
                placeholder="Search YoComics"
              />
            </div>
            <img
              src="https://static3.srcdn.com/wordpress/wp-content/uploads/2020/06/Miles-Morales-Spider-Man.jpg"
              alt="Miles Profile Pic"
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
                  src="https://static3.srcdn.com/wordpress/wp-content/uploads/2020/06/Miles-Morales-Spider-Man.jpg"
                  alt="Miles Profile Pic"
                  className="drawer-profile-pic"
                ></img>
                <h2>{userObject.fullName}</h2>
                <h4>New York City</h4>
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
            <LoginModal
              modalOpen={this.state.modalOpen}
              hideModal={this.hideModal}
            />
            <Link to="/home" className="home-logo">
              <h2>YoComics!</h2>
            </Link>
            <div className="search-bar-container">
              <SearchField
                type="search"
                className="search-bar"
                onChange={this.onChange}
                placeholder="Search YoComics"
              />
            </div>
            <div className="login-button-div">
              <Button
                className="nav-login"
                variant="outlined"
                color="primary"
                onClick={this.showModal}
                style={{ width: "100px" }}
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
                <AccountCircleIcon
                  onClick={this.showModal}
                  id="logged-out-pic"
                />
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
    return (
      <div className="my-navbar-container">
        <div className="nav-search">{buildNavbar()}</div>
        <div className="search-table">{this.buildSearchResults()}</div>
      </div>
    );
  }
}

export default MyNavbar;
