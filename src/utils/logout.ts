export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('refresh');
  localStorage.removeItem('role');
  window.location.href = '/login'; // force reload
};
