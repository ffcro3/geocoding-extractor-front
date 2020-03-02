import React, { Component, useState, useEffect } from 'react';
import { Page } from '../../components/global';
import { useHistory } from 'react-router-dom';
import {
  Container,
  Button,
  Link,
  darkColors,
  lightColors
} from 'react-floating-action-button';

import { FaPlus } from 'react-icons/fa';

import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { ContainerPage, ContainerDiv } from '../../components/Container';
import Table from '../../components/Tables/';

import api from '../../services/api';

export default function Elections() {
  const [token, setToken] = useState([]);
  const [notLogged, setNotLogged] = useState([]);
  const history = useHistory();

  useEffect(() => {
    async function checkUser() {
      const token = await localStorage.getItem('@userIdentificationGeoCode');
      console.log(token);
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
      <Header />
      <ContainerDiv>
        <ContainerPage>
          <Table />
        </ContainerPage>
      </ContainerDiv>
      <Container>
        <Button
          tooltip="Importar novos dados"
          styles={{
            backgroundColor: darkColors.green,
            color: lightColors.white
          }}
          onClick={() => navigateTo('import-new')}
        >
          <FaPlus size={20} />
        </Button>
      </Container>
      <Footer />
    </>
  );
}
