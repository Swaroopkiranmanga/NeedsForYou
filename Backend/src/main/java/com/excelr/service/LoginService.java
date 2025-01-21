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

@Service
public class LoginService {

	@Autowired
	private UserRepository repository;

	@Autowired
	private JwtUtil jwtUtil;

	public User saveUser(User user) {
		repository.findByUsername(user.getUsername()).ifPresent(existingUser -> {
			throw new IllegalArgumentException("Username already exists: " + user.getUsername());
		});

		repository.findByEmail(user.getEmail()).ifPresent(existingUser -> {
			throw new IllegalArgumentException("Email already exists: " + user.getEmail());
		});
		return repository.save(user);
	}

	public ResponseEntity<Map<String, String>> login(@Valid Userdto userDTO) {
		String username = userDTO.getUsername();
		String password = userDTO.getPassword();

		Optional<User> user = repository.findByUsername(username);
		if (user.isPresent() && user.get().getPassword().equals(password)) {
			String token = jwtUtil.generateToken(username);

			Map<String, String> response = new HashMap<>();
			response.put("login", "success");
			response.put("token", token);
			response.put("role", user.get().getRole().getAuthority());
			return ResponseEntity.ok(response);
		} else {
			Map<String, String> failresponse = new HashMap<>();
			failresponse.put("login", "fail");
			return ResponseEntity.status(401).body(failresponse);
		}
	}

	public ResponseEntity<?> getUserByName(String username) {
		Optional<User> user = repository.findByUsername(username);
		if (user.isPresent()) {
			User useropt = user.get();
			return ResponseEntity.ok(user);
		} else {
			return ResponseEntity.ok("user not present");
		}
	}

	public ResponseEntity<?> updateUser(User user) {
		String name = user.getUsername();
		Optional<User> useropt = repository.findByUsername(name);
		if (useropt.isPresent()) {
			User user1 = useropt.get();
			user1.setEmail(user.getEmail());
			user1.setPassword(user.getPassword());
			user1.setPhoneNumber(user.getPhoneNumber());
			repository.save(user1);
			return ResponseEntity.ok("user updated successfully");
		} else {
			return ResponseEntity.ok("user not presented");
		}
	}

	public ResponseEntity<?> deleteUserByname(String username) {
		Optional<User> useropt = repository.findByUsername(username);
		if (useropt.isPresent()) {
			User usewr = useropt.get();
			Integer id = usewr.getId();
			repository.deleteById(id);
			return ResponseEntity.ok("user deleted succssfully");
		} else {
			return ResponseEntity.ok("user not found");
		}
	}
}
