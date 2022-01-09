import React, { useState } from 'react';
import './Header.css';
import logo from './logo.svg';
import { Button, ButtonGroup } from '@mui/material';
import { ModalFunc } from './ModalFunc';

const Header = (props) => {

    // isLoggedIn: this.props.isLoggedIn,
    //     logBtnContent: this.props.isLoggedIn === 'true' ? 'LOGOUT' : 'LOGIN'
    const [btnContent, setBtnContent] = useState(props.isLoggedIn === 'true' ? 'LOGOUT' : 'LOGIN');
    const [openModal, SetOpenModal] = React.useState(false);
    const logButton = <button variant='contained'  >
        {btnContent}
    </button>

    const handleModalOpen = () => SetOpenModal(true);
    const handleModalClose = () => SetOpenModal(false);

    

    if (window.location.pathname.indexOf("Details") > -1) {
        return (
            <div className='header'>
                {/* <svg  className='header-svg' xlmns = './logo.svg'/> */}
                <img src={logo} className='header-svg' />
                <ButtonGroup color='success' sx={{ float: 'right' }}>
                    <Button variant='contained' sx={{mr: '10px'}} >Book Now</Button>
                    <Button onClick = {handleModalOpen} sx={{ bgcolor: '#1976d2', color: 'white'}} >{btnContent}</Button>
                </ButtonGroup>
                <ModalFunc open={openModal} handleClose={handleModalClose} />
            </div>

        );
    }
    else {

        return (
            <div className='header'>
                {/* <svg  className='header-svg' xlmns = './logo.svg'/> */}
                <img src={logo} className='header-svg' />
                <Button onClick = {handleModalOpen} sx={{ float: 'right', bgcolor: '#1976d2', color: 'white' }}>{btnContent}</Button>
                <ModalFunc open={openModal} handleClose={handleModalClose} />
            </div>

        );

    }


}

export { Header };