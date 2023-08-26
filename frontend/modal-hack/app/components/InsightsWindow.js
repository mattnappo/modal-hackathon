'use client'
import * as React from 'react';
import { useState, useEffect } from 'react';
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

function InsightsWindow() {

  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(true)

  const searchParams = useSearchParams()

  useEffect(() => {
    const url = searchParams.get('url')

    fetch(`/api/insights?url=${url}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
  }, [])

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

              {/* {isLoading ? 'Loading data...' : <ClickableTextBox data={data} className="textBox" /> } */}
              <ClickableTextBox data={{segments: ['seg1', 'seg2', 'sdfsdfkfkjhdsfkjhdsfkjhdsfkjhsdfkjhsdfkjhsdfkjhdsfkjhdsfkjhdsfkjhsdfkjhsdfkjhsdkjfhsdh', 'seg3']}} />

            </Card>
          </Container>
        </Box>
      </main>
    </div>
  );
}

export default InsightsWindow;