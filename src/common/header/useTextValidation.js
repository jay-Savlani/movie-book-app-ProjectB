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



  return [
    userDetails.login_username,
    userDetails.login_password,
    userDetails.reg_first_name,
    userDetails.reg_last_name,
    userDetails.reg_email,
    userDetails.reg_password,
    userDetails.reg_contact,
    error,
   
    handleValidation,
    
  ]
}


export { useTextValidation };