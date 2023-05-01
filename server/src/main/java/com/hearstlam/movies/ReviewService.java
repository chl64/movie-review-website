package com.hearstlam.movies;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

@Service
public class ReviewService {
    // Repository and Template are two ways to interact with a database.

    @Autowired
    private ReviewRepository reviewRepository;

    // Template can be used to form a dynamic query.
    @Autowired
    private MongoTemplate mongoTemplate;

    public Review createReview(String reviewBody, String imdbId) {
        // Note: The data inserted into the repository is returned.
        Review review = reviewRepository.insert(new Review(reviewBody));

        mongoTemplate.update(Movie.class)
                .matching(Criteria.where("imdbId").is(imdbId))
                // Update definition.
                .apply(new Update().push("reviewIds").value(review))
                // Make sure that a single movie is obtained and updated.
                .first();

        return review;
    }
}
