package com.excelr.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.excelr.model.User;
import com.excelr.repository.UserRepository;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class UserService {

    @Autowired
    UserRepository repository;

    public ResponseEntity<?> getUsers(Pageable pageable) {
        log.info("Fetching users with pagination");
        Page<User> users = repository.findAll(pageable);
        log.info("Found {} users", users.getTotalElements());
        return ResponseEntity.ok(users);
    }

    public ResponseEntity<?> updateUser(User user) {
        Integer id = user.getId();
        log.info("Updating user with ID: {}", id);
        Optional<User> userOpt = repository.findById(id);
        if (userOpt.isPresent()) {
            User existingUser = userOpt.get();
            existingUser.setUsername(user.getUsername());
            existingUser.setEmail(user.getEmail());
            existingUser.setPassword(user.getPassword());
            existingUser.setPhoneNumber(user.getPhoneNumber());
            existingUser.setRole(user.getRole());
            repository.save(existingUser);
            log.info("User with ID: {} updated successfully", id);
            return ResponseEntity.ok("User updated successfully");
        } else {
            log.warn("User with ID: {} not found", id);
            return ResponseEntity.ok("User not present");
        }
    }

    public ResponseEntity<?> deleteUserByname(Integer id) {
        log.info("Deleting user with ID: {}", id);
        Optional<User> userOpt = repository.findById(id);
        if (userOpt.isPresent()) {
            repository.deleteById(id);
            log.info("User with ID: {} deleted successfully", id);
            return ResponseEntity.ok("User deleted successfully");
        } else {
            log.warn("User with ID: {} not found", id);
            return ResponseEntity.ok("User not found");
        }
    }

    public User findUserById(Integer id) {
        log.info("Fetching user with ID: {}", id);
        Optional<User> userOpt = repository.findById(id);
        if (userOpt.isPresent()) {
            log.info("User with ID: {} found", id);
            return userOpt.get();
        } else {
            log.error("User with ID: {} not found", id);
            throw new RuntimeException("User not found");
        }
    }
}