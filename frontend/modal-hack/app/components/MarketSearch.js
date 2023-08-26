import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { useRouter } from 'next/navigation'
import ClickableTextBox from './ClickableTextBox';
import NavBar from './NavBar';
import { useSearchParams } from 'next/navigation'

function MarketSearch() {

  const searchParams = useSearchParams()

  const prompt = searchParams.get('prompt')

  return (
    <div>
      <NavBar />
      <main>
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="lg">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Interview Insights
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Get key insights on a video transcript
            </Typography>

            <Card className="featureCard">

              <Typography className="textBox">
                Market search w prompt: {prompt}
              </Typography>

            </Card>
          </Container>
        </Box>
      </main>
    </div>
  );
}

export default MarketSearch;
