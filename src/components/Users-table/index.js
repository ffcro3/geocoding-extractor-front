import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import { makeStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import ButtonUI from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { toast } from 'react-toastify';

import api from '../../services/api';

import { FaEdit } from 'react-icons/fa';
import { TiDeleteOutline } from 'react-icons/ti';

import {
  Pagination,
  PaginationButton,
  PaginationInfo,
  EditButton
} from './styles';

export default function Tables({ onRefreshUsers }) {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState([1]);
  const [allPages, setAllPages] = useState([]);
  const [openDelete, setOpenDelete] = useState([]);
  const [openEdit, setOpenEdit] = useState([]);
  const [nameEdit, setNameEdit] = useState([]);
  const [emailEdit, setEmailEdit] = useState([]);
  const [typeEdit, setTypeEdit] = useState([]);
  const [idEdit, setIdEdit] = useState([]);
  const [refreshed, setRefreshed] = useState([]);

  const history = useHistory();

  useEffect(() => {
    loadUsers();
    setOpenDelete(false);
    setOpenEdit(false);
  }, [page, refreshed, onRefreshUsers]);

  async function loadUsers() {
    const token = await localStorage.getItem('@userIdentificationGeoCode');
    const response = await api
      .get(`/users?page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .catch(function(err) {
        console.log(err);
      });
    if (response) {
      setUsers(response.data);

      const pages = await api.get(`/users/pages`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setAllPages(pages.data);
    }
  }

  function handleCloseDelete() {
    setOpenDelete(false);
    setEmailEdit(null);
    setNameEdit(null);
    setTypeEdit(null);
    setIdEdit(null);
    setOpenEdit(null);
  }

  function handleCloseEdit() {
    setOpenDelete(false);
    setEmailEdit(null);
    setNameEdit(null);
    setTypeEdit(null);
    setIdEdit(null);
    setOpenEdit(null);
  }

  async function nextPageClick() {
    await setPage(Number(page) + 1);
    await loadUsers();
  }

  async function PreviousPageClick() {
    await setPage(Number(page) - 1);
    await loadUsers();
  }
  const useStyles = makeStyles({
    table: {
      minWidth: 650
    }
  });
  const classes = useStyles();

  async function excludeUser(open, name, email, type, id) {
    setOpenDelete(open);
    setEmailEdit(email);
    setNameEdit(name);
    setTypeEdit(type);
    setIdEdit(id);
  }

  async function EditUser(open, name, email, type, id) {
    setOpenEdit(open);
    setNameEdit(name);
    setEmailEdit(email);
    setTypeEdit(type);
    setIdEdit(id);
  }

  async function alterUser() {
    await setRefreshed(null);
    const token = await localStorage.getItem('@userIdentificationGeoCode');
    const response = await api.put(
      `/users/edit/${idEdit}`,
      {
        name: nameEdit,
        email: emailEdit,
        isAdmin: typeEdit
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    console.log(response);

    if (response.data.success === 'User updated') {
      successNotify('Usuário editado com sucesso!');
      setRefreshed(true);
      setOpenEdit(false);
    }
  }

  async function deleteUser() {
    await setRefreshed(null);
    const token = await localStorage.getItem('@userIdentificationGeoCode');
    const response = await api.delete(`/users/${idEdit}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (response.data.success === 'User Deleted') {
      successNotify('Usuário excluído com sucesso!');
      setRefreshed(true);
      setOpenDelete(false);
    }
  }

  function successNotify(data) {
    toast.success(data, {
      position: toast.POSITION.TOP_RIGHT
    });
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Nome</TableCell>
              <TableCell align="center">E-mail</TableCell>
              <TableCell align="center">Tipo do usuário</TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((item, index) => (
              <TableRow key={users[index]._id}>
                <TableCell align="center">{users[index].name}</TableCell>
                <TableCell align="center">{users[index].email}</TableCell>
                <TableCell align="center">
                  {users[index].isAdmin ? 'Administrador' : 'Comum'}
                </TableCell>
                <TableCell align="right">
                  <FaEdit
                    size={18}
                    style={{ color: '#4257d6', cursor: 'pointer' }}
                    onClick={() =>
                      EditUser(
                        true,
                        users[index].name,
                        users[index].email,
                        users[index].isAdmin ? true : false,
                        users[index]._id
                      )
                    }
                  />
                </TableCell>
                <TableCell align="left">
                  <TiDeleteOutline
                    size={22}
                    style={{ color: '#D7263D', cursor: 'pointer' }}
                    onClick={() =>
                      excludeUser(
                        true,
                        users[index].name,
                        users[index].email,
                        users[index].isAdmin ? 'Administrador' : 'Comum',
                        users[index]._id
                      )
                    }
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination>
        {page <= 1 ? (
          ''
        ) : (
          <PaginationButton onClick={() => PreviousPageClick()}>
            Anterior
          </PaginationButton>
        )}
        <PaginationInfo>Página {page}</PaginationInfo>
        {page > allPages ? (
          ''
        ) : (
          <PaginationButton onClick={() => nextPageClick()}>
            Próxima
          </PaginationButton>
        )}
      </Pagination>

      {/* DELETE DIALOG  */}

      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={openDelete}
        onClose={handleCloseDelete}
      >
        <DialogTitle>Deseja mesmo excluir o usuário?</DialogTitle>
        <DialogContent
          style={{
            width: '300px',
            display: 'flex',
            flexDirection: 'column',
            margin: '0px 10px'
          }}
        >
          <span
            style={{
              fontSize: '16px',
              marginBottom: '10px',
              fontWeight: 'bold'
            }}
          >
            Nome:{' '}
          </span>
          <span style={{ fontSize: '16px', marginBottom: '10px' }}>
            {nameEdit}
          </span>
          <span
            style={{
              marginBottom: '10px',
              fontSize: '16px',
              fontWeight: 'bold'
            }}
          >
            E-mail:
          </span>
          <span style={{ fontSize: '16px', marginBottom: '10px' }}>
            {emailEdit}
          </span>
          <span
            style={{
              marginBottom: '10px',
              fontSize: '16px',
              fontWeight: 'bold'
            }}
          >
            Tipo:
          </span>
          <span style={{ fontSize: '16px', marginBottom: '10px' }}>
            {typeEdit === 'Administrador' ? 'Administrador' : 'Comum'}
          </span>
        </DialogContent>
        <DialogActions>
          <ButtonUI onClick={handleCloseDelete} color="inherit">
            Cancelar
          </ButtonUI>
          <ButtonUI onClick={() => deleteUser()} color="secondary">
            Excluir
          </ButtonUI>
        </DialogActions>
      </Dialog>

      {/* UPDATE DIALOG  */}

      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={openEdit}
        onClose={handleCloseEdit}
      >
        <DialogTitle>Editar usuário: {nameEdit}</DialogTitle>
        <DialogContent
          style={{
            width: '500px',
            display: 'flex',
            flexDirection: 'column',
            margin: '0px 10px'
          }}
        >
          <TextField
            label="Nome do usuário"
            value={nameEdit}
            style={{
              marginTop: '10px',
              marginBottom: '10px'
            }}
            onChange={e => setNameEdit(e.target.value)}
          />
          <TextField
            style={{
              marginTop: '10px',
              marginBottom: '10px'
            }}
            label="E-mail do usuário"
            value={emailEdit}
            onChange={e => setEmailEdit(e.target.value)}
          />
          <InputLabel
            style={{
              marginBottom: '15px',
              color: '#483780',
              marginTop: '20px'
            }}
          >
            Tipo de usuário
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={typeEdit}
            onChange={e => setTypeEdit(e.target.value)}
          >
            <MenuItem value={true}>Administrador</MenuItem>
            <MenuItem value={false}>Comum</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <ButtonUI onClick={handleCloseEdit} color="inherit">
            Cancelar
          </ButtonUI>
          <ButtonUI onClick={() => alterUser()} color="secondary">
            Salvar
          </ButtonUI>
        </DialogActions>
      </Dialog>
    </>
  );
}
