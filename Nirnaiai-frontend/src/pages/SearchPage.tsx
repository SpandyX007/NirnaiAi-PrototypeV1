import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  IconButton,
  Snackbar,
  Alert,
  useMediaQuery,
  Grid,
  Card,
  CardContent,
  Chip,
  Divider
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { 
  Add as AddIcon, 
  CalendarToday as CalendarIcon,
  Person as PersonIcon,
  Gavel as GavelIcon,
  Balance as BalanceIcon,
  AccountBalance as CourtIcon
} from '@mui/icons-material';
import dayjs from 'dayjs';

// Demo data for search results
const demoSearchResults = [
  {
    id: 1,
    citationNumber: '2024-SC-001',
    petitioner: 'John Doe',
    respondent: 'State of California',
    judgeName: 'Judge Amanda Smith',
    dateOfJudgment: '2024-05-15',
    court: 'Supreme Court',
    bench: 'Constitutional Bench'
  },
  {
    id: 2,
    citationNumber: '2024-HC-002',
    petitioner: 'Jane Doe',
    respondent: 'TechCorp Inc.',
    judgeName: 'Judge Robert Johnson',
    dateOfJudgment: '2024-06-20',
    court: 'High Court',
    bench: 'Commercial Division'
  },
  {
    id: 3,
    citationNumber: '2024-FC-003',
    petitioner: 'Smith Holdings Ltd.',
    respondent: 'Jones Enterprises',
    judgeName: 'Judge Maria Rodriguez',
    dateOfJudgment: '2024-04-10',
    court: 'Federal Court',
    bench: 'Commercial Division'
  },
  {
    id: 4,
    citationNumber: '2024-SC-004',
    petitioner: 'Michael Chen',
    respondent: 'United States',
    judgeName: 'Judge William Brown',
    dateOfJudgment: '2024-03-22',
    court: 'Supreme Court',
    bench: 'Criminal Division'
  },
  {
    id: 5,
    citationNumber: '2024-HC-005',
    petitioner: 'Emily Johnson',
    respondent: 'State of New York',
    judgeName: 'Judge Sarah Wilson',
    dateOfJudgment: '2024-07-05',
    court: 'High Court',
    bench: 'Civil Division'
  }
];

