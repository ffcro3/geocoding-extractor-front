import React, { useState, useEffect } from 'react';
import { Page } from '../../components/global';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';

import { Container, ContainerRow, Title, SubTitle, Header } from './styles';
import { Box } from '../../components/Boxes';

import Logo from '../../assets/logo-cipa.png';
import Settings from '../../assets/wheel.svg';

export default function Home() {
  const [token, setToken] = useState([]);
  const [notLogged, setNotLogged] = useState([]);
  const currentName = localStorage.getItem('@currentGeoUser');
  const currentMail = localStorage.getItem('@currentGeoMail');
  const history = useHistory();

  useEffect(() => {
    async function checkUser() {
      const token = await localStorage.getItem('@userIdentificationGeoCode');
      const response = await api
        .post('/session/verify', {
          token
        })
        .catch(function(error) {
          if (error.response.data.message === 'jwt expired') {
            localStorage.removeItem('@userIdentificationGeoCode');
          }
          if (error.response.data.message === 'jwt must be provided') {
            history.push('/');
          }
        });

      if (response) {
        setNotLogged(false);
      }

      if (!response) {
        setNotLogged(true);
      }
    }

    checkUser();
  }, []);

  function navigateTo(page) {
    history.push(`/${page}`);
  }

  return (
    <>
      <Page>
        <Header>
          <img src={Settings} onClick={() => navigateTo('settings')} alt="" />
        </Header>
        <Container>
          <ContainerRow>
            <img src={Logo} alt="" style={{ height: '140px', width: 'auto' }} />
          </ContainerRow>
          <ContainerRow>
            <SubTitle>Bem vindo {currentName}</SubTitle>
          </ContainerRow>
          <ContainerRow>
            <Title>O que você deseja fazer hoje?</Title>
          </ContainerRow>
          <ContainerRow>
            <Box onClick={() => navigateTo('import-new')}>Importar</Box>
            <Box onClick={() => navigateTo('extract')}>Extrair</Box>
            <Box onClick={() => navigateTo('view')}>Visualizar</Box>
            <Box onClick={() => alert('Sincronizar')}>Sincronizar</Box>
          </ContainerRow>
        </Container>
      </Page>
    </>
  );
}
