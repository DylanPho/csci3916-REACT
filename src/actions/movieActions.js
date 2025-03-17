import actionTypes from '../constants/actionTypes';

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080"; // Fallback to localhost if env var is missing

function moviesFetched(movies) {
    return {
        type: actionTypes.FETCH_MOVIES,
        movies: movies
    }
}

function movieFetched(movie) {
    return {
        type: actionTypes.FETCH_MOVIE,
        selectedMovie: movie
    }
}

function movieSet(movie) {
    return {
        type: actionTypes.SET_MOVIE,
        selectedMovie: movie
    }
}

export function setMovie(movie) {
    return dispatch => {
        dispatch(movieSet(movie));
    }
}

// ✅ Fetch a single movie with reviews
export function fetchMovie(movieId) {
    return dispatch => {
        return fetch(`${API_URL}/movies/${movieId}?reviews=true`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token') // Include JWT token
            }
        }).then((response) => {
            if (!response.ok) {
                throw Error(`Error ${response.status}: ${response.statusText}`);
            }
            return response.json();
        }).then((res) => {
            dispatch(movieFetched(res));
        }).catch((e) => console.error("Error fetching movie:", e));
    }
}

// ✅ Fetch all movies (with optional reviews query)
export function fetchMovies() {
    return dispatch => {
        const token = localStorage.getItem('token'); // Retrieve stored token
        console.log("Fetching movies from:", `${API_URL}/movies?reviews=true`); // Debugging

        return fetch(`${API_URL}/movies?reviews=true`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token  // Include JWT token
            }
        }).then(response => {
            if (!response.ok) {
                throw Error(`Error ${response.status}: ${response.statusText}`);
            }
            return response.json();
        }).then(res => {
            dispatch(moviesFetched(res));
        }).catch((e) => console.error("Error fetching movies:", e));
    }
}
