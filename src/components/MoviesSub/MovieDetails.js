import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import Typography from '@material-ui/core/Typography';
const useStyles = makeStyles({
    root: {
      maxWidth: 500,
      
    }
  });
const MoviesDetails=({title,overview,release_year,movie_poster,setSelectedMovie,runtime,genre,isAdult})=>{
    
    const classes = useStyles();

    function escapeHandler(e){
        if(e.target.className==="MovieDetails"||e.target.className==="close-btn"){
            e.target.style.display="none"
            document.getElementsByTagName("BODY")[0].style.overflowY="scroll"
            setSelectedMovie()
        }
    }

    return(
      
      
<div className="MovieDetails" onClick={(e)=>escapeHandler(e)}>

    <Card id="details_card" className={classes.root}>
        <button className="close-btn" style={{background:"white",border:"none",outline:"none",cursor:"pointer",fontWeight:"bolder",fontSize:"20px",position:"relative",left:"45%"}} >X</button>
        <CardMedia
            component="img"
            alt={title+"-poster"}
            height="400"
            image={movie_poster===null?"https://www.movienewz.com/wp-content/uploads/2014/07/poster-holder.jpg":"https://image.tmdb.org/t/p/w500"+movie_poster}
            title={title}
            />
            <CardContent style={{overflow:"scroll"}}>
            <Typography gutterBottom variant="h3" component="h3" style={{fontFamily:"MalharD",fontWeight:"bolder"}}>
                {title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" style={{fontWeight:"bolder"}}>
                {release_year} | {runtime + " min"} {!isAdult?"":"| 18+"} | {genre[0]}{", "+genre[1]}
            </Typography>
            <br/>
            <Typography variant="body2" color="textSecondary" component="p">
                {overview}
            </Typography>
            {/* <Typography variant="body2" color="textSecondary" component="p" style={{display:"flex",alignItems:"center",justifyContent:"center",padding:"10px 0"}}>
                <StarIcon style={{color:"#ff9529",padding:"0 2px "}}/>
                {votes!=="-"?votes/2:"-"}
            </Typography> */}
            </CardContent>
    
        </Card>
        </div>
    )
}
export default MoviesDetails


            

            
