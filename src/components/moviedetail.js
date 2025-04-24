import React, { useEffect, useState } from 'react';
import { fetchMovie } from '../actions/movieActions';
import { useDispatch, useSelector } from 'react-redux';
import { Card, ListGroup, ListGroupItem, Image, Form, Button } from 'react-bootstrap';
import { BsStarFill } from 'react-icons/bs';
import { useParams } from 'react-router-dom';

const MovieDetail = () => {
  const dispatch = useDispatch();
  const { movieId } = useParams();
  const selectedMovie = useSelector(state => state.movie.selectedMovie);

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  useEffect(() => {
    dispatch(fetchMovie(movieId));
  }, [dispatch, movieId]);

  const submitReview = async (e) => {
    e.preventDefault(); // ✅ Prevent full page reload

    const token = localStorage.getItem("token");
    const response = await fetch(`${process.env.REACT_APP_API_URL}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify({
        movieId: movieId,
        rating: Number(rating),
        review: review
        // username will be extracted from JWT by backend
      })
    });

    const data = await response.json();
    if (data.success) {
      alert("Review submitted!");
      dispatch(fetchMovie(movieId)); // refresh movie details
      setRating(0);
      setReview("");
    } else {
      alert("Failed to submit review: " + data.message);
    }
  };

  const DetailInfo = () => {
    if (!selectedMovie) return <div>Loading...</div>;

    return (
      <Card className="bg-dark text-light p-4 rounded">
        <Card.Header><h4>Movie Detail</h4></Card.Header>
        <Card.Body>
          <Image src={selectedMovie.imageUrl} thumbnail />
        </Card.Body>

        <ListGroup>
          <ListGroupItem className="bg-dark text-light"><strong>{selectedMovie.title}</strong></ListGroupItem>
          <ListGroupItem className="bg-dark text-light">
            {selectedMovie.actors.map((actor, i) => (
              <p key={i}><b>{actor.actorName}</b> as {actor.characterName}</p>
            ))}
          </ListGroupItem>
          <ListGroupItem className="bg-dark text-light">
            <h5><BsStarFill /> {selectedMovie.avgRating?.toFixed(1) || "N/A"}</h5>
          </ListGroupItem>
        </ListGroup>

        <Card.Body>
          <strong>Reviews:</strong>
          {selectedMovie.reviews.length === 0 ? (
            <p>No reviews yet.</p>
          ) : (
            selectedMovie.reviews.map((r, i) => (
              <p key={i}>
                <b>{r.username}</b>: {r.review} &nbsp;
                <BsStarFill /> {r.rating}
              </p>
            ))
          )}
        </Card.Body>

        <Card.Body>
          <Form onSubmit={submitReview}>
            <Form.Group>
              <Form.Label>Rating (0–5)</Form.Label>
              <Form.Control
                type="number"
                min="0"
                max="5"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Review</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={review}
                onChange={(e) => setReview(e.target.value)}
                required
              />
            </Form.Group>
            <Button type="submit" variant="primary" className="mt-2">
              Submit Review
            </Button>
          </Form>
        </Card.Body>
      </Card>
    );
  };

  return <DetailInfo />;
};

export default MovieDetail;