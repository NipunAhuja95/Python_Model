package com.ey.model.controller;

import java.util.Base64;
import java.util.Set;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.ey.model.config.RSAUtil;
import com.ey.model.dto.PasswordResetRequest;
import com.ey.model.dto.UserCreateRequest;
import com.ey.model.entity.Role;
import com.ey.model.entity.User;
import com.ey.model.repository.RoleRepository;
import com.ey.model.repository.UserRepository;
import com.ey.model.service.PasswordResetTokenService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/master")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class UserController {

	@Autowired
	private UserRepository userRepo;

	@Autowired
	private RoleRepository roleRepo;

	@Autowired
	private RSAUtil rsaUtil;

	@Value("${app.rsa.public-key}")
	private String rsaPublicKey;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private JavaMailSender mailSender;

	@Autowired
	private PasswordResetTokenService tokenService;

	@PostMapping("/add-user")
	public ResponseEntity<?> createUser(@RequestBody UserCreateRequest request) {

		String encryptedPassword;

		if (userRepo.findByEmail(request.getEmail()).isPresent()) {
			return ResponseEntity.badRequest().body("Email already exists");
		}

		Set<Role> roles = request.getRoles().stream()
				.map(name -> roleRepo.findByName(name)
						.orElseThrow(() -> new RuntimeException("Invalid role: " + name)))
				.collect(Collectors.toSet());

		try {

			byte[] encryptedBytes = RSAUtil.encrypt(request.getPassword(), rsaPublicKey);
			encryptedPassword = Base64.getEncoder().encodeToString(encryptedBytes);

		} catch (Exception e) {
			return ResponseEntity.internalServerError().body("RSA Encryption failed: " + e.getMessage());
		}

		User user = new User();
		user.setUsername(request.getUsername());
		user.setEmail(request.getEmail());
		user.setPassword(encryptedPassword);
		user.setRoles(roles);
		userRepo.save(user);

		// Reset Token Generation
		String token = tokenService.generateToken(user.getEmail());

		String resetLink = "http://localhost:3000/reset-password?email=" + user.getEmail() + "&token=" + token;

		SimpleMailMessage msg = new SimpleMailMessage();
		msg.setTo(user.getEmail());
		msg.setSubject("User Creation");
		msg.setText("Click the link to set your password:\n" + resetLink);
		mailSender.send(msg);

		return ResponseEntity.ok("User created and email sent");
	}

	@PostMapping("/reset-password")
	public ResponseEntity<?> resetPassword(@RequestBody PasswordResetRequest request) {
		if (!tokenService.validateToken(request.getEmail(), request.getToken())) {
			return ResponseEntity.badRequest().body("Invalid or expired token");
		}

		User user = userRepo.findByEmail(request.getEmail())
				.orElseThrow(() -> new UsernameNotFoundException("User not found"));

		try {

			byte[] encryptedBytes = RSAUtil.encrypt(request.getNewPassword(), rsaPublicKey);
			String encryptedPassBase64 = Base64.getEncoder().encodeToString(encryptedBytes);
			user.setPassword(encryptedPassBase64);

		} catch (Exception e) {
			return ResponseEntity.internalServerError().body("Password encryption failed");
		}

		userRepo.save(user);

		return ResponseEntity.ok("Password updated successfully");
	}

}
