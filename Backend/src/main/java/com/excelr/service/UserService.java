package com.excelr.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.excelr.model.User;
import com.excelr.repository.UserRepository;
@Service
public class UserService {
  
	@Autowired 
	UserRepository repository ; 
	
	public ResponseEntity<?> getUsers(Pageable pageable){
		Page<User> user = repository.findAll(pageable);
			return ResponseEntity.ok(user);
	}
	public ResponseEntity<?> updateUser(User user){
		Integer id =user.getId();
		Optional<User> useropt = repository.findById(id);
		if(useropt.isPresent()) {
			User user1=useropt.get();
			user1.setUsername(user.getUsername());
			user1.setEmail(user.getEmail());
			user1.setPassword(user.getPassword());
			user1.setPhoneNumber(user.getPhoneNumber());
			user1.setRole(user.getRole());
			repository.save(user1);
			return ResponseEntity.ok("user updated successfully");
		}else {	
			return ResponseEntity.ok("user not presented");
		}
	}
	public ResponseEntity<?> deleteUserByname(Integer id){
		Optional<User> useropt = repository.findById(id);
		if(useropt.isPresent()) {
			User usewr =useropt.get();
			
			repository.deleteById(id);
			return ResponseEntity.ok("user deleted succssfully");
		}else {
			return ResponseEntity.ok("user not found");
		}
	}
	public User findUserById(Integer id) {
		Optional<User> useropt= repository.findById(id);
		User usewr =useropt.get();
		return usewr;
	}
}
