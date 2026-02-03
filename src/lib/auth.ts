export const getAccessToken = () =>
  typeof window !== "undefined"
    ? localStorage.getItem("accessToken")
    : null;

export const getRefreshToken = () =>
  typeof window !== "undefined"
    ? localStorage.getItem("refreshToken")
    : null;

export const setAuthTokens = (accessToken: string, refreshToken: string) => {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
};

export const clearAuthTokens = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

export const isAuthenticated = () => {
  return !!getAccessToken();
};
