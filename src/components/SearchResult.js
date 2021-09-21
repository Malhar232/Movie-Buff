import {React,useEffect,useState} from 'react'
import {useLocation} from 'react-router-dom'
import Movie from './Movie';
import axios from 'axios'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';



const SearchResult=({selectedMovie,setSelectedMovie, searchFlag})=>{
    const [pageNumber,setPageNumber]=useState(1)
    const [ListSearchResults,setListSearchResults]=useState([])
    const [maxPageLimit,setmaxPageLimit]=useState(10)
    // const [known_for,setknown_for]=useState([])



    function useQuery() {
        return new URLSearchParams(useLocation().search);
      }
    let query = useQuery();

    async function SearchResult(){
        const {data}=await axios.get(`https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_API_KEY}&query=${query.get("query")}&page=${pageNumber}`)
        // console.log(data);

        setListSearchResults(data.results.map((m)=>"known_for" in m?m.known_for.map((known_for_movie)=>known_for_movie.media_type==="movie"?<Movie  selectedMovie={selectedMovie}  setSelectedMovie={setSelectedMovie} name={known_for_movie.title||known_for_movie.name} year={known_for_movie.release_date===undefined?"":known_for_movie.release_date.slice(0,4)||known_for_movie.first_air_date.slice(0,4)} poster={known_for_movie.backdrop_path||known_for_movie.poster_path} key={known_for_movie.id} id={known_for_movie.id} />:null):m.media_type==="movie"?<Movie  selectedMovie={selectedMovie}  setSelectedMovie={setSelectedMovie} name={m.title||m.name} year={m.release_date===undefined?"":m.release_date.slice(0,4)} poster={m.backdrop_path||m.poster_path} key={m.id} id={m.id} />:null))


        setmaxPageLimit(data.total_pages)
    
    }
    
    useEffect(() =>{
        SearchResult(); // eslint-disable-next-line
     }, [pageNumber,searchFlag])

        return(
            <div className="SearchDiv" style={selectedMovie>5?{gridTemplateRows: "1fr 1fr 1fr"}:{}}>
                
                <h1>Searches for {query.get("query")}</h1>
                <br/>
                {selectedMovie}
                {ListSearchResults.length>0 &&
                <div className="Search_list">{ListSearchResults}</div>}
                <div style={{color:"white"}}>{ListSearchResults.length===0?"No Results Found...":""}</div>
                <br/><br/>

                {pageNumber>1?<button className="backArrow" onClick={()=>{document.documentElement.scrollTop = 0;setPageNumber(pageNumber!==1?pageNumber-1:1)}}><ArrowBackIcon/></button>:""}
            {pageNumber!==maxPageLimit?<button className="forwardArrow" onClick={()=>{document.documentElement.scrollTop = 0;setPageNumber(pageNumber!==maxPageLimit?pageNumber+1:maxPageLimit)}}><ArrowForwardIcon/></button>:""}
     
            </div>

        )
    
    
}
export default SearchResult