import {Component} from 'react'
import Loader from 'react-loader-spinner'
import MovieContext from '../../context/MovieContext'
import Navbar from '../Navbar'
import MoviesList from '../MoviesList'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class TopRated extends Component {
  state = {details: [], state: apiStatusConstants.initial}

  componentDidMount() {
    this.getDetails()
  }

  getDetails = async () => {
    this.setState({state: apiStatusConstants.inProgress})

    const api = '67b388df313f3bd63b0298bd44d3a106'
    const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${api}&language=en-US&page=1`
    const response = await fetch(url)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      this.setState({details: data.results, state: apiStatusConstants.success})
    } else {
      this.setState({state: apiStatusConstants.failure})
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
    const {state} = this.state

    switch (state) {
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

export default TopRated
