import actionTypes from '../constants/actionTypes';

const API_URL = process.env.REACT_APP_API_URL;
console.log("Backend API URL:", process.env.REACT_APP_API_URL);


// Action: User Logged In
function userLoggedIn(username) {
    return {
        type: actionTypes.USER_LOGGEDIN,
        username: username
    };
}

// Action: Logout
function logout() {
    return {
        type: actionTypes.USER_LOGOUT
    };
}

// 🚀 **Fixed Signup (Register) Action**
export function submitRegister(data) {
    return dispatch => {
        return fetch(`${API_URL}/signup`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            mode: 'cors'
        })
        .then(response => response.json())
        .then(res => {
            if (res.success) {
                alert("Registration successful! Logging in...");
                dispatch(submitLogin({ username: data.username, password: data.password })); // Auto-login after signup
            } else {
                alert(`Registration failed: ${res.message}`);
            }
        })
        .catch((error) => {
            console.error("Signup error:", error);
            alert("Signup failed. Please check your network and try again.");
        });
    };
}

// 🚀 **Fixed Login Action**
export function submitLogin(data) {
    return dispatch => {
        return fetch(`${API_URL}/signin`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            mode: 'cors'
        })
        .then(response => response.json())
        .then(res => {
            if (res.success) {
                localStorage.setItem('username', data.username);
                localStorage.setItem('token', `JWT ${res.token}`); // Ensure JWT prefix
                dispatch(userLoggedIn(data.username));
                alert("Login successful!");
                window.location.href = "/movielist"; // Redirect user after login
            } else {
                alert(`Login failed: ${res.message}`);
            }
        })
        .catch((error) => {
            console.error("Login error:", error);
            alert("Login failed. Please check your credentials or network.");
        });
    };
}

// 🚀 **Fixed Logout Action**
export function logoutUser() {
    return dispatch => {
        localStorage.removeItem('username');
        localStorage.removeItem('token');
        dispatch(logout());
        window.location.href = "/signin"; // Redirect after logout
    };
}
