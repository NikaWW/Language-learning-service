import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import "./App.css";

import AddTeacher from "./components/teacher/add-teacher";
import TeacherBook from "./components/teacher/teacher-book-lesson";
import TeachersList from "./components/teacher/teachers-list";
import LessonList from "./components/lessons/lesson-list";
import SignUp from "./components/mainPaige/SignUP";
import SignIn from "./components/mainPaige/SignIn";
import Home from "./components/mainPaige/Home";
import Profile from "./components/user/profile";
import LessonBook from "./components/lessons/lessonBook";

class App extends Component {
  render() {
    return (
      <>
        <Router>
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route path="/addTeacher" component={AddTeacher} />
            <Route path="/teachers/:id" component={TeacherBook} />
            <Route path="/user/lessons/:id" component={LessonList} />
            <Route path="/sign-up" component={SignUp} />
            <Route path="/login" component={SignIn} />
            <Route path="/teachers" component={TeachersList} />
            <Route path="/profile" component={Profile} />
            <Route path="/teacher/lessons/:id" component={LessonBook} />
          </Switch>
        </Router>
      </>
    );
  }
}

export default App;
