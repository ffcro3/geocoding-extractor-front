import styled from 'styled-components';

export const Page = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Container = styled.div`
  @media (max-width: 600px) {
    margin-top: 0px 100px;
    width: 100%;
    max-width: 80%;
    max-height: 120%;
  }
  @media (min-width: 600px) {
    width: 100%;
    max-width: 40%;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto 0px;
  box-shadow: 0px 0px 25px 8px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  background: #fff;
  height: auto;
`;

export const Form = styled.div`
  height: 100%;
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  img {
    height: 100px;
    width: 100px;
    margin-bottom: 5px;
    margin-top: 10px;
  }
`;

export const Title = styled.h2`
  @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');
  font-family: 'Roboto', sans-serif;
  font-size: 24px;
  margin-bottom: 5px;
`;

export const SubTitle = styled.p`
  @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  margin-bottom: 35px;
`;

export const TextInput = styled.input`
  @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');
  font-family: 'Roboto', sans-serif;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid #ccc;
  padding: 5px;

  margin-bottom: 20px;
  height: 40px;
  width: 70%;
`;

export const Button = styled.button`
  @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');
  font-family: 'Roboto', sans-serif;
  border: none;
  border-radius: 2px;
  background: #e06a5c;
  color: #fff;
  height: 40px;
  width: 40%;
  margin-top: 20px;
  margin-bottom: 20px;

  :hover {
    background: #e06a7d;
  }
`;

export const Options = styled.a`
  @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  text-decoration: none;
  color: #e06a5c;
  margin-top: 10px;
  :hover {
    color: #e06a7d;
    cursor: pointer;
  }
`;

export const Footer = styled.p``;
