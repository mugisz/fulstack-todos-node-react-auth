import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Input from "../../components/Input/Input";
import axios from "axios";
import { AuthContext } from "../../AuthContext/AuthContext";

const AuthPage = () => {
  const [form, SetForm] = React.useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { login } = React.useContext(AuthContext);
  const changeHandler = (e) => {
    SetForm({ ...form, [e.target.name]: e.target.value });
    //console.log(form)
  };
  const registerHendler = async () => {
    try {
      await axios.post(
        "/api/auth/registration",
        { ...form },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      navigate("/");
    } catch (error) {
      console.log("handler" + error);
    }
  };
  const loginHandler = async () => {
    try {
      const { data } = await axios.post(
        "/api/auth/login",
        { ...form },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      login(data.token, data.userId);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <React.Fragment>
      <div className="container">
        <div className="auth-page">
          <Routes>
            <Route
              path="/login"
              element={
                <Input
                  changeHandler={changeHandler}
                  loginHandler={loginHandler}
                  h3="Увійти"
                  log1="увійти"
                  log2="Немає Акаунту"
                />
              }
            />
            <Route
              path="/registration"
              element={
                <Input
                  registerHendler={registerHendler}
                  changeHandler={changeHandler}
                  h3="Зареєструватись"
                  log1="зареєструватися"
                  log2="Увійти"
                />
              }
            />
          </Routes>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AuthPage;
