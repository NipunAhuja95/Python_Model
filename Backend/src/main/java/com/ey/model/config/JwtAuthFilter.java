package com.ey.model.config;

import com.ey.model.entity.User;
import com.ey.model.repository.UserRepository;
import com.ey.model.service.JwtService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import jakarta.servlet.*;
import jakarta.servlet.http.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.*;
import org.springframework.security.core.*;
import org.springframework.security.core.context.*;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

	@Autowired
  private  JwtService jwtService;
	
	@Autowired
  private  UserRepository userRepo;
  
  
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
	        throws ServletException, IOException {
	    String authHeader = request.getHeader("Authorization");

	    if (authHeader == null || !authHeader.startsWith("Bearer ")) {
	        filterChain.doFilter(request, response);
	        return;
	    }

	    String token = authHeader.substring(7);
	    try {
	        Claims claims = jwtService.validateToken(token);
	        String email = claims.getSubject();

	        User user = userRepo.findByEmail(email)
	        	    .orElseThrow(() -> new UsernameNotFoundException("User not found"));

	        	UserDetails userDetails = new CustomUserDetails(user);


	        Authentication auth = new UsernamePasswordAuthenticationToken(
	            userDetails,
	            null,
	            userDetails.getAuthorities()
	        );

	        SecurityContextHolder.getContext().setAuthentication(auth);
	    } catch (ExpiredJwtException | MalformedJwtException e) {
	        // Log and do NOT set authentication, let the request continue unauthenticated
	        // Optionally, you can send error response here if desired
	        System.out.println("JWT validation failed: " + ((Throwable) e).getMessage());
	    }

	    filterChain.doFilter(request, response);
	}


}
