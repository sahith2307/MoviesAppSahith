import {Component} from 'react'
import PopularMovies from '../popular'
import Header from '../navBar'

const apiKey = 'bdeb82385f84755468ab85488a72351c'
class SearchBar extends Component {
  state = {searchMoviesData: [], number: 1, lengthData: 1, searchInput: ''}

  componentDidMount() {
    const {number, searchInput} = this.state
    this.searchMovies(apiKey, number, searchInput)
  }

  onIncrementCount = () => {
    const {number, searchInput, lengthData} = this.state
    if (number > lengthData) {
      this.setState({number: 20})
      this.searchMovies(apiKey, 20, searchInput)
    } else {
      this.setState(prevState => ({number: prevState.number + 1}))
      this.searchMovies(apiKey, number + 1, searchInput)
    }
  }

  onDecrementCount = () => {
    const {number, searchInput} = this.state
    if (number <= 1) {
      this.setState({number: 1})
      this.searchMovies(apiKey, 1, searchInput)
    } else {
      this.setState(prevState => ({number: prevState.number - 1}))
      this.searchMovies(apiKey, number - 1, searchInput)
    }
  }

  searchMovies = async (key, number, aim) => {
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
      this.setState({
        searchMoviesData: updatedData,
        lengthData: data.results.length,
      })
    }
  }

  clickImage = id => {
    this.setState({genreId: id}, this.imageDetails)
  }

  imageDetails = () => {
    const {genreId} = this.state
    console.log(genreId)
  }

  updateInput = value => {
    const {number} = this.state
    this.setState({searchInput: value}, this.searchMovies)
    this.searchMovies(apiKey, number, value)
  }

  render() {
    const {searchMoviesData, number, lengthData} = this.state
    const indicator1 = '<'
    const indicator2 = '>'
    return (
      <div className="cont">
        <div className="container">
          <Header updateInput={this.updateInput} />
          <PopularMovies
            dataList={searchMoviesData}
            clickImage={this.clickImage}
          />
          <div className="buttons-cont">
            <button
              type="button"
              className="button-box"
              onClick={this.onDecrementCount}
            >
              {indicator1}
            </button>
            <p className="pages">{`${number} of ${lengthData}`}</p>
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
      </div>
    )
  }
}

export default SearchBar
