import { useEffect, useState } from "react";
import { useAuth } from "../context1/AuthProvider";
import { useNavigate } from "react-router-dom";
import Data from "../../../data/Data";
import { useDispatch } from "react-redux";
import { handleLogin } from "../context/hotelsSlice";

function Login({ isAuthenticated, setIsAuthenticated }) {
  const [email, setEmail] = useState("user@gmail.com");
  const [password, setPassword] = useState("123");
  const { user } = Data();

  // const { login, isAuthenticated } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const login = (email, pass) => {
    if (user.email === email && user.password == pass) {
      dispatch(handleLogin());
      navigate(-1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      login(email, password);
    }
  };

  useEffect(() => {
    if (isAuthenticated) navigate(-1, { replace: true });
  }, [isAuthenticated, navigate]);

  return (
    <div className="loginContainer  max-w-[25rem] border border-[color:var(--text-300)] mx-auto my-8 p-4 h-fit rounded-2xl border-solid">
      <h2 className="mb-4">Login</h2>
      <form
        onSubmit={handleSubmit}
        className="form  text-[color:var(--rose-500)] w-full h-full"
      >
        <div className="formControl relative mb-4">
          <label className="block mb-[0.2rem]" htmlFor="email">
            Email
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            name="email"
            id="email"
            className="border border-[color:var(--text-400)] w-full p-2 rounded-lg border-solid"
          />
        </div>
        <div className="formControl relative mb-4">
          <label className="block mb-[0.2rem]" htmlFor="password">
            Password
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            id="password"
            className="border border-[color:var(--text-400)] w-full p-2 rounded-lg border-solid"
          />
        </div>
        <div className="buttons flex items-center justify-between">
          <button className="btn w-full px-4 py-2 rounded-lg btn--primary bg-[color:var(--primary-600)] text-white">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
export default Login;
