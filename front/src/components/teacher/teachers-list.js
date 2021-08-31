import React, { Component } from "react";
import TeacherDataService from "../../services/teacher.service";
import { Link } from "react-router-dom";
import "./teacher.css";
import NavbarU from "../user/navbarU";

export default class TeachersList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchLanguage = this.onChangeSearchLanguage.bind(this);
    this.retrieveTeachers = this.retrieveTeachers.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveTeacher = this.setActiveTeacher.bind(this);
    this.removeAllTeachers = this.removeAllTeachers.bind(this);
    this.searchLanguage = this.searchLanguage.bind(this);

    this.state = {
      teachers: [],
      currentTeacher: null,
      currentIndex: -1,
      searchLanguage: "",
    };
  }

  componentDidMount() {
    this.retrieveTeachers();
  }

  onChangeSearchLanguage(e) {
    const searchLanguage = e.target.value;

    this.setState({
      searchLanguage: searchLanguage,
    });
  }

  retrieveTeachers() {
    TeacherDataService.getAll()
      .then((response) => {
        this.setState({
          teachers: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveTeachers();
    this.setState({
      currentTeacher: null,
      currentIndex: -1,
    });
  }

  setActiveTeacher(teacher, index) {
    this.setState({
      currentTeacher: teacher,
      currentIndex: index,
    });
  }

  removeAllTeachers() {
    TeacherDataService.deleteAll()
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
      currentTeacher: null,
      currentIndex: -1,
    });

    TeacherDataService.findByLanguage(this.state.searchLanguage)
      .then((response) => {
        this.setState({
          teachers: response.data,
        });
        console.log(response.data);
        console.log("AAAA");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const {
      searchLanguage,
      teachers,
      currentTeacher,
      currentIndex,
    } = this.state;

    return (
      <>
        <NavbarU />
        <div className="form-container-teach">
          <div className="form-content-left-teach">
            <div className="form-content-left-top-teach">
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
            <div className="form-content-left-bottom-teach">
              <ul className="list-group">
                {teachers &&
                  teachers.map((teacher, index) => (
                    <li
                      className={
                        "list-group-li" +
                        (index === currentIndex ? "active" : "")
                      }
                      onClick={() => this.setActiveTeacher(teacher, index)}
                      key={index}
                    >
                      <div className="title">
                        {teacher.name} {teacher.surename}
                      </div>
                      <div>
                        <i class="fas fa-globe"></i> {" language: "}{" "}
                        {teacher.language}{" "}
                      </div>
                      <i class="far fa-envelope"></i>
                      {" email: "} {teacher.email}
                    </li>
                  ))}
              </ul>
            </div>
          </div>

          <div className="form-content-right-teach">
            <div className="form-teach">
              {currentTeacher ? (
                <div>
                  <h4>
                    {currentTeacher.name} {"  "} {currentTeacher.surename}
                  </h4>
                  <div>
                    <label>
                      <strong>language:</strong>
                    </label>{" "}
                    {currentTeacher.language}
                  </div>
                  <div>
                    <label>
                      <strong>country :</strong>
                    </label>{" "}
                    {currentTeacher.country}
                  </div>
                  {console.log(currentTeacher.teacherId)}

                  <Link
                    to={"/teacher/lessons/" + currentTeacher.teacherId}
                    className="badge badge-warning"
                  >
                    {"  "} Book lesson
                  </Link>
                </div>
              ) : (
                <div>
                  <br />
                  <p>Please click on a teacher...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}
