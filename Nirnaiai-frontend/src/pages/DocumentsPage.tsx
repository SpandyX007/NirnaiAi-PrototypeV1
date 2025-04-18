import React from 'react'

import { 
    Box, 
    Typography, 
    Button,
  } from '@mui/material';
import { 
    Description as DocumentIcon, 
} from '@mui/icons-material';

const DocumentsPage = () => {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Important Documents
      </Typography>
      <Typography variant="body1" paragraph>
        Download forms and documents you may need.
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Button variant="outlined" startIcon={<DocumentIcon />}>
          Land Record Application
        </Button>
        <Button variant="outlined" startIcon={<DocumentIcon />}>
          Identity Proof Form
        </Button>
        <Button variant="outlined" startIcon={<DocumentIcon />}>
          Legal Aid Application
        </Button>
        <Button variant="outlined" startIcon={<DocumentIcon />}>
          Complaint Form
        </Button>
      </Box>
    </div>
  )
}

export default DocumentsPage