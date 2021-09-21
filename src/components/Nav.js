import {React,useState} from "react"
import {Link,useLocation} from 'react-router-dom'
import '../styles/MoviesPage.css'
import SearchIcon from '@material-ui/icons/Search';
import LocalMoviesIcon from '@material-ui/icons/LocalMovies';

const Nav=({searchFlag,setsearchFlag})=>{

    
    const {pathname}=useLocation();

    const [searchValue,setSearchValue]=useState('')


    const SearchHandler=()=>{
        setSearchValue('')
        setsearchFlag(!searchFlag)
    

    }
    return(
        <div className="NavBar">
            <Link to="/" className="MoviesLink" style={pathname==="/"?{color:"#ef0914"}:{}}>MovieBuff  <LocalMoviesIcon style={{ fontSize: 50 }}/></Link>
            
            <div className="SearchBar">
                <input type="text" placeholder="Search..." className="InputSearch" onChange={(e)=>{setSearchValue(e.target.value)}} value={searchValue}/>
                <Link to={searchValue!==""?`/search?query=${searchValue}`:`/`}><button id="SearchBtn" onClick={()=>SearchHandler()}><SearchIcon/></button></Link>
            </div>
        </div>
        )
    
}

export default Nav