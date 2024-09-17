import  { useState } from 'react';
import { TextField, Button, Typography, Box, Container, Avatar, Grid,Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import TypedGreetings from './TypedGreetings';



function SignUp() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    username: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    const newErrors = {
      username: formData.username === '',
      email: formData.email === '' || !/\S+@\S+\.\S+/.test(formData.email),
      password: formData.password === '',
      confirmPassword: formData.password !== formData.confirmPassword,
    };

    setErrors(newErrors);

    const isValid = !Object.values(newErrors).some((error) => error);

    if (isValid) {
      // Submit form or perform action here
      console.log('Form submitted:', formData);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
         <img src='src\assets\images\image1.jpg' alt='Avatar' />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <TypedGreetings/>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          name="username"
          required
          fullWidth
          id="username"
          label="Username"
          autoFocus
          value={formData.username}
          onChange={handleChange}
          error={errors.username}
          helperText={errors.username ? 'Username is required' : ''}
          sx={{ borderRadius: '20px' }} // Optional: Add border radius for consistency
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          helperText={errors.email ? 'Enter a valid email address' : ''}
          sx={{ borderRadius: '20px' }} // Optional: Add border radius for consistency
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="new-password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          helperText={errors.password ? 'Password is required' : ''}
          sx={{ borderRadius: '20px' }} // Optional: Add border radius for consistency
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          id="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          helperText={errors.confirmPassword ? 'Passwords do not match' : ''}
          sx={{ borderRadius: '20px' }} // Optional: Add border radius for consistency
        />
      </Grid>
    </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="center" sx={{ alignItems: 'center' }}>
      <Grid item>
        <Typography variant="body2">
          Already have an account?
        </Typography>
      </Grid>
      <Grid item>
        <Link component={RouterLink} to='/sign-in' variant="body2">
          Sign in
        </Link>
      </Grid>
    </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default SignUp;
