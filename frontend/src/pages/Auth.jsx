// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const authService = {
//     login: async (username, password) => {
//         try {
//             const response = await fetch(`api/v1/auth/jwt/create/`, {
//                 method: "POST",
//                 headers: {
//                     "Content-type": "application/json; charset=UTF-8",
//                 },
//                 body: JSON.stringify({ "employeeid": username, "password": password })
//             });
// if(response.ok){
//     console.log({ "employeeid": username, "password": password });

// }
//             if (!response.ok) {
//                 const errorResponse = await response.json();
//                 const errorMessage = errorResponse.message || 'Login failed';
//                 if(username!=="" && password!=="")
//                         toast.error('Invalid Credentials');

//                 throw new Error(errorMessage);
//             }

//             return await response.json();
//         } catch (error) {
//             // toast.error('Login error:', error);
//             throw error; // Rethrow the error for the caller to handle
//         }
//     },

//     refreshToken: async (refreshToken) => {
//         try {
//             const response = await fetch(`api/v1/auth/jwt/refresh/`, {
//                 method: "POST",
//                 headers: {
//                     "Content-type": "application/json; charset=UTF-8",
//                 },
//                 body: JSON.stringify({ refresh: refreshToken })
//             });

//             if (!response.ok) {
//                 throw new Error('Refresh token failed');
//             }

//             return await response.json();
//         } catch (error) {
//             toast.error('Refresh token error:', error);
//             throw error; // Rethrow the error for the caller to handle
//         }
//     },

//     // Implement other authentication-related methods (logout, register) here
// };

// export default authService;
