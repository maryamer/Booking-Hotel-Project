import { useContext } from "react";
import { useReducer } from "react";
import { createContext } from "react";

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
};
function authReducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        user: action.payload,
        isAuthenticated: true,
      };
    case "logout":
      return {
        user: null,
        isAuthenticated: false,
      };
    default:
      throw new Error("Unknown action");
  }
}
const FAKE_USER = {
  name: "Maryam",
  email: "user@gmail.com",
  password: 12345,
};
function AuthProvider({ children }) {
  function login(email, password) {
    if (email == FAKE_USER.email && password == FAKE_USER.password) {
      dispatch({ type: "login", payload: FAKE_USER });
    }
  }
  function logout() {
    dispatch({ type: "logout", payload: FAKE_USER });
  }
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    authReducer,
    initialState
  );
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, logout, login }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

export function useAuth() {
  return useContext(AuthContext);
}
