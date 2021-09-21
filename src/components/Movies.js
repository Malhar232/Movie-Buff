import React,{useState,useEffect} from 'react';
import Movie from './Movie';
import axios from 'axios';
import '../styles/MoviesPage.css'
import {
    Link
  } from "react-router-dom";
  import ArrowForwardIcon from '@material-ui/icons/ArrowForward';



const Movies=({setSelectedMovie,selectedMovie})=>{
    const [PopularMoviesList,setPopularMoviesList]=useState([])
    const [TopRatedMoviesList,setTopRatedMoviesList]=useState([])
    const [upcomingMoviesList,setupcomingMoviesList]=useState([])
    const [nowPlayingMoviesList,setnowPlayingMoviesList]=useState([])
    const [LatestMovie,setLatestMovie]=useState()

    async function getPopularMovies(){
        const {data}=await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}`)
        setPopularMoviesList(data.results.slice(0, 5).map((m)=> <Movie selectedMovie={selectedMovie} setSelectedMovie={setSelectedMovie} name={m.title||m.name} year={m.release_date===undefined?"":m.release_date.slice(0,4)} poster={m.backdrop_path||m.poster_path} key={m.id} id={m.id}  votes={m.vote_average||"-"} isAdult={m.adult}/>))

    }
    async function getTopRatedMovies(){
        const {data}=await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}`)
        setTopRatedMoviesList(data.results.slice(0, 5).map((m)=> <Movie selectedMovie={selectedMovie} setSelectedMovie={setSelectedMovie} name={m.title||m.name} year={m.release_date===undefined?"":m.release_date.slice(0,4)} poster={m.backdrop_path||m.poster_path} key={m.id} id={m.id} votes={m.vote_average||"-"}  isAdult={m.adult}/>))

    }
    async function getupcomingMovies(){
        const {data}=await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_API_KEY}`)
        setupcomingMoviesList(data.results.slice(0, 5).map((m)=> <Movie selectedMovie={selectedMovie} setSelectedMovie={setSelectedMovie} name={m.title||m.name} year={m.release_date===undefined?"":m.release_date.slice(0,4)} poster={m.backdrop_path||m.poster_path} key={m.id} id={m.id} votes={m.vote_average||"-"} isAdult={m.adult}/>))

    }
    async function getnowPlayingMovies(){
        const {data}=await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}`)
        setnowPlayingMoviesList(data.results.slice(0, 5).map((m)=> <Movie selectedMovie={selectedMovie} setSelectedMovie={setSelectedMovie} name={m.title||m.name} year={m.release_date===undefined?"":m.release_date.slice(0,4)} poster={m.backdrop_path||m.poster_path} key={m.id} id={m.id} votes={m.vote_average||"-"} isAdult={m.adult}/>))
    }
    async function getLatestMovies(){
        var randomPage=Math.floor(Math.random() * (1000 - 1 + 1)) + 1;
        const {data}=await axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.REACT_APP_API_KEY}&page=${randomPage}`)
        var randomMovie=Math.floor(Math.random() * (19 - 0 + 1)) + 0;
        setLatestMovie( <Movie selectedMovie={selectedMovie} setSelectedMovie={setSelectedMovie} name={data.results[randomMovie].title||data.results[randomMovie].name} year={data.results[randomMovie].release_date===undefined?"":data.results[randomMovie].release_date.slice(0,4)} poster={data.results[randomMovie].backdrop_path||data.results[randomMovie].poster_path} key={data.results[randomMovie].id} id={data.results[randomMovie].id} votes={data.results[randomMovie].vote_average||"-"} isAdult={data.results[randomMovie].adult}/>)
    }

    function getMovies(){
       getLatestMovies();
       getPopularMovies();
       getupcomingMovies();
       getTopRatedMovies();
       getnowPlayingMovies();
    }
    
    useEffect(() =>{
       getMovies();
       
// eslint-disable-next-line
    }, [])
    

    return(
        
        <div className="MoviesPage">
        {selectedMovie}

            <div className="LatestMovie" style={{width:"290px",textAlign:"center",margin:"0 auto"}}>
                <h1>Recommended Movie</h1>
               

                {LatestMovie}
            </div>
            <br/>

            <div className="MovieLists" >
                <div className="nowPlayingMoviesList">
                    <div className="seeAll">
                        <h1>Now Playing Movies</h1>
                        <div className="links_all"><Link to="/movies/now">See All</Link><ArrowForwardIcon/></div>
                        
                    </div>
                    <br/>

                    <div className="Movies">
                        {nowPlayingMoviesList}
                    </div>
                </div>
                <br/>
                <div className="upcomingMoviesList">
                    <div className="seeAll">
                    <h1>Upcoming Movies</h1>
                    <div className="links_all"><Link to="/movies/upcoming">See All</Link><ArrowForwardIcon/></div>
                    </div>
                    <br/>
                    
                   
                    <div className="Movies">
                        {upcomingMoviesList}
                    </div>
                </div>
                <br/>
                <div className="PopularMoviesList">
                    <div className="seeAll">
                        <h1>Popular Movies</h1>
                        <div className="links_all"><Link to="/movies/popular">See All</Link><ArrowForwardIcon/></div>
                    </div>     
                    <br/>
 
                    <div className="Movies">
                        {PopularMoviesList}
                    </div>
                </div>
                <br/>
                <div className="TopRatedMoviesList">
                    <div className="seeAll">
                    <h1>Top Rated Movies</h1>
                    <div className="links_all"><Link to="/movies/top_rated">See All</Link><ArrowForwardIcon/></div>

                    </div>    
                    <br/>
                
                    <div className="Movies">
                        {TopRatedMoviesList}
                    </div>
                </div>
            </div>
            
            <br/>
            <br/>
        </div>

    )
}
export default Movies


