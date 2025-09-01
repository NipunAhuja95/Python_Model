package com.ey.model.dto;

import lombok.Data;

@Data
public class EncryptedLoginRequest {
	private String encryptedEmail;
	private String encryptedPassword;
	
	private String serviceName;
	private String authId;
	
	public String getServiceName() {
		return serviceName;
	}

	public void setServiceName(String serviceName) {
		this.serviceName = serviceName;
	}

	public String getEncryptedEmail() {
		return encryptedEmail;
	}

	public void setEncryptedEmail(String encryptedEmail) {
		this.encryptedEmail = encryptedEmail;
	}

	public String getEncryptedPassword() {
		return encryptedPassword;
	}

	public void setEncryptedPassword(String encryptedPassword) {
		this.encryptedPassword = encryptedPassword;
	}

	public String getAuthId() {
		return authId;
	}

	public void setAuthId(String authId) {
		this.authId = authId;
	}
}
