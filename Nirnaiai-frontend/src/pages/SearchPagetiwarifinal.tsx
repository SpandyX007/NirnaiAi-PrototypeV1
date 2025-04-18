// import React, { useState } from 'react';
// import {
//   Box, Typography, TextField, Button, Paper, Table, TableBody, TableCell, TableContainer,
//   TableHead, TableRow, IconButton, Snackbar, Alert, Dialog, DialogTitle, DialogContent, DialogActions
// } from '@mui/material';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { Add as AddIcon } from '@mui/icons-material';
// import dayjs from 'dayjs';

// const CaseSearchPagetiwarifinal = () => {
//   const [searchParams, setSearchParams] = useState({
//     citationNumber: '', petitioner: '', respondent: '', bench: '', dateFrom: null, dateTo: null
//   });
//   const [filteredResults, setFilteredResults] = useState([]);
//   const [userCollection, setUserCollection] = useState([]);
//   const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });
//   const [openDialog, setOpenDialog] = useState(false);
//   const [caseDetail, setCaseDetail] = useState(null);

//   const handleInputChange = (field, value) => {
//     setSearchParams({ ...searchParams, [field]: value });
//   };

//   const handleSearch = async (e) => {
//     e.preventDefault();
//     const query = new URLSearchParams();
//     if (searchParams.citationNumber) query.append("citation", searchParams.citationNumber);
//     if (searchParams.petitioner) query.append("petitioner", searchParams.petitioner);
//     if (searchParams.respondent) query.append("respondent", searchParams.respondent);
//     if (searchParams.bench) query.append("bench", searchParams.bench);
//     if (searchParams.dateFrom) query.append("date_from", searchParams.dateFrom.toISOString());
//     if (searchParams.dateTo) query.append("date_to", searchParams.dateTo.toISOString());

//     try {
//       const res = await fetch(`http://127.0.0.1:5000/cases/search?${query.toString()}`);
//       const data = await res.json();
//       if (res.ok) {
//         const formatted = data.map((item) => ({
//           ...item,
//           citation: item.citation || item.citationNumber,
//           bench: item.bench,
//           date_of_judgment: item.date_of_judgment || item.dateOfJudgment
//         }));
//         setFilteredResults(formatted);
//         setNotification({ open: true, message: `Found ${data.length} case(s)`, severity: 'success' });
//       } else {
//         throw new Error(data?.error || 'Search failed');
//       }
//     } catch (err) {
//       console.error(err);
//       setNotification({ open: true, message: 'Error searching cases.', severity: 'error' });
//     }
//   };

//   const handleAddToCollection = (caseId) => {
//     if (userCollection.includes(caseId)) {
//       setNotification({ open: true, message: 'This case is already in your collection', severity: 'warning' });
//       return;
//     }
//     setUserCollection([...userCollection, caseId]);
//     setNotification({ open: true, message: 'Case added to your collection successfully', severity: 'success' });
//   };

//   const handleCitationClick = async (citation) => {
//     try {
//       const response = await fetch(`http://127.0.0.1:5000/cases/details/${encodeURIComponent(citation)}`);
//       const data = await response.json();
//       if (response.ok) {
//         setCaseDetail(data);
//         setOpenDialog(true);
//       } else {
//         throw new Error(data?.error || 'Case details not found');
//       }
//     } catch (error) {
//       console.error(error);
//       setNotification({ open: true, message: 'Error fetching case details', severity: 'error' });
//     }
//   };

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//     setCaseDetail(null);
//   };

//   const handleCloseNotification = () => {
//     setNotification({ ...notification, open: false });
//   };

//   return (
//     <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
//       <Typography variant="h3" align="center" gutterBottom sx={{ mb: 4, fontWeight: 'bold', color: '#1a237e' }}>
//         Legal Case Search
//       </Typography>

