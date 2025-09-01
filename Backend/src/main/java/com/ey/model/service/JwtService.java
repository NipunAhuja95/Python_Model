package com.ey.model.service;

import com.ey.model.entity.Role;
import com.ey.model.entity.User;
import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class JwtService {

	@Value("${jwt.secret}")
	private String SECRET;

	@Transactional(readOnly = true)
	public String generateToken(User user) {
	    Set<String> roles = user.getRoles().stream()
	            .map(Role::getName)
	            .collect(Collectors.toSet());

	    return Jwts.builder()
	            .setSubject(user.getEmail())
	            .claim("roles", roles)
	            .setIssuedAt(new Date())
	            .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60))
	            .signWith(SignatureAlgorithm.HS256, SECRET)
	            .compact();
	}

	public Claims validateToken(String token) {
		return Jwts.parser()
				.setSigningKey(SECRET).build()
				.parseClaimsJws(token)
				.getBody();
	}
}
