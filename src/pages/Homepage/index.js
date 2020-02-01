import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

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
          alert('Campos com erros. Veirifique e tente novamente');
        }

        if (error.response.data.error === 'User does not exist') {
          alert('Usuário não encontrado');
        }

        if (error.response.data.error === 'Password invalid') {
          alert('Senha inválida');
        }
      });

    if (response) {
      const token = response.data.token;
      console.log(response.data);
      localStorage.setItem('@userIdentification', token);
      localStorage.setItem('@currentCIPAUser', response.data.user.name);
      localStorage.setItem('@currentCIPAMail', response.data.user.email);
      const homepath = `/home`;
      history.push(homepath);
    }
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
              onChange={e => setEmail(e.target.value)}
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
