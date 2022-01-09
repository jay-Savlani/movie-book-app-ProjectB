import React, { Component } from 'react';
import { Link, Outlet} from 'react-router-dom';
import { Header } from '../../common/header/Header';
import './Home.css';
import moviesData from '../../common/moviesData';
import { convertDate, doesDateExists } from './convertDate';
import genres from '../../common/movieGenres';
import artists from '../../common/movieArtists';
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


class Home extends Component {

    constructor() {
        super();
        this.state = {
            moviesData: moviesData,
            releasedMovies: moviesData,
            movieGenres: genres,
            movieArtists: artists,
            genre: [],
            artist: [],
            movieName: "",
            releaseDateStart: new Date(),
            releaseDateEnd: new Date()

        }
    }



    handleTextChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: typeof name === 'string' ? value : value.split(',')
        })
    }

    handeApply = (e) => {

        let { moviesData, movieName, genre, artist, releaseDateStart, releaseDateEnd } = this.state;
        let newMoviesData = [];
        // console.log(moviesData);
        // debugger;
        let filteredMovies = moviesData.filter(
            movie => genre.some(element => movie.genres.includes(element)) ||
                (movie.title.toLowerCase().indexOf(movieName.toLowerCase()) > -1 && movieName.length > 0) ||
                artist.some(element => {
                    return movie.artists.some(value => {
                        return element.search(value.first_name) >= 0
                    })
                }) ||
                doesDateExists(releaseDateStart, releaseDateEnd, movie.release_date)

        )
        newMoviesData = filteredMovies;
        this.setState({
            releasedMovies: e.target.name === "filter" ? newMoviesData : moviesData
        });

        if (e.target.name === 'reset') {
            this.setState({
                genre: [],
                artist: [],
                movieName: "",
                releaseDateStart: null,
                releaseDateEnd: null
            })
        }
    }




    render() {

        let upComingMovies = this.state.moviesData;
        let releasedMovies = this.state.releasedMovies;
        let movieName = this.state.movieName;
        let genres = this.state.movieGenres;
        let artists = this.state.movieArtists;
        let movieGenre = this.state.genre;
        let movieArtist = this.state.artist;
        let releaseDateEnd = this.state.releaseDateEnd;
        let releaseDateStart = this.state.releaseDateStart;
        return (
            <div>
                
                <Header isLoggedIn = 'false'  />
               
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
                        upComingMovies.map(movie => {

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
                                releasedMovies.map((movie) => {
                                    const readableDate = convertDate(movie.release_date);
                                    return (
                                        <Link key={movie.id} to= {{
                                            pathname: `/Details/${movie.title}`,
                                           
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
                            <CardHeader sx={{color: '#42a5f5'}} title='FIND MOVIES BY: ' />
                            <CardContent>
                                {/* Text Field */}
                                <FormControl

                                >
                                    <TextField

                                        variant='standard' value={movieName} label='Movie Name' name='movieName' onChange={this.handleTextChange} />
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
                                        value={movieGenre}
                                        onChange={this.handleTextChange}

                                        style={{ marginTop: 10 }}
                                        name='genre'

                                    >
                                        {
                                            genres.map((genre) => {
                                                return (
                                                    <MenuItem key={genre.id} value={genre.name}>
                                                        <Checkbox checked={movieGenre.indexOf(genre.name) > -1} />
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
                                        value={movieArtist}
                                        onChange={this.handleTextChange}
                                        name='artist'
                                        label='Artist'
                                    >
                                        {
                                            artists.map((artist) => {
                                                const artistFullName = `${artist.first_name} ${artist.last_name}`;
                                                return (
                                                    <MenuItem key={artist.id} value={artistFullName}>
                                                        <Checkbox checked={movieArtist.indexOf(artistFullName) > -1} />
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
                                        onChange={this.handleTextChange}
                                        type='date'
                                        InputLabelProps={{ shrink: true }}
                                        name='releaseDateStart'
                                    /> */}
                                        <DesktopDatePicker
                                            label="Release Date Start"
                                            value={releaseDateStart}
                                            minDate={new Date('2000-01-01')}

                                            onChange={newValue => this.setState({ releaseDateStart: newValue, releaseDateEnd: newValue })}
                                            renderInput={(params) => <TextField {...params} name='releaseDateStart' />}
                                        />
                                    </FormControl>
                                    <br />
                                    {/* Text Field */}
                                    <FormControl >
                                        <DesktopDatePicker
                                            label="Release Date End"
                                            value={releaseDateEnd}
                                            minDate={releaseDateStart}
                                            onChange={newValue => this.setState({ releaseDateEnd: newValue })}
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
                                    <Button name='filter' onClick={this.handeApply} sx={{ fontSize: 17 }} variant='contained' color='primary'>Apply</Button>
                                </FormControl>

                                <FormControl>
                                    <Button name='reset' onClick={this.handeApply} sx={{ fontSize: 17 }} variant='contained' color='primary'>Reset</Button>
                                </FormControl>
                            </CardActions>
                        </Card>


                    </div>

                </div>
             

            </div >

        );
    }
}


export { Home };


