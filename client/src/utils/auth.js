import decode from 'jwt-decode';

class Auth {
    static setToken(token) {
        localStorage.setItem('token', token);
}

    static getToken() {
        return localStorage.getItem('token');
    }

    static logout() {
        localStorage.removeItem('token');
    }

    static getProfile() {
        return decode(this.getToken());
    }

    static loggedIn() {
        const token = this.getToken();
        return !!token && !this.isTokenExpired(token);
    }

    static isTokenExpired(token) {
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
    }
}

export default Auth;