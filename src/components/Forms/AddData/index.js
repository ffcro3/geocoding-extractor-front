import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router-dom';

import api from '../../../services/api';

import { FormGroup, SaveButton, SaveFormDiv } from '../../global';
import { FormDiv, PhotoFrame } from './styles';

export default function AddElection() {
  const [uploaded, setUploaded] = useState(['Selecione um Arquivo']);
  const [file, setFile] = useState(['Selecione um Arquivo']);
  const history = useHistory();

  useEffect(() => {}, [uploaded]);

  async function handleSubmit(e) {
    e.preventDefault();
    const data = await new FormData();
    await data.append('file', file);

    const token = localStorage.getItem('@userIdentificationGeoCode');
    const response = await api
      .post('/addressStore', data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .catch(function(err) {
        errorNotify(err);
      });

    if (response) {
      successNotify(
        `Inserido ${response.data.success} endereços no banco. \n Clique em Sincronizar para continuar`
      );
      history.push('/home');
    }
  }

  function setImage(file) {
    setUploaded('1 Arquvo selecionado');
    setFile(file);
    console.log(file);
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
      <FormDiv>
        <FormGroup>
          <PhotoFrame>
            <label id="thumbnail">
              <input
                type="file"
                onChange={e => setImage(e.target.files[0])}
                accept="application/vnd.ms-excel"
                style={{
                  width: '100%',
                  height: '100%',
                  cursor: 'pointer',
                  display: 'none'
                }}
              />
              <img
                src="https://i.imgur.com/XO0A5K6.png"
                alt="Clique para adicionar um arquivo"
              />
              <label>{uploaded}</label>
            </label>
          </PhotoFrame>
        </FormGroup>
        <SaveFormDiv>
          <SaveButton type="submit" onClick={e => handleSubmit(e)}>
            Salvar
          </SaveButton>
        </SaveFormDiv>
      </FormDiv>
    </>
  );
}
