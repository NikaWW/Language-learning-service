package com.weronika.teacherservice.controller;

import com.weronika.teacherservice.model.Teacher;
import com.weronika.teacherservice.repository.TeacherRepository;
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
public class TeacherController {

    @Autowired
    TeacherRepository teacherRepository;

    @GetMapping("/teachers")
    public ResponseEntity<List<Teacher>> getAllTeachers(@RequestParam(required = false) String language) {
        try {
            List<Teacher> teachers = new ArrayList<Teacher>();

            if (language == null)
                teacherRepository.findAll().forEach(teachers::add);
            else
                teacherRepository.findByLanguageContaining(language).forEach(teachers::add);

            if (teachers.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(teachers, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/teachers/{id}")
    public ResponseEntity<Teacher> getTeacherById(@PathVariable("id") long id) {
        Optional<Teacher> teacherData = teacherRepository.findById(id);

        if (teacherData.isPresent()) {
            return new ResponseEntity<>(teacherData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @PostMapping("/teachers")
    public ResponseEntity<Teacher> createTeacher(@RequestBody Teacher teacher) {
        try {
            Teacher _teacher = teacherRepository
                    .save(new Teacher(teacher.getName(), teacher.getSurename(), teacher.getEmail(), teacher.getLanguage(), teacher.getCountry()));
            return new ResponseEntity<>(_teacher, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/teachers/{id}")
    public ResponseEntity<Teacher> updateTeacher(@PathVariable("id") long id, @RequestBody Teacher teacher) {
        Optional<Teacher> teacherData = teacherRepository.findById(id);

        if (teacherData.isPresent()) {
            Teacher _teacher = teacherData.get();
            _teacher.setName(teacher.getName());
            _teacher.setSurename(teacher.getSurename());
            _teacher.setEmail(teacher.getEmail());
            _teacher.setLanguage(teacher.getLanguage());
            _teacher.setCountry(teacher.getCountry());
            return new ResponseEntity<>(teacherRepository.save(_teacher), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/teachers/{id}")
    public ResponseEntity<HttpStatus> deleteTeacher(@PathVariable("id") long id) {
        try {
            teacherRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/teachers")
    public ResponseEntity<HttpStatus> deleteAllTeachers() {
        try {
            teacherRepository.deleteAll();
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

}
