import React from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import NavigationBar from "../component/NavigationBar";
import bgK from "../images/kaikai_liu_sm.jpg";
import bgN from "../images/IMG-2427.JPG";
import bgA from "../images/Apoorva.JPG";
import bgk from "../images/kavya.jpg";
import { Row, Col } from "react-bootstrap";
import Image from "react-bootstrap/Image";

export default class AboutUS extends React.Component {
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
            <Row>
              <Col sm="3">
                <Image
                  style={{
                    width: `100%`,
                    height: ` 300px`
                  }}
                  src={bgK}
                  alt="Professor Kai Kai Liu"
                  rounded
                />
              </Col>
              <Col className="text-center mt-3">
                <h1 className=""> Kaikai Liu </h1>
                <p>Assistant Professor</p>
                <p>(408) 924-7847</p>
                <p> Kaikai.liu@sjsu.edu </p>
                <p>CMPE 220 Summer 2019</p>
                <p>Computer Engineering</p>
                <p>San Jose State University</p>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col>
                <Image
                  style={{
                    width: `80%`,
                    height: ` 200px`
                  }}
                  src={bgA}
                  alt="Apoorva"
                  roundedCircle
                  className="text-center"
                />
                <div className="text-center">
                  <h5 className="font-weight-bold">Apoorva Shadaksharappa </h5>
                  <p>(013726362)</p>
                </div>
              </Col>
              <Col>
                <Image
                  style={{
                    width: `80%`,
                    height: ` 200px`
                  }}
                  src={bgk}
                  alt="Kavyashree Chandrashekar"
                  roundedCircle
                  className="text-center"
                />
                <div className="text-center">
                  <h5 className="font-weight-bold">Kavyashree Chandrashekar</h5>
                  <p> (013856518)</p>
                </div>
              </Col>
              <Col>
                <Image
                  style={{
                    width: `80%`,
                    height: ` 200px`
                  }}
                  src={bgN}
                  alt="Nithya Kuchadi"
                  roundedCircle
                  className="text-center"
                />
                <div className="text-center">
                  <h5 className="font-weight-bold">Nithya Kuchadi </h5>
                  <p>(013769665)</p>
                </div>
              </Col>
            </Row>
          </Jumbotron>
        </Container>
      </div>
    );
  }
}
