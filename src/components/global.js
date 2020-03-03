import styled from 'styled-components';

export const PageFooter = styled.div`
  display: flex;
  height: 50px;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  p {
    color: #fff;
    font-size: 14px;
    text-decoration: none;
    a {
      color: #fff;
      font-size: 14px;
      text-decoration: none;
      :hover {
        cursor: pointer;
        color: #ccc;
      }
    }
  }
`;

export const Page = styled.div`
  height: 100vh;
  background: #fff;
`;

export const SelectInput = styled.select`
  height: 40px;
  border: 1px #ccc solid;
  border-radius: 3px;
  width: 100%;
  padding: 10px;
  color: #333;
  background: #fff;
`;

export const TextInput = styled.input.attrs({
  type: 'Text'
})`
  height: 40px;
  border: 1px #ccc solid;
  border-radius: 3px;
  width: 100%;
  padding: 10px;
  color: #333;
`;

export const DateInput = styled.input.attrs({
  type: 'Date'
})`
  height: 40px;
  border: 1px #ccc solid;
  border-radius: 3px;
  width: 100%;
  padding: 10px;
  color: #333;
`;

export const Label = styled.label`
  @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  margin-bottom: 5px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  margin-bottom: 20px;
`;

export const SaveButton = styled.button`
  height: 40px;
  width: 150px;
  color: #fff;
  background: green;
  border: none;
  border-radius: 4px;
  margin-bottom: 30px;
  :hover {
    cursor: pointer;
  }
`;

export const SaveFormDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const LabelSmall = styled.small`
  @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');
  font-family: 'Roboto', sans-serif;
  font-size: 12px;
`;
