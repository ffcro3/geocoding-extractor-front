import React, { useState, useEffect } from 'react';
import { Page } from '../../components/global';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import delay from 'delay';

import api from '../../services/api';

import {
  Container,
  ContainerRow,
  Title,
  SubTitle,
  Header,
  DivRefresh,
  DivText
} from './styles';
import { Box } from '../../components/Boxes';

import Logo from '../../assets/logo-cipa.png';
import Loading from '../../assets/loadPage.gif';
import Settings from '../../assets/wheel.svg';

export default function Home() {
  const [token, setToken] = useState([]);
  const [notLogged, setNotLogged] = useState([]);
  const currentName = localStorage.getItem('@currentGeoUser');
  const currentMail = localStorage.getItem('@currentGeoMail');
  const [refreshing, setRefreshing] = useState([]);
  const history = useHistory();

  useEffect(() => {
    setRefreshing(true);
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
        setRefreshing(false);
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

  async function syncData() {
    await setRefreshing(true);
    const token = await localStorage.getItem('@userIdentificationGeoCode');
    const response = await api
      .get('/geocode', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .catch(function(err) {
        errorNotify(err);
        setRefreshing(false);
      });

    if (response) {
      await delay(30000);
      const dataCount = await api
        .get('/geocode/count', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .catch(function(err) {
          errorNotify(err);
          setRefreshing(false);
        });

      if (dataCount) {
        console.log(dataCount);
        successNotify(
          `${dataCount.data.total} Endereços Sincronizados. Clique em "Extrair" para continuar`
        );
        setRefreshing(false);
      }
    }
  }

  function errorNotify(data) {
    toast.error(`Ops!! ${data}`, {
      position: toast.POSITION.TOP_RIGHT
    });
  }

  function successNotify(data) {
    toast.success(data, {
      position: toast.POSITION.TOP_RIGHT
    });
  }

  if (refreshing) {
    return (
      <>
        <DivRefresh>
          <DivText>Carregando... Aguarde...</DivText>
          <img src={Loading} />
        </DivRefresh>
      </>
    );
  }
  if (refreshing === false) {
    return (
      <>
        <Page>
          <Header>
            <img src={Settings} onClick={() => navigateTo('settings')} alt="" />
          </Header>
          <Container>
            <ContainerRow>
              <img
                src={Logo}
                alt=""
                style={{ height: '140px', width: 'auto' }}
              />
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
              <Box onClick={() => syncData()}>Sincronizar</Box>
            </ContainerRow>
          </Container>
        </Page>
      </>
    );
  }
}
