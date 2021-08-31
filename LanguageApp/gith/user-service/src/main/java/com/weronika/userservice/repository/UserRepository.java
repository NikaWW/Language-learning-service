package com.weronika.userservice.repository;

import com.weronika.userservice.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    List<User> findByEmailContaining(String email);
}
