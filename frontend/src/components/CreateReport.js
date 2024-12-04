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

const ReportBox = styled.div`
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
  font-size: 24px;
  text-transform: none;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  resize: none;
  font-size: 16px;
  margin-bottom: 20px;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

const SubmitButton = styled.button`
  padding: 10px;
  font-size: 16px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #218838;
  }
`;

const CancelButton = styled.button`
  padding: 10px;
  font-size: 16px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #d32f2f;
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

const CreateReport = ({ userId }) => {
  const [description, setDescription] = useState('');
  const [infractionType, setInfractionType] = useState('');
  const [location, setLocation] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setSuccess('');
    setError('');

    try {
      await axios.post('http://localhost:5000/api/reports', {
        description,
        infractionType,
        location,
        userId,
      });
      setSuccess('Denúncia criada com sucesso!');      setDescription('');
      setInfractionType('');
      setLocation('');
      setTimeout(() => {
        navigate('/reports'); // Redireciona após 2 segundos
      }, 2000);
    } catch (error) {
      setError('Erro ao criar denúncia!');    }
  };

  const handleCancel = () => {
    navigate('/reports');
  };

  return (
    <Container>
      <ReportBox>
        <Title>Ciclista Legal</Title>
        <Subtitle>Criar Denúncia</Subtitle>
        <TextArea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descreva a denúncia"
        />
        <Select value={infractionType} onChange={(e) => setInfractionType(e.target.value)}>
          <option value="">Selecione o tipo de infração</option>
          <option value="Fechada de carro">Fechada de carro</option>
          <option value="Carro estacionado em ciclovia">Carro estacionado em ciclovia</option>
          {/* Adicione outras opções aqui */}
        </Select>
        <Input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Localização"
        />
        <ButtonContainer>
          <SubmitButton onClick={handleSubmit}>Enviar</SubmitButton>
          <CancelButton onClick={handleCancel}>Cancelar</CancelButton>
        </ButtonContainer>
        {success && <SuccessMessage>{success}</SuccessMessage>}
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </ReportBox>
    </Container>
  );
};

export default CreateReport;
