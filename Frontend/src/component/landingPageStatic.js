import React from 'react';
import styled from 'styled-components';
// import backgroundImg from '../assets/image.png'; // Adjust the path if needed

const MainContainer = styled.div`
  flex: 1;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-image: url('https://images.pexels.com/photos/6646919/pexels-photo-6646919.jpeg'); */
  background-size: cover;
  background-position: center;
  position: relative;
  color: #ffffff;
`;

const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.5); /* Dark overlay */
  padding: 40px;
  border-radius: 12px;
  text-align: center;
  max-width: 600px;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 20px;
`;

const Quote = styled.p`
  font-size: 1.5rem;
  line-height: 1.6;
`;

const LandingPageStaticData = () => {
  return (
    <MainContainer>
      <Overlay>
        <Title>Welcome to Food Donation</Title>
        <Quote>
          "The best way to find yourself is to lose yourself in the service of others."
          <br /> - Mahatma Gandhi
        </Quote>
        <Quote style={{ marginTop: '20px' }}>
          "No one has ever become poor by giving." <br /> - Anne Frank
        </Quote>
      </Overlay>
    </MainContainer>
  );
};

export default LandingPageStaticData;
