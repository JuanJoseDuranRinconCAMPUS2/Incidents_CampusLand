import React, { useState, useEffect, useRef } from 'react'
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import { Typography } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useHref } from 'react-router-dom';
export default function Error404() {

     useEffect(() => {
    
    }, []);
  
    return (
        <>
           <Box 
           sx={{ 
                width: '100%', display : 'flex', justifyContent: 'center', alignItems : 'center', py: 10, backgroundImage: 'url("https://i.pinimg.com/originals/21/5c/7f/215c7fdca6033092baa04b35c17466bd.gif")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
           >
                <Stack spacing={2}>
                <Typography
                            sx={{
                                opacity: 0.9,
                                textShadow:
                                `0 0 7px #fff,
                                0 0 10px #fff,
                                0 0 92px #0fa,
                                0 0 102px #0fa,
                                0 0 151px #0fa,
                                0 0 20px rgba(255, 0, 255, 0.5)`,
                                textTransform: 'uppercase',
                                mt: 12,
                                display: 'block',
                                fontSize: "3rem",
                                textAlign: 'center',
                                fontWeight: 700,
                                fontFamily: 'monospace',
                                color: "#fee0ff",
                                whiteSpace: 'nowrap',
                                borderRight: '4px solid',
                                borderLeft: '4px solid',
                            }}
                        >
                        Error404
                        </Typography>
                        <Box
                            sx={{
                                opacity: 0.6,
                                textTransform: 'uppercase',
                                display: 'block',
                                color: "#fee0ff",
                                borderRadius: '10%',
                                overflow: 'hidden',
                                borderRight: '4px solid',
                                borderLeft: '4px solid',
                        }}>
                            <img src='https://i.pinimg.com/originals/5b/27/01/5b270123bd7f65a53d4f889baa8609d7.gif' loading="lazy" width={"100%"}/>
                        </Box>
                        <Link to="/">
                            <IconButton aria-label="fingerprint"
                            sx={{
                                width: '100%', 
                                height: '100%'
                            }}>
                                <ExitToAppIcon
                                sx={{
                                    justifyContent: 'center',
                                    width: '20%', 
                                    height: '100%',
                                    alignContent: 'center',
                                    display: 'flex',
                                    color: "#fee0ff",
                                    borderRight: '4px solid',
                                    borderLeft: '4px solid',
                                }}
                                />
                            </IconButton>
                        </Link>
                </Stack>
            </Box>
        </>
    )
}