import "./App.scss";
import Navbar from "./components/Navbar/Navbar";
import { MainRoutes } from "./routs/routs";
import { AuthContext } from "./AuthContext/AuthContext";
import { useAuth } from "./hooks/AuthHooks";
function App() {
  const { login, logout, token, userId, isReady } = useAuth();
  const isLogin = !!token;
  // const routes = useRoutes(isLogin);

  return (
    <AuthContext.Provider
      value={{ isLogin, login, logout, token, userId, isReady }}
    >
      <>
        <Navbar isLogin={isLogin} logout={logout} />
        <MainRoutes isLogin={isLogin} />
      </>
    </AuthContext.Provider>
  );
}

export default App;
