import React from 'react'

import { 
    Box,  
    Typography,  
    Paper, 
    Button,
    TextField,
  } from '@mui/material';


const ContactPage = () => {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Contact Us
      </Typography>
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="body1" paragraph>
          Fill out this simple form and we'll get back to you within 2 working days.
        </Typography>
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField label="Your Name" variant="outlined" fullWidth required />
          <TextField label="Village/Town" variant="outlined" fullWidth required />
          <TextField label="Contact Number" variant="outlined" fullWidth required />
          <TextField
            label="Your Question"
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            required
          />
          <Button 
            type="submit" 
            variant="contained" 
            color="primary"
            sx={{ mt: 2 }}
          >
            Send Message
          </Button>
        </Box>
      </Paper>
      <Typography variant="h6" gutterBottom>
        Other Ways to Reach Us
      </Typography>
      <Typography variant="body1">
        Phone: 800-123-4567 (Free)
      </Typography>
      <Typography variant="body1">
        SMS: Text "HELP" to 55555
      </Typography>
    </div>
  )
}

export default ContactPage