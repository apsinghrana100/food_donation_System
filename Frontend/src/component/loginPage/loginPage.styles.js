import styled from "styled-components";
import foodImage from "../loginPage/childfood.jpeg";

export const LoginContainer = styled.div`
  width: 100%;
  height: 100vh;
  background-image: url(${foodImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const Overlay = styled.div`
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const TextContainer = styled.div`
  width: 50%;
  color: #ffffff;
  display: flex;
  justify-content: center;
  
  @media screen and (max-width:1025px){
    width: 1%
  }
`;

export const DisplayContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 60%;
  padding: 10px;
  color: white;
  @media screen and (max-width:1025px){
    width: 100%
  }
`;

export const ImageContainer = styled.img`
  width: 50%;
  height: 20%;
  padding: 10px;
`;

export const LoginPageContainer = styled.div`
  width: 50%;
  height: 500px;
  padding: 20px;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  @media screen and (max-width:1025px){
    width: 100%
  }
`;

export const LoginWithGoogleBtn = styled.button`
  align-items: center;
  background-image: linear-gradient(144deg, #ff7e5f, #feb47b);
  border: 0;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(255, 126, 95, 0.4);
  color: #ffffff;
  display: flex;
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
  justify-content: center;
  padding: 15px 20px;
  text-decoration: none;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background-image: linear-gradient(144deg, #feb47b, #ff7e5f);
  }
`;

export const TextSummary = styled.span`
  color: #ffffff;
  font-size: 65px;
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

export const InputBox = styled.input`
  padding: 12px;
  margin: 10px 0;
  width: 60%;
  border: none;
  border-radius: 25px;
  background-color: rgba(255, 255, 255, 0.8);
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  color: #333;

  &:focus {
    outline: none;
    background-color: rgba(255, 255, 255, 1);
  }
`;

export const SubmitButton = styled.button`
  padding: 12px 50px;
  border-radius: 25px;
  color: #ffffff;
  background-color: #ff7e5f;
  border: none;
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background-color: #feb47b;
  }
`;

export const HeaderLogo = styled.span`
  padding: 10px;
  font-size: 32px;
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  color: #ffffff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;