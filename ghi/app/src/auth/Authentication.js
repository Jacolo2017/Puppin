import { useEffect, useState } from "react";
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
  } catch (e) { }
  return false;
}

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
      await fetch(url, { method: 'DELETE', credentials: 'include' });
      internalToken = null;
      setToken(null);
    }
  }

  async function login(username, account_password, navigate = ()=>null) {
    const url = `${process.env.REACT_APP_ACCOUNTS_HOST}/token`;
    const form = new FormData();
    form.append('username', username);
    form.append('password', account_password);
    const response = await fetch(url, {
      method: 'post',
      credentials: 'include',
      body: form,
    });
    if (response.ok) {
      const token = await getTokenInternal();
      setToken(token);
      navigate();
      return;
    }
    let error = await response.json();
    
    return {error: error.detail, response};
  }

  return [token, login, logout];
}

