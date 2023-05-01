import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect, logout } = useAuth0();

  return (
    <div>
      <button onClick={() => logout({ returnTo: window.location.origin })}>
        Log Out
      </button>
      <button onClick={() => loginWithRedirect()}>Log In</button>
    </div>
  );
};

export default LoginButton;
