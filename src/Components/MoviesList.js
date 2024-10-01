import React, { useEffect, useState } from "react";
import "../Styles/MoviesList.css"; 

const MoviesList = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/movie/popular?api_key=b1a2d20798da120bb2cc9056c185ec0b"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchMovies();
  }, []);

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  if (!movies.length) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="container">
      <h1 className="title">Popular Movies</h1>

      
      <input
        type="text"
        placeholder="Search for a movie..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      <ul className="movies-list">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <li key={movie.id} className="movie-item">
              <h2 className="movie-title">{movie.title}</h2>
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
                className="movie-poster"
              />
              <p className="movie-overview">{movie.overview}</p>
              <p className="movie-details">
                <strong>Release Date:</strong> {movie.release_date}
              </p>
              <p className="movie-details">
                <strong>Rating:</strong> {movie.vote_average}
              </p>
            </li>
          ))
        ) : (
          <p className="no-movies">No movies found</p>
        )}
      </ul>
    </div>
  );
};

export default MoviesList;
