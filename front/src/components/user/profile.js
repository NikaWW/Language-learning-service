import React, { Component } from "react";
import NavbarU from "./navbarU";
import UserDataService from "../../services/user.service";
import "./profile.css";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeSurename = this.onChangeSurename.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.getUser = this.getUser.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.state = {
      currentUser: {
        userId: null,
        firstName: "",
        surename: "",
        email: "",
        password: "",
      },
      message: "",
    };
  }

  componentDidMount() {
    this.getUser(sessionStorage.getItem("userId"));
  }

  onChangeName(e) {
    const firstName = e.target.value;

    this.setState(function (prevState) {
      return {
        currentUser: {
          ...prevState.currentUser,
          firstName: firstName,
        },
      };
    });
  }

  onChangeSurename(e) {
    const surename = e.target.value;

    this.setState((prevState) => ({
      currentUser: {
        ...prevState.currentUser,
        surename: surename,
      },
    }));
  }

  onChangePassword(e) {
    const password = e.target.value;

    this.setState((prevState) => ({
      currentUser: {
        ...prevState.currentUser,
        password: password,
      },
    }));
  }

  getUser(userId) {
    UserDataService.get(userId)
      .then((response) => {
        this.setState({
          currentUser: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateUser() {
    UserDataService.update(this.state.currentUser.id, this.state.currentUser)
      .then((response) => {
        console.log(response.data);
        this.setState({
          message: "The user was updated successfully!",
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  deleteUser() {
    UserDataService.delete(this.state.currentUser.id)
      .then((response) => {
        console.log(response.data);
        this.props.history.push("/users");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { currentUser } = this.state;

    return (
      <>
        <NavbarU />

        <div className="form-container-d">
          <div className="form-content-left-d"></div>
          <div className="form-content-right-d">
            <formm>
              <div div class="row1">
                <label for="i1" class="col1">
                  <strong>Name :</strong>
                </label>
                <input
                  id="i1"
                  class="col1"
                  type="text"
                  value={currentUser.firstName}
                />

                <label for="i2" class="col2">
                  Surname :
                </label>
                <input
                  id="i2"
                  class="col2"
                  type="text"
                  value={currentUser.surename}
                />
              </div>
              <div class="row2">
                <label for="i3" class="col1">
                  Email :
                </label>
                <label id="i3" class="col1">
                  {currentUser.email}
                </label>
              </div>
              <button className="btnl">EDIT</button>
            </formm>
          </div>
        </div>
      </>
    );
  }
}
