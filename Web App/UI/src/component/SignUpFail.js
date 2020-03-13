import React from "react";
import Container from "react-bootstrap/Container";
import NavigationBar from "../component/NavigationBar";

export default class SignUpFail extends React.Component {
  render() {
    return (
      <div>
        <NavigationBar />
        <Container className="text-center">
          <h3 style={{ color: `red` }}>
            Unable to register due to internal error, try with different
            username or contact support
          </h3>
        </Container>
      </div>
    );
  }
}
