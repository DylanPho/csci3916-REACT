import React, { useState } from 'react';
import { searchMovies } from '../actions/movieActions';
import { Card, Row, Col, Form, Button, Container } from 'react-bootstrap';

const Search = () => {
  const [title, setTitle] = useState('');
  const [actorName, setActorName] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();

    const data = {};
    if (title.trim()) data.title = title;
    if (actorName.trim()) data.actorName = actorName;

    const movies = await searchMovies(data);
    setResults(movies);
  };

  return (
    <Container className="p-4">
      <h2 className="mb-4">Search Movies</h2>
      <Form onSubmit={handleSearch}>
        <Form.Group>
          <Form.Label>Movie Title</Form.Label>
          <Form.Control type="text" value={title} onChange={e => setTitle(e.target.value)} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Actor Name</Form.Label>
          <Form.Control type="text" value={actorName} onChange={e => setActorName(e.target.value)} />
        </Form.Group>
        <Button type="submit" className="mt-2">Search</Button>
      </Form>

      <hr />

      <Row xs={1} md={2} lg={3} className="g-4 mt-3">
        {results.map((movie, idx) => (
          <Col key={idx}>
            <Card className="bg-dark text-light h-100">
              <Card.Img variant="top" src={movie.imageUrl} />
              <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>
                  <b>Genre:</b> {movie.genre}<br />
                  <b>Year:</b> {movie.releaseDate}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Search;