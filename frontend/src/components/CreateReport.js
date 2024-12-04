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

const CreateReport = ({ userId }) => {
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:5000/api/reports', { description, userId });
      alert('Denúncia criada com sucesso!');
      setDescription('');
      navigate('/reports'); // Redireciona para a página "/reports"
    } catch (error) {
      alert('Erro ao criar denúncia.');
    }
  };

  const handleCancel = () => {
    navigate('/reports'); // Redireciona para a página "/reports" ao cancelar
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
        <ButtonContainer>
          <SubmitButton onClick={handleSubmit}>Enviar</SubmitButton>
          <CancelButton onClick={handleCancel}>Cancelar</CancelButton>
        </ButtonContainer>
      </ReportBox>
    </Container>
  );
};

export default CreateReport;
