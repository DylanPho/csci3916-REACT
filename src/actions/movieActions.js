import actionTypes from '../constants/actionTypes';

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080"; // Fallback if .env isn't set

// Action creators
function moviesFetched(movies) {
  return {
    type: actionTypes.FETCH_MOVIES,
    movies: movies
  };
}

function movieFetched(movie) {
  return {
    type: actionTypes.FETCH_MOVIE,
    selectedMovie: movie
  };
}

function movieSet(movie) {
  return {
    type: actionTypes.SET_MOVIE,
    selectedMovie: movie
  };
}

// Thunk to manually set selected movie (no fetch)
export function setMovie(movie) {
  return dispatch => {
    dispatch(movieSet(movie));
  };
}

// Thunk to fetch all movies with reviews and avgRating
export const fetchMovies = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');

    const response = await fetch(`${API_URL}/movies?reviews=true`, {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (data.success) {
      dispatch(moviesFetched(data.data));
    } else {
      console.error('Failed to fetch movies:', data.message);
    }
  } catch (error) {
    console.error('Fetch movies error:', error.message);
  }
};

// Thunk to fetch a single movie by ID for detail view
export const fetchMovie = (movieId) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');

    const response = await fetch(`${API_URL}/movies/id/${movieId}`, {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (data.success) {
      dispatch(movieFetched(data.data));
    } else {
      console.error('Failed to fetch movie:', data.message);
    }
  } catch (error) {
    console.error('Fetch movie error:', error.message);
  }
};