import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  IconButton,
  InputAdornment,
  Divider,
  Snackbar,
  Alert,
  Link,
  Checkbox,
  FormControlLabel,
  useMediaQuery,
  useTheme
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Email as EmailIcon,
  Lock as LockIcon,
  Google as GoogleIcon,
  LinkedIn as LinkedInIcon
} from '@mui/icons-material';

const LoginPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  // State for login form
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  // State for password visibility
  const [showPassword, setShowPassword] = useState(false);

  // State for form validation
  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });

  // State for notification
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  // Handle input changes
  const handleInputChange = (field, value) => {
    setLoginData({
      ...loginData,
      [field]: value
    });

    // Clear error when user types
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: ''
      });
    }
  };

  // Toggle password visibility
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  // Validate form
  const validateForm = () => {
    let valid = true;
    const newErrors = { email: '', password: '' };

    // Email validation
    if (!loginData.email) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(loginData.email)) {
      newErrors.email = 'Email is invalid';
      valid = false;
    }

    // Password validation
    if (!loginData.password) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (loginData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // Handle login submission
  const handleLogin = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // This would normally make an API call to authenticate
      console.log('Login attempt with:', loginData);

      // Simulate successful login
      setNotification({
        open: true,
        message: 'Login successful! Redirecting...',
        severity: 'success'
      });

      // In a real application, you would redirect to dashboard or home page
    }
  };

  // Handle social login
  const handleSocialLogin = (provider) => {
    console.log(`Logging in with ${provider}`);
    
    // In a real app, this would trigger OAuth flow
    setNotification({
      open: true,
      message: `${provider} login initiated`,
      severity: 'info'
    });
  };

  // Handle notification close
  const handleCloseNotification = () => {
    setNotification({
      ...notification,
      open: false
    });
  };

  return (
    <Box 
      sx={{ 
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        px: isMobile ? 2 : 3,
        py: 4
      }}
    >
      {/* Logo and Title */}
      <Box sx={{ mb: isMobile ? 3 : 4, textAlign: 'center', width: '100%' }}>
        <LockIcon sx={{ fontSize: isMobile ? 32 : 40, color: '#1a237e', mb: 1 }} />
        <Typography 
          variant={isMobile ? "h5" : "h4"} 
          gutterBottom 
          sx={{ 
            fontWeight: 'bold',
            color: '#1a237e'
          }}
        >
          Nirnai Case Repository
        </Typography>
        <Typography 
          variant={isMobile ? "body2" : "subtitle1"} 
          sx={{ color: '#757575' }}
        >
          Sign in to access your case collection
        </Typography>
      </Box>
      
      {/* Login Form */}
      <Paper 
        sx={{ 
          p: isMobile ? 3 : 4, 
          borderRadius: 2, 
          boxShadow: 3, 
          width: '100%', 
          maxWidth: 450,
          mx: 'auto'
        }}
      >
        <Typography 
          variant={isMobile ? "h6" : "h5"} 
          align="center" 
          gutterBottom 
          sx={{ color: '#1a237e', fontWeight: 'medium' }}
        >
          Sign In
        </Typography>
        
        <Box component="form" onSubmit={handleLogin} sx={{ mt: 2 }}>
          {/* Email Field */}
          <Box sx={{ mb: 2.5 }}>
            <TextField
              fullWidth
              label="Email Address"
              variant="outlined"
              value={loginData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              error={!!errors.email}
              helperText={errors.email}
              size={isMobile ? "small" : "medium"}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon sx={{ color: '#1a237e', fontSize: isMobile ? 20 : 24 }} />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          
          {/* Password Field */}
          <Box sx={{ mb: 1 }}>
            <TextField
              fullWidth
              label="Password"
              type={showPassword ? 'text' : 'password'}
              variant="outlined"
              value={loginData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              error={!!errors.password}
              helperText={errors.password}
              size={isMobile ? "small" : "medium"}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon sx={{ color: '#1a237e', fontSize: isMobile ? 20 : 24 }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleTogglePassword}
                      edge="end"
                      size={isMobile ? "small" : "medium"}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          
          {/* Remember Me and Forgot Password */}
          <Box 
            sx={{ 
              display: 'flex', 
              flexDirection: isMobile ? 'column' : 'row',
              justifyContent: 'space-between', 
              alignItems: isMobile ? 'flex-start' : 'center', 
              mb: 2.5,
              mt: 0.5
            }}
          >
            <FormControlLabel
              control={
                <Checkbox 
                  checked={loginData.rememberMe}
                  onChange={(e) => handleInputChange('rememberMe', e.target.checked)}
                  sx={{ 
                    color: '#1a237e',
                    '&.Mui-checked': {
                      color: '#1a237e',
                    },
                    padding: isMobile ? '4px' : '9px',
                  }}
                  size={isMobile ? "small" : "medium"}
                />
              }
              label={
                <Typography variant={isMobile ? "body2" : "body1"}>
                  Remember me
                </Typography>
              }
            />
            <Link 
              href="#" 
              underline="hover"
              sx={{ 
                color: '#1a237e',
                fontWeight: 'medium',
                '&:hover': { color: '#3949ab' },
                fontSize: isMobile ? '0.875rem' : '1rem',
                mt: isMobile ? 0.5 : 0
              }}
            >
              Forgot password?
            </Link>
          </Box>
          
          {/* Login Button */}
          <Button 
            type="submit" 
            variant="contained" 
            fullWidth 
            size={isMobile ? "medium" : "large"}
            sx={{ 
              py: isMobile ? 1 : 1.5, 
              bgcolor: '#1a237e', 
              '&:hover': { bgcolor: '#3949ab' },
              fontWeight: 'bold',
              mb: 2.5
            }}
          >
            Sign In
          </Button>
          
          {/* Divider */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2.5 }}>
            <Divider sx={{ flexGrow: 1 }} />
            <Typography variant={isMobile ? "caption" : "body2"} sx={{ px: 2, color: '#757575' }}>
              OR CONTINUE WITH
            </Typography>
            <Divider sx={{ flexGrow: 1 }} />
          </Box>
          
          {/* Social Login Buttons - Stack vertically on mobile */}
          <Box 
            sx={{ 
              display: 'flex', 
              flexDirection: isMobile ? 'column' : 'row',
              justifyContent: 'center', 
              gap: 2, 
              mb: 2.5
            }}
          >
            <Button
              variant="outlined"
              startIcon={<GoogleIcon />}
              onClick={() => handleSocialLogin('Google')}
              fullWidth
              size={isMobile ? "medium" : "large"}
              sx={{ 
                borderColor: '#db4437',
                color: '#db4437',
                '&:hover': { 
                  borderColor: '#c53929',
                  backgroundColor: 'rgba(219, 68, 55, 0.04)'
                },
                py: isMobile ? 0.75 : 1
              }}
            >
              Google
            </Button>
            <Button
              variant="outlined"
              startIcon={<LinkedInIcon />}
              onClick={() => handleSocialLogin('LinkedIn')}
              fullWidth
              size={isMobile ? "medium" : "large"}
              sx={{ 
                borderColor: '#0077b5',
                color: '#0077b5',
                '&:hover': { 
                  borderColor: '#00669c',
                  backgroundColor: 'rgba(0, 119, 181, 0.04)'
                },
                py: isMobile ? 0.75 : 1
              }}
            >
              LinkedIn
            </Button>
          </Box>
          
          {/* Sign Up Link */}
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant={isMobile ? "body2" : "body1"} sx={{ color: '#757575' }}>
              Don't have an account?{' '}
              <Link 
                href="#" 
                underline="hover"
                sx={{ 
                  color: '#1a237e',
                  fontWeight: 'medium',
                  '&:hover': { color: '#3949ab' }
                }}
              >
                Sign Up
              </Link>
            </Typography>
          </Box>
        </Box>
      </Paper>
      
      {/* Footer - Responsive layout */}
      <Box 
        sx={{ 
          mt: isMobile ? 3 : 4, 
          textAlign: 'center', 
          width: '100%',
          px: 1
        }}
      >
        <Typography variant={isMobile ? "caption" : "body2"} sx={{ color: '#757575' }}>
          © 2025 Legal Case Repository. All rights reserved.
        </Typography>
        <Box 
          sx={{ 
            mt: 1,
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'center',
            gap: isMobile ? 1 : 0
          }}
        >
          <Link 
            href="#" 
            underline="hover" 
            sx={{ 
              color: '#1a237e', 
              mr: isMobile ? 0 : 2, 
              fontSize: isMobile ? '0.75rem' : '0.875rem' 
            }}
          >
            Privacy Policy
          </Link>
          <Link 
            href="#" 
            underline="hover" 
            sx={{ 
              color: '#1a237e', 
              mr: isMobile ? 0 : 2, 
              fontSize: isMobile ? '0.75rem' : '0.875rem' 
            }}
          >
            Terms of Service
          </Link>
          <Link 
            href="#" 
            underline="hover" 
            sx={{ 
              color: '#1a237e', 
              fontSize: isMobile ? '0.75rem' : '0.875rem' 
            }}
          >
            Contact Us
          </Link>
        </Box>
      </Box>
      
      {/* Notification - Adjusted for mobile */}
      <Snackbar 
        open={notification.open} 
        autoHideDuration={3000} 
        onClose={handleCloseNotification}
        anchorOrigin={{ 
          vertical: 'bottom', 
          horizontal: isMobile ? 'center' : 'right' 
        }}
        sx={{
          bottom: isMobile ? 16 : 24
        }}
      >
        <Alert 
          onClose={handleCloseNotification} 
          severity={notification.severity} 
          variant="filled"
          sx={{ 
            width: '100%',
            fontSize: isMobile ? '0.75rem' : '0.875rem'
          }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default LoginPage;