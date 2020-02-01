import React, { useState, useEffect } from 'react';

import api from '../../../services/api';

import {
  FormGroup,
  SelectInput,
  TextInput,
  Label,
  SaveButton,
  SaveFormDiv,
  LabelSmall,
  DateInput
} from '../../global';
import { FormDiv, PhotoFrame, PhotoButton } from './styles';

export default function AddElection() {
  const [site, setSite] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [sectorSelected, setSectorSelected] = useState([]);
  const [siteSelected, setSiteSelected] = useState([]);
  const [managementName, setManagementName] = useState([]);
  const [dateStart, setDateStart] = useState([]);
  const [dateEnd, setDateEnd] = useState([]);

  useEffect(() => {
    async function loadsite() {
      const token = localStorage.getItem('@userIdentification');
      const response = await api.get('/site/sectors', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response) {
        setSectors(response.data);
      }
    }
    loadsite();
  }, [site]);

  async function getSite(sector) {
    const token = localStorage.getItem('@userIdentification');
    const response = await api.get(`/site/sectors/${sector}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (response) {
      setSite(response.data);
      console.log(response.data);
      setSectorSelected(sector);
      console.log(response.data);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const token = localStorage.getItem('@userIdentification');
    const response = await api
      .post(
        '/campaign',
        {
          site: siteSelected,
          management: managementName,
          dateStart: dateStart,
          dateEnd: dateEnd
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      .catch(function(error) {
        console.log(error.response.data);
      });

    if (response) {
      alert(`${managementName} com sucesso!`);
    }

    if (!response) {
      alert(`Erro ao criar ${managementName}. Tente novamente.`);
    }
  }

  return (
    <>
      <FormDiv>
        <FormGroup>
          <PhotoFrame>
            <img
              src="https://i.imgur.com/XO0A5K6.png"
              alt="Clique para adicionar um arquivo"
            />
          </PhotoFrame>
        </FormGroup>
        <SaveFormDiv>
          <SaveButton type="submit" onClick={() => handleSubmit()}>
            Salvar
          </SaveButton>
        </SaveFormDiv>
      </FormDiv>
    </>
  );
}
