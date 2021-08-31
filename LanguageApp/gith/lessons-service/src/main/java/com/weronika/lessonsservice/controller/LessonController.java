package com.weronika.lessonsservice.controller;

import com.weronika.lessonsservice.model.Lesson;
import com.weronika.lessonsservice.model.Teacher;
import com.weronika.lessonsservice.model.User;
import com.weronika.lessonsservice.repository.LessonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:8083") //is for configuring allowed origins
@RestController
@RequestMapping("/api") // declares that all Apis’ url in the controller will start with /api
public class LessonController {

    @Autowired  //We use @Autowired to inject TutorialRepository bean to local variable.
            LessonRepository lessonRepository;

        @GetMapping("/lessons")
        public ResponseEntity<List<Lesson>> getAllLessons(@RequestParam(required = false) String language) {
            try {
                List<Lesson> lessons = new ArrayList<Lesson>();

                if (language == null)
                    lessonRepository.findAll().forEach(lessons::add);
                else
                    lessonRepository.findByLanguageContaining(language).forEach(lessons::add);

                if (lessons.isEmpty()) {
                    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
                }

                return new ResponseEntity<>(lessons, HttpStatus.OK);
            } catch (Exception e) {
                return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

    @GetMapping("/teacher/lessons/{id}")
    public ResponseEntity<List<Lesson>> getAllTeacherLessons(@PathVariable("id") long id) {
        try {
            List<Lesson> lessons = new ArrayList<Lesson>();
            List<Lesson> teacherLessons = new ArrayList<Lesson>();

            lessonRepository.findAll().forEach(lessons::add);

            for (Lesson lesson: lessons ) {
                   if(lesson.getTeacher().getTeacherId() == id ) {
                       if(lesson.getUser() != null){
                           System.out.println("Hi");
                       }
                       else {
                           System.out.println("nullll");
                           teacherLessons.add(lesson);
                       }
                   }
            }

//            if (teacher == null)
//                lessonRepository.findAll().forEach(lessons::add);
//            else
//                lessonRepository.findByTeacherContaining(teacher).forEach(lessons::add);
//
//            if (lessons.isEmpty()) {
//                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//            }
            return new ResponseEntity<>(teacherLessons, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/user/lessons/{id}")
    public ResponseEntity<List<Lesson>> getAllUserLessons(@PathVariable("id") long id) {
        try {
            List<Lesson> lessons = new ArrayList<Lesson>();
            List<Lesson> userLessons = new ArrayList<Lesson>();

            lessonRepository.findAll().forEach(lessons::add);

            for (Lesson lesson: lessons ) {
                if(lesson.getUser() != null) {
                    System.out.println("user id" + lesson.getUser().getUserId() + "moje" + id);
                    if (lesson.getUser().getUserId() == id) {

                        userLessons.add(lesson);
                    }
                }
            }

            return new ResponseEntity<>(userLessons, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

        @GetMapping("/lessons/{id}")
        public ResponseEntity<Lesson> getLessonById(@PathVariable("id") long id) {
            Optional<Lesson> lessonData = lessonRepository.findById(id);

            if (lessonData.isPresent()) {
                return new ResponseEntity<>(lessonData.get(), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }

        @PostMapping("/lessons")
        public ResponseEntity<Lesson> createLesson(@RequestBody Lesson lesson, Teacher teacher) {
            try {
                Lesson _lesson = lessonRepository
                        .save(new Lesson(lesson.getLanguage(), lesson.getTime(),teacher));
                return new ResponseEntity<>(_lesson, HttpStatus.CREATED);
            } catch (Exception e) {
                return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        @PutMapping("/teacher/lessons/{id}")
        public ResponseEntity<Lesson> updateLesson(@PathVariable("id") String id, @RequestBody User user) {
            Optional<Lesson> tutorialData = lessonRepository.findById(Long.parseLong(id));

            if (tutorialData.isPresent()) {

                Lesson _lesson = tutorialData.get();
                if(_lesson.getUser() == null) {
                    _lesson.setUser(user);
                    return new ResponseEntity<>(lessonRepository.save(_lesson), HttpStatus.OK);
                }
                else {
                    return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
                }
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }

        @DeleteMapping("/lessons/{id}")
        public ResponseEntity<HttpStatus> deleteLesson(@PathVariable("id") long id) {
            try {
                lessonRepository.deleteById(id);
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            } catch (Exception e) {
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        @DeleteMapping("/lessons")
        public ResponseEntity<HttpStatus> deleteAllLessons() {
            try {
                lessonRepository.deleteAll();
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            } catch (Exception e) {
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }

        }

    }
