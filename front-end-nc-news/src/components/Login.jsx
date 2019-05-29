import React, { Component } from "react";
import { getUser } from "./apis";
import { navigate } from "@reach/router";
import { Form, Button } from "react-bootstrap";


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      loginFailed: false
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleChangeUsername = this.handleChangeUsername.bind(this);
  }

  handleChangeUsername(event) {
    this.setState({ username: event.target.value });
  }

  handleFormSubmit(event) {
    event.preventDefault();
    Promise.resolve(getUser(this.state.username)).then(userDetails => {
      if (!userDetails) {
        this.setState({ loginFailed: true });
      } else {
        this.props.logInSessionStorage(
          userDetails.username,
          userDetails.avatar_url
        );
        navigate("/topics");
      }
    });
  }

  render() {
    return (
      <div className="card-container col-xs-12 col-sm-12 col-md-9 col-lg-9 col-xl-6">
        <Form className="FormInput" onSubmit={this.handleFormSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control
              className="text-area-input"
              type="input"
              placeholder="Enter username..."
              onChange={this.handleChangeUsername}
            />
            <Form.Text className="text-muted">
              Please enter 'icellusedkars' as the username as it has an avatar image that still
              exists online...
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              className="text-area-input"
              type="input"
              placeholder="Enter password..."
            />
            <Form.Text className="text-muted">
              Enter any random password or leave blank...
            </Form.Text>
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            onSubmit={this.handleFormSubmit}
          >
            Login
          </Button>
          {this.state.loginFailed && (
            <Form.Text className="warningText">
              <p />
              Username incorrect - please use suggested username
            </Form.Text>
          )}
        </Form>
      </div>
    );
  }
}

export default Login;
