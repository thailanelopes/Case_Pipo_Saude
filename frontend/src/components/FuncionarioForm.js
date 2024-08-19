import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { TextField, Button, Grid, Container, Typography, MenuItem, Alert, Checkbox, FormControlLabel } from '@mui/material';
import api from '../services/api';
import styles from './FuncionarioForm.module.css';

const empresas = {
  "Acme Co": [
    { id: '66c2747d70fcb345106767fd', nome: 'Plano de Saúde NorteEuropa' },
    { id: '66c2747d70fcb34510676801', nome: 'Plano Dental Sorriso' }
  ],
  "Tio Patinhas Bank": [
    { id: '66c2747d70fcb345106767ff', nome: 'Plano de Saúde Pampulha Intermédica' },
    { id: '66c2747d70fcb34510676801', nome: 'Plano Dental Sorriso' },
    { id: '66c2747d70fcb34510676803', nome: 'Plano de Saúde Mental Mente Sã, Corpo São' }
  ]
};

const FuncionarioForm = () => {
  const { register, handleSubmit, watch, setValue, control, formState: { errors } } = useForm({
    defaultValues: {
      nome: '',
      cpf: '',
      dataAdmissao: '',
      email: '',
      empresa: '',
      beneficios: [] 
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'beneficios'
  });
  
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const empresaSelecionada = watch('empresa');
  const [beneficiosDisponiveis, setBeneficiosDisponiveis] = useState([]);
  
  useEffect(() => {
    if (empresaSelecionada) {
      setBeneficiosDisponiveis(empresas[empresaSelecionada] || []);
      setValue('beneficios', []);
    } else {
      setBeneficiosDisponiveis([]);
    }
  }, [empresaSelecionada, setValue]);

  const handleBeneficioChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {

      append({ beneficio: value, dados: { 'Número do Cartão': '' } });
    } else {
      const indexToRemove = fields.findIndex(field => field.beneficio === value);
      remove(indexToRemove);
    }
  };

  const handleDadosChange = (event, index) => {
    const { name, value } = event.target;
    const updatedBeneficios = fields.map((beneficio, i) =>
      i === index ? { ...beneficio, dados: { ...beneficio.dados, [name]: value } } : beneficio
    );
    setValue('beneficios', updatedBeneficios);
  };

  const onSubmit = async (data) => {
    try {
      const response = await api.post('/incluirFuncionario', data);
      console.log(response.data);
      setSubmissionStatus('success');
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
      setSubmissionStatus('error');
    }
  };

  return (
    <Container maxWidth="sm" className={styles.container}>
      <Typography variant="h4" component="h1" gutterBottom className={styles.heading}>
        Inclusão de Funcionário
      </Typography>
      {submissionStatus === 'success' && <Alert severity="success">Funcionário incluído com sucesso!</Alert>}
      {submissionStatus === 'error' && <Alert severity="error">Erro ao incluir o funcionário. Tente novamente.</Alert>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label="Nome"
              fullWidth
              variant="outlined"
              {...register('nome', { required: 'Nome é obrigatório' })}
              error={!!errors.nome}
              helperText={errors.nome?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="CPF"
              fullWidth
              variant="outlined"
              {...register('cpf', { required: 'CPF é obrigatório' })}
              error={!!errors.cpf}
              helperText={errors.cpf?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Data de Admissão"
              type="date"
              fullWidth
              variant="outlined"
              {...register('dataAdmissao', { required: 'Data de admissão é obrigatória' })}
              InputLabelProps={{
                shrink: true,
              }}
              error={!!errors.dataAdmissao}
              helperText={errors.dataAdmissao?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              variant="outlined"
              {...register('email', { required: 'Email é obrigatório' })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Empresa"
              select
              fullWidth
              variant="outlined"
              {...register('empresa', { required: 'Selecione uma empresa' })}
              error={!!errors.empresa}
              helperText={errors.empresa?.message}
              defaultValue=""
            >
              <MenuItem value="Acme Co">Acme Co</MenuItem>
              <MenuItem value="Tio Patinhas Bank">Tio Patinhas Bank</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Benefícios</Typography>
            {beneficiosDisponiveis.map((beneficio) => (
              <div key={beneficio.id}>
                <FormControlLabel
                  control={
                    <Checkbox
                      value={beneficio.id}
                      onChange={handleBeneficioChange}
                      checked={fields.some(field => field.beneficio === beneficio.id)}
                    />
                  }
                  label={beneficio.nome}
                />
                {fields.find(field => field.beneficio === beneficio.id) && (
                  <TextField
                    label="Número do Cartão"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name="Número do Cartão"
                    value={fields.find(field => field.beneficio === beneficio.id)?.dados['Número do Cartão'] || ''}
                    onChange={(event) => handleDadosChange(event, fields.findIndex(field => field.beneficio === beneficio.id))}
                  />
                )}
              </div>
            ))}
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit" fullWidth className={styles.button}>
              Enviar
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default FuncionarioForm;