import React from 'react';
import Navbar from '../components/Navbar';
import FuncionarioForm from '../components/FuncionarioForm';
import { Container } from '@mui/material';

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <Container>
        <FuncionarioForm />
      </Container>
    </div>
  );
};

export default HomePage;
