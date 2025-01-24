package com.excelr.service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.excelr.model.User;
import com.excelr.model.Userdto;
import com.excelr.repository.UserRepository;
import com.excelr.util.JwtUtil;

import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class LoginService {

    @Autowired
    private UserRepository repository;

    @Autowired
    private JwtUtil jwtUtil;

    public User saveUser(User user) {
        log.info("Saving user with username: {}", user.getUsername());
        repository.findByUsername(user.getUsername()).ifPresent(existingUser -> {
            log.error("Username already exists: {}", user.getUsername());
            throw new IllegalArgumentException("Username already exists: " + user.getUsername());
        });

        repository.findByEmail(user.getEmail()).ifPresent(existingUser -> {
            log.error("Email already exists: {}", user.getEmail());
            throw new IllegalArgumentException("Email already exists: " + user.getEmail());
        });

        User savedUser = repository.save(user);
        log.info("User saved successfully with ID: {}", savedUser.getId());
        return savedUser;
    }

    public ResponseEntity<Map<String, String>> login(@Valid Userdto userDTO) {
        String username = userDTO.getUsername();
        String password = userDTO.getPassword();
        log.info("Attempting login for username: {}", username);

        Optional<User> user = repository.findByUsername(username);
        if (user.isPresent() && user.get().getPassword().equals(password)) {
            log.info("Login successful for username: {}", username);
            String token = jwtUtil.generateToken(username);

            Map<String, String> response = new HashMap<>();
            response.put("login", "success");
            response.put("token", token);
            response.put("role", user.get().getRole().getAuthority());
            return ResponseEntity.ok(response);
        } else {
            log.warn("Login failed for username: {}", username);
            Map<String, String> failResponse = new HashMap<>();
            failResponse.put("login", "fail");
            return ResponseEntity.status(401).body(failResponse);
        }
    }

    public ResponseEntity<?> getUserByName(String username) {
        log.info("Fetching user by username: {}", username);
        Optional<User> user = repository.findByUsername(username);
        if (user.isPresent()) {
            log.info("User found: {}", username);
            return ResponseEntity.ok(user);
        } else {
            log.warn("User not found: {}", username);
            return ResponseEntity.ok("user not present");
        }
    }

    public ResponseEntity<?> updateUser(User user) {
        String name = user.getUsername();
        log.info("Updating user with username: {}", name);
        Optional<User> userOpt = repository.findByUsername(name);
        if (userOpt.isPresent()) {
            User existingUser = userOpt.get();
            existingUser.setEmail(user.getEmail());
            existingUser.setPassword(user.getPassword());
            existingUser.setPhoneNumber(user.getPhoneNumber());
            repository.save(existingUser);
            log.info("User updated successfully: {}", name);
            return ResponseEntity.ok("user updated successfully");
        } else {
            log.warn("User not found for update: {}", name);
            return ResponseEntity.ok("user not presented");
        }
    }

    public ResponseEntity<?> deleteUserByname(String username) {
        log.info("Deleting user by username: {}", username);
        Optional<User> userOpt = repository.findByUsername(username);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            Integer id = user.getId();
            repository.deleteById(id);
            log.info("User deleted successfully with ID: {}", id);
            return ResponseEntity.ok("user deleted successfully");
        } else {
            log.warn("User not found for deletion: {}", username);
            return ResponseEntity.ok("user not found");
        }
    }
}
