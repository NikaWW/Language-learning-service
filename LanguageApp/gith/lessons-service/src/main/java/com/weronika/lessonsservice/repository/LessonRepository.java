package com.weronika.lessonsservice.repository;

import com.weronika.lessonsservice.model.Lesson;
import com.weronika.lessonsservice.model.Teacher;
import com.weronika.lessonsservice.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LessonRepository extends JpaRepository<Lesson, Long> {
    List<Lesson> findByLanguageContaining(String language); //returns all Tutorials which title contains input title
    List<Lesson> findByTeacherContaining(Teacher teacher);
    List<Lesson> findByUserContaining(User user);


    //   List<Lesson> findByIdTeacherContaining(long idTeacher); //returns all Tutorials which title contains input title
  //  List<Lesson> findByIdUserContaining(long idUser); //returns all Tutorials which title contains input title


}
