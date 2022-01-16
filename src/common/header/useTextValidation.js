import { useState } from "react";
import {Typography} from '@mui/material';

const useTextValidation = () => {

  const [userDetails, setUserDetails] = useState({
    login_username: '',
    login_password: '',
    reg_first_name: '',
    reg_last_name: '',
    reg_password: '',
    reg_contact: 0,
  });
  const [registeration_msg, setRegisterationMsg]= useState('');


  const [error, setError] = useState({

    login_username: {
      errorBool: false,
      errorMessage: ''
    },
    login_password: {
      errorBool: false,
      errorMessage: ''
    },
    reg_first_name: {
      errorBool: false,
      errorMessage: ''
    },
    reg_last_name: {
      errorBool: false,
      errorMessage: ''
    },
    reg_password: {
      errorBool: false,
      errorMessage: ''
    },
    reg_contact: {
      errorBool: false,
      errorMessage: ''
    },
    reg_email: {
      errorBool: false,
      errorMessage: ''
    }
  })


  
  const handleTextValidation = (name, value) => {
      value.length === 0 ? 
      setError({
        ...error,
        [name] : {
          errorBool: true,
          errorMessage: 'required'
        }
      }) 
      : setError({
        ...error,
        [name] : {
          errorBool: false,
          errorMessage: ''
        }
      })
  }




  const handleValidation = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUserDetails({
      ...userDetails,
      [name] : value
    })
    handleTextValidation(name, value);
  }


  const handleSignUp = () => {
    if(
      
      !error.reg_first_name.errorBool &&
      !error.reg_last_name.errorBool &&
      !error.reg_email.errorBool &&
      !error.reg_password.errorBool &&
      !error.reg_contact.errorBool
    ) {
      setRegisterationMsg('Registration Successful. Please Login!');
    }
    else {
      setRegisterationMsg('');
    }
  }


  return [
    userDetails.login_username,
    userDetails.login_password,
    userDetails.reg_first_name,
    userDetails.reg_last_name,
    userDetails.reg_email,
    userDetails.reg_password,
    userDetails.reg_contact,
    error,
    registeration_msg,
    handleValidation,
    handleSignUp
  ]
}


export { useTextValidation };