// import React, { useState } from 'react';
// import {
//   Box,
//   Typography,
//   TextField,
//   Button,
//   Paper,
//   Grid,
//   IconButton,
//   InputAdornment,
//   Snackbar,
//   Alert,
//   useMediaQuery,
//   Stepper,
//   Step,
//   StepLabel,
//   FormControlLabel,
//   Checkbox,
//   MenuItem,
//   Select,
//   FormControl,
//   InputLabel,
//   Divider,
//   Link,
//   Container
// } from '@mui/material';
// import {
//   Visibility,
//   VisibilityOff,
//   AccountCircle as UserIcon,
//   Email as EmailIcon,
//   Lock as LockIcon,
//   Phone as PhoneIcon,
//   School as EducationIcon,
//   Business as BusinessIcon,
//   LocationCity as CityIcon,
//   Public as CountryIcon
// } from '@mui/icons-material';

// const SignupPage = () => {
//   // Responsive breakpoint
//   const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));
//   const isSmall = useMediaQuery((theme) => theme.breakpoints.down('sm'));

//   // State for form steps
//   const [activeStep, setActiveStep] = useState(0);
//   const steps = ['Account Information', 'Professional Details', 'Terms & Review'];

//   // State for password visibility
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   // Form validation state
//   const [errors, setErrors] = useState({});

//   // State for notification
//   const [notification, setNotification] = useState({
//     open: false,
//     message: '',
//     severity: 'success'
//   });

//   // State for form fields
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     phone: '',
//     password: '',
//     confirmPassword: '',
//     profession: '',
//     organization: '',
//     experience: '',
//     degree: '',
//     city: '',
//     country: '',
//     specialization: '',
//     agreeTerms: false,
//     receiveUpdates: false
//   });

//   // Handle input changes
//   const handleInputChange = (field, value) => {
//     setFormData({
//       ...formData,
//       [field]: value
//     });

//     // Clear error when user types
//     if (errors[field]) {
//       setErrors({
//         ...errors,
//         [field]: ''
//       });
//     }
//   };

//   // Toggle password visibility
//   const handleTogglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   // Toggle confirm password visibility
//   const handleToggleConfirmPasswordVisibility = () => {
//     setShowConfirmPassword(!showConfirmPassword);
//   };

//   // Validate form fields
//   const validateFields = (step) => {
//     const newErrors = {};

//     if (step === 0) {
//       if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
//       if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
//       if (!formData.email.trim()) {
//         newErrors.email = 'Email is required';
//       } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//         newErrors.email = 'Email is invalid';
//       }
//       if (!formData.password) {
//         newErrors.password = 'Password is required';
//       } else if (formData.password.length < 8) {
//         newErrors.password = 'Password must be at least 8 characters';
//       }
//       if (formData.password !== formData.confirmPassword) {
//         newErrors.confirmPassword = 'Passwords do not match';
//       }
//     } else if (step === 1) {
//       if (!formData.profession) newErrors.profession = 'Profession is required';
//       if (!formData.organization.trim()) newErrors.organization = 'Organization is required';
//       if (!formData.experience) newErrors.experience = 'Experience is required';
//       if (!formData.country.trim()) newErrors.country = 'Country is required';
//     } else if (step === 2) {
//       if (!formData.agreeTerms) {
//         newErrors.agreeTerms = 'You must agree to the terms and conditions';
//       }
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // Handle next step
//   const handleNext = () => {
//     if (validateFields(activeStep)) {
//       setActiveStep((prevStep) => prevStep + 1);
//     }
//   };

