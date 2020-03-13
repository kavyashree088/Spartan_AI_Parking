import React from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import NavigationBar from "../component/NavigationBar";

export default class Home extends React.Component {
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
            <h1>Welcome To Spartan AI Parking System</h1>
            <p>
              To book a spot to park your vehicle and know about parking prices,
            </p>
            <p>
              Please <a href="/LoginUser">Login</a> or{" "}
              <a href="/SignUp">Sign up</a> as Customer
            </p>
          </Jumbotron>
        </Container>
      </div>
    );
  }
}
