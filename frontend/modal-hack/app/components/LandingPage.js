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
import { useRouter } from 'next/navigation'

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function LandingPage() {
  // State to hold the text input value
  const [promptValue, setPromptValue] = React.useState('');
  const [urlValue, setUrlValue] = React.useState('');

  const router = useRouter();

  const handleUrlChange = (event) => {
    setUrlValue(event.target.value);
  };

  const handlePromptChange = (event) => {
    setPromptValue(event.target.value);
  };

  const gotoInsights = () => {
    console.log('url Value:', urlValue);
    router.push('/insights');
  };
  
  const gotoSearch = () => {
    console.log('prompt value:', promptValue);
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
                <Input placeholder="Enter YouTube link" onChange={handleUrlChange} />
                <Button variant="outlined" onClick={gotoInsights} >Run</Button>
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

                <Input placeholder="Enter a prompt" onChange={handlePromptChange} />

                <Button variant="outlined" onClick={gotoSearch} >Search</Button>

              </Stack>
            </Card>
          </Container>
        </Box>
      </main>
      

      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Created by Matt Nappo, Lisa Sam Wang, Neil Yeung for the Modal Labs Hackathon @ MongoDB
        </Typography>
      </Box>
    </div>
  );
}