//   // Handle previous step
//   const handleBack = () => {
//     setActiveStep((prevStep) => prevStep - 1);
//   };

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (validateFields(activeStep)) {
//       // Here you would typically submit the form data to your API
//       console.log('Form submitted with data:', formData);

//       // Show success notification
//       setNotification({
//         open: true,
//         message: 'Your account has been created successfully!',
//         severity: 'success'
//       });

//       // Reset form after successful submission
//       // setFormData({ ... }); // Reset form if needed
//     }
//   };

//   // Handle closing notification
//   const handleCloseNotification = () => {
//     setNotification({
//       ...notification,
//       open: false
//     });
//   };

//   // Content for step 1
//   const renderAccountInformation = () => (
//     <Grid container spacing={3}>
//       <Grid item xs={12}>
//         <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'medium' }}>
//           Enter your personal information
//         </Typography>
//       </Grid>


//       <Grid item xs={12} sm={6}>
//         <TextField
//           fullWidth
//           label="First Name"
//           placeholder="Enter your first name"
//           value={formData.firstName}
//           onChange={(e) => handleInputChange('firstName', e.target.value)}
//           error={!!errors.firstName}
//           helperText={errors.firstName}
//           required
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <UserIcon fontSize="small" color="primary" />
//               </InputAdornment>
//             ),
//           }}
//           size="medium"
//         />
//       </Grid>

//       <Grid item xs={12} sm={6}>
//         <TextField
//           fullWidth
//           label="Last Name"
//           placeholder="Enter your last name"
//           value={formData.lastName}
//           onChange={(e) => handleInputChange('lastName', e.target.value)}
//           error={!!errors.lastName}
//           helperText={errors.lastName}
//           required
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <UserIcon fontSize="small" color="primary" />
//               </InputAdornment>
//             ),
//           }}
//           size="medium"
//         />
//       </Grid>

//       <Grid item xs={12} sm={6}>
//         <TextField
//           fullWidth
//           label="Email"
//           placeholder="Enter your email address"
//           type="email"
//           value={formData.email}
//           onChange={(e) => handleInputChange('email', e.target.value)}
//           error={!!errors.email}
//           helperText={errors.email}
//           required
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <EmailIcon fontSize="small" color="primary" />
//               </InputAdornment>
//             ),
//           }}
//           size="medium"
//         />
//       </Grid>

//       <Grid item xs={12} sm={6}>
//         <TextField
//           fullWidth
//           label="Phone Number"
//           placeholder="Enter your phone number"
//           value={formData.phone}
//           onChange={(e) => handleInputChange('phone', e.target.value)}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <PhoneIcon fontSize="small" color="primary" />
//               </InputAdornment>
//             ),
//           }}
//           size="medium"
//         />
//       </Grid>

//       <Grid item xs={12} sm={6}>
//         <TextField
//           fullWidth
//           label="Password"
//           placeholder="Enter a strong password"
//           type={showPassword ? 'text' : 'password'}
//           value={formData.password}
//           onChange={(e) => handleInputChange('password', e.target.value)}
//           error={!!errors.password}
//           helperText={errors.password}
//           required
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <LockIcon fontSize="small" color="primary" />
//               </InputAdornment>
//             ),
//             endAdornment: (
//               <InputAdornment position="end">
//                 <IconButton
//                   onClick={handleTogglePasswordVisibility}
//                   edge="end"
//                 >
//                   {showPassword ? <VisibilityOff /> : <Visibility />}
//                 </IconButton>
//               </InputAdornment>
//             ),
//           }}
//           size="medium"
//         />
//       </Grid>

//       <Grid item xs={12} sm={6}>
//         <TextField
//           fullWidth
//           label="Confirm Password"
//           placeholder="Confirm your password"
//           type={showConfirmPassword ? 'text' : 'password'}
//           value={formData.confirmPassword}
//           onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
//           error={!!errors.confirmPassword}
//           helperText={errors.confirmPassword}
//           required
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <LockIcon fontSize="small" color="primary" />
//               </InputAdornment>
//             ),
//             endAdornment: (
//               <InputAdornment position="end">
//                 <IconButton
//                   onClick={handleToggleConfirmPasswordVisibility}
//                   edge="end"
//                 >
//                   {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
//                 </IconButton>
//               </InputAdornment>
//             ),
//           }}
//           size="medium"
//         />
//       </Grid>
//     </Grid>
//   );

//   {/* // Content for step 2 */}
//   const renderProfessionalDetails = () => (
    
//     <Grid container spacing={3}>
//       <Grid item xs={12}>
//         <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'medium' }}>
//           Professional Information
//         </Typography>
//       </Grid>

//       <Grid item xs={12} sm={6}>
//         <FormControl fullWidth error={!!errors.profession} required size="medium">
//           <InputLabel id="profession-label">Profession</InputLabel>
//           <Select
//             labelId="profession-label"
//             value={formData.profession}
//             label="Profession"
//             onChange={(e) => handleInputChange('profession', e.target.value)}
//             startAdornment={
//               <InputAdornment position="start">
//                 <BusinessIcon fontSize="small" color="primary" />
//               </InputAdornment>
//             }
//           >
//             <MenuItem value="lawyer">Lawyer</MenuItem>
//             <MenuItem value="judge">Judge</MenuItem>
//             <MenuItem value="paralegal">Paralegal</MenuItem>
//             <MenuItem value="law_student">Law Student</MenuItem>
//             <MenuItem value="professor">Law Professor</MenuItem>
//             <MenuItem value="other">Other</MenuItem>
//           </Select>
//           {errors.profession && (
//             <Typography variant="caption" color="error">
//               {errors.profession}
//             </Typography>
//           )}
//         </FormControl>
//       </Grid>

//       <Grid item xs={12} sm={6}>
//         <FormControl fullWidth error={!!errors.experience} required size="medium">
//           <InputLabel id="experience-label">Years of Experience</InputLabel>
//           <Select
//             labelId="experience-label"
//             value={formData.experience}
//             label="Years of Experience"
//             onChange={(e) => handleInputChange('experience', e.target.value)}
//           >
//             <MenuItem value="0-2">0-2 years</MenuItem>
//             <MenuItem value="3-5">3-5 years</MenuItem>
//             <MenuItem value="6-10">6-10 years</MenuItem>
//             <MenuItem value="11-15">11-15 years</MenuItem>
//             <MenuItem value="15+">15+ years</MenuItem>
//           </Select>
//           {errors.experience && (
//             <Typography variant="caption" color="error">
//               {errors.experience}
//             </Typography>
//           )}
//         </FormControl>
//       </Grid>

//       <Grid item xs={12}>
//         <TextField
//           fullWidth
//           label="Organization/Firm"
//           placeholder="Enter your organization name"
//           value={formData.organization}
//           onChange={(e) => handleInputChange('organization', e.target.value)}
//           error={!!errors.organization}
//           helperText={errors.organization}
//           required
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <BusinessIcon fontSize="small" color="primary" />
//               </InputAdornment>
//             ),
//           }}
//           size="medium"
//         />
//       </Grid>

//       <Grid item xs={12}>
//         <TextField
//           fullWidth
//           label="Highest Legal Degree"
//           placeholder="E.g., J.D., LL.M., Ph.D."
//           value={formData.degree}
//           onChange={(e) => handleInputChange('degree', e.target.value)}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <EducationIcon fontSize="small" color="primary" />
//               </InputAdornment>
//             ),
//           }}
//           size="medium"
//         />
//       </Grid>

//       <Grid item xs={12} sm={6}>
//         <TextField
//           fullWidth
//           label="City"
//           placeholder="Your city"
//           value={formData.city}
//           onChange={(e) => handleInputChange('city', e.target.value)}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <CityIcon fontSize="small" color="primary" />
//               </InputAdornment>
//             ),
//           }}
//           size="medium"
//         />
//       </Grid>

//       <Grid item xs={12} sm={6}>
//         <TextField
//           fullWidth
//           label="Country"
//           placeholder="Your country"
//           value={formData.country}
//           onChange={(e) => handleInputChange('country', e.target.value)}
//           error={!!errors.country}
//           helperText={errors.country}
//           required
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <CountryIcon fontSize="small" color="primary" />
//               </InputAdornment>
//             ),
//           }}
//           size="medium"
//         />
//       </Grid>

//       <Grid item xs={12}>
//         <FormControl fullWidth size="medium">
//           <InputLabel id="specialization-label">Primary Specialization</InputLabel>
//           <Select
//             labelId="specialization-label"
//             value={formData.specialization}
//             label="Primary Specialization"
//             onChange={(e) => handleInputChange('specialization', e.target.value)}
//           >
//             <MenuItem value="constitutional">Constitutional Law</MenuItem>
//             <MenuItem value="criminal">Criminal Law</MenuItem>
//             <MenuItem value="corporate">Corporate Law</MenuItem>
//             <MenuItem value="family">Family Law</MenuItem>
//             <MenuItem value="tax">Tax Law</MenuItem>
//             <MenuItem value="intellectual">Intellectual Property</MenuItem>
//             <MenuItem value="human_rights">Human Rights</MenuItem>
//             <MenuItem value="other">Other</MenuItem>
//           </Select>
//         </FormControl>
//       </Grid>
//     </Grid>
//   );

//   // Content for step 3
//   const renderTermsAndReview = () => (
//     <Grid container spacing={3}>
//       <Grid item xs={12}>
//         <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'medium' }}>
//           Review Your Information
//         </Typography>
//       </Grid>

//       <Grid item xs={12}>
//         <Paper sx={{ p: 3, bgcolor: '#f5f5f5', borderRadius: 2 }}>
//           <Grid container spacing={3}>
//             <Grid item xs={12} sm={6}>
//               <Typography variant="subtitle2" color="primary" gutterBottom sx={{ fontWeight: 'bold' }}>
//                 Personal Information
//               </Typography>
//               <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
//                 <Typography variant="body2"><strong>Name:</strong> {formData.firstName} {formData.lastName}</Typography>
//                 <Typography variant="body2"><strong>Email:</strong> {formData.email}</Typography>
//                 <Typography variant="body2"><strong>Phone:</strong> {formData.phone || 'Not provided'}</Typography>
//               </Box>
//             </Grid>

//             <Grid item xs={12} sm={6}>
//               <Typography variant="subtitle2" color="primary" gutterBottom sx={{ fontWeight: 'bold' }}>
//                 Professional Information
//               </Typography>
//               <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
//                 <Typography variant="body2"><strong>Profession:</strong> {formData.profession}</Typography>
//                 <Typography variant="body2"><strong>Organization:</strong> {formData.organization}</Typography>
//                 <Typography variant="body2"><strong>Experience:</strong> {formData.experience}</Typography>
//                 <Typography variant="body2"><strong>Degree:</strong> {formData.degree || 'Not provided'}</Typography>
//               </Box>
//             </Grid>

//             <Grid item xs={12} sm={6}>
//               <Typography variant="subtitle2" color="primary" gutterBottom sx={{ fontWeight: 'bold' }}>
//                 Location
//               </Typography>
//               <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
//                 <Typography variant="body2"><strong>City:</strong> {formData.city || 'Not provided'}</Typography>
//                 <Typography variant="body2"><strong>Country:</strong> {formData.country}</Typography>
//               </Box>
//             </Grid>

//             <Grid item xs={12} sm={6}>
//               <Typography variant="subtitle2" color="primary" gutterBottom sx={{ fontWeight: 'bold' }}>
//                 Specialization
//               </Typography>
//               <Box>
//                 <Typography variant="body2">
//                   <strong>Primary Focus:</strong> {formData.specialization || 'Not specified'}
//                 </Typography>
//               </Box>
//             </Grid>
//           </Grid>
//         </Paper>
//       </Grid>

//       <Grid item xs={12}>
//         <Divider sx={{ my: 2 }} />
//       </Grid>

//       <Grid item xs={12}>
//         <Box sx={{ pl: 1 }}>
//           <FormControlLabel
//             control={
//               <Checkbox
//                 checked={formData.agreeTerms}
//                 onChange={(e) => handleInputChange('agreeTerms', e.target.checked)}
//                 color="primary"
//               />
//             }
//             label={
//               <Typography variant="body2">
//                 I agree to the <Link href="#" underline="hover">Terms of Service</Link> and <Link href="#" underline="hover">Privacy Policy</Link>
//               </Typography>
//             }
//           />
//           {errors.agreeTerms && (
//             <Typography variant="caption" color="error" display="block" sx={{ ml: 4 }}>
//               {errors.agreeTerms}
//             </Typography>
//           )}
//         </Box>
//       </Grid>

//       <Grid item xs={12}>
//         <Box sx={{ pl: 1 }}>
//           <FormControlLabel
//             control={
//               <Checkbox
//                 checked={formData.receiveUpdates}
//                 onChange={(e) => handleInputChange('receiveUpdates', e.target.checked)}
//                 color="primary"
//               />
//             }
//             label="I want to receive email updates about cases and legal updates"
//           />
//         </Box>
//       </Grid>
//     </Grid>
//   );

//   // Render active step content
//   const getStepContent = (step) => {
//     switch (step) {
//       case 0:
//         return renderAccountInformation();
//       case 1:
//         return renderProfessionalDetails();
//       case 2:
//         return renderTermsAndReview();
//       default:
//         return 'Unknown step';
//     }
//   };

//   return (
//     <Container maxWidth="md" sx={{ py: { xs: 2, sm: 3, md: 4 } }}>
//       {/* Page Title */}
//       <Typography
//         variant={isSmall ? "h4" : "h3"}
//         align="center"
//         gutterBottom
//         sx={{
//           mb: { xs: 2, sm: 3, md: 4 },
//           fontWeight: 'bold',
//           color: '#1a237e'
//         }}
//       >
//         Create Your Account
//       </Typography>

//       {/* Main Form Paper */}
//       <Paper sx={{
//         p: { xs: 2, sm: 3, md: 4 },
//         mb: { xs: 2, sm: 3, md: 4 },
//         borderRadius: 2,
//         boxShadow: 3
//       }}>
//         {/* Stepper */}
//         <Box sx={{ width: '100%', mb: { xs: 3, sm: 4 } }}>
//           {isMobile ? (
//             // Mobile Stepper
//             <Stepper activeStep={activeStep} orientation="vertical" sx={{ mb: 2 }}>
//               {steps.map((label) => (
//                 <Step key={label}>
//                   <StepLabel>{label}</StepLabel>
//                 </Step>
//               ))}
//             </Stepper>
//           ) : (
//             // Desktop Stepper
//             <Stepper activeStep={activeStep} alternativeLabel>
//               {steps.map((label) => (
//                 <Step key={label}>
//                   <StepLabel>{label}</StepLabel>
//                 </Step>
//               ))}
//             </Stepper>
//           )}
//         </Box>

//         {/* Form Content */}
//         <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
//           {getStepContent(activeStep)}

//           {/* Form Navigation Buttons */}
//           <Box sx={{
//             display: 'flex',
//             justifyContent: 'space-between',
//             mt: { xs: 3, sm: 4 },
//             pt: 2,
//             borderTop: '1px solid #e0e0e0'
//           }}>
//             <Button
//               disabled={activeStep === 0}
//               onClick={handleBack}
//               variant="outlined"
//               sx={{
//                 fontWeight: 'medium',
//                 color: '#1a237e',
//                 borderColor: '#1a237e',
//                 '&:hover': { borderColor: '#3949ab' },
//                 px: { xs: 2, sm: 3 },
//                 py: { xs: 1, sm: 1.2 }
//               }}
//             >
//               Back
//             </Button>

//             {activeStep === steps.length - 1 ? (
//               <Button
//                 type="submit"
//                 variant="contained"
//                 size="large"
//                 sx={{
//                   fontWeight: 'bold',
//                   bgcolor: '#1a237e',
//                   '&:hover': { bgcolor: '#3949ab' },
//                   px: { xs: 3, sm: 4 },
//                   py: { xs: 1, sm: 1.2 }
//                 }}
//               >
//                 Create Account
//               </Button>
//             ) : (
//               <Button
//                 variant="contained"
//                 onClick={handleNext}
//                 size="large"
//                 sx={{
//                   fontWeight: 'bold',
//                   bgcolor: '#1a237e',
//                   '&:hover': { bgcolor: '#3949ab' },
//                   px: { xs: 3, sm: 4 },
//                   py: { xs: 1, sm: 1.2 }
//                 }}
//               >
//                 Next
//               </Button>
//             )}
//           </Box>
//         </Box>
//       </Paper>

//       {/* Already have an account link */}
//       <Box sx={{ textAlign: 'center', mt: 2, mb: 4 }}>
//         <Typography variant="body1">
//           Already have an account? <Link href="/login" underline="hover" sx={{ fontWeight: 'medium', color: '#1a237e' }}>Log in</Link>
//         </Typography>
//       </Box>

//       {/* Notification */}
//       <Snackbar
//         open={notification.open}
//         autoHideDuration={6000}
//         onClose={handleCloseNotification}
//         anchorOrigin={{
//           vertical: 'bottom',
//           horizontal: isSmall ? 'center' : 'right'
//         }}
//         sx={{
//           bottom: { xs: 16, sm: 24 },
//           width: { xs: '100%', sm: 'auto' },
//           maxWidth: { xs: '90%', sm: 400 }
//         }}
//       >
//         <Alert
//           onClose={handleCloseNotification}
//           severity={notification.severity}
//           variant="filled"
//           sx={{ width: '100%' }}
//         >
//           {notification.message}
//         </Alert>
//       </Snackbar>
//     </Container>
//   );
// };

// export default SignupPage;


import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  Grid,
  IconButton,
  InputAdornment,
  Snackbar,
  Alert,
  useMediaQuery,
  Stepper,
  Step,
  StepLabel,
  FormControlLabel,
  Checkbox,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Divider,
  Link,
  Container
} from '@mui/material';
import { 
  Visibility, 
  VisibilityOff, 
  AccountCircle as UserIcon,
  Email as EmailIcon,
  Lock as LockIcon,
  Phone as PhoneIcon,
  School as EducationIcon,
  Business as BusinessIcon,
  LocationCity as CityIcon,
  Public as CountryIcon
} from '@mui/icons-material';

