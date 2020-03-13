import React from "react";
import Form from "react-bootstrap/Form";
import { Row, Col, Button, Container } from "react-bootstrap";
import Jumbotron from "react-bootstrap/Jumbotron";
import Toast from "react-bootstrap/Toast";
import NavigationBarLogin from "../component/NavigationBarLogin";
import "../css/LoginPage.css";
import Modal from "react-bootstrap/Modal";
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import Label from "react-bootstrap/FormLabel";

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

let spot = "";

export default class Users extends React.Component {
  constructor() {
    super();
    this.state = {
      slots: [],
      rSpot: "",
      isBooked: false,
      show: true,
      modalShow: false,
      previousEntry: [],
      name: "",
      licenseNo: "",
      firstName: ""
    };
  }

  async componentDidMount() {
    const { username } = this.props.match.params;
    console.log(username);
    const { email } = this.props.match.params;
    console.log(email);
    const { password } = this.props.match.params;
    console.log(password);
    const lURL = "http://10.250.230.2:3303/user/" //"http://localhost:3303/user/"
      .concat(username)
      .concat("/")
      .concat(email)
      .concat("/")
      .concat(password)
      .concat("/");

    const r3 = await fetch(lURL);
    const LNO = await r3.json();
    console.log(LNO);

    if (LNO.length > 0) {
      this.setState({
        licenseNo: LNO[0].LicenseNo,
        firstName: LNO[0].FirstName
      });
      console.log(this.state.licenseNo);

      let initialSlots = [];
      const url = "http://10.250.230.2:3303/parkingSpace"; //"http://localhost:3303/parkingSpace";
      await fetch(url)
        .then(response => {
          return response.json();
        })
        .then(data => {
          initialSlots = data.map(slotID => {
            return slotID;
          });
          console.log("inital Slots");
          console.log(initialSlots);
          this.setState({ slots: initialSlots });
        });

      const url2 = "http://10.250.230.2:3303/user/".concat(
        //"http://localhost:3303/user/"
        this.state.licenseNo
      );
      console.log(url2);
      const response2 = await fetch(url2);
      const data2 = await response2.json();
      this.setState({ previousEntry: data2 });
      console.log(data2);

      this.setState({ name: username });
    } else {
      this.props.history.push("/invalidUser");
    }
    //username = name;
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    console.log(event.target.value);
  };
  postData = event => {
    event.preventDefault();
    let slotID = this.state.rSpot;
    let isEmpty = true;
    let LicenseNo = this.state.licenseNo;
    console.log(slotID);
    //console.log(isEmpty);
    var pdata = { slotID: slotID, isEmpty: isEmpty, LicenseNo: LicenseNo };
    //console.log(pdata);
    fetch(
      //"http://localhost:3303/post",
      "http://10.250.230.2:3303/post",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(pdata)
      }
    )
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log(err));
    //this.forceUpdate();
    //console.log(res);
    this.setState({ isBooked: true, modalShow: false });
    let arr = this.state.slots;
    for (var i = arr.length - 1; i >= 0; i--) {
      if (arr[i].slotID === slotID) {
        arr.splice(i, 1);
      }
    }
    spot = this.state.rSpot;
    this.setState({ rSpot: "null" });
  };

  handleClose = event => {
    this.setState({ modalShow: false });
  };

  handleBook = event => {
    event.preventDefault();
    this.setState({ modalShow: true });
  };
  render() {
    let slots = this.state.slots;
    let optionItems = slots.map(slot => (
      <option key={slot.slotID}>{slot.slotID}</option>
    ));
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
            <h1>WELCOME, {this.state.firstName}!</h1>
            <p>
              Parking price will be calculated based on your minutes of parking.
              Cost of Parking is $5/Hr
            </p>
          </Jumbotron>
          <div>
            {this.state.isBooked ? (
              <div
                aria-live="polite"
                aria-atomic="true"
                style={{
                  position: "relative"
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0
                  }}
                >
                  <Toast
                    onClose={() => {
                      this.setState({ show: false });
                    }}
                    show={this.state.show}
                  >
                    <Toast.Header>
                      <strong className="mr-auto">Spot Booked</strong>
                      <small>just now</small>
                    </Toast.Header>
                    <Toast.Body>
                      You have booked parking spot {spot} in the Spartans
                      Parking.
                    </Toast.Body>
                  </Toast>
                </div>
              </div>
            ) : (
              <div />
            )}
          </div>
          <div className="form span12">
            <Form onSubmit={this.handleBook}>
              <Form.Group as={Row} controlId="parkingSpace">
                <Col sm="3">
                  <Form.Label className="text-center">
                    Choose the Parking Slot
                  </Form.Label>
                </Col>
                <Col sm="3">
                  <Form.Control
                    as="select"
                    name="rSpot"
                    onChange={this.handleChange}
                  >
                    <option key="default" defaultValue value="null">
                      Select available slots
                    </option>
                    {optionItems}
                  </Form.Control>
                </Col>
                <Col sm="2">
                  <Button variant="primary" type="submit" className="btn-block">
                    Book
                  </Button>
                </Col>
              </Form.Group>
            </Form>
          </div>
          <div>
            {this.state.rSpot === "null" ? (
              <div>
                <Modal show={this.state.modalShow} onHide={this.handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Invalid Selection</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>Please select valid parking spot</Modal.Body>
                  <Modal.Footer>
                    <Button variant="danger" onClick={this.handleClose}>
                      Close
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
            ) : (
              <div>
                <Modal show={this.state.modalShow} onHide={this.handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Confirm Booking</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    Are you sure to book {this.state.rSpot} in Spartan Parking?
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="success" onClick={this.postData}>
                      Book
                    </Button>
                    <Button variant="danger" onClick={this.handleClose}>
                      Close
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
            )}
          </div>

          <div className="pt-5">
            {this.state.previousEntry.length > 0 ? (
              <div>
                <BootstrapTable
                  keyField="LicenseNo"
                  data={this.state.previousEntry}
                  columns={columns}
                />
                <div>
                  {this.state.previousEntry[0].ParkingPrice > 0 ? (
                    <div as={Row} className="form">
                      <Row className="justify-content-md-center">
                        <Col sm="3">
                          <Label style={{ fontWeight: "Bold" }}>
                            Pay the Due amount{" "}
                            {this.state.previousEntry[0].ParkingPrice}$
                          </Label>
                        </Col>
                        <Col sm="2">
                          <Button variantc="primary">Pay Now</Button>
                        </Col>
                      </Row>
                    </div>
                  ) : (
                    <div />
                  )}
                </div>
              </div>
            ) : (
              <div>
                <div>loading....</div>
              </div>
            )}
          </div>
        </Container>
      </div>
    );
  }
}
