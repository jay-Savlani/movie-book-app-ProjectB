import React, { useState } from 'react';
import './Header.css';
import logo from './logo.svg';
import { Button, ButtonGroup } from '@mui/material';
import { ModalFunc } from './ModalFunc';
import { Link } from 'react-router-dom';

const Header = (props) => {

    const [openModal, SetOpenModal] = useState(false);
    const handleModalOpen = () => SetOpenModal(true);
    const handleModalClose = () => SetOpenModal(false);
    const [isLoggedIn, setIsLoggedIn] = useState(sessionStorage.getItem("access-token") == null ? false : true);

    const logoutClickHandler = () => {

        let signOutData = JSON.stringify({
            "uuid": sessionStorage.getItem("uuid")
        });

        let requestOptions = {
            method: 'POST',
            body: signOutData,
            redirect: 'follow'
        };

        fetch("http://localhost:8085/api/auth/logout", requestOptions).
            then(response => response.json()).
            then(response => {
                if (response.message == "Logged Out successfully.") {
                    sessionStorage.removeItem("uuid");
                    sessionStorage.removeItem("access-token");

                }
            })

        setIsLoggedIn(false);

    }

    return (
        <div className='header'>
            {/* <svg  className='header-svg' xlmns = './logo.svg'/> */}
            <img src={logo} className='header-svg' />
            <Button variant='contained' className ='login-btn' sx={{marginLeft: '10px'}} onClick={isLoggedIn ? logoutClickHandler : handleModalOpen}>
                {isLoggedIn ? 'LOGOUT' : 'LOGIN'}
            </Button>

            {props.showBookShowButton == true && !isLoggedIn ?
                <Button className='bookshow-btn' color='secondary' variant='contained'>
                        Book Show
                    </Button>
                
                : ""
            }
            {props.showBookShowButton == true && isLoggedIn ?
                <Link to={{
                    pathname: `/bookshow/${props.id}`,
                   
                }} >
                   
                        <Button className ='bookshow-btn' color='secondary' variant='contained'>
                            Book Show
                        </Button>
                    
                </Link>
               
                : ""
            }
            <ModalFunc open={openModal} setIsLoggedIn={setIsLoggedIn} handleModalClose={handleModalClose} />
        </div>

    );



}

export { Header };