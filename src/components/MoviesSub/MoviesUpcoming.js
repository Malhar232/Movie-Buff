import React,{useState,useEffect} from 'react';
import Movie from '../Movie';
import axios from 'axios'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
const MoviesUpcoming=({selectedMovie,setSelectedMovie})=>{
    const [pageNumber,setPageNumber]=useState(1)
    const [ListMoviesUpcoming,setListMoviesUpcoming]=useState([])
    const [maxPageLimit,setmaxPageLimit]=useState(10)

    async function getMoviesUpcoming(){
        const {data}=await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_API_KEY}&page=${pageNumber}`)
        setmaxPageLimit(data.total_pages)
        setListMoviesUpcoming(data.results.map((m)=> <Movie selectedMovie={selectedMovie} setSelectedMovie={setSelectedMovie} name={m.title||m.name} year={m.release_date===undefined?"":m.release_date.slice(0,4)} poster={m.backdrop_path||m.poster_path} key={m.id} id={m.id} votes={m.vote_average||"-"} isAdult={m.adult}/>))
    }
   
    useEffect(() =>{
       getMoviesUpcoming(); // eslint-disable-next-line
    }, [pageNumber])
    

    return(
        <div className="AllMovies">
            {selectedMovie}
            <div className="Search_list">{ListMoviesUpcoming}</div>

            <br/>
            {pageNumber>1?<button className="backArrow" onClick={()=>{document.documentElement.scrollTop = 0;setPageNumber(pageNumber!==1?pageNumber-1:1)}}><ArrowBackIcon/></button>:""}
            {pageNumber!==maxPageLimit?<button className="forwardArrow" onClick={()=>{document.documentElement.scrollTop = 0;setPageNumber(pageNumber!==maxPageLimit?pageNumber+1:maxPageLimit)}}><ArrowForwardIcon/></button>:""}
     
        </div>
    )
}
export default MoviesUpcoming