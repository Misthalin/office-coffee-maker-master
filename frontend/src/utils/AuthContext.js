// Inspired by idg2100-ntnu-movies-front-end-1.0.0 at https://github.com/carlosvicient/idg2100-ntnu-movies-front-end
import React from "react";
import toast from "react-hot-toast";
import jwt_decode from "jwt-decode";
import { login, register, resetPassword, forgotPassword, verifyEmail, validateResetToken, refreshToken, revokeToken } from "../api/userCalls";

const INITIAL_STATE = { isAuth: false, isLoading: true, token: null, user: null, error: null };
const AuthContext = React.createContext();

class AuthProvider extends React.Component {
  state = { ...INITIAL_STATE };

  // create new refreshToken on page reload
  async componentDidMount() {
    try {
      const response = await refreshToken(this.state.token); // get new refresh token
      const data = response.data;
      const token = data.jwtToken; // jwt token
      const user = data; // user details from refresh token
      if (token && user) {
        this.setState({ isAuth: true, isLoading: false, token, user }); // set user to state if token and user exists
        startRefreshTokenTimer(token); // set timer to fetch a new refresh token a minute before it expires (14 minutes after last page reload)
      } else {
        this.setState({ ...INITIAL_STATE, isLoading: false }); // remove user from state if there are no user or token
      }
      if (response.status === 400) {
        return;
      }
    } catch (error) {
      this.setState({ isLoading: false }); // set loading to false to make sure re-direct routes
      return; //error;
    }
  }

  loginUser = async (userData) => {
    const { email, password } = userData;

    const response = await login(email, password);
    const data = response.data;
    const token = data.jwtToken;
    const user = data;
    if (response.status === 200) {
      this.setState({ isAuth: true, isLoading: false, token, user, error: null });
      startRefreshTokenTimer(token);
      return toast(`Welcome, ${user.username}!`, { id: "login" });
    } else if (response.status === 400) {
      this.setState({ ...INITIAL_STATE, isLoading: false, error: response.data.message });
      return toast(`Invalid credentials`, { id: "invalidcredentialslogin" });
    } else {
      return toast.error("ERROR: Internal server issues", { id: "internalservererrorregister" });
    }
  };

  logoutUser = async () => {
    try {
      const response = await revokeToken(this.state.token);
      if (response.status === 200) {
        this.setState({ ...INITIAL_STATE, isLoading: false });
        stopRefreshTokenTimer();
        toast(`You have been logged out`, { id: "logout" });
      } else {
        //console.log(response);
      }
    } catch (error) {
      return;
    }
  };

  registerUser = async (userData) => {
    try {
      const response = await register(userData);
      if (response.status === 200) {
        toast.success(`Verification email sent`, { duration: 10000 }, { id: "registerverificationemailsent" });
        toast.success(`Registration successful!`, { id: "registersuccess" });
      } else if (response.status === 400) {
        toast.error(response.data.message, { id: "registerfail" });
      } else if (response.status === 500) {
        toast.error("ERROR: Internal server issues", { id: "internalservererrorregister" });
      }
    } catch (error) {
      return;
    }
  };

  forgotPassword = async (email) => {
    try {
      const response = await forgotPassword(email);
      if (response.status === 200) {
        toast.success(`Reset instructions sent to email`, { duration: 10000 }, { id: "forgotpasswordreset" });
      } else if (response.status === 400) {
        toast.error(response.data.message, { id: "forgotpasswordfail" });
      } else if (response.status === 500) {
        toast.error("ERROR: Internal server issues", { id: "internalservererrorforgot" });
      }
    } catch (error) {
      return;
    }
  };

  verifyEmail = async (token) => {
    try {
      const response = await verifyEmail(token);
      if (response.status === 200) {
        toast.success("Email successfully verified", { id: "verifyemailsuccess" });
      } else if (response.status === 400) {
        toast.error(response.data.message, { id: "verifyemailfail" });
      } else if (response.status === 500) {
        toast.error("ERROR: Internal server issues", { id: "verifyemailinternalerror" });
      }
    } catch (error) {
      return;
    }
  };

  validateResetToken = async (token) => {
    try {
      const response = await validateResetToken(token);
      if (response.status === 200) {
        toast.success(`Check your email for reset instructions`, { duration: 10000 }, { id: "validateresetsuccess" });
      } else if (response.status === 400) {
        toast.error(response.data.message, { id: "validatereseterror" });
      } else if (response.status === 500) {
        toast.error("ERROR: Internal server issues", { id: "validateresetinternalerror" });
      }
    } catch (error) {
      return;
    }
  };

  resetPassword = async (token, password, confirmPassword) => {
    try {
      const response = await resetPassword(token, password, confirmPassword);
      if (response.status === 200) {
        toast.success(`Your password has been reset.`, { duration: 10000 }, { id: "resetsuccess" });
      } else if (response.status === 400) {
        toast.error(response.data.message, { id: "reseterror" });
      } else if (response.status === 500) {
        toast.error("ERROR: Internal server issues", { id: "resetinternalerror" });
      }
    } catch (error) {
      return;
    }
  };

  // generates Authorization header used for api calls.
  // create header in HOCS, pass them as parameter to api call ### const header = this.context.generateHeaders();
  generateHeaders = () => {
    const request = {};
    const token = this.state.token;
    if (token) {
      request.headers = {
        Authorization: `Bearer ${token}`,
      };
    }
    return request;
  };

  render() {
    return (
      <AuthContext.Provider
        value={{
          isAuth: this.state.isAuth,
          isLoading: this.state.isLoading,
          token: this.state.token,
          user: this.state.user,
          resetPassword: this.resetPassword,
          verifyEmail: this.verifyEmail,
          validateResetToken: this.validateResetToken,
          forgotPassword: this.forgotPassword,
          registerUser: this.registerUser,
          loginUser: this.loginUser,
          logoutUser: this.logoutUser,
          generateHeaders: this.generateHeaders,
          error: this.state.error,
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

const AuthConsumer = AuthContext.Consumer;
export { AuthContext, AuthProvider, AuthConsumer };

// helper functions inspired by https://github.com/cornflourblue/react-signup-verification-boilerplate / https://jasonwatmore.com/post/2020/04/22/react-email-sign-up-with-verification-authentication-forgot-password
let refreshTokenTimeout;

// set a timeout to refresh the token a minute before it expires
const startRefreshTokenTimer = (token) => {
  let jwtToken = jwt_decode(token);
  const expires = new Date(jwtToken.exp * 1000);
  //console.log("token expires:", expires);
  const timeout = expires.getTime() - Date.now() - 60 * 1000;
  //console.log("token timeout", timeout);
  refreshTokenTimeout = setTimeout(refreshToken(), timeout);
};

const stopRefreshTokenTimer = () => {
  clearTimeout(refreshTokenTimeout);
};
