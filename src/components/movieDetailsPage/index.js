import {Component} from 'react'
import Header from '../navBar'

const apiKey = 'bdeb82385f84755468ab85488a72351c'

class MovieDetails extends Component {
  state = {
    movieData: [],
    genres: [],
    languages: [],
    ratingCount: 0,
    ratingAverage: 0,
    budget: 0,
  }

  componentDidMount() {
    this.searchMovies()
  }

  searchMovies = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const genre = []
      const lan = []
      data.genres.map(each => genre.push(each.name))
      data.spoken_languages.map(each => lan.push(each.english_name))
      this.setState({
        genres: genre,
        languages: lan,
        ratingCount: data.vote_count,
        ratingAverage: data.vote_average,
        budget: Number((data.budget * 64) / 10000000),
      })
      const updatedData = {
        backdropPath: `${data.backdrop_path}`,
        originalTitle: `${data.original_title}` || `${data.original_name}`,
        posterPath: `${data.poster_path}`,
        id: `${data.id}`,
      }
      this.setState({movieData: updatedData})
    }
  }

  render() {
    const {
      movieData,
      genres,
      languages,
      ratingCount,
      ratingAverage,
      budget,
    } = this.state
    console.log(genres, languages, ratingCount, ratingAverage, budget)
    const {backdropPath} = movieData
    return (
      <div className="bg">
        <Header />
        <h1>{movieData.backdropPath}</h1>
        <img
          src={`https://image.tmdb.org/t/p/original${backdropPath}`}
          alt="jaffa"
          className="image-logo"
        />
      </div>
    )
  }
}

export default MovieDetails
