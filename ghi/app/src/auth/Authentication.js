import { createContext, useEffect, useState, useContext } from "react";
import { Navigate } from 'react-router-dom';
let internalToken = null;

export function getToken() {
  return internalToken;
}

async function getTokenInternal() {
  const url = `${process.env.REACT_APP_ACCOUNTS_HOST}/token`;
  try {
    const response = await fetch(url, {
      credentials: 'include',
    });
    if (response.ok) {
      const data = await response.json();
      internalToken = data.token;
      return internalToken;
    }
  } catch (e) {}
  return false;
}
export const AuthContext = createContext({
  token: null,
  setToken: () => null,
});

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);

export function useToken() {
  const [token, setToken] = useState(null);
  useEffect(() => {
    async function fetchToken() {
      const token = await getTokenInternal();
      setToken(token);
    }
    if (!token) {
      fetchToken();
    }
  }, [token]);

  async function logout() {
    if (token) {
      const url = `${process.env.REACT_APP_ACCOUNTS_HOST}/token`;
      await fetch(url, {method: 'delete', credentials: 'include'});
      internalToken = null;
      setToken(null);
    }
  }

  async function login(username, account_password) {
    const url = `${process.env.REACT_APP_ACCOUNTS_HOST}/token`;
    const form = new FormData();
    form.append('username', username);
    form.append('account_password', account_password);
    console.log(form.entries());
    console.log(account_password);
    console.log(form);
    const response = await fetch(url, {
      method: 'post',
      credentials: 'include',
      body: form,
    });
    if (response.ok) {
      const token = await getTokenInternal();
      setToken(token);
      return;
    }
    let error = await response.json();
    return error.detail;
  }

  async function signup(username, email, dateOfBirth, account_password) {
    const url = `${process.env.REACT_APP_API_HOST}/registration/create`;
    const response = await fetch(url, {
      credentials: 'include',
      method: 'post',
      body: JSON.stringify({
        username,
        account_password,
        date_of_birth: dateOfBirth,
        email,
        first_name: '',
        last_name: '',
        city: '',
        state: '',
        gender: '',
        photo_url: '',
      }),
      headers: {
        'Content-Type': 'application/json',
      }
    });
    if (response.ok) {
      await login(username, account_password);
    }
    return false;
  }

  return [token, login, logout, signup];
}
