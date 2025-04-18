import React from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Button, 
  Divider,
  Container,
  List,
  ListItem,
  ListItemText,
  Paper
} from '@mui/material';

const AboutUsPage = () => {
  const teamMembers = [
    {
      name: "Srisha KS",
      position: "Chief Executive Officer",
      email: "srisha@companyname.com",
      color: "#f50057", // pink
      bio: "Results-oriented leader with a passion for building high-performing teams and delivering exceptional customer experiences. With a background in AIML, Srisha leads our strategic initiatives and ensures we're always at the cutting edge of innovation."
    },
    {
      name: "Swatantra Tiwari",
      position: "Chief Technology Officer",
      email: "swatantra@companyname.com",
      color: "#9c27b0", // purple
      bio: "Technical wizard with a passion for solving complex problems and building scalable solutions. Swatantra oversees our development team, ensuring we deliver robust, efficient, and innovative software solutions to our clients."
    },
    {
      name: "Adviktha K",
      position: "Head of Data Science",
      email: "adviktha@companyname.com",
      color: "#4caf50", // green
      bio: "Data-driven innovator with a passion for storytelling through numbers. Adviktha leads our data science initiatives, transforming complex data sets into actionable insights that drive our product development and business growth."
    },
    {
      name: "Spandan Ray",
      position: "Creative Director",
      email: "spandan@companyname.com",
      color: "#ffc107", // yellow
      bio: "Design-savvy storyteller who crafts compelling narratives that bring our brand to life. With a background in fine art and digital design, Spandan ensures our visual identity creates memorable experiences for our customers."
    },
  ];

  const companyValues = [
    {
      title: "Innovation",
      description: "We constantly push boundaries and explore new technologies to deliver cutting-edge solutions."
    },
    {
      title: "Excellence",
      description: "We're committed to the highest standards of quality in everything we do."
    },
    {
      title: "Customer Focus",
      description: "Your success is our success. We build lasting partnerships based on trust and results."
    }
  ];

  const milestones = [
    {
      year: "2018",
      description: "Founded with a vision to create innovative tech solutions that make a difference."
    },
    {
      year: "2020",
      description: "Expanded our team and launched our flagship AI-powered platform."
    },
    {
      year: "2022",
      description: "Reached 100+ enterprise clients and opened our second office."
    },
    {
      year: "Today",
      description: "Continuing to innovate and expand our offerings to meet the evolving needs of our clients worldwide."
    }
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          About Our Company
        </Typography>
        <Typography variant="body1" paragraph>
          We build innovative solutions that transform businesses and enhance user experiences.
        </Typography>
        
        {/* Mission Section */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h6" gutterBottom>
            Our Mission
          </Typography>
          <Typography variant="body1" paragraph>
            We're on a mission to revolutionize how businesses interact with technology. Through innovative solutions and customer-centric design, we help organizations of all sizes achieve their digital transformation goals and stay ahead in an increasingly competitive landscape.
          </Typography>
        </Box>
        
        {/* Values Section */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h6" gutterBottom>
            Our Values
          </Typography>
          <Grid container spacing={3}>
            {companyValues.map((value, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Paper elevation={2} sx={{ p: 3, height: '100%' }}>
                  <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                    {value.title}
                  </Typography>
                  <Typography variant="body2">
                    {value.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
        
        {/* Team Section */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h6" gutterBottom>
            Our Leadership Team
          </Typography>
          {teamMembers.map((member, index) => (
            <Card key={index} sx={{ mb: 3, display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
              <CardMedia
                sx={{ 
                  width: { xs: '100%', md: '200px' }, 
                  height: { xs: '200px', md: '100%' },
                  backgroundColor: member.color 
                }}
              />
              <CardContent sx={{ flex: '1 0 auto', p: 3 }}>
                <Typography variant="h6" component="div">
                  {member.name}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                  {member.position}
                </Typography>
                <Typography variant="body2" paragraph>
                  {member.bio}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {member.email}
                </Typography>
                <Button variant="contained" color="primary" size="small">
                  Contact
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>
        
        {/* Journey/Timeline Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Our Journey
          </Typography>
          <List>
            {milestones.map((milestone, index) => (
              <React.Fragment key={index}>
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primary={milestone.year}
                    secondary={milestone.description}
                    primaryTypographyProps={{ fontWeight: 'bold' }}
                  />
                </ListItem>
                {index < milestones.length - 1 && <Divider variant="inset" component="li" />}
              </React.Fragment>
            ))}
          </List>
        </Box>
        
        <Button variant="contained" color="primary">
          Contact Us
        </Button>
      </Box>
    </Container>
  );
};

export default AboutUsPage;