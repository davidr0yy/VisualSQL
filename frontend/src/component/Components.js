import styled from 'styled-components';

//background whole cont
export const Container = styled.div`
  background-color: #ffffff; /* Changed to white */
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 800px;
  max-width: 100%;
  min-height: 500px;
  margin: auto;
  top: 50%;
  transform: translateY(50%);
`;

export const SignUpContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
  background-color: #8e24aa; /* Purple color */
  ${(props) =>
    props.signinIn !== true
      ? `
    transform: translateX(100%);
    opacity: 1;
    z-index: 5;
  `
      : null}
`;

export const SignInContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  left: 0;
  width: 50%;
  background-color: #ffffff; /* White color */
  z-index: 2;
  ${(props) =>
    props.signinIn !== true ? `transform: translateX(100%);` : null}
`;

//background fill up field
export const Form = styled.form`
  background-color: #ffffff; /* Changed to white */
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
`;

export const Title = styled.h1`
  font-weight: bold;
  margin: 0;
`;

export const Input = styled.input`
  background-color: #ffffff;
  border: 1px solid #ccc; /* Light gray border */
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
`;

export const Button = styled.button`
  border-radius: 20px;
  border: none;
  background-color: #8e24aa; /* Purple color */
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
  &:active {
    transform: scale(0.95);
  }
  &:focus {
    outline: none;
  }
`;

//button border of moving panel
export const GhostButton = styled(Button)`
  background-color: #ffffff; /* Changed to white */
  border-color: #8e24aa; /* Purple border */
  color: #8e24aa; /* Purple text */
`;

//forgot your password
export const Anchor = styled.a`
  color: #8e24aa; /* Purple color */
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
`;

export const OverlayContainer = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
  ${(props) =>
    props.signinIn !== true ? `transform: translateX(-100%);` : null}
`;

export const Overlay = styled.div`
  display: flex;
  height: 100%;
  width: 200%;
  left: -100%;
  position: relative;
  transition: transform 0.6s ease-in-out;
  ${(props) =>
    props.signinIn !== true ? `transform: translateX(50%);` : null}
`;

export const LeftOverlayPanel = styled.div`
  background-color: #ff4081; /* Pink color */
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  height: 100%;
  width: 50%;
  transform: translateX(-20%);
  transition: transform 0.6s ease-in-out;
  ${(props) =>
    props.signinIn !== true ? `transform: translateX(0);` : null}
`;

export const RightOverlayPanel = styled.div`
  background-color: #8e24aa; /* Purple color */
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  height: 100%;
  width: 50%;
  right: 0;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
  ${(props) =>
    props.signinIn !== true ? `transform: translateX(20%);` : null}
`;

export const Paragraph = styled.p`
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
`;
