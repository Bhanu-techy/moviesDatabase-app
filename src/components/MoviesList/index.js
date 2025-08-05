import {Link} from 'react-router-dom'
import './index.css'

const MoviesList = props => {
  const {detail} = props
  const {poster_path, title, vote_average, id} = detail

  const url = `https://image.tmdb.org/t/p/w500${poster_path}`

  return (
    <li className="movie-card">
      <img src={url} alt={poster_path} className="poster" />
      <p className="title">{title}</p>
      <div className="details">
        <Link to={`/movie/${id}`}>
          <button type="button" className="view-detail-button">
            View Details
          </button>
        </Link>
        <p className="rating-para">rating: {vote_average}</p>
      </div>
    </li>
  )
}

export default MoviesList
