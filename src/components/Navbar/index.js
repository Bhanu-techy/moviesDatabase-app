import {Component} from 'react'
import {Link} from 'react-router-dom'
import {BiMoviePlay} from 'react-icons/bi'
import {CiSearch} from 'react-icons/ci'
import MovieContext from '../../context/MovieContext'
import MoviesList from '../MoviesList'
import './index.css'

class Navbar extends Component {
  static contextType = MovieContext

  state = {searchData: [], searchInput: ''}

  getDetails = async () => {
    const {searchInput} = this.state

    const api = '67b388df313f3bd63b0298bd44d3a106'
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${api}&language=en-US&query=${searchInput}&page=1`
    const headers = {
      method: 'GET',
    }

    const response = await fetch(url, headers)
    const data = await response.json()
    console.log(data)
    this.setState({searchData: data.results})
  }

  onClickSearchBtn = () => {
    const {searchInput} = this.state

    const {onClickSearch} = this.context

    if (searchInput !== '') {
      onClickSearch()
      this.getDetails()
    }
  }

  onChangeSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  renderSearchResults = () => {
    const {searchData} = this.state
    return (
      <div className="home-container">
        <h1>Search Results</h1>
        <ul className="movie-list">
          {searchData.map(each => (
            <MoviesList detail={each} key={each.id} />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    return (
      <MovieContext.Consumer>
        {value => {
          const {showSearchResults} = value

          return (
            <>
              <nav>
                <div className="navsm-view">
                  <Link to="/" className="icon-div">
                    <h1>movieDB</h1>
                    <BiMoviePlay size={35} />
                  </Link>
                  <div className="searchbarsm">
                    <input
                      type="search"
                      className="inputsearch"
                      onChange={this.onChangeSearch}
                    />
                    <button
                      type="button"
                      className="searchbtn"
                      onClick={this.onClickSearchBtn}
                    >
                      <CiSearch size={20} />
                    </button>
                  </div>
                </div>

                <div className="nav-items">
                  <div className="searchbar">
                    <input
                      type="search"
                      className="inputsearch"
                      onChange={this.onChangeSearch}
                    />
                    <button
                      type="button"
                      className="searchbtn"
                      onClick={this.onClickSearchBtn}
                    >
                      <CiSearch size={20} />
                    </button>
                  </div>
                  <Link to="/top-rated">
                    <button type="button" className="navbtn">
                      Top rated
                    </button>
                  </Link>
                  <Link to="upcoming">
                    <button type="button" className="navbtn">
                      Upcoming
                    </button>
                  </Link>
                </div>
              </nav>
              {showSearchResults ? this.renderSearchResults() : null}
            </>
          )
        }}
      </MovieContext.Consumer>
    )
  }
}

export default Navbar
