import React from 'react';
import './MyNavbar.scss';
import {
  Navbar,
  Nav,
  // NavItem,
  // NavLink,
  NavbarBrand,
} from 'reactstrap';



class MyNavbar extends React.Component {


  render() {
    const logoLink = "http://thetechnews.com/wp-content/uploads/2018/03/2_The-latest-Marvel-logo.jpg";

    return (
      <div className="my-navbar">
        <Navbar color="dark" expand="md">
          <NavbarBrand href="/">
            <img className="marvelLogo" alt="logo" src={logoLink}></img>
          </NavbarBrand>
          <Nav className="ml-auto" navbar />;
        </Navbar>
      </div>
    );

  }







}

export default MyNavbar;