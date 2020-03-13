import React from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import NavigationBar from "../component/NavigationBar";

export default class Help extends React.Component {
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
            <p>Please drop a mail with your issue to</p>
            <p>
              kavyashree.chandrashekar@sjsu.edu /
              apoorva.shadaksharappa@sjsu.edu / nithya.kuchadi@sjsu.edu
            </p>
          </Jumbotron>
        </Container>
      </div>
    );
  }
}