const CaseSearchPage = () => {
  // Responsive breakpoint
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  // State for search form
  const [searchParams, setSearchParams] = useState({
    citationNumber: '',
    petitioner: '',
    respondent: '',
    judgeName: '',
    dateFrom: null,
    dateTo: null
  });

  // State for search results and collection notification
  const [searchResults, setSearchResults] = useState(demoSearchResults);
  const [filteredResults, setFilteredResults] = useState(demoSearchResults);
  const [userCollection, setUserCollection] = useState([]);
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  // Handle form input changes
  const handleInputChange = (field, value) => {
    setSearchParams({
      ...searchParams,
      [field]: value
    });
  };

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    
    // Filter the demo results based on search parameters
    const filtered = demoSearchResults.filter(caseItem => {
      // Check if citation number matches (case insensitive)
      if (searchParams.citationNumber && 
          !caseItem.citationNumber.toLowerCase().includes(searchParams.citationNumber.toLowerCase())) {
        return false;
      }
      
      // Check if petitioner matches (case insensitive)
      if (searchParams.petitioner && 
          !caseItem.petitioner.toLowerCase().includes(searchParams.petitioner.toLowerCase())) {
        return false;
      }
      
      // Check if respondent matches (case insensitive)
      if (searchParams.respondent && 
          !caseItem.respondent.toLowerCase().includes(searchParams.respondent.toLowerCase())) {
        return false;
      }
      
      // Check if judge name matches (case insensitive)
      if (searchParams.judgeName && 
          !caseItem.judgeName.toLowerCase().includes(searchParams.judgeName.toLowerCase())) {
        return false;
      }
      
      // Check date range
      if (searchParams.dateFrom) {
        const caseDate = dayjs(caseItem.dateOfJudgment);
        const fromDate = dayjs(searchParams.dateFrom);
        
        if (caseDate.isBefore(fromDate)) {
          return false;
        }
      }
      
      if (searchParams.dateTo) {
        const caseDate = dayjs(caseItem.dateOfJudgment);
        const toDate = dayjs(searchParams.dateTo);
        
        if (caseDate.isAfter(toDate)) {
          return false;
        }
      }
      
      // If passed all filters, include in results
      return true;
    });
    
    setFilteredResults(filtered);
    
    // Show notification about search results
    setNotification({
      open: true,
      message: `Found ${filtered.length} case(s) matching your criteria`,
      severity: filtered.length > 0 ? 'success' : 'info'
    });
  };

  // Handle adding a case to collection
  const handleAddToCollection = (caseId) => {
    // Check if case is already in collection
    if (userCollection.includes(caseId)) {
      setNotification({
        open: true,
        message: 'This case is already in your collection',
        severity: 'warning'
      });
      return;
    }
    
    // Add case to collection
    setUserCollection([...userCollection, caseId]);
    
    // Show success notification
    setNotification({
      open: true,
      message: 'Case added to your collection successfully',
      severity: 'success'
    });
  };

  // Handle closing notification
  const handleCloseNotification = () => {
    setNotification({
      ...notification,
      open: false
    });
  };

  // Mobile card view for search results
  const renderMobileResults = () => {
    if (filteredResults.length === 0) {
      return (
        <Box sx={{ textAlign: 'center', py: 3 }}>
          <Typography variant="body1" sx={{ fontWeight: 'medium', color: '#757575' }}>
            No results found. Please try different search criteria.
          </Typography>
        </Box>
      );
    }

    return filteredResults.map((caseItem) => (
      <Card key={caseItem.id} sx={{ mb: 2, borderRadius: 2, boxShadow: 2 }}>
        <CardContent sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1a237e' }}>
              {caseItem.citationNumber}
            </Typography>
            <IconButton
              color="success"
              onClick={() => handleAddToCollection(caseItem.id)}
              sx={{ 
                bgcolor: userCollection.includes(caseItem.id) ? '#66bb6a' : '#1a237e', 
                color: 'white',
                '&:hover': { bgcolor: userCollection.includes(caseItem.id) ? '#43a047' : '#3949ab' },
                width: 32,
                height: 32
              }}
            >
              <AddIcon />
            </IconButton>
          </Box>

          <Divider sx={{ my: 1 }} />
          
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                <PersonIcon sx={{ mr: 1, fontSize: 16, color: '#3f51b5' }} />
                <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                  Petitioner: {caseItem.petitioner}
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                <PersonIcon sx={{ mr: 1, fontSize: 16, color: '#3f51b5' }} />
                <Typography variant="body2">
                  Respondent: {caseItem.respondent}
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                <GavelIcon sx={{ mr: 1, fontSize: 16, color: '#3f51b5' }} />
                <Typography variant="body2">
                  Judge: {caseItem.judgeName}
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                <CalendarIcon sx={{ mr: 1, fontSize: 16, color: '#3f51b5' }} />
                <Typography variant="body2">
                  Date: {caseItem.dateOfJudgment}
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                <CourtIcon sx={{ mr: 1, fontSize: 16, color: '#3f51b5' }} />
                <Typography variant="body2">
                  Court: {caseItem.court}
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <BalanceIcon sx={{ mr: 1, fontSize: 16, color: '#3f51b5' }} />
                <Typography variant="body2">
                  Bench: {caseItem.bench}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    ));
  };

  return (
    <Box sx={{ 
      maxWidth: '100%', 
      width: '100%', 
      p: { xs: 1, sm: 2, md: 3 }, 
      mx: 'auto',
      boxSizing: 'border-box'
    }}>
      {/* Page Title */}
      <Typography 
        variant={isSmall ? "h4" : "h3"} 
        align="center" 
        gutterBottom 
        sx={{ 
          mb: { xs: 2, sm: 3, md: 4 }, 
          fontWeight: 'bold',
          color: '#1a237e'
        }}
      >
        Legal Case Search
      </Typography>
      
      {/* Search Form */}
      <Paper sx={{ p: { xs: 2, sm: 3 }, mb: { xs: 2, sm: 3, md: 4 }, borderRadius: 2, boxShadow: 3 }}>
        <Typography 
          variant={isSmall ? "h6" : "h5"} 
          align="center" 
          gutterBottom 
          sx={{ color: '#1a237e', fontWeight: 'medium' }}
        >
          Search for a Case
        </Typography>
        
        <Box component="form" onSubmit={handleSearch}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" sx={{ mb: 0.5, fontWeight: 'medium' }}>Citation Number</Typography>
              <TextField
                fullWidth
                placeholder="Enter Citation Number"
                value={searchParams.citationNumber}
                onChange={(e) => handleInputChange('citationNumber', e.target.value)}
                variant="outlined"
                size="small"
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" sx={{ mb: 0.5, fontWeight: 'medium' }}>Petitioner</Typography>
              <TextField
                fullWidth
                placeholder="Enter Petitioner Name"
                value={searchParams.petitioner}
                onChange={(e) => handleInputChange('petitioner', e.target.value)}
                variant="outlined"
                size="small"
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" sx={{ mb: 0.5, fontWeight: 'medium' }}>Respondent</Typography>
              <TextField
                fullWidth
                placeholder="Enter Respondent Name"
                value={searchParams.respondent}
                onChange={(e) => handleInputChange('respondent', e.target.value)}
                variant="outlined"
                size="small"
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" sx={{ mb: 0.5, fontWeight: 'medium' }}>Judge Name</Typography>
              <TextField
                fullWidth
                placeholder="Enter Judge Name"
                value={searchParams.judgeName}
                onChange={(e) => handleInputChange('judgeName', e.target.value)}
                variant="outlined"
                size="small"
              />
            </Grid>
            
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" sx={{ mb: 0.5, fontWeight: 'medium' }}>Date Range From</Typography>
                <DatePicker
                  value={searchParams.dateFrom}
                  onChange={(date) => handleInputChange('dateFrom', date)}
                  slots={{
                    textField: TextField,
                    openPickerIcon: CalendarIcon,
                  }}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      placeholder: "dd/mm/yyyy",
                      size: "small"
                    }
                  }}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" sx={{ mb: 0.5, fontWeight: 'medium' }}>Date Range To</Typography>
                <DatePicker
                  value={searchParams.dateTo}
                  onChange={(date) => handleInputChange('dateTo', date)}
                  slots={{
                    textField: TextField,
                    openPickerIcon: CalendarIcon,
                  }}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      placeholder: "dd/mm/yyyy",
                      size: "small"
                    }
                  }}
                />
              </Grid>
            </LocalizationProvider>
            
            <Grid item xs={12} sx={{ mt: { xs: 1, sm: 2 } }}>
              <Button 
                type="submit" 
                variant="contained"  
                fullWidth
                size={isSmall ? "medium" : "large"}
                sx={{ 
                  py: { xs: 1, sm: 1.5 }, 
                  bgcolor: '#1a237e', 
                  '&:hover': { bgcolor: '#3949ab' },
                  fontWeight: 'bold'
                }}
              >
                Search Cases
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
      
      {/* Search Results */}
      <Paper sx={{ p: { xs: 2, sm: 3 }, borderRadius: 2, boxShadow: 3 }}>
        <Typography 
          variant={isSmall ? "h6" : "h5"} 
          align="center" 
          gutterBottom 
          sx={{ color: '#1a237e', fontWeight: 'medium' }}
        >
          Search Results
        </Typography>
        
        <Box sx={{ 
          display: 'flex', 
          flexDirection: isSmall ? 'column' : 'row',
          gap: isSmall ? 1 : 0,
          justifyContent: 'space-between', 
          alignItems: isSmall ? 'flex-start' : 'center', 
          mb: 2 
        }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 'medium' }}>
            Found {filteredResults.length} case{filteredResults.length !== 1 ? 's' : ''}
          </Typography>
          <Chip 
            label={`In Collection: ${userCollection.length} case${userCollection.length !== 1 ? 's' : ''}`}
            color="primary" 
            sx={{ fontWeight: 'medium' }}
          />
        </Box>
        
        {isMobile ? (
          // Mobile view - Cards
          renderMobileResults()
        ) : (
          // Desktop view - Table
          <TableContainer component={Paper} elevation={1} sx={{ borderRadius: 1, overflow: 'auto' }}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#3f51b5', '& th': { color: 'white', fontWeight: 'bold' } }}>
                  <TableCell>Citation Number</TableCell>
                  <TableCell>Petitioner</TableCell>
                  <TableCell>Respondent</TableCell>
                  <TableCell>Judge Name</TableCell>
                  <TableCell>Date of Judgment</TableCell>
                  <TableCell>Court</TableCell>
                  <TableCell>Bench</TableCell>
                  <TableCell align="center">Add to Collection</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredResults.length > 0 ? (
                  filteredResults.map((caseItem) => (
                    <TableRow 
                      key={caseItem.id}
                      sx={{ 
                        '&:last-child td, &:last-child th': { border: 0 },
                        '&:nth-of-type(odd)': { backgroundColor: '#f5f5f5' },
                        '&:hover': { backgroundColor: '#e8eaf6' }
                      }}
                    >
                      <TableCell sx={{ fontWeight: 'medium' }}>{caseItem.citationNumber}</TableCell>
                      <TableCell>{caseItem.petitioner}</TableCell>
                      <TableCell>{caseItem.respondent}</TableCell>
                      <TableCell>{caseItem.judgeName}</TableCell>
                      <TableCell>{caseItem.dateOfJudgment}</TableCell>
                      <TableCell>{caseItem.court}</TableCell>
                      <TableCell>{caseItem.bench}</TableCell>
                      <TableCell align="center">
                        <IconButton
                          color="success"
                          onClick={() => handleAddToCollection(caseItem.id)}
                          sx={{ 
                            bgcolor: userCollection.includes(caseItem.id) ? '#66bb6a' : '#1a237e', 
                            color: 'white',
                            '&:hover': { bgcolor: userCollection.includes(caseItem.id) ? '#43a047' : '#3949ab' },
                            width: 36,
                            height: 36
                          }}
                        >
                          <AddIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} align="center" sx={{ py: 3 }}>
                      <Typography variant="body1" sx={{ fontWeight: 'medium', color: '#757575' }}>
                        No results found. Please try different search criteria.
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
      
      {/* Notification */}
      <Snackbar 
        open={notification.open} 
        autoHideDuration={3000} 
        onClose={handleCloseNotification}
        anchorOrigin={{ 
          vertical: 'bottom', 
          horizontal: isSmall ? 'center' : 'right' 
        }}
        sx={{ 
          bottom: { xs: 16, sm: 24 },
          width: { xs: '100%', sm: 'auto' },
          maxWidth: { xs: '90%', sm: 400 }
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
    </Box>
  );
};

export default CaseSearchPage;