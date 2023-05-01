import Hero from '../hero/Hero';

const Home = ({movies}) => {
  console.log("Inside Home component.");
  console.log(movies);
  return (
    // <div>
    //     Welcome!!!
    // </div>
    <Hero movies = {movies} />
  );
}

export default Home