import {Component} from 'react'
import Loader from 'react-loader-spinner'
import MovieContext from '../../context/MovieContext'
import Navbar from '../Navbar'
import MoviesList from '../MoviesList'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {details: [], homeState: apiStatusConstants.initial}

  componentDidMount() {
    this.getDetails()
  }

  getDetails = async () => {
    this.setState({homeState: apiStatusConstants.inProgress})
    const api = '67b388df313f3bd63b0298bd44d3a106'

    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${api}&language=en-US&page=1`
    const headers = {
      method: 'GET',
    }
    const response = await fetch(url, headers)
    const data = await response.json()
    if (response.ok) {
      this.setState({
        details: data.results,
        homeState: apiStatusConstants.success,
      })
    } else {
      this.setState({homeState: apiStatusConstants.failure})
    }
  }

  renderLoader = () => (
    <div className="loader-container">
      <Loader type="Oval" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderHomeSuccessView = () => {
    const {details} = this.state

    return (
      <div className="home-container">
        <h1 className="heading">Popular</h1>
        <ul className="movie-list">
          {details.map(each => (
            <MoviesList detail={each} key={each.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="failure-container">
      <h1>Result Failed</h1>
      <p>We cound not found the page you have requested, please try again</p>
      <button type="button" onClick={this.getDetails}>
        Try again
      </button>
    </div>
  )

  renderResultView = () => {
    const {homeState} = this.state

    switch (homeState) {
      case apiStatusConstants.success:
        return this.renderHomeSuccessView()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.failure:
        return this.renderFailureView()
    }
  }

  render() {
    return (
      <MovieContext.Consumer>
        {value => {
          const {showSearchResults} = value

          return (
            <>
              <Navbar />
              {showSearchResults ? null : this.renderResultView()}
            </>
          )
        }}
      </MovieContext.Consumer>
    )
  }
}

export default Home
