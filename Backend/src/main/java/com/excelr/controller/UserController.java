package com.excelr.controller;

import org.apache.catalina.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.excelr.model.Productdto;
import com.excelr.model.User;
import com.excelr.model.Userdto;
import com.excelr.service.UserService;
@RestController
@Validated
public class UserController {
	
	@Autowired
	UserService service;
	
	@GetMapping("/finduser")
	public ResponseEntity<?> findUser(@PageableDefault(size = 10) Pageable pageable){
		return service.getUsers(pageable);
	}
	
	@PutMapping("/updateuser")
	public ResponseEntity<?> upadateUser(@RequestBody User user) {
		return service.updateUser(user);
	}
	
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<?> deleteUser(@PathVariable Integer id){
		
		return service.deleteUserByname(id);
	}
	
	@GetMapping("/finduser/{id}")
	public User findUserById(@PathVariable Integer id) {
		return service.findUserById(id);
	}

}
