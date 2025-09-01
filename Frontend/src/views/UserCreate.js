import React, { useEffect, useState } from 'react';
import {
  TextField,
  Button,
  MenuItem,
  IconButton,
  InputAdornment
} from '@mui/material';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import { JSEncrypt } from 'jsencrypt';
import axios from 'axios';

const UserCreate = () => {
  const [config, setConfig] = useState({});
  const [publicKey, setPublicKey] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    retypePassword: '',
    role: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showRetypePassword, setShowRetypePassword] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState(false);

  const roles = ['Admin', 'User'];

  useEffect(() => {
    fetch('./config.json')
      .then((response) => response.json())
      .then((data) => {
        setConfig(data);
        if (data.publicKey) {
          const fullKey = `-----BEGIN PUBLIC KEY-----\n${data.publicKey}\n-----END PUBLIC KEY-----`;
          setPublicKey(fullKey);
        } else {
          console.warn('Public key missing in config');
        }
      })
      .catch((error) => console.error('Error loading config:', error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === 'password' || name === 'retypePassword') {
      const other = name === 'password' ? formData.retypePassword : formData.password;
      setPasswordMismatch(value !== other);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!publicKey) {
      alert('Public key not loaded.');
      return;
    }

    if (formData.password !== formData.retypePassword) {
      setPasswordMismatch(true);
      return;
    }

    const encryptor = new JSEncrypt();
    encryptor.setPublicKey(publicKey);

    const encryptedPassword = encryptor.encrypt(formData.password);

    if (!encryptedPassword) {
      alert('Password encryption failed.');
      return;
    }

    const payload = {
      username: formData.username,
      email: formData.email,
      password: encryptedPassword,
      roles: [formData.role], // Ensure it's a list
    };

    try {
      const response = await axios.post(config.apiUrlAddUser, payload, {
        headers: { 'Content-Type': 'application/json' },
      });

      alert('User successfully created!');
      setFormData({
        username: '',
        email: '',
        password: '',
        retypePassword: '',
        role: '',
      });
    } catch (error) {
      console.error('Error creating user:', error);
      alert('Failed to create user. Please check logs or backend.');
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow-md w-full max-w-xl">
      <h2 className="text-lg font-semibold mb-6 text-gray-800">Create User</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <TextField
          label="User Name"
          name="username"
          value={formData.username}
          onChange={handleChange}
          fullWidth
          size="small"
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          size="small"
        />
        <TextField
          label="Password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          value={formData.password}
          onChange={handleChange}
          fullWidth
          size="small"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword((prev) => !prev)} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Retype Password"
          name="retypePassword"
          type={showRetypePassword ? 'text' : 'password'}
          value={formData.retypePassword}
          onChange={handleChange}
          fullWidth
          size="small"
          error={passwordMismatch}
          helperText={passwordMismatch ? 'Passwords do not match' : ''}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowRetypePassword((prev) => !prev)} edge="end">
                  {showRetypePassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          select
          label="Role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          fullWidth
          size="small"
        >
          {roles.map((role) => (
            <MenuItem key={role} value={role}>
              {role}
            </MenuItem>
          ))}
        </TextField>

        <div className="pt-6">
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            className="py-2"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UserCreate;
