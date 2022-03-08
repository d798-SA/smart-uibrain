import React from 'react';


import Tilt from 'react-parallax-tilt';

const Logo = () => { 
    return (
        <div style={{display:'flex' , justifyContent:'center' , alignItems:'center' , maxWidth:'50%' , height:'50%' , width: '6rem' , borderRadius: '1rem'}} className="ma4 mt0">
            <Tilt className="br2 shadow-2" style={{borderRadius:'1rem'}} options={{max:25}}  glareEnable={true} glareMaxOpacity={0.3} glareColor="lightblue" glarePosition="all">
                <div style={{margin:'0.6rem 0.6rem'}} className="shadow-2">
                <img src="https://dsm01pap006files.storage.live.com/y4msNUk_OMDVWK6iRoeWgiXnL2jQBjqxOmwnVxqekC5D0S2dbxAL-Lva7w4oKMQEa7o6vlMqotpcXjkTIRKc_7HAcU7EII-DNsZ0mCEy0o_T4BwAsE8j-ocPvfpp4dKSr6ccucntGVPRIJbmpMahIPwB9wmxkMOdhQuzWemquSvUW74AASxwUqLHctGdfHb0bG1?width=256&height=181&cropmode=none"  alt="shoud be logo" />
                </div>
            </Tilt>
        </div>
    )
}

export default Logo;