import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Box, 
  CssBaseline, 
  Drawer, 
  AppBar, 
  Toolbar, 
  List, 
  Typography, 
  Divider, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  Container, 
  Button,
  Stack
} from '@mui/material';
import { 
  Home as HomeIcon, 
  Description as DocumentIcon, 
  Help as HelpIcon, 
  ContactPage as ContactIcon,
  Gavel as GavelIcon,
  Person as PersonIcon,
  PersonAdd as PersonAddIcon,
  Search as SearchIcon
} from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import HomePage from '@/pages/HomePage';
//import RightsPage from '@/pages/RightsPage';
import DocumentsPage from '@/pages/DocumentsPage';
import HelpPage from '@/pages/HelpPage';
import ContactPage from '@/pages/ContactPage';
//import CaseSearchPage from '@/pages/SearchPage';
import LoginPage from '@/pages/LoginPage';
import SignupPage from '@/pages/SignupPage';
import NirnaiaiPage from '@/pages/NirnaiaiPage';
import CaseSearchPageTiwari from '@/pages/SearchPageTiwari';

// Search Bar
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: theme.spacing(1),
  marginRight: theme.spacing(2),
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));
  
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '20ch',
      '&:focus': {
        width: '26ch',
      },
    },
  },
}));

// Drawer width
const drawerWidth = 195;

// Custom styled drawer content to match AppBar color
const DrawerContent = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  height: '100%'
}));

// Navigation items configuration
const navigationItems = [
  { 
    id: 'home',
    path: '/',
    label: 'Home',
    icon: <HomeIcon />
  },
  { 
    id: 'search',
    path: '/search',
    label: 'Search',
    icon: <SearchIcon />
  },
  { 
    id: 'nirnai-ai',
    path: '/nirnai-ai',
    label: 'Nirnai AI',
    icon: <GavelIcon />
  },
  { 
    id: 'My-learning',
    path: '/my-learning',
    label: 'My learning',
    icon: <DocumentIcon />
  },
  { 
    id: 'help',
    path: '/help',
    label: 'Get Help',
    icon: <HelpIcon />
  },
  { 
    id: 'contact',
    path: '/contact',
    label: 'Contact',
    icon: <ContactIcon />
  },
];

// Main App Layout Component
function MainLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <DrawerContent>
      <Toolbar>
        <Typography variant="h5" noWrap component="div">
          Nirnay.AI
        </Typography>
      </Toolbar>
      <Divider sx={{ backgroundColor: alpha('#fff', 0.2) }} />
      <List>
        {navigationItems.map((item) => (
          <ListItem key={item.id} disablePadding>
            <ListItemButton 
              component={Link}
              to={item.path}
              selected={location.pathname === item.path}
              onClick={() => setMobileOpen(false)}
              sx={{ 
                '&.Mui-selected': {
                  backgroundColor: alpha('#fff', 0.15),
                  '&:hover': {
                    backgroundColor: alpha('#fff', 0.2),
                  }
                },
                '&:hover': {
                  backgroundColor: alpha('#fff', 0.1),
                }
              }}
            >
              <ListItemIcon sx={{ color: 'inherit' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </DrawerContent>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <Button
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            Menu
          </Button>
          
          {/* Search moved to the left side after menu button */}
          <Search sx={{ mr: 2, display: { xs: 'none', sm: 'block' } }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          
          {/* This spacer pushes the login buttons to the right */}
          <Box sx={{ flexGrow: 1 }} />
          
          {/* Search for mobile only - appears on the left */}
          <Search sx={{ mr: 2, display: { xs: 'block', sm: 'none' } }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          
          {/* Login and Signup buttons */}
          <Stack direction="row" spacing={1}>
            <Link to={"/login"}><Button 
              color="inherit" 
              startIcon={<PersonIcon />}
              sx={{ 
                display: { xs: 'none', sm: 'flex' },
                borderRadius: 2
              }}
            >
              Login
            </Button></Link>
            <Link to={"/signup"}><Button 
              color="inherit" 
              variant="outlined" 
              startIcon={<PersonAddIcon />}
              sx={{ 
                display: { xs: 'none', sm: 'flex' },
                borderRadius: 2,
                borderColor: 'white',
                '&:hover': {
                  borderColor: 'white',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)'
                }
              }}
            >
              Sign Up
            </Button></Link>
            
            {/* Icons only on mobile */}
            <Button 
              color="inherit"
              sx={{ display: { xs: 'block', sm: 'none' } }}
            >
              <PersonIcon />
            </Button>
            <Button 
              color="inherit"
              sx={{ display: { xs: 'block', sm: 'none' } }}
            >
              <PersonAddIcon />
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="menu options"
      >
        {/* Mobile drawer - using paper prop to apply styles to drawer paper */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better mobile performance
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
              backgroundColor: theme => theme.palette.primary.main,
              color: theme => theme.palette.primary.contrastText
            },
          }}
        >
          {drawer}
        </Drawer>
        {/* Desktop drawer - using paper prop to apply styles to drawer paper */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
              backgroundColor: theme => theme.palette.primary.main,
              color: theme => theme.palette.primary.contrastText
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Container maxWidth="lg">
          <Routes>
            <Route path="/" element={<HomePage />} />
            {/* <Route path="/rights" element={<RightsPage />} /> */}
            <Route path="/nirnai-ai" element={<NirnaiaiPage />} />
            <Route path="/my-learning" element={<DocumentsPage />} />
            <Route path="/help" element={<HelpPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/search" element={<CaseSearchPageTiwari />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Routes>
        </Container>
      </Box>
    </Box>
  );
}

// Main App Component with Router
function LegalAssistanceApp() {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
}

export default LegalAssistanceApp;