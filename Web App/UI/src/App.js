import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ParkingTable from "./component/ParkingTable";
import "./App.css";
import Users from "./component/Users";
import LoginAdmin from "./component/LoginAdmin";
import LoginUser from "./component/LoginUser";
import Home from "./component/Home";
import bgImage from "./images/car.jpg";
import "./css/LoginPage.css";
import InvalidUser from "./component/InvalidUser";
import SignUp from "./component/SignUp";
import AboutUS from "./component/AboutUs";
import Help from "./component/Help";
import InvalidPath from "./component/InvalidPath";
import SignUpFail from "./component/SignUpFail";

class App extends React.Component {
  render() {
    return (
      <div
        className="app"
        style={{
          backgroundImage: `url(${bgImage})`
        }}
      >
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/Admin" component={ParkingTable} />
            <Route path="/LoginAdmin" component={LoginAdmin} />
            <Route path="/User/:username/:email/:password" component={Users} />
            <Route path="/LoginUser" component={LoginUser} />
            <Route path="/invalidUser" component={InvalidUser} />
            <Route path="/signUp" component={SignUp} />
            <Route path="/AboutUs" component={AboutUS} />
            <Route path="/Help" component={Help} />
            <Route path="/SignUpFail" component={SignUpFail} />
            <Route component={InvalidPath} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
