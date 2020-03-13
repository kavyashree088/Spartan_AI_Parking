import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import NavigationBar from "../component/NavigationBar";
import "../css/LoginPage.css";
import { Row, Col } from "react-bootstrap";
const initialState = {
  name: "",
  email: "",
  password: "",
  nameError: "",
  emailError: "",
  passwordError: "",
  firstName: "",
  lastName: "",
  confirmPassword: "",
  firstNameError: "",
  lastNameError: "",
  confirmPasswordError: "",
  licenseNo: "",
  licenseNoError: ""
};
export default class SignUp extends React.Component {
  state = initialState;

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  validate = () => {
    let nameError = "";
    let emailError = "";
    let firstNameError = "";
    let lastNameError = "";
    let passwordError = "";
    let confirmPasswordError = "";
    let licenseNoError = "";
    if (!this.state.name) {
      nameError = "Name cannont be empty";
    }
    if (!this.state.firstName) {
      firstNameError = "Name cannont be empty";
    }
    if (!this.state.lastName) {
      lastNameError = "Name cannont be empty";
    }
    if (!this.state.email.includes("@")) {
      emailError = "Inavalid Email";
    }
    console.log(this.state.password.length);
    if (this.state.password.length < 6) {
      console.log("here");
      passwordError = "Password is too small";
    }
    if (!(this.state.confirmPassword === this.state.password)) {
      confirmPasswordError = "Password doesn't match";
    }
    if (!this.state.licenseNo) {
      licenseNoError = "License Number cannont be empty";
    }
    if (
      nameError ||
      emailError ||
      firstNameError ||
      lastNameError ||
      passwordError ||
      confirmPasswordError ||
      licenseNoError
    ) {
      this.setState({
        emailError,
        nameError,
        firstNameError,
        lastNameError,
        passwordError,
        confirmPasswordError,
        licenseNoError
      });
      return false;
    }
    return true;
  };

  handleOnSubmit = event => {
    event.preventDefault();
    const isValid = this.validate();
    let code = null;
    console.log(isValid);
    if (isValid) {
      console.log(this.state);
      var pdata = {
        userName: this.state.name,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        password: this.state.password,
        email: this.state.email,
        licenseNo: this.state.licenseNo
      };
      console.log(pdata);
      fetch(
        //"http://localhost:3303/userpost",
        "http://10.250.230.2:3303/userpost",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(pdata)
        }
      )
        .then(res => {
          code = res.status;
          console.log(code);
          if (code === 200) {
            this.props.history.push("/LoginUser");
          } else {
            this.props.history.push("/SignUpFail");
          }
        })
        .then(data => console.log(data))
        .catch(err => console.log(err));
    }
    console.log(code);
  };
  render() {
    return (
      <div>
        <NavigationBar />

        <Container className="pt-5">
          <Jumbotron
            style={{
              background: `rgba(0, 0, 0, 0.5)`,
              color: `#f1f1f1`
            }}
          >
            <h1>Sign Up User!</h1>
          </Jumbotron>
          <div className="SignUpPage">
            <Form onSubmit={this.handleOnSubmit}>
              <Row>
                <Col>
                  <Form.Group controlId="name">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      name="firstName"
                      placeholder="Enter First Name"
                      value={this.state.firstName}
                      onChange={this.handleChange}
                    />
                    <div style={{ fontSize: 12, color: "red" }}>
                      {this.state.nameError}
                    </div>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      name="lastName"
                      placeholder="Enter Last Name"
                      value={this.state.lastName}
                      onChange={this.handleChange}
                    />
                    <div style={{ fontSize: 12, color: "red" }}>
                      {this.state.nameError}
                    </div>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>User Name</Form.Label>
                    <Form.Control
                      name="name"
                      placeholder="Enter Name"
                      value={this.state.name}
                      onChange={this.handleChange}
                    />
                    <div style={{ fontSize: 12, color: "red" }}>
                      {this.state.nameError}
                    </div>
                  </Form.Group>
                </Col>
                <Col>
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
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>Vehicle License Number</Form.Label>
                    <Form.Control
                      name="licenseNo"
                      placeholder="Enter your vehicle number"
                      value={this.state.licenseNo}
                      onChange={this.handleChange}
                    />
                    <div style={{ fontSize: 12, color: "red" }}>
                      {this.state.licenseNoError}
                    </div>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      name="password"
                      placeholder="Password"
                      value={this.state.password}
                      type="password"
                      onChange={this.handleChange}
                    />
                    <div style={{ fontSize: 12, color: "red" }}>
                      {this.state.passwordError}
                    </div>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      name="confirmPassword"
                      placeholder="Password"
                      value={this.state.confirmPassword}
                      type="password"
                      onChange={this.handleChange}
                    />
                    <div style={{ fontSize: 12, color: "red" }}>
                      {this.state.confirmPasswordError}
                    </div>
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group>
                <Button variant="primary" type="submit" className="btn-block">
                  Submit
                </Button>
              </Form.Group>
            </Form>
          </div>
        </Container>
      </div>
    );
  }
}
