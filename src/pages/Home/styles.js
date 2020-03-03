import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  width: 60%;
  margin 0px auto;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
`;

export const ContainerRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  img {
    height: 80px;
    width: 80px;
    margin-bottom: 15px;
  }

  margin-top: 15px;
`;

export const Title = styled.p`
  @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');
  font-family: 'Roboto', sans-serif;
  font-size: 38px;
  font-weight: bold;
  color: #333;
`;

export const SubTitle = styled.p`
  @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');
  font-family: 'Roboto', sans-serif;
  font-size: 22px;
  color: #333;
`;

export const Header = styled.div`
  height: 40px;
  width: 100%;
  background: transparent;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  position: fixed;
  top: 10px;
  margin: 0px -40px;

  img {
    height: 30px;
    width: 30px;

    :hover {
      cursor: pointer;
    }
  }
`;

export const DivRefresh = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #fff;
`;

export const DivText = styled.span`
  font-size: 36px;
  color: #3f8cf4;
`;
