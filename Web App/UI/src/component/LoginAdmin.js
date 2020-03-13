import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import "../css/LoginPage.css";
import NavigationBar from "../component/NavigationBar";
const initialState = {
  name: "",
  email: "",
  password: "",
  nameError: "",
  emailError: "",
  passwordError: ""
};

export default class LoginAdmin extends React.Component {
  state = initialState;

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  validate = () => {
    let nameError = "";
    let emailError = "";
    if (!this.state.name) {
      nameError = "Name cannont be empty";
    }
    if (!this.state.email.includes("@")) {
      emailError = "Inavalid Email";
    }
    if (nameError || emailError) {
      this.setState({ emailError, nameError });
      return false;
    }
    return true;
  };

  handleOnSubmit = event => {
    event.preventDefault();
    const isValid = this.validate();
    console.log(isValid);
    if (isValid) {
      console.log(this.state);
      let path = "/Admin";
      this.props.history.push(path);
      //this.setState(initialState);
    }
  };
  render() {
    return (
      <div>
        <NavigationBar />

        <Container className="pt-5 transbox">
          <Jumbotron
            style={{
              background: `rgba(0, 0, 0, 0.5)`,
              color: `#f1f1f1`
            }}
          >
            <h1>Login Admin!</h1>
          </Jumbotron>
          <div className="LoginPage">
            <Form onSubmit={this.handleOnSubmit}>
              <Form.Group controlId="name">
                <Form.Label>Admin ID</Form.Label>
                <Form.Control
                  name="name"
                  placeholder="Enter Admin ID"
                  value={this.state.name}
                  onChange={this.handleChange}
                />
                <div style={{ fontSize: 12, color: "red" }}>
                  {this.state.nameError}
                </div>
              </Form.Group>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  name="email"
                  placeholder="Enter Email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
                <div style={{ fontSize: 12, color: "red" }}>
                  {this.state.emailError}
                </div>
              </Form.Group>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name="password"
                  placeholder="Password"
                  value={this.state.password}
                  type="password"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group className="text-center">
                <p>
                  <Button variant="primary" type="submit" className="btn-block">
                    Login
                  </Button>
                </p>
              </Form.Group>
            </Form>
          </div>
        </Container>
      </div>
    );
  }
}
