package com.excelr.service;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;

@Service
public class RazorpayService {
	
	@Value("${razorpay.key.id}")
	private String keyId;

	@Value("${razorpay.key.secret}")
	private String keySecret;
	
	public String createOrder(Double amount, String currency, String receipt) throws RazorpayException {
		RazorpayClient razorpay = new RazorpayClient(keyId, keySecret);

		JSONObject orderRequest = new JSONObject();
		orderRequest.put("amount", amount * 100); // Amount in paise
		orderRequest.put("currency", currency);
		orderRequest.put("receipt", receipt);

		Order order = razorpay.orders.create(orderRequest);
		return order.toString();
	}

	public boolean verifyPayment(String orderId, String paymentId, String signature) {
		String generatedSignature = HmacSHA256(orderId + "|" + paymentId, keySecret);
		return generatedSignature.equals(signature);
	}

	private String HmacSHA256(String data, String secret) {
		try {
			javax.crypto.Mac mac = javax.crypto.Mac.getInstance("HmacSHA256");
			mac.init(new javax.crypto.spec.SecretKeySpec(secret.getBytes(), "HmacSHA256"));
			byte[] hmacData = mac.doFinal(data.getBytes());
			return javax.xml.bind.DatatypeConverter.printHexBinary(hmacData).toLowerCase();
		} catch (Exception e) {
			throw new RuntimeException("Failed to calculate HMAC SHA256", e);
		}
	}
}
