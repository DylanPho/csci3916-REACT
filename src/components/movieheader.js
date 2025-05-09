import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from "../actions/authActions";

function MovieHeader() {
    const dispatch = useDispatch();
    const loggedIn = useSelector((state) => state.auth.loggedIn);
    const username = useSelector((state) => state.auth.username);
    const selectedMovie = useSelector((state) => state.movie.selectedMovie);
    
    const logout = () => {
        dispatch(logoutUser());
    };

    return (
        <div>
            <Navbar expand="lg" bg="dark" variant="dark">
                <Navbar.Brand as={NavLink} to="/">Movie App</Navbar.Brand> 
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Link as={NavLink} to="/search" disabled={!loggedIn}>
                      Search
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/movielist" disabled={!loggedIn}> 
                        Movie List
                    </Nav.Link>
                    <Nav.Link as={NavLink} to={'/movie/' + (selectedMovie? selectedMovie._id: '')} disabled={!loggedIn}>
                        Movie Detail
                    </Nav.Link>
                    {loggedIn ? (
                        <Nav.Link>
                            <span style={{ color: "white", marginRight: "10px" }}>
                                Welcome, {username}!
                            </span>
                            <span onClick={logout} style={{ cursor: "pointer", color: "red" }}>
                                Logout
                            </span>
                        </Nav.Link>
                    ) : (
                        <Nav.Link as={NavLink} to="/signin">Login</Nav.Link>
                    )}
                </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
}

export default MovieHeader;