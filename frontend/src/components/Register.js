import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f3f4f6;
`;

const RegisterBox = styled.div`
  width: 100%;
  max-width: 400px;
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
  color: green;
  text-transform: uppercase;
`;

const Subtitle = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  color: #333;
  font-size: 24px; /* Tamanho reduzido */
  text-transform: none; /* Removido o uppercase */
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 16px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #089349;
  }
`;

const StyledLink = styled.p`
  margin-top: 15px;
  text-align: center;
  color: #007bff;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const SuccessMessage = styled.p`
  color: green;
  text-align: center;
  margin-top: 10px;
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
  margin-top: 10px;
`;

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');

    try {
      await axios.post('http://localhost:5000/api/users/register', {
        name,
        email,
        password,
      });
      setSuccess('Cadastro realizado com sucesso!');
      setTimeout(() => {
        navigate('/'); // Redireciona após 2 segundos
      }, 2000);
    } catch (error) {
      setError('Erro ao cadastrar usuário.');
    }
  };

  return (
    <Container>
      <RegisterBox>
        <Title>Ciclista Legal</Title>
        <Subtitle>Cadastro</Subtitle>
        <Form onSubmit={handleRegister}>
          <Input
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit">Cadastrar</Button>
          {success && <SuccessMessage>{success}</SuccessMessage>}
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </Form>
        <StyledLink onClick={() => navigate('/')}>
          Já possui uma conta? Clique aqui.
        </StyledLink>
      </RegisterBox>
    </Container>
  );
};

export default Register;
