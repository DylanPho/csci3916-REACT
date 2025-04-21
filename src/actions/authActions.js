import actionTypes from '../constants/actionTypes';

const API_URL = process.env.REACT_APP_API_URL; // Uses environment variable
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

// 🚀 Signup Action (with automatic login)
export function submitRegister(data) {
    return dispatch => {
        return fetch(`${API_URL}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(async response => {
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Signup failed: ${response.status} - ${errorText}`);
            }
            return response.json();
        })
        .then(res => {
            if (res.success) {
                alert("Registration successful! Logging in...");
                dispatch(submitLogin({ username: data.username, password: data.password }));
            } else {
                alert(`Registration failed: ${res.message}`);
            }
        })
        .catch(error => {
            console.error("Signup error:", error);
            alert(`Signup failed: ${error.message}`);
        });
    };
}

// 🚀 Login Action
export function submitLogin(data) {
    return dispatch => {
        return fetch(`${API_URL}/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(async response => {
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Login failed: ${response.status} - ${errorText}`);
            }
            return response.json();
        })
        .then(res => {
            if (res.success && res.token) {
                let jwtToken = res.token;

                // ✅ Strip duplicate "JWT " prefix if it already exists
                if (jwtToken.startsWith("JWT ")) {
                    jwtToken = jwtToken.substring(4);
                }

                const formattedToken = `JWT ${jwtToken}`;
                console.log("✅ Storing token:", formattedToken);

                localStorage.setItem('username', data.username);
                localStorage.setItem('token', formattedToken);
                dispatch(userLoggedIn(data.username));

                alert("Login successful!");
                window.location.href = "/movielist";
            } else {
                alert("Login failed: Token missing in response.");
            }
        })
        .catch((error) => {
            console.error("Login error:", error);
            alert("Login failed: " + error.message);
        });
    };
}

// 🚀 Logout Action
export function logoutUser() {
    return dispatch => {
        localStorage.removeItem('username');
        localStorage.removeItem('token');
        dispatch(logout());
        window.location.href = "/signin";
    };
}