//       <Paper sx={{ p: 3, mb: 4, borderRadius: 2, boxShadow: 3 }}>
//         <Typography variant="h5" align="center" gutterBottom sx={{ color: '#1a237e', fontWeight: 'medium' }}>
//           Search for a Case
//         </Typography>
//         <Box component="form" onSubmit={handleSearch} sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 3 }}>
//           <TextField label="Citation Number" value={searchParams.citationNumber} onChange={(e) => handleInputChange('citationNumber', e.target.value)} fullWidth variant="outlined" size="small" />
//           <TextField label="Petitioner" value={searchParams.petitioner} onChange={(e) => handleInputChange('petitioner', e.target.value)} fullWidth variant="outlined" size="small" />
//           <TextField label="Respondent" value={searchParams.respondent} onChange={(e) => handleInputChange('respondent', e.target.value)} fullWidth variant="outlined" size="small" />
//           <TextField label="Bench" value={searchParams.bench} onChange={(e) => handleInputChange('bench', e.target.value)} fullWidth variant="outlined" size="small" />
//           <LocalizationProvider dateAdapter={AdapterDayjs}>
//             <DatePicker label="Date Range From" value={searchParams.dateFrom} onChange={(date) => handleInputChange('dateFrom', date)} slotProps={{ textField: { fullWidth: true, size: "small" } }} />
//             <DatePicker label="Date Range To" value={searchParams.dateTo} onChange={(date) => handleInputChange('dateTo', date)} slotProps={{ textField: { fullWidth: true, size: "small" } }} />
//           </LocalizationProvider>
//           <Box sx={{ gridColumn: { xs: '1', sm: '1 / span 2' }, mt: 2 }}>
//             <Button type="submit" variant="contained" fullWidth size="large" sx={{ py: 1.5, bgcolor: '#1a237e', '&:hover': { bgcolor: '#3949ab' }, fontWeight: 'bold' }}>
//               Search Cases
//             </Button>
//           </Box>
//         </Box>
//       </Paper>

//       <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
//         <Typography variant="h5" align="center" gutterBottom sx={{ color: '#1a237e', fontWeight: 'medium' }}>
//           Search Results
//         </Typography>
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
//           <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
//             Found {filteredResults.length} case{filteredResults.length !== 1 ? 's' : ''}
//           </Typography>
//           <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
//             In Collection: {userCollection.length} case{userCollection.length !== 1 ? 's' : ''}
//           </Typography>
//         </Box>
//         <TableContainer component={Paper} elevation={1} sx={{ borderRadius: 1 }}>
//           <Table sx={{ minWidth: 650 }}>
//             <TableHead>
//               <TableRow sx={{ backgroundColor: '#3f51b5', '& th': { color: 'white', fontWeight: 'bold' } }}>
//                 <TableCell>Citation Number</TableCell>
//                 <TableCell>Petitioner</TableCell>
//                 <TableCell>Respondent</TableCell>
//                 <TableCell>Bench</TableCell>
//                 <TableCell>Date of Judgment</TableCell>
//                 <TableCell>Court</TableCell>
//                 <TableCell align="center">Add to Collection</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {filteredResults.length > 0 ? (
//                 filteredResults.map((caseItem, index) => (
//                   <TableRow key={index}>
//                     <TableCell>
//                       <Button variant="text" onClick={() => handleCitationClick(caseItem.citation)}>
//                         {caseItem.citation}
//                       </Button>
//                     </TableCell>
//                     <TableCell>{caseItem.petitioner}</TableCell>
//                     <TableCell>{caseItem.respondent}</TableCell>
//                     <TableCell>{caseItem.bench}</TableCell>
//                     <TableCell>{caseItem.date_of_judgment}</TableCell>
//                     <TableCell>{caseItem.court}</TableCell>
//                     <TableCell align="center">
//                       <IconButton color="primary" onClick={() => handleAddToCollection(caseItem.id)}>
//                         <AddIcon />
//                       </IconButton>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan={7} align="center">No results found.</TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Paper>

//       <Snackbar open={notification.open} autoHideDuration={3000} onClose={handleCloseNotification} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
//         <Alert onClose={handleCloseNotification} severity={notification.severity} variant="filled" sx={{ width: '100%' }}>
//           {notification.message}
//         </Alert>
//       </Snackbar>

//       <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="md">
//         <DialogTitle>Case Details</DialogTitle>
//         <DialogContent dividers>
//           {caseDetail ? (
//             <Box>
//               <Typography variant="h6">Citation: {caseDetail.citation}</Typography>
//               <Typography>Petitioner: {caseDetail.petitioner}</Typography>
//               <Typography>Respondent: {caseDetail.respondent}</Typography>
//               <Typography>Date of Judgement: {caseDetail.date_of_judgment}</Typography>
//               <Typography>Court: {caseDetail.court}</Typography>
//               <Typography>Bench: {caseDetail.bench}</Typography>
//               <Typography sx={{ mt: 2 }}>Judgement:</Typography>
//               <Typography>{caseDetail.judgment}</Typography>
//             </Box>
//           ) : (
//             <Typography>Loading...</Typography>
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseDialog}>Close</Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default CaseSearchPagetiwarifinal;




