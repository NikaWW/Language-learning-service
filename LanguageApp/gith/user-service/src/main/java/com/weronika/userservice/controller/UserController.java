package com.weronika.userservice.controller;

import com.weronika.userservice.models.User;
import com.weronika.userservice.repository.UserRepository;
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
    public class UserController {

        @Autowired
        UserRepository userRepository;

        @GetMapping("/user")
        public ResponseEntity<List<User>> getAllUsers(@RequestParam(required = false) String email) {
            try {
                List<User> teachers = new ArrayList<User>();

                if (email == null)
                    userRepository.findAll().forEach(teachers::add);
                else
                    userRepository.findByEmailContaining(email).forEach(teachers::add);

                if (teachers.isEmpty()) {
                    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
                }

                return new ResponseEntity<>(teachers, HttpStatus.OK);
            } catch (Exception e) {
                return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        @GetMapping("/user/{id}")
        public ResponseEntity<User> getTeacherById(@PathVariable("id") long id) {
            Optional<User> teacherData = userRepository.findById(id);

            if (teacherData.isPresent()) {
                return new ResponseEntity<>(teacherData.get(), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }


        @PostMapping("/user")
        public ResponseEntity<User> createUser(@RequestBody User teacher) {
                try {
                    if(userRepository.findByEmailContaining(teacher.getEmail()).isEmpty()) {
                    User _teacher = userRepository
                            .save(new User(teacher.getFirstName(), teacher.getSurename(), teacher.getEmail(), teacher.getPassword()));
                    return new ResponseEntity<>(_teacher, HttpStatus.CREATED); }
                } catch (Exception e) {
                    return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
                }
            return null;
        }

        @PutMapping("/user/{id}")
        public ResponseEntity<User> updateUser(@PathVariable("id") long id, @RequestBody User teacher) {
            Optional<User> teacherData = userRepository.findById(id);

            if (teacherData.isPresent()) {
                User _teacher = teacherData.get();
                _teacher.setFirstName(teacher.getFirstName());
                _teacher.setSurename(teacher.getSurename());
                _teacher.setEmail(teacher.getEmail());
                _teacher.setPassword(teacher.getPassword());

                return new ResponseEntity<>(userRepository.save(_teacher), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }

        @DeleteMapping("/user/{id}")
        public ResponseEntity<HttpStatus> deleteUser(@PathVariable("id") long id) {
            try {
                userRepository.deleteById(id);
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            } catch (Exception e) {
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        @DeleteMapping("/user")
        public ResponseEntity<HttpStatus> deleteAllUsers() {
            try {
                userRepository.deleteAll();
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            } catch (Exception e) {
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }

        }

    }
