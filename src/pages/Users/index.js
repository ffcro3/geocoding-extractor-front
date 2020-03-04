import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import ButtonUI from '@material-ui/core/Button';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InputLabel from '@material-ui/core/InputLabel';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Select from '@material-ui/core/Select';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import UserTable from '../../components/Users-table';

import { FaPlus } from 'react-icons/fa';

import {
  Container,
  Button,
  darkColors,
  lightColors
} from 'react-floating-action-button';

import {
  ContainerTitle,
  ContainerPage,
  ContainerDiv
} from '../../components/Container';

import { FormGroup } from '../../components/global';

import { DivContainer } from './styles';

import api from '../../services/api';

export default function Users() {
  const [notLogged, setNotLogged] = useState([]);
  const [name, setName] = useState([]);
  const [email, setEmail] = useState([]);
  const [type, setType] = useState([]);
  const [open, setOpen] = useState([]);
  const [dataRefreshed, setDataRefreshed] = useState([]);

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

    setName('');
    setType('');
    setEmail('');
    setOpen(false);
    checkUser();
  }, []);

  function handleClose() {
    setOpen(false);
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

  async function addUser() {
    setDataRefreshed(null);
    const token = await localStorage.getItem('@userIdentificationGeoCode');
    const randomPassword = Math.random()
      .toString(36)
      .slice(-8);
    const response = await api
      .post('/users', {
        token,
        name,
        email,
        password: randomPassword,
        isAdmin: type
      })
      .catch(function(error) {
        switch (error.response.data.error) {
          case 'Already have an user with this e-mail':
            errorNotify('Você não pode dois usuários com o mesmo e-mail!');
            break;

          default:
            break;
        }
      });

    successNotify('Usuário adicionado com sucesso!');
    setDataRefreshed(true);
    setOpen(false);
  }

  function handleAddClick() {
    setOpen(true);
    setName(null);
    setType(null);
    setEmail(null);
  }

  return (
    <>
      <Header />
      <ContainerDiv>
        <ContainerPage>
          <ContainerTitle>Lista de Usuários</ContainerTitle>
          <UserTable onRefreshUsers={dataRefreshed} />
        </ContainerPage>
        <Container>
          {' '}
          <Button
            tooltip="Adicionar novo usuário"
            styles={{
              backgroundColor: darkColors.blue,
              color: lightColors.white
            }}
            onClick={() => handleAddClick()}
          >
            <FaPlus size={20} />
          </Button>
        </Container>
        <Dialog
          disableBackdropClick
          disableEscapeKeyDown
          open={open}
          onClose={handleClose}
        >
          <DialogTitle>Adicionar novo usuário</DialogTitle>
          <DialogContent
            style={{
              width: '500px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              margin: '0px 10px'
            }}
          >
            <DivContainer>
              <FormGroup>
                <TextField
                  value={name}
                  onChange={e => setName(e.target.value)}
                  label="Nome do usuário"
                />
              </FormGroup>
            </DivContainer>
            <DivContainer>
              <FormGroup>
                <TextField
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  label="E-mail do usuário"
                />
              </FormGroup>
            </DivContainer>
            <DivContainer>
              <FormGroup>
                <InputLabel
                  style={{
                    marginBottom: '15px',
                    color: '#483780',
                    marginTop: '10px'
                  }}
                >
                  Tipo de usuário
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={type}
                  onChange={e => setType(e.target.value)}
                >
                  <MenuItem value={true}>Administrador</MenuItem>
                  <MenuItem value={false}>Comum</MenuItem>
                </Select>
              </FormGroup>
            </DivContainer>
          </DialogContent>
          <DialogActions>
            <ButtonUI onClick={handleClose} color="secondary">
              Cancelar
            </ButtonUI>
            <ButtonUI onClick={() => addUser()} color="primary">
              Adicionar
            </ButtonUI>
          </DialogActions>
        </Dialog>
      </ContainerDiv>
      <Footer />
    </>
  );
}
