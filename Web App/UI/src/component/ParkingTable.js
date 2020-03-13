import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";
import { Row, Col } from "react-bootstrap";
import NavigationBarLogin from "../component/NavigationBarLogin";
import "../css/LoginPage.css";

const columns = [
  {
    dataField: "LicenseNo",
    text: "License Plate Number"
  },
  {
    dataField: "EntryTime",
    text: "Entry Time"
  },
  {
    dataField: "ExitTime",
    text: "Exit Time"
  },
  {
    dataField: "ParkingPrice",
    text: "Parking Price"
  }
];

const columns2 = [
  {
    dataField: "slotID",
    text: "Available Slots"
  },
  {
    dataField: "LicenseNo",
    text: "Vehicle Parked"
  }
];
const columns3 = [
  {
    dataField: "CarID",
    text: "Cars ID"
  },
  {
    dataField: "Speed",
    text: "Speed"
  },
  {
    dataField: "Message",
    text: "Caution (Spartan Parking speed limit is 30m/hr)"
  }
];

export default class ParkingTable extends React.Component {
  state = {
    user: null,
    slots: null,
    speed: null
  };

  async componentDidMount() {
    this.interval = setInterval(
      () => this.setState({ time: Date.now() }),
      1000
    );
    const url = "http://10.250.230.2:3303/"; //"http://localhost:3303/";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ user: data });
    console.log("here");
    const url2 = "http://10.250.230.2:3303/parkingSlots"; //"http://localhost:3303/parkingSlots";
    const response2 = await fetch(url2);
    const data2 = await response2.json();
    this.setState({ slots: data2 });
    console.log(this.state.slots);
    const url3 = "http://10.250.29.178:3303/"; //"http://10.250.230.2:3303/parkingSpace";
    const response3 = await fetch(url3);
    const data3 = await response3.json();
    this.setState({ speed: data3 });
    console.log(this.state.speed);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  render() {
    return (
      <div>
        <NavigationBarLogin />

        <Container className="pt-5">
          <Jumbotron
            style={{
              background: `rgba(0, 0, 0, 0.5)`,
              color: `#f1f1f1`
            }}
          >
            <h1>Welcome Admin</h1>
          </Jumbotron>
          <Row>
            <Col sm="9">
              {this.state.user ? (
                <BootstrapTable
                  keyField="LicenseNo"
                  data={this.state.user}
                  columns={columns}
                />
              ) : (
                <div>
                  <div>loading....</div>
                </div>
              )}
            </Col>
            <Col sm="3">
              {this.state.slots ? (
                <BootstrapTable
                  keyField="slotID"
                  data={this.state.slots}
                  columns={columns2}
                />
              ) : (
                <div>
                  <div>loading....</div>
                </div>
              )}
            </Col>
          </Row>
          <Row>
            <Col>
              {this.state.speed ? (
                <BootstrapTable
                  keyField="CarID"
                  data={this.state.speed}
                  columns={columns3}
                />
              ) : (
                <div>
                  <div>loading....</div>
                </div>
              )}
            </Col>
          </Row>
          <div>{this.state.time}</div>
        </Container>
      </div>
    );
  }
}
