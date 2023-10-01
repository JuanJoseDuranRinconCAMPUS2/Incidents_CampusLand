import React, { useState, useEffect, useRef } from 'react'
import NavbarHome from './NavbarHome';
import HeaderHome from './HeaderHome';
import ContentHome from './contentHome';
import FeaturesHome from './FeaturesHome';
import RolesHome from './RolesHome';
import JoinUsHome from './JoinUsHome';

import { PropTypes } from 'prop-types';
import LinearProgress from '@mui/material/LinearProgress';
import { Box } from '@mui/material';
import '../../../public/homeStyles.css'


export default function Home() {

     useEffect(() => {
    
    }, []);
  
    return (
        <>
            <Box sx={{ width: '100%' }}>
                <LinearProgress color="secondary" />
            </Box>
            <div className='Navbar'>
                <NavbarHome/>
            </div>
            <Box sx={{ width: '100%' }}>
                <LinearProgress color="secondary" />
            </Box>
            <div className='content1'>
                <div className='HeaderHome'>
                    <HeaderHome/>
                </div>

                <div className='contentHome'>
                    <ContentHome/>
            </div>
            </div>
            <Box sx={{ width: '100%' }}>
                <LinearProgress color="success" />
            </Box>
            <div className='Features'>
                <FeaturesHome/>
            </div>
            <Box sx={{ width: '100%' }}>
                <LinearProgress color="warning" />
            </Box>
            <div className='Roles'>
                <RolesHome/>
            </div>
            <Box sx={{ width: '100%' }}>
                <LinearProgress color="warning" />
            </Box>
            <div className='JoinUs'>
                <JoinUsHome/>
            </div>
        </>
    )
}