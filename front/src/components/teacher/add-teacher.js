import React, { Component } from "react";
import TeacherDataService from "../../services/teacher.service";

export default class AddTeacher extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeSurename = this.onChangeSurename.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeCountry = this.onChangeCountry.bind(this);
    this.onChangeLanguage = this.onChangeLanguage.bind(this);
    this.saveTeacher = this.saveTeacher.bind(this);
    this.newTeacher = this.newTeacher.bind(this);

    this.state = {
      id: null,
      name: "",
      surename: "",
      email: "",
      language: "",
      country: "",

      submitted: false,
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }

  onChangeSurename(e) {
    this.setState({
      surename: e.target.value,
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangeCountry(e) {
    this.setState({
      country: e.target.value,
    });
  }

  onChangeLanguage(e) {
    this.setState({
      language: e.target.value,
    });
  }

  saveTeacher() {
    var data = {
      name: this.state.name,
      surename: this.state.surename,
      email: this.state.email,
      language: this.state.language,
      country: this.state.country,
    };

    TeacherDataService.create(data)
      .then((response) => {
        this.setState({
          id: response.data.id,
          name: response.data.name,
          surename: response.data.surename,
          email: response.data.email,
          language: response.data.language,
          country: response.data.country,

          submitted: true,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  newTeacher() {
    this.setState({
      id: null,
      name: "",
      surename: "",
      email: "",
      country: "",
      language: "",

      submitted: false,
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newTeacher}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="name">name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                required
                value={this.state.name}
                onChange={this.onChangeName}
                name="name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="surename">surename</label>
              <input
                type="text"
                className="form-control"
                id="surename"
                required
                value={this.state.surename}
                onChange={this.onChangeSurename}
                name="surename"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                required
                value={this.state.email}
                onChange={this.onChangeEmail}
                name="email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="language">language</label>
              <input
                type="text"
                className="form-control"
                id="language"
                required
                value={this.state.language}
                onChange={this.onChangeLanguage}
                name="language"
              />
            </div>

            <div className="form-group">
              <label htmlFor="country">country</label>
              <input
                type="text"
                className="form-control"
                id="country"
                required
                value={this.state.country}
                onChange={this.onChangeCountry}
                name="country"
              />
            </div>

            <button onClick={this.saveTeacher} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
