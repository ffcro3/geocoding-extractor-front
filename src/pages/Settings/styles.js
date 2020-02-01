import styled from 'styled-components';

export const SettingsDiv = styled.div`
  height: 100px;
  width: 65%;
  border: 1px solid #ddd;
  border-radius: 4px;
  display: flex;
  flex-direction: row;
  margin-bottom: 15px;
  :hover {
    cursor: pointer;
  }
`;

export const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  justify-content: center;
  :hover {
    cursor: pointer;
  }
`;

export const SettingsTitle = styled.p`
  @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');
  font-family: 'Roboto', sans-serif;
  font-size: 18px;
`;

export const SettingsSubTitle = styled.p`
  @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');
  font-family: 'Roboto', sans-serif;
  font-size: 12px;
  color: #666;
  margin-top: 4px;
`;
