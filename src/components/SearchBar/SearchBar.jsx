import { useEffect, useState } from 'react';
import './SearchBar.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Loader from '../Loader/Loader';

function SearchBar({ setFilms }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const queryParam = searchParams.get("t") || "";

  const [query, setQuery] = useState(queryParam);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim().length === 0) return;
    navigate('/?t=' + encodeURIComponent(query.trim()));
  };

  useEffect(() => {
    setQuery(queryParam);

    if (!queryParam) {
      setFilms(undefined);
      setError(null);
      setIsLoading(false);
      return;
    }

    const controller = new AbortController();

    const load = async () => {
      setError(null);
      setIsLoading(true);
      setFilms(undefined);

      try {
        const res = await fetch(
          'https://www.omdbapi.com/?apikey=505480d7&s=' + encodeURIComponent(queryParam),
          { signal: controller.signal }
        );
        const data = await res.json();

        if (data.Response === "False") {
          throw new Error(data.Error || "Ничего не найдено");
        }

        setFilms(data);
      } catch (err) {
        if (err.name === "AbortError") return;
        console.error(err);
        setError(err.message ?? "Что-то пошло не так");
        setFilms(undefined);
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    };

    load();
    return () => controller.abort();
  }, [queryParam, setFilms]);

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <span className="search-bar__eyebrow">Найти фильм или сериал</span>
      <div className="search-bar__row">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          name="query"
          className="search-bar__input"
          placeholder="Например: Joker, Interstellar, Dune…"
          disabled={isLoading}
        />
        <button
          type="submit"
          className="search-bar__button"
          disabled={isLoading || query.trim().length === 0}
        >
          {isLoading ? "Ищем…" : "Искать"}
        </button>
      </div>

      {isLoading && <Loader />}
      {!isLoading && error && <p className="search-bar__error">{error}</p>}
    </form>
  );
}

export default SearchBar;