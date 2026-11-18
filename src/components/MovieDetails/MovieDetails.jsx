import { useEffect, useState } from 'react';
import LikeButton from '../LikeButton/LikeButton';
import RatingBadge from '../RatingBadge/RatingBadge';
import './MovieDetails.css';
import { Link, useParams } from 'react-router-dom';
import Loader from '../Loader/Loader';

function MovieDetails() {
  const [film, setFilm] = useState(undefined)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setIsError] = useState(null)

  const { id } = useParams()
  useEffect(() => {
    const load = async () => {
      try {
        setIsLoading(true)
        const res = await fetch(`https://www.omdbapi.com/?apikey=505480d7&i=${id}`)
        const data = await res.json()

        if (data.Response === "False") {
          throw new Error()
        }

        setFilm(data)
      } catch (error) {
        console.error(error)
        setIsError(error.message ?? "Что-то пошло не так")
      } finally {
        setIsLoading(false)
      }
    }
    load()
  }, [])
  if (isLoading) return <Loader />
  if (!isLoading && error) return <p>{error}</p>
  if (film)
    return (
      <article className="movie-details">
        <Link to={-1} type="button" className="movie-details__back">
          ← Ко всем фильмам
        </Link>

        <div className="movie-details__layout">
          <div className="movie-details__poster-col">
            <img
              className="movie-details__poster"
              src={film.Poster}
              alt={film.Title}
            />
          </div>

          <div className="movie-details__main">
            <div className="movie-details__heading">
              <div>
                <h1 className="movie-details__title">{film.Title}</h1>
                <p className="movie-details__meta">{film.Year} · {film.Rated} · {film.Runtime}</p>
              </div>
              <LikeButton />
            </div>

            <p className="movie-details__genre">{film.Genre}</p>

            <p className="movie-details__plot">{film.Plot}</p>

            <div className="movie-details__ratings">
              {film.Ratings.map((el, i) => (
                <RatingBadge rating={el} key={i}/>
              ))}

            </div>

            <dl className="movie-details__facts">
              <div className="movie-details__fact"><dt>Режиссёр</dt><dd>{film.Director}</dd></div>
              <div className="movie-details__fact"><dt>Сценарий</dt><dd>{film.Writer}</dd></div>
              <div className="movie-details__fact"><dt>В ролях</dt><dd>{film.Actors}</dd></div>
              <div className="movie-details__fact"><dt>Дата выхода</dt><dd>{film.Released}</dd></div>
              <div className="movie-details__fact"><dt>Язык</dt><dd>{film.Language}</dd></div>
              <div className="movie-details__fact"><dt>Страна</dt><dd>{film.Country}</dd></div>
              <div className="movie-details__fact"><dt>Награды</dt><dd>{film.Awards}</dd></div>
              <div className="movie-details__fact"><dt>Сборы</dt><dd>{film.BoxOffice}</dd></div>
            </dl>
          </div>
        </div>
      </article>
    );
}

export default MovieDetails;
