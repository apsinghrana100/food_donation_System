import styled from "styled-components";

export const RegistrationPageContent = styled.div`
  width: 100%;
  /* height: 100vh; */
  display: flex;
  align-items: center;
  justify-content: center;
  background: #121212;
`;

export const RegistrationCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  width: 700px; /* Fixed width */
  padding: 20px;
  background: #1e1e1e;
  border-radius: 12px;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.5);
  text-align: center;
`;

export const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #f5f5f5;
  margin-bottom: 10px;
`;

export const InputFields = styled.input`
  width: 80%;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #333;
  outline: none;
  font-size: 16px;
  background: #292929;
  color: white;
  transition: border 0.3s ease;

  &:focus {
    border-color: #4caf50;
  }
  @media screen and (max-width: 668px) {
    width: 100%;
  }
`;

export const SelectFields = styled.select`
  width: 85%;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #333;
  font-size: 16px;
  background: #292929;
  color: white;
  cursor: pointer;
`;

export const OptionField = styled.option`

  background: #1e1e1e;
  color: white;
`;

export const Filefield = styled.input.attrs({ type: "file" })`
  display: none;

  & + label {
    display: inline-block;
    padding: 12px 15px;
    background-color: #4caf50;
    color: white;
    font-size: 16px;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.3s ease;
    text-align: center;
    width: 80%;
  }

  & + label:hover {
    background-color: #45a049;
  }
  
`;

export const SubmitButton = styled.button`
  width: 80%;
  padding: 12px;
  border: none;
  border-radius: 8px;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

export const ErrorText = styled.p`
  color: red;
  font-size: 14px;
  margin: 0 0;
`;

export const WrapInputErrorMessage = styled.div`
  display:flex;
  flex-direction: column;
  align-items:center;
  width: 80%;
`;

export const WrapTwoInputBox = styled.div`
  display: flex;
  align-items: center;
  gap:10px;

  width:100%;

  @media screen and (max-width: 668px) {
    flex-direction: column;
    gap:15px;
  }
`;