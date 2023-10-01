import React, { useState, useEffect, useRef } from 'react'
import { PropTypes } from 'prop-types';

import Box from '@mui/joy/Box';
import Grid from '@mui/joy/Grid';
import Typography from '@mui/joy/Typography';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import AirlineSeatReclineExtraIcon from '@mui/icons-material/AirlineSeatReclineExtra';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import SatelliteAltIcon from '@mui/icons-material/SatelliteAlt';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function Roles() {

    const [expanded, setExpanded] = React.useState(false);
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    useEffect(() => {
    
    }, []);
  
    return (
        <>
            <Box sx={{ flexGrow: 1 , display: { xs: 'flex', md: 'flex' }, justifyContent: 'center' , alignContent:'center'}}  >
                <Grid
                    container
                    spacing={1}
                    gap={{ xs: 3, sm: 3, md: 10 }}
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
                        md={4}
                        paddingY={{ xs: 3, sm: 3, md: 12 }}
                        display="flex"
                        flexDirection= "column"
                        justifyContent="center"
                        alignItems="center"
                        minHeight={180}
                            
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
                            
                            Roles!
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
                        >For incident management we have 3 main roles:</Typography>
                        <List sx={{ width: '100%', maxWidth: 360, bgcolor: '#a976c3', borderRadius: '6%' }}>
                            <ListItem>
                                <ListItemAvatar>
                                <Avatar sx={{ bgcolor: '#f4e6ff'}}>
                                    <AirlineSeatReclineExtraIcon sx={{color: '#252422'}} />
                                </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Campers" secondary="Campusland students " />
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar >
                                <Avatar sx={{ bgcolor: '#f4e6ff'}}>
                                    <RocketLaunchIcon sx={{color: '#252422'}}/>
                                </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Trainers" secondary="Campusland teachers"  />
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar>
                                <Avatar sx={{ bgcolor: '#f4e6ff'}}>
                                    <SatelliteAltIcon sx={{color: '#252422'}}/>
                                </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Admins" secondary="Campusland administrative staff " />
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid
                        key={"campusSection"}
                        xs={12}
                        sm={10}
                        md={4}
                        display="flex"
                        flexDirection={"column"}
                        justifyContent="center"
                        alignItems="center"
                        minHeight={180}
                    >
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
                        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                            <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                            >
                                <AirlineSeatReclineExtraIcon sx={{color: '#252422'}} />
                                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                        Campers!
                                </Typography>
                                <Typography sx={{ color: 'text.secondary' }}>You have access to basic functionalities</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Campers can create, edit and delete their own incidents, 
                                    as well as view the status of incidents reported by them.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                            <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2bh-content"
                            id="panel2bh-header"
                            >
                                <RocketLaunchIcon sx={{color: '#252422'}}/>
                                <Typography sx={{ width: '33%', flexShrink: 0 }}>Trainers!</Typography>
                                <Typography sx={{ color: 'text.secondary' }}>
                                    You have access to advanced functionalities 
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    The trainers can see the incidents of the campers or of themselves, they can change 
                                    the status of the incident, see the incidents by room or by area, 
                                    search for incidents according to established parameters, they can also see the computers 
                                    with their operating status and they can authorize Campers to enter the website
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                            <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel3bh-content"
                            id="panel3bh-header"
                            >
                                <SatelliteAltIcon sx={{color: '#252422'}}/>
                                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                    Admins!
                                </Typography>
                                <Typography sx={{ color: 'text.secondary' }}>
                                You have access to total access to functionalities
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    The Admins can see the incidents of the campers, trainers or themselves, 
                                    they can change the status of the incident, see the incidents by room or area, 
                                    search for incidents according to established parameters, they can also see the 
                                    computers with their operating status and can authorize Campers and Trainers to 
                                    enter the website.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                </Grid>
            </Box>  
             
        </>
    )
}

const itemData = [
    {
        img: 'https://i.pinimg.com/originals/fb/57/c3/fb57c3af41cfc27c60ad2609bede01a7.gif',
        title: 'sistem1',
    },
    {
        img: 'https://i.pinimg.com/originals/47/17/a8/4717a813263f471b0def42d70c835ad5.gif',
        title: 'sistem2',
    },
    {
        img: 'https://i.pinimg.com/originals/3d/45/8a/3d458aff1652aaae3cfd5b453af55d1f.gif',
        title: 'sistem3',
    }
  ];