import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router-dom';
import delay from 'delay';

import api from '../../../services/api';

import { FormGroup, SaveButton, SaveFormDiv } from '../../global';
import { FormDiv, PhotoFrame, DivRefresh, DivText } from './styles';

import Loading from '../../../assets/loadPage.gif';

export default function AddElection() {
  const [uploaded, setUploaded] = useState(['Selecione um Arquivo']);
  const [file, setFile] = useState(['Selecione um Arquivo']);
  const [refreshing, setRefreshing] = useState([]);
  const history = useHistory();

  useEffect(() => {
    setRefreshing(false);
  }, [uploaded]);

  async function handleSubmit(e) {
    setRefreshing(true);
    e.preventDefault();
    const data = await new FormData();
    await data.append('file', file);
    let quantity = null;

    const token = localStorage.getItem('@userIdentificationGeoCode');
    const response = await api
      .post('/excelUpload', data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .catch(function(err) {
        if (err.response.data.error === 'Invalid file type') {
          errorNotify('Tipo de arquivo não suportado');
        } else {
          errorNotify(err.response.data.error.message);
        }
      });

    if (response) {
      await delay(2000);
      const responseItems = await api
        .post('/addressStore', data, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .catch(function(error) {
          errorNotify(error.response.data.error.message);
        });

      if (responseItems) {
        await delay(4000);
        successNotify(
          `Inserido ${responseItems.data.success} endereços no banco. \n Clique em Sincronizar para continuar`
        );
        history.push('/home');
      }
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
}
