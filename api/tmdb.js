import axios from 'axios';
const API_ACCESS_TOKEN = process.env.EXPO_PUBLIC_TMDB_API_ACCESS_TOKEN;
 


const apiClient = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_ACCESS_TOKEN}`
  }
});

// Base URL for all movie posters
export const getPosterUrl = (path) => `https://image.tmdb.org/t/p/w500${path}`;
// Base URL for backdrop images
export const getBackdropUrl = (path) => `https://image.tmdb.org/t/p/w1280${path}`;

// API Endpoints
export const getNowPlayingMovies = () => {
  return apiClient.get('/movie/now_playing');
};

export const getPopularMovies = () => {
  return apiClient.get('/movie/popular');
};

export const getTopRatedMovies = () => {
  return apiClient.get('/movie/top_rated');
};

export const getMovieDetails = (movieId) => {
  return apiClient.get(`/movie/${movieId}`);
};

 
export const searchMovies = (query) => {
  return apiClient.get('/search/movie', {
    params: {
      query: query,
    },
  });
};