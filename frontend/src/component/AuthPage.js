import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import * as Components from './Components';

function AuthPage() {
  const [isSignIn, setIsSignIn] = useState(false); // Set default to sign up
  const { registerUser, loginUser } = useContext(AuthContext);
  const history = useHistory(); // Add useHistory hook

  const handleRegisterSubmit = async e => {
    e.preventDefault();
    const email = e.target.email.value;
    const username = e.target.username.value;
    const password = e.target.password.value;
    const password2 = e.target.password2.value;

    const registrationSuccess = await registerUser(email, username, password, password2);
    
    // Redirect to sign-in form after successful sign-up
    if (registrationSuccess) {
      setIsSignIn(true);
    }
  };

  const handleLoginSubmit = async e => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const isAuthenticated = await loginUser(email, password);

    // Redirect to dashboard on successful login
    if (isAuthenticated) {
      history.push('/dashboard');
    }
  };

  return (
    <Components.Container>
      <Components.SignUpContainer signinIn={isSignIn}>
        <Components.Form onSubmit={handleRegisterSubmit}>
          <Components.Title>Create Account</Components.Title>
          <Components.Input type="email" placeholder="Email" name="email" required />
          <Components.Input type="text" placeholder="Username" name="username" required />
          <Components.Input type="password" placeholder="Password" name="password" required />
          <Components.Input type="password" placeholder="Confirm Password" name="password2" required />
          <Components.Button type="submit">Sign Up</Components.Button>
        </Components.Form>
      </Components.SignUpContainer>

      <Components.SignInContainer signinIn={isSignIn}>
        <Components.Form onSubmit={handleLoginSubmit}>
          <Components.Title>Sign in</Components.Title>
          <Components.Input type="email" placeholder="Email" name="email" required />
          <Components.Input type="password" placeholder="Password" name="password" required />
          <Components.Anchor href="#">Forgot your password?</Components.Anchor>
          <Components.Button type="submit">Sign In</Components.Button>
        </Components.Form>
      </Components.SignInContainer>

      <Components.OverlayContainer signinIn={isSignIn}>
        <Components.Overlay signinIn={isSignIn}>
          <Components.LeftOverlayPanel signinIn={isSignIn}>
            <Components.Title>Welcome Back!</Components.Title>
            <Components.Paragraph>
              To keep connected with us please login with your personal info
            </Components.Paragraph>
            <Components.GhostButton onClick={() => setIsSignIn(true)}>
              Sign In
            </Components.GhostButton>
          </Components.LeftOverlayPanel>

          <Components.RightOverlayPanel signinIn={isSignIn}>
            <Components.Title>Hello, Friend!</Components.Title>
            <Components.Paragraph>
              Enter your personal details and start your journey with us
            </Components.Paragraph>
            <Components.GhostButton onClick={() => setIsSignIn(false)}>
              Sign Up
            </Components.GhostButton>
          </Components.RightOverlayPanel>
        </Components.Overlay>
      </Components.OverlayContainer>
    </Components.Container>
  );
}

export default AuthPage;
