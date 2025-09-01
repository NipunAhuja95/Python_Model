package com.ey.model.controller;

import java.util.Base64;
import java.util.Map;

import javax.crypto.Cipher;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ey.model.config.RSAUtil;
import com.ey.model.dto.EncryptedLoginRequest;
import com.ey.model.entity.User;
import com.ey.model.repository.UserRepository;
import com.ey.model.service.JwtService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class AuthController {

	@Autowired
	private UserRepository userRepo;

	@Autowired
	private JwtService jwtService;

	@Autowired
	private RSAUtil rsaUtil;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Value("${app.rsa.private-key}")
	private String rsaPrivateKey;

	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody EncryptedLoginRequest req) throws Exception {
		String email = "";
		String password = "";
		if (req.getEncryptedEmail() != null && !req.getEncryptedEmail().isEmpty()) {
			email = RSAUtil.decrypt(req.getEncryptedEmail(), rsaPrivateKey);
		}

		if (req.getEncryptedPassword() != null && !req.getEncryptedPassword().isEmpty()) {
			password = RSAUtil.decrypt(req.getEncryptedPassword(), rsaPrivateKey);
		}

		User user = userRepo.findByEmail(email)
				.orElseThrow(() -> new UsernameNotFoundException("User not found"));

		if (!passwordEncoder.matches(password, user.getPassword())) {
			throw new BadCredentialsException("Invalid password");
		}

		String jwt = jwtService.generateToken(user);
		return ResponseEntity.ok(Map.of("token", jwt));
	}

}
