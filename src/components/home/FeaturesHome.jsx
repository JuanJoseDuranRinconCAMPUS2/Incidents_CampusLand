import React, { useState, useEffect, useRef } from 'react'
import { PropTypes } from 'prop-types';

import Box from '@mui/joy/Box';
import Grid from '@mui/joy/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';


export default function FeaturesHome() {

     useEffect(() => {
    
    }, []);
  
    return (
        <>
            <Box sx={{ flexGrow: 1 , display: { xs: 'flex', md: 'flex' }, justifyContent: 'center' , alignContent:'center'}}>
                <Grid
                    container
                    spacing={1}
                    paddingY={{ xs: 5, sm: 3, md: 6 }}
                    gap={{ xs: 5, sm: 5, md: 10 }}
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
                        key={"campusSection2"}
                        xs={12}
                        sm={10}
                        md={3}
                        display="flex"
                        flexDirection={"column"}
                        justifyContent="center"
                        alignItems="center"
                        minHeight={180}
                    >
                        
                        <Card sx={{ maxWidth: 345 }}>
                            <CardActionArea>
                                <CardMedia
                                component="img"
                                height="140"
                                image="https://i.pinimg.com/originals/dd/ca/b6/ddcab60dbf5290821f1d65f06b274ebd.gif"
                                alt="efficiency"
                                />
                                <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Efficiency 
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    we created a system to manage incidents in a simple and practical way where users can report 
                                    their incidents in a comfortable way.
                                </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid
                        key={"textSection2"}
                        xs={12}
                        sm={6}
                        md={3}
                        display="flex"
                        flexDirection= "column"
                        justifyContent="center"
                        alignItems="center"
                        minHeight={180}
                            
                    >
                        <Card sx={{ maxWidth: 345 }}>
                            <CardActionArea>
                                <CardMedia
                                component="img"
                                height="140"
                                image="https://i.pinimg.com/originals/3e/77/ce/3e77ce1c53623b08fcaea1c5b27dd874.gif"
                                alt="Regulation"
                                />
                                <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                Regulation
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                Our system allows to keep a control of the users so that 
                                only authorized users can use our services.
                                </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid
                        key={"textSection3"}
                        xs={12}
                        sm={6}
                        md={3}
                        paddingY={{ xs: 3, sm: 3, md: 12 }}
                        display="flex"
                        flexDirection= "column"
                        justifyContent="center"
                        alignItems="center"
                        minHeight={180}
                            
                    >
                        <Card sx={{ maxWidth: 345 }}>
                            <CardActionArea>
                                <CardMedia
                                component="img"
                                height="140"
                                image="https://i.pinimg.com/originals/2d/7a/90/2d7a90ed498f67d4ec5169c6d9249093.gif"
                                alt="fdgdfg"
                                />
                                <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Administration
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Our system allows you to manage the incidents by viewing the incidents in specific date periods, 
                                    according to their status and other parameters.
                                </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                </Grid>
            </Box>  
             
        </>
    )
}
