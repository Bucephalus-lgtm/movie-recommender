import React, { Fragment, useState, useEffect } from 'react';

function App() {
  const [movie, setMovie] = useState('');
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  useEffect(() => {
    fetch('https://celebimageclassifier.herokuapp.com/').then(res => res.json())
      .then(data => {
        console.log(data);
      })
  }, []);

  const handleChange = (event) => {
    setMovie(event.target.value);
  }

  const clickSubmit = (event) => {
    event.preventDefault();
    fetch(`https://celebimageclassifier.herokuapp.com/recommend?movie=${movie}`)
      .then(res => res.json())
      .then(data => {
        setRecommendedMovies(data.recommended_movies)
        console.log(data);
      }).catch(err => {
        console.error(err);
      });
  }

  return (
    <Fragment>

      <div className="container">
        <nav className="navbar navbar-light bg-light container-fluid">
          <h3><a style={{ color: 'rgb(255, 0, 149)' }} className="nav-link" href="/">
            Movie Recommendation System
            </a></h3>
        </nav>

        <div className="card mb-3" style={{ width: '650px' }}>
          <div className="row no-gutters">
            <div className="col-md-4">
              <img src="/profile.jpeg" className="card-img" alt="logo" />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">Bhargab Nath</h5>
                <p className="card-text">Hii, there! I'm an CSE undergraduate student studying in NIT Silchar!</p>
                <a href="https://www.linkedin.com/in/bhargab-nath-b14393187/" className="btn btn-primary" target="_blank">LinkedIn</a>
              </div>
            </div>
          </div>
        </div>

        <div className="jumbotron">
          <div className="shadow p-3 mb-5 bg-white rounded">
            {/* <h1 style={{ color: 'rgb(255, 0, 149)' }}>Welcome to Bhargab's Movie Recommendation System</h1> */}
            <h3 style={{ color: 'rgb(255, 0, 149)' }}>Enter a Hollywood movie you like to get recommendations.</h3>
          </div>


          <form onSubmit={clickSubmit}>
            <input
              type="text"
              name="movie"
              value={movie}
              onChange={handleChange}
              className='form-control mb-2'
              placeholder='e.g. Avatar'
            />
            <button className='btn btn-info mb-2' type="submit">Search</button>
          </form>

        </div>

        {recommendedMovies.length > 0 && recommendedMovies.map(recom_movie => (
          <table class="table table-success">
            <tbody>
              <tr>
                <td>{recom_movie}</td>
              </tr>
            </tbody>
          </table>
        ))
        }

      </div>

    </Fragment>
  );
}

export default App;