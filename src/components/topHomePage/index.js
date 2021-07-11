import {Component} from 'react'
import './index.css'

class TopHome extends Component {
  render() {
    const {dataList} = this.props
    const {backdropPath, id, originalTitle, overview} = dataList
    return (
      <div
        key={id}
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${backdropPath})`,
        }}
        className="container-top"
      >
        <div className="content-cont">
          <h1>{originalTitle}</h1>
          <p>{overview}</p>
          <button id={id} type="button" className="button-container">
            Play Now
          </button>
        </div>
      </div>
    )
  }
}

export default TopHome
