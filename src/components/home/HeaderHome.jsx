import React, { useState, useEffect, useRef } from 'react'
import { PropTypes } from 'prop-types';

import Box from '@mui/joy/Box';
import Grid from '@mui/joy/Grid';
import { keyframes } from '@emotion/react';
import Typography from '@mui/joy/Typography';


export default function HeaderHome() {

    const typing = keyframes`
    from { width: 90%; }
    to { width: 0%; }
    `; 

     useEffect(() => {
    
    }, []);
  
    return (
        <>
            <Box sx={{ flexGrow: 1  }} className='Header' >
                <Grid
                    container
                    spacing={1}
                    gap={{ xs: 0, sm: 0, md: 20 }}
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
                            sm={274}
                            md={5}
                            paddingY={{ xs: 5, sm: 0, md: 12 }}
                            display="flex"
                            flexDirection= "column"
                            justifyContent="center"
                            alignItems="center"
                            minHeight={180}
                            
                        >
                        <Typography
                            sx={{
                                textShadow:
                                `0 0 7px #fff,
                                0 0 10px #fff,
                                0 0 92px #0fa,
                                0 0 102px #0fa,
                                0 0 151px #0fa`,
                                textTransform: 'uppercase',
                                display: 'block',
                                fontSize: "3rem",
                                fontWeight: 700,
                                fontFamily: 'monospace',
                                color: "#fee0ff",
                                whiteSpace: 'nowrap',
                                borderRight: '4px solid',
                                overflow: 'hidden',
                                animation: `${typing} 5s infinite alternate steps(20)`,
                            }}
                        >
                        Welcome to <br></br>
                        Incidents!
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
                                color: "#ffff",
                            
                            }}
                        >Welcome to Campusland's Incident Management and Administration page! Here you will be able to inform us of any problems you detect in our facilities and, in addition, carry out the management of such incidents efficiently.</Typography>
                    </Grid>
                    <Grid
                        key={"imgSection"}
                        xs={12}
                        sm={6}
                        md={3}
                        display="flex"
                        flexDirection={"column"}
                        justifyContent="center"
                        alignItems="center"
                        minHeight={180}
                    >
                        <img src='https://radiogalena.ar/wp-content/uploads/2022/03/modificado-creo.gif' loading="lazy" />
                    </Grid>
                </Grid>
            </Box>  
             
        </>
    )
}