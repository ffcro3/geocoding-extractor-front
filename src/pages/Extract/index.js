import React, { Component, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import download from 'downloadjs';
import {
  Container,
  Button,
  darkColors,
  lightColors
} from 'react-floating-action-button';

import { FaPlus } from 'react-icons/fa';

import { ContainerStyle, ButtonExport } from './styles';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { ContainerPage, ContainerDiv } from '../../components/Container';
import delay from 'delay';

import api from '../../services/api';

export default function Elections() {
  const [token, setToken] = useState([]);
  const [notLogged, setNotLogged] = useState([]);
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

  async function handleDownload() {
    const token = localStorage.getItem('@userIdentificationGeoCode');
    const response = await api
      .get('/download/convert', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .catch(function(err) {
        errorNotify(err);
      });

    if (response) {
      successNotify(`conversão concluída, inciando o download`);
      const token = localStorage.getItem('@userIdentificationGeoCode');
      const res = await fetch(
        'http://api.geolocation.girojundiai.com.br/download'
      );
      const blob = await res.blob();
      download(blob, 'Address.xlsx');
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

  function navigateTo(page) {
    history.push(`/${page}`);
  }

  return (
    <>
      <Header />
      <ContainerDiv>
        <ContainerPage>
          <ContainerStyle>
            <ButtonExport onClick={() => handleDownload()}>
              Extrair Dados para Excel
            </ButtonExport>
          </ContainerStyle>
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
