import React, { useState, useEffect, useRef } from 'react'
import { PropTypes } from 'prop-types';

import Box from '@mui/joy/Box';
import Grid from '@mui/joy/Grid';
import Typography from '@mui/joy/Typography';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

import Avatar from '@mui/material/Avatar';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';

export default function FooterHome() {

    useEffect(() => {
    
    }, []);
  
    return (
        <>
            <Box sx={{ flexGrow: 1, justifyContent: 'center' , alignContent:'center', bgcolor:'#26272b'}}  >
                <Grid
                    container
                    spacing={1}
                    gap={{ xs: 3, sm: 3, md: 5 }}
                    marginTop={'2%'}
                    sx={{
                    borderTop: 'var(--Grid-borderWidth) solid',
                    borderLeft: 'var(--Grid-borderWidth) solid',
                    borderColor: 'divider',
                    '& > div': {
                        borderRight: 'var(--Grid-borderWidth) solid',
                        borderBottom: 'var(--Grid-borderWidth) solid',
                        borderColor: 'divider',
                    },
                    justifyContent: "center",
                    alignItems: "center"
                    }}
                >
                    <Grid
                        key={"textSection"}
                        xs={12}
                        sm={10}
                        md={5}
                        paddingY={{ xs: 1, sm: 1, md: 1 }}
                        display="flex"
                        flexDirection= "column"
                        justifyContent="center"
                        alignItems="center"
                        minHeight={150}
                            
                    >
                        <Typography
                            sx={{
                                display: 'inline-block',
                                position: 'relative',
                                fontSize: "2rem",
                                fontWeight: 700,
                                fontFamily: 'monospace',
                                color: '#5f2a62',
                                letterSpacing: '.05em',
                                whiteSpace: 'nowrap',
                            }}
                            className = "underline"
                        >
                            
                            About!
                        </Typography>
                        <Typography 
                            sx={{
                               
                                opacity: 0.9,
                                display: 'block',
                                fontSize: "1rem",
                                textAlign: "left",
                                fontWeight: 700,
                                fontFamily: 'monospace',
                                color: '#f4e6ff'
                            
                            }}
                        >
                            "IncidentsCampus" is an exciting final project designed specifically for Campusland, developed using technologies 
                            such as MERN (MongoDB, Express, React and Node.js).
                             The main goal of "IncidentsCampus" is to provide an efficient incident management system for the campus, simplifying
                              the process of reporting and managing incidents effectively.</Typography>
                    </Grid>
                    <Grid
                        key={"campusSection"}
                        xs={12}
                        sm={10}
                        md={3}
                        display="flex"
                        flexDirection={"column"}
                        justifyContent="flex-start"
                        alignItems="center"
                        paddingY={{ xs: 1, sm: 1, md: 1 }}
                        minHeight={150}
                        sx={{ alignSelf: 'flex-start' }}
                    >
                        <Typography
                            sx={{
                                display: 'inline-block',
                                position: 'relative',
                                fontSize: "2rem",
                                fontWeight: 700,
                                fontFamily: 'monospace',
                                
                                color: '#5f2a62',
                                letterSpacing: '.05em',
                                whiteSpace: 'nowrap',
                            }}
                            className = "underline"
                        >
                            
                            Technologies Used!
                        </Typography>
                        <ImageList sx={{ width: '100%', height: 'auto' }} cols={3} rowHeight={'auto'}>
                            {itemData.map((item) => (
                                <ImageListItem key={item.img} sx={{ width: '100%', height: 'auto' }}>
                                <img
                                    srcSet={`${item.img}`}
                                    src={`${item.img}`}
                                    alt={item.title}
                                    key={item.title}
                                    loading="lazy"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10%' }}
                                />
                                </ImageListItem>
                            ))}
                        </ImageList>
                       
                    </Grid>
                    <Grid
                        key={"campusSection"}
                        xs={12}
                        sm={10}
                        md={5}
                        borderTop = '7px solid'
                        display="flex"
                        flexDirection={"column"}
                        justifyContent="flex-start"
                        alignItems="center"
                        paddingY={{ xs: 3, sm: 3, md: 5 }}
                        minHeight={20}
                        sx={{ alignSelf: 'flex-start' }}
                    >
                        
                        <Typography 
                            sx={{
                               
                                opacity: 0.9,
                                display: 'block',
                                fontSize: "1rem",
                                textAlign: "left",
                                fontWeight: 700,
                                fontFamily: 'monospace',
                                color: '#f4e6ff'
                            
                            }}
                        >
                            Copyright © 2023 All Rights Reserved by JuanJoseDuranRincon.</Typography>
                    </Grid>
                    <Grid
                        key={"campusSection"}
                        xs={12}
                        sm={10}
                        md={3}
                        borderTop = '7px solid'
                        display="flex"
                        gap={7}
                        flexDirection={"row"}
                        justifyContent="center"
                        alignItems="center"
                        paddingY={{ xs: 3, sm: 3, md: 5 }}
                        minHeight={20}
                        sx={{ alignSelf: 'flex-start' }}
                    >
                        <a key="Twitter" href="https://twitter.com/TFredCreations" target="_blank" rel="noopener noreferrer">
                            <Avatar sx={{ bgcolor: '#f4e6ff'}}>
                                <TwitterIcon sx={{color: '#252422'}} />
                            </Avatar>
                        </a>
                        <a key="GitGub" href="https://github.com/JuanJoseDuranRinconCAMPUS2" target="_blank" rel="noopener noreferrer">
                            <Avatar sx={{ bgcolor: '#f4e6ff'}}>
                                <GitHubIcon sx={{color: '#252422'}} />
                            </Avatar>
                        </a>
                        <a key="Gmail" href="mailto:juanjoseduranrincon404@gmail.com" target="_blank" rel="noopener noreferrer">
                            <Avatar sx={{ bgcolor: '#f4e6ff'}}>
                                <EmailIcon sx={{color: '#252422'}} />
                            </Avatar>
                        </a>
                    </Grid>
                </Grid>
            </Box>  
             
        </>
    )
}

const itemData = [
    {
        img: 'https://i.pinimg.com/564x/c7/fb/02/c7fb02ca5aa39b2c5da4fc009d858fc1.jpg',
        title: 'React',
    },
    {
        img: 'https://i.pinimg.com/originals/49/82/52/498252ef8ab1153807a102361b4a70c0.gif',
        title: 'galaxy',
    },
    {
        img: 'https://i.pinimg.com/564x/cd/12/12/cd1212c949eb07ebdd18db8f8cbb350b.jpg',
        title: 'NodeJs',
    }
  ];