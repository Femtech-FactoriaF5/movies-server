import { Request, Response} from "express";
import iMovie from "../model/interfaces/iMovie";
import movieModel from '../model/movieModel';


const  movieController = {

    getAllMovies: async (req:Request,res:Response)=>{
    const movies:any = await movieModel.getMovies();
    res.json(movies);
},
    getOneMovie:  async (req:Request,res:Response)=>{
        const param = req.params['id'];
        const movies:any = await movieModel.getOneMovie(param);
        res.json(movies);
    },
}

export default movieController;