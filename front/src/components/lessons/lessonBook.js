import React, { Component } from "react";
import TeacherDataService from "../../services/teacher.service";
import LessonDataService from "../../services/lesson.service";
import UserDataService from "../../services/user.service";
import NavbarU from "../user/navbarU";
import "./lessons.css";

export default class LessonBook extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeSurename = this.onChangeSurename.bind(this);
    this.onChangeLanguage = this.onChangeLanguage.bind(this);
    this.getTeacher = this.getTeacher.bind(this);
    this.updateTeacher = this.updateTeacher.bind(this);
    this.bookLesson = this.bookLesson.bind(this);

    this.state = {
      currentTeacher: {
        id: null,
        name: "",
        surename: "",
        email: "",
        language: "",
        country: "",
      },
      lessonsT: [],
      currentLesson: null,
      currentIndex: -1,
      message: "",
    };
  }

  componentDidMount() {
    this.getTeacher(this.props.match.params.id);
    this.getLessons(this.props.match.params.id);
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

  getLessons(id) {
    LessonDataService.getAllTeacherLessons(id)
      .then((response) => {
        this.setState({
          lessonsT: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateTeacher() {
    UserDataService.get(sessionStorage.getItem("userId"))
      .then((response) => {
        console.log(response.data);
        //  console.log(this.state.currentLesson.lessonId);
        LessonDataService.update(
          this.state.currentLesson.lessonId,
          response.data
        )
          .then((response) => {
            this.setState({
              message: "The teacher was updated successfully!",
            });
          })
          .catch((e) => {
            console.log(e);
          });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  bookLesson() {
    // LessonDataService.update(
    //   this.state.currentLesson.id,
    //   localStorage.getItem("userId")
    // )
    //   .then((response) => {
    //     console.log(response.data);
    //     this.setState({
    //       message: "The lesson was successfully booked!",
    //     });
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });

    UserDataService.get(sessionStorage.getItem("userId"))
      .then((response) => {
        console.log(response.data);
        LessonDataService.update(this.state.currentTeacher.id, response.data)
          .then((response) => {
            this.setState({
              message: "The teacher was updated successfully!",
            });
          })
          .catch((e) => {
            this.setState({
              message: "Something went wrong try again!",
            });
            console.log(e);
          });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  setActiveLesson(lesson, index) {
    this.setState({
      currentLesson: lesson,
      currentIndex: index,
    });
  }

  render() {
    const {
      currentTeacher,
      lessonsT,
      currentLesson,
      currentIndex,
    } = this.state;

    return (
      <>
        <NavbarU></NavbarU>
        <div className="form-container-less">
          <div className="form-content-left-less">
            {" "}
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
              <div>
                <p>Select a date:</p>
              </div>
              <div className="form-content-left-button-less">
                <ul className="list-groupl">
                  {lessonsT &&
                    lessonsT.map((lesson, index) => (
                      <li
                        className={
                          "list-group-li" +
                          (index === currentIndex ? "active" : "")
                        }
                        onClick={() => this.setActiveLesson(lesson, index)}
                        key={index}
                      >
                        <div>
                          <div>
                            {" language: "} {lesson.language}{" "}
                          </div>
                          <div>
                            {" date: "} {lesson.time.substr(0, 10)}{" "}
                            {lesson.time.substr(11, 5)}{" "}
                          </div>
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="form-content-right-less">
            {currentLesson ? (
              <div>
                <div>
                  {"languge: "}
                  {currentLesson.language}{" "}
                </div>
                <div>
                  {"time: "}
                  {currentLesson.time.substr(0, 10)}{" "}
                  {currentLesson.time.substr(11, 5)}{" "}
                </div>
                <div>
                  {"teacher: "}
                  {currentTeacher.name} {currentTeacher.surename}{" "}
                </div>
                <div>
                  {"teacher email: "}
                  {currentTeacher.email}
                </div>
                <button
                  type="submit"
                  className="btnl"
                  onClick={this.updateTeacher}
                >
                  BOOK
                </button>

                <p>{this.state.message}</p>
              </div>
            ) : (
              <div>
                <br />
                <p>Please click on a Lesson...</p>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
}
