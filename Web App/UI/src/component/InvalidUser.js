import React from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import NavigationBar from "../component/NavigationBar";

export default class InvalidUser extends React.Component {
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
            <h1>Invalid Login</h1>
            <p>Your username, password and email doesn't match</p>
            <p>
              please <a href="/LoginUser">login</a> again with valid details
            </p>
          </Jumbotron>
        </Container>
      </div>
    );
  }
}
