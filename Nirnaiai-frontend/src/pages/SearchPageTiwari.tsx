import React, { useState } from 'react';
import {
  Box, Typography, TextField, Button, Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, IconButton, Snackbar, Alert
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Add as AddIcon } from '@mui/icons-material';
import dayjs from 'dayjs';

const CaseSearchPageTiwari = () => {
  const [searchParams, setSearchParams] = useState({
    citationNumber: '', petitioner: '', respondent: '', bench: '', dateFrom: null, dateTo: null
  });
  const [filteredResults, setFilteredResults] = useState([]);
  const [userCollection, setUserCollection] = useState([]);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });

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

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
      <Typography variant="h3" align="center" gutterBottom sx={{ mb: 4, fontWeight: 'bold', color: '#1a237e' }}>
        Legal Case Search
      </Typography>

      <Paper sx={{ p: 3, mb: 4, borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h5" align="center" gutterBottom sx={{ color: '#1a237e', fontWeight: 'medium' }}>
          Search for a Case
        </Typography>
        <Box component="form" onSubmit={handleSearch} sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 3 }}>
          <TextField label="Citation Number" value={searchParams.citationNumber} onChange={(e) => handleInputChange('citationNumber', e.target.value)} fullWidth variant="outlined" size="small" />
          <TextField label="Petitioner" value={searchParams.petitioner} onChange={(e) => handleInputChange('petitioner', e.target.value)} fullWidth variant="outlined" size="small" />
          <TextField label="Respondent" value={searchParams.respondent} onChange={(e) => handleInputChange('respondent', e.target.value)} fullWidth variant="outlined" size="small" />
          <TextField label="Bench" value={searchParams.bench} onChange={(e) => handleInputChange('bench', e.target.value)} fullWidth variant="outlined" size="small" />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker label="Date Range From" value={searchParams.dateFrom} onChange={(date) => handleInputChange('dateFrom', date)} slotProps={{ textField: { fullWidth: true, size: "small" } }} />
            <DatePicker label="Date Range To" value={searchParams.dateTo} onChange={(date) => handleInputChange('dateTo', date)} slotProps={{ textField: { fullWidth: true, size: "small" } }} />
          </LocalizationProvider>
          <Box sx={{ gridColumn: { xs: '1', sm: '1 / span 2' }, mt: 2 }}>
            <Button type="submit" variant="contained" fullWidth size="large" sx={{ py: 1.5, bgcolor: '#1a237e', '&:hover': { bgcolor: '#3949ab' }, fontWeight: 'bold' }}>
              Search Cases
            </Button>
          </Box>
        </Box>
      </Paper>

      <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h5" align="center" gutterBottom sx={{ color: '#1a237e', fontWeight: 'medium' }}>
          Search Results
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
            Found {filteredResults.length} case{filteredResults.length !== 1 ? 's' : ''}
          </Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
            In Collection: {userCollection.length} case{userCollection.length !== 1 ? 's' : ''}
          </Typography>
        </Box>
        <TableContainer component={Paper} elevation={1} sx={{ borderRadius: 1 }}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#3f51b5', '& th': { color: 'white', fontWeight: 'bold' } }}>
                <TableCell>Citation Number</TableCell>
                <TableCell>Petitioner</TableCell>
                <TableCell>Respondent</TableCell>
                <TableCell>Bench</TableCell>
                <TableCell>Date of Judgment</TableCell>
                <TableCell>Court</TableCell>
                <TableCell align="center">Add to Collection</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredResults.length > 0 ? (
                filteredResults.map((caseItem, index) => (
                  <TableRow key={index}>
                    <TableCell>{caseItem.citation}</TableCell>
                    <TableCell>{caseItem.petitioner}</TableCell>
                    <TableCell>{caseItem.respondent}</TableCell>
                    <TableCell>{caseItem.bench}</TableCell>
                    <TableCell>{caseItem.date_of_judgment}</TableCell>
                    <TableCell>{caseItem.court}</TableCell>
                    <TableCell align="center">
                      <IconButton color="primary" onClick={() => handleAddToCollection(caseItem.id)}>
                        <AddIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    No results found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Snackbar open={notification.open} autoHideDuration={3000} onClose={handleCloseNotification} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert onClose={handleCloseNotification} severity={notification.severity} variant="filled" sx={{ width: '100%' }}>
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CaseSearchPageTiwari;