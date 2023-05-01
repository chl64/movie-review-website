import './Hero.css';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const Hero = ({movies}) => {
  console.log("Inside Hero component.");
  console.log(movies);

  // Navigate the review page of the movie of interest, when the button is clicked.
  const navigate = useNavigate();
  function navigateToReviews(movieId)
  {
      navigate(`/Reviews/${movieId}`);
  }

  return (
    <div className='movie-carousel-container'>
        <Carousel>
            {
                // Map each item in the `movies` array to an item displayed in the carousel.
                // NOTICE: `movies` is followed by `?` so that uninitialized array won't get mapped, clashing the app.
                movies?.map((movie) => {
                    return (
                        // `Paper` encapsulates each movie item displayed in the carousel.
                        <Paper key={movie.imdbId}>
                            {/* Display title and poster for each movie. */}
                            <div className='movie-card-container'>
                                {/* In order to dynamically reference the background image URL for each carousel card,
                                    custom CSS variable `--img` is included inline within `div`.
                                    Note that `backdrops` for each movie is an array containing paths of different backdrop images.
                                 */}
                                <div className='movie-card' style={{"--img": `url(${movie.backdrops[0]})`}}>
                                    <div className="movie-detail">
                                        <div className="movie-poster">
                                            <img src={movie.poster} alt="" />
                                        </div>
                                        <div className="movie-title">
                                            <h4>{movie.title}</h4>
                                        </div>
                                        <div className="movie-buttons-container">
                                            {/* `Link` enables the `Trailer` component to be invoked,
                                                and the appropriate parameter (YouTube ID) passed to `Trailer` from `Hero`, 
                                                when the play button is clicked.
                                                YouTube ID is the last 11 characters in the URL.
                                             */}
                                            <Link to={`/Trailer/${movie.trailerLink.substring(movie.trailerLink.length - 11)}`}>
                                            <div className="play-button-icon-container">
                                                <FontAwesomeIcon className='play-button-icon'
                                                    icon = {faCirclePlay}
                                                />
                                            </div>
                                            </Link>
                                            <div className="movie-review-button-container">
                                                <Button variant="info" onClick={() => navigateToReviews(movie.imdbId)} >Reviews</Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Paper>
                    )
                })
            }
        </Carousel>
    </div>
  );
}

export default Hero