import styled from 'styled-components';

export const FormDiv = styled.form`
  width: 60%;
  border: none;
`;

export const PhotoFrame = styled.div`
  background: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  border: none;
  margin: 50px auto;
  img {
    height: 64px;
    width: 64px;
  }
  :hover {
    cursor: pointer;
  }

  label#thumbnail {
    border: 1px dashed #ddd;
    background-size: cover;
    cursor: pointer;
    width: 500px;
    height: 300px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    label {
      font-size: 16px;
      margin-top: 15px;
      cursor: pointer;
    }
  }

  label#thumbnail input {
    display: none;
  }

  label#thumbnail.has-thumbnail {
    border: 0;
  }

  @media (max-width: 768px) {
    border: 1px solid #eee;
    height: 200px;
    width: 200px;
  }
`;

export const PhotoButton = styled.button`
  @import url('https://fonts.googleapis.com/css?family=Montserrat:600,800&display=swap');
  width: 40%;
  height: 6%;
  background: #3264a8;
  border-radius: 7px;
  border: none;
  margin-top: 16px;
  span {
    font-family: Montserrat;
    font-style: normal;
    font-weight: 600;
    font-size: 85%;
    line-height: 20px;
    color: #ffffff;
  }
  :hover {
    background: #22487a;
    cursor: pointer;
  }
  @media (max-width: 768px) {
    height: 40px;
    width: 120px;
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