const SignupPage = () => {
  // Responsive breakpoint
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  
  // State for form steps
  const [activeStep, setActiveStep] = useState(0);
  const steps = ['Account Information', 'Professional Details', 'Terms & Review'];
  
  // State for password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Form validation state
  const [errors, setErrors] = useState({});
  
  // State for notification
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  
  // State for form fields
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    profession: '',
    organization: '',
    experience: '',
    degree: '',
    city: '',
    country: '',
    specialization: '',
    agreeTerms: false,
    receiveUpdates: false
  });
  
  // Handle input changes
  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
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
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  // Toggle confirm password visibility
  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  
  // Validate form fields
  const validateFields = (step) => {
    const newErrors = {};
    
    if (step === 0) {
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email is invalid';
      }
      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters';
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    } else if (step === 1) {
      if (!formData.profession) newErrors.profession = 'Profession is required';
      if (!formData.organization.trim()) newErrors.organization = 'Organization is required';
      if (!formData.experience) newErrors.experience = 'Experience is required';
      if (!formData.country.trim()) newErrors.country = 'Country is required';
    } else if (step === 2) {
      if (!formData.agreeTerms) {
        newErrors.agreeTerms = 'You must agree to the terms and conditions';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle next step
  const handleNext = () => {
    if (validateFields(activeStep)) {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };
  
  // Handle previous step
  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateFields(activeStep)) {
      // Here you would typically submit the form data to your API
      console.log('Form submitted with data:', formData);
      
      // Show success notification
      setNotification({
        open: true,
        message: 'Your account has been created successfully!',
        severity: 'success'
      });
    }
  };
  
  // Handle closing notification
  const handleCloseNotification = () => {
    setNotification({
      ...notification,
      open: false
    });
  };
  
  // Content for step 1
  const renderAccountInformation = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'medium' }}>
          Enter your personal information
        </Typography>
      </Grid>
      
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="First Name"
          placeholder="Enter your first name"
          value={formData.firstName}
          onChange={(e) => handleInputChange('firstName', e.target.value)}
          error={!!errors.firstName}
          helperText={errors.firstName}
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <UserIcon fontSize="small" color="primary" />
              </InputAdornment>
            ),
          }}
          size="medium"
        />
      </Grid>
      
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Last Name"
          placeholder="Enter your last name"
          value={formData.lastName}
          onChange={(e) => handleInputChange('lastName', e.target.value)}
          error={!!errors.lastName}
          helperText={errors.lastName}
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <UserIcon fontSize="small" color="primary" />
              </InputAdornment>
            ),
          }}
          size="medium"
        />
      </Grid>
      
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Email"
          placeholder="Enter your email address"
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          error={!!errors.email}
          helperText={errors.email}
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon fontSize="small" color="primary" />
              </InputAdornment>
            ),
          }}
          size="medium"
        />
      </Grid>
      
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Phone Number"
          placeholder="Enter your phone number"
          value={formData.phone}
          onChange={(e) => handleInputChange('phone', e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PhoneIcon fontSize="small" color="primary" />
              </InputAdornment>
            ),
          }}
          size="medium"
        />
      </Grid>
      
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Password"
          placeholder="Enter a strong password"
          type={showPassword ? 'text' : 'password'}
          value={formData.password}
          onChange={(e) => handleInputChange('password', e.target.value)}
          error={!!errors.password}
          helperText={errors.password}
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon fontSize="small" color="primary" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleTogglePasswordVisibility}
                  edge="end"
                  size="small"
                >
                  {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          size="medium"
        />
      </Grid>
      
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Confirm Password"
          placeholder="Confirm your password"
          type={showConfirmPassword ? 'text' : 'password'}
          value={formData.confirmPassword}
          onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword}
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon fontSize="small" color="primary" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleToggleConfirmPasswordVisibility}
                  edge="end"
                  size="small"
                >
                  {showConfirmPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          size="medium"
        />
      </Grid>
    </Grid>
  );
  
  // Content for step 2
  const renderProfessionalDetails = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'medium' }}>
          Professional Information
        </Typography>
      </Grid>
      
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth error={!!errors.profession} required size="medium">
          <InputLabel id="profession-label">Profession</InputLabel>
          <Select
            labelId="profession-label"
            value={formData.profession}
            label="Profession"
            onChange={(e) => handleInputChange('profession', e.target.value)}
            startAdornment={
              <InputAdornment position="start" sx={{ mr: 1 }}>
                <BusinessIcon fontSize="small" color="primary" />
              </InputAdornment>
            }
            sx={{ 
              '& .MuiSelect-select': {
                display: 'flex',
                alignItems: 'center'
              }
            }}
          >
            <MenuItem value="lawyer">Lawyer</MenuItem>
            <MenuItem value="judge">Judge</MenuItem>
            <MenuItem value="paralegal">Paralegal</MenuItem>
            <MenuItem value="law_student">Law Student</MenuItem>
            <MenuItem value="professor">Law Professor</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </Select>
          {errors.profession && (
            <Typography variant="caption" color="error" sx={{ ml: 1.5 }}>
              {errors.profession}
            </Typography>
          )}
        </FormControl>
      </Grid>
      
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth error={!!errors.experience} required size="medium">
          <InputLabel id="experience-label">Years of Experience</InputLabel>
          <Select
            labelId="experience-label"
            value={formData.experience}
            label="Years of Experience"
            onChange={(e) => handleInputChange('experience', e.target.value)}
          >
            <MenuItem value="0-2">0-2 years</MenuItem>
            <MenuItem value="3-5">3-5 years</MenuItem>
            <MenuItem value="6-10">6-10 years</MenuItem>
            <MenuItem value="11-15">11-15 years</MenuItem>
            <MenuItem value="15+">15+ years</MenuItem>
          </Select>
          {errors.experience && (
            <Typography variant="caption" color="error" sx={{ ml: 1.5 }}>
              {errors.experience}
            </Typography>
          )}
        </FormControl>
      </Grid>
      
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Organization/Firm"
          placeholder="Enter your organization name"
          value={formData.organization}
          onChange={(e) => handleInputChange('organization', e.target.value)}
          error={!!errors.organization}
          helperText={errors.organization}
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <BusinessIcon fontSize="small" color="primary" />
              </InputAdornment>
            ),
          }}
          size="medium"
        />
      </Grid>
      
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Highest Legal Degree"
          placeholder="E.g., J.D., LL.M., Ph.D."
          value={formData.degree}
          onChange={(e) => handleInputChange('degree', e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EducationIcon fontSize="small" color="primary" />
              </InputAdornment>
            ),
          }}
          size="medium"
        />
      </Grid>
      
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="City"
          placeholder="Your city"
          value={formData.city}
          onChange={(e) => handleInputChange('city', e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CityIcon fontSize="small" color="primary" />
              </InputAdornment>
            ),
          }}
          size="medium"
        />
      </Grid>
      
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Country"
          placeholder="Your country"
          value={formData.country}
          onChange={(e) => handleInputChange('country', e.target.value)}
          error={!!errors.country}
          helperText={errors.country}
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CountryIcon fontSize="small" color="primary" />
              </InputAdornment>
            ),
          }}
          size="medium"
        />
      </Grid>
      
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth size="medium">
          <InputLabel id="specialization-label">Primary Specialization</InputLabel>
          <Select
            labelId="specialization-label"
            value={formData.specialization}
            label="Primary Specialization"
            onChange={(e) => handleInputChange('specialization', e.target.value)}
          >
            <MenuItem value="constitutional">Constitutional Law</MenuItem>
            <MenuItem value="criminal">Criminal Law</MenuItem>
            <MenuItem value="corporate">Corporate Law</MenuItem>
            <MenuItem value="family">Family Law</MenuItem>
            <MenuItem value="tax">Tax Law</MenuItem>
            <MenuItem value="intellectual">Intellectual Property</MenuItem>
            <MenuItem value="human_rights">Human Rights</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
  
  // Content for step 3
  const renderTermsAndReview = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'medium' }}>
          Review Your Information
        </Typography>
      </Grid>
      
      <Grid item xs={12}>
        <Paper sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 1 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" color="primary" gutterBottom sx={{ fontWeight: 'bold' }}>
                Personal Information
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography variant="body2"><strong>Name:</strong> {formData.firstName} {formData.lastName}</Typography>
                <Typography variant="body2"><strong>Email:</strong> {formData.email}</Typography>
                <Typography variant="body2"><strong>Phone:</strong> {formData.phone || 'Not provided'}</Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" color="primary" gutterBottom sx={{ fontWeight: 'bold' }}>
                Professional Information
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography variant="body2"><strong>Profession:</strong> {formData.profession}</Typography>
                <Typography variant="body2"><strong>Organization:</strong> {formData.organization}</Typography>
                <Typography variant="body2"><strong>Experience:</strong> {formData.experience}</Typography>
                <Typography variant="body2"><strong>Degree:</strong> {formData.degree || 'Not provided'}</Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" color="primary" gutterBottom sx={{ fontWeight: 'bold' }}>
                Location
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography variant="body2"><strong>City:</strong> {formData.city || 'Not provided'}</Typography>
                <Typography variant="body2"><strong>Country:</strong> {formData.country}</Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" color="primary" gutterBottom sx={{ fontWeight: 'bold' }}>
                Specialization
              </Typography>
              <Box>
                <Typography variant="body2">
                  <strong>Primary Focus:</strong> {formData.specialization || 'Not specified'}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      
      <Grid item xs={12}>
        <Divider sx={{ my: 2 }} />
      </Grid>
      
      <Grid item xs={12}>
        <Box sx={{ pl: 1 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.agreeTerms}
                onChange={(e) => handleInputChange('agreeTerms', e.target.checked)}
                color="primary"
              />
            }
            label={
              <Typography variant="body2">
                I agree to the <Link href="#" underline="hover">Terms of Service</Link> and <Link href="#" underline="hover">Privacy Policy</Link>
              </Typography>
            }
          />
          {errors.agreeTerms && (
            <Typography variant="caption" color="error" display="block" sx={{ ml: 4 }}>
              {errors.agreeTerms}
            </Typography>
          )}
        </Box>
      </Grid>
      
      <Grid item xs={12}>
        <Box sx={{ pl: 1 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.receiveUpdates}
                onChange={(e) => handleInputChange('receiveUpdates', e.target.checked)}
                color="primary"
              />
            }
            label="I want to receive email updates about cases and legal updates"
          />
        </Box>
      </Grid>
    </Grid>
  );
  
  // Render active step content
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return renderAccountInformation();
      case 1:
        return renderProfessionalDetails();
      case 2:
        return renderTermsAndReview();
      default:
        return 'Unknown step';
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: { xs: 2, sm: 3, md: 4 } }}>
      {/* Page Title */}
      <Box sx={{ textAlign: 'center', mb: { xs: 3, sm: 4 } }}>
        <Typography 
          variant={isSmall ? "h4" : "h3"} 
          gutterBottom 
          sx={{ 
            fontWeight: 'bold',
            color: 'primary.main'
          }}
        >
          Create Your Account
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Join our legal community in just a few steps
        </Typography>
      </Box>
      
      {/* Main Form Paper */}
      <Paper sx={{ 
        p: { xs: 2, sm: 3, md: 4 }, 
        mb: { xs: 2, sm: 3, md: 4 }, 
        borderRadius: 2, 
        boxShadow: 3
      }}>
        {/* Stepper */}
        <Box sx={{ width: '100%', mb: { xs: 3, sm: 4 } }}>
          {isMobile ? (
            // Mobile Stepper
            <Stepper activeStep={activeStep} orientation="vertical" sx={{ mb: 2 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          ) : (
            // Desktop Stepper
            <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 3 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          )}
        </Box>
        
        {/* Form Content */}
        <Box component="form" onSubmit={handleSubmit}>
          {getStepContent(activeStep)}
          
          {/* Form Navigation Buttons */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            mt: { xs: 3, sm: 4 },
            pt: 3,
            borderTop: '1px solid',
            borderColor: 'divider'
          }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              variant="outlined"
              sx={{ 
                minWidth: 100,
                fontWeight: 'medium',
                color: 'primary.main',
                borderColor: 'primary.main',
                '&:hover': { borderColor: 'primary.dark' }
              }}
            >
              Back
            </Button>
            
            {activeStep === steps.length - 1 ? (
              <Button
                type="submit"
                variant="contained"
                size="large"
                sx={{ 
                  minWidth: 150,
                  fontWeight: 'bold',
                  bgcolor: 'primary.main', 
                  '&:hover': { bgcolor: 'primary.dark' }
                }}
              >
                Create Account
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={handleNext}
                size="large"
                sx={{ 
                  minWidth: 150,
                  fontWeight: 'bold',
                  bgcolor: 'primary.main', 
                  '&:hover': { bgcolor: 'primary.dark' }
                }}
              >
                Next
              </Button>
            )}
          </Box>
        </Box>
      </Paper>
      
      {/* Already have an account link */}
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="body1" color="text.secondary">
          Already have an account?{' '}
          <Link href="/login" underline="hover" sx={{ fontWeight: 'medium' }}>
            Log in
          </Link>
        </Typography>
      </Box>
      
      {/* Notification */}
      <Snackbar 
        open={notification.open} 
        autoHideDuration={6000} 
        onClose={handleCloseNotification}
        anchorOrigin={{ 
          vertical: 'bottom', 
          horizontal: isSmall ? 'center' : 'right' 
        }}
      >
        <Alert 
          onClose={handleCloseNotification} 
          severity={notification.severity} 
          variant="filled"
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default SignupPage;