import React, { useEffect, useState } from 'react';
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

const ReportsBox = styled.div`
  width: 100%;
  max-width: 400px;
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  max-height: 80vh;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  color: green;
  text-transform: uppercase;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const LogoutButton = styled.button`
  padding: 5px 8px;
  font-size: 12px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #d32f2f;
  }
`;

const SubtitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Subtitle = styled.h2`
  text-align: left;
  color: #333;
  font-size: 20px;
  text-transform: none;
`;

const CreateButton = styled.button`
  padding: 5px 8px;
  font-size: 12px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #089349;
  }
`;

const ReportItem = styled.div`
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f9f9f9;
`;

const DeleteButton = styled.button`
  padding: 5px 8px;
  font-size: 12px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  
  &:hover {
    background-color: #d32f2f;
  }
`;

const ExpirationText = styled.p`
  color: red;
`;

const NoReportsMessage = styled.p`
  text-align: center;
  margin-top: 20px;
  color: #555;
`;

const ReportsList = ({ userId }) => {
  const [reports, setReports] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/reports/${userId}`);
        console.log('Reports recebidos:', response.data);  // Verifique se os dados são os esperados
        const sortedReports = response.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setReports(sortedReports);
      } catch (error) {
        alert('Erro ao carregar denúncias.');
      }
    };
  
    fetchReports();
  }, [userId]);
  

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const handleCreateReport = () => {
    navigate('/create-report');
  };

  const canDelete = (createdAt) => {
    const now = new Date();
    const createdDate = new Date(createdAt);
    const expirationDate = new Date(createdDate.setDate(createdDate.getDate() + 7));
    return now <= expirationDate;
  };

  const deleteReport = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/reports/${id}`);
      setReports(reports.filter((report) => report._id !== id));
    } catch (error) {
      alert('Erro ao excluir denúncia.');
    }
  };

  return (
    <Container>
      <ReportsBox>
        <TitleWrapper>
          <Title>Ciclista Legal</Title>
          <ButtonsWrapper>
            <LogoutButton onClick={handleLogout}>Sair</LogoutButton>
          </ButtonsWrapper>
        </TitleWrapper>

        <SubtitleWrapper>
          <Subtitle>Suas Denúncias</Subtitle>
          <CreateButton onClick={handleCreateReport}>Criar Denúncia</CreateButton>
        </SubtitleWrapper>

        {reports.length === 0 ? (
          <NoReportsMessage>Você ainda não fez nenhuma denúncia.</NoReportsMessage>
        ) : (
          reports.map((report) => (
            <ReportItem key={report._id}>
              <p><strong>Tipo de Infração:</strong> {report.infractionType}</p>
              <p><strong>Localização:</strong> {report.location}</p>
              <p><strong>Descrição:</strong> {report.description}</p>
              <p><strong>Criado em:</strong> {new Date(report.createdAt).toLocaleString()}</p>
              {canDelete(report.createdAt) && (
                <DeleteButton onClick={() => deleteReport(report._id)}>Excluir</DeleteButton>
              )}
              {!canDelete(report.createdAt) && <ExpirationText>Essa denúncia não pode mais ser excluída.</ExpirationText>}
            </ReportItem>
          ))
        )}
      </ReportsBox>
    </Container>
  );
};

export default ReportsList;
