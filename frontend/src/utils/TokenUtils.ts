const TokenUtils = {
    storeTokens: (accessToken, refreshToken) => {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
    },
    getAccessToken: () => localStorage.getItem('accessToken'),
    getRefreshToken: () => localStorage.getItem('refreshToken'),
    refreshTokens: async () => {
        const refreshToken = TokenUtils.getRefreshToken();
        if (!refreshToken) {
            return;
        }

        const response = await fetch('/api/token/refresh/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refresh: refreshToken }),
        });
        const data = await response.json();
        TokenUtils.storeTokens(data.access, data.refresh);
    },
    verifyToken: async () => {
        const accessToken = TokenUtils.getAccessToken();
        if (!accessToken) {
            return;
        }

        const response = await fetch('/api/token/verify/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: accessToken }),
        });
        const data = await response.json();
        return data.valid;
    },
    getAccessTokenExpiration: (accessToken) => {
        const tokenParts = accessToken.split('.');
        if (tokenParts.length !== 3) {
            return;
        }

        const decodedToken = JSON.parse(atob(tokenParts[1]));
        return decodedToken.exp;
    },
    checkToken: async () => {
        const accessToken = TokenUtils.getAccessToken();
        if (!accessToken) {
          return false;
        }
      
        const isValid = await TokenUtils.verifyToken();
        if (!isValid) {
          await TokenUtils.refreshTokens();
        }
        return isValid;
      },
};

export default TokenUtils;