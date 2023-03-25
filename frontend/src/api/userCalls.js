import axios from "./axios";

const login = (email, password) => {
  return axios.post("/accounts/authenticate", { email, password });
};
const register = (data) => {
  return axios.post("/accounts/register", data);
};
const refreshToken = (token) => {
  return axios.post("/accounts/refresh-token", { token }, { headers: { Authorization: 'Bearer ' + token }});
};
const revokeToken = (token) => {
  return axios.post("/accounts/revoke-token", token, { headers: { Authorization: 'Bearer ' + token }});
};
const forgotPassword = (email) => {
  return axios.post("/accounts/forgot-password", { email });
};
const verifyEmail = (token) => {
  return axios.post("/accounts/verify-email", { token });
};
const resetPassword = (token, password, confirmPassword) => {
  return axios.post("/accounts/reset-password", { token, password, confirmPassword });
};
const validateResetToken = (token) => {
  return axios.post("/accounts/validate-reset-token", { token }, { headers: { Authorization: 'Bearer ' + token }});
};
//ADMIN RESTRICTED
const fetchAccounts = (header) => {
  return axios.get("/accounts", header);
};
//ADMIN RESTRICTED
const addAccount = (header, data) => {
  return axios.post("/accounts", data, header);
};
//ADMIN RESTRICTED
const editAccount = (header, id, data) => {
  return axios.put(`/accounts/${id}`, data, header); 
}
//ADMIN RESTRICTED
const deleteAccount = (header, id) => {
  return axios.delete(`/accounts/${id}`, header);
}
export { login, register, refreshToken, revokeToken, forgotPassword, verifyEmail, resetPassword, validateResetToken, fetchAccounts, addAccount, editAccount, deleteAccount };