import React, { useState } from 'react';
import {
  Box, Typography, TextField, Button, Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, IconButton, Snackbar, Alert, Dialog, DialogTitle, DialogContent, DialogActions,
  useMediaQuery, useTheme
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Add as AddIcon, Info as InfoIcon } from '@mui/icons-material';
import dayjs from 'dayjs';

const CaseSearchPagetiwarifinal = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  const [searchParams, setSearchParams] = useState({
    citationNumber: '', petitioner: '', respondent: '', bench: '', dateFrom: null, dateTo: null
  });
  const [filteredResults, setFilteredResults] = useState([]);
  const [userCollection, setUserCollection] = useState([]);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });
  const [openDialog, setOpenDialog] = useState(false);
  const [caseDetail, setCaseDetail] = useState(null);

  const handleInputChange = (field, value) => {
    setSearchParams({ ...searchParams, [field]: value });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const query = new URLSearchParams();
    if (searchParams.citationNumber) query.append("citation", searchParams.citationNumber);
    if (searchParams.petitioner) query.append("petitioner", searchParams.petitioner);
    if (searchParams.respondent) query.append("respondent", searchParams.respondent);
    if (searchParams.bench) query.append("bench", searchParams.bench);
    if (searchParams.dateFrom) query.append("date_from", searchParams.dateFrom.toISOString());
    if (searchParams.dateTo) query.append("date_to", searchParams.dateTo.toISOString());

    try {
      const res = await fetch(`http://127.0.0.1:5000/cases/search?${query.toString()}`);
      const data = await res.json();
      if (res.ok) {
        const formatted = data.map((item) => ({
          ...item,
          citation: item.citation || item.citationNumber,
          bench: item.bench,
          date_of_judgment: item.date_of_judgment || item.dateOfJudgment
        }));
        setFilteredResults(formatted);
        setNotification({ open: true, message: `Found ${data.length} case(s)`, severity: 'success' });
      } else {
        throw new Error(data?.error || 'Search failed');
      }
    } catch (err) {
      console.error(err);
      setNotification({ open: true, message: 'Error searching cases.', severity: 'error' });
    }
  };

  const handleAddToCollection = (caseId) => {
    if (userCollection.includes(caseId)) {
      setNotification({ open: true, message: 'This case is already in your collection', severity: 'warning' });
      return;
    }
    setUserCollection([...userCollection, caseId]);
    setNotification({ open: true, message: 'Case added to your collection successfully', severity: 'success' });
  };

  const handleCitationClick = async (citation) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/cases/details/${encodeURIComponent(citation)}`);
      const data = await response.json();
      if (response.ok) {
        setCaseDetail(data);
        setOpenDialog(true);
      } else {
        throw new Error(data?.error || 'Case details not found');
      }
    } catch (error) {
      console.error(error);
      setNotification({ open: true, message: 'Error fetching case details', severity: 'error' });
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCaseDetail(null);
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  // Responsive table for mobile devices
  const renderResponsiveTable = () => {
    if (isMobile) {
      return filteredResults.length > 0 ? (
        filteredResults.map((caseItem, index) => (
          <Paper key={index} sx={{ p: 2, mb: 2, borderLeft: '4px solid #3f51b5' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                <Button 
                  variant="text" 
                  onClick={() => handleCitationClick(caseItem.citation)}
                  sx={{ p: 0, textAlign: 'left', textTransform: 'none' }}
                >
                  {caseItem.citation}
                </Button>
              </Typography>
              <IconButton 
                color="primary" 
                size="small" 
                onClick={() => handleAddToCollection(caseItem.id)}
              >
                <AddIcon />
              </IconButton>
            </Box>
            <Typography variant="body2"><strong>Petitioner:</strong> {caseItem.petitioner}</Typography>
            <Typography variant="body2"><strong>Respondent:</strong> {caseItem.respondent}</Typography>
            <Typography variant="body2"><strong>Date:</strong> {caseItem.date_of_judgment}</Typography>
            <Typography variant="body2"><strong>Court:</strong> {caseItem.court}</Typography>
            <Typography variant="body2"><strong>Bench:</strong> {caseItem.bench}</Typography>
          </Paper>
        ))
      ) : (
        <Paper sx={{ p: 2, textAlign: 'center' }}>
          <Typography>No results found.</Typography>
        </Paper>
      );
    } else {
      return (
        <TableContainer component={Paper} elevation={1} sx={{ borderRadius: 1 }}>
          <Table sx={{ minWidth: isTablet ? 600 : 650 }} size={isTablet ? "small" : "medium"}>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#3f51b5', '& th': { color: 'white', fontWeight: 'bold' } }}>
                <TableCell>Citation Number</TableCell>
                <TableCell>Petitioner</TableCell>
                <TableCell>Respondent</TableCell>
                <TableCell>Bench</TableCell>
                {!isTablet && <TableCell>Date of Judgment</TableCell>}
                {!isTablet && <TableCell>Court</TableCell>}
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredResults.length > 0 ? (
                filteredResults.map((caseItem, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Button 
                        variant="text" 
                        onClick={() => handleCitationClick(caseItem.citation)}
                        sx={{ p: 0, textAlign: 'left', textTransform: 'none' }}
                      >
                        {caseItem.citation}
                      </Button>
                    </TableCell>
                    <TableCell>{caseItem.petitioner}</TableCell>
                    <TableCell>{caseItem.respondent}</TableCell>
                    <TableCell>{caseItem.bench}</TableCell>
                    {!isTablet && <TableCell>{caseItem.date_of_judgment}</TableCell>}
                    {!isTablet && <TableCell>{caseItem.court}</TableCell>}
                    <TableCell align="center">
                      <IconButton color="primary" onClick={() => handleAddToCollection(caseItem.id)}>
                        <AddIcon />
                      </IconButton>
                      <IconButton color="info" onClick={() => handleCitationClick(caseItem.citation)}>
                        <InfoIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={isTablet ? 5 : 7} align="center">No results found.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      );
    }
  };

  return (
    <Box sx={{ width: '100%', maxWidth: '100%', px: { xs: 2, sm: 3 }, py: 3, mx: 'auto' }}>
      <Typography 
        variant={isMobile ? "h4" : "h3"} 
        align="center" 
        gutterBottom 
        sx={{ 
          mb: { xs: 2, sm: 4 }, 
          fontWeight: 'bold', 
          color: '#1a237e',
          fontSize: { xs: '1.75rem', sm: '2.5rem', md: '3rem' }
        }}
      >
        Legal Case Search
      </Typography>

      <Paper sx={{ p: { xs: 2, sm: 3 }, mb: 4, borderRadius: 2, boxShadow: 3 }}>
        <Typography 
          variant={isMobile ? "h6" : "h5"} 
          align="center" 
          gutterBottom 
          sx={{ color: '#1a237e', fontWeight: 'medium' }}
        >
          Search for a Case
        </Typography>
        <Box 
          component="form" 
          onSubmit={handleSearch} 
          sx={{ 
            display: 'grid', 
            gridTemplateColumns: { 
              xs: '1fr', 
              sm: 'repeat(1, 1fr)', 
              md: 'repeat(2, 1fr)' 
            }, 
            gap: 3
          }}
        >
          <TextField 
            label="Citation Number" 
            value={searchParams.citationNumber} 
            onChange={(e) => handleInputChange('citationNumber', e.target.value)} 
            fullWidth 
            variant="outlined" 
            size="normal"
            sx={{ gridColumn: { md: '1',  } }}
          />
          <TextField 
            label="Petitioner" 
            value={searchParams.petitioner} 
            onChange={(e) => handleInputChange('petitioner', e.target.value)} 
            fullWidth 
            variant="outlined" 
            size="normal"
            sx={{ gridColumn: { md: '2' } }}
          />
          <TextField 
            label="Respondent" 
            value={searchParams.respondent} 
            onChange={(e) => handleInputChange('respondent', e.target.value)} 
            fullWidth 
            variant="outlined" 
            size="normal"
            sx={{ gridColumn: { md: '1' } }}
          />
          <TextField 
            label="Bench" 
            value={searchParams.bench} 
            onChange={(e) => handleInputChange('bench', e.target.value)} 
            fullWidth 
            variant="outlined" 
            size="normal"
            sx={{ gridColumn: { md: '2' } }}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker 
              label="Date Range From" 
              value={searchParams.dateFrom} 
              onChange={(date) => handleInputChange('dateFrom', date)} 
              slotProps={{ textField: { fullWidth: true, size: "small" } }}
              sx={{ gridColumn: { md: '1' } }}
            />
            <DatePicker 
              label="Date Range To" 
              value={searchParams.dateTo} 
              onChange={(date) => handleInputChange('dateTo', date)} 
              slotProps={{ textField: { fullWidth: true, size: "small" } }}
              sx={{ gridColumn: { md: '2' } }}
            />
          </LocalizationProvider>
          <Box sx={{ 
            gridColumn: { 
              xs: '1', 
              sm: '1 / span 2',
              md: '1 / span 3'
            }, 
            mt: 2 
          }}>
            <Button 
              type="submit" 
              variant="contained" 
              fullWidth 
              size={isMobile ? "medium" : "large"} 
              sx={{ 
                py: { xs: 1, sm: 1.5 }, 
                bgcolor: '#1a237e', 
                '&:hover': { bgcolor: '#3949ab' }, 
                fontWeight: 'bold' 
              }}
            >
              Search Cases
            </Button>
          </Box>
        </Box>
      </Paper>

      <Paper sx={{ p: { xs: 2, sm: 3 }, borderRadius: 2, boxShadow: 3 }}>
        <Typography 
          variant={isMobile ? "h6" : "h5"} 
          align="center" 
          gutterBottom 
          sx={{ color: '#1a237e', fontWeight: 'medium' }}
        >
          Search Results
        </Typography>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between', 
          alignItems: isMobile ? 'flex-start' : 'center', 
          mb: 2,
          gap: 1
        }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
            Found {filteredResults.length} case{filteredResults.length !== 1 ? 's' : ''}
          </Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
            In Collection: {userCollection.length} case{userCollection.length !== 1 ? 's' : ''}
          </Typography>
        </Box>
        {renderResponsiveTable()}
      </Paper>

      <Snackbar 
        open={notification.open} 
        autoHideDuration={3000} 
        onClose={handleCloseNotification} 
        anchorOrigin={{ 
          vertical: 'bottom', 
          horizontal: isMobile ? 'center' : 'right' 
        }}
        sx={{
          width: isMobile ? '90%' : 'auto',
          left: isMobile ? '5%' : 'auto'
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

      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog} 
        fullWidth 
        maxWidth="md"
        fullScreen={isMobile}
      >
        <DialogTitle 
          sx={{ 
            fontSize: isMobile ? '1.2rem' : '1.5rem',
            py: { xs: 1.5, sm: 2 }
          }}
        >
          Case Details
        </DialogTitle>
        <DialogContent dividers>
          {caseDetail ? (
            <Box sx={{ p: { xs: 1, sm: 2 } }}>
              <Typography variant={isMobile ? "subtitle1" : "h6"} sx={{ fontWeight: 'bold', mb: 1 }}>
                Citation: {caseDetail.citation}
              </Typography>
              <Typography sx={{ mb: 0.5 }}>Petitioner: {caseDetail.petitioner}</Typography>
              <Typography sx={{ mb: 0.5 }}>Respondent: {caseDetail.respondent}</Typography>
              <Typography sx={{ mb: 0.5 }}>Date of Judgement: {caseDetail.date_of_judgment}</Typography>
              <Typography sx={{ mb: 0.5 }}>Court: {caseDetail.court}</Typography>
              <Typography sx={{ mb: 0.5 }}>Bench: {caseDetail.bench}</Typography>
              <Typography sx={{ mt: 2, fontWeight: 'bold' }}>Judgement:</Typography>
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 2, 
                  mt: 1, 
                  bgcolor: '#f5f5f5', 
                  borderRadius: 1,
                  maxHeight: isMobile ? '50vh' : '60vh',
                  overflow: 'auto'
                }}
              >
                <Typography 
                  variant="body2" 
                  sx={{ 
                    whiteSpace: 'pre-line', 
                    lineHeight: 1.6,
                    fontSize: { xs: '0.875rem', sm: '1rem' }
                  }}
                >
                  {caseDetail.judgment}
                </Typography>
              </Paper>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
              <Typography>Loading...</Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: { xs: 2, sm: 1.5 } }}>
          <Button 
            onClick={handleCloseDialog} 
            variant="contained" 
            color="primary"
            sx={{ 
              minWidth: isMobile ? '100%' : 'auto',
              py: isMobile ? 1 : 'auto'
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CaseSearchPagetiwarifinal;