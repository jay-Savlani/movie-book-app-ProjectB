import React, { Component, useEffect, useState } from 'react';

import { Header } from '../../common/header/Header';
import './Details.css'
import { Button, Typography, Rating, ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import moviesData from '../../common/moviesData';
import YouTube from 'react-youtube';

const Details = (props) => {


    let [moviePoster, setMoviePoster] = useState("");
    let [title, setTitle] = useState('');
    let [genres, setMovieGenres] = useState([]);
    let [artists, setMovieArtists] = useState([]);
    let [duration, setDuration] = useState(0);
    let [releaseDate, setReleaseDate] = useState("");
    let [rating, setRating] = useState(0);
    let [story, setStory] = useState('');
    let [wiki_url, setWikiUrl] = useState("");
    let [youtube_id, setYoutubeId] = useState("");
    let [userRating, setUserRating] = useState(0);
    const { movie } = useParams();

    const navigate = useNavigate();

    useEffect(() => {

        let fetchedMovieData = moviesData.filter(fetchedMovie => fetchedMovie.title === movie);
        let fetchedTitle = fetchedMovieData[0].title;
        
        setTitle(fetchedTitle);
        let fetchedPoster = fetchedMovieData[0].poster_url;
        
        setMoviePoster(fetchedPoster);
        let fetchedGenres = fetchedMovieData[0].genres;
        
        setMovieGenres(fetchedGenres);
        let fetchedArtists = fetchedMovieData[0].artists;
        
        setMovieArtists(fetchedArtists);
        let fetchedDuration = fetchedMovieData[0].duration;
        setDuration(fetchedDuration);
        
        let MyDateString = new Date(fetchedMovieData[0].release_date).toLocaleString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
        setReleaseDate(MyDateString);
        
        let fetchedRating = fetchedMovieData[0].critics_rating;
       
        setRating(fetchedRating);
        let fetchedStory = fetchedMovieData[0].storyline;
        setStory(fetchedStory);
        
        let fetchedWikiUrl = fetchedMovieData[0].wiki_url;
        setWikiUrl(fetchedWikiUrl);
        
        let fetchedYoutubeId = fetchedMovieData[0].trailer_url.substring(32);
        setYoutubeId(fetchedYoutubeId);

        console.log(fetchedYoutubeId);


        // console.log('Movie Param: ', movie);
        // console.log('Filtered Movie Details', fetchedMovieData);
        // console.log('Movie State', movieDetails);
        // console.log("Genres" , genres);

    }, [movie]);

    const VideoReady = (e) => {
        // access to player in all event handlers via event.target
        e.target.pauseVideo();
    }

    const handleBackBtn = () => {
       
        navigate('/');
    }


    return (
        <div>
            <Header isLoggedIn = 'false' />

            <Typography
                ml='24px'
                mt='8px'
                mb='0px'
                height='24px'
                color='black'
                sx={{
                    '&:hover': {
                        cursor: 'pointer'
                    }
                }}
                onClick={handleBackBtn}
            >
                {`< Back To Home`}
            </Typography>
            <div className='details-container'>
                {/* {console.log(' Movie Details First Element ',movieDetails[0])} */}
                <div className='details-left'>
                    <img src={moviePoster} alt={title} />
                </div>
                <div className='details-middle'>
                    <Typography variant='headline' component='h2'>
                        {title}
                    </Typography>
                    <Typography >
                        <span className='bold'>Genre: </span>
                        {
                            genres.map(genre => genre).join(', ')

                        }
                    </Typography>
                    <Typography >
                        <span className='bold'>Duration: </span>
                        {`${duration} mins`}
                    </Typography>
                    <Typography >
                        <span className='bold'>Release Date: </span>
                        {`${releaseDate}`}
                    </Typography>
                    <Typography >
                        {console.log(rating)}
                        <span className='bold'>Rating: </span>
                        {`${rating}`}
                    </Typography>
                    <Typography sx={{ mt: '16px' }}>

                        <span className='bold'>Plot: </span>
                        <a href={wiki_url} target="_blank">(Wiki Link) </a>
                        {`${story}`}
                    </Typography>
                    <Typography sx={{ mt: '16px' }}>

                        <span className='bold'>Trailer: </span>

                    </Typography>
                    <YouTube videoId={youtube_id} opts={{
                        height: '450',
                        width: '100%',
                        playerVars: {
                            // https://developers.google.com/youtube/player_parameters
                            autoplay: 1,
                        },
                    }} onReady={VideoReady} />

                </div>
                <div className='details-right'>
                    <Typography >
                        <span className='bold'>Rate this movie: </span>
                    </Typography>
                    <Rating
                        name="simple-controlled"
                        value={userRating}
                        onChange={(event, newValue) => {
                            setUserRating(newValue);
                        }}
                    />
                     <Typography sx={{mt: "16px", mb: "16px"}}>
                        <span className='bold'>Artists: </span>
                    </Typography>
                    <ImageList
                        variant='standard'
                        cols={2}
                        gap={10}

                    >
                        {
                            artists.map((artist,index) => {
                                return (
                                    <ImageListItem alt={`${artist.first_name} ${artist.last_name}`} key={index}>
                                        <img src={artist.profile_url} alt={`${artist.first_name} ${artist.last_name}`} />
                                        <ImageListItemBar title={`${artist.first_name} ${artist.last_name}`} />
                                    </ImageListItem>
                                )
                            })
                        }
                    </ImageList>
                </div>
            </div>
        </div>
    );
}



export default Details;