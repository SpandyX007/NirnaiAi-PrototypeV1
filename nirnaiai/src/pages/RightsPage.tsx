import React from 'react'
// Rights Section

import {  
    Typography, 
    Paper, 
    Button,
  } from '@mui/material';

const RightsPage = () => {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Know Your Rights
      </Typography>
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Land Rights
        </Typography>
        <Typography variant="body1" paragraph>
          Understanding your land ownership and tenancy rights is important for rural communities.
        </Typography>
        <Button variant="contained">Learn More</Button>
      </Paper>
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Labor Rights
        </Typography>
        <Typography variant="body1" paragraph>
          Know your rights regarding work hours, minimum wage, and safe working conditions.
        </Typography>
        <Button variant="contained">Learn More</Button>
      </Paper>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Government Schemes
        </Typography>
        <Typography variant="body1" paragraph>
          Information about government programs that you may be eligible for.
        </Typography>
        <Button variant="contained">Learn More</Button>
      </Paper>
    </div>
  )
}

export default RightsPage