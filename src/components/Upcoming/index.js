import {Component} from 'react'
import Navbar from '../Navbar'
import MoviesList from '../MoviesList'

class Upcoming extends Component {
  state = {details: []}

  componentDidMount() {
    this.getDetails()
  }

  getDetails = async () => {
    const api = '67b388df313f3bd63b0298bd44d3a106'
    const url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${api}&language=en-US&page=1`
    const response = await fetch(url)
    const data = await response.json()
    console.log(data)
    this.setState({details: data.results})
  }

  render() {
    const {details} = this.state
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
        </div>
      </>
    )
  }
}

export default Upcoming
