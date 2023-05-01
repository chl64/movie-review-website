import './App.css';
import api from './api/axiosConfig';
import {useState, useEffect} from 'react';
import Layout from './components/Layout';
import {Routes, Route} from 'react-router-dom';
import Home from './components/home/Home';
import Header from './components/header/Header';
import Trailer from './components/trailer/Trailer';
import Reviews from './components/reviews/Reviews';
import NotFound from './components/notFound/NotFound';

// Write code to call an endpoint that will return an array of movie data.

/**
 * WARNING:
 * Upon the first render, the `movies` props are passed down the tree BEFORE the async API called has returned.
 * So, what's being passed is an uninitilaized value, over which you cannot map().
 * As a result, the app crashes if the `Hero` component directy calls `map()` on it.
 * 
 * SOLUTION:
 * 1. Initialize `movies` to an emply array.
 * 2. Or, check for `movies` before calling `map()`.
 */

function App() {

  // `movies` stores an array of movie data returned from a call to the relevent API endpoint.
  // `setMovies` is a function that changes the state of the `movies` variable.
  const [movies, setMovies] = useState();

  const [movie, setMovie] = useState();
  // Notice that the state of `Reviews` is an array [...reviews, {body:rev.value}].
  const [reviews, setReviews] = useState([]);

  // When the state of the variable (tracked by React through the useState hook) is changed,
  // the component is re-rendered by React.
  // Hence, the `App` component will be re-rendered when the state of `movies` changes.


  // A function that handles a HTTP GET request to an endpoint that returns an array of movie data.
  // Once the movie data is successfully returned, this code that changes the `movies` array is executed.

  // async and await effectively ensure that the UI is not blocked by potentially long-running operations
  // keep the UI thread responsive to the user.
  const getMovies = async () => {
    try {
      const response = await api.get("api/v1/movies");
      console.log(response.data);
      setMovies(response.data);
    } catch(err) {
      console.log(err);
    }
  }

  // Another function that makes a GET request for data pertaining to a single movie.
  const getMovieData = async (movieId) => {
    try {
        const response = await api.get(`/api/v1/movies/${movieId}`);
        const singleMovie = response.data;
        setMovie(singleMovie);
        // Extract the `reviews` array from the movie data and track the state of `reviews`.
        console.log("getMovieData");
        console.log(singleMovie);
        console.log(singleMovie.reviewIds);
        setReviews(singleMovie.reviewIds);
    } catch (error) {
      console.error(error);
    }
    console.log("getMovieData ends.");
  }

  // `useEffect` hook makes `getMovies` function execute when the `App` component first loads.
  // Log the result returned from the call to the relevent endpoint to the browser console window.
  useEffect(() => {
    // Learn: Find out why `useEffect` is called twice when `App` first loads,
    // then once every time the application is re-complied.
    console.log("useEffect calls getMovies.");
    getMovies();
    console.log("useEffect has getMovies returning.");
  }, [])

  return (
    // JSX.
    // Establish route mappings for the components.
    <div className="App">
      <Header/>
      <Routes>
        {/* A child `Route` component that points to the `Home` component
            will be a child of the parent `Route` component that points to the `Layout` component.

            So, the `Layout` component referenced through the `Outlet` element in the Layout.js file
            denotes the components pointed to by the child `Route` component references 
            that will include within the parent root element here.
          */}
        <Route path="/" element={<Layout/>}>
          <Route path="/" element={<Home movies={movies} />} />
          {/* Let "react-router-dom" know about the `ytTrailerId` parameter.*/}
          <Route path="/Trailer/:ytTrailerId" element={<Trailer/>} />
          <Route path="Reviews/:movieId" 
            element={<Reviews getMovieData={getMovieData} movie={movie} reviews={reviews} setReviews={setReviews}/>} />
          <Route path="*" element={<NotFound/>} />  
        </Route>
      </Routes>
    </div>
  );
}

export default App;
