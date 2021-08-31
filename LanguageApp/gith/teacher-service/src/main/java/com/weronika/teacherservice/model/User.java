package com.weronika.teacherservice.model;

import javax.persistence.*;

@Entity // annotation indicates that the class is a persistent Java class
@Table(name = "users") //annotation provides the table that maps this entity
public class User {

    @Id//annotation is for the primary key
    @GeneratedValue(strategy = GenerationType.AUTO)
    //annotation is used to define generation strategy for the primary key. GenerationType.AUTO means Auto Increment field
    private long userId;

    @Column(name = "name")
    private String firstName;

    @Column(name = "surename")
    private String surename;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;


    public User(String firstName, String surename, String email, String language, String country) {
        this.firstName = firstName;
        this.surename = surename;
        this.email = email;
        this.password = language;
    }

    public User() {
    }

    public long getUserId() {
        return userId;
    }

    public void setUserId(long teacherId) {
        this.userId = teacherId;
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

}
