
import React, { useState } from 'react';

import { modal_style } from './modal-style';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


const ModalFunc = (props) => {

    return (
        <Modal
            open={props.open}
            onClose = {props.handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={modal_style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Text in a modal
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                </Typography>
            </Box>
        </Modal>
    );

}

export {ModalFunc};