import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthService from "../../../services/AuthService";

export class LoginComponent extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
      hasFailed: false,
      message: "",
    };

    this.loginClicked = this.loginClicked.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  loginClicked() {
    if (this.state.email === "" && this.state.password === "") {
      this.setState({
        message: "Fields cannot be empty",
        hasFailed: true,
      });
      return;
    }

    AuthService.login(this.state.email, this.state.password)
      .then((res) => {
        AuthService.login(
          this.state.email, //!!!!!!1
          res.data.accessToken
        );
        window.location.assign("/");
      })
      .catch((err) => {
        this.setState({
          hasFailed: true,
          message: "Invalid credentials",
        });
      });
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const { email, password } = this.state;
    return (
      <div className="form-content-right">
        <form className="form">
          <h1>Login to Healthgenic </h1>
          <div className="form-inputs">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="form-input"
              placeholder="Enter your email"
              value={email}
              onChange={this.handleChange}
            />
          </div>

          <div className="form-inputs">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="form-input"
              placeholder="Enter your password"
              value={password}
              onChange={this.handleChange}
            />
          </div>

          <button className="form-input-btn" onClick={this.loginClicked}>
            Log in
          </button>
          <span className="form-input-login">
            Not a member?
            <a href="/sign-up"> Sign up</a>
          </span>
        </form>
      </div>
    );
  }
}

export default LoginComponent;
