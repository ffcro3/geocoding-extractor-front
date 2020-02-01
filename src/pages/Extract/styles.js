import styled from 'styled-components';

export const ContainerStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 200px;
  width: 100%;
  margin: 50px;
`;

export const ButtonExport = styled.button`
  height: 100px;
  width: 250px;
  background: #e06a5c;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 18px;

  :hover {
    cursor: pointer;
    background: #e06a7d;
  }
`;
