import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, setMovie } from "../actions/movieActions";
import { Link } from 'react-router-dom';
import { Image, Nav, Carousel } from 'react-bootstrap';
import { BsStarFill } from 'react-icons/bs';

function MovieList() {
  const dispatch = useDispatch();
  const movies = useSelector(state => state.movie.movies);

  const memoizedMovies = useMemo(() => movies, [movies]);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  const handleSelect = (selectedIndex) => {
    dispatch(setMovie(memoizedMovies[selectedIndex]));
  };

  const handleClick = (movie) => {
    dispatch(setMovie(movie));
  };

  // Empty state
  if (!memoizedMovies || memoizedMovies.length === 0) {
    console.warn("⚠️ No movies to show:", memoizedMovies);
    return <div style={{ padding: '2rem', color: 'white' }}>No movies available. Please check your backend or ensure reviews exist.</div>;
  }

  return (
    <Carousel onSelect={handleSelect} className="bg-dark text-light p-4 rounded">
      {memoizedMovies.map((movie) => (
        <Carousel.Item key={movie._id}>
          <Nav.Link
            as={Link}
            to={`/movie/${movie._id}`}
            onClick={() => handleClick(movie)}
          >
            <Image className="image" src={movie.imageUrl} thumbnail />
          </Nav.Link>
          <Carousel.Caption>
            <h3>{movie.title}</h3>
            <BsStarFill /> {movie.avgRating?.toFixed(1) || "N/A"} &nbsp;&nbsp; {movie.releaseDate}
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default MovieList;