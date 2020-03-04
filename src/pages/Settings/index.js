import React, { Component, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Footer from '../../components/Footer';
import Header from '../../components/Header';
import {
  ContainerTitle,
  ContainerPage,
  ContainerDiv
} from '../../components/Container';
import {
  SettingsDiv,
  SubContainer,
  SettingsSubTitle,
  SettingsTitle
} from './styles';

import { FaUserFriends, FaLocationArrow, FaRegFileExcel } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';
import { GiExitDoor } from 'react-icons/gi';

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

  function navigateTo(page) {
    history.push(`/${page}`);
  }

  async function loggedOut() {
    await localStorage.removeItem('@userIdentificationGeoCode');
    history.push('/');
  }

  return (
    <>
      <Header />
      <ContainerDiv>
        <ContainerPage>
          <ContainerTitle>Configurações da Aplicação</ContainerTitle>

          <SettingsDiv>
            <SubContainer>
              <FaUserFriends size={40} />
            </SubContainer>
            <SubContainer onClick={() => navigateTo('users')}>
              <SettingsTitle>Usuários</SettingsTitle>
              <SettingsSubTitle>
                Adicionar, remover, alterar usuários da aplicação
              </SettingsSubTitle>
            </SubContainer>
          </SettingsDiv>

          <SettingsDiv>
            <SubContainer>
              <GiExitDoor size={40} />
            </SubContainer>
            <SubContainer onClick={() => loggedOut()}>
              <SettingsTitle>Sair do Sistema</SettingsTitle>
              <SettingsSubTitle>Finalizar sessão no sistema.</SettingsSubTitle>
            </SubContainer>
          </SettingsDiv>
        </ContainerPage>
      </ContainerDiv>
      <Footer />
    </>
  );
}
