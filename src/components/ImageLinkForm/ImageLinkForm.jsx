import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './ImageLinkForm.css'

const ImageLinkForm = ({ onUserInputChange, onSubmit }) => {
    return (
        <div>
            <p className='f3'>
                {'will detect faces in your pictures. Give it a try'}
            </p>
            <div className='center'>
                <div className='center form pa4 br3 shadow-5'>

                    <TextField
                   
                    onChange={event => onUserInputChange(event)}
                     fullWidth
                      label="put the link here" 
                     variant="outlined"
                      />
                    <Button onClick={event => onSubmit(event)} variant="contained"  >
                        Detect
                    </Button>
                </div>
            </div>
        </div>
    )
}


export default ImageLinkForm;