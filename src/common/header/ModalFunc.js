
import React, { useState } from 'react';

import { modal_style } from './modal-style';
import { Button, Tabs, Tab, Box, TextField, FormControl, Input } from '@mui/material'
import PropTypes from 'prop-types';

import Typography from '@mui/material/Typography';
// import Modal from '@mui/material/Modal';
import Modal from 'react-modal';
import { useTextValidation } from './useTextValidation';
import { letterSpacing } from '@mui/system';


function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`Login-tabpanel-${index}`}
      aria-labelledby={`Login-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `Login-tab-${index}`,
    'aria-controls': `Login-tabpanel-${index}`,
  };
}


const ModalFunc = (props) => {

  const [tabValue, setTabValue] = useState(0);
  const [registerationSuccess, setRegisterationSuccess] = useState(false);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };


  const [
    login_username,
    login_password,
    reg_first_name,
    reg_last_name,
    reg_email,
    reg_password,
    reg_contact,
    error,
    
    handleValidation,
  ] = useTextValidation();

  const loginClickHandler = () => {
    if (!error.login_username.errorBool && !error.login_password.errorBool) {
      let raw = null;

      let requestOptions = {
        method: 'POST',
        body: raw,
        redirect: 'follow'
      };

      fetch("http://localhost:8085/api/auth/login", requestOptions).
        then(response => response.json()).
        then(response => {
          sessionStorage.setItem("uuid", response.uuid);
          sessionStorage.setItem("access-token", response["access-token"])
        })
      props.handleModalClose();
      props.setIsLoggedIn(true);

    }
    else
      props.setIsLoggedIn(false);
  }
  const registerClickHandler = () => {
    if (!error.reg_first_name.errorBool &&
      !error.reg_last_name.errorBool &&
      !error.reg_email.errorBool &&
      !error.reg_password.errorBool &&
      !error.reg_contact.errorBool) {
      let dataSignup = JSON.stringify({
        "email_address": reg_email,
        "first_name": reg_first_name,
        "last_name": reg_last_name,
        "mobile_number": reg_contact,
        "password": reg_password
      });

      let requestOptions = {
        method: 'POST',
        body: dataSignup,
        redirect: 'follow'
      };

      fetch("http://localhost:8085/api/auth/signup", requestOptions).
        then(response => response.json()).
        then(response => {
          setRegisterationSuccess(true);
        })
      
        setRegisterationSuccess(true);

        
    }

  }


  return (
    <Modal
      isOpen={props.open}
      onRequestClose={props.handleModalClose}
      style={modal_style}
      currentLabel='Example Modal'
    >
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="basic tabs example">
            <Tab label="Login" {...a11yProps(0)} />
            <Tab label="Register" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={tabValue} index={0}>
          <Box sx={{ textAlign: 'center' }}>
            <FormControl>
              <TextField
                name='login_username'
                label='Username'
                variant='standard'
                onChange={handleValidation}
                value={login_username}
                error={error.login_username.errorBool}
                helperText={error.login_username.errorBool && error.login_username.errorMessage}
                required
                autoComplete='off'
              />
            </FormControl>
            <FormControl>
              <TextField
                name='login_password'
                label='Password'
                type='password'
                variant='standard'
                onChange={handleValidation}
                value={login_password}
                error={error.login_password.errorBool}
                helperText={error.login_password.errorBool && error.login_password.errorMessage}
                required
                autoComplete='off'
              />
            </FormControl>
            <FormControl>
              <Button onClick={loginClickHandler} sx={{ width: '30%', alignSelf: 'center' }} color='primary' variant='contained'>
                LOGIN

              </Button>
            </FormControl>
          </Box>
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <Box sx={{ textAlign: 'center' }}>
            <FormControl>
              <TextField
                name='reg_first_name'
                label='First Name'
                variant='standard' required
                onChange={handleValidation}
                value={reg_first_name}
                error={error.reg_first_name.errorBool}
                helperText={error.reg_first_name.errorBool && error.reg_first_name.errorMessage}
                autoComplete='off'
              />
            </FormControl>
            <FormControl>
              <TextField
                name='reg_last_name'
                label='Last Name'
                variant='standard'
                onChange={handleValidation}
                value={reg_last_name}
                error={error.reg_last_name.errorBool}
                helperText={error.reg_last_name.errorBool && error.reg_last_name.errorMessage}
                required
                autoComplete='off'
              />
            </FormControl>
            <FormControl>
              <TextField
                name='reg_email'
                label='Email'
                type='email'
                variant='standard'
                onChange={handleValidation}
                value={reg_email}
                error={error.reg_email.errorBool}
                helperText={error.reg_email.errorBool && error.reg_email.errorMessage}
                required
                autoComplete='off'
              />
            </FormControl>
            <FormControl>
              <TextField
                name='reg_password'
                label='Password'
                type='password'
                variant='standard'
                onChange={handleValidation}
                value={reg_password}
                error={error.reg_password.errorBool}
                helperText={error.reg_password.errorBool && error.reg_password.errorMessage}
                required
                autoComplete='off'
              />
            </FormControl>
            <FormControl>
              <TextField
                name='reg_contact'
                label='Contact'
                type='number'
                variant='standard'
                onChange={handleValidation}
                defaultValue=""
                value={reg_contact}
                error={error.reg_contact.errorBool}
                helperText={error.reg_contact.errorBool && error.reg_contact.errorMessage}
                required
                autoComplete='off'
              />
            </FormControl>
            <Typography>{registerationSuccess &&  "Registeration Successful, Please sign in"}</Typography>
            <FormControl>
              <Button onClick={registerClickHandler} sx={{ width: '30%', alignSelf: 'center' }} color='primary' variant='contained'>REGISTER</Button>
            </FormControl>
          </Box>
        </TabPanel>

      </Box>
    </Modal>
  );

}

export { ModalFunc };