import styled from 'styled-components';

export const FormDiv = styled.form`
  width: 60%;
  border: none;
`;

export const PhotoFrame = styled.div`
  width: 100%;
  height: 300px;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  border: 1px dashed #666;
  margin: 50px auto;
  img {
    height: 64px;
    width: 64px;
  }
  :hover {
    cursor: pointer;
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
