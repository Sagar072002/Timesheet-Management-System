const authService = {
    login: async (username, password) => {
        console.log({ "employeeid":username, "password":password });
        const response = await fetch(`http://localhost:8000/api/v1/auth/jwt/create/`, {method: "POST",headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        body: JSON.stringify({ "employeeid":username, "password":password })});
        if (!response.ok) {
            alert(
                `${response.status}\n${response.statusText}\n${response.json().message}`
             )
            throw new Error('Login failed');
            
        }

        return await response.json();
    },

    refreshToken: async (refreshToken) => {
        const response = await fetch(`http://localhost:8000/api/v1/auth/jwt/refresh/`, {method: "POST",headers: {
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
