import styled from 'styled-components';

export const HeaderContainer = styled.div`
  height: 50px;
  width: 100%;
  background: transparent;
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: center;
  top: 10px;

  background: #fff;
  width: 100%;

  img {
    height: 30px;
    width: 30px;
    margin: 0 40px;
    :hover {
      cursor: pointer;
    }
  }
`;

export const Title = styled.p`
  @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');
  font-family: 'Roboto', sans-serif;
  font-size: 24px;
`;
