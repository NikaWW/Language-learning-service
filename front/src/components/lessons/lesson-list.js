import React, { Component } from "react";
import LessonDataService from "../../services/lesson.service";
import { Link } from "react-router-dom";
import NavbarU from "../user/navbarU";
import "./lessons.css";

export default class LessonList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchLanguage = this.onChangeSearchLanguage.bind(this);
    this.retrieveLessons = this.retrieveLessons.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveLesson = this.setActiveLesson.bind(this);
    this.removeAllLessons = this.removeAllLessons.bind(this);
    this.searchLanguage = this.searchLanguage.bind(this);

    this.state = {
      lessons: [],
      currentLesson: null,
      currentIndex: -1,
      searchLanguage: "",
    };
  }

  componentDidMount() {
    this.retrieveLessons();
  }

  onChangeSearchLanguage(e) {
    const searchLanguage = e.target.value;

    this.setState({
      searchLanguage: searchLanguage,
    });
  }

  retrieveLessons() {
    LessonDataService.getAllUserLessons(sessionStorage.getItem("userId"))
      .then((response) => {
        this.setState({
          lessons: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveLessons();
    this.setState({
      currentLesson: null,
      currentIndex: -1,
    });
  }

  setActiveLesson(lesson, index) {
    this.setState({
      currentLesson: lesson,
      currentIndex: index,
    });
  }

  removeAllLessons() {
    LessonDataService.deleteAll()
      .then((response) => {
        console.log(response.data);
        this.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  searchLanguage() {
    this.setState({
      currentLesson: null,
      currentIndex: -1,
    });

    LessonDataService.findByLanguage(this.state.searchLanguage)
      .then((response) => {
        this.setState({
          lessons: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { searchLanguage, lessons, currentLesson, currentIndex } = this.state;

    return (
      <>
        <NavbarU />
        <div className="form-container-less">
          <div className="form-content-left-less">
            <div className="form-content-left-top-less">
              <div className="form-teach">
                <div className="form-inputs-d">
                  <input
                    type="text"
                    className="form-input-teach"
                    placeholder="Search by Language"
                    value={searchLanguage}
                    onChange={this.onChangeSearchLanguage}
                  />
                  <div className="input-group-append">
                    <button
                      className="form-input-btn-teach"
                      type="button"
                      onClick={this.searchLanguage}
                    >
                      Search
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="form-content-left-bottom-less">
              <ul className="list-groupl">
                {lessons &&
                  lessons.map((lesson, index) => (
                    <li
                      className={
                        "list-groupl-li" +
                        (index === currentIndex ? "active" : "")
                      }
                      onClick={() => this.setActiveLesson(lesson, index)}
                      key={index}
                    >
                      <div className="titlel"> {lesson.language} </div>
                      <div>
                        {"Date: "}
                        {lesson.time.substr(0, 10)} {lesson.time.substr(11, 5)}
                      </div>
                      <div>
                        {"Teacher: "}
                        {lesson.teacher.firstName} {lesson.teacher.surename}
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
          <div className="form-content-right-less">
            {currentLesson ? (
              <div>
                <h4>
                  {currentLesson.name} {"  "} {currentLesson.surename}
                </h4>
                <div>
                  <label>
                    <strong>language:</strong>
                  </label>{" "}
                  {currentLesson.language}
                </div>
                <div>
                  <label>
                    <strong>date: </strong>
                  </label>{" "}
                  {currentLesson.time.substr(0, 10)}{" "}
                  {currentLesson.time.substr(11, 5)}
                </div>
                <div>
                  <label>
                    <strong>teacher: </strong>
                  </label>{" "}
                  {currentLesson.teacher.firstName}{" "}
                  {currentLesson.teacher.surename}
                </div>
                <div>
                  <label>
                    <strong>teacher contact: </strong>
                  </label>{" "}
                  {currentLesson.teacher.email}
                </div>
                {console.log(currentLesson.lessonId)}
                {console.log(currentLesson.teacher.firstName)}
              </div>
            ) : (
              <div>
                <br />
                <p>Please click on a teacher...</p>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
}
