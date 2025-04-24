import actionTypes from '../constants/actionTypes';

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080"; // fallback

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

export function setMovie(movie) {
  return dispatch => {
    dispatch(movieSet(movie));
  };
}

export const fetchMovies = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      console.warn("No JWT token found in localStorage.");
      return;
    }

    const response = await fetch(`${API_URL}/movies?reviews=true`, {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    console.log("Fetched movies:", data);

    if (data.success) {
      dispatch(moviesFetched(data.data));
    } else {
      console.error("API returned error:", data.message);
    }
  } catch (error) {
    console.error("Error fetching movies:", error.message);
  }
};

export const fetchMovie = (movieId) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      console.warn("❌ No token found in localStorage.");
      return;
    }

    const response = await fetch(`${API_URL}/movies/id/${movieId}`, {
      headers: {
        Authorization: token || '',
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    console.log("📥 Single movie API response:", data);

    if (data.success) {
      dispatch(movieFetched(data.data));
    } else {
      console.error("❌ Failed to fetch movie:", data.message);
    }
  } catch (error) {
    console.error("💥 fetchMovie error:", error.message);
  }
};

// ✅ Moved outside fetchMovie:
export const searchMovies = (searchData) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');

    const response = await fetch(`${API_URL}/movies/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      },
      body: JSON.stringify(searchData)
    });

    const result = await response.json();
    console.log("🔍 Search API result:", result);

    if (result.success) {
      return result.data; // ✅ return only the array
    } else {
      alert("Search failed: " + result.message);
      return [];
    }
  } catch (err) {
    console.error("Search error:", err);
    return [];
  }
};