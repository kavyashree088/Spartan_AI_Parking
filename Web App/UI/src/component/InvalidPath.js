import React from "react";
import Container from "react-bootstrap/Container";
import NavigationBar from "../component/NavigationBar";

export default class InvalidPath extends React.Component {
  render() {
    return (
      <div>
        <NavigationBar />
        <Container className="text-center">
          <h1 style={{ color: `red` }}>
            The page you are looking currently unavailable
          </h1>
        </Container>
      </div>
    );
  }
}
