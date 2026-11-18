import { useState } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import MovieList from '../../components/MovieList/MovieList';
import './HomePage.css';

function HomePage() {
  const [films, setFilms] = useState(undefined);

  return (
    <main className="home-page">
      <div className="container home-page__inner">
        <SearchBar setFilms={setFilms} />
        <section className="home-page__section">
          <h2 className="home-page__section-title">Результат поиска</h2>
          <MovieList films={films} />
        </section>
      </div>
    </main>
  );
}

export default HomePage;