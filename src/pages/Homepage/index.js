import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  Page,
  Container,
  Form,
  TextInput,
  Title,
  SubTitle,
  Button,
  Options
} from './styles';

import Footer from '../../components/Footer.js';

import api from '../../services/api.js';

import Logo from '../../assets/logo-cipa.png';

export default function HomePage() {
  const [password, setPassword] = useState([]);
  const [email, setEmail] = useState([]);
  const [error, setError] = useState([]);
  const history = useHistory();

  async function handleSubmit() {
    const response = await api
      .post('/session', {
        email,
        password
      })
      .catch(function(error) {
        console.log(error.response.data);
        if (
          error.response.data.error ===
          'Email and password are requireds. Please check these fields and try again'
        ) {
          errorNotify('Campos com erros. Veirifique e tente novamente');
        }

        if (error.response.data.error === 'User does not exist') {
          errorNotify('Usuário não encontrado');
        }

        if (error.response.data.error === 'Password invalid') {
          errorNotify('Senha inválida');
        }
      });

    if (response) {
      const token = response.data.token;
      console.log(response.data);
      localStorage.setItem('@userIdentificationGeoCode', token);
      localStorage.setItem('@currentGeoUser', response.data.user.name);
      localStorage.setItem('@currentGeoMail', response.data.user.email);
      const homepath = `/home`;
      history.push(homepath);
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

  return (
    <>
      <Page>
        <Container>
          <Form>
            <img src={Logo} alt="" style={{ height: '180px', width: 'auto' }} />
            <Title>Gerenciamento de Geocoding</Title>
            <SubTitle>Google Maps Javascript API to Geocoding</SubTitle>
            <TextInput
              placeholder="Digite aqui o seu e-mail"
              onChange={e => setEmail(e.target.value.trim().toLowerCase())}
            />
            <TextInput
              placeholder="Digite aqui o sua senha"
              onChange={e => setPassword(e.target.value)}
              type="password"
            />
            <Button onClick={() => handleSubmit()}>Entrar</Button>
            <Options>Esqueci a minha senha</Options>
            <Options>Solicitar novo usuário</Options>
          </Form>
        </Container>
        <Footer />
      </Page>
    </>
  );
}
