package com.weronika.teacherservice.repository;

import com.weronika.teacherservice.model.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TeacherRepository extends JpaRepository<Teacher, Long> {
    List<Teacher> findByLanguageContaining(String language); //returns all Teacher which language contains input language
}
