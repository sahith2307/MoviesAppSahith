import {Component} from 'react'
import PopularMovies from '../popular'
import Header from '../navBar'

const apiKey = 'bdeb82385f84755468ab85488a72351c'
class SearchBar extends Component {
  state = {searchMovies: [], number: 1, searchInput: ''}

  componentDidMount() {
    const {number, searchMovies} = this.state
    this.popularMovies(apiKey, number, searchMovies)
  }

  onIncrementCount = () => {
    const {number, searchInput} = this.state
    if (number >= 20) {
      this.setState({number: 20})
      this.popularMovies(apiKey, 20)
    } else {
      this.setState(prevState => ({number: prevState.number + 1}))
      this.popularMovies(apiKey, number + 1, searchInput)
    }
  }

  onDecrementCount = () => {
    const {number, searchInput} = this.state
    if (number <= 1) {
      this.setState({number: 1})
      this.popularMovies(apiKey, 1)
    } else {
      this.setState(prevState => ({number: prevState.number - 1}))
      this.popularMovies(apiKey, number - 1, searchInput)
    }
  }

  popularMovies = async (key, number, aim) => {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=${aim}&page=${number}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.results.map(result => ({
        backdropPath: result.backdrop_path,
        originalTitle: result.original_title || result.original_name,
        posterPath: result.poster_path,
        id: result.id,
      }))
      this.setState({searchMovies: updatedData})
    }
  }

  render() {
    const {searchMovies, number} = this.state
    const indicator1 = '<'
    const indicator2 = '>'
    return (
      <div className="container">
        <Header />
        <PopularMovies dataList={searchMovies} />
        <div className="buttons-cont">
          <button
            type="button"
            className="button-box"
            onClick={this.onDecrementCount}
          >
            {indicator1}
          </button>
          <p className="pages">{`${number} of 20`}</p>
          <button
            type="button"
            className="button-box"
            onClick={this.onIncrementCount}
          >
            {indicator2}
          </button>
        </div>
        <div className="social-cont">
          <img
            alt="social-media"
            src="https://res.cloudinary.com/sahith/image/upload/v1625413241/Group_7395_mruqti.png"
          />
          <p className="pages">Contact Us</p>
        </div>
      </div>
    )
  }
}
export default SearchBar
