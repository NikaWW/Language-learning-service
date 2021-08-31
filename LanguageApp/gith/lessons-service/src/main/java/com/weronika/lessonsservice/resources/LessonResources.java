package com.weronika.lessonsservice.resources;

import com.weronika.lessonsservice.model.Lesson;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/lessons")
public class LessonResources {



//    @RequestMapping("/{lessonId}")
//    public Lesson getLessonInfo(@PathVariable("lessonId") String lessonId) {
//        return new Lesson (lessonId, "english", LocalDateTime.parse("2021-01-05T12:30:00") , "1", "1");
//    }
//
//    @RequestMapping("/user/{userId}")
//    public List<Lesson> getUserLessonInfo(@PathVariable("userId") String userId) {
//        List<Lesson> lessons = Arrays.asList(
//                new Lesson("1", "polish", LocalDateTime.parse("2021-01-05T14:30:00"), "1", "1"),
//                new Lesson("2", "polish", LocalDateTime.parse("2021-01-05T15:30:00"), "1", "1")
//        );
//        return  lessons;
//    }

}

