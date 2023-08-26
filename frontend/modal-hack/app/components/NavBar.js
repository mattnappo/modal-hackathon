import AppBar from '@mui/material/AppBar';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import Link from 'next/link';

export default function NavBar() {
  return (
    <AppBar position="relative">
      <Toolbar>

        <QueryStatsIcon sx={{ mr: 2 }} />

        <Link href="/">
          <Typography variant="h6" color="inherit" noWrap>
            MarketSpeak
          </Typography>
        </Link>

      </Toolbar>
    </AppBar>
  );
}