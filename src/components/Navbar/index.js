import {Component} from 'react'
import {Link} from 'react-router-dom'
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

    const response = await fetch(url)
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
                <div className="navsm-view icon-div">
                  <h1>movieDB</h1>
                </div>
                <div className="searchbar">
                  <input
                    type="text"
                    className="inputsearch"
                    onChange={this.onChangeSearch}
                  />
                  <button
                    type="button"
                    className="searchbtn"
                    onClick={this.onClickSearchBtn}
                  >
                    Search
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
