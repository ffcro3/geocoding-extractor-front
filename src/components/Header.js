import React from 'react';
import { useHistory } from 'react-router-dom';

import { HeaderContainer, Title } from './styles';
import Settings from '../assets/wheel.svg';
import GoBack from '../assets/left-arrow.svg';

export default function Header() {
  const history = useHistory();
  const url = document.URL;
  const arrayURL = url.replace(/\/\s*$/, '').split('/');
  let PageTitle = '';

  function navigateTo(page) {
    history.push(`/${page}`);
  }

  if (arrayURL.includes('import-new')) {
    PageTitle = 'Importar Dados';
  }
  if (arrayURL.includes('extract')) {
    PageTitle = 'Extrair Dados';
  }
  if (arrayURL.includes('settings')) {
    PageTitle = 'Configurações';
  }
  if (arrayURL.includes('view')) {
    PageTitle = 'Visualizar Dados';
  }

  return (
    <HeaderContainer>
      <img src={Settings} onClick={() => navigateTo('settings')} alt="" />
      <Title>{PageTitle}</Title>
      <img src={GoBack} onClick={() => history.goBack()} alt="" />
    </HeaderContainer>
  );
}
