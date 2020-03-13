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
  passwordError: ""
};
export default class LoginUser extends React.Component {
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
      let path = "/User/"
        .concat(this.state.name)
        .concat("/")
        .concat(this.state.email)
        .concat("/")
        .concat(this.state.password);
      console.log(this.state.name);
      console.log(path);
      this.props.history.push(path);
      //this.setState(initialState);
    }
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
            <h1>Login User!</h1>
          </Jumbotron>
          <div className="LoginPage">
            <Form onSubmit={this.handleOnSubmit}>
              <Form.Group controlId="name">
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
              <Form.Group>
                <Button variant="primary" type="submit" className="btn-block">
                  Submit
                </Button>
              </Form.Group>
              <Row>
                <Col>
                  <p>
                    <a href="/SignUp">SignUp</a>
                  </p>
                </Col>
                <Col>
                  <p>
                    <a href="/Help">ForgotPassword ?</a>
                  </p>
                </Col>
              </Row>
            </Form>
          </div>
        </Container>
      </div>
    );
  }
}
