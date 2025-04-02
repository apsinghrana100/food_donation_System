import React from 'react';
import styled, { keyframes } from 'styled-components';

// Animations
const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// Styled Components
const LoaderWrapper = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width:100%;
  background-color: #1f1a1780; /* Dark background */
  z-index: 999;

`;

const Plate = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 8px solid #4caf50; /* Green border */
  border-top-color: transparent;
  border-bottom-color: transparent;
  animation: ${rotate} 1.5s linear infinite;
  position: relative;
`;

const Fork = styled.div`
  width: 10px;
  height: 40px;
  background-color: #f2e8d5; /* Light fork */
  position: absolute;
  top: -20px;
  left: 45%;
  border-radius: 2px;
  box-shadow: 0 0 5px rgba(0,0,0,0.5);
`;

const Spoon = styled.div`
  width: 20px;
  height: 20px;
  background-color: #f2e8d5; /* Light spoon */
  border-radius: 50%;
  position: absolute;
  bottom: -10px;
  left: 40%;
  box-shadow: 0 0 5px rgba(0,0,0,0.5);
`;

const LoadingText = styled.div`
  color: #f2e8d5;
  margin-top: 20px;
  text-align: center;
  font-family: Arial, sans-serif;
  font-weight: bold;
`;

export  const FoodDonationLoader = () => {
  return (
    <LoaderWrapper>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Plate>
          <Fork />
          <Spoon />
        </Plate>
        <LoadingText>Preparing Donation...</LoadingText>
      </div>
    </LoaderWrapper>
  );
};

export default FoodDonationLoader;

