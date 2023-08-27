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
import NavBar from './NavBar';
import { useSearchParams } from 'next/navigation'

export default function ClickableTextBox({ data }) {

  return (
    <div className="textBox">
    {
      // data.segments.map(segment => <Typography>{segment}</Typography>)
      JSON.stringify(data, null, 4)
    }
    </div>
  );
}
