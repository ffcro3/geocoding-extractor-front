import React, { Component, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { ContainerPage, ContainerDiv } from '../../components/Container';
import AddForm from '../../components/Forms/AddData';

import api from '../../services/api';

export default function Elections() {
  const [token, setToken] = useState([]);
  const [notLogged, setNotLogged] = useState([]);
  const history = useHistory();

  useEffect(() => {
    async function checkUser() {
      const token = await localStorage.getItem('@userIdentification');
      const response = await api
        .post('/session/verify', {
          token
        })
        .catch(function(error) {
          if (error.response.data.message === 'jwt expired') {
            localStorage.removeItem('@userIdentification');
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
          <AddForm />
        </ContainerPage>
      </ContainerDiv>
      <Footer />
    </>
  );
}
