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
// import { useSearchParams } from 'next/navigation'

/*
export const getServerSideProps = async (request) => {
  const url = request.nextUrl.searchParams.get('url');
  console.log('url:', url)

  const res = await fetch('https://api.github.com/repos/vercel/next.js')
  const data = await res.json()

  return { props: { data } }
}
*/

function InsightsWindow({data}) {

  // const searchParams = useSearchParams()
  // const url = searchParams.get('url')

  // console.log("got data props", props.data)
  console.log("got data props", data)

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

              {/* URL: {url} */}
              {/* proc: {props.data} */}
              <ClickableTextBox className="textBox" />

            </Card>
          </Container>
        </Box>
      </main>
    </div>
  );
}

export default InsightsWindow;