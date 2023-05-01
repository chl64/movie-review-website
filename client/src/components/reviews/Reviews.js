
import {useEffect, useRef} from 'react';
import api from '../../api/axiosConfig';
import {useParams} from 'react-router-dom';
import {Container, Row, Col} from 'react-bootstrap';
import ReviewForm from '../reviewForm/ReviewForm';

import React from 'react'

const Reviews = ({getMovieData, movie, reviews, setReviews}) => {

    // `useRef` hook references the text area control with the review form.
    const revText = useRef();
    // `useParams` hook extracts the movie IMDB ID parameter from the URL.
    let params = useParams();
    const movieId = params.movieId;

    // The `getMovieData` method is passed in as a prop to this `Reviews` component
    // in order to retrieve the data of the movie to be reviewed.
    // The retrieval is done when `Reviews` component first loads.
    useEffect(() => {
        getMovieData(movieId);
    }, []);

    const addReview = async (e) => {
        e.preventDefault();

        const rev = revText.current;
        console.log(rev.value);
        console.log(reviews);

        try {
            const response = await api.post("/api/v1/reviews", {
                reviewBody: rev.value, 
                imdbId: movieId
            });

            // Update the state of the `reviews` array on the client side.
            const updatedReviews = [...reviews, {body: rev.value}];
            // Clear the text area control.
            rev.value = "";
            setReviews(updatedReviews);
        } catch(err) {
            console.error(err);
        }
    }
 
  return (
    <Container>
        <Row>
            <Col><h3>Reviews</h3></Col>
        </Row>
        <Row className="mt-2">
            <Col>
                <img src={movie?.poster} alt="" />
            </Col>
            <Col>
                {
                    <>
                        <Row>
                            <Col>
                                <ReviewForm handleSubmit={addReview} revText={revText} labelText="Write a Review?" />  
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <hr />
                            </Col>
                        </Row>
                    </>
                }
                {
                    reviews?.map((r) => {
                        return(
                            <>
                                <Row>
                                    <Col>{r.body}</Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <hr />
                                    </Col>
                                </Row>                                
                            </>
                        )
                    })
                }
            </Col>
        </Row>
        <Row>
            <Col>
                <hr />
            </Col>
        </Row>        
    </Container>
  )
}

export default Reviews