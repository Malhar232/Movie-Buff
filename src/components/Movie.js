import {React} from 'react'
import axios from 'axios'
import MovieDetails from './MoviesSub/MovieDetails'


import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import Typography from '@material-ui/core/Typography';
import StarIcon from '@material-ui/icons/Star';

// import clsx from 'clsx';
// import Badge from '@material-ui/core/Badge';

const useStyles = makeStyles({
    root: {
      maxWidth: 345,
      
    },
    shape: {
      backgroundColor: "crimson",
      width: 40,
      height: 40,
      color:"white",
      fontWeight:"bolder"
    },
    shapeCircle: {
      display:"flex",
      alignItems:"center",
      justifyContent:"center"
    },
  });

const Movie=({name,year,poster,id,setSelectedMovie,votes})=>{
    const classes = useStyles();
     async function getMovieId(){
        const {data}=await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}`)
        window.scrollTo(0,0)
        var genres=data.genres.map((g)=>g.name)
        setSelectedMovie(<MovieDetails isAdult={data.adult} genre={genres} original_language={data.original_language} runtime={data.runtime} setSelectedMovie={setSelectedMovie} title={data.original_title} overview={data.overview} release_year={data.release_date===undefined?"":data.release_date.slice(0,4)} movie_poster={data.backdrop_path||data.poster_path} key={data.id}/>)
        document.getElementsByTagName("BODY")[0].style.overflow="hidden"
    }
    return(
        <div style={{padding:"0 20px"}}>
            
<CardActionArea id="card">

<Card className={classes.root} id="searchCard" style={{height:"375px",width:"250px"}} onClick={getMovieId}>

  {/* {(isAdult===undefined||isAdult===true)?<Badge style={{position: "absolute",right: "0",top: "0",transform:"translate(50%,-50%)",zIndex:"1000"}} badgeContent={0}>{circle}</Badge>:""} */}
        <CardMedia 
          component="img"
          alt={name+"-poster"}
          height="200"
          image={poster===null?"https://www.movienewz.com/wp-content/uploads/2014/07/poster-holder.jpg":"https://image.tmdb.org/t/p/w500"+poster}
          title={name}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="h6" style={{fontWeight:"bolder"}}>
            {name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" style={{fontWeight:"bolder"}}>
            {year}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" style={{display:"flex",alignItems:"center",justifyContent:"center",padding:"10px 0"}}>
            <StarIcon style={{color:"#ff9529",padding:"0 2px "}}/>
            {votes!=="-"?Math.round(votes/2 * 10) / 10:"-"}
          </Typography>
        </CardContent>
   
    </Card>
</CardActionArea>
            
                    
        
        </div>
        
    )
}
export default Movie