import {
  createContext,
  useContext,
  useState,
  useEffect
} from 'react';

import { jwtDecode } from "jwt-decode";

const AuthContext = createContext({});

import { api } from "../services/api";

function AuthProvider({ children }) {
  const [data, setData] = useState({});

  async function signIn({ email, password }) {
    try {
      const response = await api.post("sessions", { email, password });
      const { token, user } = response.data;

      localStorage.setItem("@estock:user", JSON.stringify(user));
      localStorage.setItem("@estock:token", token);

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      setData({ token, user });

    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Não foi possível entrar.");
      }
    }
  }

  async function bypassLogin(role){
    try {
      let response;
      if (role == "admin") {
        response = await api.post("sessions", {
          email: "admin@email.com",
          password: "123",
        });
      } else {
        response = await api.post("sessions", {
          email: "customer@email.com",
          password: "123",
        });
      }
      

      const { token, user } = response.data;

      localStorage.setItem("@estock:user", JSON.stringify(user));
      localStorage.setItem("@estock:token", token);

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      setData({ token, user });

    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Não foi possível entrar." + error);
      }
    }

  }

  function signOut() {
    localStorage.removeItem("@estock:token");
    localStorage.removeItem("@estock:user");

    setData({});
  }

  function isTokenExpired(token) {
    if (!token) return true;
  
    const decoded = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
  
    return decoded.exp < currentTime; // Returns true if expired, false otherwise
  }

  useEffect(() => {
    const token = localStorage.getItem("@estock:token");
    const user = localStorage.getItem("@estock:user");
  
    if (token && user) {
      if (isTokenExpired(token)) {
        signOut(); // If the token is expired, sign out the user
      } else {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  
        setData({
          token,
          user: JSON.parse(user)
        });
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{
      signIn,
      signOut,
      bypassLogin,
      user: data.user
    }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };