// import movies from '../data/movies';
import {connection} from './../services/database.service'
import iMovie from './interfaces/iMovie';

class Movie{

   async getMovies(){
        const queryStr = 'SELECT * FROM movie'
        // console.log(movies);
        const client = await connection();
        const result = await client.query(queryStr);
        return result.rows;

    }
async getOneMovie(id){
    const queryStr = 'SELECT * FROM movie where id=$1'

    // console.log(movies);
    const client = await connection();
    const result = await client.query(queryStr,[id]);
    return result.rows;
}
    getMoviesByDuration(){
    }
}

export default new Movie();