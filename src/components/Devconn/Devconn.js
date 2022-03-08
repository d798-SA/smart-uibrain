import React from 'react';
import IconButton from '@mui/material/IconButton';

import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';


const Devconn = () => {
    return (
        <footer>
            <div style={{display:'flex' , justifyContent:'center' , alignItems:'center'}}>
                <IconButton 
                aria-label="Twitter"
                href='https://twitter.com/d798_A'
                target='_blank'
                
                >
                    <TwitterIcon />
                </IconButton>

                <IconButton aria-label="GitHub"
                href='https://github.com/d798-SA'
                target='_blank'
                >
                    <GitHubIcon />
                </IconButton>
            </div>
        </footer>
    )
}



export default Devconn;