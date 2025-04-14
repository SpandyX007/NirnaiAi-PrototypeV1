import React from 'react'

import { 
    Box,  
    List, 
    Typography,  
    ListItem, 
    ListItemText, 
    Button,
  } from '@mui/material';


const HelpPage = () => {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Get Legal Help
      </Typography>
      <Typography variant="body1" paragraph>
        If you need assistance with a legal matter, there are resources available to help you.
      </Typography>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Common Issues
        </Typography>
        <List>
          <ListItem>
            <ListItemText 
              primary="Land Disputes" 
              secondary="Problems with property boundaries or ownership" 
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Government Benefits" 
              secondary="Help accessing schemes you're entitled to" 
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Family Matters" 
              secondary="Marriage, divorce, inheritance issues" 
            />
          </ListItem>
        </List>
      </Box>
      <Button variant="contained" color="primary">
        Talk to an Advisor
      </Button>
    </div>
  )
}

export default HelpPage