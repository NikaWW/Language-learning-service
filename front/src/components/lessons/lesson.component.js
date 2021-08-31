import React, { Component } from "react";
import LessonDataService from "../../services/lesson.service";

export default class Lesson extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeSurename = this.onChangeSurename.bind(this);
    this.onChangeLanguage = this.onChangeLanguage.bind(this);
    this.getLesson = this.getLesson.bind(this);
    this.updateLesson = this.updateLesson.bind(this);
    this.deleteLesson = this.deleteLesson.bind(this);

    this.state = {
      currentLesson: [
        {
          lessonId: null,
          language: "",
          time: "",

          currentTeacher: {
            teacherId: null,
            name: "",
            surename: "",
            email: "",
            language: "",
            country: "",
          },
          currentUser: {
            userId: null,
            name: "",
            surename: "",
            email: "",
            password: "",
            language: "",
          },
        },
      ],
      message: "",
    };
  }

  componentDidMount() {
    this.getLesson(this.props.match.params.lessonId);
  }

  onChangeName(e) {
    const name = e.target.value;

    this.setState(function (prevState) {
      return {
        currentLesson: {
          ...prevState.currentLesson,
          name: name,
        },
      };
    });
  }

  onChangeSurename(e) {
    const surename = e.target.value;

    this.setState((prevState) => ({
      currentLesson: {
        ...prevState.currentLesson,
        surename: surename,
      },
    }));
  }

  onChangeLanguage(e) {
    const language = e.target.value;

    this.setState((prevState) => ({
      currentLesson: {
        ...prevState.currentLesson,
        language: language,
      },
    }));
  }

  getLesson(lessonId) {
    LessonDataService.get(lessonId)
      .then((response) => {
        this.setState({
          currentLesson: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateTeacher() {
    LessonDataService.update(
      this.state.currentLesson.id,
      this.state.currentLesson
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
    LessonDataService.delete(this.state.currentLesson.id)
      .then((response) => {
        console.log(response.data);
        this.props.history.push("/teachers");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { currentLesson } = this.state;

    return (
      <div>
        {currentLesson ? (
          <div className="edit-form">
            <h4>Lessons</h4>
            <form>
              <div className="form-group">
                <label htmlFor="language">language</label>
                <input
                  type="text"
                  className="form-control"
                  id="language"
                  value={currentLesson.language}
                  onChange={this.onChangeLanguage}
                />
              </div>

              <div className="form-group">
                <label htmlFor="surename">surename</label>
                <input
                  type="text"
                  className="form-control"
                  id="surename"
                  value={currentLesson.time}
                />
              </div>
            </form>

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteTeacher}
            >
              Delete
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
