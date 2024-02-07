const authService = {
    login: async (username, password) => {
        const response = await fetch(`dbase/token/login/`, {method: "POST",headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        body: JSON.stringify({ username, password })});
        if (!response.ok) {
            alert(
                `${response.status}\n${response.statusText}\n${response.json().message}`
             )
            throw new Error('Login failed');
            
        }

        return await response.json();
    },

    refreshToken: async (refreshToken) => {
        const response = await fetch(`dbase/token/refresh/`, {method: "POST",headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        body: JSON.stringify({ refresh: refreshToken })});
        if (!response.ok) {
            throw new Error('Login failed');
        }

        return await response.json();
    },

    // Implement other authentication-related methods (logout, register) here
};

export default authService;
