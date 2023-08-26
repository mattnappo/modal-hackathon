import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function Album() {
  // State to hold the text input value
  const [inputValue, setInputValue] = React.useState('');

  // Function to handle text input changes
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  // Function to handle button click
  const handleButtonClick = () => {
    // Do something with inputValue, e.g., submit it or perform an action
    console.log('Input Value:', inputValue);
  };

  return (
      <div>
      <AppBar position="relative">
        <Toolbar>
          <QueryStatsIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            MarketSpeak
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              MarketSpeak
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Your goto tool for assisted market research and founder interview insights
            </Typography>


            <Card className="featureCard" >
              <Typography align="center" className="padded">
                Generate a transcript from a YouTube interview, and get key insights while you read
              </Typography>
              <Stack
                sx={{ pt: 4 }}
                direction="row"
                spacing={4}
                justifyContent="center"
                style={{marginBottom: 15}}
              >
                <Input placeholder="Enter YouTube link" onChange={handleInputChange} />
                <Button variant="outlined" onClick={handleButtonClick} >Run</Button>
              </Stack>
            </Card>

            <Typography align="center" className="or"> OR </Typography>

            <Card className="featureCard">

              <Typography align="center" className="padded" >
                Find latest trends in a particular market
              </Typography>

              <Stack
                sx={{ pt: 4 }}
                direction="row"
                spacing={4}
                justifyContent="center"
                style={{marginBottom: 15}}
              >

                <Input placeholder="Enter a prompt" onChange={handleInputChange} />

                <Button variant="outlined" onClick={handleButtonClick} >Search</Button>

              </Stack>
            </Card>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    image="https://source.unsplash.com/random?wallpapers"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Heading
                    </Typography>
                    <Typography>
                      This is a media card. You can use this section to describe the
                      content.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">View</Button>
                    <Button size="small">Edit</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Created by Matt Nappo, Neil Yeung, Lisa Sam Wang for the Modal Labs Hackathon @ MongoDB
        </Typography>
      </Box>
    </div>
  );
}
