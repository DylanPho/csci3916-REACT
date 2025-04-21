import React, { useEffect } from 'react';
import { fetchMovie } from '../actions/movieActions';
import { useDispatch, useSelector } from 'react-redux';
import { Card, ListGroup, ListGroupItem, Image } from 'react-bootstrap';
import { BsStarFill } from 'react-icons/bs';
import { useParams } from 'react-router-dom';

const MovieDetail = () => {
  const dispatch = useDispatch();
  const { movieId } = useParams(); // Get movieId from URL
  const selectedMovie = useSelector(state => state.movie.selectedMovie);
  const loading = useSelector(state => state.movie.loading);
  const error = useSelector(state => state.movie.error);

  useEffect(() => {
    if (movieId) {
      dispatch(fetchMovie(movieId));
    }
  }, [dispatch, movieId]);

  const DetailInfo = () => {
    if (loading) {
      return <div style={{ padding: '2rem', color: 'white' }}>Loading movie details...</div>;
    }

    if (error) {
      return <div style={{ padding: '2rem', color: 'red' }}>Error: {error}</div>;
    }

    if (!selectedMovie) {
      console.warn("⚠️ No movie selected or data not fetched.");
      return <div style={{ padding: '2rem', color: 'white' }}>No movie data available.</div>;
    }

    const { title, imageUrl, actors = [], avgRating = "N/A", reviews = [] } = selectedMovie;

    return (
      <Card className="bg-dark text-light p-4 rounded">
        <Card.Header><h4>Movie Detail</h4></Card.Header>

        <Card.Body>
          <Image className="image" src={imageUrl || 'https://via.placeholder.com/300x400?text=No+Image'} thumbnail />
        </Card.Body>

        <ListGroup>
          <ListGroupItem className="bg-dark text-light"><strong>Title:</strong> {title}</ListGroupItem>

          <ListGroupItem className="bg-dark text-light">
            <strong>Actors:</strong>
            {actors.length === 0 ? (
              <p>No actors listed.</p>
            ) : (
              actors.map((actor, i) => (
                <p key={i}><b>{actor.actorName}</b> as {actor.characterName}</p>
              ))
            )}
          </ListGroupItem>

          <ListGroupItem className="bg-dark text-light">
            <h5><BsStarFill /> {typeof avgRating === 'number' ? avgRating.toFixed(1) : avgRating}</h5>
          </ListGroupItem>
        </ListGroup>

        <Card.Body>
          <strong>Reviews:</strong>
          {reviews.length === 0 ? (
            <p>No reviews yet.</p>
          ) : (
            reviews.map((review, i) => (
              <p key={i}>
                <b>{review.username}</b>: {review.review} &nbsp;
                <BsStarFill /> {review.rating}
              </p>
            ))
          )}
        </Card.Body>
      </Card>
    );
  };

  return <DetailInfo />;
};

export default MovieDetail;