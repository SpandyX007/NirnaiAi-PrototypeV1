// Home Section
import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Button,
  Card,
  CardContent,
  CardActions,
} from '@mui/material';

const HomePage = () => {
  return (
    <div>
        <Typography variant="h4" gutterBottom>
          Welcome to Nirnay.Ai
        </Typography>
        <Typography variant="body1" paragraph>
          We help you understand your legal rights and access legal resources. This simple tool 
          helps rural communities with basic legal information.
        </Typography>
        <Box sx={{ mt: 4, display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          <Card sx={{ minWidth: 275, maxWidth: 345 }}>
            <CardContent>
              <Typography variant="h5" component="div">
                Quick Access
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Need help right away? Call our free helpline.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="large">Call: 800-123-4567</Button>
            </CardActions>
          </Card>
          <Card sx={{ minWidth: 275, maxWidth: 345 }}>
            <CardContent>
              <Typography variant="h5" component="div">
                Find Help Near You
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Locate legal assistance in your area.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="large">Find Local Help</Button>
            </CardActions>
          </Card>
        </Box>
      </div>
  )
}

export default HomePage
