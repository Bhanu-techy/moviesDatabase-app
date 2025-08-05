import {Component} from 'react'

import MovieContext from '../../context/MovieContext'
import Navbar from '../Navbar'
import './index.css'

class MovieDetails extends Component {
  state = {movieDetails: {}, castDetails: {}}

  componentDidMount() {
    this.getMovieDetails()
    this.getCastDetails()
  }

  getMovieDetails = async () => {
    const {match} = this.props
    const {id} = match.params

    const apikey = '67b388df313f3bd63b0298bd44d3a106'
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apikey}&language=en-US`

    const response = await fetch(url)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      this.setState({movieDetails: data})
    }
  }

  getCastDetails = async () => {
    const {match} = this.props
    const {id} = match.params

    const apikey = '67b388df313f3bd63b0298bd44d3a106'
    const url = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apikey}&language=en-US`
    const response = await fetch(url)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      this.setState({castDetails: data})
    }
  }

  render() {
    const {movieDetails, castDetails} = this.state
    const {
      budget,
      poster_path,
      release_date,
      vote_average,
      title,
      overview,
      popularity,
      runtime,
      adult,
      genres = [],
    } = movieDetails

    const {cast = [], crew = []} = castDetails

    const isadult = adult ? 'YES' : 'NO'

    return (
      <MovieContext.Consumer>
        {value => {
          const {showSearchResults} = value

          return (
            <>
              <Navbar />
              {showSearchResults ? null : (
                <div className="movie-bg">
                  <div className="Movie-container">
                    <div className="poster-div">
                      <img
                        src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
                        alt={title}
                        className="movie-poster"
                      />
                    </div>
                    <div className="details-view">
                      <p className="poster-name">Title: {title}</p>
                      <p className="overview">Overview: {overview}</p>
                      <p>Genres</p>
                      <ul className="genre-list">
                        {genres.map(each => (
                          <li className="genre" key={each.id}>
                            {each.name}
                          </li>
                        ))}
                      </ul>
                      <p>Budget: {budget}</p>
                      <p>Release-date: {release_date}</p>
                      <p>Adult: {isadult}</p>
                      <p>Duration: {runtime} mins</p>
                      <p>Popularity: {popularity}</p>
                      <p>Vote-Avg: {vote_average}</p>
                    </div>
                  </div>
                  <div>
                    <h1 className="cast-head">Cast</h1>
                    <ul className="cast-list">
                      {cast.map(cast =>
                        cast.profile_path === null ? null : (
                          <li key={cast.id} className="cast-item">
                            <img
                              src={`https://image.tmdb.org/t/p/w500/${cast.profile_path}`}
                              className="cast-img"
                              alt={cast.name}
                            />
                            <p>{cast.character}</p>
                            <p>{cast.name}</p>
                          </li>
                        ),
                      )}
                    </ul>
                    <h1 className="cast-head">Crew</h1>
                    <ul className="cast-list">
                      {crew.map(each =>
                        each.profile_path === null ? null : (
                          <li key={each.id} className="cast-item">
                            <img
                              src={`https://image.tmdb.org/t/p/w500/${each.profile_path}`}
                              className="cast-img"
                              alt={each.name}
                            />
                            <p className="job">{each.job}</p>
                            <p>{each.original_name}</p>
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                </div>
              )}
            </>
          )
        }}
      </MovieContext.Consumer>
    )
  }
}

export default MovieDetails
