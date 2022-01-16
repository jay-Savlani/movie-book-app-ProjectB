import React, {  useEffect, useState } from 'react';
import { Header } from '../../common/header/Header';
import './Details.css'
import {Typography, Rating, ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
import {useNavigate, useParams } from 'react-router-dom';
import moviesData from '../../common/moviesData';
import YouTube from 'react-youtube';

const Details = (props) => {

    const {id} = useParams();

    const [fetchedMovie, setFetchedMovie] = useState({
        genres: [],
        trailer_url: '',
        artists: []
    });
    const [userRating, setUserRating] = useState(0);
    

    const navigate = useNavigate();

    useEffect(() => {

        fetch(`${props.rootUrl}movies/${id}`)
        .then(reponse => reponse.json())
        .then(reponse => {
            setFetchedMovie(reponse[0]);
        })
       

    }, [id]);

    const VideoReady = (e) => {
        // access to player in all event handlers via event.target
        e.target.pauseVideo();
    }

    const handleBackBtn = () => {
       
        navigate('/');
    }


    return (
        <div>
            <Header id={id} showBookShowButton={true} />

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
                    <img src={fetchedMovie.poster_url} alt={fetchedMovie.title} />
                </div>
                <div className='details-middle'>
                    <Typography variant='headline' component='h2'>
                        {fetchedMovie.title}
                    </Typography>
                    <Typography >
                        <span className='bold'>Genre: </span>
                        {
                            fetchedMovie.genres.map(genre => genre).join(', ')

                        }
                    </Typography>
                    <Typography >
                        <span className='bold'>Duration: </span>
                        {`${fetchedMovie.duration} mins`}
                    </Typography>
                    <Typography >
                        <span className='bold'>Release Date: </span>
                        {`${fetchedMovie.release_date}`}
                    </Typography>
                    <Typography >
                        <span className='bold'>Rating: </span>
                        {`${fetchedMovie.critic_rating}`}
                    </Typography>
                    <Typography sx={{ mt: '16px' }}>

                        <span className='bold'>Plot: </span>
                        <a href={fetchedMovie.wiki_url} target="_blank">(Wiki Link) </a>
                        {`${fetchedMovie.story_line}`}
                    </Typography>
                    <Typography sx={{ mt: '16px' }}>

                        <span className='bold'>Trailer: </span>

                    </Typography>
                    <YouTube videoId={fetchedMovie.trailer_url.substring(32)} opts={{
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
                            fetchedMovie.artists.map((artist,index) => {
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