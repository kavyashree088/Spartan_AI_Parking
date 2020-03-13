import React from "react";

const initialState = {
  name: "",
  email: "",
  password: "",
  nameError: "",
  emailError: "",
  passwordError: ""
};

export default class MyForm extends React.Component {
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
      this.setState(initialState);
    }
  };
  render() {
    return (
      <form onSubmit={this.handleOnSubmit}>
        <div>
          <input
            name="name"
            placeholder="Name"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <div style={{ fontSize: 12, color: "red" }}>
            {this.state.nameError}
          </div>
        </div>
        <div>
          <input
            name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <div style={{ fontSize: 12, color: "red" }}>
            {this.state.emailError}
          </div>
        </div>
        <div>
          <input
            name="password"
            placeholder="Password"
            value={this.state.password}
            type="password"
            onChange={this.handleChange}
          />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    );
  }
}
