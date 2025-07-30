import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import MovieContext from './context/MovieContext'
import Home from './components/Home'
import TopRated from './components/TopRated'
import Upcoming from './components/Upcoming'
import MovieDetails from './components/MovieDetails'

import './App.css'

class App extends Component {
  state = {showSearchResults: false}

  onClickSearchBtn = () => {
    this.setState({showSearchResults: true})
  }

  render() {
    const {showSearchResults} = this.state
    return (
      <MovieContext.Provider
        value={{
          showSearchResults,

          onClickSearch: this.onClickSearchBtn,
        }}
      >
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/top-rated" component={TopRated} />
          <Route exact path="/upcoming" component={Upcoming} />
          <Route exact path="/movie/:id" component={MovieDetails} />
        </Switch>
      </MovieContext.Provider>
    )
  }
}

export default App
