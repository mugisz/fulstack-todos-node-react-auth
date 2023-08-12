import React from "react";

export const useAuth = () => {
  const [token, SetToken] = React.useState(null);
  const [userId, SetuserId] = React.useState(null);
  const [isReady, SetIsReady] = React.useState(false);

  const login = React.useCallback((jwtToken, id) => {
    SetToken(jwtToken);
    SetuserId(id);

    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: id,
        token: jwtToken,
      })
    );
  }, []);

  const logout = () => {
    SetToken(null);
    SetuserId(null);
    localStorage.removeItem("userData");
  };
  React.useEffect(() => {
    const data = JSON.parse(localStorage.getItem("userData"));
    if (data && data.token) {
      login(data.token, data.userId);
    }
    SetIsReady(true);
  }, [login]);

  return { login, logout, token, userId, isReady };
};
