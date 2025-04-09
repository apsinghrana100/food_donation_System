import styled, { keyframes } from "styled-components";
import { useAuth } from "../context/authContext";


export const MessagePopUp = ({message}) => {
  return (
    <>
      <Div>
        <Span isSuccess={message.success}>{message.message}</Span>
      </Div>
    </>
  );
};


export const MessageHandling = (setMessagePop) =>{
  setMessagePop(true);
console.log("i am inside of console.")

  
  setTimeout(()=>{
    setMessagePop(false);
  },3000)
}


// Styled Components


const Span = styled.span`
  padding: 10px 20px;
  /* background-color: #4caf50; your green theme */
  background-color: ${props=>props.isSuccess? "#4caf50" :"red"};
  color: #f2e8d5; /* matches your theme text */
  border-radius: 10px;
  font-weight: bold;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
`;

const slideIn = keyframes`
  from { opacity: 0; transform: translateX(100%); }
  to { opacity: 1; transform: translateX(0); }
`;

const Div = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 999;
  animation: ${slideIn} 0.5s ease forwards;
`;