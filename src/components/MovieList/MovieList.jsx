import MovieCard from '../MovieCard/MovieCard';
import './MovieList.css';

function MovieList({ films }) {
  if (!films) return null;

  if (films.Response === "False") {
    return <p className="movie-list__empty">{films.Error || "Фильмы не найдены"}</p>;
  }

  const list = films.Search;
  if (!list || list.length === 0) {
    return <p className="movie-list__empty">Фильмы не найдены</p>;
  }

  return (
    <ul className="movie-list">
      {list.map((film) => (
        <li key={film.imdbID}>
          <MovieCard film={film} />
        </li>
      ))}
    </ul>
  );
}

export default MovieList;