import React, { useState } from 'react';
import { searchMovies } from '../actions/movieActions';
import { Card, Row, Col, Form, Button, Container } from 'react-bootstrap';

const Search = () => {
  const [title, setTitle] = useState('');
  const [actorName, setActorName] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
  
    const searchData = {};
    if (title.trim()) searchData.title = title;
    if (actorName.trim()) searchData.actorName = actorName;
  
    const response = await searchMovies(searchData);
    console.log("🔍 Search result:", response);
    
    if (!Array.isArray(response)) {
        alert("Invalid search response!");
        return;
    }
    
    if (response.length === 0) {
        alert("No results found. Try searching for a known movie title or actor.");
    }
    setResults(response);
};  

  return (
    <Container className="p-4">
      <h2 className="mb-4">Search Movies</h2>

      <Form onSubmit={handleSearch}>
        <Form.Group className="mb-3">
          <Form.Label>Movie Title</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter full or partial movie title"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Actor Name</Form.Label>
          <Form.Control
            type="text"
            value={actorName}
            onChange={(e) => setActorName(e.target.value)}
            placeholder="Enter full or partial actor name"
          />
        </Form.Group>

        <Button type="submit" variant="primary">
          Search
        </Button>
      </Form>

      <hr />

      {Array.isArray(results) && results.length > 0 ? (
        <Row xs={1} md={2} lg={3} className="g-4 mt-2">
          {results.map((movie, idx) => (
            <Col key={idx}>
              <Card className="bg-dark text-light h-100">
                <Card.Img
                  variant="top"
                  src={movie.imageUrl || 'https://via.placeholder.com/300x400?text=No+Image'}
                  alt={movie.title}
                />
                <Card.Body>
                  <Card.Title>{movie.title}</Card.Title>
                  <Card.Text>
                    <strong>Genre:</strong> {movie.genre} <br />
                    <strong>Release:</strong> {movie.releaseDate}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <p className="text-light mt-3">{results.length === 0 ? 'No results found yet.' : null}</p>
      )}
    </Container>
  );
};

export default Search;