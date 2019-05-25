import React, { Component } from "react";
import { Image, Dropdown, Nav, Navbar } from "react-bootstrap";
import guestAvatar from "../images/user.png";
import ncnewsLogo from "../images/ncnews2.jpg";

class Navi extends Component {
  constructor(props) {
    super(props);

    this.state = {
      LoginStatus: (
        <Nav.Link href="/login" className="verticalCenterNav">
          Log in
        </Nav.Link>
      )
    };

    this.handleLogOutClick = this.handleLogOutClick.bind(this);
  }

  render() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="/">
          <Image src={ncnewsLogo} height="50px" rounded />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">All Articles</Nav.Link>
            <Nav.Link href="/topics">Topics</Nav.Link>
            <Nav.Link href="/choose_topic_add_article">Add an Article</Nav.Link>
          </Nav>

          <Nav>
            <span className="loginStatus">{this.state.LoginStatus}</span>
            {this.props.userLoggedIn ? (
              <Dropdown alignRight>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  <Image
                    src={this.props.avatarUrl || guestAvatar}
                    roundedCircle
                    width={30}
                    height={30}
                  />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="/usercontent">
                    Your Articles
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={this.handleLogOutClick}>
                    LogOut
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Image
                className="avatarAlign"
                src={guestAvatar}
                roundedCircle
                width={30}
                height={30}
              />
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }

  handleLogOutClick() {
    this.props.setUserLogout();
    this.setState({
      LoginStatus: (
        <Nav.Link href="/login" className="verticalCenterNav">
          Log in
        </Nav.Link>
      )
    });
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.userLoggedIn &&
      prevProps.userLoggedIn !== this.props.userLoggedIn
    ) {
      this.setState({
        LoginStatus: `Logged in as ${this.props.userLoggedIn}`
      });
    }
  }
}

export default Navi;
