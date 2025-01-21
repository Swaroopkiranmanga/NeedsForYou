package com.excelr.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.excelr.model.User;
import com.excelr.model.Userdto;
import com.excelr.service.LoginService;
import com.excelr.service.RazorpayService;

import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@Validated
public class LoginController {

	@Autowired
	private LoginService service;
	
	@Autowired
	private RazorpayService razorpayService;
	

	@PostMapping("/register")
	public User registerUser(@RequestBody User user) {
		return service.saveUser(user);
	}

	@PostMapping("/login")
	public ResponseEntity<Map<String, String>> login(@RequestBody @Valid Userdto userDTO) {
		return service.login(userDTO);
	}
	
	@PostMapping("/logout")
	public ResponseEntity<?> logout(){
		SecurityContextHolder.clearContext();
		return ResponseEntity.ok("OK");
	}

	@GetMapping("/healthcheck")
	public String check() {
		return "The controller is working";
	}
	
	/*
	 * razorpay
	 */
	@PostMapping("/create-order")
    public ResponseEntity<?> createOrder(@RequestBody Map<String, Object> data) {
        try {
            Double amount = (double) data.get("amount");
            String currency = (String) data.get("currency");
            String receipt = (String) data.get("receipt");

            String order = razorpayService.createOrder(amount, currency, receipt);
            return ResponseEntity.ok(order);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to create order");
        }
    }
	@PostMapping("/verify-payment")
    public ResponseEntity<?> verifyPayment(@RequestBody Map<String, String> data) {
        String orderId = data.get("razorpay_order_id");
        String paymentId = data.get("razorpay_payment_id");
        String signature = data.get("razorpay_signature");

        boolean isValid = razorpayService.verifyPayment(orderId, paymentId, signature);

        if (isValid) {
            return ResponseEntity.ok("Payment Verified");
        } else {
            return ResponseEntity.badRequest().body("Payment Verification Failed");
        }
    }
}
