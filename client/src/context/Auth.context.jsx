import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

function setCookie(name, value, days = 1) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
}

function getCookie(name) {
  return document.cookie
    .split('; ')
    .find(row => row.startsWith(name + '='))
    ?.split('=')[1];
}

function deleteCookie(name) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userCookie = getCookie('user');
    if (userCookie) {
      try {
        setUser(JSON.parse(decodeURIComponent(userCookie)));
      } catch (err) {
        console.error("Failed to parse user cookie", err);
        deleteCookie('user'); // remove corrupted cookie
      }
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    setCookie('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    deleteCookie('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};