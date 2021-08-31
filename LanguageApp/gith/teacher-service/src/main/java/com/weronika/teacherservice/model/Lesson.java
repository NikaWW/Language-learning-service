package com.weronika.teacherservice.model;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity // annotation indicates that the class is a persistent Java class
@Table(name = "lessons") //annotation provides the table that maps this entity
public class Lesson {

    @Id//annotation is for the primary key
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long lessonId;

    @Column(name = "language")
    private String language;

    @Column(name = "time")
    private LocalDateTime time;

    @ManyToOne
    private Teacher teacher;

    @ManyToOne
    private User user;


    public Lesson(String language, LocalDateTime time, Teacher teacher, User user) {
        this.language = language;
        this.time = time;
        this.teacher = teacher;
        this.user = user;
    }

    public Lesson() {
    }

    public long getLessonId() {
        return lessonId;
    }

    public void setLessonId(long lessonId) {
        this.lessonId = lessonId;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public LocalDateTime getTime() {
        return time;
    }

    public void setTime(LocalDateTime time) {
        this.time = time;
    }

    public Teacher getTeacher() {
        return teacher;
    }

    public void setTeacher(Teacher teacher) {
        this.teacher = teacher;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
