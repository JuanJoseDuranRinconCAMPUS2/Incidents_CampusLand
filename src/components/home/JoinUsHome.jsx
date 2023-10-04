import React, { useState, useEffect, useRef } from 'react'
import { PropTypes } from 'prop-types';

import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Link, Outlet, useNavigate } from "react-router-dom";
import IconButton from '@mui/material/IconButton';

export default function JoinUsHome() {

     useEffect(() => {
    
    }, []);
  
    return (
        <>
            <Box 
            
            sx={
                { flexGrow: 1 , display: { xs: 'flex', md: 'flex' } , 
                justifyContent: 'center' , alignContent:'center', 
                flexDirection:'column', alignItems: "center",
            }}
            paddingTop={{ xs: 3, sm: 3, md: 12 }}
            >

                <Typography 
                            sx={{
                                
                                textTransform: 'uppercase',
                                display: 'inline-block',
                                position: 'relative',
                                fontSize: "3rem",
                                fontWeight: 700,
                                fontFamily: 'monospace',
                                color: '#5f2a62',
                                letterSpacing: '.05em',
                                textShadow: 
                                `4px 4px 0px #a976c3, 
                                7px 7px 0px rgba(0, 0, 0, 0.2)`,
                                whiteSpace: 'nowrap',
                            }}
                            className = "underline"
                        >
                            
                        Join Us!
                        </Typography>
                        <Typography 
                            sx={{
                                my: 4,
                                opacity: 0.9,
                                display: 'block',
                                fontSize: "1.2rem",
                                textAlign: "center",
                                fontWeight: 700,
                                fontFamily: 'monospace',
                                color: '#f4e6ff'
                            
                            }}
                        >If you have an issue to report, this is your lucky day because our issue management system is now available
                         for Campusland, to start with your registration click the button below, however remember that you need to
                        wait some time for an admin or trainer to authorize you access to the page.</Typography>
                        
                       
                        <ArrowDropDownIcon
                            sx={{
                                my: '2%',
                                width: '3rem', 
                                height: '10%',
                                alignContent: 'center',
                                display: 'flex',
                                color: "#fee0ff",
                                borderRight: '4px solid',
                                borderLeft: '4px solid',
                                justifyContent: 'center',
                            }}
                        />
                        <Link to={'/SignIn'}>
                            <button className='JoinUsB'>
                                Sign Up
                            </button>
                        </Link>
            </Box>  
        </>
    )
}
