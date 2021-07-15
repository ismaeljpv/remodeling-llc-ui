import decode from 'jwt-decode';

const Authentication = {
    tokenKey: 'authorization.llc',
    isLoggedIn: false,
    isAuthenticated() {
        this.isLoggedIn = (sessionStorage.getItem(this.tokenKey)) ? true : false;
        return this.isLoggedIn;
    },
    logOut() {
        sessionStorage.removeItem(this.tokenKey);
        sessionStorage.clear();
        this.isLoggedIn = false;
    },
    logIn(token) {
        sessionStorage.removeItem(this.tokenKey);
        sessionStorage.setItem(this.tokenKey, token);
        this.isLoggedIn = true;
    },
    getToken() {
        return sessionStorage.getItem(this.tokenKey);
    },
    getProfile() {
        return (this.getToken()) ? decode(this.getToken()) : undefined;
    },
    hasAdminRole() {
        const token = this.getProfile();
        if (token === null) return false;

        if (token.aud instanceof Array) {
            return (token.aud.some(e => (e === 'ADMIN')))
        } else {
            return (token.aud === 'ADMIN')
        }
    }
};

export default Authentication;