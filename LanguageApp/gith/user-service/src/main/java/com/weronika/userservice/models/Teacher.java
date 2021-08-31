package com.weronika.userservice.models;

import javax.persistence.*;
import java.util.List;

@Entity // annotation indicates that the class is a persistent Java class
@Table(name = "teachers") //annotation provides the table that maps this entity
public class Teacher {

    @Id//annotation is for the primary key
    @GeneratedValue(strategy = GenerationType.AUTO) //annotation is used to define generation strategy for the primary key. GenerationType.AUTO means Auto Increment field
    private long teacherId;

    @Column(name = "name")
    private String firstName;

    @Column(name = "surename")
    private String surename;

    @Column(name = "email")
    private String email;

    @Column(name = "language")
    private String language;

    @Column(name = "country")
    private String country;

    @Transient
    private Lesson lesson;
    @OneToMany(targetEntity=Lesson.class )
    private List<Lesson> lessonslist;

    public Teacher(String firstName, String surename, String email, String language, String country) {
        this.firstName = firstName;
        this.surename = surename;
        this.email = email;
        this.language = language;
        this.country = country;
    }

    public Teacher() {
    }

    public long getTeacherId() {
        return teacherId;
    }

    public void setTeacherId(long teacherId) {
        this.teacherId = teacherId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getSurename() {
        return surename;
    }

    public void setSurename(String surename) {
        this.surename = surename;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public Lesson getLesson() {
        return lesson;
    }

    public void setLesson(Lesson lesson) {
        this.lesson = lesson;
    }

    public void setLessonslist(List<Lesson> lessonslist) {
        this.lessonslist = lessonslist;
    }
}

