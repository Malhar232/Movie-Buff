import {React,useState} from 'react';
import Movies from './Movies'
import Nav from './Nav'
import MoviesNow from './MoviesSub/MoviesNow'
import MoviesPopular from './MoviesSub/MoviesPopular'
import MoviesUpcoming from './MoviesSub/MoviesUpcoming'
import MoviesTopRated from './MoviesSub/MoviesTopRated'
import SearchResult from './SearchResult'
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";
const MovieBuff=()=>{
    const [selectedMovie,setSelectedMovie]=useState()
    const [searchFlag,setsearchFlag]=useState(false)

    return(
        <Router>

          <div className="ParentComponentMB">
            <Nav setsearchFlag={setsearchFlag} searchFlag={searchFlag}/>
                <Switch>
                    <Route path="/" exact>
                        <Movies selectedMovie={selectedMovie}  setSelectedMovie={setSelectedMovie}/>
                    </Route>
                    <Route path="/movies/now" exact>
                        <MoviesNow selectedMovie={selectedMovie}  setSelectedMovie={setSelectedMovie}/>
                    </Route>
                    <Route path="/movies/popular" exact>
                        <MoviesPopular selectedMovie={selectedMovie}  setSelectedMovie={setSelectedMovie}/>
                    </Route>
                    <Route path="/movies/upcoming" exact>
                        <MoviesUpcoming selectedMovie={selectedMovie}  setSelectedMovie={setSelectedMovie}/>
                    </Route>
                    <Route path="/movies/top_rated" exact>
                        <MoviesTopRated selectedMovie={selectedMovie}  setSelectedMovie={setSelectedMovie}/>
                    </Route>
                    <Route path="/search" exact>
                        <SearchResult setsearchFlag={setsearchFlag} searchFlag={searchFlag} selectedMovie={selectedMovie}  setSelectedMovie={setSelectedMovie} />
                    </Route>
                    
                </Switch>
            </div>
        </Router>

    )
}
export default MovieBuff