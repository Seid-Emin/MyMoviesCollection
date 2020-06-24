require('dotenv').config();

const TheMovieDB = {
  API_V3: 'https://api.themoviedb.org/3',
  API_MultiSearch: 'https://api.themoviedb.org/3/search',
  API_Img: 'https://image.tmdb.org/t/p/w500/',
  API_KEY: process.env.REACT_APP_THE_MOVIE_DB_API_KEY
}

export default TheMovieDB;