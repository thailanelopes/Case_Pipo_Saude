import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import logo from '../logo.jpg';
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <AppBar position="static" color="primary">
      <Container maxWidth="xl">
        <Toolbar style={{ height: '60px', padding: '0 16px' }}>
          <img src={logo} alt="Pipo Saúde" className={styles.logo} />
          <Typography variant="h6" className={styles.title}>
            Pipo Saúde
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
