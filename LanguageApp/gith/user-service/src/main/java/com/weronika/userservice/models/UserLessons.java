package com.weronika.userservice.models;

import java.util.List;

public class UserLessons {

        private String userId;
        private List<Lesson> lessons;

    public UserLessons() {
    }

    public UserLessons(String userId, List<Lesson> lessons) {
        this.userId = userId;
        this.lessons = lessons;
    }

    public String getUserId() {
            return userId;
        }

        public void setUserId(String userId) {
            this.userId = userId;
        }

        public List<Lesson> getLessons() {
            return lessons;
        }

        public void setLessons(List<Lesson> lessons) {
            this.lessons = lessons;
        }

    }

