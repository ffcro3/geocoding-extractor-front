import React, { useState, useEffect, useMemo } from 'react';

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
  const [uploaded, setUploaded] = useState(['Selecione um Arquivo']);

  useEffect(() => {}, [uploaded]);

  async function handleSubmit(e) {
    e.preventDefault();
    const token = localStorage.getItem('@userIdentification');
  }

  return (
    <>
      <FormDiv>
        <FormGroup>
          <PhotoFrame>
            <label id="thumbnail">
              <input
                type="file"
                onChange={event => setUploaded('1 Arquivo selecionado')}
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
          <SaveButton type="submit" onClick={() => handleSubmit()}>
            Salvar
          </SaveButton>
        </SaveFormDiv>
      </FormDiv>
    </>
  );
}
