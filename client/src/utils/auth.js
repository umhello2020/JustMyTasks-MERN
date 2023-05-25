import decode from 'jwt-decode';

const signup = (userData) => {
  return fetch('/api/users/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error('Something went wrong');
      }
    })
    .then(({ token }) => {
      setToken(token);
      return decode(token);
    });
};

const login = (userData) => {
  return fetch('/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error('Something went wrong');
      }
    })
    .then(({ token }) => {
      setToken(token);
      return decode(token);
    });
};


const setToken = (token) => {
  localStorage.setItem('token', token);
};

const getToken = () => {
  return localStorage.getItem('token');
};

const logout = () => {
  localStorage.removeItem('token');
};

const getProfile = () => {
  return decode(getToken());
};

const loggedIn = () => {
  const token = getToken();
  return !!token && !isTokenExpired(token);
};

const isTokenExpired = (token) => {
  try {
    const decoded = decode(token);
    if (decoded.exp < Date.now() / 1000) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
};

const Auth = {
  signup,
  login,
  setToken,
  getToken,
  logout,
  getProfile,
  loggedIn,
  isTokenExpired,
};

export default Auth;
