import React, { Component } from "react";
import TeacherDataService from "../../services/teacher.service";

export default class Teacher extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeSurename = this.onChangeSurename.bind(this);
    this.onChangeLanguage = this.onChangeLanguage.bind(this);
    this.getTeacher = this.getTeacher.bind(this);
    this.updateTeacher = this.updateTeacher.bind(this);
    this.deleteTeacher = this.deleteTeacher.bind(this);

    this.state = {
      currentTeacher: {
        teacherId: null,
        name: "",
        surename: "",
        email: "",
        language: "",
        country: "",
      },
      message: "",
    };
  }

  componentDidMount() {
    this.getTeacher(this.props.match.params.teacherId);
  }

  onChangeName(e) {
    const name = e.target.value;

    this.setState(function (prevState) {
      return {
        currentTeacher: {
          ...prevState.currentTeacher,
          name: name,
        },
      };
    });
  }

  onChangeSurename(e) {
    const surename = e.target.value;

    this.setState((prevState) => ({
      currentTeacher: {
        ...prevState.currentTeacher,
        surename: surename,
      },
    }));
  }

  onChangeLanguage(e) {
    const language = e.target.value;

    this.setState((prevState) => ({
      currentTeacher: {
        ...prevState.currentTeacher,
        language: language,
      },
    }));
  }

  getTeacher(teacherId) {
    TeacherDataService.get(teacherId)
      .then((response) => {
        this.setState({
          currentTeacher: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateTeacher() {
    TeacherDataService.update(
      this.state.currentTeacher.id,
      this.state.currentTeacher
    )
      .then((response) => {
        console.log(response.data);
        this.setState({
          message: "The teacher was updated successfully!",
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  deleteTeacher() {
    TeacherDataService.delete(this.state.currentTeacher.id)
      .then((response) => {
        console.log(response.data);
        this.props.history.push("/teachers");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { currentTeacher } = this.state;

    return (
      <div>
        {currentTeacher ? (
          <div className="edit-form">
            <h4>Teacher</h4>
            <form>
              <div className="form-group">
                <label htmlFor="language">language</label>
                <input
                  type="text"
                  className="form-control"
                  id="language"
                  value={currentTeacher.language}
                  onChange={this.onChangeLanguage}
                />
              </div>

              <div className="form-group">
                <label htmlFor="name">name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={currentTeacher.name}
                  onChange={this.onChangeName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="surename">surename</label>
                <input
                  type="text"
                  className="form-control"
                  id="surename"
                  value={currentTeacher.surename}
                  onChange={this.onChangeSurename}
                />
              </div>
            </form>

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteTeacher}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateTeacher}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Tutorial...</p>
          </div>
        )}
      </div>
    );
  }
}
