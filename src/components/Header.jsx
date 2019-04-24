import React from 'react';
import { Navbar, Nav, Dropdown, DropdownButton } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AuthenticationModal from './AuthenticationModal';
import store from '../store/store';
import { LOGIN, REGISTER, LOGOUT } from '../store/actions/actionTypes';
import AlertModal from './AlertModal';

export class Header extends React.Component {
  dispatchLogin = () => {
    store.dispatch({ type: LOGIN });
  };

  dispatchRegister = () => {
    store.dispatch({ type: REGISTER });
  };

  dispatchLogout = () => {
    localStorage.clear();
    store.dispatch({ type: LOGOUT, payload: false });
  }

  render() {
    const { loggedIn } = this.props;
    return (
      <Navbar expand="lg" className="navbar-custom">
        <NavLink exact to="/" className="brand">
          Author&apos;s Haven
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {loggedIn ? (
            <Nav className="ml-auto">
              <Nav.Item className="nav-link profile-dropdown">
                <DropdownButton alignRight id="dropdown-basic" className="profile-dropdown" title="Profile">
                  <Dropdown.Item>Profile</Dropdown.Item>
                  <Dropdown.Item className="logout" onClick={this.dispatchLogout}>Logout</Dropdown.Item>
                </DropdownButton>
              </Nav.Item>
            </Nav>
          ) : (
            <Nav className="ml-auto">
              <Nav.Item
                onClick={this.dispatchLogin}
                className="nav-link auth-btn login"
              >
                Login
              </Nav.Item>
              <Nav.Item
                onClick={this.dispatchRegister}
                className="nav-link auth-btn get-started"
              >
                Get Started
              </Nav.Item>
            </Nav>
          )}
        </Navbar.Collapse>
        <AuthenticationModal />
        <AlertModal />
      </Navbar>
    );
  }
}

Header.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
};

export const mapStateToProps = state => state.loginUser;

export default connect(mapStateToProps)(Header);
