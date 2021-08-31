package com.weronika.teacherservice.resources;

import com.weronika.teacherservice.model.LessonItem;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/teachers")
public class TeacherResources {

    @RequestMapping("/{teacherId}")
    public List<LessonItem> getLessons(@PathVariable("teacherId") String userId) {

        return Collections.singletonList(
                new LessonItem("polish", LocalDateTime.parse("2021-01-05T13:30:00"),1 , "1")
        );

    }

}
