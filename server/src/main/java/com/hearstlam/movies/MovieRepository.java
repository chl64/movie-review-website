package com.hearstlam.movies;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MovieRepository extends MongoRepository<Movie, ObjectId> {
    // Automatic queries:
    // Spring framework is clever enough to deduce from the method declaration alone
    // what kind of query is intended. Hence, no need to define the method.
    Optional<Movie> findMovieByImdbId(String imdb);
}
