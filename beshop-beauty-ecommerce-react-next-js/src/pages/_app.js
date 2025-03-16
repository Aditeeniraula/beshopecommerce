import { createContext, useState, useEffect, useMemo } from 'react';
import Cookies from 'js-cookie';
import '../styles/styles.scss';

export const AuthContext = createContext();
export const CartContext = createContext();

const MyApp = ({ Component, pageProps }) => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) setUser({ token });
  }, []);

  const login = (token) => {
    Cookies.set('token', token, { expires: 7 });
    setUser({ token });
  };

  const logout = () => {
    Cookies.remove('token');
    setUser(null);
  };

  const authValue = useMemo(() => ({ user, login, logout }), [user]);
  const cartValue = useMemo(() => ({ cart, setCart }), [cart]);

  return (
    <AuthContext.Provider value={authValue}>
      <CartContext.Provider value={cartValue}>
        <Component {...pageProps} />
      </CartContext.Provider>
    </AuthContext.Provider>
  );
};

export default MyApp;
