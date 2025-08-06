import {Component} from 'react'
import Navbar from '../Navbar'
import MoviesList from '../MoviesList'

class Upcoming extends Component {
  state = {details: [], pageNo: 1}

  componentDidMount() {
    this.getDetails()
  }

  getDetails = async () => {
    const {pageNo} = this.state
    const api = '67b388df313f3bd63b0298bd44d3a106'
    const url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${api}&language=en-US&page=${pageNo}`
    const response = await fetch(url)
    const data = await response.json()
    console.log(data)
    this.setState({details: data.results})
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

  render() {
    const {details, pageNo} = this.state
    return (
      <>
        <Navbar />
        <div className="home-container">
          <h1>Upcoming</h1>
          <ul className="movie-list">
            {details.map(each => (
              <MoviesList detail={each} key={each.id} />
            ))}
          </ul>
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
  }
}

export default Upcoming
