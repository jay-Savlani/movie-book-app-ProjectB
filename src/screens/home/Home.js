import React, { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Header } from '../../common/header/Header';
import './Home.css';

import { convertDate, doesDateExists } from './convertDate';

import {
    ImageList,
    ImageListItem,
    ImageListItemBar,
    Card,
    CardContent,
    CardActions,
    CardHeader,
    FormControl,
    Checkbox,
    MenuItem,
    ListItemText,
    TextField,
    Typography,
    Button,
} from '@mui/material';
import { DesktopDatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';


const Home = (props) => {


    let [state, setState] = useState({
        upComingMovies: [],
        releasedMoviesAll : [],
        releasedMovies: [],
        movieGenres: [],
        movieArtists: [],
        genre: [],
        artist: [],
        movieName: "",
        releaseDateStart: new Date(),
        releaseDateEnd: new Date()
    });

    const handleTextChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setState({
            ...state, [name]: typeof name === 'string' ? value : value.split(',')
        })
    }

    // API Calls Made
    const handeApply = (e) => {

        let { upComingMovies, releasedMoviesAll , movieName, genre, artist, releaseDateStart, releaseDateEnd } = state;
        let newMoviesData = [];
       
        let queryString = "?status=RELEASED";
        if (this.state.movieName !== "") {
            queryString += "&title=" + movieName;
        }
        if (this.state.genres.length > 0) {
            queryString += "&genres=" + genre.toString();
        }
        if (this.state.artists.length > 0) {
            queryString += "&artists=" + artist.toString();
        }
        if (this.state.releaseDateStart !== "") {
            queryString += "&start_date=" + releaseDateStart.toLocaleDateString("en-US");
        }
        if (this.state.releaseDateEnd !== "") {
            queryString += "&end_date=" + releaseDateEnd.toLocaleDateString("en-US");
        }

        // Fetch Filtered Released Movies
        fetch(`${props.rootUrl}movies${queryString}`).
            then(response => response.json()).
            then(responseObj => {
                newMoviesData = responseObj.movies
            });
       
        setState({
            ...state, releasedMovies: e.target.name === "filter" ? newMoviesData : releasedMoviesAll
        });

        if (e.target.name === 'reset') {
            setState({
                ...state,
                genre: [],
                artist: [],
                movieName: "",
                releasedMovies: releasedMoviesAll,
                releaseDateStart: null,
                releaseDateEnd: null,
            })
        }
    }

    // API Calls Made
    useEffect(() => {
        

        // Fetch Request Upcoming movies
        fetch(`${props.rootUrl}movies?status=PUBLISHED`).
            then(response => response.json()).
            then(responseObj => {
                setState({ ...state, upComingMovies: responseObj });
            });


        // Fetch Request Released movies
        fetch(`${props.rootUrl}movies?status=RELEASED`).
            then(response => response.json()).
            then(responseObj => {
                setState({ ...state, releasedMovies: responseObj, releasedMoviesAll: responseObj });
            });

        // Fetch Request Genres
        fetch(`${props.rootUrl}genres`).
            then(response => response.json()).
            then(responseObj => {
                setState({ ...state, movieGenres: responseObj });
            });


        // Fetch Request Genres
        fetch(`${props.rootUrl}artists`).
            then(response => response.json()).
            then(responseObj => {
                setState({ ...state, movieArtists: responseObj });
            });
    }, [])


    return (

        <div>
            <Header isLoggedIn='false' />

            <div className='text-center upcoming-movies-header'><Typography sx={{ color: 'black' }} component='span'>
                Upoming Movies
            </Typography></div>
            {/* Upcoming Movies container */}

            <ImageList
                variant='standard'
                rowHeight={250}
                sx={{
                    overflowX: 'scroll',
                    display: 'flex',
                    flexWrap: 'nowrap'
                }}
                label='Movie Genre'
            >
                {

                    state.upComingMovies.map(movie => {

                        return (
                            <ImageListItem key={movie.id}
                                sx={{
                                    overflowY: 'hidden',
                                    flexShrink: 0
                                }}
                                alt='movie.title'
                            >
                                <img src={movie.poster_url} alt={movie.title} />
                                <ImageListItemBar
                                    title={movie.title}
                                />
                            </ImageListItem>
                        );
                    })
                }

            </ImageList>


            <div className='flex-container'>
                <div className='left'> {/* Released Movies container */}
                    <ImageList
                        variant='standard'
                        cols={4}
                        rowHeight={350}
                        className='image-list-release-movies curs-pointer'
                        gap={50}
                        sx={{
                            overflowY: 'visible',
                        }}
                    >
                        {
                            state.releasedMovies.map((movie) => {
                                const readableDate = convertDate(movie.release_date);
                                return (
                                    <Link key={movie.id} to={{
                                        pathname: `/movie/${movie.movieid}`,

                                    }} >
                                        <ImageListItem
                                            sx={{
                                                overflowY: 'hidden'
                                            }}
                                            alt='movie.title'
                                        >
                                            <img src={movie.poster_url} alt={movie.title} />
                                            <ImageListItemBar title={movie.title} subtitle={`Release Date: ${readableDate}`} />
                                        </ImageListItem>
                                    </Link>

                                )
                            })
                        }
                    </ImageList>

                </div>

                <div className='right'> {/* Form Container */}

                    <Card>
                        <CardHeader sx={{ color: '#42a5f5' }} title='FIND MOVIES BY: ' />
                        <CardContent>
                            {/* Text Field */}
                            <FormControl

                            >
                                <TextField

                                    variant='standard' value={state.movieName} label='Movie Name' name='movieName' onChange={handleTextChange} />
                            </FormControl>
                            <br />
                            {/* Select */}
                            <FormControl >
                                <TextField
                                    label='Genre'
                                    select
                                    SelectProps={{
                                        multiple: true,
                                        renderValue: (selected) => selected.join(', ')
                                    }}
                                    value={state.genre}
                                    onChange={handleTextChange}

                                    style={{ marginTop: 10 }}
                                    name='genre'

                                >
                                    {
                                        state.movieGenres.map((genre) => {
                                            return (
                                                <MenuItem key={genre.id} value={genre.name}>
                                                    <Checkbox checked={state.genre.indexOf(genre.name) > -1} />
                                                    <ListItemText primary={genre.name} />
                                                </MenuItem>

                                            );
                                        })
                                    }
                                </TextField>
                            </FormControl >
                            <br />
                            {/* Select */}
                            <FormControl  >
                                <TextField
                                    select
                                    SelectProps={{
                                        multiple: true,
                                        renderValue: (selected) => selected.join(', ')
                                    }}
                                    value={state.artist}
                                    onChange={handleTextChange}
                                    name='artist'
                                    label='Artist'
                                >
                                    {
                                        state.movieArtists.map((artist) => {
                                            const artistFullName = `${artist.first_name} ${artist.last_name}`;
                                            return (
                                                <MenuItem key={artist.id} value={artistFullName}>
                                                    <Checkbox checked={state.artist.indexOf(artistFullName) > -1} />
                                                    <ListItemText primary={artistFullName} />
                                                </MenuItem>

                                            );
                                        })
                                    }
                                </TextField>
                            </FormControl >
                            <br />
                            {/* Text Field */}
                            <LocalizationProvider dateAdapter={AdapterDateFns} >
                                <FormControl >
                                    {/* <TextField
                                        label="Release Date Start:"
                                        onChange={handleTextChange}
                                        type='date'
                                        InputLabelProps={{ shrink: true }}
                                        name='releaseDateStart'
                                    /> */}
                                    <DesktopDatePicker
                                        label="Release Date Start"
                                        value={state.releaseDateStart}
                                        minDate={new Date('2000-01-01')}

                                        onChange={newValue => setState({ ...state, releaseDateStart: newValue, releaseDateEnd: newValue })}
                                        renderInput={(params) => <TextField {...params} name='releaseDateStart' />}
                                    />
                                </FormControl>
                                <br />
                                {/* Text Field */}
                                <FormControl >
                                    <DesktopDatePicker
                                        label="Release Date End"
                                        value={state.releaseDateEnd}
                                        minDate={state.releaseDateStart}
                                        onChange={newValue => setState({ ...state, releaseDateEnd: newValue })}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </FormControl>
                            </LocalizationProvider>

                        </CardContent>
                        <CardActions sx={{
                            padding: 0,
                            flexDirection: 'column'
                        }}>
                            <FormControl>
                                <Button name='filter' onClick={handeApply} sx={{ fontSize: 17 }} variant='contained' color='primary'>Apply</Button>
                            </FormControl>

                            <FormControl>
                                <Button name='reset' onClick={handeApply} sx={{ fontSize: 17 }} variant='contained' color='primary'>Reset</Button>
                            </FormControl>
                        </CardActions>
                    </Card>


                </div>

            </div>
        </div>





    );

}


export { Home };


