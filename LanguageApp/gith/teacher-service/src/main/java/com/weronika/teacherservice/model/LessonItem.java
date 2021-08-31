package com.weronika.teacherservice.model;

import java.time.LocalDateTime;

public class LessonItem {

    private String language;
    private LocalDateTime time;
    private long teacherId;
    private String studentId;


    public LessonItem(String language, LocalDateTime time, long teacherId, String studentId) {
        this.language = language;
        this.time = time;
        this.teacherId = teacherId;
        this.studentId = studentId;
    }

    public LessonItem() {
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

    public long getTeacherId() {
        return teacherId;
    }

    public void setTeacherId(long teacherId) {
        this.teacherId = teacherId;
    }

    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

}
