import {
  DisplayContainer,
  HeaderLogo,
  ImageContainer,
  InputBox,
  LoginContainer,
  LoginPageContainer,
  LoginWithGoogleBtn,
  Overlay,
  SubmitButton,
  TextContainer,
  TextSummary,
} from "./loginPage.styles";

const LoginPage = () => {
  const baseURL = process.env.REACT_APP_API_URL;
  console.log(baseURL);
  const logInwithgoogle = async () => {
    try {
      window.location.href = `${baseURL}/auth/google`;
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  return (
    <>
      <LoginContainer>
        <Overlay>
          <TextContainer>
            <TextSummary>"Let's Donate with Compassion"</TextSummary>
          </TextContainer>
          <DisplayContainer>
            <LoginPageContainer>
              <HeaderLogo>Food Donation</HeaderLogo>
              <h3>Login</h3>
              <LoginWithGoogleBtn onClick={logInwithgoogle}>
                Login with Google
              </LoginWithGoogleBtn>
              <br />
              <h3>OR</h3>
              <InputBox placeholder="Email" />
              <InputBox type="password" placeholder="Password" />
              <SubmitButton>Login</SubmitButton>
            </LoginPageContainer>
          </DisplayContainer>
        </Overlay>
      </LoginContainer>
    </>
  );
};

export default LoginPage;