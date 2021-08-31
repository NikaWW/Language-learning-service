import React, { Component } from "react";
import TeacherDataService from "../../services/teacher.service";

export default class TeacherBookLesson extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeSurename = this.onChangeSurename.bind(this);
    this.onChangeLanguage = this.onChangeLanguage.bind(this);
    this.getTeacher = this.getTeacher.bind(this);
    this.updateTeacher = this.updateTeacher.bind(this);
    this.bookLesson = this.bookLesson.bind(this);
    this.deleteTeacher = this.deleteTeacher.bind(this);

    this.state = {
      currentTeacher: {
        id: null,
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
    this.getTeacher(this.props.match.params.id);
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

  getTeacher(id) {
    TeacherDataService.get(id)
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

  bookLesson() {
    TeacherDataService.bookLesson(
      this.state.currentTeacher.id,
      this.state.currentTeacher
    )
      .then((response) => {
        console.log(response.data);
        this.setState({
          message: "The lesson was successfully booked!",
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
            <form>
              <div>
                <h4>
                  {currentTeacher.name} {"  "} {currentTeacher.surename}
                </h4>
                <div>
                  <label>
                    <strong>Email :</strong>
                  </label>{" "}
                  {currentTeacher.email}
                </div>
                <div>
                  <label>
                    <strong>Language:</strong>
                  </label>{" "}
                  {currentTeacher.language}
                </div>
                <div>
                  <label>
                    <strong>Country :</strong>
                  </label>{" "}
                  {currentTeacher.country}
                </div>
              </div>
            </form>
            <div className="example-config">
              <p>Select a date:</p>
            </div>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateTeacher}
            >
              Update
            </button>
            <button
              type="submit"
              className="badge badge-success"
              onClick={this.bookLesson}
            >
              Book
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
