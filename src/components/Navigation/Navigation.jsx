import React from 'react';
import Logo from '../Logo/Logo'
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';


const styles = makeStyles({
    nav: {
        display: 'flex',
        alignItems: 'center',
        margin: '0 0.4rem'
    },

    singForm: {
        display: 'flex',
        marginLeft: 'auto',
        gap: '0.4rem'
    },

    logo: {
        paddingTop: '1rem',
    }
})

const Navigation = ({ route, onRouteChange }) => {
    const doStyle = styles();
    return (
        <nav className={doStyle.nav} >
            <div className={doStyle.logo}>
                <Logo />
            </div>
            <div className={doStyle.singForm}>


                {route === 'home' ?
                    <Button
                        startIcon={<ConnectWithoutContactIcon />}
                        variant='contained'
                        onClick={() => onRouteChange('singIn')}


                    >
                        sing out
                    </Button>
                    : (
                        route === 'singIn' ?

                            <Button
                                startIcon={<SelfImprovementIcon />}

                                
                                onClick={() => onRouteChange('Register')}

                                variant='contained'>


                                Register
                            </Button> :
                            <Button
                            onClick={() => onRouteChange('singIn')}

                                startIcon={<FingerprintIcon />}
                                variant='contained'>
                                sing In
                            </Button> 
                )
                }
            </div>
        </nav>
    )
}

export default Navigation;