import styled from 'styled-components';

export const Box = styled.div`
  @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');
  font-family: 'Roboto', sans-serif;
  height: 160px;
  width: 200px;
  background: #3f8cf4;
  color: #fff;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-radius: 10px;
  font-size: 24px;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  margin-top: 20px;

  :hover {
    background: #3f8cd1;
    cursor: pointer;
  }
`;
