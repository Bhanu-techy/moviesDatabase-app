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
  state = {details: [], state: apiStatusConstants.initial, pageNo : 1}

  componentDidMount() {
    this.getDetails()
  }

  getDetails = async () => {
    const {pageNo} = this.state
    this.setState({state: apiStatusConstants.inProgress})

    const api = '67b388df313f3bd63b0298bd44d3a106'
    const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${api}&language=en-US&page=${pageNo}}`
    const response = await fetch(url)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      this.setState({details: data.results, state: apiStatusConstants.success})
    } else {
      this.setState({state: apiStatusConstants.failure})
    }
  }

  onClickNxtBtn = () => {
    this.setState(
      prevState => ({pageNo: prevState.pageNo + 1}),
      this.getDetails,
    )
  }

  onClickPrevBtn = () => {
    const {pageNo} = this.state
    if (pageNo > 1) {
      this.setState(
        prevState => ({pageNo: prevState.pageNo - 1}),
        this.getDetails,
      )
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
        <h1 className="heading">Top Rated</h1>
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
    const {pageNo} = this.state
    return (
      <MovieContext.Consumer>
        {value => {
          const {showSearchResults} = value

          return (
            <>
              <Navbar />
              <div className="home-container">
              {showSearchResults ? null : this.renderResultView()}
              <div className="buttons-div">
                <button type="button" onClick={this.onClickPrevBtn}>
                  Prev
                </button>
                <p>{pageNo}</p>
                <button type="button" onClick={this.onClickNxtBtn}>
                  Next
                </button>
              </div>
              </div>
            </>
          )
        }}
      </MovieContext.Consumer>
    )
  }
}

export default TopRated
